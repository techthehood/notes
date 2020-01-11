# CRASH


GOTCHA:
```
  sudo systemctl restart mysql
```

> mysql.service: Start request repeated too quickly.

```
  sudo journalctl -xe
```
>Unit mysql.service has finished shutting down.
Jun 11 14:21:37 sunzao systemd[1]: mysql.service: Start request repeated too quickly.
Jun 11 14:21:37 sunzao systemd[1]: mysql.service: Failed with result 'exit-code'.
Jun 11 14:21:37 sunzao systemd[1]: Failed to start MySQL Community Server.
-- Subject: Unit mysql.service has failed
-- Defined-By: systemd
-- Support: http://www.ubuntu.com/support
--
-- Unit mysql.service has failed.

What to do after mysql.service: Start request repeated too quickly.


possible fix process
```
  pm2 stop [servername]
  sudo systemctl stop nginx
  sudo systemctl restart nginx
  sudo systemctl start mysql
```
> idk if this is what did it or if it just activated over time, mysql has been down for over an hour - nginx & pm2 have been up

I need way more memory for Production
i need better stats, i need to know that specifically is in the heap

[list of systectl services]
```
systemctl | grep running
```
> works but its not as nice

```
   systemctl list-unit-files
```
> a nicer list in its entirety

```
  systemctl list-unit-files | grep enabled
```
[Automatically Restart Your Server with Monit](https://exygy.com/automatically-restart-your-server-with-monit/)   
[adding swap is not recommended for ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-18-04)   
