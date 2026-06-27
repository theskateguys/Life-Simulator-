import React from 'react';
import { C } from '../data/gameData.js';

export default function FinancePanel({game,finance,island,fmt}) {
  const rows = [
    ['Cash',fmt(finance.cash),C.green],['Investments',fmt(finance.investments),C.turquoise],['Property value',fmt(finance.propertyValue),C.teal],['Mortgage debt',fmt(finance.mortgageDebt),C.coral],['Loan debt',fmt(finance.loanDebt),C.coral],['Business revenue',fmt(finance.businessRevenue)+'/mo',C.orange],['Business costs',fmt(finance.businessExpenses)+'/mo',C.coral],['Monthly income',fmt(finance.monthlyIncome),C.green],['Monthly expenses',fmt(finance.monthlyExpenses),C.gold],['Emergency target',fmt(finance.emergencyFundTarget),C.violet]
  ];
  const netWorth = Math.max(0,finance.cash+finance.investments+finance.propertyValue-finance.mortgageDebt-finance.loanDebt);
  return <div style={{background:C.card,border:`1px solid ${C.green}30`,borderRadius:13,padding:'12px 13px',marginBottom:8}}>
    <p style={{color:C.green,fontSize:10,letterSpacing:1.8,fontWeight:900,margin:'0 0 8px'}}>📊 REAL FINANCE DASHBOARD</p>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',columnGap:12,rowGap:7}}>{rows.map(([label,value,color])=><div key={label} style={{display:'flex',justifyContent:'space-between',gap:6}}><span style={{fontSize:10,color:C.dim}}>{label}</span><span style={{fontSize:10,color,fontWeight:800,textAlign:'right'}}>{value}</span></div>)}</div>
    <div style={{marginTop:10,padding:'8px 10px',borderRadius:9,background:`${C.gold}0D`,border:`1px solid ${C.gold}24`,display:'flex',justifyContent:'space-between'}}><span style={{fontSize:10,color:C.gold,fontWeight:800}}>Net worth</span><span style={{fontSize:13,color:C.gold,fontWeight:900}}>{fmt(netWorth)}</span></div>
    {game.finance.contracts.length > 0 && <p style={{fontSize:10,color:C.violet,margin:'9px 0 0'}}>Campaigns: {game.finance.contracts.map(contract=>`${contract.name} (${contract.yearsLeft}yr)`).join(' · ')}</p>}
  </div>;
}
