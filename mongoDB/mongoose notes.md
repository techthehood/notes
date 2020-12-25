# mongoose notes

[mongoose site](https://mongoosejs.com/)   
[mongoose docs](https://mongoosejs.com/docs/guide.html)   
[mongoose validation docs](https://mongoosejs.com/docs/validation.html)

[mongoose queries](https://mongoosejs.com/docs/queries.html)   
[mongoose deprecations](https://mongoosejs.com/docs/deprecations.html#-findandmodify-)   
```
  mongoose.connect(dbConnect,{ useNewUrlParser: true });
  // mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
```

#### loading mongoose package
```
  npm i mongoose
```

#### setup mongoose
src/db/mongoose.js
```
  const mongoose = require("mongoose");

  // add database name to url
  // useCreateIndex - "makes sure when mongoose works with mongodb our indexes are created allowing us to
  // quickly access the data we need to access"
  mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
  })
```
> notice that in mongoose the databaseName is added to the connection string

#### creating a model
```
  //2nd arg converted will be to a schema
  const User = mongoose.model('user', {
    name: {
      type: String
    },
    age: {
      type: Number
    }
  });

  const me = new User({
    name: "Andrew",
    age: "Mike"
  });

  me.save().then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log("Error!",error);
  })

  // no export needed this is a direct use example
```
**in the video securely storing passwords: part 2 (the complete nodejs dev course - udemy) the author said that mongoose automatically converts the object you pass into the 2nd argument of mongoose.model into a schema.**

[mongoose docs example](https://mongoosejs.com/)   
```
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

  const Cat = mongoose.model('Cat', { name: String });

  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then(() => console.log('meow'));
```
**notice new Schema isn't used**

#### [GOTCHA: MongoError: database name must be a string](https://github.com/typeorm/typeorm/issues/2180)   
>gave this error. But then I specified the collection name admin in this way:
```
mongoose.connect(
  "mongodb://localhost/admin",
  {
    useNewUrlParser: true
  }
);
and the error vanished.
```

examples
```
  mongodb://localhost:27017/test
  mongodb://127.0.0.1:27017/test
```
**it needs the db name at the end, in this case its test**

### using validation

#### use validate fn
 ```
  age: {
    type: Number,
    validate(value){
      if(value < 0){
        throw new Error('Age must be a positive number')
      }
    }
  }
 ```

 #### install validator
 [npm validator](https://www.npmjs.com/package/validator)   
 ```
  npm i validator
 ```

 set up validator & validate an email entry
 ```
 const validator = require("validator");

 ...

 ...

  email: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid")
      }
    }
  },

  ...
 ```

 [check out the mongoose schema types](https://mongoosejs.com/docs/schematypes.html)   
 - unique: true
 - trim: true
 - default: 0
 - lowercase: true

**statics happen to the collection, methods happen to the document**
> i need to improve my mongoose notes

models
userSchema
userSchema.statics
userSchema.methods

#### userSchema
**example from nodejs/node-course/task-manager/src/models/user.js**
**using validator module**
```
  const mongoose = require("mongoose");
  const validator = require("validator");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const Task = require("./task");

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is invalid")
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value){
        // let test_lwr = value.toLowerCase();
        // if(test_lwr.includes("password")){
        if(value.toLowerCase().includes("password")){
          throw new Error("password cannot include 'password'")
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value){
        if(value < 0){
          throw new Error('Age must be a positive number')
        }
      }
    },
    tokens: [{
      token:{
        type: String,
        required: true
      }
    }]
  },{
    timestamps:true
  });

  const User = mongoose.model('User', userSchema);

  module.exports = User;
```

#### userSchema.virtual
```
  userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
  })
```

#### userSchema.methods
**methods run on the document (individual)**
> a method gives in this case gives you access to a particular user - do this with this user
```
  userSchema.methods.generateAuthToken = async function () {
    // methods run on the document (individual)
    const user = this;
    // GOTCHA: user._id is compressed using ObjectID
    // use: user._id.toString()
    const token = jwt.sign({ _id: user._id.toString()},"thisiismynewcourse");

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
  }// generateAuthToken



  // userSchema.methods.getPublicProfile = function () {
  userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();// make it a separate object (not an object reference)

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
  }// toJSON
```

#### userSchema.statics
**statics run on the collection (model)**
> statics look through the entire collection to do something - in this case you are not given a specific user, you have to find from the collection

```
  userSchema.statics.findByCredentials = async (email, password) => {
    // statics run on the collection (model)
    try {
      console.log("[findByCredentials] params",email);
      console.log("[findByCredentials] params",password);
      const user = await User.findOne({email});
      if (!user) {
        console.log("[findByCredentials] User not found");
        throw new Error('Unable to login');
      }//if

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // GOTCHA: failed - should be plain text passwords not hased passwords
        console.log("[findByCredentials] password is not a match");
        throw new Error('Unable to login');
      }//if

      return user;
    } catch (e) {
      console.log("[findByCredentials] error",e);
    }

  }//statics

```

#### userSchema.pre
```
  userSchema.pre('save',async function (next) {
    const user = this;

    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    console.log("[userSchema] just before saving");

    next();// !important or the code hangs forever
  });// .pre('save'...

  userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({owner: user._id});

    next();
  });// .pre('remove'...
```

#### user model route example
```
  const express = require("express");
  const router = new express.Router();
  const auth = require('../middleware/auth');

  const User = require("../models/user");

  router.post('/user/', async (req,res) => {
    // console.log("[user body]",req.body);
    try{

      const user = new User(req.body);

      // generate the user token
      const token = await user.generateAuthToken();

      await user.save()
        res.send({user, token});
    }catch(e){
      console.log("[user error] an error has occured",e);
      res.status(404).send(e);
      // res.status(404).send({error:"an error has occured"});
    }
  })//post
```

#### according to this article i can chain routers
[Keeping API Routing Clean Using Express Routers](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)   

#### example get request
```
  const valid_token = await axios.get(`${location.origin}/api/alight/users/validate_token`);
```

#### a modified post requests
```
   uploadData.payload = payload;
   //console.log(uploadData);

   var form_token = FORM_TOKEN;

   //var urlMod = "webParser";
   //var urlMod = "open_graph_parser";
   var urlMod = "get_user_data";
   let site_origin = location.origin;//nginx fix


   // var ctrl_Url = "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works
   // var ctrl_Url = `${site_origin}/index.php?option=com_arc&task=${urlMod}&format=raw&${form_token}=1`;//this works

   const ctrl_Url = `${location.origin}/api/alight/users/${urlMod}`;

   const valid_token = await axios.post(ctrl_Url, { task: "get_user_data" });
```
**except i don't even need task here, i can send a get request**

modfied post example with upload data
```
    var uploadData = {};

    uploadData.my_data = myData;// do i still need to stringify it? no

    var urlMod = "getData";//put controller.php method call here

    const ctrl_Url = `${location.origin}/api/alight/users/${urlMod}`;

    const result;

    try{

      result = await axios.post(ctrl_Url, uploadData);

```


#### sample bookmark data

```
  [{"ancestor":"m-9338","category":"Mongoose","core_data":"","created":"Tue, 15 Oct 2019 17:36:08 GMT","data_id":"m-9338","label":"Mongoose","data_type":"","title_data":"Mongoose","type":"media","ancestor_list":"[{\"ancestor\":\"m-0\",\"category\":\"media%20home\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:08 GMT\",\"data_id\":\"m-7393\",\"label\":\"media%20home\",\"data_type\":\"\",\"title_data\":\"computing\",\"type\":\"media\"},{\"ancestor\":\"m-7393\",\"category\":\"Computing\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:08 GMT\",\"data_id\":\"m-491\",\"label\":\"Computing\",\"data_type\":\"\",\"title_data\":\"Coding\",\"type\":\"media\"},{\"ancestor\":\"m-491\",\"category\":\"coding\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:08 GMT\",\"data_id\":\"m-7016\",\"label\":\"coding\",\"data_type\":\"\",\"title_data\":\"database\",\"type\":\"media\"},{\"ancestor\":\"m-7016\",\"category\":\"database\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:08 GMT\",\"data_id\":\"m-7152\",\"label\":\"database\",\"data_type\":\"\",\"title_data\":\"mongoDB\",\"type\":\"media\"},{\"ancestor\":\"m-7152\",\"category\":\"database\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:08 GMT\",\"data_id\":\"m-10619\",\"label\":\"database\",\"data_type\":\"\",\"title_data\":\"mongoDB\",\"type\":\"media\"}]"},{"ancestor":"m-7152","category":"database","core_data":"","created":"Tue, 15 Oct 2019 17:36:00 GMT","data_id":"m-10619","label":"database","data_type":"","title_data":"mongoDB","type":"media","ancestor_list":"[{\"ancestor\":\"m-0\",\"category\":\"media%20home\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:00 GMT\",\"data_id\":\"m-7393\",\"label\":\"media%20home\",\"data_type\":\"\",\"title_data\":\"computing\",\"type\":\"media\"},{\"ancestor\":\"m-7393\",\"category\":\"Computing\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:00 GMT\",\"data_id\":\"m-491\",\"label\":\"Computing\",\"data_type\":\"\",\"title_data\":\"Coding\",\"type\":\"media\"},{\"ancestor\":\"m-491\",\"category\":\"coding\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:00 GMT\",\"data_id\":\"m-7016\",\"label\":\"coding\",\"data_type\":\"\",\"title_data\":\"database\",\"type\":\"media\"},{\"ancestor\":\"m-7016\",\"category\":\"database\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:00 GMT\",\"data_id\":\"m-7152\",\"label\":\"database\",\"data_type\":\"\",\"title_data\":\"mongoDB\",\"type\":\"media\"},{\"ancestor\":\"m-9338\",\"category\":\"Mongoose\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:36:00 GMT\",\"data_id\":\"m-10619\",\"label\":\"Mongoose\",\"data_type\":\"\",\"title_data\":\"Mongoose\",\"type\":\"media\"}]"},{"ancestor":"m-7326","category":"npm","core_data":"","created":"Tue, 15 Oct 2019 17:35:40 GMT","data_id":"m-10970","label":"npm","data_type":"","title_data":"mongoose-validator","type":"media","ancestor_list":"[{\"ancestor\":\"m-0\",\"category\":\"media%20home\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:40 GMT\",\"data_id\":\"m-7393\",\"label\":\"media%20home\",\"data_type\":\"\",\"title_data\":\"computing\",\"type\":\"media\"},{\"ancestor\":\"m-7393\",\"category\":\"Computing\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:40 GMT\",\"data_id\":\"m-491\",\"label\":\"Computing\",\"data_type\":\"\",\"title_data\":\"Coding\",\"type\":\"media\"},{\"ancestor\":\"m-491\",\"category\":\"Coding\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:40 GMT\",\"data_id\":\"m-491\",\"label\":\"Coding\",\"data_type\":\"\",\"title_data\":\"Coding\",\"type\":\"media\"}]"},{"ancestor":"m-7326","category":"npm","core_data":"","created":"Tue, 15 Oct 2019 17:35:34 GMT","data_id":"m-7326","label":"npm","data_type":"","title_data":"npm","type":"media","ancestor_list":"[{\"ancestor\":\"m-0\",\"category\":\"media%20home\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:34 GMT\",\"data_id\":\"m-7393\",\"label\":\"media%20home\",\"data_type\":\"\",\"title_data\":\"computing\",\"type\":\"media\"},{\"ancestor\":\"m-7393\",\"category\":\"Computing\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:34 GMT\",\"data_id\":\"m-491\",\"label\":\"Computing\",\"data_type\":\"\",\"title_data\":\"Coding\",\"type\":\"media\"},{\"ancestor\":\"m-491\",\"category\":\"Coding\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:34 GMT\",\"data_id\":\"m-491\",\"label\":\"Coding\",\"data_type\":\"\",\"title_data\":\"Coding\",\"type\":\"media\"}]"},{"ancestor":"m-491","category":"Coding","core_data":"","created":"Tue, 15 Oct 2019 17:35:25 GMT","data_id":"m-491","label":"Coding","data_type":"","title_data":"Coding","type":"media","ancestor_list":"[{\"ancestor\":\"m-0\",\"category\":\"media%20home\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:25 GMT\",\"data_id\":\"m-7393\",\"label\":\"media%20home\",\"data_type\":\"\",\"title_data\":\"computing\",\"type\":\"media\"},{\"ancestor\":\"m-7393\",\"category\":\"Computing\",\"core_data\":\"\",\"created\":\"Tue, 15 Oct 2019 17:35:25 GMT\",\"data_id\":\"m-491\",\"label\":\"Computing\",\"data_type\":\"\",\"title_data\":\"Coding\",\"type\":\"media\"}]"}]
```
#### [using schema type ObjectId](https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/)   
```
  user_id: {
    type: Schema.Types.ObjectId
  },
```
**type: ObjectId is not defined**

#### [Generate ObjectId](https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose)   
```
  var mongoose = require('mongoose');
  var id = mongoose.Types.ObjectId();
```

#### [is ObjectId valid](https://sunzao.us/details/5e16b0ae8ee064177cd3f53b/can-i-determine-if-a-string-is-a-mongodb-objectid-false-valids-using-isvalid)   
```
    const mongoose = require('mongoose');

    const is_objectId_valid = function(id)
    {
      // 12 character strings create a false valid using mongoose isValid
      // let isValid = mongoose.Types.ObjectId.isValid;

      const ObjectId = mongoose.Types.ObjectId;
      if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id)
        {
          return true
        } else {
           return false
        }
      } else {
        return false
      }
    }// is_objectId_valid

    module.exports = {is_objectId_valid};
```

this method alone fails
```
  let isValid = mongoose.Types.ObjectId.isValid;
```
**it returns a false positive if the string its checking is exactly 12 characters like 'classic-jazz'**
