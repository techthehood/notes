# Nginx

[Alphabetical index of variables - NGINX.org](http://nginx.org/en/docs/varindex.html)   

[apache vs nginx](https://anturis.com/blog/nginx-vs-apache/)

[setting up nodejs on Nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)   

[How to setup nginx (with directory structure, virtual hosts, port forwarding), mysql, php, fastcgi](https://www.codero.com/knowledge-base/content/3/304/en/how-to-setup-nginx-with-directory-structure-virtual-hosts-port-forwarding-mysql-php-fastcgi.html)   

#### [installing nginx on ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)   

```
  sudo apt update
  sudo apt install nginx
```

#### adjust the Firewall
```
  sudo ufw app list
```

if apache is running
```
  sudo systemctl stop apache2
```

disallow apache (?)
```
  sudo ufw deny 'Apache'
  sudo ufw deny 'Apache Full'
  sudo ufw deny 'Apache Secure'
```
#### other reading
[How To Migrate from an Apache Web Server to Nginx on an Ubuntu VPS](https://www.digitalocean.com/community/tutorials/how-to-migrate-from-an-apache-web-server-to-nginx-on-an-ubuntu-vps)  
[Setting up Node, MySQL and Nginx on Digital Ocean](https://medium.com/@eligijuskrepsta/setting-up-node-mysql-and-nginx-on-digital-ocean-247546be20df)   

print the last 100 lines of the log file
```
  sudo tail -n 100 /var/log/nginx/error.log
```

final server block example
```
  server {

  	root /var/www/example.com/html;

  	server_name example.com www.example.com;
  	index index.php index.html index.htm index.nginx-debian.html;

  	location / {
  		# First attempt to serve request as file, then
  		# as directory, then fall back to displaying a 404.
  		try_files $uri $uri/ =404;
  		# Uncomment to enable naxsi on this location
  		# include /etc/nginx/naxsi.rules
  	}

  	error_page 404 /404.html;
  	error_page 500 502 503 504 /50x.html;
  	location = /50x.html {
  		root /usr/share/nginx/html;
  	}

  	location ~ \.php$ {
          include snippets/fastcgi-php.conf;
          fastcgi_pass unix:/run/php/php7.2-fpm.sock;
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
**https sample found in digitalOcean server block**
> listen 443;

## GOTCHA: nginx not running location paths
[How to Configure NGINX](https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx/)   

[nginx joomla server block config](https://docs.joomla.org/Nginx)   

Joomla server block sample
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

[How to setup http password authentication with nginx](https://medium.com/@MicroPyramid/how-to-setup-http-password-authentication-with-nginx-38855fe5938)   
**see Setting up Node, MySQL and Nginx on Digital Ocean above**
[How To Set Up Password Authentication with Nginx on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04)   
**i don't think i set up password authentication - seems like a password that is needed b4 public can access a site**

#### create a .bash_profile in the users Directory
>for custom color coded terminal prompts

.bash_profile
```
  # Enable tab completion
  source ~/git-completion.bash

  #PS1='\n\W\n[\h][\u]->'

  # colors!
  green="\[\033[0;32m\]"
  blue="\[\033[0;34m\]"
  purple="\[\033[0;35m\]"
  red="\e[0;31m"
  yellow='\e[0;33m'
  reset="\[\033[0m\]"

  # other colors
  txtblk='\e[0;30m' # Black - Regular
  txtred='\e[0;31m' # Red
  txtgrn='\e[0;32m' # Green
  txtylw='\e[0;33m' # Yellow
  txtblu='\e[0;34m' # Blue
  txtpur='\e[0;35m' # Purple
  txtcyn='\e[0;36m' # Cyan
  txtwht='\e[0;37m' # White

  bldblk='\e[1;30m' # Black - Bold
  bldred='\e[1;31m' # Red
  bldgrn='\e[1;32m' # Green
  bldylw='\e[1;33m' # Yellow
  bldblu='\e[1;34m' # Blue
  bldpur='\e[1;35m' # Purple
  bldcyn='\e[1;36m' # Cyan
  bldwht='\e[1;37m' # White

  unkblk='\e[4;30m' # Black - Underline
  undred='\e[4;31m' # Red
  undgrn='\e[4;32m' # Green
  undylw='\e[4;33m' # Yellow
  undblu='\e[4;34m' # Blue
  undpur='\e[4;35m' # Purple
  undcyn='\e[4;36m' # Cyan
  undwht='\e[4;37m' # White

  bakblk='\e[40m'   # Black - Background
  bakred='\e[41m'   # Red
  badgrn='\e[42m'   # Green
  bakylw='\e[43m'   # Yellow
  bakblu='\e[44m'   # Blue
  bakpur='\e[45m'   # Purple
  bakcyn='\e[46m'   # Cyan
  bakwht='\e[47m'   # White

  txtrst='\e[0m'    # Text Reset


  print_before_the_prompt () {
      printf "\n$yellow%s\n" "$PWD"
  }
  PROMPT_COMMAND=print_before_the_prompt

  # Change command prompt
  source ~/git-prompt.sh
  export GIT_PS1_SHOWDIRTYSTATE=1
  # '\u' adds the name of the current user to the prompt
  # '\$(__git_ps1)' adds git-related stuff
  # '\W' adds the name of the current directory
  export PS1="$purple\u$green\$(__git_ps1)$blue \W $ $reset"

```
add a [server] tag and color its background
```
  # red background  w/ black text
  printf "\n$txtblk$bakred[server] $yellow%s\n" "$PWD"

  # blue background w/ black text
  printf "\n$txtblk$bakblu[server] $yellow%s\n" "$PWD"

  // replaces
  printf "\n$yellow%s\n" "$PWD"
```

### [Manage DNS records](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/)   
[DNS quickstart - (not really helpful)](https://www.digitalocean.com/docs/networking/dns/quickstart/)   
A records(IPv4), AAAA records(IPv6)
```
@
www
*
```
>enter the 1st symbol choose the ip from the dropdown menu and select create record (i did A & AAAA)
**3rd pary nameservers also have to be updated for changes to take effect**
**GOTCHA: cloudflare has to be updated for new subdomains to work**

[Nginx: location regex for multiple paths](https://serverfault.com/questions/564127/nginx-location-regex-for-multiple-paths)    
```
location ~ ^/(static|media)/ {
  root /home/project_root;
}
```
**i think i tried this and it didn't work. so i just created 2 separate locations with the same port**

#### creating symbolic links from these files to the sites-enabled directory   

```
  sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```
> GOTCHA: don't forget to add the .com file in the "from" section