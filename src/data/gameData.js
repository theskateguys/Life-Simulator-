export const C = {
  gold:'#FFD60A', coral:'#FF6464', turquoise:'#00D9FF', green:'#3DDB85',
  orange:'#FF8C36', violet:'#C07AFF', pink:'#FF6FA8', teal:'#1BCFC9',
  red:'#FF3B3B', bg:'#050E1A', bgM:'#0B1E2E', card:'rgba(255,255,255,0.06)', border:'rgba(255,255,255,0.14)',
  text:'#FFFFFF', muted:'#A8D8EA', dim:'#6AADBE', faint:'#3A7A8E'
};

export const ISLANDS = [
  {
    id:'jamaica', flag:'🇯🇲', name:'Jamaica', currency:'J$', tag:'Kingston streets to boardrooms.',
    bonus:{workEthic:10,leadership:5}, incomeMultiplier:0.96, monthlyEssentials:1150,
    propertyPrice:85000, rentalIncome:520, stormRisk:0.14, festival:'Reggae Sumfest',
    unique:{title:'Sound System Opportunity', icon:'🎶', story:'A respected selector heard your work and wants you on a major stage this summer.', choices:[
      {label:'🎤 Take the slot', result:'The crowd responded. Your name began to travel outside your district.', changes:{happiness:12,communityStanding:10}, fame:1400},
      {label:'📚 Stay focused on work', result:'You protected your schedule and kept your longer plan intact.', changes:{intelligence:6,stress:-4}}
    ]}
  },
  {
    id:'trinidad', flag:'🇹🇹', name:'Trinidad & Tobago', currency:'TT$', tag:'Energy, Carnival, and ambition.',
    bonus:{cash:600,creative:5}, incomeMultiplier:1.12, monthlyEssentials:1320,
    propertyPrice:105000, rentalIncome:640, stormRisk:0.05, festival:'Carnival',
    unique:{title:'Carnival Contract', icon:'🎭', story:'A band needs dependable people to coordinate a section and content around the road experience.', choices:[
      {label:'🎭 Build the Carnival project', result:'The season was hectic, but the network and visibility were real.', changes:{cash:1400,creative:8,communityStanding:12,stress:8}, fame:900},
      {label:'🧭 Keep your year structured', result:'You avoided a month that could have swallowed the rest of your goals.', changes:{stress:-8,intelligence:5}}
    ]}
  },
  {
    id:'barbados', flag:'🇧🇧', name:'Barbados', currency:'BBD$', tag:'Tourism, service, and pride.',
    bonus:{intelligence:5,communityStanding:10}, incomeMultiplier:1.05, monthlyEssentials:1450,
    propertyPrice:120000, rentalIncome:710, stormRisk:0.11, festival:'Crop Over',
    unique:{title:'Tourism Season Partnership', icon:'🏝️', story:'A hotel and local experience operator need a reliable partner for the high season.', choices:[
      {label:'🤝 Partner for the season', result:'The work was demanding, but your standards were noticed by people with reach.', changes:{cash:1800,communityStanding:12,stress:8}, fame:500},
      {label:'📈 Ask for a formal contract', result:'You negotiated clear terms and avoided being taken for granted.', changes:{cash:1100,intelligence:8,integrity:4}}
    ]}
  },
  {
    id:'dominican', flag:'🇩🇴', name:'Dominican Republic', currency:'RD$', tag:'Hustle hard. Family first.',
    bonus:{workEthic:12,relationships:5}, incomeMultiplier:0.98, monthlyEssentials:1020,
    propertyPrice:76000, rentalIncome:470, stormRisk:0.16, festival:'Merengue Festival',
    unique:{title:'Family Export Connection', icon:'📦', story:'A cousin has a legal import-export contact and needs someone trustworthy to coordinate small orders.', choices:[
      {label:'📦 Run the pilot properly', result:'You created a small but reliable revenue lane and built family trust.', changes:{cash:1300,relationships:10,intelligence:7,stress:5}},
      {label:'🚫 Keep family and business apart', result:'You protected the relationship before a money issue could test it.', changes:{integrity:6,stress:-4}}
    ]}
  },
  {
    id:'stlucia', flag:'🇱🇨', name:'St. Lucia', currency:'EC$', tag:'Small island. Massive ambition.',
    bonus:{happiness:10,communityStanding:8}, incomeMultiplier:0.92, monthlyEssentials:1080,
    propertyPrice:82000, rentalIncome:500, stormRisk:0.18, festival:'Saint Lucia Jazz',
    unique:{title:'Festival Hospitality Project', icon:'🎷', story:'A local promoter needs someone to coordinate an experience for visitors during festival season.', choices:[
      {label:'🎷 Lead the experience', result:'Visitors left with a strong story about the island—and your professionalism.', changes:{cash:1200,communityStanding:13,leadership:7,stress:6}},
      {label:'🛠️ Support behind the scenes', result:'You kept the risk manageable and still made valuable contacts.', changes:{cash:650,relationships:8}}
    ]}
  },
  {
    id:'custom', flag:'🏝️', name:'My Island', currency:'$', tag:'Your culture. Your rules.',
    bonus:{intelligence:5,happiness:5}, incomeMultiplier:1, monthlyEssentials:1200,
    propertyPrice:90000, rentalIncome:550, stormRisk:0.10, festival:'Island Festival',
    unique:{title:'Community Project Call', icon:'🌴', story:'A community group wants a capable organiser to turn a good idea into a real programme.', choices:[
      {label:'🌴 Lead the project', result:'The work was visible, useful, and it changed how people saw you.', changes:{communityStanding:15,leadership:9,stress:7}},
      {label:'🤝 Contribute quietly', result:'You gave your time without taking on the whole burden.', changes:{communityStanding:8,happiness:7}}
    ]}
  }
];

export const BACKGROUNDS = [
  {id:'poverty', emoji:'🔴', label:'Born Into Struggle', diff:'HARD', color:C.coral, cash:0, desc:'No safety net. Pure hustle.', monthlyModifier:0.82, stats:{happiness:45,health:60,workEthic:75,intelligence:45,relationships:45}},
  {id:'working', emoji:'🟡', label:'Working Class Family', diff:'MEDIUM', color:C.gold, cash:500, desc:'Parents grind. Values before money.', monthlyModifier:0.95, stats:{happiness:60,health:70,workEthic:65,intelligence:55,relationships:55}},
  {id:'middle', emoji:'🟢', label:'Middle Class', diff:'NORMAL', color:C.green, cash:5000, desc:'Stable home. Good school. Connections.', monthlyModifier:1.05, stats:{happiness:70,health:75,workEthic:55,intelligence:65,relationships:60}},
  {id:'wealthy', emoji:'🔵', label:'Well-Off Family', diff:'EASY', color:C.turquoise, cash:25000, desc:'Private school, network, head start.', monthlyModifier:1.20, stats:{happiness:75,health:80,workEthic:45,intelligence:70,relationships:65}}
];

export const LIFE_GOALS = [
  {id:'own_path', emoji:'🧭', label:'Choose My Own Path', short:'No fixed destiny', text:'Explore career, family, money, culture, and legacy at your own pace.'},
  {id:'wealth', emoji:'💰', label:'Build Wealth', short:'Cash, assets, freedom', text:'Focus on savings, investments, business, and property ownership.'},
  {id:'family', emoji:'👨‍👩‍👧', label:'Start a Family', short:'Love and legacy', text:'Build relationships, raise children, and continue your story through generations.'},
  {id:'fame', emoji:'🌟', label:'Become Known', short:'Audience and influence', text:'Grow your creative path, reputation, followers, and brand opportunities.'},
  {id:'business', emoji:'🏪', label:'Own a Business', short:'Hustle to empire', text:'Turn skills and opportunity into an operating business with real cash flow.'},
  {id:'community', emoji:'🌱', label:'Serve the Island', short:'Trust and impact', text:'Build respect through integrity, relationships, faith, and community work.'}
];

export const THEME_MODES = [
  {id:'sleek', emoji:'🌙', label:'Dark & Sleek', text:'A focused life-sim look with deeper contrast and cleaner panels.'},
  {id:'island', emoji:'🌴', label:'Island Color', text:'A brighter Caribbean feel with warmer colors and more festival energy.'}
];

export const AVATARS = [
  {id:'youth_neutral', emoji:'🧑🏾', label:'Island Youth'},
  {id:'young_woman', emoji:'👩🏾', label:'Young Woman'},
  {id:'young_man', emoji:'👨🏾', label:'Young Man'},
  {id:'bright_smile', emoji:'😊', label:'Bright Smile'},
  {id:'cool_style', emoji:'😎', label:'Cool Style'},
  {id:'dreamer', emoji:'🙂', label:'Dreamer'}
];

const FIRST_F = {
  jamaica:['Kezia','Alicia','Stacy-Ann','Nadine','Simone','Tricia','Marcia','Shenelle','Kadesha','Renae'],
  trinidad:['Priya','Alana','Candice','Nadia','Sasha','Aisha','Rowena','Kezia','Tricia','Simone'],
  barbados:['Tiara','Kezia','Simone','Alicia','Renee','Sandra','Nadia','Marcia','Tricia','Keisha'],
  dominican:['Sofia','Maria','Luisa','Carmen','Valentina','Isabella','Adriana','Patricia','Natalia','Diana'],
  stlucia:['Kezia','Simone','Alicia','Tricia','Marcia','Nadia','Renae','Sandra','Tiara','Keisha'],
  custom:['Kezia','Simone','Alicia','Tricia','Marcia','Nadia','Priya','Sofia','Renae','Tiara']
};
const FIRST_M = {
  jamaica:['Marcus','Dwayne','Omar','Sheldon','Kemar','Devon','Rasheed','Tyrone','Andre','Delano'],
  trinidad:['Ryan','Andre','Sheldon','Darren','Brian','Ravi','Jason','Kevin','Wendell','Clyde'],
  barbados:['Marcus','Ryan','Andre','Kevin','Shane','Jason','Devon','Kemar','Brian','Dario'],
  dominican:['Carlos','Miguel','Luis','Juan','Diego','Rafael','Antonio','Eduardo','Pedro','Alejandro'],
  stlucia:['Marcus','Ryan','Andre','Shane','Kevin','Jason','Devon','Brian','Kemar','Tristan'],
  custom:['Marcus','Ryan','Andre','Shane','Kevin','Jason','Devon','Brian','Kemar','Tristan']
};
const SURNAMES = {
  jamaica:['Brown','Campbell','Clarke','Francis','Green','Henry','James','Johnson','Kelly','Lewis'],
  trinidad:['Ali','Baptiste','Charles','De Souza','Garcia','Joseph','Khan','Martin','Phillip','Ramsaran'],
  barbados:['Alleyne','Brathwaite','Clarke','Forde','Gittens','Holder','Inniss','Jordan','King','Leacock'],
  dominican:['Cruz','Diaz','Garcia','Gomez','Hernandez','Lopez','Martinez','Perez','Rodriguez','Santos'],
  stlucia:['Auguste','Charles','Dubois','Flavius','George','Henry','Jean','Joseph','Laurent','Pierre'],
  custom:['Brown','Clarke','Henry','James','Johnson','Lewis','Martin','Phillip','Thomas','Williams']
};

