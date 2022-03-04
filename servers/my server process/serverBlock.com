  upstream upstream-nodejs-com {
          server  127.0.0.1:3002;
          #new
  }

  upstream upstream-narrator-com {
          server  127.0.0.1:3003;
          #new
  }

server {
        listen 80;
        listen [::]:80;

        root /var/www/example.com/html;

        server_name example.com www.example.com;
        index index.php index.html index.htm index.nginx-debian.html;

        add_header x-site "live" always;
        add_header X-host "$host" always;
        add_header X-req "$request_uri" always;

        location / {
          # new node.js server root
          add_header X-app2-message "example.com root section entered" always;
          add_header 'Service-Worker-Allowed' '/';
          proxy_pass http://localhost:1027;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }

        location /socket.io/ {
          proxy_pass              http://upstream-nodejs-com;

          proxy_redirect off;

          proxy_http_version      1.1;

          proxy_set_header        Upgrade                 $http_upgrade;
          proxy_set_header        Connection              "upgrade";

          proxy_set_header        Host                    $host;
          proxy_set_header        X-Real-IP               $remote_addr;
          proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
        }

        location /narrator {
          proxy_pass              http://upstream-narrator-com;

          proxy_redirect off;

          proxy_http_version      1.1;

          proxy_set_header        Upgrade                 $http_upgrade;
          proxy_set_header        Connection              "upgrade";

          proxy_set_header        Host                    $host;
          proxy_set_header        X-Real-IP               $remote_addr;
          proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
        }

        error_page 404 /404.html;
	      error_page 500 502 503 504 /50x.html;

        location = /50x.html {
          root /usr/share/nginx/html;
        }

}