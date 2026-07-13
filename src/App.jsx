import { useEffect, useMemo, useState } from 'react';
import {
  ACHIEVEMENTS, ACTION_CATEGORIES, AVATARS, BACKGROUNDS, BUSINESS_ACTIONS, C, CAREERS, ISLANDS, LIFE_GOALS, PROPERTY_ACTIONS, SKILLS, THEME_MODES
} from './data/gameData.js';
import {
  YEAR_FOCUS, applyAction, applyEventChoice, canUseAction, clearSave, createInitialGame, endYear, evaluateDeath,
  defaultPlayerSettings, fmt, hasSave, islandById, loadGame, nextYear, refreshFinance, saveGame, startNextGeneration, totalNetWorth
} from './engine/gameLogic.js';
import { EventModal, OutcomeModal } from './components/Modal.jsx';
import ActionCard from './components/ActionCard.jsx';
import FinancePanel from './components/FinancePanel.jsx';
import FamilyPanel from './components/FamilyPanel.jsx';
import YearReview from './components/YearReview.jsx';
import SkatePanel from './components/SkatePanel.jsx';
import IslandMark from './components/IslandMark.jsx';
import moneySavingsSticker from './assets/stickers/money-savings.png';
import propertyHomeKeySticker from './assets/stickers/property-home-key.png';
import businessStorefrontSticker from './assets/stickers/business-storefront.png';

const screens = { title:'title', intro:'intro', island:'island', background:'background', profile:'profile', game:'game', review:'review', death:'death', generation:'generation', end:'end' };
const baseBackground = `linear-gradient(160deg,${C.bg} 0%,${C.bgM} 58%,${C.bg} 100%)`;
const islandBackground = `radial-gradient(circle at 18% 12%, rgba(255,214,10,.22), transparent 28%), radial-gradient(circle at 82% 18%, rgba(0,217,255,.20), transparent 26%), linear-gradient(160deg,#04251F 0%,#063348 48%,#071622 100%)`;

function screenBackground(mode) {
  return mode === 'island' ? islandBackground : baseBackground;
}

function Button({children,onClick,disabled=false,accent=C.gold,secondary=false,style={}}) {
  return <button onClick={onClick} disabled={disabled} style={{cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.48:1,border:secondary?`1px solid ${accent}55`:'none',background:secondary?`${accent}12`:`linear-gradient(135deg,${accent},${accent===C.gold?'#E8B800':C.gold})`,color:secondary?accent:'#06121A',fontWeight:900,borderRadius:12,padding:'12px 14px',fontSize:13,...style}}>{children}</button>;
}

function Card({children,style={}}) {
  return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:15,...style}}>{children}</div>;
}

function Toast({text}) {
  if (!text) return null;
  return <div style={{position:'fixed',top:12,left:'50%',transform:'translateX(-50%)',zIndex:150,background:'#0E3024',border:`1px solid ${C.green}55`,borderRadius:11,padding:'9px 14px',color:C.green,fontWeight:800,fontSize:12,boxShadow:'0 5px 20px rgba(0,0,0,.45)',whiteSpace:'nowrap'}}>{text}</div>;
}

const CATEGORY_STICKERS = {
  money: {src:moneySavingsSticker, alt:'Savings and coins for money choices', tone:'money'},
  property: {src:propertyHomeKeySticker, alt:'Home key for property choices', tone:'property'},
  business: {src:businessStorefrontSticker, alt:'Storefront for business choices', tone:'business'}
};

function CategoryVisual({category, selected=false}) {
  const sticker = CATEGORY_STICKERS[category.id];
  if (!sticker) return <span style={{fontSize:24}}>{category.categoryLocked?'🔒':category.emoji}</span>;

  return (
    <span className={`category-sticker category-sticker--${sticker.tone}${category.categoryLocked ? ' is-locked' : ''}${selected ? ' is-selected' : ''}`}>
      <img className="category-sticker__image" src={sticker.src} alt={sticker.alt} />
      {category.categoryLocked && <span className="category-sticker__lock" aria-hidden="true">🔒</span>}
    </span>
  );
}

function StatPill({emoji,label,value,color}) {
  return <div style={{background:`${color}0B`,border:`1px solid ${color}22`,borderRadius:9,padding:'5px 6px',textAlign:'center'}}><p style={{color:C.faint,fontSize:7,margin:'0 0 2px'}}>{emoji} {label}</p><p style={{fontSize:11,fontWeight:900,color,margin:0}}>{Math.round(value)}</p></div>;
}

const TEXT_SIZE_OPTIONS = [
  ['compact','Compact'],
  ['standard','Standard'],
  ['large','Large']
];

