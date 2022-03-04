# Passport JWT course
#### [API Authentication with Node Part #1 - Introduction](https://youtu.be/zx6jnaLuB9Q)   
> from passport-jwt-course
created a helpers/routeHelpers.js file

#### [install joi](https://www.npmjs.com/package/joi)   
routeHelpers used a joi schema for validation

> why am i using a joi schema and a mongoose schema?

install mongoose

#### [install jwt](jwt.io)  
> can also use jwt.io to review a deconstructed version of your token

install passport & passport-jwt
install passport-local

install bcrypt

bcrypt example node-course/task-manager/models/user.js
```
  userSchema.statics.findByCredentials = async (email, password) => {
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

bcrypt example passport-jwt-course/models/users.js
```
  userSchema.methods.isValidPassword = async function (newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
      // no access to next() here
      throw new Error(error);
    } finally {

    }
  }

```
goes with passport.js
```
    //  check if password is correct
    const isMatch = await user.isValidPassword(password);

    // if not handle it
    if(!isMatch){
      return done(null, false);
    }
```

[google oauth playground](https://developers.google.com/oauthplayground)   
> Google OAuth2 API v2
> Userinfo.profile
> Authorize APIs (button)
> choose your google account
> Exchange authorization code for tokens (blue button)
> copy acces token

## GOTCHA: passport-google-oauth20 doens't work with this test token method needs passport-google-plus-token
```
  npm i passport-google-plus-token
```

passport.js
```
  const GoogleTokenStrategy = require('passport-google-plus-token');

  passport.use('googleToken', new GoogleTokenStrategy({
    clientID:googleKeys.clientID,
    clientSecret: googleKeys.clientSecret
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('[accessToken]',accessToken);
    console.log('[refreshToken]',refreshToken);
    console.log('[profile]',profile);
  }))
```
routes/user.js
```
  const passportGoogleToken = passport.authenticate('googleToken', { session: false });

  router.route('/oauth/google')
  .post(passportGoogleToken);
```

[create a new app on developers.facebook](https://developers.facebook.com)    
[install facebook token](https://www.npmjs.com/package/passport-facebook-token)   
[get facebook access tokens (playground)](https://developers.facebook.com/tools/accesstoken/)   

[use tools/GRAPH API Explorer to add email permission](https://developers.facebook.com/tools/explorer/)   

[create-react-app docs](https://github.com/facebook/create-react-app)   

to run server side simulated express server and clientside hot reloading (create-react-app) server at the same time on the local machine use
[concurrently](https://www.npmjs.com/package/concurrently)   

[get bootstrap cdn](https://getbootstrap.com/docs/4.3/getting-started/download/)   
> Download

[install react-router-dom]
[install redux-thunk]

**GOTCHA: you have to go to the google apis library and enable  google + api**
[google api library](https://console.developers.google.com/apis/library)   

### GOTCHA: [Uncaught TypeError: Cannot read property 'push' of undefined (React-Router-Dom)](https://stackoverflow.com/questions/44009618/uncaught-typeerror-cannot-read-property-push-of-undefined-react-router-dom)   

[passport google plus | passport docs](http://www.passportjs.org/packages/passport-google-plus/)   
[sunsetting google plus](https://blog.google/technology/safety-security/project-strobe/)   
[Integrating Google Sign-In into your web app (DEPRECATED)](https://developers.google.com/identity/sign-in/web/sign-in)   

[Add Google Sign-In to Your Web App (DEPRECATED)](https://developers.google.com/identity/sign-in/web/)   
[Google Identity Services](https://developers.google.com/identity/gsi/web)

[Getting profile information (DEPRECATED)](https://developers.google.com/identity/sign-in/web/people)   
[Authenticate with a backend server (DEPRECATED)](https://developers.google.com/identity/sign-in/web/backend-auth)   

[migrate from google + sign-in (DEPRECATED)](https://developers.google.com/identity/sign-in/web/quick-migration-guide)   

#### GOTCHA: TypeError: GoogleTokenStrategy is not a constructor
```
  const GoogleTokenStrategy = require('passport-google-token');// fails
  const GoogleTokenStrategy = require('passport-google-token').Strategy;// works
```

[Make sure you have added the domain to google api whitelist](https://console.developers.google.com/apis/credentials/)
**use the example(.com) project**
