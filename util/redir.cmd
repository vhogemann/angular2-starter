@echo off
IF "%1" == "" goto Usage

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------    
    <YOUR BATCH SCRIPT HERE>
IF "%1" == "on" 
    ( GOTO RedirectOn )
ELSE IF "%1" == "off"
    ( GOTO RedirectOff )

:RedirectOn
netsh interface portproxy add v4tov4 listenport=80 listenaddress=127.0.0.1 connectport=3000 connectaddress=127.0.0.1
GOTO End

:RedirectOff
netsh interface portproxy delete v4tov4 listenport=80 listenaddress=127.0.0.1
GOTO End

:Usage
echo Usage:
echo "redir.cmd on|off"

:End
