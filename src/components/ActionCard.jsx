import React from 'react';
import { C, SKILLS } from '../data/gameData.js';

const ACTION_PROMISES = {
  study_cooking:'Build a food skill that can turn into side income, reputation, and eventually a real business.',
  study_tech:'Open a route into better-paying digital work and future independence.',
  learn_trade:'Gain a practical skill people will always need.',
  study_finance:'Understand money well enough to make it work for you.',
  develop_creative:'Turn your voice, style, and ideas into attention.',
  build_leadership:'Become the kind of person people trust with bigger responsibility.',
  fitness_training:'Strengthen the body that has to carry every dream.',
  overdeliver:'Trade comfort for visibility and a stronger career reputation.',
  network:'Meet people who can open doors later.',
  upskill:'Make yourself harder to ignore in the workplace.',
  promotion:'Take a direct shot at moving up.',
  switch_career:'Let your skills point you toward a better lane.',
  migration:'Explore whether a bigger market can change your earning power.',
  cook_sell:'Convert effort into cash right now.',
  freelance:'Get paid for useful skill, not just hours.',
  market_stall:'Test your hustle in public and learn from real customers.',
  perform:'Build joy, confidence, and an audience.',
  post_content:'Put your story into the world and grow influence.',
  start_business:'Turn a hustle into something that can grow without being just a hobby.',
  save:'Build breathing room and reduce future panic.',
  invest:'Plant money for the future instead of spending it today.',
  buy_property:'Move toward ownership, assets, and long-term security.',
  pardner:'Use community discipline to force saving.',
  loan:'Get capital now, but accept the pressure that comes with it.',
  risky:'Chase a big upside and accept that it may sting.',
  exercise:'Reduce pressure and feel stronger.',
  rest:'Recover before ambition burns through your body.',
  diet:'Improve energy and long-term health.',
  mental:'Lower the pressure by dealing with it honestly.',
  rehab:'Break a pattern before it takes over the story.',
  checkup:'Catch problems early and protect the future.',
  lime:'Recharge with people, laughter, and island joy.',
  community:'Earn trust by showing up for others.',
  festival:'Let culture refill the parts of life work cannot reach.',
  family_time:'Protect the people closest to you.',
  faith:'Find steadiness, service, and rhythm.',
  love:'Make room for connection and partnership.',
  child:'Choose parenthood as a serious new chapter.',
  hire:'Build a business that can grow beyond your own hands.',
  marketing:'Bring more attention to what you sell.',
  quality:'Increase trust by raising the standard.',
  business_finance:'Make the business cleaner, calmer, and more controlled.',
  renovate:'Put care into property and increase value.',
  sell_property:'Trade an asset for cash and less pressure.',
  buy_starter_skates:'Open the Skate Life path with your first pair and a clean beginner start.',
  buy_protective_kit:'Add the basic safety gear needed for harder skate sessions.',
  beginner_skate_class:'Build the foundation: balance, stops, technique, and confidence.',
  skate_conditioning:'Use skating drills to grow fitness, agility, and control.',
  skate_guys_jam:'Join The Skate Guys circle and turn practice into community.',
  service_skates:'Restore gear condition so your setup stays safe and smooth.',
  unlock_recreation_jam:'Choose the social, stylish, joy-first skating path.',
  unlock_artistic:'Choose routines, presentation, and showmanship.',
  unlock_speed:'Choose endurance, racing, and timed performance.',
  unlock_roller_derby:'Choose a team contact-sport path with clear safety demands.',
  unlock_slalom_park:'Choose cones, flow, tricks, and park-style control.'
};

const STAT_NAMES = {
  cash:'Cash',
  happiness:'Joy',
  health:'Health',
  stress:'Stress',
  relationships:'Social',
  intelligence:'Mind',
  workEthic:'Drive',
  communityStanding:'Community',
  integrity:'Integrity'
};

function payoffText(action) {
  if (action.special?.startsWith('skating_')) return 'Builds your Skate Life path';
  if (action.special?.includes('business')) return 'Can grow your business path';
  if (action.special?.includes('property')) return 'Can change your asset story';
  if (action.special?.includes('fame') || action.special === 'post_content') return 'Can grow your audience';
  if (action.special?.includes('cash') || action.changes?.cash > 0) return 'Can put money in your pocket';
  if (action.req && Object.keys(action.req).length) return 'Unlocks when your life is ready';
  return 'Moves your story forward';
}

