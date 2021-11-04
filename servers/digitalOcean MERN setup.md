# MERN setup
[Initial Server Setup with Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04)

## MERN Assets

- Node.js
- Managing ports 
- disable root user
- create non root user
- SSH
- firewall setup
- Server Block
- sites-enabled symlink
- SSL (requires server blocks, sites-enabled, A record with www & @ )
- manage script styling and display
- static server (?)
- MongoDB
- NVM
- PM2
- reverse proxy app server

### start with a Node droplet

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
**'demo' represents name of new user**
```
$ adduser demo
```

3. give user root privileges
```
$ gpasswd -a demo sudo
```

4. add public key authentication
- generate key with keygen (already done for root) - (NOTE: i can use the old key that is already there (from my other digitalOcean sites) no keygen needed)
- 
- copy the public key to the user (ssh-copy-id must be done from local machine - i navigated to the .ssh dir)
```
$ ssh-copy-id demo@SERVER_IP_ADDRESS
```




### NOTE: if i didn't already have a key i would have to do this:

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
> all your sites can share one public key

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

### Configure SSH Daemon (to disallow remote ssh root access)   

open the following file

```
  $ nano /etc/ssh/sshd_config
```
**GOTCHA: notice sshd_config not ssh_config**

change this line to no
```
  $ PermitRootLogin yes
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

[change the sudo or root password](https://phoenixnap.com/kb/change-root-password-ubuntu)   

### create server blocks   

```
  $ cd etc/nginx/sites-available
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
```
[digital ocean nginx, ubuntu 18.04.2 ssl instructions](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)   
> also covers certbot auto-renewal




### SSL certificate setup   

**NOTE: there seems to be an updated instruction for each os version - ubuntu 18.04 doesn't have certbot installed && "Certbot doesn't know how to automatically configure the web server on this system."**   

#### install certbot  
## [Official certbot install instructions](https://certbot.eff.org/)   
> install using snap instead   




### **SKIP SECTION**

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

#### [installing a node version manager](https://github.com/nvm-sh/nvm)    

```
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```
> then restart / exit and log back in (**recommended**) for changes to take place

#### install pm2   

[pm2 docs](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)   
[nodejs pm2](https://www.npmjs.com/package/pm2)   
[pm2 process management](http://pm2.keymetrics.io/docs/usage/process-management/)   
> Use npm to install the latest version of PM2 on your server:

```
  $ sudo npm install pm2@latest -g
```

#### give the app a unique name
```
  pm2 start app.js --name "my-api"
```