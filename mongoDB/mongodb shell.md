# Mongodb Shell notes

## Articles 

[The Mongo Shell](https://docs.mongodb.com/v4.4/mongo/)   
[Mongodb database methods](https://docs.mongodb.com/v4.4/reference/method/js-database/)   
[Mongodb database tools](https://docs.mongodb.com/database-tools/)   
[Getting Started Guide for the mongo Shell](https://docs.mongodb.com/v4.4/tutorial/getting-started/)   


### working in the shell

#### start the shell   

```
  mongo
```

#### get the db version   

```
  db.version()
```

#### show a list of databases
```
  show dbs;
```

#### switch to the desired db (also creates if not exists)
```
  use my_db_name;
```

#### print the current db
```
  db;
```

#### to show collections inside the databases
```
  show collections;
```

#### to insert a document inside the collection
```
db.my_colection.insert({"name":"Mark"});
```
>db indicates the current database

#### to show all the documents inside the collection
```
   db.my_collection.find()
```

#### to exit
```
  exit
```

#### [using a database without switching](https://docs.mongodb.com/v4.4/reference/method/db.getSiblingDB/)   
> no need for "use dbname"
**db.getSiblingDB()**
```
  db_var = db.getSiblingDB("users")
  db_var.collection.count()

```
> you can set a database variable that will represent a given database collection then use multiple db collections at once

#### get total document count of collection

```
  db_var.collection_name.count()
```