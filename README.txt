ISLAND LIFE v4 — UPDATED BUILD
===============================

PLAY WITHOUT NODE / NPM
-----------------------
Double-click the separate file:
  Island Life v4 — Complete Update - COMPLETE UPDATE.html

Use Chrome or Microsoft Edge. It works without a terminal.

EDIT THE GAME CODE
------------------
1. Open this project folder in VS Code.
2. Double-click RUN-GAME.bat, OR run these commands in a terminal opened INSIDE this folder:

   npm install
   npm run dev

This project is configured to use the normal public npm registry.
Do not run npm commands from C:\Windows\System32.

CODE STRUCTURE
--------------
src/data/gameData.js          Islands, actions, events, careers, achievements
src/engine/gameLogic.js       Finance, saves, annual settlement, family, rules
src/components/               Event, outcome, finance, family, action, review UI
src/App.jsx                   Screen flow and UI composition
