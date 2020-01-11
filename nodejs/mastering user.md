# Mastering User
The power of my entire technological ability is encapsulated in one concept - to learn to master 'user'

### Contents:
  - Mongoose Schema (Dynamic updates to the Schema )
  - Passport.js authentication tokens
  - Express router paths && params:
  - Axios and authentication headers
  - Mobx state management system
  - React Router (Page switching)

**use ctrl and alt to multiple cursor down without selecting the whole line**

#### [Why Underscores are Not Recommended](https://www.woorank.com/en/blog/underscores-in-urls-why-are-they-not-recommended)   
[Underscores vs. dashes in URLs](https://youtu.be/AQcSFsQyct8)   


#### [How can I rename a collection in MongoDB?](https://stackoverflow.com/questions/8732553/how-can-i-rename-a-collection-in-mongodb)   
**I want to be able to update mongodb collections from the mongodb shell (without Robo)**

#### rename collection using the mongodb shell
**see mongoDB-notes.md**
```
  //open the shell
  $ mongo

  // show dbs
  $ show dbs

  // use the specific db
  $ use dbName

  // double check by printing current db
  $ db

  //show available collections
  show collections

  // rename collection
  db.currentCollectionName.renameCollection('newCollectionName');

```
