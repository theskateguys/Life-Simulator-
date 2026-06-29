import { useEffect, useMemo, useState } from 'react';
import {
  ACHIEVEMENTS, ACTION_CATEGORIES, AVATARS, BACKGROUNDS, BUSINESS_ACTIONS, C, CAREERS, ISLANDS, LIFE_GOALS, PROPERTY_ACTIONS, SKILLS, THEME_MODES
} from './data/gameData.js';
import {
  YEAR_FOCUS, applyAction, applyEventChoice, canUseAction, clearSave, createInitialGame, endYear, evaluateDeath,
  fmt, hasSave, islandById, loadGame, nextYear, refreshFinance, saveGame, startNextGeneration, totalNetWorth
} from './engine/gameLogic.js';
import { EventModal, OutcomeModal } from './components/Modal.jsx';
import ActionCard from './components/ActionCard.jsx';
import FinancePanel from './components/FinancePanel.jsx';
import FamilyPanel from './components/FamilyPanel.jsx';
import YearReview from './components/YearReview.jsx';

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

function StatPill({emoji,label,value,color}) {
  return <div style={{background:`${color}0B`,border:`1px solid ${color}22`,borderRadius:9,padding:'5px 6px',textAlign:'center'}}><p style={{color:C.faint,fontSize:7,margin:'0 0 2px'}}>{emoji} {label}</p><p style={{fontSize:11,fontWeight:900,color,margin:0}}>{Math.round(value)}</p></div>;
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
  sell_property:'You let go of an asset and turned it into breathing room.'
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
  damian:{promise:'Face comparison, rivalry, and old history directly.', vibe:'Drama chapter'},
  business:{promise:'Grow the systems, quality, and reach of your business.', vibe:'Owner mode'},
  property:{promise:'Manage assets that can change your long-term life.', vibe:'Asset chapter'}
};

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
  const [open,setOpen] = useState({stats:false,skills:false,finance:false,family:false,achievements:false});

  const island = game ? islandById(game.islandId) : (selectedIsland ? islandById(selectedIsland) : null);
  const activeTheme = game?.themeMode || themeMode;
  const activeBackground = screenBackground(activeTheme);
  const activeGoal = LIFE_GOALS.find(goal=>goal.id === (game?.goalId || selectedGoal)) || LIFE_GOALS[0];
  const activeAvatar = AVATARS.find(avatar=>avatar.id === (game?.avatarId || selectedAvatar)) || AVATARS[0];
  const finance = game ? refreshFinance(game).finance : null;
  const money = value => fmt(value,island);

  useEffect(()=>{
    if (!toast) return undefined;
    const timer = window.setTimeout(()=>setToast(''),3100);
    return ()=>window.clearTimeout(timer);
  },[toast]);

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
    setGame(next); setScreen(screens.game); setSelectedCategory(null); setOpen({stats:false,skills:false,finance:false,family:false,achievements:false});
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
    const basics = ACTION_CATEGORIES.map(category => ({...category, categoryLocked:category.id === 'damian' && game.age < 28, categoryLock:category.id === 'damian' && game.age < 28 ? `Unlocks at age 28 · now age ${game.age}` : null}));
    basics.push({id:'business',label:'BUSINESS',emoji:'🏢',color:C.pink,tag:game.business.active?'Manage systems and cash flow.':'Locked path: start a business through an opportunity.',items:BUSINESS_ACTIONS,categoryLocked:!game.business.active,categoryLock:'Start a business through an event or business opportunity first.'});
    basics.push({id:'property',label:'PROPERTY',emoji:'🏠',color:C.teal,tag:game.properties.length?'Manage the assets you own.':'Locked path: buy a property through MONEY.',items:PROPERTY_ACTIONS,categoryLocked:game.properties.length===0,categoryLock:'Buy your first property to manage it.'});
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
    <div style={{display:'flex',flexDirection:'column',gap:8}}>{ISLANDS.map(entry=><button key={entry.id} onClick={()=>{setSelectedIsland(entry.id);setScreen(screens.background);}} style={{textAlign:'left',cursor:'pointer',padding:'13px 14px',borderRadius:13,border:`1px solid ${C.turquoise}30`,background:`${C.turquoise}08`,color:C.text}}><div style={{display:'flex',gap:10,alignItems:'center'}}><span style={{fontSize:28}}>{entry.flag}</span><div style={{flex:1}}><p style={{fontWeight:900,margin:'0 0 2px'}}>{entry.name}</p><p style={{fontSize:10,color:C.dim,margin:0}}>{entry.tag}</p></div><span style={{fontSize:10,color:C.green,fontWeight:800}}>{entry.currency}</span></div><p style={{fontSize:9,color:C.faint,margin:'7px 0 0'}}>Cost of living: {money ? '' : ''}{entry.monthlyEssentials.toLocaleString()}/mo · {entry.festival} · property from {entry.currency}{Math.round(entry.propertyPrice*0.2).toLocaleString()} deposit</p></button>)}</div>
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
      <p style={{fontSize:11,color:C.dim,margin:'15px 0 7px'}}>YOUR LOOK</p><p style={{fontSize:10,color:C.faint,margin:'0 0 8px'}}>Pick a simple face for your character. We can make this deeper later.</p>
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
    return <div style={{minHeight:'100vh',background:activeBackground,color:C.text,padding:'26px 14px 48px'}}><div style={{maxWidth:480,margin:'0 auto',textAlign:'center'}}><div style={{fontSize:48}}>{island.flag}</div><h1 style={{fontSize:29,margin:'4px 0'}}>{game.name}'s Story</h1><p style={{color:rating[1],fontWeight:900,fontSize:17,margin:'4px 0'}}>{rating[0]}</p><p style={{fontSize:12,color:C.dim,margin:'0 0 14px'}}>Age {game.age} · Generation {game.generation} · {island.name}</p><Card style={{padding:15,textAlign:'left',marginBottom:12}}>{[
      ['💰','Net worth',money(netWorth),C.green],['🏦','Cash',money(game.finance.cash),C.gold],['📈','Investments',money(game.finance.investments),C.turquoise],['🏠','Property value',money(game.finance.propertyValue),C.teal],['🏘️','Community',`${Math.round(game.stats.communityStanding)}/100`,C.pink],['⚖️','Integrity',`${Math.round(game.stats.integrity)}/100`,C.gold]
    ].map(([emoji,label,value,color])=><div key={label} style={{display:'flex',justifyContent:'space-between',padding:'5px 0'}}><span style={{fontSize:12,color:C.dim}}>{emoji} {label}</span><span style={{fontSize:12,color,fontWeight:900}}>{value}</span></div>)}</Card><p style={{fontSize:12,color:C.muted,lineHeight:1.7,margin:'0 0 14px'}}>{rating[2]}</p><Button onClick={restart} style={{width:'100%',fontSize:14}}>🌴 Begin a New Life</Button></div></div>;
  }

  if (screen === screens.game && game && finance) {
    const selected = categories.find(category=>category.id === selectedCategory);
    const achievementItems = ACHIEVEMENTS.filter(item=>game.achievements.includes(item.id));
    const familyHeadline = game.partner ? `❤️ ${game.partner.name.split(' ')[0]} · ${Math.round(game.partner.relationship)}%` : 'No partner yet';
    const career = CAREERS[game.career] || CAREERS.none;
    const monthlyNet = finance.monthlyIncome - finance.monthlyExpenses;
    const signedMoney = value => `${value >= 0 ? '+' : '-'}${money(Math.abs(value))}`;
    const statRows = [
      ['😊','Joy','happiness',C.gold],['❤️','Health','health',C.coral],['🧠','Stress','stress',C.violet],['🤝','Social','relationships',C.turquoise],
      ['📚','Mind','intelligence',C.turquoise],['💪','Drive','workEthic',C.orange],['🌱','Community','communityStanding',C.green],['⚖️','Integrity','integrity',C.gold]
    ];
    return <div style={{minHeight:'100vh',background:activeBackground,color:C.text}}>
      <Toast text={toast}/>
      <div style={{maxWidth:540,margin:'0 auto',padding:'13px 14px 54px'}}>
        <Card style={{padding:'13px 14px',borderColor:`${C.gold}32`,marginBottom:11}}>
          <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:10}}>
            <div style={{width:54,height:54,borderRadius:16,display:'grid',placeItems:'center',fontSize:34,background:`${C.gold}16`,border:`1px solid ${C.gold}35`}}>{activeAvatar.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:10,color:C.gold,fontWeight:900,letterSpacing:1.4,margin:'0 0 3px'}}>AGE {game.age} · {island.name.toUpperCase()}</p>
              <h2 style={{fontSize:22,lineHeight:1.05,margin:'0 0 4px'}}>{game.name}</h2>
              <p style={{fontSize:11,color:C.dim,margin:0}}>{activeGoal.emoji} {activeGoal.label} · {career.emoji} {career.label}{game.careerLevel>0?` Lv${game.careerLevel}`:''}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{fontSize:9,color:C.faint,margin:'0 0 2px'}}>Cash</p>
              <p style={{fontSize:17,color:finance.cash>2000?C.green:C.gold,fontWeight:900,margin:0}}>{money(finance.cash)}</p>
              <p style={{fontSize:9,color:monthlyNet>=0?C.green:C.coral,margin:'2px 0 0'}}>{signedMoney(monthlyNet)}/mo</p>
            </div>
          </div>
          <p style={{fontSize:11,color:C.muted,lineHeight:1.55,margin:'0 0 10px'}}>This year, choose how {game.name.split(' ')[0] || 'you'} spends time and energy. There is no single winning path; the story grows from the choices you make.</p>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:7}}><div><p style={{fontWeight:900,color:C.gold,fontSize:13,margin:'0 0 1px'}}>Year Focus</p><p style={{fontSize:10,color:C.dim,margin:0}}>{YEAR_FOCUS-game.yearFocus} focus remaining</p></div><p style={{fontSize:11,fontWeight:900,color:C.gold,margin:0}}>{game.yearFocus}/{YEAR_FOCUS}</p></div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${YEAR_FOCUS},1fr)`,gap:3}}>{Array.from({length:YEAR_FOCUS}).map((_,index)=><div key={index} style={{height:6,borderRadius:5,background:index<game.yearFocus?C.gold:'rgba(255,255,255,0.10)',boxShadow:index<game.yearFocus?`0 0 6px ${C.gold}55`:'none'}} />)}</div>
          <div style={{display:'flex',gap:5,flexWrap:'wrap',marginTop:9}}>{game.business.active&&<span style={{fontSize:9,color:C.orange,border:`1px solid ${C.orange}32`,background:`${C.orange}12`,padding:'3px 6px',borderRadius:8}}>Business Lv {game.business.level}</span>}{game.properties.length>0&&<span style={{fontSize:9,color:C.teal,border:`1px solid ${C.teal}32`,background:`${C.teal}12`,padding:'3px 6px',borderRadius:8}}>{game.properties.length} propert{game.properties.length===1?'y':'ies'}</span>}{game.finance.loanDebt>0&&<span style={{fontSize:9,color:C.coral,border:`1px solid ${C.coral}32`,background:`${C.coral}12`,padding:'3px 6px',borderRadius:8}}>Loan {money(game.finance.loanDebt)}</span>}{game.finance.pardner.active&&<span style={{fontSize:9,color:C.green,border:`1px solid ${C.green}32`,background:`${C.green}12`,padding:'3px 6px',borderRadius:8}}>Pardner active</span>}</div>
        </Card>
        {game.stats.health<25 && <Card style={{padding:'9px 11px',borderColor:`${C.coral}40`,marginBottom:8}}><p style={{fontSize:11,color:C.coral,fontWeight:800,margin:0}}>⚠️ Health is critical. Your body needs immediate attention.</p></Card>}
        {game.stats.stress>75 && <Card style={{padding:'9px 11px',borderColor:`${C.gold}40`,marginBottom:8}}><p style={{fontSize:11,color:C.gold,fontWeight:800,margin:0}}>⚠️ Stress is extreme. Recovery is a strategic decision now.</p></Card>}
        {Object.values(game.addictions).some(value=>value>40) && <Card style={{padding:'9px 11px',borderColor:`${C.orange}40`,marginBottom:8}}><p style={{fontSize:11,color:C.orange,fontWeight:800,margin:0}}>⚠️ Vice pressure is active. Health actions and recovery choices now matter.</p></Card>}

        {!selected ? <>
          <p style={{fontSize:10,letterSpacing:2,color:C.dim,fontWeight:900,margin:'0 0 8px'}}>CHOOSE THIS YEAR'S CHAPTER</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:11}}>{categories.map(category=>{
            const story = CATEGORY_STORIES[category.id] || {promise:category.tag, vibe:'Life chapter'};
            return <button key={category.id} onClick={()=>setSelectedCategory(category.id)} style={{cursor:'pointer',textAlign:'left',padding:'12px',borderRadius:14,border:`1px solid ${category.categoryLocked?'rgba(255,255,255,.15)':category.color+'55'}`,background:category.categoryLocked?'rgba(255,255,255,.025)':`linear-gradient(160deg,${category.color}13,rgba(255,255,255,.035))`,color:C.text,opacity:category.categoryLocked?.65:1,boxShadow:category.categoryLocked?'none':`0 10px 26px ${category.color}0E`}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'flex-start',marginBottom:7}}><span style={{fontSize:23}}>{category.categoryLocked?'🔒':category.emoji}</span><span style={{fontSize:8,color:category.categoryLocked?C.faint:category.color,border:`1px solid ${category.categoryLocked?C.faint:category.color}33`,borderRadius:20,padding:'2px 6px',fontWeight:900,textTransform:'uppercase'}}>{category.categoryLocked?'Locked':story.vibe}</span></div>
              <p style={{fontWeight:900,fontSize:13,color:category.categoryLocked?C.dim:category.color,margin:'0 0 3px'}}>{category.label}</p>
              <p style={{fontSize:10,color:C.muted,lineHeight:1.4,margin:'0 0 6px'}}>{category.categoryLocked?category.categoryLock:story.promise}</p>
              <p style={{fontSize:9,color:C.faint,fontWeight:800,margin:0}}>{category.items.length} choices inside →</p>
            </button>;
          })}</div>
          {game.yearLog.length>0&&<Card style={{padding:'11px 12px',borderColor:`${C.violet}26`,marginBottom:8}}><p style={{fontSize:10,color:C.violet,fontWeight:900,letterSpacing:1.5,margin:'0 0 7px'}}>📋 THIS YEAR'S LOG</p>{game.yearLog.map((entry,index)=><div key={`${entry.id}-${index}`} style={{display:'flex',gap:8,alignItems:'center',marginBottom:5}}><span style={{fontSize:9,color:C.faint,minWidth:25}}>{entry.month}</span><span>{entry.emoji}</span><span style={{flex:1,fontSize:11,color:entry.isEvent?C.gold:C.muted,fontWeight:entry.isEvent?800:600}}>{entry.label}</span>{entry.cost>0&&<span style={{fontSize:9,color:C.gold}}>●{entry.cost}</span>}</div>)}</Card>}
          <Card style={{padding:0,overflow:'hidden',marginBottom:7,borderColor:`${C.green}30`}}><button onClick={()=>setOpen(state=>({...state,stats:!state.stats}))} style={{width:'100%',cursor:'pointer',textAlign:'left',padding:'10px 12px',border:0,background:'transparent',color:C.green,fontWeight:900,fontSize:12}}>📊 Stats & Money <span style={{float:'right',color:C.faint}}>{open.stats?'▲':'▼'}</span></button>{open.stats&&<div style={{padding:'0 12px 12px'}}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:10}}>{statRows.map(([emoji,label,key,accent])=>{const value=Math.round(game.stats[key]); const color=key==='stress' ? (value>65?C.coral:value>35?C.gold:C.green) : (value>60?C.green:value>30?C.gold:C.coral); return <div key={key} style={{background:`${accent}09`,border:`1px solid ${accent}1F`,borderRadius:9,padding:'7px 8px'}}><p style={{fontSize:9,color:C.dim,margin:'0 0 2px'}}>{emoji} {label}</p><p style={{fontSize:14,fontWeight:900,color,margin:'0 0 4px'}}>{value}</p><div style={{height:3,borderRadius:2,background:'rgba(255,255,255,.08)',overflow:'hidden'}}><div style={{height:3,width:`${value}%`,background:color}} /></div></div>})}</div><FinancePanel game={game} finance={finance} island={island} fmt={money}/></div>}</Card>
          <Card style={{padding:0,overflow:'hidden',marginBottom:7,borderColor:`${C.turquoise}30`}}><button onClick={()=>setOpen(state=>({...state,skills:!state.skills}))} style={{width:'100%',cursor:'pointer',textAlign:'left',padding:'10px 12px',border:0,background:'transparent',color:C.turquoise,fontWeight:900,fontSize:12}}>🎯 Skills <span style={{float:'right',color:C.faint}}>{open.skills?'▲':'▼'}</span></button>{open.skills&&<div style={{padding:'0 12px 12px'}}>{SKILLS.map(skill=>{const value=game.skills[skill.id]||0; return <div key={skill.id} style={{margin:'8px 0'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:3}}><span style={{color:C.muted}}>{skill.emoji} {skill.label}</span><span style={{color:skill.color,fontWeight:900}}>{value}{skillLabelText(skill.id,value)}</span></div><div style={{height:4,borderRadius:3,background:'rgba(255,255,255,.07)',overflow:'hidden'}}><div style={{height:4,width:`${value}%`,background:skill.color}} /></div></div>})}</div>}</Card>
          <Card style={{padding:0,overflow:'hidden',marginBottom:7,borderColor:`${C.pink}30`}}><button onClick={()=>setOpen(state=>({...state,family:!state.family}))} style={{width:'100%',cursor:'pointer',textAlign:'left',padding:'10px 12px',border:0,background:'transparent',color:C.pink,fontWeight:900,fontSize:12}}>👨‍👩‍👧 Family · {familyHeadline} <span style={{float:'right',color:C.faint}}>{open.family?'▲':'▼'}</span></button>{open.family&&<div style={{padding:'0 12px 12px'}}><FamilyPanel game={game}/></div>}</Card>
          <Card style={{padding:0,overflow:'hidden',marginBottom:10,borderColor:`${C.gold}30`}}><button onClick={()=>setOpen(state=>({...state,achievements:!state.achievements}))} style={{width:'100%',cursor:'pointer',textAlign:'left',padding:'10px 12px',border:0,background:'transparent',color:C.gold,fontWeight:900,fontSize:12}}>🏆 Achievements · {achievementItems.length}/{ACHIEVEMENTS.length} <span style={{float:'right',color:C.faint}}>{open.achievements?'▲':'▼'}</span></button>{open.achievements&&<div style={{padding:'0 12px 12px'}}>{ACHIEVEMENTS.map(item=>{const unlocked=game.achievements.includes(item.id); return <div key={item.id} style={{padding:'6px 0',display:'flex',gap:7,opacity:unlocked?1:.4}}><span>{item.emoji}</span><div><p style={{fontSize:11,fontWeight:800,color:unlocked?C.gold:C.dim,margin:0}}>{item.title}</p><p style={{fontSize:9,color:C.faint,margin:'1px 0 0'}}>{item.text}</p></div></div>})}</div>}</Card>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}><Button onClick={saveCurrent} secondary accent={C.green}>💾 Save Game</Button><Button disabled={game.yearFocus < YEAR_FOCUS} onClick={()=>finishYear(game)} accent={C.gold}>{game.yearFocus<YEAR_FOCUS?`${YEAR_FOCUS-game.yearFocus} focus left`:'Wrap Up Age 📋'}</Button></div>
        </> : <>
          <button onClick={()=>setSelectedCategory(null)} style={{cursor:'pointer',border:`1px solid ${selected.color}50`,background:`${selected.color}12`,color:selected.color,padding:'7px 10px',borderRadius:9,fontWeight:900,fontSize:11,marginBottom:9}}>← Back to chapters</button>
          <Card style={{padding:'13px 14px',marginBottom:10,borderColor:`${selected.color}35`}}>
            <p style={{fontSize:10,color:selected.color,fontWeight:900,letterSpacing:1.4,textTransform:'uppercase',margin:'0 0 4px'}}>{CATEGORY_STORIES[selected.id]?.vibe || 'Life chapter'}</p>
            <p style={{fontWeight:900,fontSize:18,color:selected.color,margin:'0 0 4px'}}>{selected.emoji} {selected.label}</p>
            <p style={{fontSize:11,color:C.muted,lineHeight:1.55,margin:'0 0 8px'}}>{selected.categoryLocked?selected.categoryLock:(CATEGORY_STORIES[selected.id]?.promise || selected.tag)}</p>
            <p style={{fontSize:10,color:C.faint,margin:0}}>Pick one choice to spend focus and create a story moment.</p>
          </Card>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>{selected.items.map(action=>{
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