export function generateName(gender, islandId) {
  const pool = (gender === 'f' ? FIRST_F : FIRST_M)[islandId] || (gender === 'f' ? FIRST_F.custom : FIRST_M.custom);
  const surname = (SURNAMES[islandId] || SURNAMES.custom);
  return `${pool[Math.floor(Math.random() * pool.length)]} ${surname[Math.floor(Math.random() * surname.length)]}`;
}

export const SKILLS = [
  {id:'cooking', label:'Cooking', emoji:'🍳', color:C.orange, maxPerYear:4, unlocks:[[20,'Food Stall'],[50,'Restaurant'],[80,'Chain']]},
  {id:'tech', label:'Tech', emoji:'💻', color:C.turquoise, maxPerYear:4, unlocks:[[20,'Freelance'],[50,'Tech Career'],[80,'Startup']]},
  {id:'trade', label:'Trade', emoji:'🔨', color:'#C0A070', maxPerYear:4, unlocks:[[20,'Skilled Worker'],[50,'Contractor'],[80,'Developer']]},
  {id:'finance', label:'Finance', emoji:'📊', color:C.green, maxPerYear:4, unlocks:[[20,'Investor'],[50,'Finance Pro'],[80,'Wealth Manager']]},
  {id:'creative', label:'Creative', emoji:'🎨', color:C.violet, maxPerYear:4, unlocks:[[20,'Performer'],[50,'Local Star'],[80,'Empire']]},
  {id:'leadership', label:'Leadership', emoji:'🤝', color:C.pink, maxPerYear:4, unlocks:[[20,'Team Lead'],[50,'Manager'],[80,'Director']]},
  {id:'fitness', label:'Fitness', emoji:'🏋️', color:C.coral, maxPerYear:4, unlocks:[[20,'Fit'],[50,'Trainer'],[80,'Health Biz']]}
];

export const CAREERS = {
  none:{label:'No Career',emoji:'🚶',base:350}, employee:{label:'Employee',emoji:'💼',base:1800},
  tech:{label:'Tech Professional',emoji:'💻',base:3400}, trade:{label:'Tradesperson',emoji:'🔨',base:2700},
  creative:{label:'Creative Pro',emoji:'🎨',base:1650}, entrepreneur:{label:'Entrepreneur',emoji:'🏪',base:0},
  finance:{label:'Finance Pro',emoji:'📊',base:3200}, community:{label:'Community Leader',emoji:'🤝',base:2300},
  health_pro:{label:'Health Pro',emoji:'🏥',base:2900}, creator:{label:'Content Creator',emoji:'📱',base:700}
};

export const FAME_LEVELS = [
  {level:0,label:'Unknown',emoji:'👤',threshold:0,color:C.faint},
  {level:1,label:'Local Name',emoji:'🌟',threshold:1000,color:C.violet},
  {level:2,label:'Island Star',emoji:'⭐',threshold:50000,color:C.gold},
  {level:3,label:'Caribbean',emoji:'🌴',threshold:500000,color:C.orange},
  {level:4,label:'Global',emoji:'🌍',threshold:5000000,color:C.turquoise}
];

export const BRAND_DEALS = [
  {id:'rituals', name:'Rituals Coffee', emoji:'☕', minLevel:1, fee:3000, annual:600, years:1, message:'Rituals wants you for a community creator campaign. The fit is clean and local.'},
  {id:'courts', name:'Courts Caribbean', emoji:'🛋️', minLevel:2, fee:12000, annual:2400, years:1, message:'Courts sees a trusted voice with a growing audience and wants a one-year campaign.'},
  {id:'bmobile', name:'bMobile', emoji:'📱', minLevel:2, fee:10000, annual:2000, years:1, message:'bMobile wants a digital campaign around island ambition and creativity.'},
  {id:'flow', name:'FLOW Caribbean', emoji:'📡', minLevel:3, fee:20000, annual:4000, years:1, message:'FLOW wants a larger campaign. The contract is serious, time-bound, and visible.'},
  {id:'guardian', name:'Guardian Life', emoji:'🛡️', minLevel:3, fee:25000, annual:5000, years:1, message:'Guardian wants a values-led campaign. Strong fit for community trust.'}
];

export const ACHIEVEMENTS = [
  {id:'cash10k', emoji:'💰', title:'First $10K Saved', text:'You built a real cash buffer.', test:g=>g.finance.cash>=10000},
  {id:'business', emoji:'🏪', title:'First Business', text:'You turned a hustle into an operating business.', test:g=>g.business.active},
  {id:'debtfree', emoji:'🧾', title:'Debt-Free', text:'You cleared a loan instead of carrying it forever.', test:g=>g.flags.includes('had_loan') && g.finance.loanDebt<=0},
  {id:'community', emoji:'🌱', title:'Community Builder', text:'The community knows you show up.', test:g=>g.stats.communityStanding>=75},
  {id:'islandstar', emoji:'⭐', title:'Island Star', text:'Your influence reached island-wide.', test:g=>g.followers>=50000},
  {id:'family', emoji:'👨‍👩‍👧', title:'Family First', text:'You built love alongside ambition.', test:g=>Boolean(g.partner) && g.children.length>0 && g.partner.relationship>=75},
  {id:'recovery', emoji:'🕊️', title:'Recovery Journey', text:'You chose recovery over denial.', test:g=>g.flags.includes('in_recovery')},
  {id:'property', emoji:'🏠', title:'First Property', text:'You own a piece of the future.', test:g=>g.properties.length>=1},
  {id:'legacy', emoji:'🌴', title:'Legacy Builder', text:'Your story continues through another generation.', test:g=>g.generation>=2},
  {id:'legend', emoji:'👑', title:'Caribbean Legend', text:'Wealth, integrity, and community all grew together.', test:g=>g.finance.cash+g.finance.investments+g.finance.propertyValue>=300000 && g.stats.integrity>=70 && g.stats.communityStanding>=70}
];

const a = (id,label,emoji,desc,cost,lk,ym,changes={},skills={},special=null,req={}) => ({id,label,emoji,desc,cost,lk,ym,changes,skills,special,req});

export const ACTION_CATEGORIES = [
  {id:'learn', label:'LEARN', emoji:'📚', color:C.turquoise, tag:'Develop skills that open doors.', items:[
    a('study_cooking','Study Cooking','🍳','Deep culinary practice for a food path.',1,'cooking',4,{stress:3},{cooking:20}),
    a('study_tech','Study Tech','💻','Code, build, and create for the digital economy.',1,'tech',4,{stress:3,intelligence:3},{tech:19}),
    a('learn_trade','Learn a Trade','🔨','Electrical, plumbing, construction, or repairs.',1,'trade',4,{cash:-80,stress:2},{trade:20}),
    a('study_finance','Study Finance','📊','Build habits and knowledge that make money useful.',1,'finance',4,{cash:-80,intelligence:3},{finance:19}),
    a('develop_creative','Develop Creatively','🎨','Practice art, music, content, or performance.',1,'creative',4,{happiness:5},{creative:19},'creative_action'),
    a('build_leadership','Build Leadership','🤝','Learn how to move people and lead teams.',1,'leadership',4,{relationships:6},{leadership:18}),
    a('fitness_training','Fitness Training','🏋️','Structured health and physical discipline.',1,'fitness',4,{health:5,cash:-80},{fitness:18})
  ]},
  {id:'career', label:'CAREER', emoji:'💼', color:C.green, tag:'Advance your professional life.', items:[
    a('overdeliver','Over-Deliver','💪','Do more than the role requires. Costly, but visible.',1,'hard',3,{stress:15,health:-7},{leadership:5},'income_boost'),
    a('network','Network Actively','🌐','Build useful professional connections.',1,'net',4,{relationships:13,cash:-100},{leadership:8}),
    a('upskill','Grow Within Role','📈','Develop broader responsibilities and better judgment.',1,'ups',3,{intelligence:5,stress:5},{leadership:10}),
    a('promotion','Apply for Promotion','🏆','Put yourself forward for the next level.',1,'promo',1,{stress:8,happiness:6},{leadership:7},'try_promotion'),
    a('switch_career','Switch Career','🔄','Move towards the career your skills now support.',1,'switch',1,{stress:13,happiness:9},{},'career_switch'),
    a('migration','Pursue Migration Opportunity','🧳','Explore regional, Canadian, UK, or US pathways.',1,'migration',1,{stress:8},{leadership:5},'migration_event',{age:23})
  ]},
  {id:'hustle', label:'HUSTLE', emoji:'🏪', color:C.orange, tag:'Build income outside your job.', items:[
    a('cook_sell','Cook & Sell','🍱','Turn food skills into direct cash.',1,'cook_sell',4,{health:-5,stress:6},{cooking:8},'hustle_cash_400'),
    a('freelance','Freelance Tech','🖥️','Contract digital work for a client.',1,'freelance',4,{stress:8},{tech:6},'hustle_cash_650',{skill:{tech:18}}),
    a('market_stall','Market Stall','🛒','Build a weekend selling habit.',1,'market_stall',4,{communityStanding:5},{leadership:5},'hustle_cash_280'),
    a('perform','DJ / Perform','🎵','Earn and grow a creative audience.',1,'perform',3,{happiness:14,stress:5},{creative:11},'hustle_fame'),
    a('post_content','Post Content','📲','Create consistently and build the audience.',1,'content',4,{stress:3},{creative:8},'post_content'),
    a('start_business','Launch a Small Business','🚀','Register, stock, and launch a real operating business.',2,'start_business',1,{cash:-3000,stress:15,happiness:12},{leadership:5},'start_business',{cash:3000,skillAny:20})
  ]},
  {id:'money', label:'MONEY', emoji:'💰', color:C.gold, tag:'Build cash flow, reserves, and assets.', items:[
    a('save','Save Aggressively','🏦','Cut back and move the difference into cash reserves.',1,'save',1,{happiness:-6,stress:4},{finance:4},'save_cash'),
    a('invest','Set Up Index Fund','📈','Move cash into a long-term diversified investment.',1,'invest',1,{stress:-4},{finance:10},'invest_index',{cash:750}),
    a('buy_property','Buy Property','🏠','Put down a deposit and take a tracked mortgage.',1,'buy_property',1,{stress:11,happiness:15},{finance:7,trade:4},'buy_property',{propertyDeposit:true}),
    a('pardner','Join Pardner Hand','🤲','A rotating savings hand with a real annual limit.',1,'pardner',1,{communityStanding:7,relationships:6},{leadership:4},'join_pardner',{cash:400}),
    a('loan','Take Business Loan','💳','Receive a tracked loan. Borrow only with a plan.',1,'loan',1,{cash:8000,stress:10},{finance:4},'take_loan'),
    a('risky','High-Risk Investment','🎲','A speculative bet. High upside; real downside.',1,'risky',1,{},{finance:7},'risky_invest',{cash:500})
  ]},
  {id:'health', label:'HEALTH', emoji:'❤️', color:C.coral, tag:'Your body is the foundation.', items:[
    a('exercise','Exercise Consistently','🏃','Regular movement with long-term benefits.',1,'exercise',4,{health:17,stress:-15,happiness:8,cash:-80},{fitness:11}),
    a('rest','Rest & Recover','💤','Real rest. A deliberate reset.',1,'rest',2,{stress:-30,happiness:15,health:8},{},'rest_recovery'),
    a('diet','Fix Your Diet','🥗','Intentional nutrition and better energy.',1,'diet',2,{health:13,happiness:5,cash:-150},{fitness:8}),
    a('mental','Mental Health Work','🧘','Therapy, journalling, or honest processing.',1,'mental',2,{stress:-22,happiness:15,cash:-200,relationships:6},{leadership:4}),
    a('rehab','Enter Rehab','🏥','Break the addiction before it defines the story.',2,'rehab',1,{cash:-3000,stress:10,happiness:8},{},'rehab',{addiction:true}),
    a('checkup','Health Checkup','🩺','Get ahead of health problems early.',1,'checkup',1,{cash:-200,stress:-7},{},'checkup')
  ]},
  {id:'life', label:'LIFE', emoji:'🌴', color:C.violet, tag:'Culture, family, relationships, and community.', items:[
    a('lime','Lime with Friends','🤙','Rest with good people. Keep joy alive.',1,'lime',3,{happiness:22,stress:-22,relationships:13,cash:-120},{leadership:4},'rum_risk'),
    a('community','Give Back','🌱','Volunteer, help, and show up consistently.',1,'community',4,{communityStanding:20,happiness:13,integrity:8},{leadership:8}),
    a('festival','Festival / Cultural Season','🎭','Make room for a full cultural reset.',1,'festival',1,{happiness:28,stress:-20,relationships:15,cash:-700},{creative:7},'rum_risk'),
    a('family_time','Family Time','👨‍👩‍👧','Protect the people who matter.',1,'family_time',3,{happiness:18,relationships:22,stress:-11},{},'family_time'),
    a('faith','Faith & Community','⛪','Grounding, service, and a healthier rhythm.',1,'faith',3,{communityStanding:13,happiness:16,stress:-11},{leadership:5}),
    a('love','Make Space for Love','💕','Meet someone new or invest in your relationship.',1,'love',2,{happiness:10,relationships:8},{},'love',{age:22,romance:true}),
    a('child','Plan for a Child','🧒','Choose parenthood deliberately, not repeatedly in one year.',1,'child',1,{happiness:13,stress:8,relationships:9},{},'have_child',{partner:true,age:20,noChildThisYear:true})
  ]},
  {id:'damian', label:'DAMIAN', emoji:'👀', color:C.violet, tag:'A rival, ally, or chapter you close.', items:[
    a('damian_contact','Reach Out to Damian','📱','Check in without making comparison your identity.',0,'damian_contact',1,{relationships:5},{},'damian_contact'),
    a('damian_compete','Compete Directly','⚔️','Go head-to-head in business or career.',1,'damian_compete',1,{stress:12,workEthic:10},{leadership:6},'damian_compete'),
    a('damian_partner','Build Together','🤝','Turn mutual respect into a business collaboration.',2,'damian_partner',1,{stress:16,happiness:14},{leadership:10},'damian_partner',{damian:'ally'}),
    a('damian_help','Ask Damian for Help','🙏','Use the relationship only when it is real.',1,'damian_help',1,{},{},'damian_help',{damianAny:['ally','partner']}),
    a('damian_cutoff','Cut Ties Completely','🚪','Close a relationship that only pulls you backwards.',1,'damian_cutoff',1,{stress:-8,relationships:-10},{},'damian_cutoff')
  ]}
];

