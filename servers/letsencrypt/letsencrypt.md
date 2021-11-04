# letsencrypt notes

## Install Certbot **see official certbot install instructions below.**

#### create an ssl certificate
```
sudo certbot --nginx -d example.com -d www.example.com
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


[digital ocean nginx, ubuntu 18.04.2 ssl instructions](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)   
> also covers certbot auto-renewal

```
  sudo certbot renew --dry-run
  
  // then?
```
> it appears there is no then.  the dry-run flag also sets the actual cronjob for auto renewal

[traditional instructions for nginx](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)   


#### adding domains/subdomains to the certificate
**adding beta.example.com**
[When to use Let's Encrypt's webroot and standalone authorization](https://advancedweb.hu/2018/06/05/letsencrypt_webroot_vs_standalone/)   

so to fix the wrong root showing issue & the certificate mismatch i expanded the existing certificate to include the subdomain by creating a new request with all included
```
   sudo certbot --nginx -d example.com -d www.example.com -d beta.example.com -d alt.example.com -d demo.example.com -d businesstech.example.com -d trigger.example.com

// outputs

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  You have an existing certificate that contains a portion of the domains you
  requested (ref: /etc/letsencrypt/renewal/sunzao.us.conf)

  It contains these names: sunzao.us, www.sunzao.us

  You requested these names for the new certificate: beta.sunzao.us, sunzao.us,
  www.sunzao.us.

  Do you want to expand and replace this existing certificate with the new
  certificate?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  (E)xpand/(C)ancel: E

```

> type E + <Enter> to expand to include the new subdomain
> type 2 + <Enter> to redirect all "http" requests using the certificate domains to "https"

#### GOTCHA: certificate is valid - still showing Not Secure
[Why does Chrome say “Your connection to this site is not secure” even if the certificate is valid?](https://superuser.com/questions/1367770/why-does-chrome-say-your-connection-to-this-site-is-not-secure-even-if-the-cer)   
> try incongeto
> hint: check the site using incognito window. (if you don't want to close tabs and restart chrome)   

**worked**

sudo certbot --nginx -d example.com -d www.example.com -d beta.example.com

[A records vs AAAA records](https://www.plesk.com/wiki/aaaa-record/)   

#### GOTCHA: an A record also has to be added to cloudflare for digitalOcean A records to take effect (for cloudflare users only)   
- log into cloudflare
- select target domain name (domain you want to work with)
- choose dns tab
- click "+Add record" button

GOTCHA: letsencrypt error [recognizing] subdomain, cloudflare not connecting to subdomain
> Cloudflare SSL/TLS encryption mode: i had to turn off strict mode and put it in flex mode

GOTCHA: [ngnix - duplicate upstream “app_server” in /etc/nginx/sites-enabled/django](https://stackoverflow.com/questions/42002954/ngnix-duplicate-upstream-app-server-in-etc-nginx-sites-enabled-django)   
> change the upstread duplicate in the subdomain to anything else


[How to forcefully renew Let’s Encrypt certificate](https://www.cyberciti.biz/faq/how-to-forcefully-renew-lets-encrypt-certificate/)
[3 Steps to Setup auto renew for Let’s Encrypt SSL Certificates(**Apache**)](https://www.siteyaar.com/letsencrypt-auto-renew-certbot-apache/)   
[3 Steps to Setup auto renew for Let’s Encrypt SSL Certificates(Nginx)](https://www.siteyaar.com/letsencrypt-auto-renew-certbot-nginx/)

not as good
[Automatically Renew Let’s Encrypt Certificates](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)

## [Official certbot install instructions](https://certbot.eff.org/)   

### [update certbot with snap](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)   

#### [installing snap](https://snapcraft.io/docs/installing-snapd)   
> it pre-installed on ubuntu   

#### make sure snap is up to date

``` 
  $ sudo snap install core; sudo snap refresh core
```

#### remove old certbot

```
  $ sudo apt-get remove certbot
```

#### Install Certbot

> Run this command on the command line on the machine to install Certbot.

```
  $ sudo snap install --classic certbot
```

#### Prepare the Certbot command   

> Execute the following instruction on the command line on the machine to ensure that the certbot command can be run.   

```
  $ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

#### install your certificates...

> Run this command to get a certificate and have Certbot edit your Nginx configuration automatically to serve it, turning on HTTPS access in a single step.

```
  $ sudo certbot --nginx
```


#### Test automatic renewal   

> The Certbot packages on your system come with a cron job or systemd timer that will renew your certificates automatically before they expire. You will not need to run Certbot again, unless you change your configuration.

> You can test automatic renewal for your certificates by running this command:   

```
  $ sudo certbot renew --dry-run
```

> worked