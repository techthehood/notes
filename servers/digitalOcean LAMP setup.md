# DigitalOcean LAMP setup

- [ ] setup digital ocean account
- [ ] create phpMyAdmin droplet
- [ ] login as root
- [ ] create SSH key
- [ ] create a non-root user w/ssh key access
- [ ] disallow root access
- [ ] add domain names (DNS)
- [ ] ~~setup apache web server~~
- [ ] setup apache virtual host
- [ ] SSL certificate
- [ ] access phpMyAdmin
- [ ] phpMyAdmin change password
- [ ] create joomla database
- [ ] install joomla



### phpmyadmin droplet
[droplet how tos](https://www.digitalocean.com/docs/droplets/how-to/)
[create phpMyAdmin droplet](https://marketplace.digitalocean.com/apps/phpmyadmin)  
## **GOTCHA: i had an issue with 2 droplets not adding the image i was requesting.  finally i used this link to create the phpMyAdmin droplet**

[phpmyadmin one-click droplet](https://marketplace.digitalocean.com/apps/mysql#start)   
[same guide](http://do.co/mysql1804#start)   

********************************************************************************

Welcome to DigitalOcean's One-Click MySQL/phpMyAdmin Droplet.
To keep this Droplet secure, the UFW firewall is enabled.
All ports are BLOCKED except 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3306 (MySQL).

In a web browser, you can view:
 * The MySQL/phpMyAdmin One-Click Quickstart guide: http://do.co/mysql1804#start
 * phpMyAdmin: http://111.111.111.111/phpmyadmin
    Username: admin
    Password: *********************

On the server:
 * The MySQL root password is saved in /root/.digitalocean_password
 * Certbot is preinstalled. Run it to configure HTTPS.

For help and more information, visit http://do.co/mysql1804

********************************************************************************
To delete this message of the day: rm -rf /etc/update-motd.d/99-one-click

[direct phpMyAdmin to virtual host](How to direct phpmyadmin to a subdomain on my site?)   

### setup a digitalocean account
- it helps to have an email you have access to.
- a droplet password will be sent to that email once the new droplet is created


choose an image (under marketplace)
at first i had ubuntu 18.04 highlighted
then i went to 1 click apps and chose to do a lamp on 18.04 (deprecated)
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
[what is OpenSSH? ](https://www.webopedia.com/TERM/O/OpenSSH.html)   
>Once you have your Droplet’s IP address, username, and password (if necessary), follow the instructions for your SSH client. OpenSSH is included on Linux and macOS. Windows users with Bash also have access to OpenSSH. Windows users without Bash can use PuTTY.

```
ssh root@SERVER_IP_ADDRESS
```
**to login as root initially you have to copy and paste the password from the email your receive from creating the droplet**
note: you will have to paste the password blind using right click paste then type enter

once you login in using the pasted password you will be asked to change the password starting with **pasting the same** initial password blindly and typing enter.

then you can blindly type and retype to confirm your desired root password.

**changing your custom root password**

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
- generate key with keygen (already done for root) - (i can use the old key that is already there no keygen needed)
- copy the public key to the user (ssh-copy-id must be done from local machine - i navigated to the .ssh dir)
```
$ ssh-copy-id demo@SERVER_IP_ADDRESS
```
**i skipped down to upload public key to root then came back to this**

### Configure SSH Daemon (to disallow remote ssh root access)
open the following file
```
nano /etc/ssh/sshd_config
```
**GOTCHA: notice sshd_config not ssh_config**

change this line to no
```
PermitRootLogin yes
```

save and exit using ctrl-x, y (for yes) and enter to confirm the default file name

### Reload SSH
```
$ service ssh restart
```

[how to restart services in linux](https://www.wikihow.com/Restart-Services-in-Linux)   
```
  $ sudo systemctl restart ssh
```
**this worked, even though the last time i did it i got not feedback**

**thats it**


### [path to www/html folder](https://www.digitalocean.com/community/questions/what-is-the-correct-folder-to-put-my-website-files-var-www-or-var-www-html)
## **GOTCHA: in ubuntu 18.04 (plain droplet) there is no www folder until you configure apache server**
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

### create SSH key
**i navigated into the target dir (local .ssh dir)**
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
**i started with this one (follow the steps)**

>choose create Domains/DNS from the create dropdown menu
>enter the desired domain name and choose add domain

### [Manage DNS records](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/)   
[DNS quickstart - (not really helpful)](https://www.digitalocean.com/docs/networking/dns/quickstart/)   
A records(IPv4), AAAA records(IPv6)
```
@
www
*
```
>enter the 1st symbol choose the ip from the dropdown menu and select create record (i did A & AAAA)
**3rd pary nameservers also have to be updated for changes to take effect**
**GOTCHA: cloudflare has to be updated for new subdomains to work**


[How To Point to DigitalOcean Nameservers From Common Domain Registrars](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)   
**open the link, find your hosting providers and follow the illustrations**
>It will take some time for the name server changes to propagate after you've saved them. During this time, the domain registrar communicates the changes you've made with your ISP (Internet Service Provider). In turn, your ISP caches the new nameservers to ensure quick site connections. This process usually takes about 30 minutes, but could take up to a few hours depending on your registrar and your ISP's communication methods.

[An Introduction to DigitalOcean DNS](https://www.digitalocean.com/docs/networking/dns/)   
[An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts)   
## Notice - i setup the apache server next

### SSL certificate setup
[How To Secure Apache with Let's Encrypt on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04)   
**NOTE: there seems to be an updated instruction for each os version - ubuntu 18.04 doesn't have certbot installed && "Certbot doesn't know how to automatically configure the web server on this system."**
```
  ~~$ sudo apt install certbot~~
```

>Certbot is in very active development, so the Certbot packages provided by Ubuntu tend to be outdated. However, the Certbot developers maintain a Ubuntu software repository with up-to-date versions, so we'll use that repository instead.

>First, add the repository:
**proper certbot installation**
```
  $ sudo add-apt-repository ppa:certbot/certbot

  //then
  $ sudo apt install python-certbot-apache
```
## [Important: make sure you finish setting up your DNS and apache virtual host](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04#step-5-%E2%80%94-setting-up-virtual-hosts)

>To check, open the virtual host file for your domain using nano or your favorite text editor:
```
  $ sudo nano /etc/apache2/sites-available/example.com.conf
```
>look for ServerName example.com;

>revisit: Allowing HTTPS Through the Firewall

check the status:
```
  $ sudo ufw status
```

To additionally let in HTTPS traffic, allow the Apache Full profile and delete the redundant Apache profile allowance:
```
  $ sudo ufw allow 'Apache Full'
  $ sudo ufw delete allow 'Apache'
```

### Obtaining an SSL Certificate
>Certbot provides a variety of ways to obtain SSL certificates through plugins. The Apache plugin will take care of reconfiguring Apache and reloading the config whenever necessary. To use this plugin, type the following:
```
  $ sudo certbot --apache -d example.com -d www.example.com
```

Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator apache, Installer apache
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel): admin@example.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v02.api.letsencrypt.org/directory
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(A)gree/(C)ancel: A

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for example.com
http-01 challenge for www.example.com
Enabled Apache rewrite module
Waiting for verification...
Cleaning up challenges
Created an SSL vhost at /etc/apache2/sites-available/example.com-le-ssl.conf
Enabled Apache socache_shmcb module
Enabled Apache ssl module
Deploying Certificate to VirtualHost /etc/apache2/sites-available/example.com-le-ssl.conf
Enabling available site: /etc/apache2/sites-available/example.com-le-ssl.conf
Deploying Certificate to VirtualHost /etc/apache2/sites-available/example.com-le-ssl.conf

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Enabled Apache rewrite module
Redirecting vhost in /etc/apache2/sites-enabled/example.com.conf to ssl vhost in /etc/apache2/sites-available/example.com-le-ssl.conf

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Congratulations! You have successfully enabled https://example.com and
https://www.example.com

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=example.com
https://www.ssllabs.com/ssltest/analyze.html?d=www.example.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/example.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/example.com/privkey.pem
   Your cert will expire on 2019-07-16. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le

#### Verifying Certbot Auto-Renewal
```
  $ sudo certbot renew --dry-run
```
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/example.com.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Cert not due for renewal, but simulating renewal for dry run
Plugins selected: Authenticator apache, Installer apache
Renewing an existing certificate
Performing the following challenges:
http-01 challenge for example.com
http-01 challenge for www.example.com
Waiting for verification...
Cleaning up challenges

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
new certificate deployed with reload of apache server; fullchain is
/etc/letsencrypt/live/example.com/fullchain.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates below have not been saved.)

Congratulations, all renewals succeeded. The following certs have been renewed:
  /etc/letsencrypt/live/example.com/fullchain.pem (success)
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates above have not been saved.)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

IMPORTANT NOTES:
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.

## **IMPORTANT! Your account credentials have been saved in your Certbot
  configuration directory at /etc/letsencrypt**
## [certbot official docs](https://certbot.eff.org/docs/)   
### [free domain names](http://www.freenom.com/en/index.html)   

### access phpMyAdmin
```
phpMyAdmin: http://111.11.111.111/phpmyadmin (fake/dummy ip)
username: admin
password:

```
#### [phpMyAdmin change password](https://synoguide.com/2014/02/20/change-password-sql-database-phpmyadmin/)   
login (admin)
goto user accounts (menu)
choose edit privileges on target row
goto change password (menu)

> other phpMyAdmin reading

[How To Install and Secure phpMyAdmin on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04)   
[Securing your phpMyAdmin installation](https://docs.phpmyadmin.net/en/latest/setup.html#securing-your-phpmyadmin-installation)   
[Using SSL for connection to database server](https://docs.phpmyadmin.net/en/latest/setup.html#using-ssl-for-connection-to-database-server)   

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
**note www/html folder does not exist until apache server is set up**

then in the browser type
```
SERVER_IP_ADDRESS/info.php

```
### set up apache web server
### [set up apache virtual host on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts)
[set up apache virtual host on ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04)   
[initial hint - How can I point my domain to a subdirectory off root?](https://www.digitalocean.com/community/questions/how-can-i-point-my-domain-to-a-subdirectory-off-root)

Install apache
>Let's begin by updating the local package index to reflect the latest upstream changes:
```
  $ sudo apt update
```

>Then, install the apache2 package
```
  $ sudo apt install apache2
```

Adjusting the firewall
>List the ufw application profiles by typing:
```
  $ sudo ufw app list
```

>It is recommended that you enable the most restrictive profile that will still allow the traffic you've configured. Since we haven't configured SSL for our server yet in this guide, we will only need to allow traffic on port 80:
```
  $ sudo ufw allow 'Apache'
```

>You can verify the change by typing:
```
  $ sudo ufw status
```

>Check with the systemd init system to make sure the service is running by typing:
```
  $ sudo systemctl status apache2
```

>An alternative is typing this, which should give you your public IP address as seen from another location on the internet:
```
  $ curl -4 icanhazip.com
  $ hostname -I
```
**i like the top one**

#### [Setting Up Virtual Hosts (Recommended)](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04)   
>...and host more than one domain from a single server.

>Create the directory for example.com as follows, using the -p flag to create any necessary parent directories:
```
  $ sudo mkdir -p /var/www/example.com/html
```

>Next, assign ownership of the directory with the $USER environmental variable:
```
  $ sudo chown -R $USER:$USER /var/www/example.com/html
```
>The permissions of your web roots should be correct if you haven't modified your unmask value, but you can make sure by typing:
```
  $ sudo chmod -R 755 /var/www/example.com
```

>Next, create a sample index.html page using nano or your favorite editor:
```
  $ nano /var/www/example.com/html/index.html

actually i needed to do:

  $ cd var/www/example.com/html
  $ sudo nano index.html
```
**i need sudo for the permission to create and modify this file.**   

## **GOTCHA: i was rejected until i changed into the target directory**

>Inside, add the following sample HTML:
```
  <html>
      <head>
          <title>Welcome to Example.com!</title>
      </head>
      <body>
          <h1>Success!  The example.com server block is working!</h1>
      </body>
  </html>
```

>In order for Apache to serve this content, it's necessary to create a virtual host file with the correct directives. Instead of modifying the default configuration file located at /etc/apache2/sites-available/000-default.conf directly, let's make a new one at /etc/apache2/sites-available/example.com.conf:

cd into
```
  $ cd ~
  $ cd ../..
  $ /etc/apache2/sites-available/
  sudo nano example.com.conf
```

**term: configuration block**
>Paste in the following configuration block, which is similar to the default, but updated for our new directory and domain name:
```
  <VirtualHost *:80>
      ServerAdmin admin@example.com
      ServerName example.com
      ServerAlias www.example.com
      DocumentRoot /var/www/example.com/html
      ErrorLog ${APACHE_LOG_DIR}/error.log
      CustomLog ${APACHE_LOG_DIR}/access.log combined
  </VirtualHost>
```
**make neccessary adjustments (example.com)**

[apache a2ensite hint](https://www.systutorials.com/docs/linux/man/8-a2ensite/)   

>Let's enable the file with the a2ensite tool:
```
  $ sudo a2ensite example.com.conf
```


>Disable the default site defined in 000-default.conf:
```
  $ sudo a2dissite 000-default.conf
```

**should i close port 80?**
[Possible to close port 80 and still use port 443?](https://serverfault.com/questions/306610/possible-to-close-port-80-and-still-use-port-443)


>Next, let's test for configuration errors:
```
  $ sudo apache2ctl configtest
```

**you should see the msg: Syntax OK**

Restart Apache to implement your changes:
```
  //To activate the new configuration, you need to run:
  $ systemctl reload apache2

  // the reading suggests
  $ sudo systemctl restart apache2
```
**GOTCHA: https: doesn't work yet so https://example.com will still fail**
---
additional reading
[How To Install Linux, Apache, MySQL, PHP (LAMP) stack on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04)   



### [Installing Joomla](https://docs.joomla.org/J3.x:Installing_Joomla)
[download Joomla](https://github.com/joomla/joomla-cms/releases)
use this link to choose the latest compressed pkg for download
```
$ wget https://github.com/joomla/joomla-cms/releases/download/3.9.1/Joomla_3.9.1-Stable-Full_Package.tar.gz

$ wget https://github.com/joomla/joomla-cms/releases/download/3.6.5/Joomla_3.6.5-Stable-Full_Package.tar.gz
```
unzip and move to target dir
```
$ sudo tar zxvf Joomla_3.9.1-Stable-Full_Package.tar.gz  -C /var/www/dirname
$ sudo tar zxvf Joomla_3.6.5-Stable-Full_Package.tar.gz  -C /var/www/example.com/html
```

change modify directory permissions
```
$ sudo chown -R www-data:www-data /var/www/html/
```

First create a Joomla configuration file and make it temporarily world-writeable:
```
  $ sudo touch /var/www/configuration.php
  $ sudo chmod 777 /var/www/configuration.php
```
**next create joomla db & user**

### [Create the Joomla Database and User - version i used](https://www.digitalocean.com/community/tutorials/how-to-install-joomla-on-a-virtual-server-running-ubuntu-12-04)
[newer version with github joomla download - alt versioFn](https://websiteforstudents.com/install-joomla-ubuntu-17-04-17-10-apache2-mariadb-php/)


1. login to the db (use new changed password)
```
$ mysql -u root -p

$ mysql -u admin -p
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

#### [Setting up a basic firewall](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)   

see current OpenSSH profile in ufw
```
  $ ufw app list
```

make sure firewall allows OpenSSH connections
```
  $ ufw allow OpenSSH
```

enable the firewall
```
  $ ufw enable
```
>Type "y" and press ENTER to proceed.

You can see that SSH connections are still allowed by typing
```
  $ ufw status
```

[How to check your version in linux command line](https://www.cyberciti.biz/faq/how-to-check-os-version-in-linux-command-line/)   
os info (Ubuntu)
```
  $ cat /etc/os-release
```

server info
```
  $ hostnamectl
```

similar os distribution (version) info
```
  $ lsb_release -a
```

importing joomla db
2 major issues

in php.ini file expand upload_max_filesize from 2M to 10M to import entire db (8M)

[Joomla disable twoFactorAuthentication](https://geekflare.com/recover-joomla-if-you-lost-google-authenticator-device/)

rename the plugin
```
  $ sudo mv twofactorauth twofactorauth2
```


#### [update an error in the phpmyadmin files](https://stackoverflow.com/questions/48001569/phpmyadmin-count-parameter-must-be-an-array-or-an-object-that-implements-co)   

#### libraries dir
```
  $ cd usr/share/phpmyadmin/libraries/
```

```
  $ sudo nano /usr/share/phpmyadmin/libraries/sql.lib.php
```

to find in nano is ctrl - w
goto :  shift ctrl _

the problem code
```
  || (count($analyzed_sql_results['select_expr'] == 1)
```

replace with
```
  || ((count($analyzed_sql_results['select_expr']) == 1)
```

[another error in phpmyadmin dealing with php 7.2](https://medium.com/@chaloemphonthipkasorn/แก้-bug-phpmyadmin-php7-2-ubuntu-16-04-92b287090b01)   

```
  $ /usr/share/phpmyadmin/libraries/plugin_interface.lib.php
```
```
  if ($options != null && count($options) > 0) {
    to
  if ($options != null && count((array)$options) > 0) {
```
force (array)

## goto line (nano)
 ```
 alt g
 shift ctrl _
 ```
 > ctrl c to show line numbers

**worked**

[How to Restart Services in Linux](https://www.wikihow.com/Restart-Services-in-Linux)   
### show currently running services
```
  $ sudo ls /etc/rc.d/
```
restart the service
```
  $ sudo systemctl restart [service name]
```
>If the service doesn't restart after doing this, try typing in
```
$ sudo systemctl stop service
$ sudo systemctl start service
```

[another shutdown hint (untested)](https://askubuntu.com/questions/397502/reboot-a-server-from-command-line)   

## important redirect
.htaccess
>this is what i was using and it was working

```
  <VirtualHost *:80>
      <Directory "/var/www/example.com/html" >
         Options Indexes FollowSymLinks Multiviews
         AllowOverride All
         Require all granted
      </Directory>

      ServerAdmin admin@example.com
      ServerName example.com
      ServerAlias www.example.com
      DocumentRoot /var/www/example.com/html
      ErrorLog ${APACHE_LOG_DIR}/error.log
      CustomLog ${APACHE_LOG_DIR}/access.log combined
      RewriteEngine On
      RewriteCond %{SERVER_NAME} =example.com [OR]
      RewriteCond %{SERVER_NAME} =www.example.com
      # RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
      RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [NE,R=permanent]
  </VirtualHost>
```
[hint on letsencrypt's involvement](https://serverfault.com/questions/862788/rewrite-cond-for-domain-and-www-domain-letsencrypt)   
>'The lines Rewrite* have been added by letsencrypt'

> But i don't know where i got this from - and couldn't duplicate it b/c its not documented
> it may have been added to the port 80 virtual host file by letsencrypt but i had to modify it by taking away 'END' flag so i would recognize joomlas menus example.com/whatever

> maybe removing END doesn't do anything - so lets leave it there for a while
