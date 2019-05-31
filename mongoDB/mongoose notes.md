# mongoose notes

[mongoose site](https://mongoosejs.com/)   
[mongoose docs](https://mongoosejs.com/docs/guide.html)   
[mongoose validation docs](https://mongoosejs.com/docs/validation.html)

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

#### creating a model
```
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
```

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