function PlayerSettingsPanel({settings,onChange,accent}) {
  return (
    <div className="story-panel settings-panel" style={{borderColor:`${accent}38`}}>
      <div className="settings-panel__header">
        <div>
          <p style={{fontSize:10,color:accent,fontWeight:900,letterSpacing:1.5,textTransform:'uppercase',margin:'0 0 3px'}}>Player settings</p>
          <p style={{fontSize:11,color:C.dim,margin:0}}>Saved with this life</p>
        </div>
        <label className="settings-toggle">
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={event=>onChange({reducedMotion:event.target.checked})}
          />
          <span>Reduced motion</span>
        </label>
      </div>
      <div className="settings-row">
        <span>Text size</span>
        <div className="settings-segment" role="group" aria-label="Text size">
          {TEXT_SIZE_OPTIONS.map(([id,label])=>(
            <button
              key={id}
              type="button"
              onClick={()=>onChange({textSize:id})}
              className={settings.textSize === id ? 'is-active' : ''}
              style={{'--settings-accent':accent}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const ACTION_STORIES = {
  study_cooking:'The kitchen became a classroom. Small techniques started turning into real confidence.',
  study_tech:'Late nights with a screen and stubborn problems started building a new kind of future.',
  learn_trade:'Hands-on work taught lessons that no shortcut could replace.',
  study_finance:'The numbers began to make more sense. Money started feeling less mysterious and more usable.',
  develop_creative:'A little more of your voice came through. The island always notices originality eventually.',
  build_leadership:'You practiced moving with people, not just ahead of them.',
  fitness_training:'Discipline showed up in the body first, then started touching everything else.',
  overdeliver:'You gave more than expected. It cost energy, but people noticed the standard.',
  network:'A conversation opened another conversation. Your world got a little wider.',
  upskill:'You sharpened the habits that make opportunity easier to hold onto.',
  promotion:'You put your name forward instead of waiting to be discovered.',
  switch_career:'You allowed the old lane to loosen its grip and made room for a new one.',
  migration:'You looked beyond the shoreline and asked what another market might make possible.',
  cook_sell:'The work was hot, tiring, and real. Cash moved because effort turned into something people wanted.',
  freelance:'A client trusted you with a problem, and you proved you could deliver.',
  market_stall:'The stall was small, but the lesson was big: customers teach quickly.',
  perform:'The crowd gave something back. For a moment, the dream felt less private.',
  post_content:'You put something into the world and waited to see who would answer.',
  start_business:'The idea became official enough to demand your full attention.',
  save:'You chose restraint now so a future version of you could breathe easier.',
  invest:'Some money left your hand and became a seed for later.',
  buy_property:'You claimed a piece of the future, with responsibility attached.',
  pardner:'You joined a trusted circle where discipline and community meet.',
  loan:'The cash arrived with a shadow beside it. Now the plan has to be real.',
  risky:'You took a swing at quick upside. The lesson will show itself soon enough.',
  exercise:'Movement cleared the noise. Your body started sending better signals.',
  rest:'You stopped long enough for your life to catch up with you.',
  diet:'A better rhythm started at the plate and carried into the day.',
  mental:'You gave the pressure somewhere honest to go.',
  rehab:'You chose the hard reset before the habit could write the whole story.',
  checkup:'You faced the facts early, which is its own kind of strength.',
  lime:'The laughter mattered. Joy is not wasted time.',
  community:'You showed up where it counted, and that kind of trust travels.',
  festival:'The music, food, and people reminded you that life is more than survival.',
  family_time:'The people closest to you felt the difference when you made time.',
  faith:'You found a steadier rhythm in something bigger than the pressure.',
  love:'You made room for connection, and the story softened a little.',
  child:'A new responsibility entered the story, small and enormous at the same time.',
  damian_contact:'You reached across comparison and chose a more honest conversation.',
  damian_compete:'The rivalry sharpened the year, for better or worse.',
  damian_partner:'Competition turned into possibility. That changes the whole energy.',
  damian_help:'You asked for help and learned what the relationship could really carry.',
  damian_cutoff:'You chose peace over a connection that kept pulling you backward.',
  hire:'The business became less lonely when you started building a team.',
  marketing:'You put the work in front of more eyes and waited for the market to answer.',
  quality:'You raised the standard. That kind of care compounds quietly.',
  business_finance:'You brought order to the money side of the business.',
  renovate:'You put value back into the property with every repair.',
  sell_property:'You let go of an asset and turned it into breathing room.',
  buy_starter_skates:'The first pair changed the shape of the year. The court suddenly looked like a doorway.',
  buy_protective_kit:'The gear made the next moves feel less reckless and more intentional.',
  beginner_skate_class:'Falls became feedback. Stops became control. The basics started becoming yours.',
  skate_conditioning:'The drills were simple, but your balance and stamina started answering back.',
  skate_guys_jam:'Music, wheels, and people turned practice into community. The Skate Guys noticed you showed up.',
  service_skates:'Clean bearings and rotated wheels made the setup feel ready again.',
  unlock_recreation_jam:'You chose the social rhythm of skating: style, joy, and connection.',
  unlock_artistic:'You chose a path where movement has presentation and every line matters.',
  unlock_speed:'You chose pace, endurance, and the pressure of timed performance.',
  unlock_roller_derby:'You chose a team path with contact, trust, and safety built into the work.',
  unlock_slalom_park:'You chose flow, cones, tricks, and control that people stop to watch.'
};

function actionStory(action, game, island) {
  const firstName = (game.name || 'You').split(' ')[0];
  const base = ACTION_STORIES[action.id] || `${firstName} chose ${action.label.toLowerCase()}, and the year shifted a little.`;
  return `${base} In ${island?.name || 'the island'}, choices like this become part of your reputation.`;
}

const CATEGORY_STORIES = {
  learn:{promise:'Turn curiosity into doors that open later.', vibe:'Skill season'},
  career:{promise:'Move from surviving work to shaping a career.', vibe:'Level-up year'},
  hustle:{promise:'Make extra money and test what people will pay for.', vibe:'Side money'},
  money:{promise:'Build the cash, assets, and habits that create freedom.', vibe:'Wealth moves'},
  health:{promise:'Protect the body and mind carrying the whole story.', vibe:'Recovery arc'},
  life:{promise:'Choose love, culture, community, faith, and joy.', vibe:'Heart of life'},
  skate:{promise:'Build skill, rhythm, gear, and community with The Skate Guys.', vibe:'Skate circle'},
  damian:{promise:'Face comparison, rivalry, and old history directly.', vibe:'Drama chapter'},
  business:{promise:'Grow the systems, quality, and reach of your business.', vibe:'Owner mode'},
  property:{promise:'Manage assets that can change your long-term life.', vibe:'Asset chapter'}
};

const LOCK_INSTRUCTIONS = {
  business:'Launch a Small Business to unlock',
  property:'Save enough for a property deposit to unlock',
  damian:'Unlocks at age 28'
};

const ISLAND_UI_THEMES = {
  jamaica:{primary:'#FFD60A', secondary:'#2FD66B', deep:'#07140B', soft:'#10321A', mood:'stage lights and mountain night'},
  trinidad:{primary:'#FF4D5A', secondary:'#FFD166', deep:'#15070B', soft:'#2B0F16', mood:'Carnival pulse and city ambition'},
  barbados:{primary:'#2F80FF', secondary:'#FFD34A', deep:'#061527', soft:'#0B2A4C', mood:'blue water and Crop Over gold'},
  dominican:{primary:'#377DFF', secondary:'#FF4E5B', deep:'#07152A', soft:'#102852', mood:'bright coast and family heat'},
  stlucia:{primary:'#59D7FF', secondary:'#FFE56A', deep:'#052331', soft:'#0B3B43', mood:'Pitons, jazz, and warm rain'},
  custom:{primary:'#1BCFC9', secondary:'#FFD60A', deep:'#05221F', soft:'#0A3832', mood:'your island, your rules'}
};

function islandTheme(islandId) {
  return ISLAND_UI_THEMES[islandId] || ISLAND_UI_THEMES.custom;
}

function statTone(key, value) {
  if (key === 'stress') return value > 65 ? C.coral : value > 35 ? C.gold : C.green;
  return value > 60 ? C.green : value > 30 ? C.gold : C.coral;
}

function storyMood(game, island, goal) {
  const firstName = (game.name || 'You').split(' ')[0];
  if (game.stats.health < 28) return {
    title:'The Body Is Asking First',
    text:`${firstName} can still chase the dream, but health has moved to the front of the story in ${island.name}.`
  };
  if (game.stats.stress > 74) return {
    title:'Pressure Is Building',
    text:`The year is moving fast. Every choice now needs to protect energy as much as ambition.`
  };
  if (game.followers > 50000) return {
    title:'Everybody Is Watching',
    text:`The audience is real now. Fame can open doors, but reputation decides which ones stay open.`
  };
  if (game.business.active) return {
    title:'Owner Mode',
    text:`The business is no longer just an idea. This chapter is about systems, trust, and cash flow.`
  };
  if (game.properties.length > 0) return {
    title:'Roots and Assets',
    text:`Ownership changed the rhythm. ${firstName} is building something the island can see.`
  };
  return {
    title:`${goal.label} in Motion`,
    text:`Age ${game.age} is another chapter in ${island.name}. Spend focus where you want the story to grow.`
  };
}

function goalCategoryOrder(goalId) {
  const map = {
    wealth:['money','career','hustle'],
    family:['life','health','money'],
    fame:['hustle','life','career'],
    business:['hustle','business','money'],
    community:['life','career','health'],
    own_path:['life','career','money']
  };
  return map[goalId] || map.own_path;
}

function guidanceSnapshot(game, finance = game.finance) {
  const f = finance || game.finance;
  const strongestSkill = Math.max(0, ...Object.values(game.skills || {}));
  const builtIncome = game.career !== 'none' || game.business.active || game.properties.some(property => property.kind === 'rental') || (f.contracts || []).length > 0;
  const monthlyNet = (f.monthlyIncome || 0) - (f.monthlyExpenses || 0);
  const debt = (f.loanDebt || 0) + (f.mortgageDebt || 0);
  const surplusCash = f.cash >= Math.max(2000, (f.emergencyFundTarget || 0) * 0.5);
  const hasMoneyToManage = builtIncome || monthlyNet > 250 || surplusCash || (f.investments || 0) > 0 || debt > 0 || Boolean(f.pardner?.active);
  const earlyStarter = game.age === 18 && game.career === 'none' && !game.business.active && game.properties.length === 0 && strongestSkill < 18 && f.cash < Math.max(2500, (f.emergencyFundTarget || 0) * 0.35);

  return {strongestSkill, builtIncome, monthlyNet, debt, hasMoneyToManage, earlyStarter};
}

function recommendedCategories(categories, game, finance) {
  const preferred = goalCategoryOrder(game.goalId);
  const unlocked = categories.filter(category => !category.categoryLocked);
  const guide = guidanceSnapshot(game, finance);
  const baseOrder = unlocked.map(category => category.id);
  const score = Object.fromEntries(baseOrder.map((id, index) => [id, 100 - index]));

  preferred.forEach((id, index) => { if (score[id] !== undefined) score[id] += 28 - index * 5; });

  if (guide.earlyStarter) {
    score.learn = (score.learn || 0) + 120;
    score.career = (score.career || 0) + 105;
    score.hustle = (score.hustle || 0) + 95;
    score.money = (score.money || 0) - 55;
  } else {
    if (guide.strongestSkill < 24) score.learn = (score.learn || 0) + 32;
    if (game.career === 'none') score.career = (score.career || 0) + 30;
    if (guide.monthlyNet < 0) score.hustle = (score.hustle || 0) + 28;
  }

  if (game.stats.health < 45 || game.stats.stress > 65) score.health = (score.health || 0) + 85;
  if (game.partner || game.children.length) score.life = (score.life || 0) + 38;
  if (guide.hasMoneyToManage) score.money = (score.money || 0) + 70;
  else score.money = (score.money || 0) - 30;

  return unlocked
    .map((category, index) => ({category, index, value:score[category.id] || 0}))
    .sort((a, b) => b.value - a.value || a.index - b.index)
    .map(item => item.category)
    .slice(0, 3);
}

function currentPriority(game, finance) {
  const guide = guidanceSnapshot(game, finance);
  if (game.stats.health < 35) return {
    text:'Stabilize your health before ambition starts costing too much.',
    goals:['Recover health', 'Lower stress', 'Avoid risky choices']
  };
  if (game.stats.stress > 70) return {
    text:'Reduce pressure this year so your next big move has room to work.',
    goals:['Rest or reset', 'Protect relationships', 'Pick one focused ambition']
  };
  if (guide.earlyStarter) return {
    text:'Build your first income path: learn a skill, start a hustle, and protect your cash.',
    goals:['Learn one practical skill', 'Try a first career move', 'Earn side cash safely']
  };
  if (game.career === 'none') return {
    text:'Turn your effort into steady income before chasing bigger financial moves.',
    goals:['Grow a marketable skill', 'Apply career focus', 'Use hustle for cash flow']
  };
  if (guide.debt > 0) return {
    text:'Keep income moving while you manage debt and protect your future cash.',
    goals:['Track debt pressure', 'Preserve cash', 'Avoid extra borrowing']
  };
  if (guide.hasMoneyToManage && finance.cash < finance.emergencyFundTarget * 0.35) return {
    text:'You have income now; build a cash buffer before bigger risks.',
    goals:['Save consistently', 'Keep expenses controlled', 'Invest only when ready']
  };
  if (game.business.active) return {
    text:'Your business is open; improve systems, quality, and cash flow.',
    goals:['Increase revenue', 'Reduce stress', 'Build owner skills']
  };
  if (game.properties.length > 0) return {
    text:'Protect your property path by balancing repairs, cash, and mortgage pressure.',
    goals:['Watch mortgage debt', 'Keep cash ready', 'Improve property value']
  };
  return {
    text:'Choose one meaningful chapter and make this year move your story forward.',
    goals:['Spend focus clearly', 'Protect your wellbeing', 'Build toward your life goal']
  };
}

function currentAlerts(game, finance) {
  const alerts = [];
  if (game.stats.health < 25) alerts.push({label:'Health critical', text:'Your body needs immediate attention.', tone:'danger'});
  if (game.stats.stress > 75) alerts.push({label:'Stress extreme', text:'Recovery is strategic now.', tone:'warning'});
  if (finance.loanDebt > 0) alerts.push({label:'Debt active', text:'Keep cash protected while you repay.', tone:'debt'});
  if (Object.values(game.addictions).some(value=>value>40)) alerts.push({label:'Vice pressure', text:'Health and recovery choices matter.', tone:'warning'});
  return alerts;
}

export default function App() {
  const [screen,setScreen] = useState(screens.title);
  const [selectedIsland,setSelectedIsland] = useState(null);
  const [selectedBackground,setSelectedBackground] = useState(null);
  const [name,setName] = useState('');
  const [preference,setPreference] = useState('any');
  const [selectedGoal,setSelectedGoal] = useState('own_path');
  const [themeMode,setThemeMode] = useState('sleek');
  const [selectedAvatar,setSelectedAvatar] = useState('youth_neutral');
  const [game,setGame] = useState(null);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const [event,setEvent] = useState(null);
  const [outcome,setOutcome] = useState(null);
  const [deathMessage,setDeathMessage] = useState('');
  const [toast,setToast] = useState('');
  const [open,setOpen] = useState({settings:false,stats:false,skills:false,finance:false,family:false,achievements:false});

  const island = game ? islandById(game.islandId) : (selectedIsland ? islandById(selectedIsland) : null);
  const activeTheme = game?.themeMode || themeMode;
  const activeBackground = screenBackground(activeTheme);
  const activeGoal = LIFE_GOALS.find(goal=>goal.id === (game?.goalId || selectedGoal)) || LIFE_GOALS[0];
  const activeAvatar = AVATARS.find(avatar=>avatar.id === (game?.avatarId || selectedAvatar)) || AVATARS[0];
  const playerSettings = game?.playerSettings || defaultPlayerSettings();
  const finance = game ? refreshFinance(game).finance : null;
  const money = value => fmt(value,island);

  useEffect(()=>{
    if (!toast) return undefined;
    const timer = window.setTimeout(()=>setToast(''),3100);
    return ()=>window.clearTimeout(timer);
  },[toast]);

  useEffect(()=>{
    const root = document.documentElement;
    root.dataset.islandReducedMotion = playerSettings.reducedMotion ? 'true' : 'false';
    root.dataset.islandTextSize = playerSettings.textSize;
    return () => {
      delete root.dataset.islandReducedMotion;
      delete root.dataset.islandTextSize;
    };
  },[playerSettings.reducedMotion, playerSettings.textSize]);

  const newGame = () => {
    if (!selectedIsland || !selectedBackground) return;
    const created = createInitialGame({islandId:selectedIsland,backgroundId:selectedBackground,name,preference,goalId:selectedGoal,themeMode,avatarId:selectedAvatar});
    setGame(created); setScreen(screens.game); setSelectedCategory(null); setEvent(null); setOutcome(null);
    setToast(`${activeGoal.emoji} ${activeGoal.label}: your story begins at age 18.`);
  };

  const loadSaved = () => {
    const saved = loadGame();
    if (!saved) { setToast('No working save found.'); return; }
    setGame(saved); setSelectedIsland(saved.islandId); setSelectedBackground(saved.backgroundId); setSelectedGoal(saved.goalId || 'own_path'); setThemeMode(saved.themeMode || 'sleek'); setSelectedAvatar(saved.avatarId || 'youth_neutral'); setScreen(saved.yearReview ? screens.review : screens.game); setToast('Saved game loaded.');
  };

  const saveCurrent = () => {
    const okay = game && saveGame(game);
    setToast(okay ? '✓ Game saved.' : 'Save failed in this browser.');
  };

  const updatePlayerSettings = changes => {
    if (!game) return;
    const next = {...game, playerSettings:{...playerSettings, ...changes}};
    setGame(next);
    const okay = saveGame(next);
    setToast(okay ? 'Settings saved.' : 'Settings updated for this session.');
  };

  const showResultToast = (result) => {
    const notes = [...(result.notices || []), ...(result.achievements || []).map(item=>`${item.emoji} ${item.title} unlocked`)];
    if (notes.length) setToast(notes[0]);
  };

  const chooseAction = action => {
    if (!game) return;
    const result = applyAction(game, action);
    if (result.error) { setToast(result.error); return; }
    setGame(result.game);
    setSelectedCategory(null);
    showResultToast(result);
    if (result.death) { setDeathMessage(result.death); setScreen(screens.death); return; }
    setOutcome({
      title:action.label,
      icon:action.emoji,
      accent:action.color || activeGoal.color || C.gold,
      kicker:'Life choice',
      text:actionStory(action, result.game, island),
      changes:{...(action.changes || {}), ...(action.skills || {})},
      achievements:result.achievements || [],
      snapshot:result.game,
      nextEvent:result.event || null,
      buttonLabel:result.event ? 'See what happens →' : 'Continue →'
    });
  };

  const chooseEvent = choice => {
    if (!game || !event) return;
    const result = applyEventChoice(game,event,choice);
    setGame(result.game);
    setEvent(null);
    if (result.death) { setDeathMessage(result.death); setScreen(screens.death); return; }
    setOutcome({...result.outcome, snapshot:result.game});
  };

  const finishYear = snapshot => {
    const result = endYear(snapshot || game);
    setGame(result.game);
    saveGame(result.game); // Saves the calculated final snapshot, never stale pre-year data.
    if (result.death) { setDeathMessage(result.death); setScreen(screens.death); return; }
    setScreen(screens.review);
    const notes = [...result.notices, ...result.achievements.map(item=>`${item.emoji} ${item.title} unlocked`)];
    if (notes.length) setToast(notes[0]);
  };

  const continueOutcome = () => {
    const snapshot = outcome?.snapshot || game;
    const endAfter = outcome?.endAfter;
    const nextEvent = outcome?.nextEvent;
    setOutcome(null);
    if (nextEvent) { setEvent(nextEvent); return; }
    if (endAfter) finishYear(snapshot);
    else if (snapshot?.yearFocus >= YEAR_FOCUS) setToast('All focus used. Wrap up the age when ready.');
  };

  const advanceYear = () => {
    if (!game) return;
    if (game.age >= 75) { setScreen(screens.end); return; }
    const next = nextYear(game);
    setGame(next); setScreen(screens.game); setSelectedCategory(null); setOpen({settings:false,stats:false,skills:false,finance:false,family:false,achievements:false});
  };

  const selectHeir = child => {
    const next = startNextGeneration(game,child);
    setGame(next); setScreen(screens.game); setSelectedCategory(null); setDeathMessage('');
    setToast(`🌴 Generation ${next.generation}: ${child.name}'s story begins.`);
  };

  const restart = () => {
    setGame(null);setSelectedIsland(null);setSelectedBackground(null);setName('');setPreference('any');setSelectedGoal('own_path');setThemeMode('sleek');setSelectedAvatar('youth_neutral');setScreen(screens.title);setSelectedCategory(null);setEvent(null);setOutcome(null);setDeathMessage('');
  };

  const categories = useMemo(()=>{
    if (!game) return [];
    const basics = ACTION_CATEGORIES.map(category => ({...category, categoryLocked:category.id === 'damian' && game.age < 28, categoryLock:category.id === 'damian' && game.age < 28 ? LOCK_INSTRUCTIONS.damian : null}));
    basics.push({id:'business',label:'BUSINESS',emoji:'🏢',color:C.pink,tag:game.business.active?'Manage systems and cash flow.':'Locked path: start a business through an opportunity.',items:BUSINESS_ACTIONS,categoryLocked:!game.business.active,categoryLock:LOCK_INSTRUCTIONS.business});
    basics.push({id:'property',label:'PROPERTY',emoji:'🏠',color:C.teal,tag:game.properties.length?'Manage the assets you own.':'Locked path: buy a property through MONEY.',items:PROPERTY_ACTIONS,categoryLocked:game.properties.length===0,categoryLock:LOCK_INSTRUCTIONS.property});
    return basics;
  },[game]);

  if (screen === screens.title) return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,display:'flex',alignItems:'center',justifyContent:'center',padding:22}}><div style={{width:'100%',maxWidth:430,textAlign:'center'}}>
    <div style={{fontSize:62,filter:`drop-shadow(0 0 18px ${C.gold}55)`}}>🌴</div>
    <h1 style={{fontSize:44,letterSpacing:-2,margin:'4px 0',background:`linear-gradient(135deg,${C.gold},${C.orange},${C.coral})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>ISLAND LIFE</h1>
    <p style={{fontSize:11,color:C.turquoise,letterSpacing:2.5,textTransform:'uppercase',margin:'0 0 4px'}}>Caribbean Life Simulator · v4</p>
    <p style={{fontSize:13,color:C.dim,fontStyle:'italic',margin:'0 0 18px'}}>Start at 18. Spend each year wisely. Let the island remember your story.</p>
    <Card style={{padding:14,textAlign:'left',marginBottom:14,borderColor:`${C.turquoise}32`}}>
      <p style={{fontSize:10,color:C.gold,fontWeight:900,letterSpacing:1.5,margin:'0 0 7px'}}>HOW IT WORKS</p>
      <div style={{display:'grid',gap:8}}>
        {[
          ['🎂','Start at age 18','Every year is a new chapter in your life.'],
          ['⚡','Use 10 focus points','Choose where your time and energy go.'],
          ['🧭','Choose your own path','Money, love, fame, family, business, or legacy.']
        ].map(([emoji,title,text])=><div key={title} style={{display:'flex',gap:9,alignItems:'flex-start'}}><span style={{fontSize:20}}>{emoji}</span><div><p style={{fontSize:12,color:C.text,fontWeight:900,margin:'0 0 1px'}}>{title}</p><p style={{fontSize:10,color:C.dim,lineHeight:1.4,margin:0}}>{text}</p></div></div>)}
      </div>
    </Card>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      <Button onClick={()=>setScreen(screens.intro)} style={{width:'100%',fontSize:16,padding:15}}>New Life →</Button>
      {hasSave() && <Button onClick={loadSaved} secondary accent={C.turquoise} style={{width:'100%'}}>💾 Continue Saved Game</Button>}
      {hasSave() && <button onClick={()=>{clearSave();setToast('Saved game deleted.');}} style={{border:`1px solid ${C.coral}35`,background:'transparent',color:C.coral,borderRadius:10,padding:8,cursor:'pointer',fontSize:11}}>Delete saved game</button>}
    </div>
  </div><Toast text={toast}/></div>;

  if (screen === screens.intro) return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:'24px 16px'}}><div style={{maxWidth:520,margin:'0 auto'}}>
    <p style={{fontSize:10,letterSpacing:2,color:C.gold,fontWeight:900,margin:'0 0 4px'}}>BEFORE YOU BEGIN</p><h2 style={{fontSize:27,margin:'0 0 8px'}}>This is your life story</h2>
    <p style={{fontSize:13,color:C.muted,lineHeight:1.7,margin:'0 0 14px'}}>You are 18. Each year you get 10 focus points. Spend them on career, money, health, relationships, culture, business, or family. There is no single winning path; your choices shape the kind of life you build.</p>
    <Card style={{padding:13,marginBottom:13,borderColor:`${C.gold}36`}}>
      <p style={{fontSize:10,color:C.gold,fontWeight:900,letterSpacing:1.4,margin:'0 0 8px'}}>PICK A LIFE DIRECTION</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{LIFE_GOALS.map(goal=><button key={goal.id} onClick={()=>setSelectedGoal(goal.id)} style={{cursor:'pointer',textAlign:'left',padding:'10px 11px',borderRadius:12,border:`1px solid ${selectedGoal===goal.id?C.gold:'rgba(255,255,255,.14)'}`,background:selectedGoal===goal.id?`${C.gold}16`:'rgba(255,255,255,.035)',color:C.text}}><p style={{fontSize:18,margin:'0 0 3px'}}>{goal.emoji}</p><p style={{fontSize:11,fontWeight:900,color:selectedGoal===goal.id?C.gold:C.text,margin:'0 0 2px'}}>{goal.label}</p><p style={{fontSize:9,color:C.dim,lineHeight:1.35,margin:0}}>{goal.short}</p></button>)}</div>
    </Card>
    <Card style={{padding:13,marginBottom:13,borderColor:`${C.turquoise}32`}}>
      <p style={{fontSize:10,color:C.turquoise,fontWeight:900,letterSpacing:1.4,margin:'0 0 8px'}}>VISUAL STYLE</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{THEME_MODES.map(mode=><button key={mode.id} onClick={()=>setThemeMode(mode.id)} style={{cursor:'pointer',textAlign:'left',padding:'10px 11px',borderRadius:12,border:`1px solid ${themeMode===mode.id?C.turquoise:'rgba(255,255,255,.14)'}`,background:themeMode===mode.id?`${C.turquoise}14`:'rgba(255,255,255,.035)',color:C.text}}><p style={{fontSize:18,margin:'0 0 3px'}}>{mode.emoji}</p><p style={{fontSize:11,fontWeight:900,color:themeMode===mode.id?C.turquoise:C.text,margin:'0 0 2px'}}>{mode.label}</p><p style={{fontSize:9,color:C.dim,lineHeight:1.35,margin:0}}>{mode.text}</p></button>)}</div>
    </Card>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9}}><Button secondary accent={C.dim} onClick={()=>setScreen(screens.title)}>← Back</Button><Button onClick={()=>setScreen(screens.island)}>Choose Island →</Button></div>
  </div></div>;

  if (screen === screens.island) return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:'24px 16px'}}><div style={{maxWidth:500,margin:'0 auto'}}>
    <p style={{fontSize:10,letterSpacing:2,color:C.gold,fontWeight:900,margin:'0 0 4px'}}>STEP 1 OF 3</p><h2 style={{fontSize:27,margin:'0 0 13px'}}>Choose Your Island</h2>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>{ISLANDS.map(entry=><button key={entry.id} onClick={()=>{setSelectedIsland(entry.id);setScreen(screens.background);}} style={{textAlign:'left',cursor:'pointer',padding:'13px 14px',borderRadius:13,border:`1px solid ${C.turquoise}30`,background:`${C.turquoise}08`,color:C.text}}><div style={{display:'flex',gap:10,alignItems:'center'}}><IslandMark island={entry} /><div style={{flex:1}}><p style={{fontWeight:900,margin:'0 0 2px'}}>{entry.name}</p><p style={{fontSize:10,color:C.dim,margin:0}}>{entry.tag}</p></div><span style={{fontSize:10,color:C.green,fontWeight:800}}>{entry.currency}</span></div><p style={{fontSize:9,color:C.faint,margin:'7px 0 0'}}>Cost of living: {money ? '' : ''}{entry.monthlyEssentials.toLocaleString()}/mo · {entry.festival} · property from {entry.currency}{Math.round(entry.propertyPrice*0.2).toLocaleString()} deposit</p></button>)}</div>
    <Button secondary accent={C.dim} onClick={()=>setScreen(screens.title)} style={{marginTop:14}}>← Back</Button>
  </div></div>;

  if (screen === screens.background) return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:'24px 16px'}}><div style={{maxWidth:500,margin:'0 auto'}}>
    <p style={{fontSize:10,letterSpacing:2,color:C.gold,fontWeight:900,margin:'0 0 4px'}}>STEP 2 OF 3</p><h2 style={{fontSize:27,margin:'0 0 13px'}}>Choose Your Starting Point</h2>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>{BACKGROUNDS.map(background=><button key={background.id} onClick={()=>{setSelectedBackground(background.id);setScreen(screens.profile);}} style={{textAlign:'left',cursor:'pointer',padding:'13px 14px',borderRadius:13,border:`1px solid ${background.color}45`,background:`${background.color}09`,color:C.text}}><div style={{display:'flex',justifyContent:'space-between',gap:10}}><div><p style={{fontWeight:900,margin:'0 0 3px',color:background.color}}>{background.emoji} {background.label}</p><p style={{fontSize:10,color:C.dim,margin:0}}>{background.desc}</p></div><span style={{fontSize:10,fontWeight:900,color:background.color}}>{background.diff}</span></div><p style={{fontSize:9,color:C.faint,margin:'7px 0 0'}}>Starting cash: {islandById(selectedIsland).currency}{background.cash.toLocaleString()}</p></button>)}</div>
    <Button secondary accent={C.dim} onClick={()=>setScreen(screens.island)} style={{marginTop:14}}>← Back</Button>
  </div></div>;

  if (screen === screens.profile) return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:'24px 16px'}}><div style={{maxWidth:500,margin:'0 auto'}}>
    <p style={{fontSize:10,letterSpacing:2,color:C.gold,fontWeight:900,margin:'0 0 4px'}}>STEP 3 OF 3</p><h2 style={{fontSize:27,margin:'0 0 13px'}}>Start Your Story</h2>
    <Card style={{padding:12,marginBottom:10,borderColor:`${C.gold}32`}}><p style={{fontSize:10,color:C.gold,fontWeight:900,letterSpacing:1.4,margin:'0 0 4px'}}>YOUR PATH</p><p style={{fontSize:13,color:C.text,fontWeight:900,margin:'0 0 3px'}}>{activeGoal.emoji} {activeGoal.label}</p><p style={{fontSize:10,color:C.dim,lineHeight:1.45,margin:0}}>{activeGoal.text}</p></Card>
    <Card style={{padding:15,marginBottom:12}}><label style={{display:'block',fontSize:11,color:C.dim,fontWeight:800,marginBottom:6}}>YOUR NAME</label><input value={name} onChange={event=>setName(event.target.value)} placeholder="Type your character's name" style={{width:'100%',boxSizing:'border-box',padding:'11px 12px',borderRadius:10,border:'1px solid rgba(255,255,255,.18)',background:'#071622',color:C.text,fontSize:14,outline:'none'}} />
      <p style={{fontSize:11,color:C.dim,margin:'15px 0 7px'}}>YOUR LOOK</p><p style={{fontSize:10,color:C.faint,margin:'0 0 8px'}}>Pick a simple face for your character.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:7}}>{AVATARS.map(avatar=><button key={avatar.id} onClick={()=>setSelectedAvatar(avatar.id)} style={{padding:'10px 6px',borderRadius:10,border:`1px solid ${selectedAvatar===avatar.id?C.gold:'rgba(255,255,255,.14)'}`,background:selectedAvatar===avatar.id?`${C.gold}16`:'rgba(255,255,255,.03)',color:selectedAvatar===avatar.id?C.gold:C.dim,cursor:'pointer',fontWeight:800,fontSize:9}}><span style={{display:'block',fontSize:24,marginBottom:3}}>{avatar.emoji}</span>{avatar.label}</button>)}</div>
      <p style={{fontSize:11,color:C.dim,margin:'15px 0 7px'}}>ROMANCE PATH</p><p style={{fontSize:10,color:C.faint,margin:'0 0 8px'}}>This only determines who may appear as a potential partner in your character’s story.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7}}>{[['women','Women'],['men','Men'],['any','Any'],['none','Not seeking romance']].map(([id,label])=><button key={id} onClick={()=>setPreference(id)} style={{padding:9,borderRadius:9,border:`1px solid ${preference===id?C.pink:'rgba(255,255,255,.14)'}`,background:preference===id?`${C.pink}19`:'rgba(255,255,255,.03)',color:preference===id?C.pink:C.dim,cursor:'pointer',fontWeight:700,fontSize:11}}>{label}</button>)}</div>
    </Card>
    <Button onClick={newGame} style={{width:'100%',padding:15,fontSize:15}}>Begin in {islandById(selectedIsland).name} →</Button>
    <Button secondary accent={C.dim} onClick={()=>setScreen(screens.background)} style={{marginTop:10}}>← Back</Button>
  </div></div>;

  if (screen === screens.review && game) return <><YearReview game={game} island={island} fmt={money} onNext={advanceYear}/><Toast text={toast}/></>;

  if (screen === screens.death && game) {
    const eligible = game.children.filter(child=>child.age >= 16);
    return <div style={{minHeight:'100vh',background:`linear-gradient(160deg,#160609,${C.bg},#071622)`,color:C.text,padding:'28px 16px'}}><div style={{maxWidth:480,margin:'0 auto',textAlign:'center'}}><div style={{fontSize:54}}>🕯️</div><h1 style={{fontSize:28,margin:'4px 0'}}>A Life Remembered</h1><p style={{fontSize:13,color:C.dim,lineHeight:1.8,margin:'0 0 17px'}}>{deathMessage}</p><Card style={{padding:14,textAlign:'left',marginBottom:14}}><p style={{fontSize:10,color:C.gold,fontWeight:900,letterSpacing:1.5,margin:'0 0 7px'}}>LEGACY</p><p style={{fontSize:12,color:C.muted,lineHeight:1.6,margin:0}}>{game.name} left behind {money(totalNetWorth(game))} in net worth, {game.children.length} child{game.children.length===1?'':'ren'}, and a story the island will remember.</p></Card>{eligible.length>0 ? <><Button onClick={()=>setScreen(screens.generation)} style={{width:'100%',fontSize:14}}>Continue the Legacy →</Button><p style={{fontSize:10,color:C.faint,marginTop:8}}>Choose an adult child to carry the next generation.</p></> : <Button onClick={()=>setScreen(screens.end)} style={{width:'100%'}}>View Final Story</Button>}</div></div>;
  }

  if (screen === screens.generation && game) {
    const eligible = game.children.filter(child=>child.age>=16);
    return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:'26px 16px'}}><div style={{maxWidth:480,margin:'0 auto'}}><p style={{fontSize:10,color:C.gold,fontWeight:900,letterSpacing:2,margin:'0 0 4px'}}>GENERATION {game.generation + 1}</p><h1 style={{fontSize:27,margin:'0 0 8px'}}>Choose the Heir</h1><p style={{fontSize:12,color:C.dim,lineHeight:1.7,margin:'0 0 15px'}}>This choice is real. The child you select becomes the next player character.</p><div style={{display:'flex',flexDirection:'column',gap:9}}>{eligible.map(child=><button key={child.id} onClick={()=>selectHeir(child)} style={{textAlign:'left',cursor:'pointer',background:`${C.gold}0D`,border:`1px solid ${C.gold}38`,borderRadius:13,padding:'13px',color:C.text}}><p style={{fontWeight:900,margin:'0 0 3px'}}>🧒 {child.name}</p><p style={{fontSize:10,color:C.dim,margin:0}}>Age {child.age} · Intelligence {child.stats.intelligence} · Wellbeing {child.stats.wellbeing}</p></button>)}</div></div></div>;
  }

  if (screen === screens.end && game) {
    const netWorth = totalNetWorth(game);
    const score = netWorth/700 + game.stats.happiness + game.stats.integrity + game.stats.communityStanding;
    const rating = score>420 ? ['Caribbean Legend 👑',C.gold,'You built wealth, kept your word, and earned the island’s trust.'] : score>300 ? ['Island Success Story 🌟',C.green,'Solid, honest, and real. The island remembers the right things.'] : score>170 ? ['Still Finding the Way 🌱',C.turquoise,'The hard lessons became tuition for the next chapter.'] : ['The Comeback Starts Now 💪',C.coral,'The road was hard, but survival still counts.'];
    return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:'26px 14px 48px'}}><div style={{maxWidth:480,margin:'0 auto',textAlign:'center'}}><IslandMark island={island} className="island-mark--large" /><h1 style={{fontSize:29,margin:'4px 0'}}>{game.name}'s Story</h1><p style={{color:rating[1],fontWeight:900,fontSize:17,margin:'4px 0'}}>{rating[0]}</p><p style={{fontSize:12,color:C.dim,margin:'0 0 14px'}}>Age {game.age} · Generation {game.generation} · {island.name}</p><Card style={{padding:15,textAlign:'left',marginBottom:12}}>{[
      ['💰','Net worth',money(netWorth),C.green],['🏦','Cash',money(game.finance.cash),C.gold],['📈','Investments',money(game.finance.investments),C.turquoise],['🏠','Property value',money(game.finance.propertyValue),C.teal],['🏘️','Community',`${Math.round(game.stats.communityStanding)}/100`,C.pink],['⚖️','Integrity',`${Math.round(game.stats.integrity)}/100`,C.gold]
    ].map(([emoji,label,value,color])=><div key={label} style={{display:'flex',justifyContent:'space-between',padding:'5px 0'}}><span style={{fontSize:12,color:C.dim}}>{emoji} {label}</span><span style={{fontSize:12,color,fontWeight:900}}>{value}</span></div>)}</Card><p style={{fontSize:12,color:C.muted,lineHeight:1.7,margin:'0 0 14px'}}>{rating[2]}</p><Button onClick={restart} style={{width:'100%',fontSize:14}}>🌴 Begin a New Life</Button></div></div>;
  }

  if (screen === screens.game && game && finance) {
    const selected = categories.find(category=>category.id === selectedCategory);
    const achievementItems = ACHIEVEMENTS.filter(item=>game.achievements.includes(item.id));
    const familyHeadline = game.partner ? `❤️ ${game.partner.name.split(' ')[0]} · ${Math.round(game.partner.relationship)}%` : 'No partner yet';
    const career = CAREERS[game.career] || CAREERS.none;
    const theme = islandTheme(game.islandId);
    const mood = storyMood(game,island,activeGoal);
    const recommended = recommendedCategories(categories, game, finance);
    const priority = currentPriority(game, finance);
    const priorityAlerts = currentAlerts(game, finance);
    const focusMarkers = Array.from({length:YEAR_FOCUS}, (_, index) => `C${index + 1}`);
    const recentLog = game.yearLog.slice(-5);
    const statRows = [
      ['😊','Joy','happiness',C.gold],['❤️','Health','health',C.coral],['🧠','Stress','stress',C.violet],['🤝','Social','relationships',C.turquoise],
      ['📚','Mind','intelligence',C.turquoise],['💪','Drive','workEthic',C.orange],['🌱','Community','communityStanding',C.green],['⚖️','Integrity','integrity',C.gold]
    ];
    const heroMetrics = [
      ['Cash',money(finance.cash),finance.cash>2000?C.green:C.gold],
      ['Focus',`${YEAR_FOCUS-game.yearFocus}/${YEAR_FOCUS} left`,theme.primary]
    ];
    return <div className="story-shell" data-reduced-motion={playerSettings.reducedMotion ? 'true' : 'false'} data-text-size={playerSettings.textSize} style={{'--island-primary':theme.primary,'--island-secondary':theme.secondary,'--island-deep':theme.deep,'--island-soft':theme.soft}}>
      <Toast text={toast}/>
      <div className="story-wrap soft-scroll">
        <section className="story-hero dashboard-hero">
          <div style={{position:'relative',zIndex:1}}>
            <div className="hero-main-row">
              <div className="avatar-orb">{activeAvatar.emoji}<IslandMark island={island} className="flag-chip" /></div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:10,color:theme.primary,fontWeight:900,letterSpacing:1.7,textTransform:'uppercase',margin:'0 0 4px'}}>Age {game.age} · {island.name}</p>
                <h1 className="hero-title">{mood.title}</h1>
                <p style={{fontSize:12,color:C.dim,margin:0,overflowWrap:'anywhere'}}>{game.name} · {activeGoal.emoji} {activeGoal.label}</p>
              </div>
            </div>
            <div className="hero-metrics">{heroMetrics.map(([label,value,color])=><div key={label} className="hero-metric"><p>{label}</p><strong style={{color}}>{value}</strong></div>)}</div>
            <p style={{fontSize:12,color:C.muted,lineHeight:1.55,margin:'0 0 11px'}}>{mood.text}</p>
            <div className="hero-chip-row">
              <span style={{fontSize:9,color:theme.primary,border:`1px solid ${theme.primary}44`,background:`${theme.primary}12`,padding:'4px 7px',borderRadius:999,fontWeight:900}}>{career.emoji} {career.label}{game.careerLevel>0?` Lv${game.careerLevel}`:''}</span>
              <span style={{fontSize:9,color:theme.secondary,border:`1px solid ${theme.secondary}44`,background:`${theme.secondary}12`,padding:'4px 7px',borderRadius:999,fontWeight:900}}>{island.festival}</span>
              {game.migration&&<span style={{fontSize:9,color:C.turquoise,border:`1px solid ${C.turquoise}44`,background:`${C.turquoise}12`,padding:'4px 7px',borderRadius:999,fontWeight:900}}>{game.migration.label}</span>}
            </div>
            <div className="focus-header-row">
              <div>
                <p style={{fontSize:10,color:C.faint,letterSpacing:1.4,textTransform:'uppercase',fontWeight:900,margin:'0 0 2px'}}>Chapter energy</p>
                <p style={{fontSize:11,color:C.muted,margin:0}}>{theme.mood}</p>
              </div>
              <p style={{fontSize:18,color:theme.primary,fontWeight:950,margin:0}}>{YEAR_FOCUS-game.yearFocus} left</p>
            </div>
            <div className="focus-timeline" style={{gridTemplateColumns:`repeat(${YEAR_FOCUS},1fr)`}}>{focusMarkers.map((marker,index)=><div key={marker} className={`focus-step ${index<game.yearFocus?'is-used':''}`}><div className={`focus-pip ${index<game.yearFocus?'is-used':''}`} style={{background:index<game.yearFocus?`linear-gradient(90deg,${theme.primary},${theme.secondary})`:'rgba(255,255,255,0.11)',boxShadow:index<game.yearFocus?`0 0 10px ${theme.primary}66`:'none'}} /><span>{marker}</span></div>)}</div>
            <div className="hero-action-row">
              <Button onClick={saveCurrent} secondary accent={theme.secondary} style={{minHeight:44}}>Save</Button>
              <Button disabled={game.yearFocus < YEAR_FOCUS} onClick={()=>finishYear(game)} accent={theme.primary} style={{minHeight:44}}>{game.yearFocus<YEAR_FOCUS?`${YEAR_FOCUS-game.yearFocus} focus left`:'Wrap Up Age'}</Button>
            </div>
          </div>
        </section>

        <section className={`story-panel priority-panel ${priorityAlerts.length?'has-alerts':''}`} style={{padding:'13px 14px',marginTop:10,borderColor:priorityAlerts.length?`${C.coral}55`:`${theme.primary}38`}}>
          <div className="section-kicker-row">
            <p style={{fontSize:10,color:priorityAlerts.length?C.coral:theme.primary,fontWeight:900,letterSpacing:1.5,textTransform:'uppercase',margin:0}}>Your next move</p>
            {priorityAlerts.length > 0 && <span className="alert-count">{priorityAlerts.length} alert{priorityAlerts.length===1?'':'s'}</span>}
          </div>
          <p style={{fontSize:13,color:C.text,lineHeight:1.48,fontWeight:850,margin:'8px 0 10px'}}>{priority.text}</p>
          {priorityAlerts.length > 0 && <div className="priority-alerts">{priorityAlerts.map(alert=><div key={alert.label} className={`priority-alert priority-alert--${alert.tone}`}><strong>{alert.label}</strong><span>{alert.text}</span></div>)}</div>}
          <div className="priority-goals">{priority.goals.slice(0,3).map(goal=><span key={goal}><i aria-hidden="true" />{goal}</span>)}</div>
        </section>

        {!selected ? <>
          <section className="recommended-section">
            <div className="section-heading-row">
              <div>
                <p style={{fontSize:10,letterSpacing:1.8,color:theme.primary,fontWeight:900,textTransform:'uppercase',margin:'0 0 3px'}}>Recommended chapters</p>
                <p style={{fontSize:11,color:C.dim,margin:0}}>Based on your goal, pressure, and current chapter.</p>
              </div>
            </div>
            <div className="recommended-list">{recommended.map(category=>{
              const story = CATEGORY_STORIES[category.id] || {promise:category.tag, vibe:'Life chapter'};
              return <button key={category.id} className="chapter-card recommended-card choice-lift" onClick={()=>setSelectedCategory(category.id)} style={{cursor:'pointer',textAlign:'left',border:`1px solid ${category.color}62`,background:`linear-gradient(135deg,${category.color}18,rgba(255,255,255,.05))`,color:C.text,boxShadow:`0 14px 32px ${category.color}12`}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <CategoryVisual category={category} />
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:9,color:category.color,fontWeight:900,letterSpacing:1.2,textTransform:'uppercase',margin:'0 0 2px'}}>{story.vibe}</p>
                    <p style={{fontSize:14,fontWeight:950,margin:'0 0 2px'}}>{category.label}</p>
                    <p style={{fontSize:10,color:C.muted,lineHeight:1.35,margin:0}}>{story.promise}</p>
                  </div>
                  <span style={{fontSize:16,color:category.color}}>→</span>
                </div>
              </button>;
            })}</div>
          </section>

          <section>
            <p style={{fontSize:10,letterSpacing:1.8,color:C.dim,fontWeight:900,textTransform:'uppercase',margin:'0 0 8px'}}>All life paths</p>
            <div className="chapter-grid" style={{marginBottom:14}}>{categories.map(category=>{
              const story = CATEGORY_STORIES[category.id] || {promise:category.tag, vibe:'Life chapter'};
              return <button key={category.id} className={`chapter-card path-card choice-lift${category.categoryLocked?' is-locked':''}`} onClick={()=>!category.categoryLocked && setSelectedCategory(category.id)} disabled={category.categoryLocked} style={{cursor:category.categoryLocked?'not-allowed':'pointer',textAlign:'left',border:`1px solid ${category.categoryLocked?'rgba(255,255,255,.20)':category.color+'55'}`,background:category.categoryLocked?'rgba(255,255,255,.04)':`linear-gradient(160deg,${category.color}12,rgba(255,255,255,.04))`,color:C.text,opacity:category.categoryLocked?0.82:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:7}}>
                  <CategoryVisual category={category} />
                  <span style={{fontSize:8,color:category.categoryLocked?C.faint:category.color,border:`1px solid ${category.categoryLocked?C.faint:category.color}33`,borderRadius:20,padding:'2px 6px',fontWeight:900,textTransform:'uppercase'}}>{category.categoryLocked?'Locked':story.vibe}</span>
                </div>
                <p style={{fontWeight:950,fontSize:13,color:category.categoryLocked?C.dim:category.color,margin:'0 0 4px'}}>{category.label}</p>
                <p style={{fontSize:10,color:C.muted,lineHeight:1.38,margin:'0 0 7px',fontWeight:category.categoryLocked?800:500}}>{category.categoryLocked?category.categoryLock:story.promise}</p>
                <p style={{fontSize:9,color:C.faint,fontWeight:800,margin:0}}>{category.items.length} choices</p>
              </button>;
            })}</div>
          </section>

          <section className="details-stack">
            <p style={{fontSize:10,letterSpacing:1.8,color:C.dim,fontWeight:900,textTransform:'uppercase',margin:'0 0 8px'}}>Life details</p>
            <SkatePanel game={game} color={theme.primary} />
          </section>

          <section className="story-panel" style={{padding:'12px 13px',marginBottom:9,borderColor:`${theme.primary}33`}}>
            <p style={{fontSize:10,color:theme.primary,fontWeight:900,letterSpacing:1.5,textTransform:'uppercase',margin:'0 0 8px'}}>Story so far</p>
            {recentLog.length ? recentLog.map((entry,index)=><div key={`${entry.id}-${index}`} style={{display:'flex',gap:9,alignItems:'center',padding:'5px 0'}}>
              <span style={{fontSize:9,color:C.faint,minWidth:24}}>{entry.month}</span>
              <span style={{fontSize:17}}>{entry.emoji}</span>
              <span style={{flex:1,fontSize:11,color:entry.isEvent?theme.primary:C.muted,fontWeight:entry.isEvent?900:650}}>{entry.label}</span>
              {entry.cost>0&&<span style={{fontSize:9,color:theme.secondary,fontWeight:900}}>-{entry.cost}</span>}
            </div>) : <p style={{fontSize:11,color:C.dim,lineHeight:1.5,margin:0}}>No choices yet this age. Pick the first chapter and let the year start moving.</p>}
          </section>

          <div className="story-panel" style={{marginBottom:8,borderColor:`${theme.primary}30`}}><button className="detail-toggle" onClick={()=>setOpen(state=>({...state,settings:!state.settings}))} style={{color:theme.primary}}>Player Settings <span>{open.settings?'▲':'▼'}</span></button>{open.settings&&<div style={{padding:'0 12px 12px'}}><PlayerSettingsPanel settings={playerSettings} onChange={updatePlayerSettings} accent={theme.primary}/></div>}</div>
          <div className="story-panel" style={{marginBottom:8,borderColor:`${C.green}30`}}><button className="detail-toggle" onClick={()=>setOpen(state=>({...state,stats:!state.stats}))} style={{color:C.green}}>Stats & Money <span>{open.stats?'▲':'▼'}</span></button>{open.stats&&<div style={{padding:'0 12px 12px'}}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:10}}>{statRows.map(([emoji,label,key,accent])=>{const value=Math.round(game.stats[key]); const color=statTone(key,value); return <div key={key} style={{background:`${accent}09`,border:`1px solid ${accent}1F`,borderRadius:9,padding:'7px 8px'}}><p style={{fontSize:9,color:C.dim,margin:'0 0 2px'}}>{emoji} {label}</p><p style={{fontSize:14,fontWeight:900,color,margin:'0 0 4px'}}>{value}</p><div style={{height:3,borderRadius:2,background:'rgba(255,255,255,.08)',overflow:'hidden'}}><div style={{height:3,width:`${value}%`,background:color}} /></div></div>})}</div><FinancePanel game={game} finance={finance} island={island} fmt={money}/></div>}</div>
          <div className="story-panel" style={{marginBottom:8,borderColor:`${C.turquoise}30`}}><button className="detail-toggle" onClick={()=>setOpen(state=>({...state,skills:!state.skills}))} style={{color:C.turquoise}}>Skills <span>{open.skills?'▲':'▼'}</span></button>{open.skills&&<div style={{padding:'0 12px 12px'}}>{SKILLS.map(skill=>{const value=game.skills[skill.id]||0; return <div key={skill.id} style={{margin:'8px 0'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:3}}><span style={{color:C.muted}}>{skill.emoji} {skill.label}</span><span style={{color:skill.color,fontWeight:900}}>{value}{skillLabelText(skill.id,value)}</span></div><div style={{height:4,borderRadius:3,background:'rgba(255,255,255,.07)',overflow:'hidden'}}><div style={{height:4,width:`${value}%`,background:skill.color}} /></div></div>})}</div>}</div>
          <div className="story-panel" style={{marginBottom:8,borderColor:`${C.pink}30`}}><button className="detail-toggle" onClick={()=>setOpen(state=>({...state,family:!state.family}))} style={{color:C.pink}}>Family · {familyHeadline} <span>{open.family?'▲':'▼'}</span></button>{open.family&&<div style={{padding:'0 12px 12px'}}><FamilyPanel game={game}/></div>}</div>
          <div className="story-panel" style={{marginBottom:10,borderColor:`${C.gold}30`}}><button className="detail-toggle" onClick={()=>setOpen(state=>({...state,achievements:!state.achievements}))} style={{color:C.gold}}>Achievements · {achievementItems.length}/{ACHIEVEMENTS.length} <span>{open.achievements?'▲':'▼'}</span></button>{open.achievements&&<div style={{padding:'0 12px 12px'}}>{ACHIEVEMENTS.map(item=>{const unlocked=game.achievements.includes(item.id); return <div key={item.id} style={{padding:'6px 0',display:'flex',gap:7,opacity:unlocked?1:.4}}><span>{item.emoji}</span><div><p style={{fontSize:11,fontWeight:800,color:unlocked?C.gold:C.dim,margin:0}}>{item.title}</p><p style={{fontSize:9,color:C.faint,margin:'1px 0 0'}}>{item.text}</p></div></div>})}</div>}</div>
        </> : <>
          <button onClick={()=>setSelectedCategory(null)} className="choice-lift" style={{cursor:'pointer',border:`1px solid ${selected.color}55`,background:`${selected.color}14`,color:selected.color,padding:'8px 11px',borderRadius:999,fontWeight:900,fontSize:11,margin:'14px 0 10px'}}>← Back to chapter map</button>
          <section className="story-panel selected-chapter-card" style={{padding:'14px',marginBottom:10,borderColor:`${selected.color}66`,background:`linear-gradient(150deg,${selected.color}14,rgba(255,255,255,.045))`,boxShadow:`0 14px 38px ${selected.color}18`}}>
            <div style={{display:'flex',gap:11,alignItems:'center',marginBottom:8}}>
              <CategoryVisual category={selected} selected />
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:10,color:selected.color,fontWeight:900,letterSpacing:1.4,textTransform:'uppercase',margin:'0 0 5px'}}>{CATEGORY_STORIES[selected.id]?.vibe || 'Life chapter'}</p>
                <h2 style={{fontWeight:950,fontSize:22,lineHeight:1.05,color:selected.color,margin:0}}>{selected.label}</h2>
              </div>
            </div>
            <p style={{fontSize:12,color:C.muted,lineHeight:1.6,margin:'0 0 8px'}}>{selected.categoryLocked?selected.categoryLock:(CATEGORY_STORIES[selected.id]?.promise || selected.tag)}</p>
            <p style={{fontSize:10,color:C.faint,margin:0}}>Pick a response. The outcome becomes part of this year's story log.</p>
          </section>
          <div style={{display:'flex',flexDirection:'column',gap:9}}>{selected.items.map(action=>{
            let status = canUseAction(game,action);
            if (selected.categoryLocked) status = {ok:false,lines:[selected.categoryLock]};
            return <ActionCard key={action.id} action={action} color={selected.color} status={status} onChoose={chooseAction} fmt={money}/>;
          })}</div>
        </>}
      </div>
      <EventModal event={event} onChoose={chooseEvent}/><OutcomeModal outcome={outcome} onContinue={continueOutcome} fmt={money}/>
    </div>;
  }

  return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:24}}>Loading…</div>;
}

function skillLabelText(id,value) {
  const skill = SKILLS.find(item=>item.id===id);
  const label = skill ? [...skill.unlocks].reverse().find(([minimum])=>value>=minimum)?.[1] : null;
  return label ? ` · ${label}` : '';
}
