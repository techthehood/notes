# Joomla DB clone

[Joomla 3.x. How to make full website backup](https://www.templatemonster.com/help/joomla-3-x-how-to-make-full-website-backup.html)
[Joomla. How to restore a website from full backup](https://www.templatemonster.com/help/joomla-how-to-restore-a-website-from-full-backup.html)

### make a new database
[phpMyAdmin instructions](http://webvaultwiki.com.au/Default.aspx?Page=Create-Mysql-Database-User-Phpmyadmin&NS=&AspxAutoDetectCookieSupport=1)
**didn't work - speculate: don't have the root permissions to do it**

I could open the control panel for the hosting plan    
1. choose DATABASES SECTION > MySQL databases   
2. create new database - give it a db name (or really a suffix)
3. Add a new User
4. add the new user to the new database

### clone current db
1. click the database you want to make a clone of
2. click export
3. click go
**thats it**


##### make sure the links are correct (if cloning live or test site)
1. search the downloaded db backup for url base (may include url.com/test or without /test)
2. change it to the needed url base


### clone the joomla folder
1. go to the hosting plan control panel
2. go the the control panels file manager
3. navigate into the folder that has all the joomla files
4. choose select all from the file manager menu
5. right click in the now highlighted file space and choose compress
6. choose zip for the compression type and give the zip file a name [optional but recommended]
7. use the plus sign in the file manager to create a new directory
8. right click on the new zip file, choose move and write the path to the new directory
9. navigate into the new directory, right click on the new zip file and choose extract.
**all the files will be extracted into the new directory (won't be put into another directory inside your new one)**


### import the db clone into the new db
1. ~~!important:  prep the .sql db backup file by making sure its  database mirrors the name of the newly created database~~
```
  --
  -- Database: `examplecom_jkltst`
  --
```
**on second thought it looks like its just a comment so you may not actually have to change it**



2. open the hosting plans database server(?) and click the new database   
3. click the import tab   
4. use the file chooser and select your .sql db backup file
5. click the go btn


6. open the configuration.php file in the **joomla root folder** and modify the $db & db $user variables to mirror what was set on the new db

if you copied and pasted the previous password you won't have to modify it here
```
  public $db = 'wxy&z_jmln3';
  public $user = 'wxy&z_jmln3';
  public $password = 'thePasswordFromTheConfigFile';


  public $dbprefix = 'prefix_';
```
**you don't have to modify the prefix, in fact i would recommend leaving it the same so when you have to manipulate the files in the old (live) site you won't have to keep switching back and forth the sql statements db prefixes (it should save you some time during development)**

**try and keep the password the same too**

### GOTCHA: !important you must modify the configuration.php file's $db file for the site to recognize the correct db

### GOTCHA
somehow i got a 404 error through my angular file for some reason then i went to the gym and came back and the error happened one last time, clear cache/refresh and everything was in working order

### GOTCHA
i made a clone of the example.com/beta site but the index.php keeps being added to the url.
how do i get rid of it?

**i think i gave up an recopied the .htaccess file (?)**
```
  # Uncomment following line if your webserver's URL
  # is not directly related to physical file paths.
  # Update Your Joomla! Directory (just / for root).
  ##

  RewriteBase /jakeel/test/
```
