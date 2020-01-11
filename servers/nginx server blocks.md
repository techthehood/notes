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