function visibleImpacts(action, fmt) {
  const statImpacts = Object.entries(action.changes || {})
    .filter(([,value]) => value !== 0)
    .slice(0, 4)
    .map(([key,value]) => {
      const positive = value > 0;
      const label = key === 'cash' ? fmt(Math.abs(value)) : `${Math.abs(value)} ${STAT_NAMES[key] || key}`;
      return {key, label:`${positive ? '+' : '-'}${label}`, positive};
    });

  const skillImpacts = Object.entries(action.skills || {})
    .filter(([,value]) => value > 0)
    .slice(0, 3)
    .map(([key,value]) => ({
      key:`skill-${key}`,
      label:`+${value} ${SKILLS.find(skill => skill.id === key)?.label || key}`,
      positive:true,
      skill:true
    }));

  return [...statImpacts, ...skillImpacts].slice(0, 5);
}

export default function ActionCard({action,color,status,onChoose,fmt}) {
  const disabled = !status.ok;
  const impacts = visibleImpacts(action, fmt);

  return (
    <button
      onClick={() => status.ok && onChoose(action)}
      disabled={disabled}
      style={{
        textAlign:'left',
        padding:'13px 14px',
        borderRadius:14,
        border:`1px solid ${disabled ? 'rgba(255,255,255,0.12)' : `${color}55`}`,
        background:disabled ? 'rgba(255,255,255,0.025)' : `linear-gradient(160deg,${color}14,rgba(255,255,255,0.035))`,
        color:C.text,
        opacity:disabled ? 0.55 : 1,
        cursor:disabled ? 'not-allowed' : 'pointer',
        boxShadow:disabled ? 'none' : `0 10px 28px ${color}10`
      }}
    >
      <div style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:8}}>
        <div style={{width:36,height:36,borderRadius:11,display:'grid',placeItems:'center',fontSize:22,background:`${color}18`,border:`1px solid ${color}38`,flex:'0 0 auto'}}>
          {disabled ? '🔒' : action.emoji}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',gap:7,justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <p style={{fontSize:9,color:disabled ? C.faint : color,fontWeight:900,letterSpacing:1.2,textTransform:'uppercase',margin:'0 0 2px'}}>
                {disabled ? 'Not ready yet' : 'Choose this year'}
              </p>
              <p style={{fontWeight:900,fontSize:14,lineHeight:1.15,margin:0}}>{action.label}</p>
            </div>
            <span style={{fontSize:9,fontWeight:900,color:action.cost > 0 ? C.gold : C.dim,border:`1px solid ${action.cost > 0 ? C.gold : C.faint}44`,borderRadius:8,padding:'3px 6px',whiteSpace:'nowrap'}}>
              {action.cost > 0 ? `${action.cost} focus` : 'Free'}
            </span>
          </div>
        </div>
      </div>

      <p style={{fontSize:11,lineHeight:1.55,color:C.muted,margin:'0 0 7px'}}>
        {ACTION_PROMISES[action.id] || action.desc}
      </p>

      <div style={{background:`${color}0D`,border:`1px solid ${color}22`,borderRadius:10,padding:'7px 8px',marginBottom:8}}>
        <p style={{fontSize:9,color:C.faint,letterSpacing:1.1,textTransform:'uppercase',fontWeight:900,margin:'0 0 3px'}}>Payoff</p>
        <p style={{fontSize:11,color:disabled ? C.dim : color,fontWeight:800,lineHeight:1.4,margin:0}}>{payoffText(action)}</p>
      </div>

      {!status.ok && (
        <div style={{background:`${C.coral}10`,border:`1px solid ${C.coral}25`,borderRadius:8,padding:'5px 7px',marginBottom:6}}>
          {status.lines.map(line => <p key={line} style={{margin:0,fontSize:9,color:C.coral}}>🔒 {line}</p>)}
        </div>
      )}

      <div style={{display:'flex',flexWrap:'wrap',gap:5,alignItems:'center'}}>
        {impacts.map(item => (
          <span
            key={item.key}
            style={{
              fontSize:9,
              fontWeight:900,
              borderRadius:7,
              padding:'3px 6px',
              color:item.skill ? C.violet : (item.positive ? C.green : C.coral),
              background:item.skill ? `${C.violet}13` : (item.positive ? `${C.green}13` : `${C.coral}13`),
              border:`1px solid ${item.skill ? C.violet : (item.positive ? C.green : C.coral)}22`
            }}
          >
            {item.label}
          </span>
        ))}
        {action.ym != null && <span style={{fontSize:9,color:C.faint,fontWeight:800,marginLeft:'auto'}}>Limit {action.ym}/yr</span>}
      </div>
    </button>
  );
}
