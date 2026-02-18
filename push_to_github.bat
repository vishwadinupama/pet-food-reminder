@echo off
echo Initializing Git repository...
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/vishwadinupama/pet-food-reminder.git
echo Pushing to GitHub...
git push -u origin main
pause
