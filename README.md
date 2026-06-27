# Island Life v4

Island Life is a Caribbean life-simulator game built with React and Vite. The current build is a browser game with local saves, finance systems, island-specific events, careers, business, property, family, achievements, and generational legacy play.

## Run Locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://127.0.0.1:5173/`.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

- `src/App.jsx` - screen flow and main UI composition
- `src/data/gameData.js` - islands, actions, events, careers, achievements, names, colors
- `src/engine/gameLogic.js` - rules, saves, finance, annual settlement, events, death, generations
- `src/components/` - reusable UI panels and modals

## Development Direction

The project should stay as a source-controlled web game first. Once the core loop is stable and tested, it can be wrapped for Android and iOS using Capacitor or rebuilt in a mobile game engine if the scope grows beyond web UI.
