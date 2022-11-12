# pm2

## GOTCHA IMPORTANT: (HUGE) if pm2 or nodemon isn't started in the same directory as the .env (root) then dotenv won't be able to read the .env file

[Running PM2 & Node.js in Production Environments](https://hackernoon.com/running-pm2-node-js-in-production-environments-13e703fc108a)   
[Load Balancing](https://pm2.io/doc/en/runtime/guide/load-balancing/)   
[The twelve factor app](https://12factor.net/)   
[pm2 cheatsheet](https://devhints.io/pm2)   



#### install pm2   
[pm2 docs](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)   
[nodejs pm2](https://www.npmjs.com/package/pm2)   
[pm2 process management](http://pm2.keymetrics.io/docs/usage/process-management/)   
> Use npm to install the latest version of PM2 on your server:

```
  $ sudo npm install pm2@latest -g
```

> use the pm2 start command to run your application, hello.js, in the background:
```
  $ pm2 start hello.js
```

#### give the app a unique name
```
  pm2 start app.js --name "my-api"
```

#### run pm2 on system startup
```
  $ pm2 startup systemd
```
>Output
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u sammy --hp /home/sammy

copy the output (not the sample above) and paste it into the terminal to run it
```
  $ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u sammy --hp /home/sammy
```

#### save pm2 settings
> As an additional step, we can save the PM2 process list and corresponding environments:
```
  $ pm2 save
```
> Successfully saved in /home/<user>/.pm2/dump.pm2

[PM2] Freeze a process list on reboot via:
```
  $ pm2 save
```


[PM2] Remove init script via:
```
  $ pm2 unstartup systemd
```
> creates similar output to paste into terminal that pm2 startup does

GOTCHA: Job for pm2-d3po.service failed because the service did not take the steps required by its unit configuration.
See "systemctl status pm2-<user>.service" and "journalctl -xe" for details.

```
  $ systemctl status pm2-<user>.service
  $ journalctl -xe
```

[reboot the server to get rid of the failed error](https://github.com/Unitech/pm2/issues/3924)    
```
  $ sudo reboot
```
**reboot was the answer**


Stop an application with this command (specify the PM2 App name or id):
```
  $ pm2 stop app_name_or_id
```

delete an application (remove from list)
```
  $ pm2 delete app_name_or_id
```

Restart an application:
```
  $ pm2 restart app_name_or_id
```

List the applications currently managed by PM2:
```
  $ pm2 list
```
**seems the same as pm2 show <app name>**

Get information about a specific application using its App name:
```
  $ pm2 info app_name
```

The PM2 process monitor can be pulled up with the monit subcommand. This displays the application status, CPU, and memory usage:
[pm2 process management](https://pm2.io/doc/en/runtime/guide/process-management/)
```
  $ pm2 monit
```

Note that running pm2 without any arguments will also display a help page with example usage.

#### Flushing logs
**This will empty all current application logs managed by PM2:**
```
  $ pm2 flush
```
 # Clear all the logs


#### other reading
[You should never ever run directly against Node.js in production. Maybe.](https://medium.freecodecamp.org/you-should-never-ever-run-directly-against-node-js-in-production-maybe-7fdfaed51ec6)   

[loging more lines](http://pm2.keymetrics.io/docs/usage/log-management/)   
```
  pm2 logs uniqueName --lines 1000
```   

#### [pm2 graceful shutdown](https://pm2.io/doc/en/runtime/best-practices/graceful-shutdown/)


```
 -------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
 _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
  _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
   _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
    _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
     _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
      _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
       _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
        _\///______________\///______________\///__\///////////////__


                          Runtime Edition

        PM2 is a Production Process Manager for Node.js applications
                     with a built-in Load Balancer.

                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/


                        -------------

usage: pm2 [options] <command>

pm2 -h, --help             all available commands and options
pm2 examples               display pm2 usage examples
pm2 <command> -h           help on a specific command

Access pm2 files in ~/.pm2
```

pm2 keeps using the original v5.2

#### GOTCHA: SyntaxError: Unexpected token import

/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js:30
0|jng | import(url.pathToFileURL(process.env.pm_exec_path));

```
  npm -v
  // pm2 -v 5.2.0
```

rollback pm2 to v4.2.1
```
  pm2@4.2.1
```

pm2 v5.2.0 persists

#### [Uninstalling PM2 completely on Ubuntu](https://github.com/Unitech/pm2/issues/1466)   

```
  pm2 kill
  sudo npm remove pm2 -g
  #test with :
  which pm2
```

[install pm2 on ubuntu](https://pm2.io/docs/runtime/guide/installation/)
> NOTE: IMPORTANT: i forgot to use sudo for the global install

```
  sudo npm i pm2@4.2.1 -g
```


nvm v8.17.0
pm2 v4.2.1

GOTCHA: 
```
/home/d3po/landing-pages/node_modules/webidl-conversions/lib/index.js:315
0|landing  |   } catch {
0|landing  |           ^
0|landing  | SyntaxError: Unexpected token {
```
> i just ran down the rabbit hole on this. For me it wasn't jsdom or webidl-conversions it was pm2 not picking up my nvm version. I could see what version of npm i was really using by running this in my code
```
console.log(process.versions)
```
> once i stopped (deleted) my pm2 task and created a new one my apps node version was updated to the nvm version and webidl-conversions ran without errors (not unexpected token or BigInt error)

[Even though i left myself a note](https://github.com/jsdom/jsdom/issues/2963)  
this time even a hack couldn't same me.

RESOLVED i used 
```
  nvm use 14.15.1 (node version same as local server)
  npm -v // 6.14.8 (both local and live)
  pm2 -v // 4.2.1
```
(these are now my recommended settings)

> todays ISSUE comes from running the trigger project and its io_server on my main server.  It seemed to crash due to so many failed socket.io requests (404) and it took pm2 and all my pm2 tasks along with it.  I think pm2 must have tried to reinstall itself to v.3.?.? and i had to upgrade it to version 4.2.1 (still and old version)

NOTE: i did get this weird list when running v14.15.1 from pm2 for the first time (it still seems to run correctly though)
```
 Starting /home/d3po/beta-pages/src/index.js in fork_mode (1 instance)
(node:13201) Warning: Accessing non-existent property 'cat' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:13201) Warning: Accessing non-existent property 'cd' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'chmod' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'cp' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'dirs' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'pushd' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'popd' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'echo' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'tempdir' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'pwd' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'exec' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'ls' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'find' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'grep' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'head' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'ln' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'mkdir' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'rm' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'mv' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'sed' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'set' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'sort' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'tail' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'test' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'to' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'toEnd' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'touch' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'uniq' of module exports inside circular dependency
(node:13201) Warning: Accessing non-existent property 'which' of module exports inside circular dependency
```