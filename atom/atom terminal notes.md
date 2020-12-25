
[how do i reun cmder inside atom on windows 10](https://stackoverflow.com/questions/45881658/how-do-i-run-cmder-inside-atom-on-windows-10/58872615#58872615)   

[create your own .bat file](https://www.revit.news/2016/11/atom-editor-cmder/)   
C:\cmder_mini\atom.bat file
```
  @echo off
SET CMDER_ROOT=C:\cmder_mini\
"%CMDER_ROOT%vendor\init.bat"
```

inside atom platformio settings
```
  // auto run command
  C:\cmder_mini\atom.bat

  // shell override
  C:\Windows\System32\cmd.exe
```
**this partially works.  with this i can at least have a working cmd window running inside of atom**
#### GOTCHA: the terminal is running cmd not cmder. i need cmder because it is running bash.

i tried to run cmder bash path in the shell override
```
  C:\Program Files\Git\bin\sh.exe
```
**failed. looks like it started the terminal but didn't recognize cmder or atom.bat**
**worked** - actually this worked in running bash in atom. there just isn't cmder (which i may not even need)

i also tried using bash.exe in System32 dir
```
  C:\Windows\System32\bash.exe
```
**same outcome only this time the prompt is colorized (with the wrong customization)**
i still had to navigate the the bash root folder '~' and source .bash_profile

## I don't see the benefit of running cmder in atom,
- you can't use its styling/ design and
- platformio lets you have multiple terminals standing by
- since you are using atom to code you don't want terminals up and blocking your view so you only need them hidden for later use.


my final solution
```
  // auto run command
  . .bash_profile

  // shell override
  C:\Windows\System32\bash.exe

  //working directory
  HOME
```
