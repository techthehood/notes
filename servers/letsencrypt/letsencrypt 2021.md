## 2021 method

## [Official certbot install instructions](https://certbot.eff.org/)   

### [update certbot with snap](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)   
*fails 404*

#### [update certbot with snap](https://certbot.eff.org/instructions?ws=nginx&os=ubuntubionic)   

#### [installing snap](https://snapcraft.io/docs/installing-snapd)   
> its pre-installed on my ubuntu version (check lin for versions)   

#### make sure snap is up to date

``` 
  $ sudo snap install core; sudo snap refresh core
```

#### remove old certbot

```
  $ sudo apt-get remove certbot
```
> trying to figure out if this is already done?  this is returned  
sudo apt-get remove certbot
Reading package lists... Done
Building dependency tree
Reading state information... Done
Package 'certbot' is not installed, so not removed

#### Install Certbot

> Run this command on the command line on the machine to install Certbot.

```
  $ sudo snap install --classic certbot
```
> if this is already done it will return:
sudo snap install --classic certbot
snap "certbot" is already installed, see 'snap help refresh'

#### Prepare the Certbot command   

> Execute the following instruction on the command line on the machine to ensure that the certbot command can be run.   

```
  $ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

#### install your certificates...

> Run this command to get a certificate and have Certbot edit your Nginx configuration automatically to serve it, turning on HTTPS access in a single step.

```
// not this
  $ sudo certbot --nginx

// run this
  $ sudo certbot --nginx -d example.com -d www.example.com
```

> GOTCHA: 
> Hint: The Certificate Authority failed to verify the temporary nginx configuration changes made by Certbot. Ensure the listed domains point to this nginx server and that it is accessible from the internet.

> Some challenges have failed.
>Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /var/log/letsencrypt/letsencrypt.log or re-run Certbot with -v for more details.   




#### Test automatic renewal   

> The Certbot packages on your system come with a cron job or systemd timer that will renew your certificates automatically before they expire. You will not need to run Certbot again, unless you change your configuration.

> You can test automatic renewal for your certificates by running this command:   

```
  $ sudo certbot renew --dry-run
```

> worked

sudo certbot --nginx -d abinaryds.com -d www.abinaryds.com