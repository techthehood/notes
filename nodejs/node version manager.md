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
  
  // updated

  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

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


#### pm2 update to new node version issue

GOTCHA: failed with node 8.?.?

> i kept getting a warning about a try/catch statement in metascrapers code. come to find out catch {} without 
> a parameter catch(error){} is valid code in versions of node beyond the version i was using.

so i tried to upgrade my node version using nvm

```
  nvm install 14.?.?
  nvm use 14
```

> but the error persisted.  come to find out, even though i programmed nvm to use a certain node version my server 
> running on pm2 was set to use node v 8.?.? when i first started the server and gave it a permanent reference name

*get_site_data.js*
```
  console.log(process.versions);
```
> adding this console log to my script showed me exactly what node version (or npm version) was being used on the system

To fix this issue i had to shut down (i actually deleted) my pm2 server [servername]  then create/start a new one

```
  pm2 delete [servername]
  pm2 start ./path_to_server --name "[servername]"
```
> then when i ran the console i had the correct npm version


#### useful commands   

```
  nvm current                           Display currently activated version of Node
  nvm ls [<version>]                    List installed versions, matching a given 

  nvm install node                      Install the latest available version
  nvm use node                          Use the latest version
```

[NOTE: npm vs node version numbers](https://stackoverflow.com/questions/51025102/npm-vs-node-version-numbers)   

#### nvm help (-h)

```
$ nvm
//output

Node Version Manager (v0.39.1)

Note: <version> refers to any version-like string nvm understands. This includes:
  - full or partial version numbers, starting with an optional "v" (0.10, v0.1.2, v1)
  - default (built-in) aliases: node, stable, unstable, iojs, system
  - custom aliases you define with `nvm alias foo`

 Any options that produce colorized output should respect the `--no-colors` option.

Usage:
  nvm --help                                  Show this message
    --no-colors                               Suppress colored output
  nvm --version                               Print out the installed version of nvm
  nvm install [<version>]                     Download and install a <version>. Uses .nvmrc if available and version is omitted.
   The following optional arguments, if provided, must appear directly after `nvm install`:
    -s                                        Skip binary download, install from source only.
    -b                                        Skip source download, install from binary only.
    --reinstall-packages-from=<version>       When installing, reinstall packages installed in <node|iojs|node version number>
    --lts                                     When installing, only select from LTS (long-term support) versions
    --lts=<LTS name>                          When installing, only select from versions for a specific LTS line
    --skip-default-packages                   When installing, skip the default-packages file if it exists
    --latest-npm                              After installing, attempt to upgrade to the latest working npm on the given node version
    --no-progress                             Disable the progress bar on any downloads
    --alias=<name>                            After installing, set the alias specified to the version specified. (same as: nvm alias <name> <version>)
    --default                                 After installing, set default alias to the version specified. (same as: nvm alias default <version>)
  nvm uninstall <version>                     Uninstall a version
  nvm uninstall --lts                         Uninstall using automatic LTS (long-term support) alias `lts/*`, if available.
  nvm uninstall --lts=<LTS name>              Uninstall using automatic alias for provided LTS line, if available.
  nvm use [<version>]                         Modify PATH to use <version>. Uses .nvmrc if available and version is omitted.
   The following optional arguments, if provided, must appear directly after `nvm use`:
    --silent                                  Silences stdout/stderr output
    --lts                                     Uses automatic LTS (long-term support) alias `lts/*`, if available.
    --lts=<LTS name>                          Uses automatic alias for provided LTS line, if available.
  nvm exec [<version>] [<command>]            Run <command> on <version>. Uses .nvmrc if available and version is omitted.
   The following optional arguments, if provided, must appear directly after `nvm exec`:
    --silent                                  Silences stdout/stderr output
    --lts                                     Uses automatic LTS (long-term support) alias `lts/*`, if available.
    --lts=<LTS name>                          Uses automatic alias for provided LTS line, if available.
  nvm run [<version>] [<args>]                Run `node` on <version> with <args> as arguments. Uses .nvmrc if available and version is omitted.
   The following optional arguments, if provided, must appear directly after `nvm run`:
    --silent                                  Silences stdout/stderr output
    --lts                                     Uses automatic LTS (long-term support) alias `lts/*`, if available.
    --lts=<LTS name>                          Uses automatic alias for provided LTS line, if available.
  nvm current                                 Display currently activated version of Node
  nvm ls [<version>]                          List installed versions, matching a given <version> if provided
    --no-colors                               Suppress colored output
    --no-alias                                Suppress `nvm alias` output
  nvm ls-remote [<version>]                   List remote versions available for install, matching a given <version> if provided
    --lts                                     When listing, only show LTS (long-term support) versions
    --lts=<LTS name>                          When listing, only show versions for a specific LTS line
    --no-colors                               Suppress colored output
  nvm version <version>                       Resolve the given description to a single local version
  nvm version-remote <version>                Resolve the given description to a single remote version
    --lts                                     When listing, only select from LTS (long-term support) versions
    --lts=<LTS name>                          When listing, only select from versions for a specific LTS line
  nvm deactivate                              Undo effects of `nvm` on current shell
    --silent                                  Silences stdout/stderr output
  nvm alias [<pattern>]                       Show all aliases beginning with <pattern>
    --no-colors                               Suppress colored output
  nvm alias <name> <version>                  Set an alias named <name> pointing to <version>
  nvm unalias <name>                          Deletes the alias named <name>
  nvm install-latest-npm                      Attempt to upgrade to the latest working `npm` on the current node version
  nvm reinstall-packages <version>            Reinstall global `npm` packages contained in <version> to current version
  nvm unload                                  Unload `nvm` from shell
  nvm which [current | <version>]             Display path to installed node version. Uses .nvmrc if available and version is omitted.
    --silent                                  Silences stdout/stderr output when a version is omitted
  nvm cache dir                               Display path to the cache directory for nvm
  nvm cache clear                             Empty cache directory for nvm
  nvm set-colors [<color codes>]              Set five text colors using format "yMeBg". Available when supported.
                                               Initial colors are:
                                                   g  b  y  r  e
                                               Color codes:
                                                 r/R = red / bold red
                                                 g/G = green / bold green
                                                 b/B = blue / bold blue
                                                 c/C = cyan / bold cyan
                                                 m/M = magenta / bold magenta
                                                 y/Y = yellow / bold yellow
                                                 k/K = black / bold black
                                                 e/W = light grey / white

Example:
  nvm install 8.0.0                     Install a specific version number
  nvm use 8.0                           Use the latest available 8.0.x release
  nvm run 6.10.3 app.js                 Run app.js using node 6.10.3
  nvm exec 4.8.3 node app.js            Run `node app.js` with the PATH pointing to node 4.8.3
  nvm alias default 8.1.0               Set default node version on a shell
  nvm alias default node                Always default to the latest available node version on a shell

  nvm install node                      Install the latest available version
  nvm use node                          Use the latest version
  nvm install --lts                     Install the latest LTS version
  nvm use --lts                         Use the latest LTS version

  nvm set-colors cgYmW                  Set text colors to cyan, green, bold yellow, magenta, and white

Note:
  to remove, delete, or uninstall nvm - just remove the `$NVM_DIR` folder (usually `~/.nvm`)
```