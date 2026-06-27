@echo off
cd /d "%~dp0"
echo Island Life v4
if not exist node_modules (
  echo Installing project dependencies from public npm...
  call npm install --registry=https://registry.npmjs.org/
  if errorlevel 1 (
    echo Installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
call npm run dev
pause
