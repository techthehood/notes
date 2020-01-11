# postgres notes
[postgres cheat sheet](https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546)   

[The Basics Of PostgreSQL UUID Data Type](http://www.postgresqltutorial.com/postgresql-uuid/)   
[PostgreSQL NodeJS Tutorial](https://linuxhint.com/postgresql-nodejs-tutorial/)   
[How To Migrate a MySQL Database to PostgreSQL Using pgLoader](https://www.digitalocean.com/community/tutorials/how-to-migrate-mysql-database-to-postgres-using-pgloader)   
[How To Manage an SQL Database - An SQL Cheat Sheet](https://www.digitalocean.com/community/tutorials/how-to-manage-sql-database-cheat-sheet)   
> it seems that mysql and postgres have a lot of scripting similarities - there are sometimes some differences though

[SQLite vs MySQL vs PostgreSQL: A Comparison Of Relational Database Management Systems](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems)   
[How to choose the right type of database for your enterprise](https://www.infoworld.com/article/3268871/how-to-choose-the-right-type-of-database-for-your-enterprise.html)   


[ACID properties of transactions](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.4.0/product-overview/acid.html)   

| Atomicity |
|---|
| All changes to data are performed as if they are a single operation. That is, all the changes are performed, or none of them are.
For example, in an application that transfers funds from one account to another, the atomicity property ensures that, if a debit is made successfully from one account, the corresponding credit is made to the other account. |
| **Consistency** |
| Data is in a consistent state when a transaction starts and when it ends.
For example, in an application that transfers funds from one account to another, the consistency property ensures that the total value of funds in both the accounts is the same at the start and end of each transaction. |
| **Isolation** |
| The intermediate state of a transaction is invisible to other transactions. As a result, transactions that run concurrently appear to be serialized. |
For example, in an application that transfers funds from one account to another, the isolation property ensures that another transaction sees the transferred funds in one account or the other, but not in both, nor in neither.
| **Durability** |
| After a transaction successfully completes, changes to data persist and are not undone, even in the event of a system failure.
For example, in an application that transfers funds from one account to another, the durability property ensures that the changes made to each account will not be reversed. |

[MongoDB Multi-Document ACID Transactions are GA](https://www.mongodb.com/blog/post/mongodb-multi-document-acid-transactions-general-availability)   
>With the release of 4.0, you now have multi-document ACID transactions in MongoDB.

[PostgreSQL Vs. MySQL: Differences In Performance, Syntax, And Features](https://blog.panoply.io/postgresql-vs.-mysql)   

[How to Secure your PostgreSQL Database - 10 Tips](https://severalnines.com/blog/how-secure-your-postgresql-database-10-tips)   
[Medium search - postgres security](https://medium.com/search?q=postgres%20security)   
[Does pg (node-postgres) automatically sanitize data](https://stackoverflow.com/questions/41455585/does-pg-node-postgres-automatically-sanitize-data)   
[How can I prevent SQL injection in PHP?](https://stackoverflow.com/questions/60174/how-can-i-prevent-sql-injection-in-php/8255054#8255054)   
> Use prepared statements and parameterized queries. These are SQL statements that are sent to and parsed by the database server separately from any parameters. This way it is impossible for an attacker to inject malicious SQL.

[postgres PREPARE - creates prepared statements](https://www.postgresql.org/docs/9.3/sql-prepare.html)   

### Installing postgres
[How To Install and Use PostgreSQL on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)   
[A Beginners Guide to using apt-get commands in Linux(Ubuntu)](https://codeburst.io/a-beginners-guide-to-using-apt-get-commands-in-linux-ubuntu-d5f102a56fc4)   
[How To Secure PostgreSQL on an Ubuntu VPS](https://www.digitalocean.com/community/tutorials/how-to-secure-postgresql-on-an-ubuntu-vps)   
> this goes with How To Install and Use PostgreSQL article

### updating apt

#### Step 1 — Installing PostgreSQL
```
  sudo apt update
```
#### Step 2 — Using PostgreSQL Roles and Databases
**Switch over to the postgres account on your server by typing:**
```
  $ sudo -i -u postgres
```
**GOTCHA: use ctrl d (2x) to return to regular user account**
[How to Exit from PostgreSQL's Command Line Utility (psql)](https://chartio.com/resources/tutorials/how-to-exit-from-postgresql-s-command-line-utility-psql/)    

**You can now access a Postgres prompt immediately by typing:**
```
  $ psql
```
> This will log you into the PostgreSQL prompt, and from here you are free to interact with the database management system right away.

exiting the postgres prompt
```
  $ \q
```
> This will bring you back to the postgres Linux command prompt.

i can also run this shorter version to get the postgres prompt w/o the postgres linux command prompt
```
  $ sudo -u postgres psql
```
> i can still exit with the \q without using the ctrl-d to exit the linux cmd prompt

#### creating a new user
depending on if you are logged in as postgres or using your regular linux user
postgres user ( postgres@sunzao:~$ )  
```
  createuser --interactive
```

your regular self
```
  sudo -u postgres createuser --interactive
```

You can get more control by passing some additional flags. Check out the options by looking at the man page:
```
  man createuser
```
GOTCHA: how secure is this linux user created for postgres db?
[I'm able to login via “psql” as “posgres” with any linux user - is this a security issue?](https://serverfault.com/questions/458291/im-able-to-login-via-psql-as-posgres-with-any-linux-user-is-this-a-securi)   
[How To Map Linux Users To Postgres User](https://thedataguy.in/map-linux-users-to-postgres-user/)   
> not well written - but its kind of on the right track

[First Rule in Securing Postgres: Don’t Be Dumb](https://www.enterprisedb.com/blog/first-rule-securing-postgres-don%E2%80%99t-be-dumb)   
[How to safely change the “postgres” user password via “psql”](https://www.2ndquadrant.com/en/blog/how-to-safely-change-the-postgres-user-password-via-psql/)   
[How To Secure PostgreSQL Against Automated Attacks](https://www.digitalocean.com/community/tutorials/how-to-secure-postgresql-against-automated-attacks)   


see what role has been set
[PostgreSQL Roles Management](http://www.postgresqltutorial.com/postgresql-roles/)   
> useful but didn't show me how to detect the current role being used (a test for the SET command)



**from - How To Secure PostgreSQL on an Ubuntu VPS**
```
  demo_application=> CREATE TABLE test_table(name varchar(25));
  ERROR:  no schema has been selected to create in
  LINE 1: CREATE TABLE test_table(name varchar(25));

```
> I was expecting to see -> ERROR: permission denied for schema public
> but i got -> ERROR:  no schema has been selected to create in - i guess its he same thing? close enough

#### view the new table
```
  \d _table_
  \d+ _table_ //more info
```


[GOTCHA: ERROR:  no schema has been selected to create in](https://dba.stackexchange.com/questions/106057/error-no-schema-has-been-selected-to-create-in)   

> To check the privileges inside psql, use \dn+ public.

```
\dn+ public
```
#### check current user
[How to check connected user on psql](https://stackoverflow.com/questions/39735141/how-to-check-connected-user-on-psql)   
```
  \conninfo
```

GOTCHA: it appears that semi-colons at the end of statements in postgres psql are important
