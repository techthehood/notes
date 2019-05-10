# Rebuilding joomla

- [x] 1. successfully install Joomla!
- [x] 2. save a pristine compressed version of the installation and its initial db
- [ ] 3. package aliintro
- [ ] 4. package com_arc



[How To Install Joomla on a Virtual Server Running Ubuntu 12.04](https://www.digitalocean.com/community/tutorials/how-to-install-joomla-on-a-virtual-server-running-ubuntu-12-04)   
[get latest Joomla installs](https://github.com/joomla/joomla-cms/releases)   

create a temp file to install it in
```
  $ sudo mkdir temp
```

unzip and move to target dir (from temp dir)
```
$ sudo tar zxvf Joomla_3.9.1-Stable-Full_Package.tar.gz  -C /var/www/dirname
$ sudo tar zxvf Joomla_3.6.5-Stable-Full_Package.tar.gz  -C /var/www/example.com/html
```

change owner of site root recursively
```
$ sudo chown -R www-data:www-data /var/www/example.com/html/
```

modify dir Permissions recursively
```
  $ sudo chmod -R g+wX html
```
**all directories should include**
```
drwxrwxr-x
www-data www-data
```

[Tar Vs Zip Vs Gz : Difference And Efficiency](https://itsfoss.com/tar-vs-zip-vs-gz/)   
[What is the difference between tar and zip?](https://stackoverflow.com/questions/10540935/what-is-the-difference-between-tar-and-zip)   
[On Linux/Unix, does .tar.gz versus .zip matter?](https://superuser.com/questions/146754/on-linux-unix-does-tar-gz-versus-zip-matter)   

[How to Compress and Extract Files Using the tar Command on Linux](https://www.howtogeek.com/248780/how-to-compress-and-extract-files-using-the-tar-command-on-linux/)   
>great article

Can i tell it where to save the .tar.gz archive if i add a target directory b4 its name?
```
  $ tar -czvf /temp/pristine_test_archive_1.0.0.tar.gz /var/www/example.com/tar_test/
```
**yep i can tell it where to go**

Archive and compress the new joomla installation
```
  $ tar -czvf pristine_Joomla_archive_3.9.1.tar.gz /var/www/example.com/html/
```



// first failed test run
## install latest joomla

get the zip file
```
  $ wget https://github.com/joomla/joomla-cms/releases/download/3.9.1/Joomla_3.9.1-Stable-Full_Package.tar.gz
```

## GOTCHA: i tried installing the latest joomla and pasting in the old db
[phpmyadmin - count(): Parameter must be an array or an object that implements Countable](https://stackoverflow.com/questions/48001569/phpmyadmin-count-parameter-must-be-an-array-or-an-object-that-implements-co)   

### GOTCHA:
in php.ini file expand upload_max_filesize from 2M to 10M to import entire db (8M)
[php.ini location](https://www.digitalocean.com/community/questions/upload_max_filesize-in-php-ini-one-more-time)   
```
  /etc/php5/apache2/php.ini

  or for me
  sudo nano /etc/php/7.2/apache2/php.ini


```


update an error in the phpmyadmin files
### **note: to find in nano is ctrl - w**

the problem code
```
  || (count($analyzed_sql_results['select_expr'] == 1)
```

replace with
```
  || ((count($analyzed_sql_results['select_expr']) == 1)
```
**worked**


[another error in phpmyadmin dealing with php 7.2](https://medium.com/@chaloemphonthipkasorn/แก้-bug-phpmyadmin-php7-2-ubuntu-16-04-92b287090b01)   
```
  if ($options != null && count($options) > 0) {
    to
  if ($options != null && count((array)$options) > 0) {
```
**worked** force (array)

## goto line (nano)
 ```
 alt g
 ```
 > ctrl c to show line numbers


[]()   
**GOTCHA: tried installing older (more compatible) version - Joomla 3.6.5 and got this issue:
(no) Mcrypt Support (deprecated**
[Mcrypt hint](https://laughingsquid.zendesk.com/hc/en-us/articles/360006659293-Upgrading-to-PHP-7-2-on-Cloud-Sites)   
**search: joomla no mycrypt support**
[mcrypt is deprecated, what is the alternative?](https://stackoverflow.com/questions/41272257/mcrypt-is-deprecated-what-is-the-alternative)   
**search: Mycrypt**

to uninstall the joomla installation uninstall the its container
[How do I remove a full directory in Linux?](https://www.computerhope.com/issues/ch000798.htm)   
```
  $ sudo rm -r [mydir]
```
[i tried loading joomla 3.6.5](https://downloads.joomla.org/us/cms/joomla3/3-6-5)   
```
  $ $ sudo tar zxvf Joomla_3.6.5-Stable-Full_Package.tar.gz  -C /var/www/example.com/html
```


**GOTCHA: [Can't login to backend : error message : An error has occurred. 0 Must match character set](https://forum.joomla.org/viewtopic.php?t=937156)**
[Recover Joomla If You Lost Google Authenticator Device](https://geekflare.com/recover-joomla-if-you-lost-google-authenticator-device/)   
rename a directory
```
  $ mv oldDirName newDirName
```

# GOTCHA: issue with url
>By default, Apache prohibits using an .htaccess file to apply rewrite rules

[How to Rewrite URLs with mod_rewrite for Apache on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-rewrite-urls-with-mod_rewrite-for-apache-on-ubuntu-18-04)     
**activate .htaccess in Apache2 - worked once i added Directory tags to port 433**
[](https://docs.joomla.org/Enabling_Search_Engine_Friendly_SEF_URLs)   

[disable mod_rewrite](https://htaccessbook.com/disable-mod_rewrite-specific-directory/)   
[How to Enable/Disable Modules in Apache2 on Ubuntu & LinuxMint](https://tecadmin.net/enable-disable-modules-in-apache2-on-ubuntu-linuxmint/)   

#### GOTCHA: Had to be added to the ssl vertificate conf
/etc/apache2/sites-available/example.com-le-ssl.conf
```
  <IfModule mod_ssl.c>
  <VirtualHost *:443>
      <Directory /var/www/example.com/html>
          Options Indexes FollowSymLinks MultiViews
          AllowOverride All
          Require all granted
      </Directory>

      ServerAdmin admin@example.com
      ServerName example.com
      ServerAlias www.example.com
      DocumentRoot /var/www/example.com/html
      ErrorLog ${APACHE_LOG_DIR}/error.log
      CustomLog ${APACHE_LOG_DIR}/access.log combined

      Include /etc/letsencrypt/options-ssl-apache.conf
      SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
      SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem
  </VirtualHost>
</IfModule>

```
