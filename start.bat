@echo off
REM One-click: start server + tunnel in TWO INDEPENDENT windows.
REM They do not affect each other. Close either one independently.
REM
REM Architecture:
REM   Window "WIFI-Server"  -> node watch.js (which spawns serve.js)
REM   Window "WIFI-Tunnel"  -> lt (localtunnel client)
REM
REM Usage: double-click, or run  start.bat [port] [subdomain]
REM   e.g.  start.bat 8000 cwna-lvyq-2026

setlocal enabledelayedexpansion
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"
set "SUBDOMAIN=%~2"
if "%SUBDOMAIN%"=="" set "SUBDOMAIN=cwna-lvyq-2026"

cd /d "%~dp0"

REM check node
where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] node not found. Please install Node.js first.
  pause
  exit /b 1
)

REM check localtunnel
where lt >nul 2>nul
if errorlevel 1 (
  echo [ERROR] lt not found. Install it:  npm i -g localtunnel
  pause
  exit /b 1
)

echo ========================================
echo   Starting TWO independent windows:
echo     [1] WIFI-Server  : node watch.js
echo     [2] WIFI-Tunnel  : lt (localtunnel)
echo ========================================
echo   PORT      : %PORT%
echo   SUBDOMAIN : %SUBDOMAIN% (requested)
echo   NOTE      : Real URL is the one lt prints as "your url is:"
echo ========================================
echo.
echo Tunnel password (public IP) - run in another terminal:
echo   curl https://loca.lt/mytunnelpassword
echo.

REM === Cleanup any old instances of BOTH windows (fresh start) ===
echo [CLEANUP] Closing old WIFI-Server and WIFI-Tunnel windows if any ...
taskkill /FI "WindowTitle eq WIFI-Server*" /T /F >nul 2>nul
taskkill /FI "WindowTitle eq WIFI-Tunnel*" /T /F >nul
timeout /t 1 /nobreak >nul

REM Also free port 8000 in case a stray process holds it
set "PORT_PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":%PORT% " ^| findstr LISTENING') do set "PORT_PID=%%P"
if defined PORT_PID (
  echo [CLEANUP] Killing stale PID=!PORT_PID! on port %PORT%
  taskkill /PID !PORT_PID! /F >nul 2>nul
  timeout /t 1 /nobreak >nul
)
echo [CLEANUP] Done.
echo.

REM === Launch window 1: server (watch.js) ===
echo [1/2] Starting WIFI-Server window ...
start "WIFI-Server" cmd /k "cd /d %~dp0 && echo === Server Window (watch.js + serve.js) === && echo Close this window to stop the server. Tunnel is NOT affected. && echo. && node watch.js"

REM wait for server to boot before tunnel tries to connect
timeout /t 2 /nobreak >nul

REM === Launch window 2: tunnel (lt) ===
echo [2/2] Starting WIFI-Tunnel window ...
start "WIFI-Tunnel" cmd /k "cd /d %~dp0 && echo === Tunnel Window (localtunnel) === && echo Close this window to stop the tunnel. Server is NOT affected. && echo. && lt --port %PORT% --subdomain %SUBDOMAIN% --print-requests"

echo.
echo ========================================
echo  Both windows started. You can close this launcher now.
echo  - Server window title : WIFI-Server
echo  - Tunnel window title : WIFI-Tunnel
echo ========================================
echo.
pause
