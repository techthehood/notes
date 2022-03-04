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
  db.getCollection('items').updateMany({}, {$set:{code_enabled: true}});// worked

  db.getCollection('items').updateMany({ancestor:ObjectId("609ea3487ff22f213cc81690"),
    data_type:"link"},
{$set:{data_type:"politics"}})
```
**I think the key was using await and setting it to a variable (maybe try await w/o the variable)**

```
  db.pairs.updateMany({},{attachment: true})// failed - 
  db.pairs.updateMany({},{$set:{attachment: true}})// worked
```
[MongoInvalidArgumentError: Update document requires atomic operators](https://stackoverflow.com/questions/38883285/error-the-update-operation-document-must-contain-atomic-operators-when-running)   
> i fixed this using $set

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

### Adding to a query
#### [How to use variable mongoose query?](https://stackoverflow.com/questions/21592595/how-to-use-variable-mongoose-query)
> you have to build set programatically     

```
  let set = {$set: {}};
  set.$set[`filter.${ancestor_obj[anc]}`] = filter;

  update_item = await Param.findOneAndUpdate({ user_id: user_id}, set, { new: true, upsert: true });// { $set:{ filter_str : filter} }
  console.log(chalk.yellow("[update_item]"),update_item);

```

a variation for adding to a query
```
  let query = { user_id: req.user._id, ancestor: {$exists: true, $eq:item_ancestor}, type: item_type };

  let text = {$text: {}};
  text.$text[`$search`] = search_value;
  query = {...query, ...text};//works

  query['$text'] = { "$search": search_value };// works

  // the long non dynamic way - helped for testing
  query = { user_id: req.user._id, /*ancestor: {$exists: true, $eq:item_ancestor},*/ type: item_type, $text:{ $search: search_value } };//works
```

#### orderBy ( = sort)   
[In Mongoose, how sort by date and other field (node.js)](https://medium.com/@jeanjacquesbagui/in-mongoose-sort-by-date-node-js-4dfcba254110)   
[Example sort in mongodb with nodejs use mongoose](http://codewr.com/view/NODEJS-Mongoose/example-sort-in-mongodb-with-nodejs-use-mongoose)      

```
  let recent_items = await Item.find({type: "media", user_id: uId}).sort({created: -1}).lean();
  let recent_items = await Item.find({type: "media", user_id: uId}).sort({created: -1}).limit(50).lean();// limit works
```
count, limit

#### sort multiple fields
[Mongoose Sort Multiple Fields](https://kb.objectrocket.com/mongo-db/mongoose-sort-multiple-fields-609)   
keywords: asc desc ascending descending 1 -1

```
  const allusers = newUser.find({}, "name age", function(err, docs) {
    if (err) console.log(err);
    console.log(docs);
  }).sort([["name", 1], ["age","desc"]]);
```
**notice the use of 1 and "desc"**

sorting consists or an outer array with indexes of an array of arrays
```
  // looks like in needs orderBy to look like this in order to work  [ [ [ 'title_data' ], [ -1 ] ] ]

  rows = await Item.find(query).collation({locale: "en" }).sort([[["priority"],[-1]], ...orderBy]).skip(start_ndx).limit(limit).lean();

  // [[["priority"],[-1]],  [['title_data'],[-1]]]

  let priority = [["priority"],[-1]];
  rows = await Item.find(query).collation({locale: "en" }).sort([ priority, ...orderBy]).skip(start_ndx).limit(limit).lean();//works
  // i need to spread orderBy because its already in the proper 3 array nested format.

  [ ...priority, ...orderBy] //failed - priority doesn't need the spread operator it will break the nested format of the array
  orderBy is in the final tripple format
  orderBy = [ [ [ 'title_data' ], [ -1 ] ] ]
```

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
#### Searching text
my initial sample
```
  let sR = await Item.find({ _id: req.user._id }, {$text:{ $search: text }});
```

GOTCHA: Unsupported projection option: $text: { $search:
> [If you want to apply a filter, use the first positional argument to find():](https://stackoverflow.com/questions/31169416/mongodb-pymongo-badvalue-unsupported-projection-option-when-trying-to-query-all)   
```
  let sR = await Item.find({$text:{ $search: text }, user_id: {$in: req.user._id}}).lean();
  console.log(chalk.green("[searchBkmk] search results = "),sR);
