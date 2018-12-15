# MYSQL data transfer
**can also be used to back up database**


use the export tab on all the basic settings to export a .sql file.

make sure all the queries are entering data into the correct tables.

user file and replace to change the table names - there is a way to export the file using the correct table names but its not neccessary.


prep the table by deleteing all the exising fields - i don't know how to add records to an existing table
maybe i can tell it where i want to start from.

[Delete all data](https://www.electrictoolbox.com/article/mysql/delete-all-data-mysql/)
```
DELETE FROM tablename;
```
note: truncate doesn't work wih the primary keys referencing another table()



[reset auto increment](https://viralpatel.net/blogs/reseting-mysql-autoincrement-column/)
```
ALTER TABLE table_name AUTO_INCREMENT = 1;
```

[export by column](https://www.codeofaninja.com/2013/04/phpmyadmin-export-columns.html)


update user_id if needed (localhost)
```
UPDATE `jos_arc_my_data` SET `user_id` = 42 WHERE `user_id` = 630;
```
