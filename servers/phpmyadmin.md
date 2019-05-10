GOTCHA Cannot enter phpmyadmin as root (MySQL 5.7)
[Cannot enter phpmyadmin as root (MySQL 5.7)](https://askubuntu.com/questions/763336/cannot-enter-phpmyadmin-as-root-mysql-5-7)   
**this worked**
```
  $ sudo mysql --user=root mysql
```

then in MySQL
```
  > CREATE USER 'some_usr'@'localhost' IDENTIFIED BY 'some_pass';
  GRANT ALL PRIVILEGES ON *.* TO 'some_usr'@'localhost' WITH GRANT OPTION;
  FLUSH PRIVILEGES;
```
