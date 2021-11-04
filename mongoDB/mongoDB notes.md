# mongodb notes

> it seems to me that mongo db has to be initiated on the server for it to work (initiated separately like its own .exe program)
> npm has an engin that maybe helps connect it to javascript but its still a separate program.
> theres another tutorial that uses mongoose to make using mongodb easier

### to get to the nicer mongoDB docs API documentation
1. [goto mongoDB site](https://www.mongodb.com/)   
2. [use dropdown options menu and choose docs](https://docs.mongodb.com/?_ga=2.128322250.790289989.1559152586-1600882819.1558975486)   
3. [choose drivers mongoDB drivers](https://docs.mongodb.com/ecosystem/drivers/)   
4. [choose node.js driver](https://docs.mongodb.com/ecosystem/drivers/node/)   
5. [choose API Documentation](http://mongodb.github.io/node-mongodb-native/3.2/api/)   
**mongodb site > Resources > Documentation > MongoDB drivers > Nodejs Driver  > API Reference**

#### [install mongodb on linux](https://youtu.be/WH5GgHaEy7E)   
```
  sudo apt-get install mongodb
  sudo apt-get update
```

### to start mongodb
```
    sudo service mongodb start
```

#### [install on Windows](https://www.mongodb.com/download-center/community)   
>search: download mongodb   

1. download mongodb from the sites
2. extract from the zip folder
3. archive away from downloads folder (C:\Users\d3pot\version-control\nodejs\mongodb)  
4. rename the folder from initial-zip-name to mongodb    
5. move to user/myName folder
6. create a data folder mongodb-data

### start mongodb server (windows)
 from username dir
```
  cd ~; mongodb/bin/mongod.exe --dbpath=mongodb-data
```
>--dbpath=mongodb-data passes the path to the db-data file   
> i made an alias on window: mongodb - it navigates then runs just like the code sample

**GOTCHA: to keep it running you have to open a different terminal window to write more scripts
the mongodb terminal must remain running**

>how did mongodb get to cd ~? does it install there with an installer? there are no notes above to move it there.

database admin tool (GUI)
>i think i really prefer to use mongo shell instead
#### robo 3t (google search)
https://download-test.robomongo.org/windows/robo3t-1.3.1-windows-x86_64-7419c406.zip

1. navigate to the robo3t dir
2. start/open robo3t.exe
3. click create for 1st time connection
4. give the connection a name (Local MongoDB Database)   
5. click test btn before saving to check if connection works
6. click connection (or dblclick connection name)
7. right click on desired db name and choose open shell
> commands work the same as below

**GOTCHA: robo3t has difficulty connecting to mongdb server**
[robo3t remote server fix](https://github.com/Studio3T/robomongo/issues/1437)   
navigate on the server to etc dir
```
  cd /etc
  sudo nano mongodb.config

  // comment out
  #bind_ip = 127.0.0.1

  //add
  bind_ip = 0.0.0.0

```

Official remote setup

|connect tab:|||
| ---- | --- | --- |
|name:| example||
|address:| your.ip.address.0 |: 27017|

|ssh tab:||
| --- | --- |
|SSH Address:| your.ip.address.0|
|SSH user name:| yourUsername|
|SSH Auth Method:| Private Key|
|Private key:|C:/Users/username/.ssh/id_rsa|
|Passphrase:| youKnowWhatItIs|

 *don't use the putty .ppk file for the privae key*

#### to start the mongo shell (linux)
```
  mongo
```

GOTCHA: if mongo doesn't work
goto environment variables (search environ....)
go to user variables and choose path then edit
choose new
copy and paste location of directory of installed mongodb bin
```
  C:\Users\d3pot\mongodb\bin
```

then save changes and close and reopen all terminals (restart them)
then type
```
  mongo
```
#### alternate start
> note you can probably use
```
  mongod --dbpath=mongodb-data
```
> to start the db server instead of the full path to the .exe file


### mongoDB (terms)
*(compared to mysql)*

| sql | nosql |
| --- | :---: |
| database | database |
| table |collection |
|row/record | document |
| column | field |

> SQL (structured Query Language)   
NoSQL (Not Only SQL)   


### working in the db

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

it seems i can use robo3ts output to learn new commands

prints out documents from the users collection
```
  db.getCollection('users').find({})

    //returns

    /* 1 */
    {
        "_id" : ObjectId("5ceed535d4adc12060fe8a6f"),
        "name" : "Andrew",
        "age" : 27
    }

    /* 2 */
    {
        "_id" : ObjectId("5ceedae2be89e10c288286c0"),
        "name" : "Andrew",
        "age" : 27
    }
```


[install site](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)   
[mongodb offical driver npm](https://www.npmjs.com/package/mongodb)
```

```

[mongodb driver docs](https://docs.mongodb.com/ecosystem/drivers/)   
> choose nodejs   

[mongodb nodejs API documentation](http://mongodb.github.io/node-mongodb-native/3.2/api/)   

#### GOTCHA:  to use the nodejs mongodb module you have to first install mongodb database on your machine

#### prepare to use the db
```
  const bodyParser = require('body-parser')
  app.use(bodyParser.json());

  const db = require("../public/todo/db");
```

#### setting up the db.js file
db.js
```
    const MongoClient = require("mongodb").MongoClient;
    const ObjectID = require('mongodb').ObjectID;
    const dbname = "crud_mongodb";
    const url = "mongodb://localhost:27017";
    const mongoOptions = {useNewUrlParser:true};

    const state = {
      db:null
    };

    const connect = (cb) => {
      if(state.db){
        cb();
      }else {
        MongoClient.connect(url,mongoOptions,(err,client) => {
          if(err){
            cb(err);
          }else {
            state.db = client.db(dbname);
            cb();
          }
        });

      }//else
    }// connect

    const getPrimaryKey = (_id) => {
      return ObjectID(_id);
    };//getPrimaryKey

    const getDB = () => {
      return state.db;
    }//getDB

    module.exports = {getDB,connect,getPrimaryKey};

```

  i can use destructuring to set up MongoClient and ObjectID
  ```
    // const mongodb = require('mongodb');
    // const MongoClient = mongodb.MongoClient;
    // const ObjectID = mongodb.ObjectID;

    //i can destructure mongoDB
    const { MongoClient, ObjectID } = require('mongodb');
  ```


#### create your own id using ObjectID
[mongoDB ObjectID docs](https://docs.mongodb.com/manual/reference/method/ObjectId/)   

```
  //i can destructure mongoDB
  const { MongoClient, ObjectID } = require('mongodb');

  // ObjectID lets me create my own ids without the database
  const id = new ObjectID();
  console.log(id);
  console.log(id.getTimestamp());


```

```
  MongoClient.connect(connectionURL,{ useNewUrlParser: true}, (error, client) => {
     if(error){
       return console.log("unable to connect to database!",error)
     }//if

     // console.log("connected correctly!");
     const db = client.db(databaseName);

     // insert a single document
     db.collection('users').insertOne({
       _id:id,
       name:'Vikram',
       age:26
     },(error, result) => {
       if(error){
         console.log("Unable to insert user",error);
       }//if

       console.log(result.ops);
       //ops returns [ { name: 'next', age: 27, _id: 5ceedc5f02730e40b0fd286e } ]
     })
  })// MongoClient.connect
```

### UPDATE
[mongoDB update operators](https://docs.mongodb.com/manual/reference/operator/update/)   

update a name
```
  MongoClient.connect(connectionURL,{ useNewUrlParser: true}, (error, client) => {
    if(error){
      return console.log("unable to connect to database!",error)
    }//if

     // console.log("connected correctly!");
    const db = client.db(databaseName);

    db.collection("users").updateOne(
      {
        _id: new ObjectID("5ceedae2be89e10c288286c0")
      },
      {
       $set:{
         name:'Mike'
      }
    }).then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })


  })// MongoClient.connect
```

increment the age
```
  db.collection("users").updateOne(
    {
      _id: new ObjectID("5ceedae2be89e10c288286c0")
    },
    {
     $inc:{
       age: 1
    }
  })

```

random localhost connection data - keys.js file
```
    mongodb:{
      dbURI: 'mongodb://127.0.0.1:27017/task-manager-api',
      db:'mongodb://127.0.0.1:27017'
    },
```

#### [Mongoose doesn't create new collection](https://stackoverflow.com/questions/31617579/mongoose-doesnt-create-new-collection)    
Mongoose won't create the jobs collection for the model until the first document of that model is saved.
```
Job.create({category: 1, title: 'Minion"}, function(err, doc) {
    // At this point the jobs collection is created.
});
```

#### updating a required schema - (delete key)
- goto collections
- click dropdown arrow (in robo 3T)
- right click on indexes folder
- choose view indexes
- delete the correct index
**GOTCHA: seems to only be available locally**
```
  db.getCollection('prefs').getIndexes()
```
[dropping indexes](https://docs.mongodb.com/manual/reference/method/db.collection.dropIndex/)   
- view all the indexes of the collection
```
  db.getCollection('prefs').getIndexes()
```

location the index name
```
  {
    "v" : 2,
    "key" : {
       "cat" : -1
    },
    "name" : "catIdx"
  }
```

drop the index
```
  db.getCollection('prefs').dropIndex("catIdx")
```

#### ISSUE: reserach: mongodb.service: Main process exited, code=killed, status=9/KILL   
> it has to do with my mongodb service crashing and not restarting.
> i would also like to find out how to notify my phone when parts of my site are down like when 
> mongodb crashes

#### updating mongodb objects   

[Saving object with mongoose findOne / save doesn't work](https://stackoverflow.com/questions/37864553/saving-object-with-mongoose-findone-save-doesnt-work/37865135)   
[https://sarav.co/understanding-markModified-in-mongoose](https://sarav.co/understanding-markModified-in-mongoose)   

```
  let sponsor = await User.findOne({ _id: sponsor_id }, (err, results) => {
      // let links = results.links;// findOneAndUpdate

      results.links.ids = [...results.links.ids,`${entry.id}`];
      results.links.data[`${entry.id}`] = {...entry};

      if (display_console || true) console.log(chalk.red("[setLinkData] links"), results.links);

      results.markModified("links");

      results.save((err) => {
        if (err) throw "[setLinkData] results failed to save";
        if (display_console || true) console.log(chalk.green("[setLinkData] link saved successfully"));
      });
    });// can lean it at the end?
```
> use markModified