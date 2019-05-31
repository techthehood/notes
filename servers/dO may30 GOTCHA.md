[Where can I find the error logs of nginx, using fastcgi and django](https://stackoverflow.com/questions/1706111/where-can-i-find-the-error-logs-of-nginx-using-fastcgi-and-django)  
```
  cd /var/log/nginx/
  cat error.log
```

here are the errors
```
2019/05/30 18:34:13 [error] 15264#15264: *37 FastCGI sent in stderr: "PHP message: PHP Warning:  session_start(): Failed to read session data: user (path: /var/lib/php/sessions) in /var/www/sunzao.us/html/libraries/joomla/session/handler/native.php on line 260" while reading response header from upstream, client: 69.137.231.57, server: sunzao.us, request: "GET / HTTP/1.1", upstream: "fastcgi://unix:/run/php/php7.2-fpm.sock:", host: "sunzao.us"

2019/05/30 18:34:13 [error] 15264#15264: *37 FastCGI sent in stderr: "PHP message: PHP Warning:  session_start(): Failed to read session data: user (path: /var/lib/php/sessions) in /var/www/sunzao.us/html/libraries/joomla/session/handler/native.php on line 260" while reading response header from upstream, client: 69.137.231.57, server: sunzao.us, request: "GET /favicon.ico HTTP/1.1", upstream: "fastcgi://unix:/run/php/php7.2-fpm.sock:", host: "sunzao.us", referrer: "https://sunzao.us/"

```
[Install and Configure PHP-FPM  ](https://www.linode.com/docs/web-servers/nginx/serve-php-php-fpm-and-nginx/)   
```
  sudo systemctl status php7.2-fpm.service
```
[How to list all enabled services from systemctl?](https://askubuntu.com/questions/795226/how-to-list-all-enabled-services-from-systemctl)   
```
  sudo systemctl list-unit-files --state=enabled

  //also works
   sudo systemctl list-unit-files --state=disabled
   sudo systemctl list-unit-files
```
> sudo systemctl list-unit-files works but the output is pages long including
static, indirect,https://forum.joomla.org/viewtopic.php?t=961602 tra
codensient, enabled-runtime and generated services   

[a helpful hint](https://forum.joomla.org/viewtopic.php?t=961602)   
>'Warning: session_start(): Failed to read session data: user (path: 192.168.0.2:11211) in /home/omkarnl/public_html/libraries/joomla/session/handler/native.php on line 260'

> "You seem to have already sorted out the issue. For the benefit of others, I saw this message come up and found that the database parameters in configuration.php were incorrect. After the username and other details were correct, the site on localhost was loaded all right."

>Yes, my database prefix was incorrect. Once I fixed that it worked.

so i figured his prefix was incorrect that this error came from not being able to connect to the db
which made me think maybe i need to try restarting the mysql server
```
  sudo systemctl restart mysql
```
>i should have checked the status first, then again afterward
but...

```
  sudo systemctl status mysql
```
[]()   
[]()   
[]()   
