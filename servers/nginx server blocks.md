# Nginx server Blocks

[How to Configure NGINX](https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx/)   

[nginx joomla server block config](https://docs.joomla.org/Nginx)   

> nginx doesn't use .htaccess files so i have to add rewrites to server Blocks

preliminary joomla server block

```
  server {

  	root /var/www/example.com/html;

  	server_name example.com www.example.com;
  	index index.php index.html index.htm index.nginx-debian.html;

  	#location / {
  		## First attempt to serve request as file, then
  		## as directory, then fall back to displaying a 404.
  		# try_files $uri $uri/ =404;
  		## Uncomment to enable naxsi on this location
  		## include /etc/nginx/naxsi.rules
  	#}

    ###### Joomla block ######

    # Support Clean (aka Search Engine Friendly) URLs
    location / {
            try_files $uri $uri/ /index.php?$args;
    }


    # deny running scripts inside writable directories
    location ~* /(images|cache|media|logs|tmp)/.*\.(php|pl|py|jsp|asp|sh|cgi)$ {
            return 403;
            error_page 403 /403_error.html;
    }



    ###### End Joomla block ######


    ####### Nodejs block ########

    location /app2 {
      proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

    #location /* {
    #  try_files $uri uri/*;
    #}

  	error_page 404 /404.html;
  	error_page 500 502 503 504 /50x.html;
  	location = /50x.html {
  		root /usr/share/nginx/html;
  	}

          ###### Joomla php ######
          #location ~ \.php$ {
          #    fastcgi_pass  127.0.0.1:9000;
          #    fastcgi_index index.php;
          #    include fastcgi_params;
          #    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
          #    include /etc/nginx/fastcgi.conf;
          #}
          ###### End Joomla php ######

          ###### Original ######
  	#location ~ \.php$ {
            #include snippets/fastcgi-php.conf;
            #fastcgi_pass unix:/run/php/php7.2-fpm.sock;
  	#}

    ###### my test ######
    #location ~ \.php$ {
    #  fastcgi_index index.php;
    #  include snippets/fastcgi-php.conf;
    #  fastcgi_pass unix:/run/php/php7.2-fpm.sock;
    #}

    location ~ \.php$ {
        #fastcgi_pass  127.0.0.1:9000;
        fastcgi_pass unix:/run/php/php7.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include /etc/nginx/fastcgi.conf;
    }


  	# deny access to .htaccess files, if Apache's document root
  	# concurs with nginx's one
  	#
  	#location ~ /\.ht {
  	#	deny all;
  	#}


      listen [::]:443 ssl ipv6only=on; # managed by Certbot
      listen 443 ssl; # managed by Certbot
      ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
      ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
      include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


  }

  server {
      if ($host = www.example.com) {
          return 301 https://$host$request_uri;
      } # managed by Certbot


      if ($host = example.com) {
          return 301 https://$host$request_uri;
      } # managed by Certbot



  	listen 80;
  	listen [::]:80;

  	server_name example.com www.example.com;
      return 404; # managed by Certbot

  }

```
> the issue with this version is it doesn't rewrite index.php?args urls so im getting 404 errors on
https://example.com/alight/index.php ... i need it to rewrite index.php urls to not include alight

**Regex cheat sheet see Regex.md**

[Understanding Nginx Server and Location Block Selection Algorithms](https://www.digitalocean.com/community/tutorials/understanding-nginx-server-and-location-block-selection-algorithms)   



#### Debugging server blocks
[How to output variable in nginx log for debugging](https://serverfault.com/questions/404626/how-to-output-variable-in-nginx-log-for-debugging)  

```
  location / {
    add_header X-uri "$uri";
    add_header X-debug-message "A php file was used" always;
  }
```

[How to view HTTP headers in Google Chrome?](https://www.mkyong.com/computer-tips/how-to-view-http-headers-in-google-chrome/)   

[Creating NGINX Rewrite Rules](https://www.nginx.com/blog/creating-nginx-rewrite-rules/)   
[Nginx rewrite rule to remove path node](https://superuser.com/questions/435916/nginx-rewrite-rule-to-remove-path-node)   

[Regex tutorial — A quick cheatsheet by examples](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)   
[Tryit regex 101 site](https://regex101.com/r/cO8lqs/1)   

[Change apache htaccesss file to be used with nginx](https://stackoverflow.com/questions/8711678/change-apache-htaccess-file-to-be-used-with-nginx)   

[Rewrite all requests to index.php with nginx](https://stackoverflow.com/questions/12924896/rewrite-all-requests-to-index-php-with-nginx)   

[Understanding and Implementing FastCGI Proxying in Nginx](https://www.digitalocean.com/community/tutorials/understanding-and-implementing-fastcgi-proxying-in-nginx)   

**GOTCHA: cloudflare has to be updated for new subdomains to work**

[The most important steps to take to make an nginx server more secure](https://help.dreamhost.com/hc/en-us/articles/222784068-The-most-important-steps-to-take-to-make-an-nginx-server-more-secure)   

[How to set environment variable in systemd service?](https://serverfault.com/questions/413397/how-to-set-environment-variable-in-systemd-service)

>Times change and so do best practices.

>The current best way to do this is to run systemctl edit myservice, which will create an override file for you or let you edit an existing one.

>In normal installations this will create a directory /etc/systemd/system/myservice.service.d, and inside that directory create a file whose name ends in .conf (typically, override.conf), and in this file you can add to or override any part of the unit shipped by the distribution.

>For instance, in a file /etc/systemd/system/myservice.service.d/myenv.conf:
```
[Service]
Environment="SECRET=pGNqduRFkB4K9C2vijOmUDa2kPtUhArN"
Environment="ANOTHER_SECRET=JP8YLOc2bsNlrGuD6LVTq7L36obpjzxd"
Also note that if the directory exists and is empty, your service will be disabled! If you don't intend to put something in the directory, ensure that it does not exist.
```

>The answer depends on whether the variable is supposed to be constant (that is, not supposed to be modified by user getting the unit) or variable (supposed to be set by the user).

>Since it's your local unit, the boundary is quite blurry and either way would work. However, if you started to distribute it and it would end up in /usr/lib/systemd/system, this would become important.

#### Constant value
>If the value doesn't need to change per instance, the preferred way would be to place it as Environment=, directly in the unit file:
```
[Unit]
Description=My Daemon

[Service]
Environment="FOO=bar baz"
ExecStart=/bin/myforegroundcmd

[Install]
WantedBy=multi-user.target
The advantage of that is that the variable is kept in a single file with the unit. Therefore, the unit file is easier to move between systems.
```

#### Variable value
>However, the above solution doesn't work well when sysadmin is supposed to change the value of the environment variable locally. More specifically, the new value would need to be set every time the unit file is updated.

>For this case, an extra file is to be used. How — usually depends on the distribution policy.

>One particularly interesting solution is to use /etc/systemd/system/myservice.service.d directory. Unlike other solutions, this directory is supported by systemd itself and therefore comes with no distribution-specific paths.

>In this case, you place a file like /etc/systemd/system/myservice.service.d/local.conf that adds the missing parts of unit file:
```
[Service]
Environment="FOO=bar baz"
```

**Afterwards, systemd merges the two files when starting the service (remember to systemctl daemon-reload after changing either of them). And since this path is used directly by systemd, you don't use EnvironmentFile= for this.**

>If the value is supposed to be changed only on some of the affected systems, you may combine both solutions, providing a default directly in the unit and a local override in the other file.

**systemctl daemon-reload is the command to reload systemd**

**EnvironmentFile= is better when the values are secrets like passwords.**

 you have two options (one already pointed by Michael):
```
Environment=
```
and
```
EnvironmentFile=
```

>The answers by Michael and Michał are helpful and answer the original question of how to set an environment variable for a systemd service. However, one common use for environment variables is to configure sensitive data like passwords in a place that won't accidentally get committed to source control with your application's code.

>If that's why you want to pass an environment variable to your service, do not use Environment= in the unit configuration file. Use EnvironmentFile= and point it to another configuration file that is only readable by the service account (and users with root access).

>The details of the unit configuration file are visible to any user with this command:
```
systemctl show my_service
```

**I put a configuration file at /etc/my_service/my_service.conf and put my secrets in there:**
```
MY_SECRET=correcthorsebatterystaple
```
**Then in my service unit file, I used EnvironmentFile=:**
```
[Unit]
Description=my_service

[Service]
ExecStart=/usr/bin/python /path/to/my_service.py
EnvironmentFile=/etc/my_service/my_service.conf
User=myservice

[Install]
WantedBy=multi-user.target
```
I checked that ps auxe can't see those environment variables, and other users don't have access to /proc/*/environ. Check on your own system, of course.

### [systemd docs](https://systemd.io/)   
[systemd info article](https://wiki.archlinux.org/index.php/systemd)   
