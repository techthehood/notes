# digitalocean setup

### setup a digitalocean account
- it helps to have an email you have access to.
- a droplet password will be sent to that email once the new droplet is created


### [droplet how tos](https://www.digitalocean.com/docs/droplets/how-to/)

choose an image
at first i had ubuntu 18.04 highlighted
then i went to 1 click apps and chose to do a lamp on 18.04
[digitalocean LAMP tutorials](https://www.digitalocean.com/docs/one-clicks/lamp/)

then i destroyed that one and created a phpmyadmin droplet
[digitalocean phpmyadmin tutorials](https://www.digitalocean.com/docs/one-clicks/mysql/)
[phpmyadmin docs](https://docs.phpmyadmin.net/en/latest/index.html)

chose a size
standard $5 plan

select additional options
IPv6 and monitor

### [login as root](https://www.digitalocean.com/docs/droplets/how-to/connect-with-console/)
[How to Connect to your Droplet with OpenSSH on Linux or macOS](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/openssh/)
>Once you have your Droplet’s IP address, username, and password (if necessary), follow the instructions for your SSH client. OpenSSH is included on Linux and macOS. Windows users with Bash also have access to OpenSSH. Windows users without Bash can use PuTTY.

```
ssh root@SERVER_IP_ADDRESS
```
**to login as root initially you have to copy and paste the password from the email your receive from creating the droplet**
note: you will have to paste the password blind using right click paste then type enter

once you login in using the pasted password you will be asked to change the password starting with pasting the same initial password blindly and typing enter.

then you can blindly type and retype to confirm your desired root password.

### changing your custom root password

### [creating a non root user](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)

1. login as root
2. add a new user
**'demo' represents name of new user**
```
$ adduser demo
```

3. give user root privileges
```
$ gpasswd -a demo sudo
```

4. add public key authentication
- generate key with keygen (already done for root)
- copy the public key to the user
```
$ ssh-copy-id demo@SERVER_IP_ADDRESS
```

### Configure SSH Daemon (to disallow remote ssh root access)
open the following filie
```
nano /etc/ssh/sshd_config
```

change this line to no
```
PermitRootLogin yes
```

save and exit using ctrl-x, y (for yes) and enter to confirm the default file name

### Reload SSH
```
$ service ssh restart
```

**thats it**

### [path to www/html folder](https://www.digitalocean.com/community/questions/what-is-the-correct-folder-to-put-my-website-files-var-www-or-var-www-html)
```
cd ../var/www/html
$ ls
```
**back out of ~ root folder then > var > www > html**
ls exposes the index.html file in the root html folder



### create a new root password
a root password is sent to your email account but says you will be asked to change it the first time you log into the server. so have a strong password ready when you log in.

### [how to add ssh keys to droplets](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/)
[is it safe to use same ssh key on multiple servers?](https://unix.stackexchange.com/questions/27661/good-practice-to-use-same-ssh-keypair-on-multiple-machines)
**seems like its ok**

### create ssh key
**i navigated into the target dir**
```
$   ssh-keygen.exe
```
output
**still asked to specify rout or use default**
```
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/d3pot/.ssh/id_rsa): /c/Users/d3pot/.ssh/kratos/id_rsa
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/d3pot/.ssh/kratos/id_rsa.
Your public key has been saved in /c/Users/d3pot/.ssh/kratos/id_rsa.pub.

```
**even though i saved the key in kratos dir and navigated into it ssh-copy-id didn't use it. it used the old one that was naturally in ~/.ssh folder**

### upload public key
[GOTCHA: ssh-copy-id no identities found error ](https://stackoverflow.com/questions/22530886/ssh-copy-id-no-identities-found-error)
have to be on localhost to use not on the server
```
$ ssh-copy-id root@SERVER_IP_ADDRESS
```

output
```
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/c/Users/d3pot/.ssh/id_rsa.pub"

```

### [add domain names](https://www.digitalocean.com/docs/networking/dns/how-to/add-domains/)
[How To Point to DigitalOcean Nameservers From Common Domain Registrars](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)
**find your hosting providers and follow the illustrations**
>It will take some time for the name server changes to propagate after you've saved them. During this time, the domain registrar communicates the changes you've made with your ISP (Internet Service Provider). In turn, your ISP caches the new nameservers to ensure quick site connections. This process usually takes about 30 minutes, but could take up to a few hours depending on your registrar and your ISP's communication methods.

[An Introduction to DigitalOcean DNS](https://www.digitalocean.com/docs/networking/dns/)
[An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts)

### [Manage DNS records](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/)
A records(IPv4), AAAA records(IPv6)


### create an ssl certificate
[use certbot to create ssl certificates](https://certbot.eff.org/)
[unneccessary docs for certbot digitalocean](https://certbot-dns-digitalocean.readthedocs.io/en/stable/)
[An Introduction to Let's Encrypt](https://www.digitalocean.com/community/tutorials/an-introduction-to-let-s-encrypt)
>* Certbot is preinstalled. Run it to configure HTTPS.


type in certbot using ssh
```
root@kratos300:~# certbot
```
response
**i made sure to choose the options with https ( option 2 )**
```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator apache, Installer apache
No names were found in your configuration files. Please enter in your domain
name(s) (comma and/or space separated)  (Enter 'c' to cancel): kratos300.fitness www.kratos300.fitness kratos300.com www.kratos300.com
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for kratos300.fitness
http-01 challenge for www.kratos300.fitness
http-01 challenge for kratos300.com
http-01 challenge for www.kratos300.com
Enabled Apache rewrite module
Waiting for verification...
Cleaning up challenges
Created an SSL vhost at /etc/apache2/sites-available/000-default-le-ssl.conf
Enabled Apache socache_shmcb module
Enabled Apache ssl module
Deploying Certificate to VirtualHost /etc/apache2/sites-available/000-default-le-ssl.conf
Enabling available site: /etc/apache2/sites-available/000-default-le-ssl.conf

We were unable to find a vhost with a ServerName or Address of www.kratos300.fitness.
Which virtual host would you like to choose?
(note: conf files with multiple vhosts are not yet supported)
-------------------------------------------------------------------------------
1: 000-default.conf               |                       |       | Enabled
2: 000-default-le-ssl.conf        | kratos300.fitness     | HTTPS | Enabled
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Deploying Certificate to VirtualHost /etc/apache2/sites-available/000-default-le-ssl.conf

We were unable to find a vhost with a ServerName or Address of kratos300.com.
Which virtual host would you like to choose?
(note: conf files with multiple vhosts are not yet supported)
-------------------------------------------------------------------------------
1: 000-default.conf               |                       |       | Enabled
2: 000-default-le-ssl.conf        | Multiple Names        | HTTPS | Enabled
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Deploying Certificate to VirtualHost /etc/apache2/sites-available/000-default-le-ssl.conf

We were unable to find a vhost with a ServerName or Address of www.kratos300.com.
Which virtual host would you like to choose?
(note: conf files with multiple vhosts are not yet supported)
-------------------------------------------------------------------------------
1: 000-default.conf               |                       |       | Enabled
2: 000-default-le-ssl.conf        | Multiple Names        | HTTPS | Enabled
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Deploying Certificate to VirtualHost /etc/apache2/sites-available/000-default-le-ssl.conf

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Enabled Apache rewrite module
Redirecting vhost in /etc/apache2/sites-enabled/000-default.conf to ssl vhost in /etc/apache2/sites-available/000-default-le-ssl.conf

-------------------------------------------------------------------------------
Congratulations! You have successfully enabled https://kratos300.fitness,
https://www.kratos300.fitness, https://kratos300.com, and
https://www.kratos300.com

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=kratos300.fitness
https://www.ssllabs.com/ssltest/analyze.html?d=www.kratos300.fitness
https://www.ssllabs.com/ssltest/analyze.html?d=kratos300.com
https://www.ssllabs.com/ssltest/analyze.html?d=www.kratos300.com
-------------------------------------------------------------------------------

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/kratos300.fitness/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/kratos300.fitness/privkey.pem
   Your cert will expire on 2019-03-07. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le


```

### access phpMyAdmin
```
phpMyAdmin: http://111.11.111.111/phpmyadmin
username: admin
password:

```
### [phpMyAdmin change password](https://synoguide.com/2014/02/20/change-password-sql-database-phpmyadmin/)

**this fails right away because the domains need at least 30 minutes to propagate the server changes or domain names**

### [How To Edit the Sudoers File on Ubuntu and CentOS](https://www.digitalocean.com/community/tutorials/how-to-edit-the-sudoers-file-on-ubuntu-and-centos)
> A special user, called root, has "super-user" privileges.

### SFTP setup winSCP

### [how do i log out of ssh?](http://www1.udel.edu/it/help/connecting/ssh/terminal.html)
```
$ exit
```

## [How To Configure Nginx as a Web Server and Reverse Proxy for Apache on One Ubuntu 16.04 Server](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache-on-one-ubuntu-16-04-server)

### [verify Verifying PHP Functionality]
```
$ echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
```
then in the browser type
```
SERVER_IP_ADDRESS/info.php

```

### [set up apache virtual host on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts)
[initial hint - How can I point my domain to a subdirectory off root?](https://www.digitalocean.com/community/questions/how-can-i-point-my-domain-to-a-subdirectory-off-root)

### [Create the Joomla Database and User - version i used](https://www.digitalocean.com/community/tutorials/how-to-install-joomla-on-a-virtual-server-running-ubuntu-12-04)
[newer version with github joomla download - alt version](https://websiteforstudents.com/install-joomla-ubuntu-17-04-17-10-apache2-mariadb-php/)


1. login to the db
```
$ mysql -u root -p
```

2. create a new database
```
$ CREATE DATABASE joomla;
```

3. create a new user
```
$ CREATE USER juser@localhost;
```

4. Set the password for your new user:
```
$ SET PASSWORD FOR juser@localhost = PASSWORD("password");
```
5. grant user permissions
```
$ GRANT ALL PRIVILEGES ON joomla.* TO juser@localhost IDENTIFIED BY 'password';
```

6. save changes (refresh MySQL) & exit
```
$ FLUSH PRIVILEGES;
$ exit
```
7. restart apache2
```
$ sudo service apache2 restart
```

### [Installing Joomla](https://docs.joomla.org/J3.x:Installing_Joomla)
[download Joomla](https://github.com/joomla/joomla-cms/releases)
use this link to choose the latest compressed pkg for download
```
$ wget https://github.com/joomla/joomla-cms/releases/download/3.9.1/Joomla_3.9.1-Stable-Full_Package.tar.gz
```
unzip and move to target dir
```
$ sudo tar zxvf Joomla_3.9.1-Stable-Full_Package.tar.gz  -C /var/www/kratos
```

change modify directory permissions
```
$ sudo chown -R www-data:www-data /var/www/html/
```

[How To Move an Apache Web Root to a New Location on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-move-an-apache-web-root-to-a-new-location-on-ubuntu-16-04)
make the target joomla directory the domain names target

check to see where current site roots are
```
$ grep -R "DocumentRoot" /etc/apache2/sites-enabled
```
>outputs sites-enabled/000-default.conf   DocumentRoot /var/www/html

navigate into the the sites-enabled dir
```
$ cd ~
$ cd ../..
cd etc/apache2/sites-enabled
```

edit the files output in the DocumentRoot test
```
$ sudo nano 000-default.conf
$ sudo nano 000-default-le-ssl.conf
```
DocumentRoot var/www/dir_path

test the syntax
```
$ sudo apachectl configtest
```
>Output
AH00558: apache2: Could not reliably determine the server's fully qualified domain name,
using 127.0.1.1. Set the 'ServerName' directive globally to suppress this message
Syntax OK

>As long as you get Syntax OK, restart the web server. Otherwise, track down and fix the problems it reported.

reload apache
```
$ sudo systemctl reload apache2
```
[the diff between systemctl and service](https://stackoverflow.com/questions/43537851/difference-between-systemctl-and-service-command)
