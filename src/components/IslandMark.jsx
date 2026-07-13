const ISLAND_MARKS = {
  jamaica:'JM',
  trinidad:'TT',
  barbados:'BB',
  dominican:'DO',
  stlucia:'LC',
  custom:'IS'
};

export default function IslandMark({island, className = '', style = {}}) {
  const islandId = typeof island === 'string' ? island : island?.id;
  const islandName = typeof island === 'string' ? island : island?.name;
  const code = ISLAND_MARKS[islandId] || (islandName || 'Island').slice(0, 2).toUpperCase();
  const classes = ['island-mark', className].filter(Boolean).join(' ');

  return (
    <span className={classes} aria-label={islandName || 'Island'} title={islandName || 'Island'} style={style}>
      {code}
    </span>
  );
}
