
# Mongodb Aggregation

## Articles

- [MongoDB Lookups and Populates: An Unexpected Journey](https://medium.com/cameoeng/mongodb-lookups-and-populates-an-unexpected-journey-940e08e36a94)   
- [Aggregation Pipeline Stages | MongoDB Docs](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)   
- [Aggregation Pipeline Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/)  


#### [Import pipeline from plain text | Compass](https://www.mongodb.com/docs/compass/current/import-pipeline-from-text/#open-the-new-pipeline-from-plain-text-dialog)   
> choose a collection from the menu
> choose aggregations
> choose the dropdown arrown next to the plus icon under "Documents"
> select "New Pipeline From Text"

#### backup db

```
  mongodump --db dbName --out path/2022-20-19
```

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


my update script

add attachment true to all pairs

```
  db.pairs.updateMany({},{$set:{attachment: true}})// worked
```

#### create a pair for all items

```
  db.items.find({}).forEach(async function(results){

    let host = await db.items.findOne({_id: results.ancestor});

    if(host){

      //results.markModified("links");

      let new_pair = {
        // "_id":results._id,
        "host_type":host.data_type,
        "link_type":results.data_type,
        "pair_order": results.order || 0,
        "host_id": results.ancestor,
        "owner_id":host.user_id,
        "editor_id": results.user_id,
        "link_id": results._id,
        "created": results.created,
        "modified": results.modified,
        "admin":results.admin || false,
        "pair_priority": results.priority || 0,
        "pair_caption":results.caption || "",
        "attachment":false
      };

      db.pairs.findOneAndUpdate({_id: results._id},{$set:new_pair},{upsert: true});

    }// if

  });
```

#### Test $replaceRoot aggregation

```
  [
    {
      '$lookup': {
        'from': 'items', 
        'localField': 'link_id', 
        'foreignField': '_id', 
        'as': 'item_data'
      }
    }, 
    {
      '$replaceRoot': {
        'newRoot': {
          '$mergeObjects': [
            {
              '$arrayElemAt': [
                '$item_data', 0
              ]
            }, '$$ROOT'
          ]
        }
      }
    }
  ]
```
> '$$ROOT' appends the root data of the current collection
> merget the foreign array element with the root data


getMoreInfo.js aggregate sample
```
  // item_ancestor
  // const item_ancestor = "5e2d883a6be8ab12f02ed94b";

  let pipeline = [
    {
      '$match': {
        'host_id': new ObjectId(item_ancestor)
      }
    }, {
      '$addFields': {
        'pair_created': '$created',
        'pair_modified': '$modified'
      }
    }, {
      '$lookup': {
        'from': 'items',
        'localField': 'link_id',
        'foreignField': '_id',
        'as': 'item_data'
      }
    }, {
      '$replaceRoot': {
        'newRoot': {
          '$mergeObjects': [
            {
              '$arrayElemAt': [
                '$item_data', 0
              ]
            }, '$$ROOT'
          ]
        }
      }
    }, {
      '$project': {
        'item_data': 0
      }
    }
  ];

  // this is the stage the may vary
  let sort_obj = {
    'pair_priority': -1,
    'pair_created': -1,
    'title_data': 1
  }
  
  let sort_stage = {
    '$sort': sort_obj
  };
  pipeline.push(sort_stage);
  
  // this is also required but i need it to be the last stage
  let limit_stage = {
    '$limit': limit
  };
  pipeline.push(limit_stage);
  

  // original query
  // rows = await Item.find(query).collation({locale: "en", strength: 2}).sort(sort_array).skip(start_ndx).limit(limit).lean();
  rows = await Pair.aggregate(pipeline);
```
> i think i want to use prepared objects for the object properties and append sections to the array as needed

[mongodb aggregate remove field](https://docs.mongodb.com/manual/reference/operator/aggregation/unset/)   

```
  {
    '$project': {
      'item_data': 0
    }
  }
```
> use $project to remove (or add) fields

[$project in $lookup mongodb](https://stackoverflow.com/questions/53710203/project-in-lookup-mongodb)

```
  let lookup_obj = {
    'from': 'pairs', 
    'let': {
      'link_id': '$link_id'
    }, 
    'pipeline': [
      {
        '$match': {
          '$expr': {
            '$eq': [
              '$$link_id', '$host_id'
            ]
          }, 
          'attachment': true
        }
      }, {
        '$project': {
          'link_id': 1, 
          '_id': 0
        }
      }, {
        '$addFields': {
          'link_id': {
            '$toString': '$link_id'
          }
        }
      }
    ], 
    'as': 'info_ids'
  }


  {
    '$lookup': lookup_obj
  }
```
> i had to use let to help me reference a property from the root
> in match i was able to use the roots variable $/$link_id and match it to host_id in the referenced set (also the pair collection)


#### new $function operator

[$function (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/function/)   

```
  '$addfields': {
  'info_ids': {
    '$function': {
                  'body': function(data) {
                     return data.link_id;
                  },
                  'args': [ "$info_ids" ],
                  'lang': "js"
               }
  }
}
```
> failed - I'm not using the new version that has $function

[How to Use Custom Aggregation Expressions in MongoDB 4.4](https://www.mongodb.com/developer/how-to/use-function-accumulator-operators/)   


[MongoDB aggregation with $lookup only include (or project) some fields to return from query](https://stackoverflow.com/questions/35583569/mongodb-aggregation-with-lookup-only-include-or-project-some-fields-to-return)   

[$addFields (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields)   

### After the upgrade to 4.4   

GOTCHA: [MongoDB Compass missing aggregation options](https://www.mongodb.com/community/forums/t/mongodb-compass-missing-aggregation-options/4229/3)   
> may be what I'm looking for ($function) is not missing, maybe its just a part of $lookup and it works with the upgrade to 4.4


### testing $function operator on 4.4 upgrade

```
  '$addFields': {
    'info_ids': {
      '$function': {
        'body': function(data) {
          let iIds = [];
          if(data.length > 0){
            for(let item of data){
              let id_str = item.link_id;
              iIds.push(id_str);
            }
            return iIds.join();
          }else{
            return "";
          }
        }, 
        'args': [
          '$info_ids'
        ], 
        'lang': 'js'
      }
    }
  }
```
// works
GOTCHA: forEach() didn't work in the function but for of loop does

[$toString (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/toString/)   
```
  // Define stage to add convertedZipCode field with the converted zipcode value

  zipConversionStage = {
    $addFields: {
        convertedZipCode: { $toString: "$zipcode" }
    }
  };

  // Define stage to sort documents by the converted zipcode

  sortStage = {
    $sort: { "convertedZipCode": 1 }
  };

  db.orders.aggregate( [
    zipConversionStage,
    sortStage
  ] )
```


#### [.lean() is not needed](https://stackoverflow.com/questions/47768327/mongodb-using-lean-on-aggregate-function)   

```
  rows = await Pair.aggregate(pipeline).lean();
```

#### using conditional lookups ($or?)   
> i need a way to conditionally lookup items based off certain criteria

[$or (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/or/)   
[$or (used in query)](https://docs.mongodb.com/manual/reference/operator/query/or/)   
[$facet (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/facet/)   
[$expr](https://docs.mongodb.com/manual/reference/operator/query/expr/)    
[$cond]()

#### $or condition

```
  {
      '$match': {
        $or:[{'_id': 'link_id'},{'attachment': false}]
      }
    }

```
#### Create link and host display fields for each pair

```
  db.pairs.find({_id:ObjectId("5e16b0ae8ee064177cd3f53b")},async function(err, results){

    // fails - has no error callback
    // error 'projection' field must be of BSON type object.

  });


  db.pairs.find({}).forEach(async function(results){

    let host = await db.items.findOne({_id: results.host_id});
    let link = await db.items.findOne({_id: results.link_id});

    if(host){
      results.host_display = host.type;
    }// if

    if(link){
      results.link_display = link.type;
    }// if

    db.pairs.findOneAndUpdate({_id:results._id}, {$set: results});  

  });
```
GOTCHA: find has no error callback
// _id:ObjectId("5e16b0ae8ee064177cd3f53b")

#### [using collation](https://docs.mongodb.com/v4.4/reference/collation/)   
[collation with aggregate]()

```
  rows = await Pair.aggregate(
    pipeline, 
    { 'collation': { 'locale': "en", 'caseLevel': true, 'strength': 2 }}/**fails*/
  );
```
> fails -  Callback must be a function, got [object Object]

[aggregate not a function](https://www.mongodb.com/community/forums/t/collation-is-not-a-function/120679/3)   

**remedy:** use addfields, convert text sort field to lowercase new field
sort by new field

```
  if(sort){

    // add a new field
    // make it title_data to lowercase
    // sort by the new field

    if (display_console || true) console.log(chalk.yellow(`[getAdvData] sort`), sort);


    let sort_obj = sort;

    if(Object.keys(sort).includes("title_data")){
      pipeline.push({
        '$addFields': {
          'sort_title': {
            '$toLower': '$title_data'
          }
        }
      });

      delete sort_obj.title_data;
      sort_obj[`sort_title`] = 1;
      // this works for collation GOTCHA: 
      // GUIDE
    }
  
    let sort_stage = {
      '$sort': sort_obj
    };
    pipeline.push(sort_stage);
  }
```
[aggregate toLower](https://docs.mongodb.com/manual/reference/operator/aggregation/toLower/)   

#### give pairs project_id(s)
  
```
  db.pairs.find({}).forEach(async function(results){

    let host = await db.items.findOne({_id: results.host_id});
    let link = await db.items.findOne({_id: results.link_id});

    if(host){
      results.host_project_id = host.project_id;
    }// if

    if(link){
      results.link_project_id = link.project_id;
    }// if

    db.pairs.findOneAndUpdate({_id:results._id}, {$set: results});  

  });
```

#### find some orphaned items and see why they exist

> {owner_id:ObjectId('5e16b0ae8ee064177cd3f53b'),host_project_id:{$ne:ObjectId('5e16b0ae8ee064177cd3f53b')}}   

#### 2 places where pairs are created or modified

- getData/pair_item


#### comparing 2 fields from the same doc within aggregate
[Mongodb query with fields in the same documents](https://stackoverflow.com/questions/8433046/mongodb-query-with-fields-in-the-same-documents)

```
    db.myCollection.find({$expr: {$ne: ["$a1.a", "$a2.a"] } });
```

my sample
```
  //result = client['SunzaoAlight']['pairs'].aggregate([
    result = db.myCollection.aggregate([
      {'$match': {
            'host_type': {'$in': ['project', 'organization', 'user']}, 
            '$expr': {'$ne':['$link_project_id', '$host_project_id']}
        }
      }
  ]);
```
#### updating documents using aggregate
[aggregation with update](https://stackoverflow.com/questions/19384871/aggregation-with-update-in-mongodb)   
[$merge (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/merge/)   
> use $merge at the end of a pipeline to update a collection
```
  [
  {
    '$match': {
      'host_type': {
        '$in': [
          'project', 'organization', 'user'
        ]
      }, 
      '$expr': {
        '$ne': [
          '$link_project_id', '$host_project_id'
        ]
      }
    }
  }, {
    '$addFields': {
      'host_project_id': '$link_project_id'
    }
  }, {
    '$merge': {
      'into': 'pairs', 
      'on': '_id', 
      'whenMatched': 'replace', 
      'whenNotMatched': 'discard'
    }
  }
]
```
> this was executed right inside the compass aggregation tab
> i replaced host_project_id with link_project_id then merged back into the collection

> GOTCHA: I tried to use merge in the wild with getAdvData.js and it failed


#### [Return only a fields values](https://stackoverflow.com/questions/33425565/how-to-return-array-of-string-with-mongodb-aggregation)   
> use distinct or just use map

```
  host_obj_ary.map((entry)=>{
    return new ObjectId(entry.host_id);
  });
```

#### [return random documents](https://stackoverflow.com/questions/24806721/mongodb-how-to-find-10-random-document-in-a-collection-of-100)   

```
  {"$sample":{size: 4}}
```
if you are using limit, don't.  limit will cause the sample to be limited to the limit size. i had a limit of 4 so the sample of 4 randomly reordered the same first 4 items the limit returned.

# [Add only a field from another collection in MongoDB](https://stackoverflow.com/questions/51010754/add-only-a-field-from-another-collection-in-mongodb)   

> i used compass to modify it from the solutions example - i wanted the entire thing to fit into a single stage
> so i wouldn't have to make a lot of stages in compass to write and test it.

> nope the single stage didn't work
```
   {
    '$lookup': {
      'from': 'items', 
      'let': {
        'host_id': '$host_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$eq': [
                '$$host_id', '$_id'
              ]
            }
          }
        }
      ], 
      'as': 'host_cat'
    }
  }, {
    '$addFields': {
      'category': '$host_cat.title_data'
    }
  }, {
    '$unwind': '$category'
  }, {
    '$project': {
      'host_cat': 0
    }
  }
```
NOTE: $unwind is needed because $addFields the way i used it:
```
  'category': '$host_cat.title_data' 
```
turns category's new value into an array

```
  category: ["travel"]
```

$unwind turns it back into a string