```

#### update all root items to have an ancestor of user_id
```
db.getCollection('items').updateMany({root: true},{$set:{'ancestor':ObjectId('5e16b0ae8ee064177cd3f53b')}})
```

#### using skip and limit
```
  page = parseInt(page);
  limit = parseInt(limit);
  let start_at = (page - 1) * limit;
  rows = await Item.find({ user_id: item_data.user_id, ancestor: {$exists: true, $eq:item_ancestor}, type: item_type }).skip(start_at).limit(limit).lean();

```

#### [not equals](https://docs.mongodb.com/manual/reference/operator/query/ne/)   
```
  db.getCollection('items').find({picture:{$ne:""}})
```

#### finding orphaned files
```
  db.getCollection('items').find({ancestor:{$eq:null}})
```

solution - create an orphaned dir - set it at root, get its id, set its id as ancestor to orphaned files.
//where ancestor is null
```

  db.getCollection('items').updateMany({type: "media",ancestor:{$eq:null}},{ $set:{ ancestor: ObjectId("5e638b912f6d4006fb704b32")}});
```

```
  db.getCollection('items').updateMany({root: true},{ $set:{ ancestor: ObjectId("put user id here")}})
```

#### adding attachment ids in an Array
[mongodb/mongoose findMany - find all documents with IDs listed in array](https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array)   
> here's my idea.  I can add the pair ids to an array for my query orderby order and/or priority and limit to 20, then on return query use the same
criteria and add the new start position - limit 20 till i get all the items.

one experiment in searching by an array of ids
getBookmarks.js
```
  bookmark_items = await Item.find({'_id': { $in: target_ids }}).skip(start_at).limit(limit).lean();
```

add priority to all files
```
  // set initial priorities to zero
  db.getCollection('items').updateMany({priority:{$eq:null}},{ $set:{ priority: '0'}});
  db.getCollection('items').updateMany({rating:{$eq:null}},{ $set:{ rating: '0'}});

  set folder priorities to 2
  db.getCollection('items').updateMany({data_type: 'folder'},{ $set:{ priority: '2'}});

```
GOTCHA: i think it needs numbers not number-strings to work properly - the numbers '0' broke the priority stack

**GOTCHA: in boolean fields use false not 0**

update created and modified
where not-exists (equals null)
```
    db.getCollection('pairs').updateMany({created:{$eq:null}},{ $set:{ created: '2020-05-29T01:27:08.627Z'}});
    // doesn't work, it creates a string not a date

    // fix with this
    db.getCollection('pairs').updateMany({created:{$eq:'2020-05-29T01:27:08.627Z'}},{ $set:{ created: ISODate('2020-05-29T01:27:08.627Z')}});
```

set pair defaults
```
  // set nulls to zero
  db.getCollection('pairs').updateMany({pair_priority:{$eq:null}},{$set:{pair_priority:0}})

  // set zero folders to 1
  db.getCollection('pairs').updateMany({link_type:"folder",pair_priority:{$eq:0}},{$set:{pair_priority:1}})
```
set item defaults
```
  // set nulls to zero
  db.getCollection('items').updateMany({priority:{$eq:null}},{$set:{priority:0}})

  // set zero folders to 1
  db.getCollection('items').updateMany({data_type:"folder",priority:{$eq:0}},{$set:{priority:1}})

  // set 2s to 1
  db.getCollection('items').updateMany({data_type:"folder",priority:{$eq:2}},{$set:{priority:1}})
```

#### [Check if a field contains a string](https://stackoverflow.com/questions/10610131/checking-if-a-field-contains-a-string)   
```
  // example
  db.users.findOne({"username" : {$regex : ".*son.*"}});

  // string im looking to capture
  // &lt;!DOCTYPE html&gt; &lt;html&gt; &lt;head&gt; &lt;/head&gt; &lt;body&gt; &lt;/body&gt; &lt;/html&gt;

  db.getCollection('items').find({note_data:{$regex:/.*DOCTYPE*./}})// works

  // desc_data not empty
  db.getCollection('items').find({note_data:{$regex:/.*DOCTYPE*./},desc_data:{$ne:""}})// seemed to work - no errors but none were not empty

  // or desc_data is empty
  db.getCollection('items').find({note_data:{$regex:/.*DOCTYPE*./},desc_data:{$eq:""}})// works

