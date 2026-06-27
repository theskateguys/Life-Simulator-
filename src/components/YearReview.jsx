import React from 'react';
import { C, SKILLS } from '../data/gameData.js';

export default function YearReview({game,island,fmt,onNext}) {
  const review = game.yearReview;
  const signedMoney = value => `${value >= 0 ? '+' : '-'}${fmt(Math.abs(value))}`;
  return <div style={{minHeight:'100vh',background:`linear-gradient(160deg,${C.bg},${C.bgM},${C.bg})`,color:C.text,padding:'24px 14px 48px'}}><div style={{maxWidth:500,margin:'0 auto'}}>
    <p style={{fontSize:11,color:C.gold,fontWeight:900,letterSpacing:2,textTransform:'uppercase',margin:'0 0 5px'}}>Age {game.age} complete</p>
    <h1 style={{fontSize:28,margin:'0 0 6px'}}>{review?.headline || 'Year Review'}</h1>
    <p style={{fontSize:13,lineHeight:1.8,color:C.muted,margin:'0 0 14px'}}>{review?.narrative}</p>
    <div style={{background:C.card,border:`1px solid ${C.gold}32`,padding:14,borderRadius:14,marginBottom:10}}>
      <p style={{color:C.gold,fontSize:10,fontWeight:900,letterSpacing:1.5,margin:'0 0 8px'}}>YEAR-END FINANCE</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{[
        ['Annual net',signedMoney(review?.annualNet || 0),review?.annualNet>=0?C.green:C.coral],['Cash',fmt(game.finance.cash),C.green],['Investments',fmt(game.finance.investments),C.turquoise],['Debt',fmt(game.finance.loanDebt+game.finance.mortgageDebt),C.coral]
      ].map(([label,value,color])=><div key={label} style={{background:`${color}0B`,borderRadius:9,padding:'8px'}}><p style={{fontSize:9,color:C.dim,margin:'0 0 2px'}}>{label}</p><p style={{fontWeight:900,fontSize:15,color,margin:0}}>{value}</p></div>)}</div>
    </div>
    <div style={{background:C.card,border:`1px solid ${C.violet}28`,padding:14,borderRadius:14,marginBottom:10}}>
      <p style={{color:C.violet,fontSize:10,fontWeight:900,letterSpacing:1.5,margin:'0 0 8px'}}>THIS YEAR</p>
      {game.yearLog.map((entry,index)=><div key={`${entry.id}-${index}`} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}><span style={{fontSize:9,color:C.faint,minWidth:24}}>{entry.month}</span><span>{entry.emoji}</span><span style={{fontSize:11,color:entry.isEvent?C.gold:C.muted,fontWeight:entry.isEvent?800:600}}>{entry.label}</span></div>)}
    </div>
    <div style={{background:`${C.turquoise}0D`,border:`1px solid ${C.turquoise}2A`,padding:'11px 12px',borderRadius:12,marginBottom:12}}><p style={{fontSize:10,color:C.faint,letterSpacing:1.2,margin:'0 0 3px'}}>NEXT YEAR NEEDS</p><p style={{fontSize:12,color:C.turquoise,fontWeight:700,lineHeight:1.55,margin:0}}>{review?.need}</p></div>
    <p style={{fontSize:11,color:C.dim,fontStyle:'italic',textAlign:'center',lineHeight:1.6,margin:'0 8px 16px'}}>“{review?.proverb}”</p>
    <button onClick={onNext} style={{width:'100%',padding:15,border:0,borderRadius:13,fontWeight:900,fontSize:15,cursor:'pointer',background:`linear-gradient(135deg,${C.gold},#E8B800)`,color:'#08131A'}}>Begin Age {game.age+1} →</button>
  </div></div>;
}
