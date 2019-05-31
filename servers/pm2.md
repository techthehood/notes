# pm2

[Running PM2 & Node.js in Production Environments](https://hackernoon.com/running-pm2-node-js-in-production-environments-13e703fc108a)   
[Load Balancing](https://pm2.io/doc/en/runtime/guide/load-balancing/)   
[The twelve factor app](https://12factor.net/)   



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

give the app a unique name
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

Get information about a specific application using its App name:
```
  $ pm2 info app_name
```

The PM2 process monitor can be pulled up with the monit subcommand. This displays the application status, CPU, and memory usage:
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
````
  pm2 logs uniqueName --lines 1000
```
