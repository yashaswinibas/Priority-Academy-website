@echo off
title Priority Academy - Make Hostinger upload zip
cd /d "%~dp0"
if not exist node_modules call npm install
call npm run build
if exist hostinger-upload.zip del hostinger-upload.zip
cd dist
tar -a -c -f ..\hostinger-upload.zip *  .htaccess
cd ..
echo.
echo === hostinger-upload.zip created in this folder ===
echo Upload it to public_html in Hostinger, then right-click - Extract - here.
pause
