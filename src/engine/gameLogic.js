import {
  ACHIEVEMENTS, ACTION_CATEGORIES, BACKGROUNDS, BRAND_DEALS, BUSINESS_ACTIONS, CAREERS, CONTEXT_EVENTS,
  FAME_LEVELS, ISLANDS, PROPERTY_ACTIONS, PROVERBS, RANDOM_LIFE_EVENTS, SKATING_DISCIPLINES, SKILLS, generateName
} from '../data/gameData.js';

export const YEAR_FOCUS = 10;
export const SAVE_KEY = 'island_life_v4';

export const clamp = (value, low = 0, high = 100) => Math.max(low, Math.min(high, value));
export const pick = list => list[Math.floor(Math.random() * list.length)];
export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
export const islandById = id => ISLANDS.find(x => x.id === id) || ISLANDS[0];
export const backgroundById = id => BACKGROUNDS.find(x => x.id === id) || BACKGROUNDS[1];
export const careerLabel = id => CAREERS[id] || CAREERS.employee;
export const skillLabel = (id, value) => {
  const skill = SKILLS.find(x => x.id === id);
  if (!skill) return null;
  return [...skill.unlocks].reverse().find(([minimum]) => value >= minimum)?.[1] || null;
};
export const fameLevel = followers => [...FAME_LEVELS].reverse().find(x => followers >= x.threshold) || FAME_LEVELS[0];
export const fmt = (amount, island) => {
  const n = Math.max(0, Math.round(amount || 0));
  const prefix = island?.currency || '$';
  if (n >= 1e6) return `${prefix}${(n / 1e6).toFixed(2)}M`;
  if (n >= 1000) return `${prefix}${(n / 1000).toFixed(1)}K`;
  return `${prefix}${n.toLocaleString()}`;
};

export function generateFamily(islandId, backgroundId) {
  const fatherAge = 45 + Math.floor(Math.random() * 10);
  const motherAge = 42 + Math.floor(Math.random() * 10);
  const siblings = backgroundId === 'poverty' ? 1 + Math.floor(Math.random() * 3) : Math.floor(Math.random() * 3);
  return {
    father:{name:generateName('m', islandId), age:fatherAge, alive:true, health:68 + Math.floor(Math.random() * 18)},
    mother:{name:generateName('f', islandId), age:motherAge, alive:true, health:68 + Math.floor(Math.random() * 18)},
    siblings:Array.from({length:siblings}, () => ({name:generateName(Math.random() > 0.5 ? 'm' : 'f', islandId), age:16 + Math.floor(Math.random() * 12), relationship:70 + Math.floor(Math.random() * 16)}))
  };
}

export function defaultSkills(bonus = {}) {
  return {
    cooking:0, tech:0, trade:0, finance:0,
    creative:bonus.creative || 0,
    leadership:bonus.workEthic ? 4 : 0,
    fitness:0
  };
}

export function defaultSkatingState() {
  return {
    unlocked:false,
    brand:'The Skate Guys',
    primaryDiscipline:null,
    disciplinesUnlocked:[],
    stats:{balance:0, agility:0, technique:0, confidence:0},
    gear:{skates:false, helmet:false, pads:false, wristGuards:false, mouthguard:false, condition:0},
    reputation:0,
    certifications:[],
    flags:[]
  };
}

export function defaultPlayerSettings() {
  return {
    reducedMotion:false,
    textSize:'standard'
  };
}

export function normalizeSkatingState(skating = {}) {
  const defaults = defaultSkatingState();
  return {
    ...defaults,
    ...skating,
    disciplinesUnlocked:Array.isArray(skating.disciplinesUnlocked) ? [...skating.disciplinesUnlocked] : [],
    stats:{...defaults.stats, ...(skating.stats || {})},
    gear:{...defaults.gear, ...(skating.gear || {})},
    certifications:Array.isArray(skating.certifications) ? [...skating.certifications] : [],
    flags:Array.isArray(skating.flags) ? [...skating.flags] : []
  };
}

export function normalizePlayerSettings(settings = {}) {
  const defaults = defaultPlayerSettings();
  const textSize = ['compact','standard','large'].includes(settings.textSize) ? settings.textSize : defaults.textSize;
  return {
    ...defaults,
    ...settings,
    reducedMotion:Boolean(settings.reducedMotion),
    textSize
  };
}

function normalizeGameState(game) {
  return {
    ...game,
    skating:normalizeSkatingState(game.skating),
    playerSettings:normalizePlayerSettings(game.playerSettings)
  };
}

export function createInitialGame({ islandId, backgroundId, name, preference, goalId = 'own_path', themeMode = 'sleek', avatarId = 'youth_neutral' }) {
  const island = islandById(islandId);
  const background = backgroundById(backgroundId);
  const bonus = island.bonus || {};
  const game = {
    version:4,
    islandId,
    backgroundId,
    name:name.trim() || generateName('m', islandId),
    preference:preference || 'any',
    goalId,
    themeMode,
    avatarId,
    playerSettings:defaultPlayerSettings(),
    generation:1,
    age:18,
    stats:{
      happiness:clamp(background.stats.happiness + (bonus.happiness || 0)),
      health:clamp(background.stats.health),
      stress:20,
      relationships:clamp(background.stats.relationships + (bonus.relationships || 0)),
      intelligence:clamp(background.stats.intelligence + (bonus.intelligence || 0)),
      workEthic:clamp(background.stats.workEthic + (bonus.workEthic || 0)),
      communityStanding:clamp(20 + (bonus.communityStanding || 0)),
      integrity:70
    },
    skills:defaultSkills(bonus),
    career:'none',
    careerLevel:0,
    business:{active:false, level:0},
    properties:[],
    finance:{
      cash:(background.cash || 0) + (bonus.cash || 0),
      investments:0,
      propertyValue:0,
      mortgageDebt:0,
      businessRevenue:0,
      businessExpenses:0,
      loanDebt:0,
      monthlyIncome:0,
      monthlyExpenses:0,
      emergencyFundTarget:0,
      pardner:{active:false, turns:0},
      contracts:[]
    },
    flags:[],
    achievements:[],
    family:generateFamily(islandId, backgroundId),
    partner:null,
    children:[],
    lastBirthAge:null,
    damian:{name:generateName('m', islandId), wealth:5000, career:'employee', businessLevel:0, relationship:'rival', age:18},
    addictions:{rum:0, gambling:0},
    followers:0,
    skating:defaultSkatingState(),
    migration:null,
    yearLog:[],
    yearLims:{},
    yearFocus:0,
    yearReview:null
  };
  return refreshFinance(game);
}

