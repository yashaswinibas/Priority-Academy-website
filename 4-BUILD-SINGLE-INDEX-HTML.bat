@echo off
title Priority Academy - Build single index.html
cd /d "%~dp0"
if not exist node_modules call npm install
call npm run build:single
copy /Y priority-academy.html index-for-hostinger.html >nul
echo.
echo === index-for-hostinger.html is ready (one file) ===
echo Rename it to index.html and upload it to public_html.
start "" index-for-hostinger.html
pause
