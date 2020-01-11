

### Research sanitizing user input



#### add testing
```
  let userItem = await new UserItem(arc_input);

  await userItem.save();
```

#### add user_id
```
  let arc_input = JSON.parse(req.body.arc_input);
  console.log("[user _id]",req.user._id);
  console.log("[user id]",req.user.id);
  arc_input.user_id = req.user.id;
```
// user is passed to the req object through the jwtToken by passport.js jwt authentication

#### using CreatedAt and UpdatedAt
[Saving Current Time and Update Time](https://riptutorial.com/mongoose/example/21388/saving-current-time-and-update-time)   
> does this happen automatically or do i need to do this manually?

in the schema i needed to add a default value
```
    created: {
      type: Date,
      default: Date.now,
```
the next question is will it change when i update it automatically or do i need to add something to pre("save", function(){})


[using try catch](https://javascript.info/try-catch)   

```
  try {
  lalala; // error, variable is not defined!
} catch(err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  alert(err); // ReferenceError: lalala is not defined
}

//logging just err is the same as console.log(`${err.name}:${err.message}`)
```
my catch error test
```
  } catch (error) {
    let issue = error;
    console.log("[upload js] an error has occured", issue);
    console.log("[upload js] stack", issue.stack);
  }
```
adding the error to a variable lets you see the variable in devtools watch panel
adding .stack helps try catch show you the line location of the error - the error alone was useless

#### appending the document
```
      res.json({
        // item: {...userItem, ancestor: set_ancestor}, // gave an object with too much data (robust)
        item: {...userItem._doc, ancestor: set_ancestor}, // worked by referencing ._doc
        // item: userItem, // trying userItem.ancestor = failed to update
        message:"item added successfully."
      });
```
i tried to append the document using userItem

update all documents set description to desc_data

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

removed fields
```
  let updated = await UserItem.update({"order":0}, {$unset:{desc_data: ""}}, {multi:true});// worked
  let updated = await UserItem.updateMany({}, {$unset:{desc_data: ""}});// worked
```

rename fields
```
  let updated = await UserItem.updateMany({}, {$rename:{desc_data: "description"}});// worked schema already had desc_data

  let updated = await UserItem.updateMany({}, {$rename:{"description": "desc_data"}});// failed until ...
```
**failed until schema was updated to use description instead of desc_data**

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
