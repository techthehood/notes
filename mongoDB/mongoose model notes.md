

app.js (server)
```
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/APIAuthentication',{ useNewUrlParser: true });
```

#### Simple model
```
  const mongoose = require('mongoose');

  //2nd arg converted will be to a schema
  const User = mongoose.model('user', {
    name: {
      type: String
    },
    age: {
      type: Number
    }
  });

    module.exports = User;
```

#### example mongoose model

models/user.js
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Create a schema
// const userSchema = new Schema({
//   email: String,
//   password: String
// });

// version 2 for local strategy
// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// version 3 for oauth and local
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local','google','facebook'],
    required:true
  },
  local:{
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String,
    }
  },
  google: {
    id:{
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id:{
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

userSchema.pre('save', async function (next) {
  // needs to use this so no arrow fn here
  try {

    // oauth mod
    if(this.method !== 'local'){
      next();
    }//if

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate a password hash (salt + hash)
    // bcrypt.hash('user password over here', salt);
    const passwordHash = await bcrypt.hash(this.local.password, salt);

    console.log('salt', salt);
    console.log('normal password', this.local.password);
    console.log('hashed password', passwordHash);
    this.local.password = passwordHash;

  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    console.log("this.local.password",this.local.password);
    console.log("newPassword",newPassword);

    return await bcrypt.compare(newPassword, this.local.password)
  } catch (error) {
    // no access to next() here
    throw new Error(error);
  } finally {

  }
}

// Create a model
const User = mongoose.model('user',userSchema);

// Export the model
module.exports = User;

```

included in the routers reference to its controller (UsersController)
```
  const User = require('../models/user');  

  ...
  //used somewhere like this
  const foundUser = await User.findOne({"local.email":email});
  ...

```

#### [creating objectId](https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose)   
```
  var mongoose = require('mongoose');
  var id = mongoose.Types.ObjectId();
```

proper validation
```
  validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
```

the lessons basic example:
```
  age: {
    type: number,
    validate(value){
      if(value < 0)
      {
        throw Error("Age must be a positive number")
      }
    }
  }
```
The top example from the mongoose documentation looks more correct for json and has a smaller chance to deprecate when versions update.
[mongoose validation docs](https://mongoosejs.com/docs/validation.html#custom-validators)   
