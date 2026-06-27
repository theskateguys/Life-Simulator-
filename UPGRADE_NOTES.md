# Island Life v4 — Core Upgrade Notes

## Critical gameplay fixes

- Every previously exploitable zero-focus action is limited to one use per year or now costs focus.
- The business loan adds the $8,000 cash once and records exactly $8,000 in loan debt.
- Selling a property removes one actual property, clears its mortgage share, and only then adds sale cash.
- Event choices now show a full outcome screen before gameplay resumes.
- Year-end calculations are made from one final game snapshot, then that exact snapshot is saved.
- Choosing an heir now uses the child actually selected.
- Context, static, brand, and migration events resolve through local return logic so one event cannot overwrite another.
- A year can only be wrapped after all 10 focus points are used.

## Systems added or rebuilt

- Finance: cash, investments, property value, mortgage debt, business revenue, business expenses, loan debt, monthly income, monthly expenses, emergency fund target, time-limited contracts, and net worth.
- Investments compound annually instead of paying an instant return.
- Mortgages and loans are amortised annually.
- Brand contracts expire after their stated term; they do not become permanent income.
- Island profiles now control currency, income multiplier, cost of living, property cost, rental income, weather risk, local festival, and a unique local event.
- Migration choices create a temporary earning-path multiplier with relationship trade-offs.
- Parents, siblings, partners, and children age each year. Partner relationships naturally drift based on stress and family investment.
- A new-child choice is limited to once per age. The child-school event cannot appear without children.
- Locked actions remain visible and state their exact requirements and current progress.
- Achievements are checked after actions, events, and year-end settlement.

## Source map

- `src/data/gameData.js` — islands, actions, events, careers, achievements.
- `src/engine/gameLogic.js` — all financial calculations, saves, action rules, event rules, annual settlement, family aging, and generational logic.
- `src/components/` — reusable interface components.
- `src/App.jsx` — screen flow and game interface composition.
