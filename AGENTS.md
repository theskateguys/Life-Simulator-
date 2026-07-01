# Island Life v4 — Codex Working Rules

## Project structure

* `src/App.jsx`: screen flow, game state wiring, UI composition.
* `src/data/gameData.js`: islands, backgrounds, actions, events, achievements, brands, content data.
* `src/engine/gameLogic.js`: all game rules, finance, action processing, events, saving, year-end settlement, generations.
* `src/components/`: presentation components only.
* `src/engine/gameLogic.test.js`: core regression tests.

## Required commands

* `npm test`
* `npm run build`

## Non-negotiable rules

* Inspect relevant files before editing.
* Make the smallest safe change for the requested task.
* Do not rewrite unrelated systems or redesign the UI unless requested.
* Do not add dependencies unless necessary.
* Keep game logic inside `gameLogic.js` and game content inside `gameData.js`.
* Use `cash`, never `money`, for financial changes.
* Keep finance values in `game.finance`.
* Keep engine functions pure where possible; do not mutate the input game object.
* Preserve local save compatibility. New saved-state fields need safe defaults for older saves.
* Event rewards may use `changes.fame` or legacy top-level `fame`; both must remain supported.
* Do not remove existing events, actions, achievements, or islands unless explicitly asked.
* Every gameplay-rule change must add or update a focused test in `gameLogic.test.js`.
* Always run `npm test` and `npm run build` before committing.
* Use one focused commit per task.
* Report changed files, tests run, build result, and known limitations.

## UX rules

* Mobile-first and touch-friendly.
* Keep text readable and avoid crowded screens.
* Locked options should explain exactly what the player needs.
* Important choices should show a clear outcome.
* Preserve the Caribbean life-simulator identity; avoid generic corporate or fantasy styling.
