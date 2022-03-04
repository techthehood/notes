# MERN setup
[Initial Server Setup with Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04)    

**GOTCHA: NOTE:** digital ocean doesn't have a MERN stack (if it ever did it doesn't anymore) 
> digital ocean is now trying to upsell "managed" databases starting at $15 a month.  And now in order 
> not to cut into their profits they have rolled back features where databases are no longer part of some 
> tech stacks.

## MERN Assets

- Node.js
- Managing ports 
- create non root user
- SSH
- disable root user (disallow remote ssh root access)
- firewall setup
- winSCP ssh
- Server Block
- sites-enabled symlink
- Configure Domain Name
- SSL (requires server blocks, sites-enabled, A record with www & @ )
- manage script styling and display
- static server (?)
- MongoDB
- NVM
- PM2
- .bash_profile
- reverse proxy app server

## GOTCHA: KNOWN GOTCHAS

- hostname should be the same as the domain name without the TLD (extension)  
DOCS: if you don't use the recommended hostname change it: 
[Ubuntu Linux Change Hostname (computer name)](https://www.cyberciti.biz/faq/ubuntu-change-hostname-command/)   

- cloudflare will assume an ip address that may not target your server. make sure to change it to your servers ip address

- [Cloudflare flexible ssl HTTP to HTTPS Nginx too many redirects](https://stackoverflow.com/questions/41583088/http-to-https-nginx-too-many-redirects)   

- the example.com server block automatically redirects your http to https and then runs the top server block which if setup with an index.html file in the root file path's folder will display a default html page unless you haven't commented out the entire "location /" server block

```
  #location / {
  #  # new node.js server root
  #  add_header X-app2-message "alight section entered" always;
  #  add_header 'Service-Worker-Allowed' '/';
  #  proxy_pass http://localhost:1027;
  #  proxy_http_version 1.1;
  #  proxy_set_header Upgrade $http_upgrade;
  #  proxy_set_header Connection 'upgrade';
  #  proxy_set_header Host $host;
  #  proxy_cache_bypass $http_upgrade;
  #}

```
> this location block connects to your pm2 express server. 
> there are 2 options available to you:
1. NOTE: comment out the entire section (example above) if you want to load a default static html page
2. create a express server running on port 1027 or the domain name will show an error page

### Articles
[How To Install Nginx on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)   
> i used Step 5 – Setting Up Server Blocks (Recommended)

### start with a Node droplet
> ~~there is a mongoDB droplet~~ i selected to be on the safe side but i believe it just sends you to the same node droplet - it also has pm2 preinstalled (nginx also)   
> GOTCHA: you have to install mongodb yourself

#### install MongoDB on Ubuntu

[How To Install MongoDB on Ubuntu 16.04 LTS / Ubuntu 18.04 LTS](https://youtu.be/WH5GgHaEy7E)   

```
  sudo apt-get install mongodb
  sudo apt-get update
```

### to start the mongodb shell   

```
  mongo
```

### GOTCHA: to start mongodb service   

```
    sudo service mongodb start
```
> do this if starting the shell fails

[Getting started after deploying NodeJS](https://marketplace.digitalocean.com/apps/nodejs?ipAddress=143.198.5.134#getting-started)   

#### see ubuntu version   

```
  lsb_release -a
```

#### Managing ports (allowing https)   

List the application configurations that ufw knows how to work with by typing:   

```
  sudo ufw app list
```

#### You can enable this by typing:   

```
  sudo ufw allow 'Nginx Full'
```

#### You can verify the change by typing:

```
  sudo ufw status
```

#### Checking your webserver

We can check with the systemd init system to make sure the service is running by typing:   

```
  systemctl status nginx
```

### [login as root](https://www.digitalocean.com/docs/droplets/how-to/connect-with-console/)
[How to Connect to your Droplet with OpenSSH on Linux or macOS](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/openssh/)
[what is OpenSSH? ](https://www.webopedia.com/TERM/O/OpenSSH.html)   
>Once you have your Droplet’s IP address, username, and password (if necessary), follow the instructions for your SSH client. OpenSSH is included on Linux and macOS. Windows users with Bash also have access to OpenSSH. Windows users without Bash can use PuTTY.

```
ssh root@SERVER_IP_ADDRESS
```

**to login as root initially you have to copy and paste the password from the email your receive from creating the droplet** 

**NOTE: you only have to paste the password from the email if you have to reset root password.**

NOTE: you will have to paste the password blind using right click paste then type enter

once you login in using the pasted password you will be asked to change the password starting with **pasting the same** initial password blindly and typing enter.

then you can blindly type and retype to confirm your desired root password.

**changing your custom root password**

### [creating a non root user](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)

1. login as root
2. add a new user
**'newUsername' represents name of new user**
```
$ adduser newUsername
```

3. give user root privileges
```
$ gpasswd -a newUsername sudo
```

4. add public key authentication
- generate key with keygen (already done for root) - (NOTE: i can use the old key that is already there (from my other digitalOcean sites) no keygen needed)
- 
- copy the public key to the user (**ssh-copy-id must be done from local machine** - i navigated to the .ssh dir)
```
$ ssh-copy-id newUsername@SERVER_IP_ADDRESS
```

**GOTCHA:** [ssh-copy-id Permission denied (publickey).](https://phoenixnap.com/kb/ssh-permission-denied-publickey)   
> i decided not to add a password and instead added an ssh key when i created the droplet and now it only want this
> on login

```
  sudo nano /etc/ssh/sshd_config

  // in nano - sshd_config
  PasswordAuthentication yes
  ChallengeResponseAuthentication no
```

then restart the SSH service
```
  sudo systemctl restart sshd
```
> then try ssh-copy-id ... above


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
> also turn off PasswordAuthentication

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

[change the sudo or root password](https://phoenixnap.com/kb/change-root-password-ubuntu)   

<!-- 
██   ██ ███████ ██    ██  ██████  ███████ ███    ██     ██████  ██████   ██████   ██████ ███████ ███████ ███████ 
██  ██  ██       ██  ██  ██       ██      ████   ██     ██   ██ ██   ██ ██    ██ ██      ██      ██      ██      
█████   █████     ████   ██   ███ █████   ██ ██  ██     ██████  ██████  ██    ██ ██      █████   ███████ ███████ 
██  ██  ██         ██    ██    ██ ██      ██  ██ ██     ██      ██   ██ ██    ██ ██      ██           ██      ██ 
██   ██ ███████    ██     ██████  ███████ ██   ████     ██      ██   ██  ██████   ██████ ███████ ███████ ███████ 
                                                                                                      
 -->

### NOTE: if i didn't already have a key i would have to do this:

### [how to add ssh keys to droplets](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/)
[is it safe to use same ssh key on multiple servers?](https://unix.stackexchange.com/questions/27661/good-practice-to-use-same-ssh-keypair-on-multiple-machines)
**seems like its ok**


### create SSH key (skip if your local computer has an ssh key already made)
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
> all your sites can share one public key

<!-- 
██   ██ ███████ ██    ██  ██████  ███████ ███    ██     ██████  ██████   ██████   ██████ ███████ ███████ ███████ 
██  ██  ██       ██  ██  ██       ██      ████   ██     ██   ██ ██   ██ ██    ██ ██      ██      ██      ██      
█████   █████     ████   ██   ███ █████   ██ ██  ██     ██████  ██████  ██    ██ ██      █████   ███████ ███████ 
██  ██  ██         ██    ██    ██ ██      ██  ██ ██     ██      ██   ██ ██    ██ ██      ██           ██      ██ 
██   ██ ███████    ██     ██████  ███████ ██   ████     ██      ██   ██  ██████   ██████ ███████ ███████ ███████ 
                                                                                                      
 -->

#### Setting Up a Basic Firewall

```
  $ ufw app list
```
 
>Output
>Available applications:
>  OpenSSH


- We need to make sure that the firewall allows SSH connections so that we can log back in next time. We can allow these connections by typing:

```
  $ ufw allow OpenSSH
```
 
- Afterwards, we can enable the firewall by typing:

```
  $ ufw enable
```

#### WinSCP SSH

- file Protocol: SFTP
- Hostname: ip_address
- port number: 22
- user name: server user

- Advanced > SSH > Authentication > Private key file: C:\Users\<localUsername>\.ssh\id_rsa.ppk

### create server blocks   

```
  $ cd etc/nginx/sites-available
```

simple server block sample

```
  server {
          listen 80;
          listen [::]:80;

          root /var/www/your_domain/html;
          index index.html index.htm index.nginx-debian.html;

          server_name your_domain www.your_domain;

          location / {
                  try_files $uri $uri/ =404;
          }
  }
```

[nginx — How to Serve a Static HTML Page](https://futurestud.io/tutorials/nginx-how-to-serve-a-static-html-page)   

goto/create the html folder specified on the server block and create the index.html file

```
  // make the new site html directory
  cd /var/www/
  sudo mkdir yourdomain.com
  sdo mkdir yourdomain.com/html

  // change the owner from root to your user
  chown -R youruser:youruser yourdomain.com

  // change permissions
  sudo chmod -R 755 /var/www/your_domain

  // go into new html folder
  cd yourdomain.com/html/

  // create an index.html file
  echo "hello world!" > index.html 
  // or use example below (recommended)

```

> That’s it! Ensure the root and index properties and nginx serves static HTML and JavaScript files.

[How To Install Nginx on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)   
> i used Step 5 – Setting Up Server Blocks (Recommended)

- html sample

```
  <html>
      <head>
          <title>Welcome to your_domain!</title>
      </head>
      <body>
          <h1>Success!  The your_domain server block is working!</h1>
      </body>
  </html>
```
> GOTCHA: YOU MUST COMMENT OUT THE LOCATION / SERVER BLOCK FOR THE STATIC PAGE TO WORK

#### change the owner on the sites-available directory and contents

```

```

#### creating symbolic links from these files to the sites-enabled directory   
  
```
  $ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

[How to Remove Symbolic Link in Linux with Example](https://linoxide.com/linux-how-to/remove-symbolic-link/)    

**failed**

```
  sudo rm beta.example.com

```   

**works**   

```

  unlink beta.example.com
```

[How To Set Up Nginx Server Blocks (Virtual Hosts) on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04)   

  > In order to avoid a possible hash bucket memory problem that can arise from adding additional server names, we will also adjust a single value within our /etc/nginx/nginx.conf file. Open the file now:

```

  sudo nano /etc/nginx/nginx.conf
  
```
  > Within the file, find the server_names_hash_bucket_size directive. Remove the # symbol to uncomment the line:

```
  http {
    . . .

    server_names_hash_bucket_size 64;

    . . .
  }
```

#### test site with ip address

GOTCHA: conflicting server name example com on 0.0 0.0 80 ignored
> solved by commenting out server_names in all but one server {} block

GOTCHA: letsencrypt error [recognizing] subdomain, cloudflare not connecting to subdomain
> Cloudflare SSL/TLS encryption mode: i had to turn off strict mode and put it in flex mode


[Changing Ubuntu Password in the Command Line](https://phoenixnap.com/kb/change-root-password-ubuntu)   

```
  sudo passwd
```
- will see prompts to change and verify new password

[How To Secure Nginx with Let's Encrypt on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)   


#### verify the syntax of your configuration edits:   

```
  sudo nginx -t

  // If there aren’t any problems, restart Nginx to enable your changes:

  sudo systemctl restart nginx
```

### Domain Management

#### GOTCHA: use Create dropdown menu to get to domains

### Configure Domain Name
- Create a Cloudflare account
- add a target domain name

#### DNS menu
- goto DNS menu item and add the D.O. ip_address to the first "A" record
- add example.com to the CNAME after www

#### Domain Name Garage
- add Cloudflare Nameservers to your domain hosting service custom DNS

#### D.O. Create Record
- add A record using "@" symbol and ip address create a new record
- add a record using "www" and also adding the ip address


- comment out the location server block in sites-available/example.com to connect to static page
- GOTCHA: you have to also turn off cloudflares SSL encryption mode

GOTCHA: [How to Fix Cloudflare Error 521: Web Server is Down](https://webpop.io/cloudflare/error-521/)   

```
  curl http://ip_address
```
> In my case the static page was returned.  ultimately cloudflare was forcing 443 https when no ssl certificate or 443 
> route was created yet.  to fix this i had to turn cloudflare SSL off and downgrade the protocol to http:

- once i got past the server down error and got a white page for both domains i started the SSL process with letsencrypt

#### [installing a node version manager](https://github.com/nvm-sh/nvm)    

```
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```
> then restart / exit and log back in to terminal (**recommended**) for changes to take place
> i sourced .bashrc then .bash_profile to force it but its probably easire to ssh back in

[digital ocean nginx, ubuntu 18.04.2 ssl instructions](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)   
> also covers certbot auto-renewal


NOTE: see 2021 method in letsencrypt.md (install snap)

### SSL certificate setup   
> NOTE: SEE SERVERS/LETSENCRYPT

**NOTE: there seems to be an updated instruction for each os version - ubuntu 18.04 doesn't have certbot installed && "Certbot doesn't know how to automatically configure the web server on this system."**   

#### install certbot  
## [Official certbot install instructions](https://certbot.eff.org/)   
> install using snap instead   



### **SKIP SECTION (deprecated)**

```
  $ sudo apt install certbot python3-certbot-nginx
```

>Certbot is in very active development, so the Certbot packages provided by Ubuntu tend to be outdated. However, the Certbot developers maintain a Ubuntu software repository with up-to-date versions, so we'll use that repository instead.

>First, add the repository:
**proper certbot installation**
```
  $ sudo add-apt-repository ppa:certbot/certbot
```

### **SKIP SECTION**


#### create an ssl certificate
```
sudo certbot --nginx -d example.com -d www.example.com
```
#### Verifying Certbot Auto-Renewal

```
  $ sudo systemctl status certbot.timer
```

#### make sure it auto renews

```
  $ sudo certbot renew --dry-run
  
  // then?
```
> it appears there is no then.  the dry-run flag also sets the actual cronjob for auto renewal   

#### manage script styling and display

- copy over .bash_profile file to user root  
```
  // restart - NOTE: you may need to also restart .bash_rc (idk in which order)
  . .bash_profile
```
> then restart or exit and log back in for changes to take place
> its easier to exit then worry about the restart file and order you need to do it in.


### this is a good time to create an alias for logging in

- log out of the ssh terminal
```
  exit
```
- goto the local terminal root
```
cd ~
```

- edit the bash_profile file

```
nano .bash_profile
```
> if there isn't a .bash_profile file or its empty you can use the one in this binder and add aliases to it.

- write your new alias

```
  ssh newroot@server-ip-address
```

#### install pm2 (may already be installed)   

- check for installation

```
  pm2 --version
```

[pm2 docs](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)   
[nodejs pm2](https://www.npmjs.com/package/pm2)   
[pm2 process management](http://pm2.keymetrics.io/docs/usage/process-management/)   
> Use npm to install the latest version of PM2 on your server

```
  $ sudo npm install pm2@latest -g
```

#### give the app a unique name
```
  pm2 start app.js --name "my-api"
```


