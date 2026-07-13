import React from 'react';
import { C, CAREERS } from '../data/gameData.js';
import IslandMark from './IslandMark.jsx';

const statusColor = (key,value) => {
  if (key === 'stress') return value > 65 ? C.coral : value > 35 ? C.gold : C.green;
  return value > 60 ? C.green : value > 30 ? C.gold : C.coral;
};

export default function StatHeader({game, island, finance, fmt}) {
  const fame = game.followers > 0 ? game.followers.toLocaleString() : null;
  const monthlyNet = finance.monthlyIncome - finance.monthlyExpenses;
  const signedMoney = value => `${value >= 0 ? '+' : '-'}${fmt(Math.abs(value))}`;
  return <div style={{position:'sticky',top:0,zIndex:30,background:'rgba(4,10,20,0.97)',backdropFilter:'blur(18px)',borderBottom:'1px solid rgba(255,255,255,0.09)',padding:'10px 14px'}}>
    <div style={{maxWidth:540,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10,marginBottom:8}}>
        <div>
          <p style={{fontWeight:900,color:C.gold,fontSize:14,margin:'0 0 2px',display:'inline-flex',alignItems:'center',gap:6}}><IslandMark island={island} className="island-mark--inline" /> {game.name}{game.generation>1?` · Gen ${game.generation}`:''}</p>
          <p style={{color:C.dim,fontSize:10,margin:0}}>Age {game.age} · {CAREERS[game.career]?.emoji} {CAREERS[game.career]?.label}{game.careerLevel>0?` Lv${game.careerLevel}`:''}{game.migration?` · ${game.migration.label}`:''}</p>
        </div>
        <div style={{textAlign:'right'}}>
          <p style={{fontWeight:900,fontSize:20,margin:'0 0 1px',color:finance.cash>10000?C.green:finance.cash>2000?C.gold:C.coral}}>{fmt(finance.cash)}</p>
          <p style={{color:monthlyNet>=0?C.green:C.coral,fontSize:9,margin:0}}>{signedMoney(monthlyNet)}/month</p>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
        {[['😊','Joy','happiness',C.gold],['❤️','Health','health',C.coral],['🧠','Stress','stress',C.violet],['🤝','Social','relationships',C.turquoise]].map(([emoji,label,key,accent])=>{
          const value = Math.round(game.stats[key]);
          return <div key={key} style={{background:`${accent}09`,border:`1px solid ${accent}1F`,borderRadius:9,padding:'5px 6px'}}>
            <p style={{fontSize:8,color:C.dim,margin:'0 0 1px'}}>{emoji} {label}</p>
            <p style={{fontSize:12,fontWeight:900,color:statusColor(key,value),margin:'0 0 3px'}}>{value}</p>
            <div style={{height:2,borderRadius:1,background:'rgba(255,255,255,0.08)',overflow:'hidden'}}><div style={{height:2,width:`${value}%`,background:statusColor(key,value)}} /></div>
          </div>;
        })}
      </div>
      {fame && <p style={{fontSize:9,color:C.violet,margin:'6px 0 0'}}>📱 {fame} followers · {game.finance.contracts.length} active campaign{game.finance.contracts.length===1?'':'s'}</p>}
    </div>
  </div>;
}
