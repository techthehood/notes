#### migrating/ running npm install on the server

GOTCHA:  Error: EACCES: permission denied, mkdir '/home/d3po/landing-pages/node_modules/node-sass/build'
> i changed node_modules permissions   
> 
```
  sudo chmod -R me:www-data node_modules/
```

>i deleted node_modules and reran sudo npm install

[Error: EACCES, mkdir '/usr/local/lib/node_modules/node-sass' - installing globally](https://github.com/sass/node-sass/issues/1098)   
[TROUBLESHOOTING](https://github.com/sass/node-sass/blob/master/TROUBLESHOOTING.md#cannot-find-module-rootinstalljs)   


[Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)   

[Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)     

#### [installing a node version manager](https://github.com/nvm-sh/nvm)    

```
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash

  // output

  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
  => Downloading nvm from git to '/home/d3po/.nvm'
  => Cloning into '/home/d3po/.nvm'...
  remote: Enumerating objects: 288, done.
  remote: Counting objects: 100% (288/288), done.
  remote: Compressing objects: 100% (258/258), done.
  remote: Total 288 (delta 35), reused 95 (delta 18), pack-reused 0
  Receiving objects: 100% (288/288), 146.70 KiB | 3.58 MiB/s, done.
  Resolving deltas: 100% (35/35), done.
  => Compressing and cleaning up git repository

  => Appending nvm source string to /home/d3po/.bashrc
  => Appending bash_completion source string to /home/d3po/.bashrc
  => You currently have modules installed globally with `npm`. These will no
  => longer be linked to the active version of Node when you install a new node
  => with `nvm`; and they may (depending on how you construct your `$PATH`)
  => override the binaries of modules installed with `nvm`:

  /usr/lib
  ├── nodemon@1.19.0
  ├── pm2@3.5.0
  └── web-push@3.3.5
  => If you wish to uninstall them at a later point (or re-install them under your
  => `nvm` Nodes), you can remove them from the system Node as follows:

       $ nvm use system
       $ npm uninstall -g a_module

  => Close and reopen your terminal to start using nvm or run the following to use it now:

  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```


[GOTCHA jsdom issue is really a nvm issue](https://github.com/jsdom/jsdom/issues/2963)      
the huge jsdom issue was because pm2 wasn't updated to the latest node version using 

nvm use 14

i deleted the old pm2 and created a new one (maybe overkill) my goal was to basically stop the old pm2 task and not remember its last node version by restarting what was already saved.

this worked. now its using the new node version 

console.log(process.versions);


ok so my fix was to stop and delete whatever pm2 im running that is throwing the issue.

then create a fresh new one
pm2 start file/path --name "alias"