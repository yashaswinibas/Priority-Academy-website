@echo off
title Priority Academy - Push to GitHub
cd /d "%~dp0"
if not exist .git (
  git init -b main
  git remote add origin https://github.com/yashaswinibas/Priority-Academy-website.git
)
git add -A
git commit -m "Update Priority Academy website"
git push -u origin main --force
echo.
echo === Done. Check https://github.com/yashaswinibas/Priority-Academy-website ===
pause
