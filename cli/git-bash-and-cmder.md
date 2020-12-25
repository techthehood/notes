

[Coding in Windows - Setting Up Git & Cmder](https://www.awmoore.com/2015/01/14/setting-up-git-and-cmder/)   
**works perfectly**

- follow instructions to install bash if !bash
- follow cmder mini install instructions (really unzipping and moving to C:)

#### using the cmder create new console option(down arrow)
- selecting setup tasks... from select menu (down arrow > setup tasks)

- click add arrow "+"

- name it "git bash"

- icon path use (copy paste this)
```
  /icon "%ProgramFiles%\Git\etc\git.ico"
```

- console path use: (copy paste this)
```
  ""C:\Program Files\Git\bin\sh.exe" --login -i"
```

click "Startup menu" (left side menu panel)

in the already selected Specified named task radio btn section choose:
```
{git bash}
```

thats it!!!

when using to minimize cmder Program use:
```
  ctrl ~
```

#### how do i make the cmd prompt say something other than cmder-mini or whatever the cmder binder name is?
change the "startup directory" (btn in setup tasks menu)
```
  // the console path will change from:

  ""C:\Program Files\Git\bin\sh.exe" --login -i"

  // to this:

 -new_console:d:C:\Users\d3pot ""C:\Program Files\Git\bin\sh.exe" --login -i"
```

#### how do i setup and save multiple windows?
**GOTCHA** its difficult, i don't think it works correctly or i just don't know what im doing.

>using the new Console command and setting up "new console split",
keeps targeting the 1st window. not the other windows you may have seletted as active

**so i had to do some experiments and change some numbers**

- i did a 50% split of the 1st console (setting the new consoles startup to {git bash}) and renamed the new split

- then i went to the create new console (drop down arrow icon) and setup tasks and clone {git bash} task

- then i changed the name to {bash group} and in the console window i **deleted all** the content and clicked "active tabs"

- then i highlighted all the script for the mongodb tab and pasted it below the script it highlighted

- then i changed the name and targeted the 2nd tab by changing the -cur_console:s1T50H to s2T50H

- then i changed the end direction from horizontal "H" to vertical "V" returning s2T50V

- then i wanted that new vertical split to take up 70% of the 2nd tab/console im trying to target returning s2T70V

- then i repeat the process targeting the 3rd tab and using a 50% split etc

#### my results:
final named sample commands
```
  > -cur_console:d:C:\Users\d3pot -cur_console:t:default -cur_console:C:"C:\Program Files\Git\etc\git.ico" "C:\Program Files\Git\bin\sh.exe" --login -i

  -cur_console:fs1T50H -cur_console:d:C:\Users\d3pot -cur_console:t:mongodb -cur_console:C:"C:\Program Files\Git\etc\git.ico" "C:\Program Files\Git\bin\sh.exe" --login -i

  -cur_console:bs2T70V -cur_console:d:C:\Users\d3pot -cur_console:t:ali -cur_console:C:"C:\Program Files\Git\etc\git.ico" "C:\Program Files\Git\bin\sh.exe" --login -i

  -cur_console:bs3T50V -cur_console:d:C:\Users\d3pot -cur_console:t:land -cur_console:C:"C:\Program Files\Git\etc\git.ico" "C:\Program Files\Git\bin\sh.exe" --login -i
```


#### GOTCHA: updating node by reinstalling a new version makes cmder break the node command.
**im hoping reinstalling and setting up a new cmder console will fix the break tendency**

nope, reinstalling and setting cmder up **failed**  there must be another issue or it doesn't work with the newest version of node

#### GOTCHA: [Can't run npm or any Node Module on Cmder](https://stackoverflow.com/questions/38485582/cant-run-npm-or-any-node-module-on-cmder-windows-7)
