
```
JInstaller: :Install: Error SQL You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'UNSIGNED NOT NULL, `params` TEXT NOT NULL DEFAULT '', `bookmarks` TEXT NOT N' at line 3
Extension Install: SQL error processing query: DB function failed with error number 1064
You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'UNSIGNED NOT NULL, `params` TEXT NOT NULL DEFAULT '', `bookmarks` TEXT NOT N' at line 3
SQL =
CREATE TABLE IF NOT EXISTS `#__ali_user_params` (
 `id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
 `user_id` INT(16) UNSIGNED NOT NULL,
 `params` TEXT NOT NULL DEFAULT '',
 `bookmarks` TEXT NOT NULL DEFAULT '',
 PRIMARY KEY (`id`)
  )ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
 ```

 try removing the unique tag

 //result installation was successful
 the issue was unique unsigned
