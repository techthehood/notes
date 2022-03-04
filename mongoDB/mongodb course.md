

#### Start the mongodb db shell
```
  mongo
```

##### Connecting

you can connect to existing database or creating one that doesn't exist
```
  use shop
```

#### get stats about this db
```
  db.stats()
```

#### to delete databases
```
  use dbname
  db.dropDatabase()
```

#### to drop collection
```
  db.companies.drop()

```

you can create a new collection on the fly if it doesn't exist
```
  db.products.insertOne({name: "A Book", price: 12.99})

```
**products collection inserting one entry**

to see contents of collection
```
  db.products.find()
  or
  db.products.find().pretty()
```
> use pretty() for a prettified view

adding more documents
```
  db.products.insertOne({name: "A Computer", price: 1229.99, description: "A high quality computer.", details:{ cpu: "Intel i7 8770", memory: 32}})
```

terms: "Created Implicitly" when you start working with them.  when you start storing data

create another db collection and document
```
  use flights
  >
  db.flightData.insertOne({
    "_id" : ObjectId("5d8d17a3028e69c2bbc1b854"),
    "departureAirport" : "MUC",
    "arrivalAirport" : "SFO",
    "aircraft" : "Airbus A380",
    "distance" : 12000,
    "intercontinental" : true
    })
  >
```

