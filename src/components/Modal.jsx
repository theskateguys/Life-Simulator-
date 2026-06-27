import React from 'react';
import { C } from '../data/gameData.js';

// Map event category to severity for visual treatment
function getSeverityStyle(event) {
  const sev = event.sev || 'normal';
  const cat = (event.category || '').toUpperCase();
  // Derive from explicit sev field OR from category name
  const isDanger  = sev === 'DANGER'  || cat === 'DANGER' || cat === 'HEALTH';
  const isCrisis  = sev === 'CRISIS';
  const isProfit  = sev === 'PROFIT'  || cat === 'OPPORTUNITY' || cat === 'FINANCE';
  const isDrama   = sev === 'DRAMA'   || cat === 'WORKPLACE' || cat === 'FRIENDS';
  const isFamily  = cat === 'FAMILY'  || cat === 'FRIENDS';

  if (isCrisis) return {
    bg:'linear-gradient(160deg,#160308,#07131F,#160308)',
    hdr:C.red, badge:`${C.red}22`, badgeBd:`${C.red}66`,
    cardBd:`${C.red}45`, cardBg:`${C.red}07`, pulse:true,
    barColor:C.red, btnFirst:`${C.red}15`
  };
  if (isDanger) return {
    bg:'linear-gradient(160deg,#140608,#07131F,#140608)',
    hdr:C.coral, badge:`${C.coral}18`, badgeBd:`${C.coral}55`,
    cardBd:`${C.coral}38`, cardBg:`${C.coral}06`, pulse:false,
    barColor:C.coral, btnFirst:`${C.coral}12`
  };
  if (isProfit) return {
    bg:'linear-gradient(160deg,#081408,#07131F,#081408)',
    hdr:C.gold, badge:`${C.gold}18`, badgeBd:`${C.gold}55`,
    cardBd:`${C.gold}35`, cardBg:`${C.gold}06`, pulse:false,
    barColor:C.gold, btnFirst:`${C.gold}15`
  };
  if (isDrama) return {
    bg:'linear-gradient(160deg,#0E0818,#07131F,#0E0818)',
    hdr:C.violet, badge:`${C.violet}18`, badgeBd:`${C.violet}55`,
    cardBd:`${C.violet}35`, cardBg:`${C.violet}06`, pulse:false,
    barColor:C.violet, btnFirst:`${C.violet}12`
  };
  if (isFamily) return {
    bg:'linear-gradient(160deg,#120610,#07131F,#120610)',
    hdr:C.pink, badge:`${C.pink}18`, badgeBd:`${C.pink}55`,
    cardBd:`${C.pink}32`, cardBg:`${C.pink}05`, pulse:false,
    barColor:C.pink, btnFirst:`${C.pink}10`
  };
  // Default
  const accent = event.accent || C.gold;
  return {
    bg:'linear-gradient(160deg,#10283A,#07131F)',
    hdr:accent, badge:`${accent}18`, badgeBd:`${accent}55`,
    cardBd:`${accent}35`, cardBg:`${accent}06`, pulse:false,
    barColor:accent, btnFirst:`${accent}10`
  };
}

