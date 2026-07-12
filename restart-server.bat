@echo off
REM Restart ONLY the server window (WIFI-Server). Tunnel window untouched.
REM Use: when you want to restart server but keep phone URL working.

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ========================================
echo   Restart server ONLY (tunnel stays alive)
echo ========================================

REM [1/3] Kill ONLY the WIFI-Server window (tunnel window WIFI-Tunnel NOT matched)
echo [1/3] Closing server window "WIFI-Server" ...
taskkill /FI "WindowTitle eq WIFI-Server*" /T /F >nul 2>nul
echo   Done.
timeout /t 1 /nobreak >nul

REM [2/3] Clean port 8000 (only the port holder, NEVER lt)
echo [2/3] Cleaning port 8000 ...
set "PORT_PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":8000 " ^| findstr LISTENING') do set "PORT_PID=%%P"
if defined PORT_PID (
  echo   Killing stale PID=!PORT_PID! on 8000
  taskkill /PID !PORT_PID! /F >nul 2>nul
  timeout /t 1 /nobreak >nul
  echo   [OK] Port clean.
)
if not defined PORT_PID echo   [OK] Port 8000 already free.

REM [3/3] Start watch.js in a new window with the SAME title
echo [3/3] Starting new WIFI-Server window ...
start "WIFI-Server" cmd /k "cd /d %~dp0 && echo === Server Window (watch.js + serve.js) === && echo Close this window to stop the server. Tunnel is NOT affected. && echo. && node watch.js"
echo   [OK] New server window started.

echo.
echo Done. WIFI-Tunnel window was NOT touched - phone URL still works.
echo.
pause
