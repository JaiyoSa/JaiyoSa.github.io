@echo off
cd /d "%~dp0"
echo Starting local portfolio website...
echo.
echo After the server starts, open this in your browser:
echo http://localhost:8000
start http://localhost:8000
py -3 -m http.server 8000
if errorlevel 1 python -m http.server 8000
pause
