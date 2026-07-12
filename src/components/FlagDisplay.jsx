import { useState } from 'react';
import { getFlagDisplay, splitLeadingFlag } from '../utils/flagDisplay.js';

function FlagFallback({ code, label, size }) {
  return (
    <span
      role="img"
      aria-label={`${label} flag fallback`}
      style={{
        width:size,
        height:Math.round(size * 0.68),
        borderRadius:Math.max(3, Math.round(size * 0.14)),
        border:'1px solid rgba(255,255,255,.28)',
        background:'rgba(255,255,255,.10)',
        color:'inherit',
        display:'inline-flex',
        alignItems:'center',
        justifyContent:'center',
        flex:'0 0 auto',
        fontSize:Math.max(7, Math.round(size * 0.36)),
        fontWeight:900,
        lineHeight:1,
        letterSpacing:'.04em'
      }}
    >
      {code}
    </span>
  );
}

export default function FlagDisplay({ flag, label = 'Country', size = 28 }) {
  const [failed, setFailed] = useState(false);
  const display = getFlagDisplay(flag);

  if (!display) return <span aria-hidden="true" style={{fontSize:size,lineHeight:1}}>{flag}</span>;
  if (!display.asset || failed) return <FlagFallback code={display.code} label={label} size={size} />;

  return (
    <img
      src={`${import.meta.env.BASE_URL}${display.asset}`}
      alt={`${label} flag`}
      width={size}
      height={Math.round(size * 0.68)}
      onError={() => setFailed(true)}
      style={{display:'inline-block',objectFit:'cover',borderRadius:Math.max(2,Math.round(size * 0.09)),boxShadow:'0 1px 4px rgba(0,0,0,.3)',flex:'0 0 auto'}}
    />
  );
}

export function FlagLabel({ text }) {
  const parsed = splitLeadingFlag(text);
  if (!parsed) return text;

  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:7}}>
      <FlagDisplay flag={parsed.flag} label={parsed.label || parsed.code} size={18} />
      <span>{parsed.label}</span>
    </span>
  );
}