```
**i wonder can i use an array?**

#### [moving a mongo field within a document if it exists](https://stackoverflow.com/questions/18362907/moving-mongo-field-within-document-if-it-exists)   
article example
```
  db.coll.find({basecampURL : {$exists : true}}).forEach(
    function(doc) {
        var bc = {};
        bc.type = "basecamp";
        bc.url = doc.basecampURL;
        doc.trackingSystems.push(bc);
        // deletes the previous value
        delete doc.basecampURL;
        db.coll.save(doc);
   }
)
```
**trackingSystems is an array field and bc is pushed as an item in the array**

my Example
```
  // variation with title_data to test on one record
  //db.getCollection('items').find({title_data: "create folder feature", note_data:{$regex:/.*DOCTYPE*./},desc_data:{$eq:""}}).forEach(function(doc){

  db.getCollection('items').find({note_data:{$regex:/.*DOCTYPE*./},desc_data:{$eq:""}}).forEach(function(doc){
    var desc = doc.note_data;
    doc.desc_data = desc;
    doc.note_data = "";
    //delete doc.note_data;
    db.getCollection('items').save(doc);
  });
```
**delete works but it does what it does in regular js, completely remove the field altogether**

#### adding a field to all records
```
  db.getCollection('items').updateMany({},{$set:{caption:""}})
  db.getCollection('pairs').updateMany({},{$set:{pair_caption:""}})
```

#### delete field from all records
```
    db.getCollection('prefs').find({}).forEach(function(doc){
      delete doc.user_id;//works
      //if(doc.user_id) doc.set('user_id', undefined, { strict: false });// doc.set is not a function
      db.getCollection('prefs').save(doc);
    });

    // or

    db.getCollection('prefs').update({},{$unset:{user_id:1}});//works
```
**GOTCHA: restart mongodb and the [server] for the changes to take effect**
**GOTCHA: you may also have to drop the index in the indexes folder if they area a unique key**

#### [using findOne then save to replace a document ](https://stackoverflow.com/questions/26871720/using-findone-then-save-to-replace-a-document-mongoose)   
```
  let prefs = await Pref.findOne({ user_id: user_id}, (err, results) => {
    results.bookmarks = new_bkmk;
    results.save((err) => {
      if(err) throw "results failed to save";
      if(display_console || true) console.log(chalk.green("[new_bkmk] saved successfully"));
    });
  })
```

#### creating a new field (adding a new field)
```
  db.getCollection('prefs').findOneAndUpdate({user_id:ObjectId("5e16b0ae8ee064177cd3f53b")},{$set:{project_id:ObjectId("5e16b0ae8ee064177cd3f53b")}})
```
**i can use the same ObjectId in the same document**

#### adding new fields (non existing fields)
```
  db.getCollection('items').find({project_id:{$exists:false}}).forEach(function(doc){
     doc.project_id = doc.user_id;
     db.getCollection('items').save(doc);
  });

  db.getCollection('items').find({project_id:{$eq:null}}).forEach ... // also works
```
**its a very slow process on the remote server**

#### [Find document with array that contains a specific value](https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value)   
[mongodb Query an Array](https://docs.mongodb.com/manual/tutorial/query-arrays/)   

```
  // As favouriteFoods is a simple array of strings, you can just query that field directly:

  PersonModel.find({ favouriteFoods: "sushi" }, ...);

  // But I'd also recommend making the string array explicit in your schema:

  person = {
      name : String,
      favouriteFoods : [String]
  }
```

#### adding an or condition to the query
[Specify OR Conditions](https://docs.mongodb.com/manual/tutorial/query-documents/#specify-or-conditions)   
> i wanted to find access where the array was blank or the array contained the user's user_id

my example
```
  let query = {item_id: item_ancestor, $or:[{access:{$in:[user_id]}}, {access:{$eq:[]}}] };// works

  let iDta = await Item.findOne({ $or: [{ancestor: item._id} , {_id:{ $in: info_ids }}], img_url: { $ne: "" }, img_url: { $ne: null } }).sort([[["created"], [-1]]]).lean();// add_auto_img works
```
**works**

[not empty array field](https://stackoverflow.com/questions/14789684/find-mongodb-records-where-array-field-is-not-empty)   
```
  //If you also have documents that don't have the key, you can use:

  ME.find({ pictures: { $exists: true, $not: {$size: 0} } });

  // MongoDB don't use indexes if $size is involved, so here is a better solution:

  ME.find({ pictures: { $exists: true, $ne: [] } })
```
#### [log all queries that mongoose fire in the application](https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application)   

```
  const chalk = require('chalk');
  const mongoose = require('mongoose');

  mongoose.set('debug',true);// use to show all mongoose queries

  // mongoose.set('debug',function (coll, method, query, doc, options) {
  //  //do your thing
  //  console.log(chalk.red("[mongoose] test query"),options);
  // })