export const BUSINESS_ACTIONS = [
  a('hire','Hire Employee','👤','Build systems so the business depends less on you.',1,'hire',2,{cash:-800,stress:-13,happiness:5},{leadership:7},'grow_business'),
  a('marketing','Marketing Push','📣','Spend to get attention and customers.',1,'marketing',2,{cash:-600,communityStanding:10},{leadership:5},'market_business'),
  a('quality','Improve Quality','⭐','Raise standards and customer trust.',1,'quality',2,{cash:-300,integrity:8},{leadership:5},'quality_business'),
  a('business_finance','Systemise Business Finance','🧾','Track revenue, costs, and cash flow properly.',1,'business_finance',1,{stress:-6},{finance:10},'systemise_business')
];

export const PROPERTY_ACTIONS = [
  a('renovate','Renovate Property','🔧','Invest in condition and long-term value.',1,'renovate',1,{cash:-2000,happiness:8},{trade:8},'renovate_property',{cash:2000}),
  a('sell_property','Sell Property','💸','Cash out one property and clear its share of mortgage.',1,'sell_property',1,{stress:-8},{finance:6},'sell_property',{property:true})
];

export const CONTEXT_EVENTS = [
  {id:'catering', tags:['study_cooking','cook_sell'], min:2, title:'Someone Noticed Your Cooking', icon:'🍱', category:'OPPORTUNITY', accent:C.orange,
   story:'A local organiser wants you to cater a 60-person corporate function. It is the first opportunity that feels bigger than a weekend hustle.',
   tip:'Catering usually has higher margins than ordinary day-to-day food sales when costs are planned before the event.',
   choices:[
    {label:'✅ Take the catering job', result:'You delivered well. Three people asked for your contact before the room emptied.', changes:{cash:1400,happiness:12,stress:8,communityStanding:8}},
    {label:'⏳ Not ready yet', result:'You chose preparation over ego. The foundation is still building.', changes:{stress:-5,intelligence:5}}
   ]},
  {id:'tech_client', tags:['study_tech','freelance'], min:2, title:'Your First Serious Tech Client', icon:'💻', category:'OPPORTUNITY', accent:C.turquoise,
   story:'A business owner in your network needs a website and inventory system. The contract is real, the expectations are higher, and the referral is warm.',
   tip:'Warm referrals typically convert more easily than cold outreach, but they also depend on a strong delivery reputation.',
   choices:[
    {label:'✅ Take the contract', result:'You delivered in six weeks. Paid in full, with three referrals attached.', changes:{cash:1800,intelligence:8,stress:10,relationships:8}},
    {label:'💰 Negotiate properly', result:'You asked for more, explained the scope, and landed a better number without losing trust.', changes:{cash:2100,intelligence:8,stress:8,relationships:6}}
   ]},
  {id:'family_call', tags:['overdeliver'], min:2, title:'The Call You Missed', icon:'📞', category:'FAMILY', accent:C.pink,
   story:'Your family has noticed how often work comes first. Nothing exploded, but the distance is becoming real.',
   tip:'Relationships are usually repaired in ordinary repeated moments, not only during crisis.',
   choices:[
    {label:'💝 Take a weekend for family', result:'You were present. Something that had begun to fray was repaired.', changes:{happiness:18,relationships:22,stress:-14,cash:-100}},
    {label:'📞 Build a weekly call habit', result:'A simple recurring promise made the distance smaller.', changes:{relationships:12,happiness:8}},
    {label:'💼 Keep pushing', result:'You chose output over connection. The cost was quiet, but it was real.', changes:{relationships:-12,happiness:-10,stress:6}}
   ]},
  {id:'promotion', tags:['overdeliver','upskill','network'], min:3, title:'Promotion Came Through', icon:'📈', category:'CAREER', accent:C.green,
   story:'The extra work was noticed. A senior position, more responsibility, and an increase in income are on the table.',
   tip:'The strongest promotion cases are usually built before the formal title is offered.',
   choices:[
    {label:'✅ Accept the promotion', result:'The role became official. The next level of work has started.', changes:{happiness:20,stress:12}, special:'career_level'},
    {label:'🤝 Negotiate first', result:'You asked clearly and earned a stronger starting package.', changes:{cash:1200,happiness:22,stress:10}, special:'career_level'}
   ]},
  {id:'grant', tags:['start_business','community'], min:2, title:'Government Grant — You Qualify', icon:'🏛️', category:'OPPORTUNITY', accent:C.green,
   req:{business:true}, story:'A community development grant programme opened. Your business now qualifies, but the paperwork needs to be done properly.',
   tip:'Small business grants are competitive, but organised documentation is often the real barrier.',
   choices:[
    {label:'📋 Do the full application', result:'The application was approved. A non-repayable grant landed with a letter of recognition.', changes:{cash:4500,communityStanding:14,intelligence:8,happiness:12,stress:5}},
    {label:'🤝 Pay for help with it', result:'You paid for solid documentation and still came out ahead.', changes:{cash:4100,communityStanding:10,happiness:10}}
   ]},
  {id:'property_repair', tags:['buy_property','renovate'], min:1, title:'Property Maintenance Surprise', icon:'🔧', category:'PROPERTY', accent:C.teal,
   req:{property:true}, story:'A repair issue surfaced before it became a disaster. You can patch it cheaply, fix it properly, or delay the problem.',
   tip:'Property ownership rewards reserves. Maintenance is not optional; only the timing is.',
   choices:[
    {label:'✅ Fix it properly', result:'The repair was done. Your property held its value and your stress came down.', changes:{cash:-1200,stress:-8}, special:'property_value_up'},
    {label:'🩹 Patch it for now', result:'The immediate cost stayed low, but the underlying issue did not disappear.', changes:{cash:-350,stress:5}},
    {label:'🙈 Ignore it', result:'It became more expensive later, exactly as the contractor warned.', changes:{cash:-1800,stress:16,propertyValue:-1200}}
   ]},
  {id:'child_school', tags:['family_time'], min:1, title:'Your Child Needs Support', icon:'🎒', category:'FAMILY', accent:C.gold,
   req:{children:1}, story:'A teacher flagged that one of your children could benefit from more support and time at home. It is manageable now, but not if it is ignored.',
   tip:'Small, consistent parental support often matters more than one large intervention later.',
   choices:[
    {label:'📚 Make room and get help', result:'You reorganised the week and put real support around your child.', changes:{cash:-450,relationships:16,happiness:10,stress:5}},
    {label:'💬 Talk with the teacher and plan', result:'You built a practical plan before the issue became bigger.', changes:{relationships:10,intelligence:5}},
    {label:'💼 Keep the current pace', result:'The issue was not solved. The distance at home became easier to feel.', changes:{relationships:-14,stress:8}}
   ]},
  {id:'recovery', tags:['lime','festival'], min:1, title:'The Pattern Is Getting Louder', icon:'🕊️', category:'HEALTH', accent:C.orange,
   req:{addiction:true}, story:'Friends are beginning to notice the habits you keep explaining away. There is still time to interrupt the pattern.',
   tip:'Recovery is stronger when it is concrete: support, boundaries, treatment, and a changed routine.',
   choices:[
    {label:'🧭 Ask for help now', result:'You told the truth to someone safe and created an actual plan.', changes:{happiness:12,stress:-15}, special:'recovery_step'},
    {label:'😶 Keep it private', result:'You said you had it under control. The next few months tested that claim.', changes:{stress:8}, special:'addiction_up'}
   ]},
  {id:'creator_viral', tags:['post_content','develop_creative'], min:2, title:'Your Content Starts Moving', icon:'📲', category:'CREATOR', accent:C.violet,
   story:'One piece of content connected. The comments are different now: people are sharing it, asking questions, and following the story.',
   tip:'A viral moment is an opportunity, not a business model. Consistency decides whether it becomes a platform.',
   choices:[
    {label:'🎥 Build a content system', result:'You turned attention into a repeatable routine instead of chasing one moment.', changes:{stress:8,creative:8}, fame:8000},
    {label:'💰 Take a quick sponsored post', result:'You earned from the moment, but some followers felt the fit was rushed.', changes:{cash:1800,integrity:-4}, fame:3000}
   ]},

// ─── FROM FRIENDS ────────────────────────────────────────────────────────────
{id:'friend_loan', tags:['lime','family_time','festival'], min:1, sev:'DRAMA',
 title:'Your Friend Needs Money', icon:'📱', category:'FRIENDS', accent:C.pink,
 story:'A close friend calls on a Wednesday night. He is short on rent and has never asked before. Something in his voice says this is real. He says he will pay it back.',
 tip:'Lending money to a friend changes the dynamic of the friendship regardless of whether it gets repaid. Decide what the friendship is worth before deciding about the money.',
 choices:[
  {label:'💰 Lend the full amount', result:'You sent it that night. He paid back most of it after three months. The remaining balance became an unspoken thing. The friendship survived but changed.', changes:{cash:-1800,relationships:12,happiness:6,integrity:8}},
  {label:'💸 Give half — no expectation of repayment', result:'You gave $900 and told him not to worry about returning it. The friendship stayed clean. He remembered.', changes:{cash:-900,relationships:18,happiness:10,integrity:12}},
  {label:'❌ Cannot do it right now', result:'You declined. He said he understood. These moments always cost something either way.', changes:{stress:6,integrity:-4,relationships:-8}}
 ]},

{id:'friend_biz', tags:['network','market_stall','cook_sell','freelance'], min:1, sev:'PROFIT',
 title:'Old School Friend Has a Pitch', icon:'💡', category:'FRIENDS', accent:C.green,
 story:'Someone from secondary school, out of contact for years, calls with a business pitch. He has a growing food and events operation and wants you as a partner. The pitch is solid. The trust question is real.',
 tip:'Business partnerships are legal marriages. The trust, the terms, and the exit strategy all need to be clear before you say yes.',
 choices:[
  {label:'🤝 Jump in — take the stake', result:'You joined. The first three months were rough. By month six, revenue started moving. This might be the one.', changes:{cash:-1500,happiness:16,stress:14,communityStanding:8,intelligence:6}},
  {label:'🔍 Ask to see the financials first', result:'You requested a formal review before committing. He was slightly offended. The numbers were actually solid. You joined on better terms.', changes:{intelligence:10,relationships:5,stress:5}},
  {label:'❌ Not this one', result:'Your instinct said no. You said no. Those instincts exist for a reason.', changes:{integrity:6,stress:-4}}
 ]},

{id:'friend_jealous', tags:['overdeliver','network','promotion'], min:2, sev:'DRAMA',
 title:'The Jealousy Starting to Show', icon:'😤', category:'FRIENDS', accent:C.orange,
 story:'Someone you have known for years made a comment at a gathering that landed differently than a joke. Then another one. Then you heard through someone else what he said when you were not in the room. Success changes friendships.',
 tip:'Not everyone can celebrate your progress. That is their limitation, not yours. Distance from negativity is not abandonment — it is self-preservation.',
 choices:[
  {label:'🗣️ Address it directly', result:'Uncomfortable conversation. He half-admitted it. The friendship reset to something more honest.', changes:{relationships:6,stress:-8,integrity:8}},
  {label:'😌 Pull back quietly and keep building', result:'You said nothing. The relationship faded. You freed up mental space you did not know was being used.', changes:{stress:-10,happiness:6,communityStanding:4}},
  {label:'🤝 Bring him into something you are working on', result:'Jealousy often comes from feeling left behind. You included him. He responded well.', changes:{relationships:14,communityStanding:8,stress:5}}
 ]},

{id:'friend_trouble', tags:['lime','perform','festival'], min:1, sev:'DANGER',
 title:'Your Friend Is in Serious Legal Trouble', icon:'🚨', category:'FRIENDS', accent:C.coral,
 story:'A call at 11pm. A friend you grew up with is in a legal situation and asking you to vouch for him, speak to his character, and provide an alibi for a night you remember differently. Loyalty is real. So are perjury charges.',
 tip:'Standing by a friend and becoming part of their legal problem are different things. Know which one is actually being asked of you.',
 choices:[
  {label:'⚖️ Tell only the truth — no fabrication', result:'You gave an honest character reference. You told them what you actually knew. Your friend was disappointed. Your integrity stayed intact.', changes:{integrity:20,relationships:-10,stress:15,communityStanding:8}},
  {label:'🤐 Stay completely out of it', result:'You told him you could not be involved. He called you a coward. The friendship ended that night.', changes:{integrity:8,relationships:-18,stress:10,happiness:-8}},
  {label:'🙏 Full support — whatever he needs', result:'You stepped in completely. The situation resolved this time. But you are in that world now whether you chose to be or not.', changes:{integrity:-22,relationships:14,stress:22,communityStanding:-12}}
 ]},

// ─── FROM CO-WORKERS ─────────────────────────────────────────────────────────
{id:'cowork_rumor', tags:['overdeliver','upskill','promotion'], min:2, sev:'DANGER',
 title:'A Rumour Is Spreading at Work', icon:'👥', category:'WORKPLACE', accent:C.coral,
 story:'Someone at the office is telling a version of events that makes you look bad. You do not know exactly who. But the whisper is moving — you can feel it in the room temperature, in how a manager looked at you this week.',
 tip:'Workplace reputations move faster than corrections. Address it early and directly rather than hoping it fades on its own.',
 choices:[
  {label:'🗣️ Find the source and address it', result:'It took two difficult conversations. The spreading stopped. Your directness got noticed by the right people.', changes:{stress:10,relationships:8,integrity:10,intelligence:6}},
  {label:'📈 Out-perform it — let the work speak', result:'You raised your output and visibility. Within a month the narrative shifted. Actions are louder than denials.', changes:{workEthic:8,stress:8,relationships:5,intelligence:5}},
  {label:'💼 Start quietly looking for another role', result:'You made the assessment that this environment was no longer safe and began preparing an exit.', changes:{stress:12,intelligence:8,relationships:-5,happiness:5}}
 ]},

{id:'boss_meeting', tags:['overdeliver','upskill','promotion'], min:1, sev:'DRAMA',
 title:'The Boss Wants to See You — No Agenda', icon:'🚪', category:'WORKPLACE', accent:C.gold,
 story:'The calendar invite came with no title and came from the boss directly. The meeting is in 20 minutes. You do not know if this is the best or worst news of your working year.',
 tip:'The difference between a promotion conversation and a performance conversation is usually the preparation you did in the weeks before.',
 choices:[
  {label:'👔 Walk in knowing your value', result:'It was a promotion conversation. You were ready. You negotiated well. It landed.', changes:{cash:2400,happiness:18,stress:-5,communityStanding:6}, special:'career_level'},
  {label:'😰 Walk in and improvise', result:'It was a feedback conversation. You were not ready. You recovered but left points on the table.', changes:{stress:12,intelligence:8,happiness:-5}}
 ]},

{id:'cowork_steal', tags:['overdeliver','upskill'], min:2, sev:'DANGER',
 title:'A Colleague Took Credit for Your Work', icon:'😤', category:'WORKPLACE', accent:C.coral,
 story:'The presentation happened. The praise went to someone else. A colleague presented work built significantly on your analysis and your late nights and took the standing ovation while you watched from the third row.',
 tip:'How you handle this moment will define your professional reputation more than the work itself did.',
 choices:[
  {label:'🗣️ Speak up — document your contribution', result:'You raised it professionally with evidence. It was uncomfortable for everyone. The record was corrected.', changes:{stress:14,integrity:16,relationships:5,intelligence:6}},
  {label:'😌 Let it go — protect the peace', result:'You swallowed it. You started documenting everything from this point forward. Lesson learned.', changes:{stress:6,integrity:-6,happiness:-8,intelligence:8}},
  {label:'📝 Start building your own visible path', result:'This was the moment you decided the answer was not in that building. You started your exit strategy.', changes:{stress:8,intelligence:10,happiness:5}}
 ]},

{id:'cowork_collab', tags:['network','freelance','study_tech','develop_creative'], min:1, sev:'PROFIT',
 title:'Colleague Wants to Go Freelance Together', icon:'💼', category:'WORKPLACE', accent:C.green,
 story:'One of the sharpest people in your department is leaving and wants you to come with her — not to join another company, but to start something. She has the client pipeline. You have the skills. You have a week to decide.',
 tip:'The right partner at the right time can compress ten years of solo building into three. The wrong one can compress your savings just as fast.',
 choices:[
  {label:'🚀 Go — this is the window', result:'You resigned on Friday. By Monday you were building. The first six months were terrifying and exact.', changes:{cash:-1000,happiness:20,stress:18,intelligence:10,communityStanding:8}},
  {label:'🔍 Negotiate your terms before you commit', result:'You stayed two more months, sorted your finances, and joined on terms that protected you.', changes:{intelligence:12,stress:5,cash:-500,happiness:12}},
  {label:'❌ Not ready to leave stable income', result:'You declined. She understood. The opportunity passed. You watched what she built from inside the office.', changes:{stress:-6,happiness:-8,intelligence:5}}
 ]},

{id:'salary_truth', tags:['network','overdeliver'], min:1, sev:'DRAMA',
 title:'You Found Out What Colleagues Earn', icon:'💰', category:'WORKPLACE', accent:C.orange,
 story:'Someone left a payslip on the printer. Or the conversation happened at an after-work drink when people were honest for once. Either way — you know what three colleagues earn. One of them does the same work as you and earns $800 more per month.',
 tip:'Knowing your market value is not being greedy. It is basic financial literacy. The negotiation conversation is overdue.',
 choices:[
  {label:'💼 Book a meeting and renegotiate now', result:'You walked in with data, market benchmarks, and a clear ask. They came up $600. Not everything but real money.', changes:{cash:600,stress:8,happiness:12,intelligence:8}},
  {label:'🔍 Research the full market first', result:'You spent two months building a comparison case. When you went in you had numbers they could not argue with.', changes:{intelligence:12,stress:5,cash:900}},
  {label:'😤 Start looking for a better-paying role', result:'You started the job search. Within three months you had an offer that made the current salary look like tuition.', changes:{intelligence:8,stress:12,happiness:5}}
 ]},

// ─── FROM STRANGERS ───────────────────────────────────────────────────────────
{id:'stranger_pitch', tags:['lime','network','festival'], min:1, sev:'DRAMA',
 title:'A Stranger at a Party Has a Pitch', icon:'🤔', category:'STRANGER', accent:C.turquoise,
 story:'You did not plan to have a business conversation tonight. But this man — confident, well-dressed, knows everyone in the room — has been explaining an investment opportunity for twenty minutes. The numbers sound good. The urgency is suspicious.',
 tip:'If someone is pitching you urgently and personally at a social event, that urgency is almost always manufactured. Real opportunities do not expire at midnight.',
 choices:[
  {label:'🔍 Ask for formal documentation — meet properly', result:'He followed up. The documents were real but the returns were overstated. You invested modestly with eyes open.', changes:{intelligence:10,cash:-500,stress:5}},
  {label:'💰 Trust your gut — commit tonight', result:'You put in $2,000. The venture was legitimate but underperformed. $800 came back six months later.', changes:{cash:-1200,intelligence:8,stress:8}},
  {label:'🚶 Walk away — the energy is wrong', result:'You politely excused yourself. Two people at that party lost significant money. Your instinct was right.', changes:{intelligence:8,integrity:6,stress:-5}}
 ]},

{id:'chance_encounter', tags:['network','community','festival'], min:1, sev:'PROFIT',
 title:'A Chance Encounter That Changes Things', icon:'✨', category:'STRANGER', accent:C.gold,
 story:'You were in the wrong queue, took the wrong seat, or ran into traffic and stopped for coffee — and ended up in a two-hour conversation with someone who runs exactly the operation you have been trying to get access to.',
 tip:'The Caribbean professional network operates through personal trust more than formal channels. One genuine conversation with the right person is worth a hundred cold emails.',
 choices:[
  {label:'📱 Follow up the next morning', result:'You sent a message at 9am. Meeting confirmed by 11am. The door opened.', changes:{relationships:18,communityStanding:12,happiness:14,intelligence:8,cash:1000}},
  {label:'⏳ Wait a few days — do not seem eager', result:'You waited four days. They had moved on. You got a brief call and a generic referral.', changes:{relationships:6,intelligence:5}}
 ]},

{id:'witness', tags:['lime','community','faith'], min:1, sev:'DANGER',
 title:'You Saw Something You Were Not Meant to See', icon:'👁️', category:'STRANGER', accent:C.coral,
 story:'Coming back from an errand, you witnessed something that was clearly not meant for your eyes — involving people who have reach in this community. No one saw you see it. But you are standing here now, knowing what you know.',
 tip:'On a small island, silence and speech both carry consequences. The question is which ones you can live with.',
 choices:[
  {label:'🚶 Say nothing — you saw nothing', result:'You kept walking. You kept your mouth closed. The weight of that is yours to carry. The safety is also yours.', changes:{integrity:-8,stress:14,happiness:-8}},
  {label:'⚖️ Report it to the right authority', result:'You filed a report. It was taken seriously. It cost you stress and temporary vulnerability. Your conscience stayed clean.', changes:{integrity:20,stress:20,communityStanding:14,happiness:5}},
  {label:'🤐 Tell one trusted person only', result:'You told someone you trust completely. The weight became lighter. The secret stayed contained.', changes:{stress:-6,integrity:-3,relationships:8}}
 ]},

{id:'street_help', tags:['community','faith','family_time'], min:1, sev:'DRAMA',
 title:'Someone Needs Help Right in Front of You', icon:'🙏', category:'STRANGER', accent:C.teal,
 story:'An elderly woman struggling at the bus stop. A man who fainted on a street corner. A young mother counting coins at a shop counter short of her total. Small moments. Real people. The kind you can choose to walk past or stop for.',
 choices:[
  {label:'🤝 Stop — help without hesitation', result:'You stopped. Five minutes of your life that meant everything to someone else. The island saw it. You felt it.', changes:{communityStanding:14,happiness:16,integrity:10}},
  {label:'😌 You are in a rush right now', result:'You kept moving and have thought about it since. These small moments accumulate into who you actually are.', changes:{integrity:-5,stress:3}}
 ]},

{id:'overhear', tags:['network','market_stall','lime'], min:1, sev:'PROFIT',
 title:'You Overheard Something Valuable', icon:'👂', category:'STRANGER', accent:C.green,
 story:'Two people at the next table were talking freely about a business deal — a contract coming, a vendor slot opening, an investment round. Information that could benefit you directly if you act on it correctly.',
 tip:'Information is the Caribbean business advantage. What you do with it is as much a character test as a financial one.',
 choices:[
  {label:'📱 Act on it immediately', result:'You made a move based on what you heard. It landed. The timing was everything.', changes:{cash:1800,happiness:12,intelligence:8,stress:6}},
  {label:'🤔 Verify first then act', result:'Two days confirming before moving. Slightly less upside, significantly less risk.', changes:{cash:1000,intelligence:10,stress:4}},
  {label:'🤐 Leave it — not yours to act on', result:'You left it alone. Clean conscience. No upside. The choice you can live with.', changes:{integrity:8,stress:-3}}
 ]},

// ─── DANGER SCENARIOS ─────────────────────────────────────────────────────────
{id:'break_in', tags:['buy_property','start_business','market_stall'], min:1, sev:'DANGER',
 title:'Your Property Was Targeted', icon:'🚨', category:'DANGER', accent:C.coral,
 story:'You got the call at 6:47 in the morning. Someone broke into your car or the business overnight and took equipment. The lock is broken. The window is gone. The police report is filed. Whether you have insurance is the question of the next 48 hours.',
 tip:'Business insurance and contents insurance exist for exactly this moment. If this is the first time you are thinking about it, it is the right time to act.',
 choices:[
  {label:'🔒 Upgrade security and get proper insurance', result:'You spent money but closed the vulnerability. Better physical security and a proper insurance policy now exist.', changes:{cash:-1200,stress:15,happiness:-5,intelligence:8}},
  {label:'📋 File the insurance claim', result:'Insurance covered most of the loss. The process was slow. But you were covered.', changes:{cash:-400,stress:10}},
  {label:'💸 Absorb the loss and get back to work', result:'You cleaned up and kept moving. The loss stings. The resilience is real.', changes:{cash:-2200,stress:12,workEthic:8,happiness:-8}}
 ]},

{id:'extortion', tags:['start_business','market_stall','overdeliver'], min:1, sev:'DANGER',
 title:'Someone Is Trying to Shake You Down', icon:'⚠️', category:'DANGER', accent:C.coral,
 story:'A man came to the business. He was polite in the way people who are not polite are polite when they want something. He mentioned a figure. He mentioned a name. He said he would come back Friday. You did not agree to anything.',
 tip:'Extortion thrives on silence. Paying once confirms that the leverage works and guarantees a return visit.',
 choices:[
  {label:'👮 Report it immediately', result:'You went to the police before Friday. The situation was handled. The courage to report it was noted in this community.', changes:{stress:20,integrity:22,communityStanding:14,happiness:5}},
  {label:'💰 Pay — make it go away', result:'You paid. He came back two months later with a higher figure. The first payment was the worst decision.', changes:{cash:-2000,integrity:-20,stress:15,communityStanding:-8}},
  {label:'🤝 Mobilise your community network', result:'You made calls. The right people knew. The man never came back. The community closed around you.', changes:{communityStanding:22,relationships:14,integrity:12,stress:8}}
 ]},

{id:'false_accusation', tags:['overdeliver','network','promotion','start_business'], min:2, sev:'DANGER',
 title:'You Are Being Falsely Accused', icon:'💔', category:'DANGER', accent:C.coral,
 story:'A complaint was filed about your conduct. It is not true. The institution taking the complaint seriously is doing its job. You understand that. What you do not understand is how to defend yourself against something that is not real.',
 tip:'Documentation is your only defence in formal processes. Every claim needs a paper trail on both sides.',
 choices:[
  {label:'⚖️ Get a lawyer — this is serious', result:'Legal representation changed the dynamic immediately. The process was slow and expensive. The outcome was clean.', changes:{cash:-2500,stress:18,integrity:14,intelligence:8}},
  {label:'📝 Document everything and fight it yourself', result:'Three weeks of comprehensive evidence-building. Exhausting. It worked.', changes:{stress:22,intelligence:12,integrity:12,happiness:-10}},
  {label:'🤐 Stay quiet and let it resolve', result:'You said nothing. The process ran without your input. The resolution was messy and partial.', changes:{stress:15,integrity:-8,happiness:-12,communityStanding:-8}}
 ]},

{id:'health_warning', tags:['overdeliver','upskill','network'], min:2, sev:'DANGER',
 title:'Your Body Is Sending Warnings', icon:'💔', category:'HEALTH', accent:C.coral,
 story:'Third week in a row waking up tired after eight hours. Headaches are regular now. Your right arm went numb during a meeting for about forty seconds. You laughed it off but it shook you. You have been here before and ignored it.',
 tip:'Caribbean men have among the highest rates of undiagnosed hypertension in the world. The symptom before the crisis is the one that matters.',
 choices:[
  {label:'🏥 Book the doctor — today', result:'Hypertension caught early. Medication started. Lifestyle changes made. This was the best decision you made all year.', changes:{health:22,stress:-12,cash:-400,happiness:10}},
  {label:'💊 Buy something from the pharmacy', result:'You self-medicated and made some changes. Better than nothing. Not better than an actual checkup.', changes:{health:8,cash:-80,stress:-5}},
  {label:'😌 It will pass', result:'It did not pass. It is going to ask you properly in six months.', changes:{health:-12,stress:8,happiness:-6}}
 ]},

{id:'car_accident', tags:['lime','festival','network'], min:1, sev:'DRAMA',
 title:'A Collision on the Way Home', icon:'🚗', category:'DANGER', accent:C.orange,
 story:'Coming home from an event — a fender bender at a junction. The other driver is already on the phone. Whether you are at fault or not, you are about to spend the next two hours standing on a roadside sorting out what happens next.',
 tip:'Third-party vehicle insurance is the legal minimum but comprehensive cover is the financial minimum that makes sense.',
 choices:[
  {label:'📋 Handle it properly — police report and insurance', result:'Took three hours. Cost some money. The documentation protected you. Everything resolved cleanly.', changes:{cash:-600,stress:14,intelligence:6}},
  {label:'💰 Settle it privately right now', result:'You agreed a number on the spot and both moved on. Faster. Less certain.', changes:{cash:-800,stress:6}},
  {label:'🚗 Drive off — no one was badly hurt', result:'You left. The other driver had your plate. The situation came back more expensively than it needed to.', changes:{cash:-1400,integrity:-14,stress:18}}
 ]},

// ─── PROFIT SCENARIOS ─────────────────────────────────────────────────────────
{id:'international_contract', tags:['study_tech','freelance','network','develop_creative'], min:2, sev:'PROFIT',
 title:'Work Offer From Off-Island', icon:'🌍', category:'OPPORTUNITY', accent:C.gold,
 story:'An email arrived Tuesday morning from a company in Miami. They found your work through a referral and want you for a three-month contract. The rate is four times what you earn locally. The work is fully remote. You would not have to leave.',
 tip:'Caribbean freelancers consistently underprice compared to North American and European markets. The international rate for your skills is not a ceiling — it is a floor.',
 choices:[
  {label:'✅ Accept — this is why you built these skills', result:'Contract signed. The rate hit your account in a different currency for the first time. Your relationship with money changed.', changes:{cash:8000,happiness:22,stress:10,intelligence:8,communityStanding:10}},
  {label:'💰 Negotiate the rate before you accept', result:'You pushed for 20% more and got 15%. First international contract and you already negotiated it upward.', changes:{cash:9200,happiness:24,stress:10,intelligence:10}}
 ]},

{id:'investment_return', tags:['invest','save','risky'], min:1, sev:'PROFIT',
 title:'An Investment Paid Off Significantly', icon:'📈', category:'FINANCE', accent:C.gold,
 story:'The position you took moved. Not a little. A lot. The return came in and you had to check the number three times. This is what patient investment looks like when the market works.',
 tip:'This moment is a test. The worst thing most people do when an investment wins is spend the return immediately. Reinvest at least 70%.',
 choices:[
  {label:'📈 Reinvest 70% — let it compound', result:'You took 30% to enjoy and put 70% back to work. The discipline here is the whole game.', changes:{cash:5500,happiness:18,intelligence:10,stress:-8}},
  {label:'🎉 Enjoy it — you earned this', result:'You celebrated. The money went on things that mattered. The lesson about reinvesting arrived the following year.', changes:{cash:2000,happiness:26,relationships:10,stress:-12}}
 ]},

{id:'inheritance', tags:['family_time','faith'], min:1, sev:'PROFIT',
 title:'An Unexpected Inheritance', icon:'📜', category:'FAMILY', accent:C.gold,
 story:'A distant relative passed away. The call came from a lawyer. They left you something real — not a fortune, but meaningful cash and a piece of land that has been in the family for decades. You did not expect this.',
 tip:'Inherited wealth has a high destruction rate within one generation. What you do with it is as important as receiving it.',
 choices:[
  {label:'🏦 Bank the cash — hold the land', result:'You kept both and let time pass before deciding. Patience with unexpected windfalls is itself a strategy.', changes:{cash:6000,happiness:14,intelligence:8,stress:-5}},
  {label:'💸 Sell everything — take the liquidity', result:'Liquid is flexible. You took the cash and invested it directly.', changes:{cash:9000,happiness:12,stress:-5}}
 ]},

{id:'gov_grant', tags:['start_business','community','market_stall'], min:1, sev:'PROFIT',
 title:'Government Grant — You Qualify', icon:'🏛️', category:'OPPORTUNITY', accent:C.green,
 req:{business:true},
 story:'A community development grant programme opened. Your business qualifies on every criterion. The grant is $4,500 — non-repayable. The application requires documentation, a business plan summary, and a community impact statement.',
 tip:'Caribbean governments have active small business support programmes that most eligible entrepreneurs never access because they do not know they exist.',
 choices:[
  {label:'📋 Apply properly — do the full work', result:'Application submitted. Six weeks. Grant approved. The recognition letter came with the cash.', changes:{cash:4500,communityStanding:14,intelligence:8,happiness:12,stress:5}},
  {label:'🤝 Pay someone to help with the application', result:'You paid $400 for solid documentation and still came out ahead by $4,100.', changes:{cash:4100,communityStanding:10,happiness:10}}
 ]},

{id:'buyout_offer', tags:['start_business','market_stall'], min:1, sev:'PROFIT',
 title:'Someone Wants to Buy Your Business', icon:'🤝', category:'BUSINESS', accent:C.gold,
 req:{business:true},
 story:'A larger operation has been watching what you built. They reached out through a mutual contact with a number attached. The offer is meaningful. Selling means liquidity and freedom. Not selling means staying in the fight.',
 tip:'The first offer is rarely the best offer. Get a second opinion from someone with no stake in the outcome before you respond.',
 choices:[
  {label:'💰 Negotiate hard — counter higher', result:'You pushed aggressively. They came back at 70% of your counter. A significant exit.', changes:{cash:18000,happiness:20,stress:-10}},
  {label:'❌ Not selling — this is long term', result:'You declined. The offer validated everything you were building. The motivation jumped.', changes:{happiness:14,workEthic:10,stress:5,communityStanding:8}},
  {label:'🤔 Get a proper valuation first', result:'The professional valuator put the number 40% higher than their opening offer. New negotiation started from a better position.', changes:{cash:22000,intelligence:10,stress:8,happiness:18}}
 ]},

// ─── COMMUNITY / CULTURE ──────────────────────────────────────────────────────
{id:'cricket', tags:['lime','family_time','festival','faith'], min:1, sev:'DRAMA',
 title:'West Indies Playing Tonight', icon:'🏏', category:'CULTURE', accent:C.green,
 story:'West Indies are playing tonight. Your phone is buzzing with the group chat. Work is still on the desk. Somehow this has become a real decision that touches family, community, and personal joy all at once.',
 choices:[
  {label:'🏏 Watch it with the family', result:'Three hours together. The match was close. The conversation around it was better. These are the evenings people remember.', changes:{happiness:22,relationships:18,stress:-16,cash:-50}},
  {label:'📱 Follow the score while working', result:'Half present at everything is the same as fully present at nothing.', changes:{workEthic:5,stress:5,relationships:-6,happiness:-8}},
  {label:'🌙 Skip it — bigger priorities right now', result:'You focused. The family watched without you. Some things cannot be replayed.', changes:{stress:3,relationships:-10,happiness:-5}}
 ]},

{id:'rum_shop_intelligence', tags:['lime','community','festival'], min:1, sev:'DRAMA',
 title:'The Rum Shop Has Opinions', icon:'🍺', category:'COMMUNITY', accent:C.orange,
 story:'Friday evening. The fellas at the rum shop have done a full analysis of your life choices this year — including yours. Damian came up. A business opportunity you did not know about came up. The conversation is lively, loud, and genuinely useful.',
 tip:'Caribbean rum shop culture is a real social institution. Community intelligence, business leads, and life advice in the same glass. Not everything said there is wrong.',
 choices:[
  {label:'🍺 Pull up a chair — hear them out', result:'Two hours, two drinks, and four pieces of actually useful local intelligence. The community knows things no LinkedIn can find.', changes:{happiness:20,relationships:16,stress:-16,cash:-80,communityStanding:10}},
  {label:'😄 Big up them and keep moving', result:'You acknowledged the circle and kept your evening. They will be back next Friday with fresh opinions. You with fresh results.', changes:{happiness:8,stress:-5,communityStanding:4}}
 ]},

{id:'miss_gloria', tags:['community','faith','pardner'], min:2, sev:'DRAMA',
 title:'Miss Gloria Has a Word', icon:'⛪', category:'COMMUNITY', accent:C.violet,
 story:'Miss Gloria pulls you aside after service. She has been watching you build this year and she says: I see you. Do not stop. Then she adds something practical — an introduction to someone you needed to meet.',
 tip:'Caribbean community mentorship often comes from unexpected sources. The wisdom is real. The network that comes with it is older than most institutions.',
 choices:[
  {label:'🙏 Sit with her — hear everything', result:'An hour. Real wisdom. Three introductions to people who matter. Miss Gloria\'s network is the original professional platform.', changes:{communityStanding:20,relationships:18,happiness:16,intelligence:8,stress:-10}},
  {label:'😊 Thank her warmly and continue your day', result:'Brief and genuine. The blessing still came. The network stayed open.', changes:{communityStanding:10,happiness:10,relationships:8}}
 ]}

];

