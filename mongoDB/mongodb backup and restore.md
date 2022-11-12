# mongodb backup and restore

## Articles

[How to backup and restore mongodb](https://www.mongodb.com/basics/backup-and-restore)   
[(Mongo DB5) Backup and restore mongo DB database](https://youtu.be/AsNeE_95QBA)   
[Mongo DB - create backup](https://www.tutorialspoint.com/mongodb/mongodb_create_backup.htm)   

#### create an instant db backup

```
  mongodump
```

#### backup only specified collection of specified database.   

> mongodump --collection COLLECTION --db DB_NAME

```
  mongodump --collection mycol --db test
```

#### can i just dump a certain db (without specifying the collection)?

```
  mongodump --db somedb
```
> works

#### where do the files go
- A: the files are dumped the current bash directory location where you wrote the script
- it will be added to a dump file unless you specify another dir name using --out

```
  mongodump --db somedb --out some_dirName
```
> if the directory doesn't exist this will create it, otherwise it will fill the existing directory

<!-- mongodump --db dbname --out lohost_bu -->

[how do i drop the current db?](https://docs.mongodb.com/manual/reference/method/db.dropDatabase/)   

```
  mongo
  use dbName
  db.dropDatabase()
```

[Stop mongodump from overwriting existing files (rename instead)](https://stackoverflow.com/questions/39326526/stop-mongodump-from-overwriting-existing-files-rename-instead)

> You can use the --out option of mongodump to specify the path where to dummp the data.

> Create a script that run mongodump and give different name for your path, i.e. **using a date:**

```
  mongodump --out /data/dump/090516/
```

> Shell script example:   

```
  #!/bin/sh
  DIR=`date +%m%d%y`
  DEST=$DIR
  mkdir $DEST
  mongodump --out=/data/dump/$DEST
```

#### my example

```
  mongodump --db MyDbName --out live_bu/2022-06-06/
```
> Inside the destination the db will add a MyDbName directory with all the db contents   


#### [mongorestore | mongodb docs](https://docs.mongodb.com/database-tools/mongorestore/)   

> mongorestore: To restore all data to the original database:

```
  mongorestore --verbose \path\dump

  // my working sample

  mongorestore bu_folder
```
NOTE: i didn't use --verbose

> or restore to a new database:
> 
```
  mongorestore --db databasename --verbose \path\dump\<dumpfolder>
```
> works

#### restore a collection

```
  mongorestore path-to-bson/dbName/collect.bson --db=dbName --collection=collect
```
> GOTCHA: --db is required
> NOTE: --collection=example is not required


