
# Mongodb Aggregation

## Articles

- [MongoDB Lookups and Populates: An Unexpected Journey](https://medium.com/cameoeng/mongodb-lookups-and-populates-an-unexpected-journey-940e08e36a94)   
- [Aggregation Pipeline Stages | MongoDB Docs](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)   
- [Aggregation Pipeline Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/)   
   

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

create a pair for all items

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
  {
    '$lookup': {
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
        }
      ], 
      'as': 'info_ids'
    }
  }
```
> i had to use let to help me reference a property from the root
> in match i was able to use the roots variable $/$link_id and match it to host_id in the referenced set (also the pair collection)


new $function

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

[$function (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/function/)   

[MongoDB aggregation with $lookup only include (or project) some fields to return from query](https://stackoverflow.com/questions/35583569/mongodb-aggregation-with-lookup-only-include-or-project-some-fields-to-return)   

[$addFields (aggregation)](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields)   

[MongoDB Compass missing aggregation options](https://www.mongodb.com/community/forums/t/mongodb-compass-missing-aggregation-options/4229/3)   
> may be what I'm looking for ($function) is not missing, maybe its just a part of $lookup and it works with the upgrade to 4.4