# Joomla Clone - test/beta site (on nginx)

## Simple Answer
zip - copy of live site
```
  sudo tar -czvf example_live.tar.gz -C html .
```
unzip - paste into test site
```
  sudo tar zxvf example_live.tar.gz  -C html/beta/
```
*_see notes: tar-gzip.md_*

#### goto phpmyadmin
create example_test db
export example_live > import example_test

#### update configuration.php

GOTCHA: both sites are point to the same db
GOTCHA: test sites url doesn't go beyond beta

#### try running a subdomain
[How to create subdomains on DigitalOcean LAMP](https://medium.com/@Madgeek_in/how-to-create-subdomains-on-digitalocean-lamp-df501dff5855)   
- [ ] log in to digitalOcean.com
- [ ] goto domains > manage domains >  A Records
- [ ] type in subdomain prefix (only) i.e. 'beta'
- [ ] select your droplet and click create
 thats it

 [Running multiple domains or subdomains in NGINX using Server Blocks in Ubuntu](https://albertogrespan.com/blog/running-multiple-domains-or-subdomains-in-nginx-with-server-blocks/)   
move the contents of the beta folder into the beta site dir

```
  sudo mv html/beta/* beta.example.com/html/
```

copy the live site server block
```
  sudo cp example.com beta.example.com
```

modify it with your new subdomain name
```
  root /var/www/example.com/html;
  to
  root /var/www/beta.example.com/html;


  server_name example.com www.example.com;
  server_name beta.example.com www.beta.example.com;
```
**Don't forget server for port 80**

test for errors
```
  sudo nginx -t
```

change the owner
```
   sudo chown www-data:www-data beta.example.com
```

change the file permissions
```
   sudo chmod 775 beta.example.com
```

make a link to the sites-enabled config files (i was being lazy and tried a relative path)
```
   sudo ln -s beta.example.com  ../sites-enabled/beta.example.com
```
**failed - ./beta.example.com’: Too many levels of symbolic links**

you can test the failure by navigating to the links directory and running
[Too many levels of symbolic links](https://unix.stackexchange.com/questions/141436/too-many-levels-of-symbolic-links)   
```
  sudo find -L ./ -mindepth 15
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

write a better link (full path)
```
  sudo ln -s /etc/nginx/sites-available/beta.example.com  /etc/nginx/sites-enabled/beta.example.com
```

restart the server
```
  sudo systemctl reload nginx
```

i need a new letsencrypt certificate for the subdomain name
```
   sudo certbot --nginx -d beta.example.com
```
**note: apparently www.beta.example.com is not a thing**

#### GOTCHA: error  Nginx is unable to bind to port
> nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
> nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)   

[Nginx is unable to bind to 443](https://www.digitalocean.com/community/questions/nginx-is-unable-to-bind-to-443)   
```
  sudo fuser -k 443/tcp
```
**i have no clue why this worked**

[Learn How to Use ‘fuser’ Command with Examples in Linux](https://www.tecmint.com/learn-how-to-use-fuser-command-with-examples-in-linux/)   

[Subdomains not working with Digital Ocean DNS settings](https://www.digitalocean.com/community/questions/subdomains-not-working-with-digital-ocean-dns-settings)   
> i did make a CNAME \*.beta.example.com

[When to use Let's Encrypt's webroot and standalone authorization](https://advancedweb.hu/2018/06/05/letsencrypt_webroot_vs_standalone/)   

so to fix the wrong root showing issue & the certificate mismatch i expanded the existing certificate to include the subdomain by creating a new request with all included
```
   sudo certbot --nginx -d example.com -d www.example.com -d beta.example.com


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

#### GOTCH: certificate is valid - still showing Not Secure
[Why does Chrome say “Your connection to this site is not secure” even if the certificate is valid?](https://superuser.com/questions/1367770/why-does-chrome-say-your-connection-to-this-site-is-not-secure-even-if-the-cer)   
> try incongeto
> hint: check the site using incognito window. (if you don't want to close tabs and restart chrome)   

**worked**

sudo certbot --nginx -d sunzao.us -d www.sunzao.us -d beta.sunzao.us
