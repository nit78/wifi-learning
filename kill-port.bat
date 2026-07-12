@echo off
REM 只清理占用指定端口的进程,不启动服务
REM 用法: 双击运行(默认清 8000),或命令行  kill-port.bat [port]
REM   示例: kill-port.bat        (清 8000)
REM         kill-port.bat 3000   (清 3000)

setlocal enabledelayedexpansion
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"

cd /d "%~dp0"

echo ========================================
echo   Cleaning port %PORT%
echo ========================================

set "FOUND_ANY="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":%PORT% " ^| findstr LISTENING') do (
  set "PID=%%P"
  set "FOUND_ANY=1"
  echo.
  echo Found PID !PID! holding port %PORT%:
  tasklist /FI "PID eq !PID!" /NH 2>nul
  echo Killing PID !PID! ...
  taskkill /PID !PID! /F >nul 2>nul
  if errorlevel 1 (
    echo   [WARN] Failed to kill PID !PID! - may need admin rights.
  ) else (
    echo   [OK] Killed.
  )
)

if not defined FOUND_ANY (
  echo.
  echo Port %PORT% is free. Nothing to clean.
)

echo.
echo Verifying...
set "STILL="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":%PORT% " ^| findstr LISTENING') do (
  set "STILL=1"
  echo   [WARN] PID %%P still listening on %PORT%.
)
if not defined STILL echo   [OK] Port %PORT% is now free.

echo.
pause