export const RANDOM_LIFE_EVENTS = [
  {
    id:'carnival_band_call', islands:['trinidad'], minAge:18, sev:'CULTURE',
    title:'Carnival Band Call', icon:'🎭', category:'CULTURE', accent:C.orange,
    story:'A band leader calls two weeks before Carnival. A section needs help with costume pickup, content, and keeping people calm on the road. It could be fun, messy, visible, and exhausting.',
    tip:'Carnival can be joy, business, reputation, and stress in the same weekend.',
    choices:[
      {label:'Build the section properly', result:'The road was chaos, but you handled it. People remembered your face, your energy, and your reliability.', changes:{cash:900,happiness:22,creative:8,communityStanding:12,stress:10,fame:900}},
      {label:'Work the food and cooler lane', result:'You skipped the spotlight and made the weekend pay. Small profit, strong contacts, tired feet.', changes:{cash:1500,relationships:8,communityStanding:8,stress:12}},
      {label:'Rest and watch from home', result:'You protected your peace. The timeline was loud, but your body thanked you the next morning.', changes:{health:8,stress:-16,happiness:-3}}
    ]
  },
  {
    id:'crop_over_pop_up', islands:['barbados'], minAge:18, sev:'CULTURE',
    title:'Crop Over Pop-Up', icon:'🌾', category:'CULTURE', accent:C.gold,
    story:'Crop Over season opens a small vendor spot near a busy route. It is short notice, high traffic, and everyone is looking for food, drinks, outfits, and a good story.',
    choices:[
      {label:'Run the pop-up', result:'The stall was packed by sunset. The money was good and the brand felt real for the first time.', changes:{cash:1700,communityStanding:10,workEthic:8,stress:12}},
      {label:'Help a friend instead', result:'You made less money, but the friendship got stronger and the season felt lighter.', changes:{cash:550,relationships:16,happiness:12,stress:4}},
      {label:'Just enjoy the season', result:'You spent money, laughed hard, and came back lighter.', changes:{cash:-350,happiness:24,stress:-12,relationships:8}}
    ]
  },
  {
    id:'reggae_sumfest_link', islands:['jamaica'], minAge:18, sev:'FAME',
    title:'Backstage at Sumfest', icon:'🎤', category:'FAME', accent:C.violet,
    story:'A cousin of a cousin can get you close to the backstage area at Reggae Sumfest. Not VIP exactly. More like close enough to either embarrass yourself or create a moment.',
    choices:[
      {label:'Capture clean content', result:'You posted short, respectful clips and a thoughtful caption. The algorithm liked the island energy.', changes:{fame:3200,creative:10,happiness:12,stress:5}},
      {label:'Network quietly', result:'No big viral moment, but two real contacts saved your number.', changes:{relationships:14,communityStanding:8,intelligence:6}},
      {label:'Party too hard', result:'The night was sweet. The next week was not. A few people saw more than you meant to show.', changes:{happiness:14,health:-9,stress:10,integrity:-6}, special:'addiction_up'}
    ]
  },
  {
    id:'jazz_festival_guest', islands:['stlucia'], minAge:18, sev:'CULTURE',
    title:'Jazz Festival Guest List', icon:'🎷', category:'CULTURE', accent:C.teal,
    story:'A hospitality contact offers two guest passes during Saint Lucia Jazz. The catch: you may need to host visitors and keep everything smooth.',
    choices:[
      {label:'Host like a professional', result:'Visitors left impressed. Your name travelled through a better network than expected.', changes:{cash:650,relationships:12,communityStanding:12,leadership:8,stress:8}},
      {label:'Use it for creative content', result:'You turned the night into a polished island story and gained a small but excited audience.', changes:{fame:2200,creative:9,happiness:14,stress:5}},
      {label:'Pass the tickets to family', result:'The family group chat was full of pictures. You missed the event but gained something warmer.', changes:{relationships:18,happiness:12,stress:-5}}
    ]
  },
  {
    id:'merengue_family_party', islands:['dominican'], minAge:18, sev:'RELATIONSHIP',
    title:'Merengue Family Party', icon:'🎶', category:'RELATIONSHIP', accent:C.pink,
    story:'A family party turns into a full neighbourhood evening. Music, aunties, cousins, advice you did not ask for, and one conversation that might change your year.',
    choices:[
      {label:'Stay present with family', result:'You danced, listened, and let people feel you close. The family bond got stronger.', changes:{relationships:20,happiness:18,stress:-10}},
      {label:'Talk business with an uncle', result:'The conversation became practical fast. A small opportunity opened if you follow through.', changes:{cash:800,intelligence:7,relationships:8,stress:4}},
      {label:'Leave early to work', result:'The work got done. The family noticed the empty chair.', changes:{workEthic:8,relationships:-10,stress:6,happiness:-4}}
    ]
  },
  {
    id:'partner_feels_second', req:{partner:true}, minAge:20, sev:'RELATIONSHIP',
    title:'Your Partner Feels Second', icon:'💬', category:'RELATIONSHIP', accent:C.pink,
    story:'Your partner says they support the dream, but lately they feel like a background character in your life. The conversation is calm, which somehow makes it more serious.',
    tip:'Ambition without attention can quietly become neglect.',
    choices:[
      {label:'Plan a real reset weekend', result:'You made time without multitasking. The relationship felt chosen again.', changes:{cash:-300,relationships:16,happiness:16,stress:-8}},
      {label:'Explain the grind', result:'They understood some of it, but understanding is not the same as feeling loved.', changes:{workEthic:5,relationships:-5,stress:5}},
      {label:'Ask what they need', result:'The conversation became honest and useful. You did not solve everything, but you listened properly.', changes:{relationships:12,intelligence:5,stress:-3}}
    ]
  },
  {
    id:'child_school_call', req:{children:1}, minAge:22, sev:'FAMILY',
    title:'Call From School', icon:'🎒', category:'FAMILY', accent:C.green,
    story:'The school calls about your child. Nothing catastrophic, but enough that they need attention, patience, and an adult who shows up before the pattern hardens.',
    choices:[
      {label:'Go to the school yourself', result:'Your child saw you show up. The teacher saw it too. Small intervention, big signal.', changes:{relationships:16,happiness:8,stress:7,cash:-120}},
      {label:'Hire extra lessons', result:'The support helped, but money had to move around.', changes:{cash:-600,intelligence:7,relationships:6,stress:4}},
      {label:'Say they will grow out of it', result:'Maybe they will. Maybe they were asking for help in the only way they knew.', changes:{relationships:-10,stress:5,integrity:-4}}
    ]
  },
  {
    id:'boss_unpaid_overtime', req:{career:true}, minAge:19, sev:'CAREER',
    title:'Unpaid Overtime Test', icon:'💼', category:'CAREER', accent:C.green,
    story:'Your boss praises your attitude, then asks you to stay late again with no overtime. Everyone is watching how you handle it.',
    choices:[
      {label:'Negotiate boundaries', result:'You stayed professional and clear. Some respect was lost by the wrong people and gained by the right ones.', changes:{integrity:12,stress:4,leadership:8}},
      {label:'Do it for the promotion', result:'You looked dependable, but your body and mood paid the bill.', changes:{workEthic:10,stress:16,health:-6}},
      {label:'Refuse sharply', result:'The boundary was clear. The delivery created its own problem.', changes:{stress:-6,relationships:-8,integrity:4}}
    ]
  },
  {
    id:'coworker_voice_note', req:{career:true}, minAge:19, sev:'REPUTATION',
    title:'The Voice Note Leaked', icon:'📱', category:'REPUTATION', accent:C.coral,
    story:'A workplace voice note about management got forwarded into the wrong group. You did not send it, but you are in the conversation and people are asking what you think.',
    choices:[
      {label:'Stay factual and calm', result:'You avoided the drama without looking scared. Your reputation for judgment improved.', changes:{integrity:12,intelligence:7,stress:4}},
      {label:'Back your coworker publicly', result:'People respected the loyalty. Management noticed the challenge.', changes:{relationships:12,communityStanding:5,stress:10}},
      {label:'Share your own rant', result:'It felt good for an hour. Then the screenshot started moving.', changes:{happiness:6,integrity:-12,stress:16,communityStanding:-8}}
    ]
  },
  {
    id:'viral_misread', req:{followers:5000}, minAge:18, sev:'FAME',
    title:'The Viral Clip Got Misread', icon:'🔥', category:'FAME', accent:C.violet,
    story:'A short clip of you is moving fast, but people are reading it in a way you did not intend. The comments are split between jokes, praise, and real criticism.',
    choices:[
      {label:'Clarify with maturity', result:'You slowed the outrage and earned respect from people who were watching quietly.', changes:{fame:1800,integrity:12,stress:8,communityStanding:8}},
      {label:'Lean into the controversy', result:'The numbers jumped. The trust did not.', changes:{fame:6500,happiness:12,integrity:-14,stress:14}},
      {label:'Log off for a week', result:'The storm passed without you feeding it. Peace returned faster than the numbers grew.', changes:{health:8,stress:-18,happiness:6}}
    ]
  },
  {
    id:'brand_change_accent', req:{followers:12000}, minAge:18, sev:'FAME',
    title:'Brand Wants You to Change', icon:'✨', category:'FAME', accent:C.gold,
    story:'A brand likes your audience, but asks you to soften your accent and make the content feel less local. The money is real. The request sits badly.',
    choices:[
      {label:'Protect the island voice', result:'You declined the condition and your core audience trusted you more.', changes:{integrity:18,communityStanding:12,happiness:10}},
      {label:'Take the deal carefully', result:'You adjusted the delivery but kept some of yourself in it. Useful money, mixed feelings.', changes:{cash:4500,stress:8,integrity:-4}},
      {label:'Make a public point', result:'The post travelled. You became part of a bigger conversation about Caribbean identity.', changes:{fame:8000,communityStanding:14,stress:12,integrity:10}}
    ]
  },
  {
    id:'panic_attack_warning', req:{stressHigh:72}, minAge:20, sev:'HEALTH',
    title:'Panic in the Car Park', icon:'🫀', category:'HEALTH', accent:C.coral,
    story:'You sit in the car park with your chest tight, hands cold, and phone face down. For ten minutes, ambition does not matter. Breathing does.',
    choices:[
      {label:'Book help and reduce load', result:'You treated the warning like information, not weakness. The year became manageable again.', changes:{cash:-350,health:12,stress:-24,happiness:10}},
      {label:'Tell one trusted person', result:'You did not carry it alone. That changed more than expected.', changes:{relationships:12,stress:-14,happiness:8}},
      {label:'Push through it', result:'You got through the day, but the body saved the receipt.', changes:{workEthic:7,health:-10,stress:12}}
    ]
  },
  {
    id:'rum_cooler_invite', minAge:18, sev:'HEALTH',
    title:'Cooler Lime Pressure', icon:'🍹', category:'HEALTH', accent:C.orange,
    story:'The cooler is open, the music is right, and everybody keeps topping up your cup. It is friendly pressure, which can be the hardest kind to refuse.',
    choices:[
      {label:'Set your limit early', result:'You enjoyed the night and still owned the morning.', changes:{happiness:12,relationships:8,health:4,stress:-6}},
      {label:'Go with the flow', result:'The night was fun until it was not. The pattern got a little easier to repeat.', changes:{happiness:16,health:-8,stress:-4}, special:'addiction_up'},
      {label:'Leave before it turns', result:'You missed some jokes and avoided a version of the night you would regret.', changes:{health:8,stress:-10,relationships:-3}}
    ]
  },
  {
    id:'visa_document_delay', req:{migration:true}, minAge:23, sev:'MIGRATION',
    title:'Visa Document Delay', icon:'🧳', category:'MIGRATION', accent:C.turquoise,
    story:'One document is missing from your migration file. Nobody told you until now. The deadline is close and the office line keeps ringing out.',
    choices:[
      {label:'Handle it immediately', result:'You spent the day chasing stamps, copies, and signatures. The file survived.', changes:{cash:-450,stress:14,intelligence:6}},
      {label:'Pay a professional', result:'It cost money, but the process stopped eating your whole life.', changes:{cash:-950,stress:-6,intelligence:4}},
      {label:'Wait and hope', result:'The delay grew teeth. Hope was not a document.', changes:{stress:18,happiness:-10,relationships:-4}}
    ]
  },
  {
    id:'airport_goodbye', req:{migration:true}, minAge:23, sev:'MIGRATION',
    title:'Airport Goodbye', icon:'✈️', category:'MIGRATION', accent:C.turquoise,
    story:'At the airport, the suitcase is overweight and everyone is pretending the goodbye is normal. It is not. You are excited and grieving at the same time.',
    choices:[
      {label:'Promise regular calls', result:'You made the distance less vague. The people who love you needed that.', changes:{relationships:14,stress:-4,happiness:8}},
      {label:'Focus on the opportunity', result:'You stepped forward with discipline, but the homesickness waited on the other side.', changes:{workEthic:10,cash:1000,relationships:-8,stress:8}},
      {label:'Delay the move', result:'The choice surprised everyone, including you. Roots mattered more this year.', changes:{communityStanding:10,happiness:12,stress:-8,cash:-700}}
    ]
  },
  {
    id:'diaspora_connection', minAge:21, sev:'TRAVEL',
    title:'Diaspora Link-Up', icon:'🌍', category:'TRAVEL', accent:C.teal,
    story:'A friend abroad says there is a Caribbean networking event this month. Flights are not cheap, but the room could open doors you cannot find at home.',
    choices:[
      {label:'Take the trip', result:'The flight hurt your cash, but the conversations were serious. Your world got wider.', changes:{cash:-1400,relationships:16,intelligence:8,fame:1100,stress:5}},
      {label:'Join online instead', result:'Less magic, less cost, still useful. You followed up properly.', changes:{relationships:8,intelligence:6,stress:-2}},
      {label:'Skip it this year', result:'You kept the money and the routine. The window may open again.', changes:{cash:300,stress:-4}}
    ]
  },
  {
    id:'hurricane_relief_drive', minAge:18, sev:'COMMUNITY',
    title:'Relief Drive After the Storm', icon:'🌀', category:'COMMUNITY', accent:C.green,
    story:'A neighbouring island was hit hard by a storm. Local groups are collecting water, food, cash, and volunteers. The need is immediate.',
    choices:[
      {label:'Organise donations', result:'You moved people into action. The island saw leadership with heart.', changes:{cash:-350,communityStanding:22,leadership:10,stress:8,happiness:12}},
      {label:'Give privately', result:'Quiet help still helped. You kept the gesture clean.', changes:{cash:-250,integrity:8,happiness:8}},
      {label:'Share the fundraiser only', result:'It was small, but it still moved a few people to give.', changes:{communityStanding:5,stress:-2}}
    ]
  },
  {
    id:'jouvert_morning_choice', islands:['trinidad'], minAge:18, sev:'CULTURE',
    title:'Jouvert Morning Decision', icon:'🌅', category:'CULTURE', accent:C.orange,
    story:'It is still dark when the message comes in: the crew is outside and the truck is moving soon. Paint, powder, soca, road, and a full workday waiting after.',
    tip:'The fun is real. So is the recovery cost.',
    choices:[
      {label:'Hit the road with limits', result:'You caught the freedom of the morning without letting it swallow the week.', changes:{happiness:22,relationships:12,stress:-10,health:-4,cash:-220}},
      {label:'Turn it into content', result:'The footage carried energy people could feel. Your audience grew because the moment felt alive.', changes:{fame:2600,creative:8,happiness:14,stress:6}},
      {label:'Skip and sleep', result:'The group chat teased you all day, but your body was grateful.', changes:{health:12,stress:-18,relationships:-4}}
    ]
  },
  {
    id:'panorama_yard_practice', islands:['trinidad'], minAge:18, sev:'CULTURE',
    title:'Pan Yard Practice', icon:'🥁', category:'CULTURE', accent:C.teal,
    story:'A steelband yard needs extra hands before finals. Moving pans, feeding players, recording clips, sweeping, carrying, encouraging. Not glamorous. Deeply loved.',
    choices:[
      {label:'Help the yard all week', result:'You became part of something bigger than entertainment. The elders noticed your respect.', changes:{communityStanding:18,relationships:14,happiness:14,stress:6}},
      {label:'Sponsor food for players', result:'It cost money, but the gesture travelled through the community fast.', changes:{cash:-650,communityStanding:16,integrity:8,happiness:8}},
      {label:'Only post the final performance', result:'The clip did well, but people who did the work knew you arrived at the end.', changes:{fame:1500,communityStanding:-3,stress:-2}}
    ]
  },
  {
    id:'costume_price_pressure', islands:['trinidad','barbados'], minAge:18, sev:'FINANCE',
    title:'Costume Price Pressure', icon:'💸', category:'FINANCE', accent:C.gold,
    story:'The costume you wanted is beautiful and expensive. Friends say memories matter. Your budget says rent also matters.',
    choices:[
      {label:'Choose a cheaper section', result:'You still felt the road and avoided months of financial regret.', changes:{cash:-450,happiness:14,intelligence:6,stress:-4}},
      {label:'Swipe the card anyway', result:'The pictures looked incredible. The balance followed you home.', changes:{cash:-1800,happiness:24,stress:18,integrity:-4}},
      {label:'Volunteer with the band', result:'You traded glamour for access, work, and a new behind-the-scenes network.', changes:{cash:250,relationships:12,workEthic:8,stress:8}}
    ]
  },
  {
    id:'foreday_morning_route', islands:['barbados'], minAge:18, sev:'CULTURE',
    title:'Foreday Morning Route', icon:'🌙', category:'CULTURE', accent:C.violet,
    story:'Foreday Morning is coming and the crew wants you there. Paint, music, night air, and the kind of freedom people talk about for weeks.',
    choices:[
      {label:'Go with your people', result:'The night became one of those shared memories that keeps friendships alive.', changes:{happiness:24,relationships:16,stress:-12,cash:-250,health:-4}},
      {label:'Work a breakfast cooler', result:'You turned festival traffic into cash and still felt the rhythm from the roadside.', changes:{cash:1250,communityStanding:8,stress:10}},
      {label:'Stay rested for Kadooment', result:'You missed the night, but you arrived at the big day with energy.', changes:{health:10,stress:-10,happiness:5}}
    ]
  },
  {
    id:'last_canes_heritage_call', islands:['barbados'], minAge:18, sev:'HERITAGE',
    title:'Last Canes Ceremony', icon:'🎋', category:'HERITAGE', accent:C.green,
    story:'A heritage group asks you to help with a Crop Over event honouring elders, cane field history, and the people who carried culture forward.',
    choices:[
      {label:'Document elders properly', result:'You captured stories that felt bigger than one festival season.', changes:{communityStanding:18,integrity:12,intelligence:8,happiness:10}},
      {label:'Help with logistics', result:'Chairs, sound, water, transport. The invisible work made the ceremony flow.', changes:{workEthic:9,communityStanding:12,stress:8}},
      {label:'Only attend briefly', result:'You paid respect, but the deeper stories passed by without you.', changes:{communityStanding:4,happiness:4}}
    ]
  },
  {
    id:'sumfest_street_dance', islands:['jamaica'], minAge:18, sev:'FAME',
    title:'Sumfest Street Dance', icon:'🔊', category:'FAME', accent:C.violet,
    story:'A free street dance pulls locals, visitors, selectors, dancers, and phones into the same space. You can feel the moment building.',
    choices:[
      {label:'Dance and connect', result:'You did not force anything. The energy made introductions easy.', changes:{happiness:20,relationships:14,stress:-8,cash:-120}},
      {label:'Shoot a mini-documentary', result:'You told the story of the night instead of just showing the crowd. People shared it for the feeling.', changes:{fame:4200,creative:12,communityStanding:8,stress:8}},
      {label:'Stay away from the crowd', result:'You avoided the noise and the risk. The moment moved without you.', changes:{health:5,stress:-8,happiness:-3}}
    ]
  },
  {
    id:'sound_clash_loyalty', islands:['jamaica'], minAge:18, sev:'REPUTATION',
    title:'Sound Clash Loyalty Test', icon:'🎚️', category:'REPUTATION', accent:C.coral,
    story:'Two sound crews are clashing and both sides know you. A joke online turns into a loyalty test faster than expected.',
    choices:[
      {label:'Keep it respectful', result:'You praised the culture without insulting either camp. Mature move.', changes:{integrity:12,communityStanding:8,stress:4}},
      {label:'Pick a side loudly', result:'Your side loved it. The other side saved the screenshot.', changes:{fame:1800,relationships:-8,stress:10}},
      {label:'Stay offline tonight', result:'You missed some engagement but avoided a needless enemy.', changes:{stress:-10,health:4}}
    ]
  },
  {
    id:'artisan_booth_offer', islands:['stlucia'], minAge:18, sev:'BUSINESS',
    title:'Arts Festival Booth Offer', icon:'🧺', category:'BUSINESS', accent:C.teal,
    story:'During festival season, an artisan booth becomes available for one weekend. It is small, but visitors are spending and the right display could open doors.',
    choices:[
      {label:'Take the booth seriously', result:'You treated the table like a brand. Sales were solid and two hotel buyers asked questions.', changes:{cash:1450,creative:8,communityStanding:10,stress:10}},
      {label:'Share it with another maker', result:'Less profit, better network, and a warmer weekend.', changes:{cash:650,relationships:14,happiness:10,stress:3}},
      {label:'Pass this time', result:'You avoided the pressure but wondered what the weekend might have become.', changes:{stress:-6,happiness:-4}}
    ]
  },
  {
    id:'hotel_guest_complaint', islands:['barbados','stlucia','jamaica','dominican'], req:{career:true}, minAge:19, sev:'CAREER',
    title:'Tourist Complaint at Work', icon:'🏨', category:'CAREER', accent:C.orange,
    story:'A tourist complains loudly about something that was not fully your fault. Your manager looks at you to solve it before the review goes online.',
    choices:[
      {label:'Fix it without taking abuse', result:'You stayed calm and set a boundary. The guest cooled down and management saw leadership.', changes:{leadership:10,integrity:8,stress:8,communityStanding:5}},
      {label:'Apologise for everything', result:'The review was saved, but swallowing the whole blame sat badly.', changes:{stress:14,relationships:4,happiness:-6}},
      {label:'Tell the truth bluntly', result:'You were right. You were also too sharp for the room.', changes:{integrity:6,stress:8,communityStanding:-6}}
    ]
  },
  {
    id:'diaspora_remittance_request', minAge:23, sev:'FAMILY',
    title:'Family Abroad Needs Help', icon:'💌', category:'FAMILY', accent:C.pink,
    story:'A relative abroad usually sends money home. This time they message you: rent jumped, hours were cut, and they need help for once.',
    tip:'Migration can support families, but migrants also carry pressure quietly.',
    choices:[
      {label:'Send what you can', result:'The money mattered, but the message mattered too: support goes both ways.', changes:{cash:-800,relationships:16,integrity:8,stress:5}},
      {label:'Offer planning instead', result:'You helped them sort the numbers and find breathing room without draining yourself.', changes:{intelligence:8,relationships:10,stress:-2}},
      {label:'Ignore the message', result:'You protected your cash and damaged something less visible.', changes:{cash:300,relationships:-12,integrity:-8}}
    ]
  },
  {
    id:'no_contract_job_offer', minAge:18, sev:'CAREER',
    title:'Good Money, No Contract', icon:'📄', category:'CAREER', accent:C.gold,
    story:'A side job offers cash immediately, but no written agreement. Everybody says the person is “good for it”. Your gut wants paper.',
    choices:[
      {label:'Ask for a simple agreement', result:'Some people acted offended. The serious ones respected it. You got paid clean.', changes:{cash:900,intelligence:8,integrity:8,stress:4}},
      {label:'Take the handshake deal', result:'You got some money, then spent too much energy chasing the rest.', changes:{cash:450,stress:14,relationships:-4}},
      {label:'Walk away', result:'No cash came in, but no headache followed you either.', changes:{stress:-8,integrity:6}}
    ]
  },
  {
    id:'clinic_screening_day', minAge:24, sev:'HEALTH',
    title:'Free Screening Day', icon:'🩺', category:'HEALTH', accent:C.green,
    story:'A community clinic is offering blood pressure, blood sugar, and basic counselling checks. You feel fine, which is exactly why you are tempted to skip.',
    choices:[
      {label:'Do the screening', result:'You caught a small warning early and got practical advice before it became expensive.', changes:{health:16,intelligence:6,stress:-8,happiness:6}},
      {label:'Bring a parent too', result:'The checkup became a family intervention in the best way.', changes:{health:12,relationships:14,communityStanding:6,stress:-5}},
      {label:'Skip it', result:'Nothing happened today. That was not the same as being fine.', changes:{stress:-2,health:-4}}
    ]
  },
  {
    id:'storm_supply_shortage', minAge:18, sev:'DISASTER',
    title:'Storm Supplies Running Out', icon:'🧰', category:'DISASTER', accent:C.coral,
    story:'A storm warning sends everyone to the shops. Water, batteries, plywood, gas, medication. The shelves are thinning and someone behind you is panicking.',
    choices:[
      {label:'Buy only what you need', result:'You prepared without hoarding. The decision felt small until someone thanked you.', changes:{cash:-420,integrity:10,communityStanding:8,stress:4}},
      {label:'Stock extra for neighbours', result:'You spent more, but your street became calmer because someone planned ahead.', changes:{cash:-850,communityStanding:18,relationships:12,stress:8}},
      {label:'Flip supplies for profit', result:'The cash came fast. So did the looks from people who remembered.', changes:{cash:900,integrity:-22,communityStanding:-24,stress:10}}
    ]
  }
];

export const PROVERBS = [
  'Every day bucket goes to the well — one day the bottom must drop out.',
  'Rain does fall on everybody. It is who has the umbrella that matters.',
  'What sweet in goat mouth does sour in his tail.',
  'The higher the monkey climbs, the more he exposes himself. Stay humble.',
  'Softly softly catchee monkey. Consistent quiet effort beats loud bursts.',
  'River know your size. Deliver what you are capable of.'
];
