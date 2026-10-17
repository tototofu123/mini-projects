@echo off
cd /d "%~dp0"
if exist "dist\JumpingGame.exe" (
    start "" "dist\JumpingGame.exe"
) else (
    py -3.12 game.py
)
