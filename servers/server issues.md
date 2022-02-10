# Server Issues

### the issue   

```
  d3po ~ $ sudo systemctl status nginx
  [sudo] password for d3po:
  ● nginx.service - A high performance web server and a reverse proxy server   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor pres   Active: active (running) since Mon 2021-12-06 14:49:1● mongodb.service - An object/document-oriented database
    Loaded: loaded (/lib/systemd/system/mongodb.service; enabled; vendor preset: enabled)
    Active: failed (Result: signal) since Fri 2021-12-17 07:30:48 UTC; 4h 24min ago
      Docs: man:mongod(1)
    Process: 16787 ExecStart=/usr/bin/mongod --unixSocketPrefix=${SOCKETPATH} --config ${CONF} $DAEMON_O Main PID: 16787 (code=killed, signal=KILL)

  Dec 15 00:00:53 sunzao systemd[1]: Started An object/document-oriented database.
  Dec 17 07:30:48 sunzao systemd[1]: mongodb.service: Main process exited, code=killed, status=9/KILL
  Dec 17 07:30:48 sunzao systemd[1]: mongodb.service: Failed with result 'signal'.
```

#### google search: mongodb.service: Main process exited, code=killed, status=9/KILL   

[MongoDB killed by linux](https://stackoverflow.com/questions/44336007/mongodb-killed-by-linux)   

```
  According to the Mongo-DB documentation, Ulimit can affect the mongo service. I fixed the same problem by running: ulimit -a to verify this was the problem.

  If the -n flag is less than 64,000 you have to change it: sudo ulimit -n 64000
```

[google search ulimit -n](https://www.google.com/search?q=ulimit+-n&oq=ulimit+-n&aqs=chrome..69i57.3968j0j7&sourceid=chrome&ie=UTF-8)   


#### [google search: mongodb.service: Failed with result 'signal'.](https://www.google.com/search?q=mongodb.service%3A+Failed+with+result+%27signal%27.&oq=mongodb.service%3A+Failed+with+result+%27signal%27.&aqs=chrome..69i57.1058j0j7&sourceid=chrome&ie=UTF-8)   
[Mongod Server Failed with signal 6](https://jira.mongodb.org/browse/SERVER-50880)   


#### mail issue   

```
 $ nano /var/mail/d3po
```   

*mail message*

```
  From d3po@LEMP099445jkns20190305765a0f  Fri Dec 17 12:00:09 2021
  Return-Path: <d3po@LEMP099445jkns20190305765a0f>
  X-Original-To: d3po
  Delivered-To: d3po@LEMP099445jkns20190305765a0f
  Received: by LEMP099445jkns20190305765a0f (Postfix, from userid 1000)
          id E80423FEB1; Fri, 17 Dec 2021 12:00:08 +0000 (UTC)
  From: root@LEMP099445jkns20190305765a0f (Cron Daemon)
  To: d3po@LEMP099445jkns20190305765a0f
  Subject: Cron <d3po@sunzao> /usr/bin/certbot renew --quiet
  MIME-Version: 1.0
  Content-Type: text/plain; charset=UTF-8
  Content-Transfer-Encoding: 8bit
  X-Cron-Env: <SHELL=/bin/sh>
  X-Cron-Env: <HOME=/home/d3po>
  X-Cron-Env: <PATH=/usr/bin:/bin>
  X-Cron-Env: <LOGNAME=d3po>
  Message-Id: <20211217120008.E80423FEB1@LEMP099445jkns20190305765a0f>
  Date: Fri, 17 Dec 2021 12:00:08 +0000 (UTC)

  The following error was encountered:
  [Errno 13] Permission denied: '/var/log/letsencrypt/.certbot.lock'
  Either run as root, or set --config-dir, --work-dir, and --logs-dir to writeable paths.
```
[google search: set --config-dir, --work-dir, and --logs-dir to writeable paths](https://community.letsencrypt.org/t/certbot-error-13-permission-denied-etc-letsencrypt/21325)

```
  sudo certbot --nginx
```
> i tried running the code above. only time will tell if it worked.