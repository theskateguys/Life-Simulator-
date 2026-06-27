import React from 'react';
import { C, SKILLS } from '../data/gameData.js';

export default function ActionCard({action,color,status,onChoose,fmt}) {
  const disabled = !status.ok;
  return <button onClick={()=>status.ok && onChoose(action)} disabled={disabled} style={{textAlign:'left',padding:'12px 13px',borderRadius:13,border:`1px solid ${disabled?'rgba(255,255,255,0.12)':`${color}48`}`,background:disabled?'rgba(255,255,255,0.025)':`${color}0C`,color:C.text,opacity:disabled?0.55:1,cursor:disabled?'not-allowed':'pointer'}}>
    <div style={{display:'flex',gap:7,justifyContent:'space-between',alignItems:'center'}}>
      <p style={{fontWeight:800,fontSize:13,margin:0}}>{action.emoji} {action.label}</p>
      <span style={{fontSize:9,fontWeight:800,color:action.cost>0?C.gold:C.dim,border:`1px solid ${action.cost>0?C.gold:C.faint}44`,borderRadius:7,padding:'2px 5px'}}>{action.cost>0?`● ${action.cost}`:'0 focus'}</span>
    </div>
    <p style={{fontSize:11,lineHeight:1.45,color:C.dim,margin:'5px 0 6px'}}>{action.desc}</p>
    {!status.ok && <div style={{background:`${C.coral}10`,border:`1px solid ${C.coral}25`,borderRadius:8,padding:'5px 7px',marginBottom:6}}>{status.lines.map(line=><p key={line} style={{margin:0,fontSize:9,color:C.coral}}>🔒 {line}</p>)}</div>}
    {action.ym != null && <p style={{fontSize:9,color:C.faint,margin:'0 0 5px'}}>Year limit: {action.ym}</p>}
    <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
      {Object.entries(action.changes || {}).filter(([,value])=>value !== 0).map(([key,value])=>{
        const positive = value > 0;
        return <span key={key} style={{fontSize:9,fontWeight:800,borderRadius:5,padding:'2px 5px',color:positive?C.green:C.coral,background:positive?`${C.green}13`:`${C.coral}13`}}>{key === 'cash' ? `${positive?'+':'-'}${fmt(Math.abs(value))}` : `${positive?'+':''}${value} ${key}`}</span>;
      })}
      {Object.entries(action.skills || {}).filter(([,value])=>value>0).map(([key,value])=><span key={key} style={{fontSize:9,fontWeight:800,borderRadius:5,padding:'2px 5px',color:C.violet,background:`${C.violet}13`}}>+{value} {SKILLS.find(skill=>skill.id===key)?.emoji} {key}</span>)}
    </div>
  </button>;
}
