
getMoreInfo
```
[
  {
    '$match': {
      'host_id': new ObjectId('5e2d883a6be8ab12f02ed94b')
    }
  }, {
    '$addFields': {
      'pair_created': '$created', 
      'pair_modified': '$modified'
    }
  }, {
    '$lookup': {
      'localField': 'link_id', 
      'foreignField': '_id', 
      'as': 'item_data', 
      'from': 'items'
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
  }, {
    '$sort': {
      'title_data': 1, 
      'pair_priority': -1, 
      'pair_created': -1
    }
  }, {
    '$limit': 20
  }, {
    '$lookup': {
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
      'as': 'info_ids', 
      'from': 'pairs', 
      'let': {
        'link_id': '$link_id'
      }
    }
  }, {
    '$addFields': {
      'info_ids': {
        '$function': {
          'body': 'function(data) {\n                    let iIds = [];\n                    if(data.length > 0){\n                      for(let item of data){\n                        let id_str = item.link_id;\n                        iIds.push(id_str);\n                      }\n                      return iIds.join();\n                    }else{\n                      return "";\n                    }\n                  }', 
          'args': [
            '$info_ids'
          ], 
          'lang': 'js'
        }
      }
    }
  }
]
```

getMoreItem

```
[
  {
    '$match': {
      '_id': new ObjectId('61d5fa092ad43f126048d396')
    }
  }, {
    '$addFields': {
      'pair_id': '$_id', 
      'pair_created': '$created', 
      'pair_modified': '$modified', 
      'pair_binder': '$host_id', 
      'pair_owner': '$owner_id'
    }
  }, {
    '$project': {
      '_id': 0
    }
  }, {
    '$lookup': {
      'localField': 'link_id', 
      'foreignField': '_id', 
      'as': 'item_data', 
      'from': 'items'
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
  }, {
    '$sort': {
      'pair_created': -1, 
      'title_data': 1, 
      'pair_priority': -1
    }
  }, {
    '$limit': 20
  }
]
```