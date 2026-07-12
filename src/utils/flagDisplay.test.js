import { describe, expect, it } from 'vitest';
import { getFlagDisplay, splitLeadingFlag } from './flagDisplay.js';

describe('flag display metadata', () => {
  it('maps playable island flags to local assets', () => {
    expect(getFlagDisplay('🇯🇲')).toEqual({code:'JM', asset:'flags/jamaica.svg'});
    expect(getFlagDisplay('🇹🇹')).toEqual({code:'TT', asset:'flags/trinidad-and-tobago.svg'});
    expect(getFlagDisplay('🇧🇧')).toEqual({code:'BB', asset:'flags/barbados.svg'});
    expect(getFlagDisplay('🇩🇴')).toEqual({code:'DO', asset:'flags/dominican-republic.svg'});
    expect(getFlagDisplay('🇱🇨')).toEqual({code:'LC', asset:'flags/saint-lucia.svg'});
  });

  it('provides safe text fallbacks for migration flags', () => {
    expect(getFlagDisplay('🇨🇦')).toEqual({code:'CA'});
    expect(getFlagDisplay('🇬🇧')).toEqual({code:'UK'});
    expect(getFlagDisplay('🇺🇸')).toEqual({code:'US'});
  });

  it('splits a leading country flag without altering the saved choice label', () => {
    expect(splitLeadingFlag('🇨🇦 Canada pathway')).toEqual({flag:'🇨🇦', code:'CA', label:'Canada pathway'});
    expect(splitLeadingFlag('🌴 Regional opportunity')).toBeNull();
  });
});
