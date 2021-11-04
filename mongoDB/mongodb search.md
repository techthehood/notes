

[Text Score Metadata Sort](https://docs.mongodb.com/manual/reference/method/cursor.sort/#text-score-metadata-sort)   
#### GOTCHA: [MongoDB error- must have $meta projection for all $meta sort keys while performing text search in NodeJS](https://onecompiler.com/questions/3w3vwnb69/mongodb-error-must-have-meta-projection-for-all-meta-sort-keys-while-performing-text-search-in-nodejs)   

[metadata sort fix hint](https://stackoverflow.com/questions/60136483/mongo-nodejs-project-is-not-a-function)   

```
  let containerized = { "container": "desc", score: { $meta: "textScore" }};
  sR = await Item.find(query, { score: { $meta: "textScore" } }).collation({ locale: "en", strength: 2 }).sort(containerized).skip(start_ndx).limit(limit).lean();
```
> works
> the text score metadata sort script is put outside the query in the find params

[$regex vs. /pattern/ Syntax](https://docs.mongodb.com/manual/reference/operator/query/regex/)   

_robo 3T_

```
  db.getCollection('items').find({title_data:{$in:[/mongo nodejs/i]}});// works
```
> NOTE: You cannot use $regex operator expressions inside an $in.

[Mongo NodeJS project() is not a function](https://stackoverflow.com/questions/60136483/mongo-nodejs-project-is-not-a-function)   