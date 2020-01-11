# Mongoose Query Cheat Sheet

[How can I generate an ObjectId with mongoose?](https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose)   
```
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();
```

#### create your own id using ObjectID **(mongodb not mongoose)**
[mongoDB ObjectID docs](https://docs.mongodb.com/manual/reference/method/ObjectId/)   
```
//i can destructure mongoDB
const { MongoClient, ObjectID } = require('mongodb');

// ObjectID lets me create my own ids without the database
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
```

## mongoDB queries
[Query Documents - docs](https://docs.mongodb.com/manual/tutorial/query-documents/)


#### Simple data finder
```
  req_data = await UserItem.find({ root:true});// worked
```


```
  req_data = await UserItem.find({ ancestor: item_ancestor, type: item_type });//
```
> returned all documents because none of the documents had an ancestor field

#### how do i exclude documents where the field does not exist and still compare to a value?
[MongoDB: Find a document by non-existence of a field?](https://stackoverflow.com/questions/8567469/mongodb-find-a-document-by-non-existence-of-a-field)   
[using equals in mongoose](https://docs.mongodb.com/manual/reference/operator/query/eq/#op._S_eq)   
```
  req_data = await UserItem.find({ ancestor: {$exists: true, $eq:item_ancestor}, type: item_type });
```
> here i used exists == true to only find documents were the ancestor field exists and also equals the item_ancestor ObjectId - without exists it will include items where the ancestor doesn't exist at all

#### get a docments ancestor field
```
  // find a documument whose id = the given id
  let item = await UserItem.findOne({ _id: targ_var})
  let targ_ancestor = item.ancestor;
```
**i guess with mongodb you have to get the entire document, then extract the field data you want**

#### deleteOne
[get deleteOne return value](https://mongoosejs.com/docs/api/query.html#query_Query-deleteOne)   
```
// only authorized users should be able to delete
let del_res = await UserItem.deleteOne({ _id: arc_input._id, user_id: req.user._id});
```
add fields
[Update many in mongoose](https://stackoverflow.com/questions/54992810/update-many-in-mongoose)   
```
  let updated = await UserItem.update({"order":0}, {$set:{desc_data: ""}}, {multi:true});// worked
  let updated = await UserItem.updateMany({}, {$set:{desc_data: ""}});// worked
  let updated = await UserItem.updateMany({}, {desc_data: ""});// worked
```
**I think the key was using await and setting it to a variable (maybe try await w/o the variable)**

### 'Query Operators'
[mongoose update operators](https://docs.mongodb.com/manual/reference/operator/update/)   

#### removed fields
```
  let updated = await UserItem.update({"order":0}, {$unset:{desc_data: ""}}, {multi:true});// worked
  let updated = await UserItem.updateMany({}, {$unset:{desc_data: ""}});// worked
```

#### rename fields
```
  let updated = await UserItem.updateMany({}, {$rename:{desc_data: "description"}});// worked schema already had desc_data

  let updated = await UserItem.updateMany({}, {$rename:{"description": "desc_data"}});// failed until ...

```
**failed until schema was updated to use description instead of desc_data**

#### [find many in array of ids](https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array)   
```

```

#### [i was having problems modifying the returned document](https://stackoverflow.com/questions/9952649/convert-mongoose-docs-to-json)   
```
      let mYds = await Item.find({ _id : { $in: info_ids} }).lean();

      if(mYds != false){
        mYds.forEach(value => {
          value.ancestor_list = get_my_ancestors(value,value._id);
          value.is_attachment = "true";
          // echo "[attach msg] host id = host_id and link id = value._id";
          value.pair_order = pair_order("get",value._id,host_id,"");
          //sR[d].ancestor_list = this.get_my_ancestors(sR[d]);
        })//end for
      }//if

```
**without .lean() the document is returned wicth a whole lot of other data and its impossible to modify it**

example without .lean()
```
  { '$__':
   InternalCache {
     strictMode: true,
     selected: {},
     shardval: undefined,
     saveError: undefined,
     validationError: undefined,
     adhocPaths: undefined,
     removing: undefined,
     inserting: undefined,
     saving: undefined,
     version: undefined,
     getters: {},
     _id: 5db0bc661f092e2884b976e5,
     populate: undefined,
     populated: undefined,
     wasPopulated: false,
     scope: undefined,
     activePaths: StateMachine { paths: [Object], states: [Object], stateNames: [Array] },
     pathsToScopes: {},
     cachedRequired: {},
     session: null,
     '$setCalled': Set {},
     ownerDocument: undefined,
     fullPath: undefined,
     emitter: EventEmitter { domain: null, _events: {}, _eventsCount: 0, _maxListeners: 0 },
     '$options': { skipId: true, isNew: false, willInit: true } },
  isNew: false,
  errors: undefined,
  _doc:
   { category: 'media%20home',
     title_data: 'add%20ancestor',
     core_data: 'folder',
     desc_data: '',
     url_data: '',
     other_data: '',
     note_data: '',
     tag_data: '',
     meta_data: '',
     task_data: '',
     picture: '',
     published: true,
     extra: '',
     notification: '',
     admin: false,
     root: true,
     container: false,
     order: 0,
     filter: 'alpha',
     _id: 5db0bc661f092e2884b976e5,
     data_type: 'folder',
     modified: 2019-10-23T20:47:34.413Z,
     user_id: 5da54e08c72fdb4a0c765b0f,
     type: 'media',
     created: 2019-10-23T20:47:34.437Z,
     __v: 0 },
  '$locals': {},
  '$init': true,
  ancestor_list: Promise { '[]' },
  is_attachment: 'true',
  pair_order: Promise { <pending> },
  attached: true }

```
**modifications are added to all the mongoose/mongodb data not the document data itself**

#### [using upsert and new](https://mongoosejs.com/docs/tutorials/findoneandupdate.html)   

uploadOrder.js
```
  update_item = await Param.findOneAndUpdate({ user_id: user_id}, { $set:{ filter: filter} }, { new: true, upsert: true });
```

#### [How to use variable mongoose query?](https://stackoverflow.com/questions/21592595/how-to-use-variable-mongoose-query)
> you have to build set programatically     

```
  let set = {$set: {}};
  set.$set[`filter.${ancestor_obj[anc]}`] = filter;

  update_item = await Param.findOneAndUpdate({ user_id: user_id}, set, { new: true, upsert: true });// { $set:{ filter_str : filter} }
  console.log(chalk.yellow("[update_item]"),update_item);

```
#### orderBy (sort)   
[Example sort in mongodb with nodejs use mongoose](http://codewr.com/view/NODEJS-Mongoose/example-sort-in-mongodb-with-nodejs-use-mongoose)      

```
  let recent_items = await Item.find({type: "media", user_id: uId}).sort({created: -1}).lean();
  let recent_items = await Item.find({type: "media", user_id: uId}).sort({created: -1}).limit(50).lean();// limit works
```
count, limit

#### [How to get all the values that contains part of a string using mongoose find?](https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find)   
> similar to mysql like

```
  let similar = await Item.find({user_id, alias: {"$regex": prep_alias,"$options": "i"}}).lean();
```

this query works directly in robo3t
```
  db.getCollection('items')
  .findOneAndUpdate({_id:ObjectId('5e06532a920b8127bc4cab55')},{$set:{'tool.name':'profile'}})

  or

  Item.findOneAndUpdate({_id:ObjectId('5e06532a920b8127bc4cab55')},{$set:{'tool.template':'basic'}})

  Item.findOneAndUpdate({_id:ObjectId('5e06532a920b8127bc4cab55')},{$set:{'tool.template':'DefaultProfile'}});
```
