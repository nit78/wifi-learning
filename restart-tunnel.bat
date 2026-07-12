@echo off
REM Restart ONLY the tunnel window (WIFI-Tunnel). Server window untouched.
REM Use: when localtunnel gives 502/503/408, restart the tunnel WITHOUT
REM      disrupting the server. The new tunnel gives a NEW URL though
REM      (subdomain may change if occupied).

setlocal enabledelayedexpansion
cd /d "%~dp0"

REM allow overriding port/subdomain via args
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"
set "SUBDOMAIN=%~2"
if "%SUBDOMAIN%"=="" set "SUBDOMAIN=cwna-lvyq-2026"

echo ========================================
echo   Restart tunnel ONLY (server stays alive)
echo ========================================
echo   PORT      : %PORT%
echo   SUBDOMAIN : %SUBDOMAIN% (requested)
echo ========================================
echo.

REM [1/2] Kill ONLY the WIFI-Tunnel window (server window WIFI-Server NOT matched)
echo [1/2] Closing tunnel window "WIFI-Tunnel" ...
taskkill /FI "WindowTitle eq WIFI-Tunnel*" /T /F >nul 2>nul
echo   Done.
timeout /t 1 /nobreak >nul

REM [2/2] Start a new lt in a new window with the SAME title
echo [2/2] Starting new WIFI-Tunnel window ...
start "WIFI-Tunnel" cmd /k "cd /d %~dp0 && echo === Tunnel Window (localtunnel) === && echo Close this window to stop the tunnel. Server is NOT affected. && echo. && lt --port %PORT% --subdomain %SUBDOMAIN% --print-requests"
echo   [OK] New tunnel window started.

echo.
echo Done. WIFI-Server window was NOT touched.
echo NOTE: the new tunnel may print a DIFFERENT url (if subdomain is occupied).
echo       Read the "your url is:" line in the new WIFI-Tunnel window.
echo.
pause
