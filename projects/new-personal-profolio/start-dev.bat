@echo off
cd /d "%~dp0"
echo ========================================
echo   Toto's Portfolio - Enhanced Edition
echo ========================================
echo.
start "" "http://localhost:5173"
npm run dev