```

#### updating fields

> see also "update multiple items after search"   

```
  db.getCollection('items').find({data_type:"question"}).forEach(function(entry){
   entry.data_type = "discovery";
   db.getCollection('items').save(entry);
  })
```
**works**

```
  db.getCollection('items').find({tag_data:{$ne:""}}).forEach(function(entry){
   let tag_data = entry.tag_data;

   // convert to an array
   if(typeof tag_data == "string"){
     entry.tag_data = (tag_data == "" || tag_data == [""]) ? [] : tag_data.split(",");
   }


   db.getCollection('items').save(entry);
  })
```

update the defaults ""

```
  db.getCollection('items').find({tag_data:{$eq:""}}).forEach(function(entry){

    entry.tag_data = [];

   db.getCollection('items').save(entry);
  })
```


tasks
```
  db.getCollection('items').find({task_data:{$ne:""}}).forEach(function(entry){
   let task_data = entry.task_data;

   // convert to an array
   if(typeof task_data == "string"){
     task_data = task_data.replace(/&quot;/g,'"');
     entry.task_data = (task_data == "" || task_data == [""]) ? [] : [JSON.parse(task_data)];
   }

   db.getCollection('items').save(entry);
  })

  db.getCollection('items').find({task_data:{$ne:[]}})
```
#### test queries for transferring non draftjs formatted note values to desc_data
```
db.getCollection('items').find({note_data:{$ne:""}})
db.getCollection('items').find({note_data:{$regex:/{/}})

has both characteristics
db.getCollection('items').find({note_data:{$ne:""},desc_data:{$ne:""}})// localhost returned 3 records
```

#### transfer non formatted draftjs note_data to desc_data

```
  db.getCollection('items').find({note_data:{$ne:""}}).forEach(function(entry){

    let is_object = typeof entry.note_data == "object" ? true : false;
    let has_desc = entry.desc_data == "" || entry.desc_data == undefined ? false : true;

    if(!is_object && !has_desc){
      let note_data = entry.note_data;
      entry.desc_data = note_data;
      entry.note_data = "";
      db.getCollection('items').save(entry);
    }

  });
```
> It transferred everything - there was an issue in detecting objects

#### reverse the process

```
  db.getCollection('items').find({desc_data:{$ne:""}}).forEach(function(entry){

  let is_object = typeof entry.desc_data == "object" ? true : false;
  let has_note = entry.note_data == "" || entry.note_data == undefined ? false : true;

  if(!is_object && !has_note){
    let desc_data = entry.desc_data;
    entry.note_data = desc_data;
    entry.descc_data = "";
    db.getCollection('items').save(entry);
  }

  });
```

#### testing a single item for object   

```
  db.getCollection('items').find({_id:ObjectId("5e2d883a6be8ab12f02ed94b")}).forEach(function(entry){


    let is_object = typeof entry.note_data == "object" ? true : false;

    if(typeof entry.note_data == "string"){

      try {
        let test_obj = JSON.parse(entry.note_data);
        is_object = typeof test_obj == "object" ? true : false;
      } catch (e) {
        // no need its already false
      }
    }// if

    let indicator = (is_object) ? 1 : 0;

    //entry.code_data = typeof entry.note_data;
    entry.code_data = indicator;

    db.getCollection('items').save(entry);

  });

  // check the results
  db.getCollection('items').find({_id:ObjectId("5e2d883a6be8ab12f02ed94b")})
```

#### fancy test

```
    db.getCollection('items').find({note_data:{$ne:""}}).forEach(function(entry){

      let _from,_to;
      let _forward = true;// this switches the whole thing

      if(_forward){
        _from = "note_data";
        _to = "desc_data";
      }else{
        _from = "desc_data";
        _to = "note_data";
      }//else

      let is_object = typeof entry[`${_from}`] == "object" ? true : false;

      if(typeof entry[`${_from}`] == "string"){

        try {
          let test_obj = JSON.parse(entry[`${_from}`]);
          is_object = typeof test_obj == "object" ? true : false;
        } catch (e) {
          // no need its already false
        }
      }// if

      let has_desc = entry[`${_to}`] == "" || entry[`${_to}`] == undefined ? false : true;

      if(!is_object && /*same_thing*/ has_desc){
        let note_data = entry[`${_from}`];
        entry[`${_to}`] = note_data;
        entry[`${_from}`] = "";
        db.getCollection('items').save(entry);
      }

    });
```

```
  db.getCollection('items').find({note_data:{$ne:""}}).forEach(function(entry){

    let is_object = typeof entry.note_data == "object" ? true : false;

    if(typeof entry.note_data == "string"){

      try {
        let test_obj = JSON.parse(entry.note_data);
        is_object = typeof test_obj == "object" ? true : false;
      } catch (e) {
        // no need its already false
      }
    }// if

    let has_desc = entry.desc_data == "" || entry.desc_data == undefined ? false : true;

    if(!is_object && !has_desc){
      let note_data = entry.note_data;
      entry.desc_data = note_data;
      entry.note_data = "";
      db.getCollection('items').save(entry);
    }

  });
```

```
  db.getCollection('items').find({code_data:{$ne:""},code_data:{$ne:null}}).forEach(function(entry){
    print(typeof entry.code_data);
    try{
      let code_data = typeof entry.code_data == "string" ? JSON.parse(entry.code_data) : entry.code_data;
      print('sweetness')
      if(code_data.hasOwnProperty("is_object")){
        entry.code_data = "";
        db.getCollection('items').save(entry);
      }
    } catch (e) {
        // no need its already false
      }

  });
```

#### [using the $and operator](https://docs.mongodb.com/manual/reference/operator/query/and/)    

```
  db.getCollection('items').find({$and:[{code_data:{$ne:null}},{code_data:{$ne:""}}]}).forEach(function(entry){
    //print(typeof entry.code_data);
    try{
      let code_data = typeof entry.code_data == "string" ? JSON.parse(entry.code_data) : entry.code_data;
      //print('sweetness')
      if(code_data.hasOwnProperty("is_object")){
        entry.code_data = "";
        db.getCollection('items').save(entry);
      }
    } catch (e) {
        // no need its already false
      }

  });
```

[Text Score Metadata Sort](https://docs.mongodb.com/manual/reference/method/cursor.sort/#text-score-metadata-sort)   

```
  let containerized = { "container": "desc", score: { $meta: "textScore" }};
  sR = await Item.find(query, { score: { $meta: "textScore" } }).collation({ locale: "en", strength: 2 }).sort(containerized).skip(start_ndx).limit(limit).lean();
```
> works

[$regex vs. /pattern/ Syntax](https://docs.mongodb.com/manual/reference/operator/query/regex/)   

```
  db.getCollection('items').find({title_data:{$in:[/mongo nodejs/i]}});// works
  db.getCollection('items').find({title_data:{$in:[/The%20Institution/i]}});// works
```
#### update multiple items after search

> see also "updating fields"

GOTCHA: fails
``` 
  db.getCollection('items').find({title_data: {$in:[/%20/i]}}, (err, results) => {
      // let links = results.links;// findOneAndUpdate

		
		results.category = unescape(results.category);
		results.title_data = unescape(results.title_data);
		results.note_data = unescape(results.note_data);
		results.other_data = unescape(results.other_data);

      results.save((err) => {
        if (err) throw "[setLinkData] results failed to save";
        if (display_console || true) console.log(chalk.green("[setLinkData] link saved successfully"));
      });
    })
	// GOTCHA: "errmsg" : "Failed to parse: projection: 
```
> NOTE: You cannot use $regex operator expressions inside an $in.
> tags: includes, wildcard, search

works
```

// count entries
db.getCollection('items').find({title_data: {$in:[/%20/i]}}).count()

//check results with
db.getCollection('items').find({title_data: {$in:[/%20/i]}})


// working query

db.getCollection('items').find({title_data: {$in:[/%20/i]}}).forEach((entry) => {
	
	entry.category = unescape(entry.category);
	entry.title_data = unescape(entry.title_data);
	entry.note_data = unescape(entry.note_data);
	entry.other_data = unescape(entry.other_data);

	db.getCollection('items').save(entry);
});


// test specific entry
db.getCollection('items').find({title_data: {$in:[/reasons your/i]}})
```
> use forEach loop


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

> According to [Mongoose documentation](https://mongoosejs.com/docs/schematypes.html#mixed), Mixed is a schema-less type, you can change the value to anything else you like, but Mongoose loses the ability to auto detect and save those changes. To tell Mongoose that the value of a Mixed type has changed, you need to call doc.markModified(path), passing the path to the Mixed type you just changed

- tag: modify

#### Create inside find test

```
  db.mariochars.find({}).forEach(function(err, results){
    db.fight.insertOne({hero:results.name, enemy:"mushroom"});
  })// failed

  db.mariochars.find({}).forEach(function(results){
    db.fight.insertOne({hero:results.name, enemy:"mushroom"});
  })// worked
```
> GOTCHA: [forEach doesn't need err](https://docs.mongodb.com/manual/reference/method/cursor.forEach/)   

test by id

```
  
  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")}).forEach(function(results){
    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5"),hero:results.name, enemy:"Goomba"});
  })// fails - Missing required argument at position 1

  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")}).forEach(function(results){
    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5")},{hero:results.name, enemy:"Goomba"});
  })// fails - Update document requires atomic operators

  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")}).forEach(function(results){
    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5")},{$set:{enemy:"Boo"}},{upsert,true});
  })// works

