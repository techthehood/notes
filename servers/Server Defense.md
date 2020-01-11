# Server Defense

### Brute Force Defense

you can see issues here
```
  journalctl -xe
```
[My sshd was brute forced!](https://www.linode.com/community/questions/4087/my-sshd-was-bruteforced)   
[DenyHosts](http://denyhosts.sourceforge.net/)   
[prevent brute force login](https://serverfault.com/questions/128962/denyhosts-vs-fail2ban-vs-iptables-best-way-to-prevent-brute-force-logons)   

```
  There are a number of important security techniques you should consider to help prevent brute force logins:

  SSH:

  - Don't allow root to login
  - Don't allow ssh passwords (use private key authentication)
  - Don't listen on every interface
  - Create a network interface for SSH (e.g eth1), which is different to the interface you serve requests from (e.g eth0)
  - Don't use common usernames
  - Use an allow list, and only allow users that require SSH Access
  - If you require Internet Access...Restrict Access to a finite set of IPs. One static IP is ideal, however locking it down to x.x.0.0/16 is better than 0.0.0.0/0
  - If possible find a way to connect without Internet Access, that way you can deny all internet traffic for SSH (e.g with AWS you can get a direct connection that bypasses the Internet, it's called Direct Connect)
  - Use software like fail2ban to catch any brute force attacks
  - Make sure OS is always up to date, in particular security and ssh packages
  Application:

  - Make sure your application is always up to date, in particular security packages
  - Lock down your application 'admin' pages. Many of the advice above applies to the admin area of your application too.
  - Password Protect your admin area, something like htpasswd for web console will project any underlying application vulnerabilities and create an extra barrier to entry
  - Lock down file permissions. 'Upload folders' are notorious for being entry points of all sorts of nasty stuff.
  - Consider putting your application behind a private network, and only exposing your front-end load balancer and a jumpbox (this is a typical setup in AWS using VPCs)
```

[does it improve security to use obscure port numbers?](https://security.stackexchange.com/questions/189726/does-it-improve-security-to-use-obscure-port-numbers)   
>I use fail2ban configured to temporarily block for five minutes after three failed attempts, and for a week after 3*5 failed attempts. This reduces log clutter and blocks any real progress on a brute force attack.


[Running out of Memory. Driving me nuts](https://www.digitalocean.com/community/questions/running-out-of-memory-driving-me-nuts)   
[joomla vulnerabilities](https://www.getastra.com/blog/911/joomla-hacked-joomla-vulnerabilities-how-to-check-symptoms-fixes/)

### Cloudflare setup

switch nameservers
```
  ns1.digitalocean.com. >  alex.ns.cloudflare.com
  ns3.digitalocean.com. > olga.ns.cloudflare.com
  Delete ns2.digitalocean.com
```

registrar
```
  same cf changes
```

[Is it normal to get hundreds of break-in attempts per day?](https://serverfault.com/questions/244614/is-it-normal-to-get-hundreds-of-break-in-attempts-per-day)   
*add yourself to systemd-journal group to see the entire journalctl -xe log*
```
  sudo adduser username systemd-journal
```

[]()   
[]()
[]()
[]()
[]()
