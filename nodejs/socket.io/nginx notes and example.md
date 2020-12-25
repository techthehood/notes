# socket.io nginx example

sites-available/example.com
```
    upstream upstream-nodejs {
            server  127.0.0.1:3002;
            #required for socket.io to work
    }

   server {

  	root /var/www/example.com/html;

  	server_name example.com www.example.com;
  	index index.php index.html index.htm index.nginx-debian.html;

  	add_header x-site "live" always;
  	add_header X-host "$host" always;
  	add_header X-req "$request_uri" always;

    ####### Nodejs block ########

    location / {
      # new node.js server root
      add_header X-app2-message "alight section entered" always;
      proxy_pass http://localhost:1027;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
  	}

    location /socket.io/ {
      proxy_pass              http://upstream-nodejs;
      proxy_redirect off;

      proxy_http_version      1.1;

      proxy_set_header        Upgrade                 $http_upgrade;
      proxy_set_header        Connection              "upgrade";

      proxy_set_header        Host                    $host;
      proxy_set_header        X-Real-IP               $remote_addr;
      proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;

      #something similar is required for socket.io to work
    }

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


    listen 443 default_server ssl;
      ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
      ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot



  }

   server {
      if ($host = www.example.com) {
          return 301 https://$host$request_uri;
      }


      if ($host = example.com) {
          return 301 https://$host$request_uri;
      }

      listen 80 default_server;
      listen [::]:80 default_server;

      server_name example.com www.example.com;
      return 404;


  }

```

#### highlighted parts
```
  upstream upstream-nodejs {
    server  127.0.0.1:3002;
    #required for socket.io to work
  }
```

#### highlighted location
```
  location /socket.io/ {
    proxy_pass              http://upstream-nodejs;
    proxy_redirect off;

    proxy_http_version      1.1;

    proxy_set_header        Upgrade                 $http_upgrade;
    proxy_set_header        Connection              "upgrade";

    proxy_set_header        Host                    $host;
    proxy_set_header        X-Real-IP               $remote_addr;
    proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;

    #something similar is required for socket.io to work
  }
```