export function Modal({children, accent=C.gold, onClose, dismissible=false}) {
  return (
    <div
      style={{position:'fixed',inset:0,zIndex:100,background:'rgba(0,0,0,0.72)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:14}}
      onClick={dismissible ? onClose : undefined}
    >
      <div
        onClick={event=>event.stopPropagation()}
        style={{width:'100%',maxWidth:460,maxHeight:'92vh',overflowY:'auto',background:'linear-gradient(160deg,#10283A,#07131F)',border:`1px solid ${accent}66`,borderRadius:20,boxShadow:`0 20px 70px ${accent}25`,padding:18}}
      >
        {children}
      </div>
    </div>
  );
}

export function EventModal({event, onChoose}) {
  if (!event) return null;
  const sv = getSeverityStyle(event);
  const isCritical = sv.pulse;

  return (
    <div style={{position:'fixed',inset:0,zIndex:100,background:'rgba(0,0,0,0.80)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',padding:14}}>
      <div
        onClick={e=>e.stopPropagation()}
        style={{
          width:'100%',maxWidth:460,maxHeight:'92vh',overflowY:'auto',
          background:sv.bg,
          border:`${isCritical?2:1}px solid ${sv.badgeBd}`,
          borderRadius:20,padding:18,
          boxShadow:`0 20px 70px ${sv.hdr}30${isCritical?', 0 0 0 3px rgba(255,60,60,0.18)':''}`
        }}
      >
        {/* Urgency bar for CRISIS/DANGER */}
        {(isCritical || event.sev === 'DANGER') && (
          <div style={{height:3,marginBottom:14,borderRadius:2,background:`linear-gradient(90deg,transparent,${sv.barColor},transparent)`,opacity:0.8}}/>
        )}

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:14}}>
          <div style={{fontSize:44,filter:`drop-shadow(0 0 14px ${sv.hdr}66)`}}>{event.icon}</div>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:sv.badge,border:`1px solid ${sv.badgeBd}`,borderRadius:20,padding:'4px 14px',margin:'8px 0 5px'}}>
            <span style={{fontSize:10,fontWeight:800,color:sv.hdr,letterSpacing:1.5,textTransform:'uppercase'}}>{event.category}</span>
            {isCritical && <span style={{fontSize:9,fontWeight:900,color:C.red,letterSpacing:1}}>⚠ CRITICAL</span>}
            {event.sev === 'PROFIT' && <span style={{fontSize:9,fontWeight:900,color:C.gold}}>★</span>}
          </div>
          <h2 style={{fontSize:22,lineHeight:1.1,margin:0,color:isCritical?C.red:event.sev==='DANGER'?C.coral:C.text}}>{event.title}</h2>
        </div>

        {/* Story */}
        <div style={{background:sv.cardBg,border:`1px solid ${sv.cardBd}`,borderRadius:13,padding:'14px 15px',marginBottom:12}}>
          <p style={{fontSize:13,lineHeight:1.8,color:C.muted,margin:0}}>{event.story}</p>
        </div>

        {/* Tip */}
        {event.tip && (
          <div style={{background:`${sv.hdr}0D`,border:`1px solid ${sv.hdr}2A`,borderRadius:11,padding:'9px 10px',marginBottom:14}}>
            <p style={{fontSize:11,lineHeight:1.55,color:sv.hdr,margin:0}}>💡 {event.tip}</p>
          </div>
        )}

        {/* Choices */}
        <p style={{fontSize:9,color:C.faint,letterSpacing:2,textTransform:'uppercase',margin:'0 0 8px'}}>Choose your response</p>
        <div style={{display:'flex',flexDirection:'column',gap:9}}>
          {event.choices.map((choice, index) => (
            <button
              key={`${choice.label}-${index}`}
              onClick={() => onChoose(choice)}
              style={{
                textAlign:'left',cursor:'pointer',borderRadius:13,padding:'12px 14px',color:C.text,
                border:`1px solid ${sv.hdr}${index===0?'55':'35'}`,
                background:`${sv.hdr}${index===0?'0F':'08'}`
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=`${sv.hdr}20`;e.currentTarget.style.borderColor=`${sv.hdr}80`;}}
              onMouseLeave={e=>{e.currentTarget.style.background=`${sv.hdr}${index===0?'0F':'08'}`;e.currentTarget.style.borderColor=`${sv.hdr}${index===0?'55':'35'}`;}}
            >
              <span style={{display:'block',fontWeight:800,fontSize:12,lineHeight:1.5}}>{choice.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OutcomeModal({outcome, onContinue, fmt}) {
  if (!outcome) return null;
  const changes = Object.entries(outcome.changes || {}).filter(([,value])=>value !== 0);
  return (
    <Modal accent={outcome.accent || C.green}>
      <div style={{textAlign:'center',marginBottom:12}}>
        <div style={{fontSize:40}}>{outcome.icon || '📖'}</div>
        <p style={{fontSize:10,fontWeight:800,color:outcome.accent||C.green,letterSpacing:2,textTransform:'uppercase',margin:'6px 0 3px'}}>Decision outcome</p>
        <h2 style={{fontSize:22,margin:0}}>{outcome.title}</h2>
      </div>
      <p style={{color:C.muted,fontSize:13,lineHeight:1.75,margin:'0 0 12px'}}>{outcome.text}</p>
      {changes.length > 0 && (
        <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:12}}>
          {changes.map(([key,value])=>{
            const positive = value > 0;
            const label = key === 'cash' ? `${positive?'+':'-'}${fmt(Math.abs(value))}` : `${positive?'+':''}${value} ${key}`;
            return (
              <span key={key} style={{fontSize:10,fontWeight:800,color:positive?C.green:C.coral,background:positive?`${C.green}16`:`${C.coral}16`,border:`1px solid ${positive?C.green:C.coral}35`,borderRadius:8,padding:'4px 7px'}}>
                {label}
              </span>
            );
          })}
        </div>
      )}
      {outcome.achievements?.length > 0 && (
        <div style={{background:`${C.gold}10`,border:`1px solid ${C.gold}35`,padding:'10px 11px',borderRadius:11,marginBottom:12}}>
          <p style={{fontSize:10,color:C.gold,fontWeight:900,letterSpacing:1,textTransform:'uppercase',margin:'0 0 5px'}}>Achievement unlocked</p>
          {outcome.achievements.map(item=>(
            <p key={item.id} style={{fontSize:12,color:C.text,fontWeight:700,margin:'3px 0'}}>{item.emoji} {item.title}</p>
          ))}
        </div>
      )}
      <button
        onClick={onContinue}
        style={{width:'100%',padding:13,borderRadius:12,cursor:'pointer',border:'none',fontWeight:900,fontSize:14,background:`linear-gradient(135deg,${outcome.accent||C.green},${C.gold})`,color:'#06121A'}}
      >
        Continue →
      </button>
    </Modal>
  );
}
