# MongoDB query log
> shows recent queries

#### add primary to all non-attached pairs
> i need to add a new field "primary" to all pairs whose attachment is false
db.pairs.updateMany({attachment: false},{$set:{primary:true}})

> then i also need one to do the opposite

#### add news to all non-attached pairs
```
  db.pairs.updateMany({attachment: false},{$set:{pair_news:true}})
```

> cut out issues and ideas
```
  db.pairs.updateMany({link_type: {$in:["idea","issue"]}},{$set:{pair_news:false}})
```