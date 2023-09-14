@echo off
:loop
npm i & git pull & npm run build & npm run start
goto loop