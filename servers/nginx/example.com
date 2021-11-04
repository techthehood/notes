  upstream upstream-nodejs {
          server  127.0.0.1:3002;
          #new
  }

  upstream upstream-narrator {
          server  127.0.0.1:3003;
          #new
  }

  #upstream upstream-nodejs-2 {
  #        server  127.0.0.1:1027;
  #        #new
  #}

  # PORTS:
  # / 1027
  # /apps 1025
  # /projects 1026
  # /req  3000
  # /testpm2 3001
  # upstream upstream-alt 3002 
  # /tests 3002 - idk if this can share an upstream server?
  # upstream alt-narrator 3003

 server {

	root /var/www/sunzao.us/html;

	server_name sunzao.us www.sunzao.us;
	index index.php index.html index.htm index.nginx-debian.html;

	add_header x-site "live" always;
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

        location /old {
          #working original php mysql version of root location /old
           try_files $uri $uri/ /index.php?$args;
           add_header X-regular-message "regular section entered" always;

           ### test area ###
           #try_files $uri $uri/ alias /index.php?$args;

        }


        # deny running scripts inside writable directories
        location ~* /(images|cache|media|logs|tmp)/.*\.(php|pl|py|jsp|asp|sh|cgi)$ {
                return 403;
                error_page 403 /403_error.html;
        }



        ###### End Joomla block ######


        ####### Nodejs block ########

        location / {
          # new node.js server root
          add_header X-app2-message "alight section entered" always;
          add_header 'Service-Worker-Allowed' '/';
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      	}

        location /testpm2 {
          add_header X-app2-message "testpm2 section entered" always;
          proxy_pass http://localhost:3001;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

        #location /meet {
        #  add_header X-app2-message "meet section entered" always;
        #  proxy_pass http://localhost:3002;
        #  proxy_http_version 1.1;
        #  proxy_set_header Upgrade $http_upgrade;
        #  proxy_set_header Connection 'upgrade';
        #  proxy_set_header Host $host;
        #  proxy_cache_bypass $http_upgrade;
        #}

        #location /liftoff/ {
        location /socket.io/ {
                proxy_pass              http://upstream-nodejs;
                #proxy_pass              http://upstream-nodejs-2;
                proxy_redirect off;

                proxy_http_version      1.1;

                proxy_set_header        Upgrade                 $http_upgrade;
                proxy_set_header        Connection              "upgrade";

                proxy_set_header        Host                    $host;
                proxy_set_header        X-Real-IP               $remote_addr;
                proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
        }

        location /narrator {
                proxy_pass              http://upstream-narrator;

                proxy_redirect off;

                proxy_http_version      1.1;

                proxy_set_header        Upgrade                 $http_upgrade;
                proxy_set_header        Connection              "upgrade";

                proxy_set_header        Host                    $host;
                proxy_set_header        X-Real-IP               $remote_addr;
                proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
        }

        # deprecated - a failed experiment to add socket.io to a path
        #location /liftoff/ {
        #        proxy_pass              http://upstream-nodejs-2;
        #        proxy_redirect off;
        #
        #        proxy_http_version      1.1;
        #
        #        proxy_set_header        Upgrade                 $http_upgrade;
        #        proxy_set_header        Connection              "upgrade";
        #
        #        proxy_set_header        Host                    $host;
        #        proxy_set_header        X-Real-IP               $remote_addr;
        #        proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
        #}

        location /req {
          add_header X-app2-message "nodereq section entered" always;
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

        location /apps {
          add_header X-app2-message "apps section entered" always;
          proxy_pass http://localhost:1025;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

        location /projects {
          add_header X-app2-message "projects section entered" always;
          proxy_pass http://localhost:1026;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }


        location /tests {
          add_header X-app2-message "tests section entered" always;
          proxy_pass http://localhost:3002;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }


        location /user {
          add_header X-app2-message "alight section entered" always;
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

      	location /core {
          add_header X-app2-message "alight section entered" always;
          add_header 'Service-Worker-Allowed' '/core';
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      	}

      	location /details {
          add_header X-app2-message "alight section entered" always;
          add_header 'Service-Worker-Allowed' '/details';
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      	}

        location /view {
          add_header X-app2-message "alight section entered" always;
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

        location /rocket {
          add_header X-app2-message "alight section entered" always;
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

        location /auth {
          add_header X-app2-message "alight section entered" always;
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

        location /api {
          add_header X-app2-message "alight section entered" always;
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }


        location /brand {
          add_header X-app2-message "alight section entered" always;
          proxy_pass http://localhost:1027;
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
    ssl_certificate /etc/letsencrypt/live/sunzao.us/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/sunzao.us/privkey.pem; # managed by Certbot

}

 server {
    if ($host = www.sunzao.us) {
        return 301 https://$host$request_uri;
    }


    if ($host = sunzao.us) {
        return 301 https://$host$request_uri;
    }

    listen 80 default_server;
    listen [::]:80 default_server;

    server_name sunzao.us www.sunzao.us;
    return 404;


}