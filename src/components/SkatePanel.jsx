import React from 'react';
import { C, SKATING_DISCIPLINES } from '../data/gameData.js';

function disciplineName(id) {
  return SKATING_DISCIPLINES.find(item => item.id === id)?.label || 'Base Training';
}

function nextStep(game) {
  const skating = game.skating;
  if (!skating.gear.helmet || !skating.gear.pads || !skating.gear.wristGuards) return 'Next: add protective gear before harder sessions.';
  if (skating.stats.balance < 15) return 'Next: build Balance 15 to join The Skate Guys jam.';
  if (!skating.disciplinesUnlocked.length) return 'Next: complete beginner progression and choose a discipline.';
  if (skating.gear.condition < 35) return 'Gear warning: service your skates soon.';
  return 'Next: keep training and grow your skate reputation.';
}

export default function SkatePanel({game, color}) {
  const skating = game.skating;
  if (!skating?.unlocked) return null;

  const statRows = [
    ['Balance', skating.stats.balance],
    ['Agility', skating.stats.agility],
    ['Technique', skating.stats.technique],
    ['Confidence', skating.stats.confidence],
    ['Fitness', game.skills.fitness || 0],
    ['Reputation', skating.reputation]
  ];
  const condition = Math.round(skating.gear.condition || 0);
  const conditionColor = condition < 35 ? C.coral : condition < 65 ? C.gold : C.green;

  return (
    <section className="story-panel" style={{padding:'12px 13px',marginTop:10,borderColor:`${color}38`}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'flex-start',marginBottom:9}}>
        <div>
          <p style={{fontSize:9,color,fontWeight:900,letterSpacing:1.7,textTransform:'uppercase',margin:'0 0 4px'}}>{skating.brand}</p>
          <p style={{fontSize:15,color:C.text,fontWeight:950,margin:0}}>Skate Life</p>
        </div>
        <span style={{fontSize:9,color,border:`1px solid ${color}44`,background:`${color}12`,borderRadius:999,padding:'4px 7px',fontWeight:900}}>
          {disciplineName(skating.primaryDiscipline)}
        </span>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:9}}>
        {statRows.map(([label,value]) => (
          <div key={label} style={{minWidth:0,border:`1px solid ${color}20`,borderRadius:9,padding:'6px 7px',background:`${color}08`}}>
            <p style={{fontSize:8,color:C.faint,margin:'0 0 2px'}}>{label}</p>
            <p style={{fontSize:13,color:label === 'Reputation' ? C.gold : C.text,fontWeight:950,margin:0}}>{Math.round(value)}</p>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:7}}>
        <span style={{fontSize:9,color:C.faint,fontWeight:900,minWidth:80}}>Gear condition</span>
        <div style={{height:6,flex:1,borderRadius:999,background:'rgba(255,255,255,.08)',overflow:'hidden'}}>
          <div style={{height:'100%',width:`${condition}%`,background:conditionColor}} />
        </div>
        <span style={{fontSize:9,color:conditionColor,fontWeight:950}}>{condition}%</span>
      </div>

      <p style={{fontSize:10,color:condition < 35 ? C.coral : C.muted,lineHeight:1.45,margin:0,fontWeight:condition < 35 ? 900 : 650}}>
        {nextStep(game)}
      </p>
    </section>
  );
}
