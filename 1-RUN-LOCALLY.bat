@echo off
title Priority Academy - Local preview
cd /d "%~dp0"
echo.
echo === Priority Academy: installing (first time only) ===
if not exist node_modules call npm install
echo.
echo === Building website ===
call npm run build
echo.
echo === Opening http://localhost:4173  (close this window to stop) ===
start "" http://localhost:4173
call npm run preview -- --port 4173
pause
