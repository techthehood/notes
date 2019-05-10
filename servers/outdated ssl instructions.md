#### create an ssl certificate
[use certbot to create ssl certificates](https://certbot.eff.org/)
[unneccessary docs for certbot digitalocean](https://certbot-dns-digitalocean.readthedocs.io/en/stable/)
[An Introduction to Let's Encrypt](https://www.digitalocean.com/community/tutorials/an-introduction-to-let-s-encrypt)
>* Certbot is preinstalled. Run it to configure HTTPS.
>if not run

**takes 23 MB of add'l space**

### Outdated certbot instructions
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