[What is JSON?](https://developers.squarespace.com/what-is-json)   
when you are adding data in the shell you can omit quotation  marks in the key names but still need them for the values

### CRUD Operations
Create
insertOne( data , options)
insertMany( data , options)

Read
find(filter , options)
findOne(filter , options)

Update
updateOne(filter , data , options)
updateMany(filter , data , options)
replaceOne(filter , data , options)

Delete
DeleteOne(filter , options)
DeleteMany(filter , options)

insert the other data
```
  db.flightData.insertMany([{departureAirport:"TXL", arrivalAirport:"LHR"},{_id:"txl-lhr-1", departureAirport:"TXL", arrivalAirport: "LHR"}])
```

#### clear all the data

first delete one
```
  db.flightData.deleteOne({departureAirport: "TXL"});
```

deleting many - documents have nothing in common

update for commonality
```
  db.flightData.updateOne({distance: 12000}, {marker: "delete"})
```
Error: the update operation document must contain atomic operators

```
  db.flightData.updateOne({distance: 12000}, {$set: {marker: "delete"}} )
```
whenever you see $ in mongodb its a reserved operator (word)
$set tells mongodb to please set this value - if it exists change it to this value otherwise add it

add the marker to all items
```
  db.flightData.updateMany({}, {$set: {marker: "toDelete"}});
```
using {} empty brackets selects all documents.  can be used in deleteMany

delete Multiple Documents
```
  db.flightData.deleteMany({marker: "toDelete"})
```
>and now its empty

dummy data
```
[{
  "departureAirport" : "MUC",
  "arrivalAirport" : "SFO",
  "aircraft" : "Airbus A380",
  "distance" : 12000,
  "intercontinental" : true
  },
  {
    "departureAirport" : "LHR",
    "arrivalAirport" : "TXL",
    "aircraft" : "Airbus A320",
    "distance" : 950,
    "intercontinental" : false
  }]
```
#### insert many Documents
```
  db.flightData.insertMany([{
      "departureAirport" : "MUC",
      "arrivalAirport" : "SFO",
      "aircraft" : "Airbus A380",
      "distance" : 12000,
      "intercontinental" : true
    },
    {
      "departureAirport" : "LHR",
      "arrivalAirport" : "TXL",
      "aircraft" : "Airbus A320",
      "distance" : 950,
      "intercontinental" : false
    }])
```
#### Diving deeper to find data

```
  db.flightData.find({intercontinental: true}).pretty()
```

check for greater than
```
db.flightData.find({distance: {$gt: 10000}}).pretty()
db.flightData.find({distance: {$gt: 900}}).pretty()
db.flightData.findOne({distance: {$gt: 900}})

```
**GOTCHA: pretty() is not supported with findOne()**   
> pretty() only exists on the cursor - findOne doesn't use the cursor


#### update vs updateMany

wants to change 1st flight by changing field

```
  db.flightData.updateOne({_id: ObjectId("5d8d2425c1af1452e19f9ba0")} , {$set:{delayed:true}})
  db.flightData.updateOne({_id: ObjectId("5d8d2425c1af1452e19f9ba0")} , {$set:{delayed:false}})
```

now try this and remove the {$set} operator
```
  db.flightData.updateOne({_id: ObjectId("5d8d2425c1af1452e19f9ba0")} , {delayed:true})
  db.flightData.updateOne({_id: ObjectId("5d8d2425c1af1452e19f9ba0")} , {delayed:false})
  //both produce errors
  Error: the update operation document must contain atomic operators

  db.flightData.update({_id: ObjectId("5d8d2425c1af1452e19f9ba0")} , {delayed:false})
  //but works with update
```
**GOTCHA: update actually replaces all other key/values in the document except the once specified in the update target data and the id (search criteria? or id?) thats why its recommended to use updateOne and updateMany**

if you want to replace something
```
  db.flightData.replaceOne({_id: ObjectId("5d8d2425c1af1452e19f9ba0")}, {
    "departureAirport" : "MUC",
    "arrivalAirport" : "SFO",
    "aircraft" : "Airbus A380",
    "distance" : 12000,
    "intercontinental" : true
    })
```
> this worked the same as update but i guess its something that was created specifically to do this.


#### Understanding find() & the Cursor object

```
  db.passengers.insertMany()

```
here insert the entire array of passengers.json

```
db.passengers.find()
```
**GOTCHA: the last passenger was left off the list. and you could type 'it' to see the next set of available documents**   

.find() it doesn't give us all the available documents but it gives us a cursor document - that allows us to cycle throught the results

```
  db.passengers.find().toArray()
```
.toArray() exhausts the cursor and shows all the documents - but its also not optimal if you have a lot of elements

.forEach() method - driver docs tells you how to use forEach fn in the shell but for use in javascript & the shell is based on js you could pass in a js function
```
  db.passengers.find().forEach( (passengerData) =>{
    printjson(passengerData)
  })
  //printjson cmd available in the shell
```
> same difference  using forEach you still have to regulate the amount if you have a large array of Documents
> says forEach doesn't grab all documents at once, commit it to memory and use all bandwidth - it still uses the cursor and walks through each loop cycle - like using more automatically

#### Understanding Projection
```
  db.passengers.find({},{name:1, id:0}).pretty();//fails
  db.passengers.find({},{name:1, _id:0}).pretty();
  db.passengers.find({},{name:1, _id:0, age:1}).pretty();
```
**GOTCHA: id failed but _id worked**

#### Embedded documents & Arrays
Limits:
100 levels of nesting
overall document must be less than 16MB

```
  db.flightData.updateMany({}, {$set:{ status: { description: "on-time", lastUpdated: "1 hour ago", details: { responsible: "Max Schwarzmueller"} } } } )
```
> using {} empty brackets is like mysql *
> Embedded documents is just json (object data within another object) or a key with object as a value

#### working with arrays
```
  db.passengers.updateOne({name: "Albert Twostone"}, {$set: { hobbies: ["sports", "cooking"]}})
```

#### Accessing structured data
```
  db.passengers.findOne({name: "Albert Twostone"}).hobbies; // gives array or list of hobbies for this one document
  db.passengers.find({ hobbies: "sports"}).pretty();// gives back entire document with hobbies sports
```

how can we query objects?

to find all status (object) with the description of "on-time"
```
  db.flightData.find({"status.description": "on-time"}).pretty();
  db.flightData.find({"status.details.responsible": "Max Schwarzmueller"}).pretty();
```
> i can use dot notation as long as i use double quotes

## Section 3

#### Structuring documents
chaos approach (Very Different)
```
  db.products.insertOne({name: "A book", price: 12.99})
  db.products.insertOne({name: "T-Shirt", seller:{ name: "Max", age 29}})

  db.products.insertOne({name: "Book", price: 12.99})
  db.products.insertOne({name: "Bottle", available: true})
```

sql style (Full Equality)
```
  db.products.insertOne({name: "Book", price: 12.99})
  db.products.insertOne({name: "Bottle", price: 5.99})
```

or in between (Extra Data)
```
  db.products.insertOne({name: "Book", price: 12.99})
  db.products.insertOne({name: "Bottle", price: 5.99})
```
> some structure and some flexibility

to delete all
```
db.products.deleteMany({})
```

```
  db.products.insertOne({name: "Book", price: 12.99})
  db.products.insertOne({name: "A T-Shirt", price: 20.99})
  db.products.insertOne({name: "A Computer", price: 1299, details: { cpu: "Intel i7 8778"}})
```

or if they all need to be the same
```
  db.products.insertOne({name: "Book", price: 12.99, details: null})
  db.products.insertOne({name: "A T-Shirt", price: 20.99, details: null})
  db.products.insertOne({name: "A Computer", price: 1299, details: { cpu: "Intel i7 8778"}})
```

#### Data types an overview
Text "Max"
**no limit except 16MB overall size of the document**
Boolean true/false
Number Integer (int32) NumberLong (int64) NumberDecimal 12.99
ObjectId  ObjectId("sfasd")
ISODate ISODate("2019-09-09")
Timestamp Timestamp(11421532)
Embedded Document {"a":{...}}
Array {"b":[...]}

#### Data types in action

lets use a new database
```
  use companyData
  db.companies.insertOne({name: "Fresh Apples Inc", isStartup: true, employees: 33,
  funding:12345678901234567890, details: {ceo: "Mark Super"}, tags: [{title: "Super"},{title: "Perfect"}],
  foundingDate: new Date(), insertedAt: new Timestamp() })

```
> 33 will be stored as a float in js
> Timestamp is unique to the shell
**you can look in the driver docs to find the right functions to use to get the same effects like timestamp in nodejs driver**

[mongodb Nodejs driver docs](https://docs.mongodb.com/ecosystem/drivers/node/)  
**mongodb site > Resources > Documentation > MongoDB drivers > Nodejs Driver > API Reference**

**GOTCHA: funding:12345678901234567890 number is too big //"funding" : 12345678901234567000,**

#### One To One Relations

```
  db.patients.insertOne({name: "Max", age: 29, diseaseSummary: "summary-max-1"})
  db.diseaseSummaries.insertOne({_id: "summary-max-1", diseases: ["cold","broken leg"]})

  db.patients.findOne()
  db.patients.findOne().diseaseSummary

  var dsid = db.patients.findOne().diseaseSummary
  db.diseaseSummaries.findOne({_id: dsid});
  // issue here is this took 2 steps
```
> better approach is a recommeded Embedded Document

#### many to many reference
//the setup for lookup() (aggregate)
```
  use bookData
  db.books.insertOne({name: "My favorite book", authors:[]})
  db.authors.insertMany([{ name: "Max Schwarz", age: 29, address:{street: "Main"}}, { name: "Manuel Lor", age: 30, address: {Street: "Tree"}}])

  //set authors ids
  db.books.updateOne({}, {$set: {authors: [ObjectId("5d8f5632c62b0c8db9663cea"), ObjectId("5d8f5632c62b0c8db9663ceb")]}})
```

#### Using lookup() for merging references


```
  db.books.aggregate([{$lookup: {from: "authors" , localField: "authors" , foreignField: "_id", as: "creators" }}]).pretty()
```

### Example Project: A Blog

```
  use blog

  db.users.insertMany([{name: "Max Schwarzmueller", age: 29, email: "max@test.com"}, { name: "Manuel Lorenz", age: 30, email: "manu@test.com"}])

  db.posts.insertOne({title: "My first Post!", text: "this is my first post, I hope you like it!", tags: ["new", "tech"], creator: ObjectId("5d8f5bcec62b0c8db9663cef"), comments: [{text: "I like this post!", author: ObjectId("5d8f5bcec62b0c8db9663cee")}]})
```

output
```
  {
        "_id" : ObjectId("5d8f5ca0c62b0c8db9663cf0"),
        "title" : "My first Post!",
        "text" : "this is my first post, I hope you like it!",
        "tags" : [
                "new",
                "tech"
        ],
        "creator" : ObjectId("5d8f5bcec62b0c8db9663cef"),
        "comments" : [
                {
                        "text" : "I like this post!",
                        "author" : ObjectId("5d8f5bcec62b0c8db9663cee")
                }
        ]
}
```

#### Understanding schema validation

```
  db.posts.drop()
  db.posts.findOne() // null

  db.createCollection("posts", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "text", "creator", "comments"],
        properties: {
          title: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          text: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          creator: {
            bsonType: "objectId",
            description: "must be a objectId and is required"
          },
          comments: {
            bsonType: "array",
            description: "must be an array and is required",
            items: {
              bsonType: "object",
              properties: {
                text: {
                  bsonType: "string",
                  description: "must be a string"
                },
                author: {
                  bsonType: "objectId",
                  description: "must be an objectId",
                }
              }
            }
          },
        }
      }
    }
  })
```

#### modify the validation schema
> have to rewrite the whole thing and make the adjustments
```
  db.runCommand({collMod: "posts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        creator: {
          bsonType: "objectId",
          description: "must be a objectId and is required"
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              author: {
                bsonType: "objectId",
                description: "must be an array and is required",
              }
            }
          }
        },
      }
    }
  },
  validationAction: "warn"
  })
```
> default validationAction is error
#### Deeper dive create
```
  use contactData

  db.persons.insertOne({
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"]
  })

  db.persons.insertOne({
  name: "Manuel",
  age: 31,
  hobbies: ["Cars", "Cooking"]
  })
```



#### insertMany
```
  db.persons.insertMany([{name: "Maria", age: 31}, {name: "Chris", age: 25}])

  db.persons.insert({name: "Phil", age: 35})
```
>insertMany can be used with one document but must be wrapped in an array
> WriteResult({ "nInserted" : 1 }) - no id ( this is why insert isn't so great - you have to query all docs and find id manually
but you can use it with single document or in an array with many documents)

#### an 'Ordered insert'
```
  db.hobbies.insertMany([{_id: "sports", name: "Sports"}, {_id: "cooking", name: "Cooking"}, {_id: "cars", name: "Cars"}])
  db.hobbies.insertMany([{_id: "yoga", name: "yoga"}, {_id: "cooking", name: "Cooking"}, {_id: "hiking", name: "hiking"}])// fails
  //duplicate key index 1
  // this still adds everything up until the error 'ordered insert'
```
**GOTCHA: just 'id' will not work. has to be '_id'**
> bring your own ids if you have them

#### config ordered insert
```
  db.hobbies.insertMany([{_id: "yoga", name: "yoga"}, {_id: "cooking", name: "Cooking"}, {_id: "hiking", name: "hiking"}], {ordered: false})
```
> since setting ordered to false it continues to add unique values after the error

#### Understanding the writeConcern
{w: 1, j: undefined}
w: on how many instances i want this write to be acknowledged
j: journal - is an additional file tha saves operations which have not been completed yet ( todo file)
[Even with the docs writeConcern makes no sense](https://docs.mongodb.com/manual/reference/write-concern/)   
[writeConcern 3 must know caveats](https://scalegrid.io/blog/mongodb-write-concern-3-must-know-caveats/)   
