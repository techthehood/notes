# getMoreInfo sample aggregation

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
  }, {
    '$sort': {
      'pair_priority': -1, 
      'pair_created': -1, 
      'title_data': 1
    }
  }, {
    '$limit': 20
  },
  {
    '$skip': 20
  },
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
  }, {
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
  }
]
```
GOTCHA: in the server usage, the 'body': function property fails if its in quotes 'function...'