export function monthlyPayment(principal, annualRate, years) {
  if (principal <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

function amortise(principal, annualRate, years, months = 12) {
  if (principal <= 0) return 0;
  const pay = monthlyPayment(principal, annualRate, years);
  let balance = principal;
  for (let i = 0; i < months; i += 1) {
    const interest = balance * (annualRate / 12);
    balance = Math.max(0, balance + interest - pay);
  }
  return balance;
}

function getMigrationMultiplier(game) {
  return game.migration?.incomeMultiplier || 1;
}

export function refreshFinance(game) {
  const base = normalizeGameState(game);
  const island = islandById(base.islandId);
  const background = backgroundById(base.backgroundId);
  const f = {...base.finance};
  const career = careerLabel(base.career);
  const levelMultiplier = 1 + base.careerLevel * 0.16;
  const careerIncome = career.base * island.incomeMultiplier * levelMultiplier * getMigrationMultiplier(base);
  const businessNet = base.business.active ? Math.max(0, f.businessRevenue - f.businessExpenses) : 0;
  const rentalIncome = base.properties.filter(p => p.kind === 'rental').length * island.rentalIncome;
  const contractIncome = f.contracts.reduce((total, contract) => total + (contract.annual || 0) / 12, 0);
  const mortgage = monthlyPayment(f.mortgageDebt, 0.07, 20);
  const loan = monthlyPayment(f.loanDebt, 0.08, 10);
  const baseExpenses = island.monthlyEssentials * background.monthlyModifier;
  const familyExpenses = base.children.length * 145 + (base.partner ? 110 : 0);
  const monthlyIncome = Math.round(careerIncome + businessNet + rentalIncome + contractIncome);
  const monthlyExpenses = Math.round(baseExpenses + familyExpenses + mortgage + loan);
  const propertyValue = Math.round(base.properties.reduce((total, property) => total + property.value, 0));
  return {
    ...base,
    finance:{
      ...f,
      monthlyIncome,
      monthlyExpenses,
      emergencyFundTarget:monthlyExpenses * 6,
      propertyValue
    }
  };
}

export function totalNetWorth(game) {
  return Math.max(0, game.finance.cash + game.finance.investments + game.finance.propertyValue - game.finance.mortgageDebt - game.finance.loanDebt);
}

function applyChanges(game, changes = {}) {
  const next = {...game, stats:{...game.stats}, skills:{...game.skills}, finance:{...game.finance}};
  for (const [key, value] of Object.entries(changes)) {
    if (key === 'cash') next.finance.cash = Math.max(0, next.finance.cash + value);
    else if (key === 'propertyValue') {
      next.properties = next.properties.map((property, index) => index === 0 ? {...property, value:Math.max(0, property.value + value)} : property);
    } else if (key === 'fame') next.followers = Math.max(0, next.followers + value);
    else if (key in next.stats) next.stats[key] = clamp(next.stats[key] + value);
    else if (key in next.skills) next.skills[key] = clamp(next.skills[key] + value);
  }
  return refreshFinance(next);
}

function applySkillChanges(game, skills = {}) {
  const next = {...game, skills:{...game.skills}};
  for (const [key, value] of Object.entries(skills)) next.skills[key] = clamp((next.skills[key] || 0) + value);
  return next;
}

function addFlag(game, flag) {
  return flag && !game.flags.includes(flag) ? {...game, flags:[...game.flags, flag]} : game;
}

function record(game, action, extra = {}) {
  const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Math.min(11, Math.floor(game.yearLog.length / Math.max(1, YEAR_FOCUS - 1) * 11))];
  return {...game, yearLog:[...game.yearLog, {id:action.id, label:action.label, emoji:action.emoji, cost:action.cost, month, ...extra}]};
}

function automaticCareer(game) {
  const s = game.skills;
  if (s.fitness >= 40) return 'health_pro';
  if (s.tech >= 25) return 'tech';
  if (s.trade >= 25) return 'trade';
  if (s.finance >= 35) return 'finance';
  if (s.creative >= 30) return 'creative';
  if (s.leadership >= 40) return 'community';
  return 'employee';
}

function partnerGender(preference) {
  if (preference === 'women') return 'f';
  if (preference === 'men') return 'm';
  return Math.random() > 0.5 ? 'f' : 'm';
}

function createPartner(game) {
  const gender = partnerGender(game.preference);
  return {name:generateName(gender, game.islandId), gender, age:Math.max(18, game.age - 2 + Math.floor(Math.random() * 5)), relationship:64, married:false};
}

function newChild(game) {
  const gender = Math.random() > 0.5 ? 'm' : 'f';
  return {id:uid(), name:generateName(gender, game.islandId), age:0, bornAge:game.age, stats:{intelligence:50 + Math.floor(Math.random() * 15), wellbeing:70}};
}

function applyVice(game, type, amount) {
  const next = {...game, addictions:{...game.addictions}};
  next.addictions[type] = clamp((next.addictions[type] || 0) + amount);
  return next;
}

const SKATING_GEAR_LABELS = {
  skates:'Starter Skates',
  helmet:'helmet',
  pads:'pads',
  wristGuards:'wrist guards',
  mouthguard:'mouthguard'
};

const SKATING_FLAG_LABELS = {
  beginner_progression:'Complete Beginner Class Block first'
};

function disciplineLabel(id) {
  return SKATING_DISCIPLINES.find(item => item.id === id)?.label || 'Skate discipline';
}

function updateSkating(game, updater) {
  const skating = normalizeSkatingState(game.skating);
  return {...game, skating:normalizeSkatingState(updater(skating))};
}

function addSkatingFlag(skating, flag) {
  return skating.flags.includes(flag) ? skating : {...skating, flags:[...skating.flags, flag]};
}

function applySkatingStats(game, stats = {}) {
  return updateSkating(game, skating => ({
    ...skating,
    stats:Object.fromEntries(Object.entries(skating.stats).map(([key, value]) => [key, clamp(value + (stats[key] || 0))]))
  }));
}

function applySkatingReputation(game, amount = 0) {
  return updateSkating(game, skating => ({...skating, reputation:clamp(skating.reputation + amount)}));
}

function wearSkates(game, amount) {
  return updateSkating(game, skating => ({
    ...skating,
    gear:{...skating.gear, condition:clamp((skating.gear.condition || 0) - amount)}
  }));
}

function skatingActionTag(action) {
  return action.id?.startsWith('unlock_') || action.id?.includes('skate') || action.special?.startsWith('skating_');
}

function applySpecial(game, action) {
  const island = islandById(game.islandId);
  let next = game;
  const special = action.special;
  if (!special) return {game:next, forcedEvent:null, notices:[]};
  const notices = [];
  switch (special) {
    case 'income_boost': next = applyChanges(next, {cash:Math.round(next.finance.monthlyIncome * 2.2)}); break;
    case 'hustle_cash_400': next = applyChanges(next, {cash:400}); break;
    case 'hustle_cash_650': next = applyChanges(next, {cash:650}); break;
    case 'hustle_cash_280': next = applyChanges(next, {cash:280}); break;
    case 'save_cash': next = applyChanges(next, {cash:Math.round(Math.max(250, next.finance.monthlyIncome * 0.18))}); break;
    case 'invest_index': {
      const amount = Math.min(6000, Math.max(750, Math.round(next.finance.cash * 0.15)));
      next = {...next, finance:{...next.finance, cash:Math.max(0,next.finance.cash - amount), investments:next.finance.investments + amount}};
      next = refreshFinance(next);
      notices.push(`Moved ${fmt(amount, island)} into long-term investments.`);
      break;
    }
    case 'buy_property': {
      const deposit = Math.round(island.propertyPrice * 0.20);
      const mortgage = island.propertyPrice - deposit;
      const kind = next.properties.length ? 'rental' : 'home';
      const property = {id:uid(), kind, value:island.propertyPrice, mortgage};
      next = {...next, properties:[...next.properties, property], finance:{...next.finance, cash:Math.max(0,next.finance.cash-deposit), mortgageDebt:next.finance.mortgageDebt + mortgage}};
      next = addFlag(next, 'owned_property');
      next = refreshFinance(next);
      notices.push(`${kind === 'home' ? 'Home' : 'Rental property'} added with a tracked mortgage.`);
      break;
    }
    case 'join_pardner': {
      next = {...next, finance:{...next.finance, cash:Math.max(0,next.finance.cash-400), pardner:{active:true, turns:0}}};
      next = refreshFinance(next);
      notices.push('Joined a Pardner hand. Payout timing will arrive through the year-end system.');
      break;
    }
    case 'take_loan': {
      next = {...next, finance:{...next.finance, loanDebt:next.finance.loanDebt + 8000}};
      next = addFlag(next, 'had_loan');
      next = refreshFinance(next);
      notices.push(`Loan added once: ${fmt(8000, island)} cash and ${fmt(8000, island)} loan debt.`);
      break;
    }
    case 'risky_invest': {
      const stake = Math.min(14000, Math.max(500, Math.round(next.finance.cash * 0.25)));
      next = {...next, finance:{...next.finance, cash:Math.max(0,next.finance.cash - stake)}};
      if (Math.random() > 0.45) {
        next = applyChanges(next, {cash:Math.round(stake * 2.5)});
        notices.push('The high-risk investment paid out.');
      } else {
        next = applyVice(next, 'gambling', 15);
        notices.push('The high-risk investment failed and increased gambling risk.');
      }
      break;
    }
    case 'creative_action': next = {...next, followers:next.followers + 350 + Math.round(Math.random() * 500)}; break;
    case 'post_content': {
      next = {...next, followers:next.followers + 400 + Math.round(Math.random() * 700)};
      if (next.skills.creative >= 25 && next.career !== 'creator') next = {...next, career:'creator'};
      break;
    }
    case 'hustle_fame': next = {...next, followers:next.followers + 500 + Math.round(Math.random() * 800)}; break;
    case 'try_promotion': {
      if (Math.random() > 0.42) {
        next = {...next, careerLevel:Math.min(5, next.careerLevel + 1)};
        notices.push('Promotion confirmed. Career level increased.');
      } else notices.push('No promotion this time. The work still improved your case.');
      break;
    }
    case 'career_switch': next = {...next, career:automaticCareer(next), careerLevel:0}; break;
    case 'rest_recovery': next = applyVice(next, 'rum', -8); break;
    case 'checkup': next = addFlag(next, 'checkup'); break;
    case 'rehab': next = {...next, addictions:{rum:0,gambling:0}}; next = addFlag(next, 'in_recovery'); notices.push('Recovery plan started.'); break;
    case 'rum_risk': if (Math.random() > 0.62) next = applyVice(next, 'rum', 8); break;
    case 'family_time': if (next.partner) next = {...next, partner:{...next.partner, relationship:clamp(next.partner.relationship + 6)}}; break;
    case 'love': {
      if (!next.partner) { const partner = createPartner(next); next = {...next, partner}; notices.push(`You met ${partner.name.split(' ')[0]}.`); }
      else next = {...next, partner:{...next.partner, relationship:clamp(next.partner.relationship + 10)}};
      break;
    }
    case 'have_child': {
      const child = newChild(next);
      next = {...next, children:[...next.children, child], lastBirthAge:next.age};
      notices.push(`${child.name.split(' ')[0]} joined the family.`);
      break;
    }
    case 'damian_contact': {
      const relation = next.damian.relationship === 'rival' ? 'neutral' : next.damian.relationship;
      next = {...next, damian:{...next.damian, relationship:relation}};
      break;
    }
    case 'damian_compete': {
      const win = Math.random() > 0.4;
      next = applyChanges(next, {cash:win ? 2000 : 0, communityStanding:win ? 8 : -4});
      notices.push(win ? 'You won the round on results, not noise.' : 'Damian edged this round.');
      break;
    }
    case 'damian_partner': next = {...next, damian:{...next.damian, relationship:'partner'}}; next = applyChanges(next, {cash:3000}); break;
    case 'damian_help': {
      if (['ally','partner'].includes(next.damian.relationship)) next = applyChanges(next, {cash:2000});
      else next = applyChanges(next, {relationships:-5});
      break;
    }
    case 'damian_cutoff': next = {...next, damian:{...next.damian, relationship:'enemy'}}; break;
    case 'start_business': {
      next = {...next, business:{active:true, level:1}, career:'entrepreneur', finance:{...next.finance, businessRevenue:1600, businessExpenses:600}};
      next = addFlag(next, 'business_started');
      notices.push('Business launched. Revenue and expenses are now tracked monthly.');
      break;
    }
    case 'grow_business': {
      next = {...next, business:{...next.business, level:Math.min(5,next.business.level+1)}, finance:{...next.finance, businessRevenue:next.finance.businessRevenue+450, businessExpenses:next.finance.businessExpenses+110}};
      break;
    }
    case 'market_business': next = {...next, finance:{...next.finance, businessRevenue:next.finance.businessRevenue+550, businessExpenses:next.finance.businessExpenses+80}}; break;
    case 'quality_business': next = {...next, finance:{...next.finance, businessRevenue:next.finance.businessRevenue+180}}; break;
    case 'systemise_business': next = {...next, finance:{...next.finance, businessExpenses:Math.max(0,next.finance.businessExpenses-100)}}; break;
    case 'renovate_property': {
      next = {...next, properties:next.properties.map((property,index)=>index===0 ? {...property,value:property.value+3000} : property)};
      next = refreshFinance(next); break;
    }
    case 'sell_property': {
      const property = next.properties[0];
      if (property) {
        const mortgageShare = Math.min(next.finance.mortgageDebt, property.mortgage || 0);
        const sale = Math.round(property.value * 0.84);
        next = {...next, properties:next.properties.slice(1), finance:{...next.finance, cash:next.finance.cash+sale-mortgageShare, mortgageDebt:Math.max(0,next.finance.mortgageDebt-mortgageShare)}};
        next = refreshFinance(next);
        notices.push(`Sold one property. Mortgage share cleared: ${fmt(mortgageShare, island)}.`);
      }
      break;
    }
    case 'skating_buy_starter': {
      next = updateSkating(next, skating => addSkatingFlag({
        ...skating,
        unlocked:true,
        gear:{...skating.gear, skates:true, condition:100},
        stats:{...skating.stats, confidence:clamp(skating.stats.confidence + 6)}
      }, 'action:buy_starter_skates'));
      notices.push('Skate Life unlocked with Starter Skates from The Skate Guys circle.');
      break;
    }
    case 'skating_buy_protective': {
      next = updateSkating(next, skating => addSkatingFlag({
        ...skating,
        gear:{...skating.gear, helmet:true, pads:true, wristGuards:true},
        stats:{...skating.stats, confidence:clamp(skating.stats.confidence + 2)}
      }, 'action:buy_protective_kit'));
      notices.push('Protective kit added: helmet, pads, and wrist guards.');
      break;
    }
    case 'skating_beginner_class': {
      next = applySkatingStats(next, {balance:12, technique:10, confidence:8});
      next = wearSkates(next, 6);
      next = updateSkating(next, skating => addSkatingFlag(addSkatingFlag(skating, 'beginner_progression'), 'action:beginner_skate_class'));
      notices.push('Beginner progression completed with The Skate Guys foundation drills.');
      break;
    }
    case 'skating_conditioning': {
      next = applySkatingStats(next, {agility:9, balance:4});
      next = wearSkates(next, 7);
      next = updateSkating(next, skating => addSkatingFlag(skating, 'action:skate_conditioning'));
      break;
    }
    case 'skating_community_jam': {
      next = applySkatingStats(next, {confidence:10});
      next = applySkatingReputation(next, 10);
      next = wearSkates(next, 8);
      next = updateSkating(next, skating => addSkatingFlag(skating, 'action:skate_guys_jam'));
      notices.push('The Skate Guys community knows your face now.');
      break;
    }
    case 'skating_service': {
      next = updateSkating(next, skating => ({
        ...addSkatingFlag(skating, 'action:service_skates'),
        gear:{...skating.gear, condition:clamp((skating.gear.condition || 0) + 45)}
      }));
      notices.push('Skate condition restored with cleaned bearings and rotated wheels.');
      break;
    }
    case 'skating_unlock_discipline': {
      const disciplineId = action.disciplineId;
      if (disciplineId) {
        next = updateSkating(next, skating => {
          const disciplinesUnlocked = skating.disciplinesUnlocked.includes(disciplineId) ? skating.disciplinesUnlocked : [...skating.disciplinesUnlocked, disciplineId];
          return addSkatingFlag({
            ...skating,
            primaryDiscipline:disciplineId,
            disciplinesUnlocked,
            reputation:clamp(skating.reputation + 6),
            stats:{...skating.stats, confidence:clamp(skating.stats.confidence + 6)}
          }, `discipline:${disciplineId}`);
        });
        next = wearSkates(next, 4);
        notices.push(`${disciplineLabel(disciplineId)} is now your primary Skate Life discipline.`);
      }
      break;
    }
    case 'migration_event': return {game:next, forcedEvent:buildMigrationEvent(next), notices};
    default: break;
  }
  return {game:refreshFinance(next), forcedEvent:null, notices};
}

export function getRequirementStatus(game, req = {}) {
  const island = islandById(game.islandId);
  const skating = normalizeSkatingState(game.skating);
  const lines = [];
  let ok = true;
  const fail = (text) => {ok = false; lines.push(text);};
  if (req.cash && game.finance.cash < req.cash) fail(`Need ${fmt(req.cash, island)} cash · ${fmt(game.finance.cash, island)} available`);
  if (req.propertyDeposit) {
    const deposit = Math.round(island.propertyPrice * 0.20);
    if (game.finance.cash < deposit) fail(`Need ${fmt(deposit, island)} deposit · ${fmt(game.finance.cash, island)} available`);
  }
  if (req.skill) for (const [skill, value] of Object.entries(req.skill)) if ((game.skills[skill] || 0) < value) fail(`Need ${skill} ${value} · currently ${game.skills[skill] || 0}`);
  if (req.skating) {
    if (req.skating.unlocked && !skating.unlocked) fail('Need Starter Skates');
    if (req.skating.gear?.length) {
      const missing = req.skating.gear.filter(item => !skating.gear[item]);
      if (missing.length) {
        if (req.skating.gear.includes('helmet') && req.skating.gear.includes('pads') && req.skating.gear.includes('wristGuards')) fail('Need helmet, pads, and wrist guards for Roller Derby');
        else missing.forEach(item => fail(item === 'skates' ? 'Need Starter Skates' : `Need ${SKATING_GEAR_LABELS[item] || item}`));
      }
    }
    if (req.skating.stats) {
      for (const [stat, value] of Object.entries(req.skating.stats)) {
        const current = skating.stats[stat] || 0;
        if (current < value) fail(`Need ${stat[0].toUpperCase()}${stat.slice(1)} ${value} · currently ${current}`);
      }
    }
    if (req.skating.flags) {
      for (const flag of req.skating.flags) if (!skating.flags.includes(flag)) fail(SKATING_FLAG_LABELS[flag] || `Need skating step: ${flag}`);
    }
  }
  if (req.business && !game.business.active) fail('Start a business first');
  if (req.property && game.properties.length < 1) fail('Own at least 1 property');
  if (req.addiction && Object.values(game.addictions).every(v => v < 20)) fail('Available when an addiction reaches 20%');
  if (req.damian && game.damian.relationship !== req.damian) fail(`Need Damian relationship: ${req.damian}`);
  if (req.damianAny && !req.damianAny.includes(game.damian.relationship)) fail(`Need Damian relationship: ${req.damianAny.join(' or ')}`);
  if (req.partner && !game.partner) fail('Build a relationship first');
  if (req.children && game.children.length < req.children) fail(`Need ${req.children} child${req.children > 1 ? 'ren' : ''}`);
  if (req.age && game.age < req.age) fail(`Unlocks at age ${req.age}`);
  if (req.skillAny && !Object.values(game.skills).some(value => value >= req.skillAny)) fail(`Need at least one skill at ${req.skillAny}`);
  if (req.romance && game.preference === 'none') fail('Romance is disabled for this character');
  if (req.noChildThisYear && game.lastBirthAge === game.age) fail('One new child decision per age');
  return {ok, lines};
}

export function findAction(id) {
  for (const category of ACTION_CATEGORIES) {
    const action = category.items.find(item => item.id === id);
    if (action) return action;
  }
  return [...BUSINESS_ACTIONS, ...PROPERTY_ACTIONS].find(item => item.id === id) || null;
}

export function canUseAction(game, action) {
  const req = getRequirementStatus(game, action.req);
  if (!req.ok) return req;
  const used = action.lk ? (game.yearLims[action.lk] || 0) : 0;
  if (action.ym != null && used >= action.ym) return {ok:false, lines:[`Year limit reached: ${used}/${action.ym}`]};
  if (game.yearFocus + action.cost > YEAR_FOCUS) return {ok:false, lines:[`Need ${action.cost} focus · only ${YEAR_FOCUS-game.yearFocus} left`]};
  return {ok:true, lines:[]};
}

function eventRequirementsMet(game, event) {
  if (event.minAge && game.age < event.minAge) return false;
  if (event.maxAge && game.age > event.maxAge) return false;
  if (event.islands?.length && !event.islands.includes(game.islandId)) return false;
  if (event.goalIds?.length && !event.goalIds.includes(game.goalId)) return false;
  if (event.req?.business && !game.business.active) return false;
  if (event.req?.property && game.properties.length < 1) return false;
  if (event.req?.children && game.children.length < event.req.children) return false;
  if (event.req?.addiction && Object.values(game.addictions).every(v => v < 20)) return false;
  if (event.req?.partner && !game.partner) return false;
  if (event.req?.career && game.career === 'none') return false;
  if (event.req?.migration && !game.migration) return false;
  if (event.req?.noMigration && game.migration) return false;
  if (event.req?.followers && game.followers < event.req.followers) return false;
  if (event.req?.stressHigh && game.stats.stress < event.req.stressHigh) return false;
  if (event.req?.healthLow && game.stats.health > event.req.healthLow) return false;
  if (event.req?.skating && !getRequirementStatus(game, {skating:event.req.skating}).ok) return false;
  return true;
}

function currentContextEvent(game) {
  const counts = game.yearLog.reduce((acc, entry) => ({...acc,[entry.id]:(acc[entry.id] || 0) + 1}), {});
  const eligible = CONTEXT_EVENTS.filter(event => {
    if (game.flags.includes(`event:${event.id}`)) return false;
    if (!eventRequirementsMet(game, event)) return false;
    const overlap = (event.tags || []).reduce((sum, tag) => sum + (counts[tag] || 0), 0);
    return overlap >= (event.min || 1);
  });
  if (!eligible.length) return null;
  return pick(eligible);
}

function randomLifeEvent(game) {
  const eligible = RANDOM_LIFE_EVENTS.filter(event => (
    !game.flags.includes(`event:${event.id}`) && eventRequirementsMet(game, event)
  ));
  if (!eligible.length) return null;
  return pick(eligible);
}

export function buildMigrationEvent(game) {
  const island = islandById(game.islandId);
  return {
    id:'migration_offer', title:'Migration Route Opened', icon:'🧳', category:'MIGRATION', accent:'#00D9FF',
    story:`You have options beyond ${island.name}. Each route increases earning potential, but distance changes the people and routines around you.`,
    tip:'Migration can increase income, but the full calculation includes support systems, cost of living, immigration status, and family strain.',
    choices:[
      {label:'🌴 Regional contract', result:'You kept the Caribbean close while building a wider professional network.', changes:{cash:1500,relationships:-4}, special:'migrate_regional'},
      {label:'🇨🇦 Canada pathway', result:'The move improved income potential but required patience and a new support system.', changes:{cash:3000,stress:8,relationships:-10}, special:'migrate_canada'},
      {label:'🇬🇧 UK pathway', result:'You gained a stronger market opportunity and had to adapt fast.', changes:{cash:2800,stress:9,relationships:-9}, special:'migrate_uk'},
      {label:'🇺🇸 US pathway', result:'The upside is real, but so is the pace and distance.', changes:{cash:3600,stress:12,relationships:-12}, special:'migrate_us'},
      {label:'🏠 Stay and build here', result:'You chose to deepen roots and build leverage where people already know your name.', changes:{communityStanding:8,happiness:5}}
    ]
  };
}

export function staticEvent(game) {
  const island = islandById(game.islandId);
  const flags = game.flags;
  if (game.age >= 20 && !flags.includes(`event:island_${game.age}`) && Math.random() < 0.09) {
    return {...island.unique, id:`island_${game.age}`, category:'ISLAND MOMENT', accent:'#FFD60A'};
  }
  if (island.stormRisk > 0 && game.age >= 20 && !flags.includes('event:storm') && Math.random() < island.stormRisk) {
    return {
      id:'storm', title:'Severe Weather Warning', icon:'🌀', category:'WEATHER', accent:'#FF6464',
      story:'A serious weather system is moving through the region. Family, property, and business all need a decision before conditions worsen.',
      tip:'Emergency savings and insurance are planning tools, not luxuries.',
      choices:[
        {label:'👨‍👩‍👧 Secure family first', result:'You prioritised people and paid for transport and supplies.', changes:{cash:-900,health:8,stress:-5,relationships:12}},
        {label:'🏠 Secure property and stock', result:'You protected the asset but carried the pressure yourself.', changes:{cash:-700,stress:16,propertyValue:1200}},
        {label:'🤝 Help neighbours too', result:'The community remembered who showed up when the weather turned.', changes:{cash:-500,communityStanding:22,stress:12}},
        {label:'📦 Profit from shortages', result:'You made money, but it cost you trust.', changes:{cash:700,integrity:-30,communityStanding:-36}}
      ]
    };
  }
  if (game.age >= 44 && game.stats.stress > 72 && game.stats.health < 45 && !flags.includes('event:cardiac')) {
    return {
      id:'cardiac', title:'Chest Tightening', icon:'💔', category:'HEALTH CRISIS', accent:'#FF6464',
      story:'The warning signs are no longer abstract. A doctor is blunt about stress, sleep, diet, and years of pushing past empty.',
      tip:'Your body keeps a ledger. It does not accept motivation as payment.',
      choices:[
        {label:'🏥 Make a real change', result:'You adjusted work, treatment, food, and recovery. It was expensive but necessary.', changes:{cash:-2500,health:30,stress:-35,happiness:15}},
        {label:'💊 Treat symptoms only', result:'You reduced the immediate risk but kept much of the same pace.', changes:{cash:-600,health:11,stress:-6}},
        {label:'🙈 Ignore it', result:'You delayed the decision, not the consequence.', changes:{health:-26,stress:22,happiness:-16}, special:'cardiac_ignored'}
      ]
    };
  }
  if (game.age === 30 && !flags.includes('event:damian30')) {
    return {
      id:'damian30', title:`${game.damian.name}'s New Car`, icon:'👀', category:'COMPARISON', accent:'#C07AFF',
      story:`${game.damian.name}—same school, same starting point—just posted a new car. The comparison arrives before you can stop it.`,
      tip:'Net worth is what you keep, not what you post.',
      choices:[
        {label:'🏆 Use it as fuel', result:'You returned to your own plan with more discipline, not more debt.', changes:{workEthic:14,stress:8}},
        {label:'😌 Stay in your lane', result:'You kept your attention on the numbers that actually matter to your life.', changes:{happiness:12,health:6,stress:-9}, special:'damian_ally'},
        {label:'🚗 Finance something to match', result:'The image was immediate. The payment was not.', changes:{cash:-4000,stress:22,integrity:-8}, special:'add_loan_11000'}
      ]
    };
  }
  if (game.age >= 18 && game.yearFocus > 0 && game.yearFocus < YEAR_FOCUS && Math.random() < 0.14) {
    return randomLifeEvent(game);
  }
  return null;
}

function maybeBrandDeal(game, previousFollowers) {
  const before = fameLevel(previousFollowers).level;
  const after = fameLevel(game.followers).level;
  if (after <= before) return null;
  const deal = BRAND_DEALS.find(item => item.minLevel <= after && !game.finance.contracts.some(contract => contract.id === item.id) && !game.flags.includes(`declined:${item.id}`));
  if (!deal) return null;
  return {
    id:`brand_${deal.id}`, title:`Brand Deal: ${deal.name}`, icon:'✨', category:'BRAND DEAL', accent:'#C07AFF',
    story:deal.message,
    tip:'A brand deal is a contract, not permanent income. Treat it as a time-bound project with deliverables.',
    choices:[
      {label:`✅ Sign — ${deal.name}`, result:`Contract signed. ${deal.name} is a one-year campaign, not an endless income source.`, changes:{cash:deal.fee,happiness:14,communityStanding:8}, special:'sign_brand', dealId:deal.id},
      {label:'❌ Decline — not aligned', result:'You protected the long-term identity of the brand you are building.', changes:{integrity:5}, special:'decline_brand', dealId:deal.id}
    ]
  };
}

export function awardAchievements(game) {
  const newOnes = ACHIEVEMENTS.filter(item => !game.achievements.includes(item.id) && item.test(game));
  if (!newOnes.length) return {game, newOnes:[]};
  return {game:{...game, achievements:[...game.achievements, ...newOnes.map(item => item.id)]}, newOnes};
}

export function evaluateDeath(game) {
  if (game.stats.health <= 4) return 'The body gave out after years of neglect, pressure, and a pace that never allowed recovery.';
  if (game.flags.includes('cardiac_ignored') && game.stats.stress > 80) return 'A cardiac crisis arrived after too many warnings were pushed aside.';
  return null;
}

export function applyAction(game, action) {
  const valid = canUseAction(game, action);
  if (!valid.ok) return {game, error:valid.lines[0], event:null, death:null, achievements:[]};
  const followersBefore = game.followers;
  let next = applyChanges(game, action.changes);
  next = applySkillChanges(next, action.skills);
  const limits = {...next.yearLims};
  if (action.lk) limits[action.lk] = (limits[action.lk] || 0) + 1;
  next = {...next, yearLims:limits, yearFocus:next.yearFocus + action.cost};
  next = record(next, action);
  const special = applySpecial(next, action);
  next = special.game;
  if (skatingActionTag(action)) next = updateSkating(next, skating => addSkatingFlag(skating, `used:${action.id}`));
  if (next.career === 'none') {
    next = {...next, career:'employee'};
  } else if (next.career === 'employee') {
    const career = automaticCareer(next);
    if (career !== 'employee') next = {...next, career};
  }
  if (next.career !== 'none' && next.skills.leadership >= (next.careerLevel + 1) * 18) next = {...next, careerLevel:Math.min(5,next.careerLevel+1)};
  next = refreshFinance(next);
  const awarded = awardAchievements(next);
  next = awarded.game;
  const death = evaluateDeath(next);
  if (death) return {game:next, error:null, event:null, death, achievements:awarded.newOnes, notices:special.notices};
  if (special.forcedEvent) return {game:next, error:null, event:special.forcedEvent, death:null, achievements:awarded.newOnes, notices:special.notices};
  const context = action.cost > 0 && next.yearFocus % 3 === 0 && next.yearFocus < YEAR_FOCUS ? currentContextEvent(next) : null;
  if (context) return {game:addFlag(next, `event:${context.id}`), error:null, event:context, death:null, achievements:awarded.newOnes, notices:special.notices};
  const brand = maybeBrandDeal(next, followersBefore);
  if (brand) return {game:next, error:null, event:brand, death:null, achievements:awarded.newOnes, notices:special.notices};
  const stat = staticEvent(next);
  if (stat) return {game:addFlag(next, `event:${stat.id}`), error:null, event:stat, death:null, achievements:awarded.newOnes, notices:special.notices};
  return {game:next, error:null, event:null, death:null, achievements:awarded.newOnes, notices:special.notices};
}

function applyEventSpecial(game, choice) {
  let next = game;
  switch (choice.special) {
    case 'career_level': next = {...next, careerLevel:Math.min(5,next.careerLevel + 1)}; break;
    case 'property_value_up': next = {...next, properties:next.properties.map((property,index)=>index===0 ? {...property, value:property.value+1800} : property)}; break;
    case 'recovery_step': next = applyVice(next, 'rum', -20); next = applyVice(next, 'gambling', -20); next = addFlag(next, 'in_recovery'); break;
    case 'addiction_up': next = applyVice(next, 'rum', 16); break;
    case 'cardiac_ignored': next = addFlag(next, 'cardiac_ignored'); break;
    case 'damian_ally': next = {...next, damian:{...next.damian, relationship:'ally'}}; break;
    case 'add_loan_11000': next = {...next, finance:{...next.finance, loanDebt:next.finance.loanDebt+11000}}; next = addFlag(next,'had_loan'); break;
    case 'migrate_regional': next = {...next, migration:{label:'Regional contract', incomeMultiplier:1.10}}; break;
    case 'migrate_canada': next = {...next, migration:{label:'Canada pathway', incomeMultiplier:1.38}}; break;
    case 'migrate_uk': next = {...next, migration:{label:'UK pathway', incomeMultiplier:1.32}}; break;
    case 'migrate_us': next = {...next, migration:{label:'US pathway', incomeMultiplier:1.48}}; break;
    case 'sign_brand': {
      const deal = BRAND_DEALS.find(item => item.id === choice.dealId);
      if (deal && !next.finance.contracts.some(contract => contract.id === deal.id)) next = {...next, finance:{...next.finance, contracts:[...next.finance.contracts,{id:deal.id,name:deal.name,annual:deal.annual,yearsLeft:deal.years}]}};
      break;
    }
    case 'decline_brand': next = addFlag(next, `declined:${choice.dealId}`); break;
    case 'skate_invite_join':
      next = applySkatingStats(next, {confidence:8, balance:4});
      next = applySkatingReputation(next, 10);
      next = wearSkates(next, 5);
      break;
    case 'skate_invite_volunteer':
      next = applySkatingStats(next, {confidence:6, technique:4});
      next = applySkatingReputation(next, 14);
      break;
    case 'skate_invite_watch':
      next = applySkatingStats(next, {technique:5, confidence:3});
      next = applySkatingReputation(next, 4);
      break;
    default: break;
  }
  return refreshFinance(next);
}

function eventChoiceChanges(choice) {
  const changes = {...(choice.changes || {})};
  if (choice.fame) changes.fame = (changes.fame || 0) + choice.fame;
  return changes;
}

export function applyEventChoice(game, event, choice) {
  const changes = eventChoiceChanges(choice);
  let next = applyChanges(game, changes);
  next = applyEventSpecial(next, choice);
  next = record(next, {id:`event:${event.id}`,label:event.title,emoji:event.icon,cost:0}, {isEvent:true});
  next = addFlag(next, `event:${event.id}`);
  const awarded = awardAchievements(next);
  next = awarded.game;
  const death = evaluateDeath(next);
  return {
    game:next,
    outcome:{title:event.title, icon:event.icon, accent:event.accent, text:choice.result || 'Your decision changed the direction of the story.', changes, achievements:awarded.newOnes, endAfter:next.yearFocus >= YEAR_FOCUS},
    death
  };
}

function agePerson(person, lossBias = 1) {
  if (!person) return null;
  if (!person.alive) return {...person, age:person.age+1};
  const loss = Math.random() > 0.84 ? 7 + Math.floor(Math.random() * 5) : lossBias;
  const next = {...person, age:person.age + 1, health:Math.max(0, person.health - loss)};
  if (next.health < 10) next.alive = false;
  return next;
}

function buildReview(game, annualNet) {
  const ids = game.yearLog.map(item => item.id || '');
  const island = islandById(game.islandId);

  // Year themes
  const th = {
    health  : ids.filter(id => ['exercise','rest','diet','mental'].includes(id)).length,
    skill   : ids.filter(id => ['study_cooking','study_tech','learn_trade','study_finance','develop_creative','build_leadership','fitness_training'].includes(id)).length,
    social  : ids.filter(id => ['lime','community','festival','family_time','faith'].includes(id)).length,
    money   : ids.filter(id => ['save','invest','buy_property'].includes(id)).length,
    hustle  : ids.filter(id => ['cook_sell','freelance','market_stall','perform','post_content','start_business'].includes(id)).length,
    creator : ids.filter(id => ['post_content','develop_creative','perform'].includes(id)).length,
  };

  const hasVice      = Object.values(game.addictions).some(v => v > 30);
  const hasViceHigh  = Object.values(game.addictions).some(v => v > 60);
  const isStriving   = game.stats.health > 68 && game.stats.happiness > 68 && game.stats.stress < 50;
  const isBurnout    = game.stats.stress > 75 || game.stats.health < 35;
  const isWealthMode = th.money >= 2 && (game.finance.investments > 0 || game.properties.length > 0);
  const isCommunity  = th.social >= 3;
  const isCreator    = th.creator >= 2 || game.followers > 10000;
  const isLearner    = th.skill >= 3;

  // Headline pools
  const pick = list => list[Math.floor(Math.random() * list.length)];
  let headline;
  if (isBurnout)    headline = pick(['The Year That Cost Too Much','Running on Empty','When the Body Kept Score','The Price of Ambition']);
  else if (isStriving)  headline = pick(['The Year It All Started Clicking','A Year Worth Remembering','When Life and Ambition Aligned','Building Season — Everything Working']);
  else if (isWealthMode) headline = pick(['When the Money Started Moving','Stack Season','The Foundation Is Getting Stronger','Compound and Compound Again']);
  else if (isCommunity)  headline = pick(['The Year the Island Noticed','Showing Up When It Counted','Community Over Everything','Roots Going Deeper']);
  else if (isCreator)    headline = pick(['The Audience Is Growing','The Creator Path Is Real','Building the Platform','Fame Has an Address Now']);
  else if (isLearner)    headline = pick(['Year of the Student','Investing in the Only Asset That Lasts','Building the Toolkit','Knowledge Season']);
  else headline = pick(['Another Year in the Books','The Work Continues Quietly','Keep Building','One More Chapter Written']);

  // Narrative pools
  const NARRATIVES = {
    burnout: [
      'This was a year of pushing hard — perhaps too hard. The body and the relationships both kept their own ledger. Recovery needs to be the first item on next year\'s plan, not an afterthought.',
      'The ambition was real. The output was real. But the cost to health and peace of mind was equally real. Sustainable pace is the actual long-term competitive advantage.'
    ],
    striving: [
      'This was the rare kind of year where the effort matched the return. Health, relationships, and finances were all pointing in the same direction at once. Protect this rhythm — it is a foundation, not an accident.',
      'Everything clicked. The combination of discipline, rest, and genuine connection produced something that cannot be manufactured. The challenge now is not to mistake this season for the destination.'
    ],
    wealth: [
      'The financial decisions this year were the right ones. Patient, deliberate, and grounded in real numbers. The money is not spectacular yet but the direction is clear and the habits are forming.',
      'The money is starting to work. Not dramatically, not yet — but the compound effect is beginning to show. Every sound financial decision made this year will still be paying dividends in a decade.'
    ],
    community: [
      'What was built this year cannot be measured in a bank balance. The trust deposited in people, the presence at the moments that mattered — this is the capital that never depreciates on a small island.',
      'A year of genuine investment in people. The returns are not always immediately visible, but the reputation being built here is more durable than any income stream.'
    ],
    creator: [
      'The audience is real now. Not just a number — a community that responds, engages, and follows a story. The creator path requires consistency above all else. Talent is common. Showing up is not.',
      'The content is moving and the brand is building. The Caribbean creative economy is underexplored and the world wants what this island produces. Package it right and the ceiling is high.'
    ],
    general: [
      'Not every year is a turning point. Some years are simply about consistency — showing up, making reasonable choices, not losing ground. The foundation most successes are built on is exactly this kind of year.',
      'Another year logged. The choices made this year are already shaping the next one. That is always how it works, whether the year felt significant or not.'
    ]
  };

  let narrativeKey = 'general';
  if (isBurnout)   narrativeKey = 'burnout';
  else if (isStriving)  narrativeKey = 'striving';
  else if (isWealthMode) narrativeKey = 'wealth';
  else if (isCommunity)  narrativeKey = 'community';
  else if (isCreator)    narrativeKey = 'creator';
  const narrative = pick(NARRATIVES[narrativeKey]);

  // Next year needs
  let need;
  if (hasViceHigh)
    need = 'The vice pattern needs honest attention before it becomes the headline of the story. Name it and create a real plan.';
  else if (game.stats.health < 40)
    need = 'Health cannot be postponed any further. The next most important investment is the annual checkup and lifestyle change.';
  else if (game.stats.stress > 75)
    need = 'The pace needs to change before something breaks that cannot be fixed. Rest is not optional — it is a prerequisite for sustained performance.';
  else if (game.finance.loanDebt > 0)
    need = 'Debt needs a clear payoff plan before another major obligation is added. The interest is a silent tax on everything else.';
  else if (game.finance.cash < game.finance.emergencyFundTarget)
    need = `Build the emergency fund toward six months of essential expenses — about ${fmt(game.finance.emergencyFundTarget, island)}. Everything else depends on this buffer existing.`;
  else if (game.business.active)
    need = 'The business needs systems now: cash flow tracking, quality control, a reserve fund, and at least one person who can run things when you are not there.';
  else if (game.followers > 10000)
    need = 'Consistency is the algorithm. The audience grows at the rate you show up. Post more. Connect more. Monetise what is already working.';
  else if (!game.finance.investments && game.finance.cash > 3000)
    need = 'Start the index fund. Even $200 a month at 10% compounded for 25 years becomes significant. Time in the market beats every other strategy.';
  else
    need = pick([
      'Compound what worked this year and remove what did not. Review both with honesty.',
      'Whatever was started this year — do not stop now. Consistency is the entire strategy.',
      'The next big decision is not financial. It is about where energy goes and what gets protected from the noise.'
    ]);

  // Proverb
  const proverb = PROVERBS[game.age % PROVERBS.length];

  return { headline, narrative, annualNet, need, proverb };
}


export function endYear(game) {
  let next = refreshFinance(game);
  const f = {...next.finance};
  const annualNet = Math.round((f.monthlyIncome - f.monthlyExpenses) * 12);
  let cash = Math.max(0, f.cash + annualNet);
  let investments = Math.round(f.investments * 1.08);
  const mortgageDebt = Math.round(amortise(f.mortgageDebt, 0.07, 20));
  const loanDebt = Math.round(amortise(f.loanDebt, 0.08, 10));
  const properties = next.properties.map(property => ({...property, value:Math.round(property.value * 1.03), mortgage:Math.max(0, Math.round(property.mortgage * 0.97))}));
  const contracts = f.contracts.map(contract => ({...contract, yearsLeft:contract.yearsLeft - 1})).filter(contract => contract.yearsLeft > 0);
  const pardner = {...f.pardner};
  const notices = [];
  if (pardner.active) {
    pardner.turns += 1;
    if (pardner.turns >= 1) {
      cash += 1600;
      pardner.active = false;
      notices.push('Pardner payout received: cash added at year end.');
    }
  }
  const stats = {...next.stats};
  if (stats.stress > 68) stats.health = clamp(stats.health - 5);
  if (stats.health > 65 && stats.stress < 45) stats.happiness = clamp(stats.happiness + 3);
  const addictions = {...next.addictions};
  for (const key of Object.keys(addictions)) {
    if (addictions[key] > 0) {
      addictions[key] = clamp(addictions[key] + 3);
      if (addictions[key] >= 40) {
        cash = Math.max(0, cash - (key === 'gambling' ? 700 : 350));
        stats.relationships = clamp(stats.relationships - 5);
        stats.stress = clamp(stats.stress + 6);
      }
    }
  }
  const family = next.family ? {
    father:agePerson(next.family.father),
    mother:agePerson(next.family.mother),
    siblings:next.family.siblings.map(sibling => ({...sibling, age:sibling.age + 1, relationship:clamp(sibling.relationship + (Math.random() > 0.7 ? -2 : 1))}))
  } : null;
  if (family?.father && !family.father.alive && next.family.father.alive) notices.push('Your father passed away this year.');
  if (family?.mother && !family.mother.alive && next.family.mother.alive) notices.push('Your mother passed away this year.');
  let partner = next.partner ? {...next.partner, age:next.partner.age + 1} : null;
  if (partner) {
    const familyFocus = next.yearLog.filter(item => ['family_time','love','faith'].includes(item.id)).length;
    const drift = familyFocus * 4 - (stats.stress > 60 ? 7 : 2);
    partner.relationship = clamp(partner.relationship + drift);
    if (partner.relationship < 20) { notices.push(`${partner.name.split(' ')[0]} stepped away from the relationship.`); partner = null; }
  }
  const children = next.children.map(child => ({
    ...child,
    age:child.age + 1,
    stats:{
      ...child.stats,
      wellbeing:clamp(child.stats.wellbeing + (next.yearLog.some(item => item.id === 'family_time') ? 3 : -2))
    }
  }));
  const damian = {...next.damian, age:next.damian.age + 1, wealth:Math.round(next.damian.wealth * (next.business.active ? 1.10 : 1.07) + 900)};
  if (next.business.active && damian.businessLevel < 5) damian.businessLevel += 1;
  next = {...next, stats, finance:{...f, cash, investments, mortgageDebt, loanDebt, contracts, pardner}, properties, addictions, family, partner, children, damian};
  next = refreshFinance(next);
  next = {...next, yearReview:buildReview(next, annualNet)};
  const awarded = awardAchievements(next);
  next = awarded.game;
  const death = evaluateDeath(next);
  return {game:next, notices, achievements:awarded.newOnes, death};
}

export function nextYear(game) {
  const base = normalizeGameState(game);
  const nextAge = game.age + 1;
  return {...base, age:nextAge, yearLog:[], yearLims:{}, yearFocus:0, yearReview:null};
}

export function startNextGeneration(game, heir) {
  if (!heir || heir.age < 16) return game;
  const inherited = Math.round(game.finance.cash * 0.70 + game.finance.investments * 0.20);
  const newGame = {
    ...game,
    name:heir.name,
    generation:game.generation + 1,
    age:Math.max(18, heir.age),
    stats:{happiness:65,health:75,stress:15,relationships:60,intelligence:heir.stats?.intelligence || 55,workEthic:60,communityStanding:clamp(game.stats.communityStanding * 0.5,10,50),integrity:game.flags.includes('served') ? 45 : 68},
    skills:{cooking:0,tech:0,trade:0,finance:0,creative:0,leadership:0,fitness:0},
    career:'none', careerLevel:0,
    business:{active:false,level:0},
    properties:game.properties.length ? [game.properties[0]] : [],
    finance:{cash:inherited,investments:0,propertyValue:0,mortgageDebt:game.finance.mortgageDebt * 0.5,businessRevenue:0,businessExpenses:0,loanDebt:0,monthlyIncome:0,monthlyExpenses:0,emergencyFundTarget:0,pardner:{active:false,turns:0},contracts:[]},
    flags:[`generation:${game.generation + 1}`], achievements:[], family:generateFamily(game.islandId, game.backgroundId), partner:null, children:[], lastBirthAge:null,
    addictions:{rum:0,gambling:0}, followers:0, migration:null, yearLog:[], yearLims:{}, yearFocus:0, yearReview:null
  };
  return refreshFinance({...newGame, skating:defaultSkatingState()});
}

export function saveGame(game) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({...game, savedAt:new Date().toISOString()})); return true; } catch { return false; }
}
export function loadGame() {
  try { const raw = localStorage.getItem(SAVE_KEY); return raw ? refreshFinance(JSON.parse(raw)) : null; } catch { return null; }
}
export function hasSave() { try { return Boolean(localStorage.getItem(SAVE_KEY)); } catch { return false; } }
export function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch {} }
