# DigitalOcean LEMP setup

- [ ] setup digital ocean account
- [ ] login as root
- [ ] create SSH key
- [ ] create a non-root user w/ssh key access
- [ ] disallow root access
- [ ] setup basic firewall
- [ ] add domain names (DNS)
- [ ] add phpMyAdmin
- [ ] ~~setup apache web server~~
- [ ] setup apache virtual host
- [ ] SSL certificate
- [ ] access phpMyAdmin
- [ ] phpMyAdmin change password
- [ ] create joomla database
- [ ] install joomla

note: get ip address
```
  $ curl -4 icanhazip.com
  $ hostname -I
```
print the last 100 lines of the log file
```
  $ sudo tail -n 100 /var/log/nginx/error.log
```
test to make sure that there are no syntax errors in any of your Nginx files:
```
  $ sudo nginx -t
```

[Initial Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)   

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

### create a new root password
a root password is sent to your email account but says you will be asked to change it the first time you log into the server. so have a strong password ready when you log in.

### [how to add ssh keys to droplets](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/)
[is it safe to use same ssh key on multiple servers?](https://unix.stackexchange.com/questions/27661/good-practice-to-use-same-ssh-keypair-on-multiple-machines)
**seems like its ok**

### create SSH key
**i navigated into the target dir (local .ssh dir)**
**you can skip to upload public key if there is a public key already in the .ssh dir**
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

4. add public key authentication to non-root user
**i skipped down to upload public key to root then came back to this**
- generate key with keygen (already done for root) - (i can use the old key that is already there no keygen needed)
- copy the public key to the user (ssh-copy-id must be done from local machine - i navigated to the .ssh dir)
```
$ ssh-copy-id demo@SERVER_IP_ADDRESS
```

### disallow remote ssh root access (Configure SSH Daemon)
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
**not this one**
```
$ service ssh restart
```

[how to restart services in linux](https://www.wikihow.com/Restart-Services-in-Linux)   
```
  $ sudo systemctl restart ssh
```
**this worked, even though the last time i did it i got no feedback**

**thats it**

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


### [path to www/html folder](https://www.digitalocean.com/community/questions/what-is-the-correct-folder-to-put-my-website-files-var-www-or-var-www-html)
## **GOTCHA: in ubuntu 18.04 (plain droplet) there is no www folder until you configure apache server**
```
cd ../var/www/html
$ ls
```
**back out of ~ root folder then > var > www > html**
ls exposes the index.html file in the root html folder

#### set up nginx server blocks (virtual servers)
[How To Set Up Nginx Server Blocks (Virtual Hosts) on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04)   

```
  $ sudo mkdir -p /var/www/example.com/html
```
also:
#### [Apache - Setting Up Virtual Hosts (Recommended)](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04)   
>...and host more than one domain from a single server.


change the permissions to the user
```
  $ sudo chown -R $USER:$USER /var/www/example.com/html
```

[Discussion about permissions for web folders](https://www.digitalocean.com/community/questions/discussion-about-permissions-for-web-folders)   
[Solving the web file permissions problem once and for all](https://web.archive.org/web/20180422200034/http://blog.netgusto.com/solving-web-file-permissions-problem-once-and-for-all/)    
[recommended article on permissions (bindfs)](https://web.archive.org/web/20180422200034/http://blog.netgusto.com/solving-web-file-permissions-problem-once-and-for-all/)  

The bindfs solution  
[How to Install ‘bindfs’ on Ubuntu 18.04](https://www.talkerland.com/2018/08/20/howard/how-to-install-bindfs-on-ubuntu-18-04/)   

## FOR MORE ON FILE PERMISSIONS SEE 'chmod file permissions.md'
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

> Next, create a sample index.html page using nano or your favorite editor:

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

create server blocks
```
  $ cd etc/nginx/sites-available
```

there was a digitalOcean server block
```
  nano DigitalOcean
  //returns

  # You may add here your
  # server {
  #       ...
  # }
  # statements for each of your virtual hosts to this file

  ##
  # You should look at the following URL's in order to grasp a solid understanding
  # of Nginx configuration files in order to fully unleash the power of Nginx.
  # http://wiki.nginx.org/Pitfalls
  # http://wiki.nginx.org/QuickStart
  # http://wiki.nginx.org/Configuration
  #
  # Generally, you will want to move this file somewhere, and start with a clean
  # file but keep this around for reference. Or just disable in sites-enabled.
  #
  # Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
  ##

  server {
        listen 80 default_server;
        listen [::]:80 default_server ipv6only=on;

        root /var/www/html;
        index index.php index.html index.htm;

        # Make site accessible from http://localhost/
        server_name localhost;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
                # Uncomment to enable naxsi on this location
                # include /etc/nginx/naxsi.rules
        }

        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
                root /usr/share/nginx/html;
        }

        location ~ \.php$ {
         include snippets/fastcgi-php.conf;
         fastcgi_pass unix:/run/php/php7.2-fpm.sock;
        }

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
      }

      # another virtual host using mix of IP-, name-, and port-based configuration
#
#server {
#       listen 8000;
#       listen somename:8080;
#       server_name somename alias another.alias;
#       root html;
#       index index.html index.htm;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }
#}


# HTTPS server
#
#server {
#       listen 443;
#       server_name localhost;
#
#       root html;
#       index index.html index.htm;
#
#       ssl on;
#       ssl_certificate cert.pem;
#       ssl_certificate_key cert.key;
#
#       ssl_session_timeout 5m;
#
#       ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
#       ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
#       ssl_prefer_server_ciphers on;
#
#       }
#}


# HTTPS server
#
#server {
#       listen 443;
#       server_name localhost;
#
#       root html;
#       index index.html index.htm;
#
#       ssl on;
#       ssl_certificate cert.pem;
#       ssl_certificate_key cert.key;
#
#       ssl_session_timeout 5m;
#
#       ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
#       ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
#       ssl_prefer_server_ciphers on;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }
#}

```

create my server block
```
   server {

        listen 80;
        listen [::]:80;

        root /var/www/example.com;

        server_name example.com www.example.com;
        index index.html index.htm index.nginx-debian.html;

        location / {
                try_files $uri $uri/ =404;
        }

    }

```
> i will be adding default_server later

```
        listen 80 default_server;
        listen [::]:80 default_server;
```

creating symbolic links from these files to the sites-enabled directory
```
  $ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

>In order to avoid a possible hash bucket memory problem that can arise from adding additional server names, we will go ahead and adjust a single value within our /etc/nginx/nginx.conf file. Open the file now:

```
  $ sudo nano /etc/nginx/nginx.conf
```

> Within the file, find the server_names_hash_bucket_size directive. Remove the # symbol to uncomment the line:

```
  http {
    . . .

    server_names_hash_bucket_size 64;

    . . .
}
```
#### Test and restart
> Next, test to make sure that there are no syntax errors in any of your Nginx files:

```
  $ sudo nginx -t
```

>If no problems were found, restart Nginx to enable your changes:

```
  $ sudo systemctl restart nginx
```

#### Package transfer joomla dir
**i also downloaded phpmyadmin db example_main**
```
  $ tar -czvf transfer_Joomla_copy_3.9.1.tar.gz /var/www/example.com/html/
```

#### prep and install phpmyadmin   
[How to Install and Secure phpMyAdmin with Nginx on an Ubuntu 18.04 server](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-nginx-on-an-ubuntu-18-04-server)   
[phpmyadmin docs](https://www.example.com/phpmyadmin/doc/html/index.html)   

```
  $ sudo apt update
  $ sudo apt install phpmyadmin
```
> tab > ok to skip server selection
> yes for dbconfig-common
> add a new password

setup a symbolic link (shortcut) from phpmyadmin to root dir
> For the Nginx web server to find and serve the phpMyAdmin files correctly, we’ll need to create a symbolic link from the installation files to Nginx's document root directory:

```
  $ sudo ln -s /usr/share/phpmyadmin /var/www/html
```
[Remove a single Certbot (LetsEncrypt) certificate from a server](https://www.jeffgeerling.com/blog/2016/remove-single-certbot-letsencrypt-certificate-server)   

#### install ssl certificate
[How To Secure Nginx with Let's Encrypt on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)   

install up-to-date cerbot repository
```
  $ sudo add-apt-repository ppa:certbot/certbot
```

>Install Certbot's Nginx package with apt:

```
  $ sudo apt install python-certbot-nginx
```

allow https access through the Firewall
```
  $ sudo ufw app list
  $ sudo ufw status
  $ sudo ufw allow 'Nginx Full'
  $ sudo ufw delete allow 'Nginx HTTP'
```
start the process of obtaining the ssl certificate
```
  $ sudo certbot --nginx -d example.com -d www.example.com
```
sudo certbot --nginx -d example.com -d www.example.com

GOTCHA: phpmyadmin 403 forbidden error
[How to fully remove phpMyAdmin?](https://askubuntu.com/questions/507874/how-to-fully-remove-phpmyadmin)   
```
  $ sudo apt-get purge phpmyadmin
```

### GOTCHA: unable to log in with full phpmyadmin privaledges - used mysql
[Cannot enter phpmyadmin as root](https://askubuntu.com/questions/763336/cannot-enter-phpmyadmin-as-root-mysql-5-7)   
```
  $ sudo mysql --user=root mysql
```

then in MySQL
```
  > CREATE USER 'some_usr'@'localhost' IDENTIFIED BY 'some_pass';
  GRANT ALL PRIVILEGES ON *.* TO 'some_usr'@'localhost' WITH GRANT OPTION;
  FLUSH PRIVILEGES;
```

Add the joomla copy tar-gz file
```
  $ sudo tar zxvf transfer_Joomla_copy_3.9.1.tar.gz  -C /var/www/example.com/html
```


[php.ini location](https://www.digitalocean.com/community/questions/upload_max_filesize-in-php-ini-one-more-time)   
```

  $ sudo nano /etc/php/7.2/fpm/php.ini

  ctrl - W upload_max_filesize

```
### GOTCHA: phpmyadmin has a limit on import file sizes. i need to increase it
in fpm file update
```
  post_max_size = 10M
  upload_max_filesize = 10M
```

#### also add to the nginx.conf file
[Nginx: 413 – Request Entity Too Large Error and Solution](https://www.cyberciti.biz/faq/linux-unix-bsd-nginx-413-request-entity-too-large/)   
[413 Request Entity Too Large - forum](https://github.com/phpmyadmin/docker/issues/189)   
```
  http {
    client_max_body_size 10M;
  }
```

then restart the php service and the nginx server
```
  $ sudo systemctl restart php7.2-fpm
  $ sudo systemctl restart nginx
```

### GOTCHA:
in php.ini file expand upload_max_filesize from 2M to 10M to import entire db (8M)
[Import file size limit in PHPMyAdmin](https://stackoverflow.com/questions/3958615/impor(t-file-size-limit-in-phpmyadmin)   
[Where is my PHP php.ini Configuration File Located?](https://devanswers.co/ubuntu-php-php-ini-configuration-file/)    

> The limit of the image is supposed to be 512 MB:
>
> docker/etc/nginx.conf
>
> Line 41 in b1e2062
>

```
 client_max_body_size 512M;
 ```

> docker/php.ini
>
> Lines 6 to 7 in b1e2062

```
 post_max_size = 512M
 upload_max_filesize = 512M
```

### GOTCHA: move all the files into the correct html folder

[move all files from one dir to another ](https://unix.stackexchange.com/questions/6393/how-do-you-move-all-files-including-hidden-from-one-directory-to-another)    

>i somehow saved the zip files wrong. they seem to literally be saved in the folder structure from var idk how. so now i have to move all the contents from their version of var/www/fldr/html to the correct version

```
  mv some_dir/* another_dir/
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

#### set up node on nginx
[Setting up Node, MySQL and Nginx on Digital Ocean](https://medium.com/@eligijuskrepsta/setting-up-node-mysql-and-nginx-on-digital-ocean-247546be20df)   

> First, install the NodeSource PPA in order to get access to its contents. Make sure you're in your home directory, and use curl to retrieve the installation script for the Node.js 8.x archives:

```
  $ cd ~
  $ curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
```

> You can inspect the contents of this script with nano or your preferred text editor:
> When you're done inspecting the script, run it under sudo:

```
  $ nano nodesource_setup.sh
  $ sudo bash nodesource_setup.sh
```

#### install the nodejs package
> then you can check the version

```
  $ sudo apt install nodejs
  $ nodejs -v
```

> In order for some npm packages to work (those that require compiling code from source, for example), you will need to install the build-essential package:

```
  $ sudo apt install build-essential
```

create & test a node application in the ~ dir

hello.js
```
  const http = require('http');

  const hostname = 'localhost';
  const port = 3000;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
```

test with node
```
  $ node hello.js
```

open a new terminal & ssh session then test again with
```
  $ curl http://localhost:3000
```

#### install pm2   
[pm2 docs](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)   
[nodejs pm2](https://www.npmjs.com/package/pm2)   
> Use npm to install the latest version of PM2 on your server:

```
  $ sudo npm install pm2@latest -g
```

> use the pm2 start command to run your application, hello.js, in the background:

```
  $ pm2 start hello.js
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

#### Setting Up Nginx as a Reverse Proxy Server
[How To Set Up a Node.js Application for Production on Ubuntu 18.04]](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)   

add this location to the server block (near the other location)
```
  server {
  ...
      location /app2 {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
  ...
  }
```

test for syntax errors and restart the nginx server
```
  $ sudo nginx -t
  $ sudo systemctl restart nginx
```
[static file hint - (longshot help)](https://stackoverflow.com/questions/13395742/can-not-get-css-file)   
**helped connect a piece of the puzzle in my mind**
#### GOTCHA to get express to recognize the location path you have to add it
[express app.use](http://expressjs.com/en/4x/api.html#app.use)   
in app.js:
app.use method - app.use('/location_path',
each get method - app.get('/loction_path/path',
```
  app.use('/node_req',express.static(publicDirectoryPath));
  //app.use(express.static(publicDirectoryPath));// formerly

  app.get('/node_req/weather', (req, res) => {
  ```

in index.hbs file
add to all the static links
```
  <link rel="icon" href="/nodereq/img/weather.png">
  <link rel="stylesheet" href="/node_req/css/style.css">
  <script type="text/javascript" src="/nodereq/js/app.js"></script>
```
but not in form index.html
```
  <form class="" action="index.html" method="post">
```
