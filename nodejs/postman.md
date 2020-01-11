# Postman

### Installing postman

[download from postman site](https://www.getpostman.com/downloads/)   
move to archive folder
```
  /version-control/nodejs/postman
```
double click to install/run
skip the login

#### using postman
1. choose request (or use the new btn)
2. request name: get weather
3. choose or save a collection : Weather App
4. save

type the url
```
  https://example.com/req/forecast?address=philadelphia
```


## Advanced postman

### Updating and using authorization token

#### Basic

go to the request that needs autorization - (get user/ get profile)
click headers and add

| Key | Value |
|---|---|
| authorization | Bearer paste_in_token |

use middleware on the server to handle Authorization

/routers/user.js
```
  const auth = require('../middleware/auth');

  router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
  });//get
```

/middleware/auth.js
```
  const jwt = require("jsonwebtoken");
  const User = require("../models/user");

  const auth = async (req, res, next) => {
    console.log("[auth middleware]");
    try {
      console.log("[auth] req headers",req.headers);// there is also a header onject

      const token = req.header('Authorization').replace("Bearer ","");
      const decoded = jwt.verify(token, 'thisiismynewcourse');//jwt returns a decoded payload
      const user = await User.findOne({  _id: decoded._id , 'tokens.token': token });

      if (!user) {
        throw new Error();
      }

      //pass the user to the route handler
      req.user = user;// seems like adding a property to the global req object
      next();

      console.log("[auth] token",token);
      // next();
    } catch (e) {
      console.log("[auth] error",e);
      res.status(401).send({error:"Please authenticate."})
    }
  }//auth

  module.exports = auth;
```
**the drawback with this is i have to manually add a new token with each create new user or login to reference that user.**

#### Advanced:

choose the options icon on the collections tab
choose edit from the dropdown
choose Authorization tab
choose Type: Bearer Token
a. paste the endpoint into the token input field
b. create a reference to the token environmental variable (recommended)

> the individual request has the same "Authorization" setup

#### setting up the environment
1. go to the cog/gear (option) icon at the top right of the screen
    in the MANAGE ENVIRONMENTS panel
2. Choose add to create one
3. Name the environment in the environment name input field < example: Task Manager API (dev) >
Set key value pairs:
3. enter url in the key field and use localhost:3000 in the value field
4. Click 'Add' to save it

Create another Environment for production (prod)

**Now i can switch environments from the 'no environment' dropdown**

#### To use an environment variable

add {{env_var_name}}/path/path

### update multiple requests to all use the same authentication scheme

copy the jwt if available

1. make sure request authorization (tab) type is "inherit auth from parent" ("no auth" if not needed)
2. go to view more actions dropdown (3 dots) found on the collection tab
3. choose edit > authorization tab
4. choose the appropriate type "" and add the token where needed


#### Environmental variable token
type {{ authToken }} in the token input field
click "update" button
enter the following script in the "test" panel/ test script section of the login and create requests
**test runs after the request is received**

```
  if(pm.response.code === 200){
    pm.environment.set("authToken",pm.response.json().token)
  }
```
pm object has the environment variables which can be set with environment.set("varName","value") like localStorage. pm also has .respone.codes, & the .response.json (which is the body)

**I can also manually create the authToken environment variable using the gear (Manage Environments) icon in the top right of the screen and pasting in the jwt**

#### customizing the collection authorization
go to collection > other actions > edit > authorization
choose API Key from the type dropdown
enter your custom authorization key and the jwt value

passport JWT Strategy
```
  // JSON WEB TOKEN STRATEGY
  passport.use( new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
  },
    async (payload, done) => {
      try {
        // find the user specified in token
        const user = await User.findById(payload.sub);

        // if user doesn't exist, handle it
        if(!user){
          return done(null,false);
        }

        //  otherwise, return the user
        done(null, user);
        // user will now be added to the req.user object

      } catch (error) {
        done(error, false);
      }
  }));
```
**ExtractJwt.fromHeader('authorization') will be the custom authorization key you will use**


#### Axios example
```
  axios.defaults.headers.common['Authorization'] = jwtToken;


	// const valid_token = await axios.post(`${location.origin}/api/alight/validate_token`, { task: "validate_token" });
	const valid_token = await axios.get(`${location.origin}/api/alight/users/validate_token`);
```
**the custom header is also added to the axios header here (not case sensitive)**