```
Shy Guy, Goomba, Chain Chomp, Piranha Plant, Boo, Koopa Troopa, 

#### using a callback instead

```
  
  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")},function(results){
    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5")},{$set:{enemy:"Chain Chomp"}});
  })// fails - 'projection' field must be of BSON type object.


  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")},{},function(results){
    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5")},{$set:{enemy:"Chain Chomp"}});
  })// fails - no error message
  // returns { _id : ObjectId("6206622a36576c8c40dfec7b"), name: 'Mario' }

  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")},{},function(results){
    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5")},{$set:{enemy:"Chain Chomp"}});
  })// still fails

  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b"), {$function:{body:function(){
    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5")},{$set:{enemy:"Chain Chomp"}});
  }}}})// still failed
```
NOTE: i had to add an empty object '{}' in the projection? section - the example also had an empty obj {}
GOTCHA: although no errors this didn't work at all

[mongodb function expression](https://docs.mongodb.com/manual/reference/operator/aggregation/function/#mongodb-expression-exp.-function)   
> GOTCHA: this also didn't help

#### forEach vs callback   

[mongodb callbacks](https://docs.mongodb.com/drivers/node/current/fundamentals/promises/#callbacks)   
[mongodb forEach](https://docs.mongodb.com/manual/reference/method/cursor.forEach/)   

#### can i use async/await?   

> A: yes with await findOne() not find()   

```
  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")}).forEach(async function(results){
    let fight = await db.fight.findOne({_id: ObjectId("62114ece7c98bb6d8dad18b5")});

    console.log(`[fight] hero`, fight.hero);

    let use_hero = fight.hero == "Mario" ? "Luigi" : "Mario";

    db.fight.update({_id: ObjectId("62114ece7c98bb6d8dad18b5")},{$set:{hero: use_hero, enemy:"Shy Guy"}});

  })
