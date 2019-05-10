
### set up apache web server
### [set up apache virtual host on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts)
[set up apache virtual host on ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04)   
[initial hint - How can I point my domain to a subdirectory off root?](https://www.digitalocean.com/community/questions/how-can-i-point-my-domain-to-a-subdirectory-off-root)

Install apache
>Let's begin by updating the local package index to reflect the latest upstream changes:
```
  $ sudo apt update
```

>Then, install the apache2 package
```
  $ sudo apt install apache2
```

Adjusting the firewall
>List the ufw application profiles by typing:
```
  $ sudo ufw app list
```

>It is recommended that you enable the most restrictive profile that will still allow the traffic you've configured. Since we haven't configured SSL for our server yet in this guide, we will only need to allow traffic on port 80:
```
  $ sudo ufw allow 'Apache'
```

>You can verify the change by typing:
```
  $ sudo ufw status
```

>Check with the systemd init system to make sure the service is running by typing:
```
  $ sudo systemctl status apache2
```

#### Get IP address
>An alternative is typing this, which should give you your public IP address as seen from another location on the internet:
```
  $ sudo curl -4 icanhazip.com
  $ hostname -I
```
**i like the top one**

# [Basic Apache commands](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04)   
Step 4 — Managing the Apache Process
Now that you have your web server up and running, let's go over some basic management commands.

To stop your web server, type:
```
  $ sudo systemctl stop apache2
```

To start the web server when it is stopped, type:
```
sudo systemctl start apache2
```

To stop and then start the service again, type:
```
sudo systemctl restart apache2
```

If you are simply making configuration changes, Apache can often reload without dropping connections. To do this, use this command:
```
sudo systemctl reload apache2
```

By default, Apache is configured to start automatically when the server boots. If this is not what you want, disable this behavior by typing:
```
sudo systemctl disable apache2
```

To re-enable the service to start up at boot, type:
```
sudo systemctl enable apache2
```
Apache should now start automatically when the server boots again.

[vhost examples docs](https://httpd.apache.org/docs/trunk/vhosts/examples.html)   

[How To Use Apache as a Reverse Proxy with mod_proxy on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-use-apache-as-a-reverse-proxy-with-mod_proxy-on-ubuntu-16-04)   
[Simple apache proxy not working](https://serverfault.com/questions/413423/simple-apache-proxy-not-working)   
[How to Rewrite URLs with mod_rewrite for Apache on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-rewrite-urls-with-mod_rewrite-for-apache-on-ubuntu-18-04)   
[How to get Apache and Node working together on the same domain with Proxied Javascript AJAX requests](https://blog.cloudboost.io/get-apache-and-node-working-together-on-the-same-domain-with-javascript-ajax-requests-39db51959b79)   
