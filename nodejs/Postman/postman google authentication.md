# Postman

[Google Authentication with Postman](https://medium.com/kinandcartacreated/google-authentication-with-postman-12943b63e76a)   

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

#### [pre and post scripts in postman](https://learning.postman.com/docs/writing-scripts/intro-to-scripts/)   

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
> NOTE: see video #110 "advanced postman"
type {{ authToken }} in the token input field
click "update" button
enter the following script in the "test" panel/ test script section of the login and create requests
**test runs after the request response is received (post script)**

```
  if(pm.response.code === 200){
    pm.environment.set("authToken",pm.response.json().token)
  }
```
pm object has the environment variables which can be set with environment.set("varName","value") like localStorage. pm also has pm.respone.codes, & the pm.response.json (which is the body)

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

### setup environment variables
  - choose the environments btn on the left control menubar
  - choose the plus at the left top of the menu 
  (hovering says create environment)

[postman API Key](https://learning.postman.com/docs/sending-requests/authorization/#api-key)   

GOTCHA: [Postman OAuth 2.0 "request url is empty" error even though successful authentication](https://stackoverflow.com/questions/68037910/postman-oauth-2-0-request-url-is-empty-error-even-though-successful-authentica)   
> this occured because i didn't have a token_URL (token_uri)

## WHY DO I HAVE TO HUNT FOR THESE?

GOTCHA: [AUTH_URL && AUTH_ACCESS_TOKEN_URL](https://stackoverflow.com/questions/32076503/using-postman-to-access-oauth-2-0-google-apis)   
> why is something so simple so cryptic?  Why do i have to scour the web for hours to find official documentation?
> why should i need to use stackoverflow hearsay trial and error to get to the solution?

DOCS: the official docs can be found in:
[google developer console](console.developers.google.com)   
select project
choose APIs & Services > Credentials
OAuth 2.0 Client IDs 
select edit for target Client ID
choose DOWNLOAD JSON from the top menu to see the auth URLs

```
  {
    "web":{
      "client_id":"xxx-xxxxx-xxxxxx-xxxx",
      "project_id":"project-name",
      "auth_uri":"https://accounts.google.com/o/oauth2/auth",
      "token_uri":"https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
      "client_secret":"xxx-xxxxx",
      "redirect_uris":[`${location.origin}/redirect"],
      "javascript_origins":["http://localhost:5000","https://example.com","https://www.example.com"]
    }
  }
```

GOTCHA: [AUTH_SCOPE](https://stackoverflow.com/questions/7130648/get-user-info-via-google-api)   
> where is the offical docs for the proper scope?

[OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes)    
> there is documentation for a long list of scopes but no real way of knowing which one you need

[Scopes for Google OAUTH2 API, v2](https://developers.google.com/identity/protocols/oauth2/scopes#oauth2)   
> almost impossible to find without scrolling through an extensive list but here is where its found

```
  https://www.googleapis.com/auth/userinfo.profile
```

All the URIs/URLs

```
  AUTH_URI: https://accounts.google.com/o/oauth2/auth
  AUTH_ACCESS_TOKEN_URI: https://accounts.google.com/o/oauth2/token
  AUTH_SCOPE: https://www.googleapis.com/auth/userinfo.profile

  // also try
  AUTH_SCOPE: profile
```

[OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)   

[How to set up Oauth2 in PostMan. (video)](https://www.youtube.com/watch?v=jjCauMywU2Q)   
> in this video the person just used "profile" as the scope
> i tried it and it seemed to work (it still referred to the userinfo.profile url so im not sure it was not used)