```

> this works. i needed to use findOne instead of find for the async/await to work - using find() doesn't return a value == null

can i use upsert?

> A: yes

```
  db.mariochars.find({_id:ObjectId("6206622a36576c8c40dfec7b")}).forEach(async function(results, ndx){

    let fight = await db.fight.findOne({_id: ObjectId("62114ece7c98bb6d8dad18b8")});

    console.log(`[fight] hero`, fight?.hero, fight == null);

    console.log(`[fight] updating ${ndx} ...`);

    let use_hero = fight?.hero == "Mario" ? "Luigi" : "Mario";

    db.fight.findOneAndUpdate({_id: ObjectId("62114ece7c98bb6d8dad18b8")}, {$set:{hero: use_hero, enemy:"Shy Guy"}},{upsert: true});

  })// works
```
> works without errors even if the await item isn't found (doesn't exist)


#### [Mongoose (Mongodb) sorting by populated field](https://stackoverflow.com/questions/56437015/mongoose-mongodb-sorting-by-populated-field)   

```
  const docs = await models.products.aggregate([
    { "$match": { find }},
    { "$lookup": {
      "from": Retailer.collection.name,
      "localField": "retailer",
      "foreignField": "_id",
      "as": "retailer"
    }},
    { "$lookup": {
      "from": Category.collection.name,
      "localField": "category",
      "foreignField": "_id",
      "as": "category"
    }},
    { "$unwind": "$category" },
    { "$sort": { "category.popularity": 1 }}
  ]);
```

Aggregate view "orphaned pairs"

```
  db.pairs.aggregate([
    {
      '$lookup': {
        'from': 'items', 
        'localField': 'host_id', 
        'foreignField': '_id', 
        'as': 'string'
      }
    }, {
      '$match': {
        'items': {
          '$size': 0
        }
      }
    }
  ])

  /*
    ,
    {'$count':'_ids'}
  */
```
> works - $count added later to total returned items

