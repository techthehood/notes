# [Node js digital ocean setup](https://marketplace.digitalocean.com/apps/nodejs)   
> NOTE: nodejs droplet is the MERN setup (if mongodb not installed you can install it on this one)
- [ ] setup digital ocean account
- [ ] ssh into the system as root
- [ ] create SSH key (i auto-detected the ssh on droplet creation)
- [ ] create a non-root user w/ssh key access
- [ ] disallow root access
- [ ] setup basic firewall
- [ ] add domain names (DNS)
- [ ] SSL certificate


#### ssh into the system

```
  ssh root@your_droplet_ipv4_address
```
GOTCHA - Permission denied (publickey)   
> i created a nodejs droplet and used my laptops ssh key (auto detected)
> then when i tryied to ssh into the droplet i got the message:

```
  ssh root@your_droplet_ipv4_address: Permission denied (publickey).
```
[DigitalOcean Permission denied (publickey) Solution](https://medium.com/gelecex/digitalocean-permission-denied-publickey-solution-6cd963049fce)  

on my laptop:

```
  cd .ssh
  cat id_rsa.pub
```
> then copy the results "ssh-rsa XXXXXXXXXXXX..." etc

then on the online console

```
cd .ssh
nano authorized_keys
```
i deleted the contents of this file and paste the results of the ssh-copy-id command
> "ssh-rsa XXXXXXXXXXXX..." etc

this may also help
[How to Upload an SSH Public Key to an Existing Droplet](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/to-existing-droplet/)   

Alternatively, instead of opening the file in an editor and pasting your key, you can create the authorized_keys file with your public key added with a single command. If you use this, substitute the contents of your public key into the echo command.
```
  echo "ssh-rsa EXAMPLEzaC1yc2E...GvaQ== username@203.0.113.0" >> ~/.ssh/authorized_keys
```

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
- copy the public key to the user (ssh-copy-id must be done from local machine - 
- IMPORTANT **i navigated to the .ssh dir**
```
$ ssh-copy-id demo@SERVER_IP_ADDRESS
```
> IMPORTANT: this is not needed if you already added public key with root user
> ALSO NOTE: this won't work with a droplet that already has an auto detected public key from the droplet setup - you will have to manually create a .ssh/authorized_keys file for the new non-root user and add the public key data

- from root user cd into the new non-root user dir
```
cd ../home/<non-root-user-alias>
```

- create a new .ssh dir and a new authorized_keys file
```
  mkdir .ssh
  echo > authorized_keys
  nano authorized_keys
```

- open a different terminal and run (locally) from the users .ssh folder
```
  cat id_rsa.pub
```

- paste the output into the nano authorized_keys screen
> "ssh-rsa XXXXXXXXXXXX..." etc

- try ssh into the system again using the new non-root user

```
  ssh new-non-root-user@your-droplet-ipv4-address
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
**not this one use systemctl instructions below**
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

## IMPORTANT FOR MORE ON FILE PERMISSIONS SEE '../chmod file permissions.md'

#### Create a dummy html file for the website you want to use

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

  $ cd /var/www/example.com/html
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

#### prepare to add server blocks
GOTCHA: you have to change the permissions first

move out of non-root user dir
```
  cd ../../
```

cd into nginx dir and change permission of sites-available 
```
  cd etc/nginx/
  sudo chmod 775 sites-available
```
change owner of sites-available 
```
  sudo chown non-root:non-root sites-available
```
now you can use winSCP to transfer any server block files you have into the sites-available dir

#### create/add server blocks to sites-available   

```
  cd etc/nginx/sites-available
```

NOTE: copy the default as a starting template (optional)
```
  sudo cp digitalOcean example.com
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

#### creating symbolic links from these files to the sites-enabled directory
```
  $ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/ 
  //WORKS
  !or 
  $ sudo ln -s sites-available/example.com sites-enabled/ 
  // FAILS
```
> GOTCHA: don't forget to add the .com file in the "from" section

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



#### testing static html notes

i tried to use only the ip address:
GOTCHA: 404 Not Found nginx/1.18.0 (Ubuntu)

typing in example.com
GOTCHA: cloudflare - Web server is down

server block
> uncomment the server blocks similar code and comment or change nodejs location / block
```
location / { 
  # First attempt to serve request as file, then                
  # as directory, then fall back to displaying a 404. 
  try_files $uri $uri/ =404; 
}

# nodejs

#location / {
   # some text
  ...
```

if cloudflare has been setup make sure its ssl certificate (eventually set to full) is set to off

SSL/TLS
[x] Off (not secure) - No encryption applied
...
[ ] Full Encrypts end-to-end, using a self signed certificate on the server

ISSUE also
example.com redirected you too many times.

clear redirects
**sites-available/example.com**
```
    if ($host = www.example.com) {
        #return 301 https://$host$request_uri;
    }


    if ($host = example.com) {
        #return 301 https://$host$request_uri;
    }

```

GOTCHA - kept getting the too many redirects issue after commenting out the redirects so i used cloudflares ssl flexible setting

[ ] Flexible - Encrypts traffic between the browser and Cloudflare

you may need to restart nginx

```
  sudo systemctl restart nginx
```

IMPORTANT - this whole html test part is a mess - LATER i will need to practice this a few times to streamline the entire process. i want to be able to do this without the issues.


#### create a .bash_profile in the users Directory
>for custom color coded terminal prompts

.bash_profile
```
# test for and load my bashrc file
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi


# colors!
green="\[\033[0;32m\]"
blue="\[\033[0;34m\]"
purple="\[\033[0;35m\]"
red="\e[0;31m"
yellow='\e[0;33m'
reset="\[\033[0m\]"

# other colors
txtblk='\e[0;30m' # Black - Regular
txtred='\e[0;31m' # Red
txtgrn='\e[0;32m' # Green
txtylw='\e[0;33m' # Yellow
txtblu='\e[0;34m' # Blue
txtpur='\e[0;35m' # Purple
txtcyn='\e[0;36m' # Cyan
txtwht='\e[0;37m' # White

bldblk='\e[1;30m' # Black - Bold
bldred='\e[1;31m' # Red
bldgrn='\e[1;32m' # Green
bldylw='\e[1;33m' # Yellow
bldblu='\e[1;34m' # Blue
bldpur='\e[1;35m' # Purple
bldcyn='\e[1;36m' # Cyan
bldwht='\e[1;37m' # White

unkblk='\e[4;30m' # Black - Underline
undred='\e[4;31m' # Red
undgrn='\e[4;32m' # Green
undylw='\e[4;33m' # Yellow
undblu='\e[4;34m' # Blue
undpur='\e[4;35m' # Purple
undcyn='\e[4;36m' # Cyan
undwht='\e[4;37m' # White

bakblk='\e[40m'   # Black - Background
bakred='\e[41m'   # Red
badgrn='\e[42m'   # Green
bakylw='\e[43m'   # Yellow
bakblu='\e[44m'   # Blue
bakpur='\e[45m'   # Purple
bakcyn='\e[46m'   # Cyan
bakwht='\e[47m'   # White

txtrst='\e[0m'    # Text Reset


print_before_the_prompt () {
    printf "\n$txtblk$bakblu[server]$yellow%s\n" "$PWD"
}
PROMPT_COMMAND=print_before_the_prompt

# Change command prompt
source ~/git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=1
# '\u' adds the name of the current user to the prompt
# '\$(__git_ps1)' adds git-related stuff
# '\W' adds the name of the current directory
export PS1="$purple\u$green\$(__git_ps1)$blue \W $ $reset"

```

> specifically change this line
```
  printf "\n$txtblk$bakblu[server]$yellow%s\n" "$PWD"
```
>and add a unique color combination to the text (black)
```
  $txtbkl
```
> and the background (blue)
```
  $bakblu
```

**see /servers/letsencrypt/letsencrypt 2021.md**

#### 