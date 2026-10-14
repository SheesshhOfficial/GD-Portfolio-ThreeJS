@echo off
setlocal
title Starting Game Dev Portfolio...

:: Change directory to script folder
cd /d "%~dp0"

echo ========================================================
echo   Launching Ashish Ranjan - Game Dev Portfolio
echo ========================================================
echo.

:: Open browser after a brief delay so Vite can initialize
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5173"

:: Start the Vite development server
npm run dev

pause
