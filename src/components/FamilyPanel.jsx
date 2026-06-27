import React from 'react';
import { C } from '../data/gameData.js';

export default function FamilyPanel({game}) {
  const family = game.family;
  if (!family) return null;
  return <div style={{background:C.card,border:`1px solid ${C.pink}30`,borderRadius:13,padding:'12px 13px',marginBottom:8}}>
    <p style={{color:C.pink,fontSize:10,letterSpacing:1.8,fontWeight:900,margin:'0 0 8px'}}>👨‍👩‍👧 FAMILY</p>
    {[['👴',family.father],['👵',family.mother]].map(([emoji,person])=><div key={person.name} style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{fontSize:11,color:C.muted}}>{emoji} {person.name}</span><span style={{fontSize:10,color:person.alive?C.dim:C.coral}}>{person.alive?`Age ${person.age} · ❤️${Math.round(person.health)}`:'Passed away'}</span></div>)}
    {family.siblings.map(sibling=><div key={sibling.name} style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:10,color:C.dim}}>🧑 {sibling.name}</span><span style={{fontSize:10,color:C.faint}}>Age {sibling.age}</span></div>)}
    {game.partner && <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:7,marginTop:7,display:'flex',justifyContent:'space-between'}}><span style={{fontSize:11,color:C.pink}}>❤️ {game.partner.name}{game.partner.married?' · married':''}</span><span style={{fontSize:10,color:C.pink}}>Age {game.partner.age} · {Math.round(game.partner.relationship)}%</span></div>}
    {game.children.length > 0 && <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:7,marginTop:7}}>{game.children.map(child=><div key={child.id} style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:10,color:C.gold}}>🧒 {child.name}</span><span style={{fontSize:10,color:C.gold}}>Age {child.age}</span></div>)}</div>}
    {!game.partner && <p style={{fontSize:10,color:C.faint,margin:'8px 0 0'}}>Use “Make Space for Love” under LIFE to begin a relationship.</p>}
  </div>;
}
