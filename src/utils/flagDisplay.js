const FLAG_METADATA = Object.freeze({
  '🇯🇲': { code: 'JM', asset: 'flags/jamaica.svg' },
  '🇹🇹': { code: 'TT', asset: 'flags/trinidad-and-tobago.svg' },
  '🇧🇧': { code: 'BB', asset: 'flags/barbados.svg' },
  '🇩🇴': { code: 'DO', asset: 'flags/dominican-republic.svg' },
  '🇱🇨': { code: 'LC', asset: 'flags/saint-lucia.svg' },
  '🇨🇦': { code: 'CA' },
  '🇬🇧': { code: 'UK' },
  '🇺🇸': { code: 'US' }
});

function isRegionalIndicator(character) {
  const codePoint = character?.codePointAt(0);
  return codePoint >= 0x1F1E6 && codePoint <= 0x1F1FF;
}

export function getFlagDisplay(flag) {
  return FLAG_METADATA[flag] || null;
}

export function splitLeadingFlag(text = '') {
  const characters = [...text];
  if (characters.length < 2 || !isRegionalIndicator(characters[0]) || !isRegionalIndicator(characters[1])) return null;

  const flag = characters.slice(0, 2).join('');
  const display = getFlagDisplay(flag);
  if (!display) return null;

  return {
    flag,
    label: characters.slice(2).join('').trimStart(),
    ...display
  };
}
