@echo off
:loop
echo Starting OS Paging Server...
cd "c:\Users\Thanvanth\Downloads\os project\server"
node index.js
echo Server crashed or stopped. Restarting in 5 seconds...
timeout /t 5 /nobreak > nul
goto loop