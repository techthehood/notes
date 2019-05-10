# Joomla! server block final

## represents final useful code - not necessarily the actual finish
```
  server {

  	root /var/www/example.com/html;

  	server_name example.com www.example.com;
  	index index.php index.html index.htm index.nginx-debian.html;

  	add_header X-host "$host" always;
  	add_header X-req "$request_uri" always;

          ###### Joomla block ######

          # Support Clean (aka Search Engine Friendly) URLs
          location / {
             try_files $uri $uri/ /index.php?$args;
             add_header X-regular-message "regular section entered" always;   

             ### test area ###  
             # try_files $uri $uri/ alias /index.php?$args;

          }


          # deny running scripts inside writable directories
          location ~* /(images|cache|media|logs|tmp)/.*\.(php|pl|py|jsp|asp|sh|cgi)$ {
                  return 403;
                  error_page 403 /403_error.html;
          }



          ###### End Joomla block ######


          ####### Nodejs block ########

          location /nodereq {
             add_header X-app2-message "app2 section entered" always;
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


          location ~ \.php$ {
              # add_header X-php-message "php section entered" always;
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

## actual finish

```
  server {

  	root /var/www/example.com/html;

  	server_name example.com www.example.com;
  	index index.php index.html index.htm index.nginx-debian.html;

  	add_header X-host "$host" always;
  	add_header X-req "$request_uri" always;

  	#location / {
  		## First attempt to serve request as file, then
  		## as directory, then fall back to displaying a 404.
  		# try_files $uri $uri/ =404;
  		## Uncomment to enable naxsi on this location
  		## include /etc/nginx/naxsi.rules
  	#}

          ###### Joomla block ######

          # Support Clean (aka Search Engine Friendly) URLs
          location ^~ index\.php {
             #rewrite ^($uri/*)(/index.php/)
             #root html;
             add_header X-index-message "index.php section entered" always;
             rewrite ^(index\.php) $1$2;
             add_header X-host "host = $host" always;
             add_header X-alias "alias = alias" always;
             add_header X-root "root = root" always;
          }


          location / {
                  #try_files $uri $uri/ /index.php?$args;
             add_header X-regular-message "regular section entered" always;
             try_files $uri $uri/ alias /index.php?$args;

          }


          # deny running scripts inside writable directories
          location ~* /(images|cache|media|logs|tmp)/.*\.(php|pl|py|jsp|asp|sh|cgi)$ {
                  return 403;
                  error_page 403 /403_error.html;
          }



          ###### End Joomla block ######


          ####### Nodejs block ########

          location /app2 {
             add_header X-app2-message "app2 section entered" always;
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
  #           add_header X-php-message "php section entered" always;
              add_header x-uri "$uri" always;
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
