# Passport notes

[A Step-by-Step Guide to Setting Up a Node.js API With Passport-JWT](https://medium.com/better-programming/perfect-structure-to-authenticate-authorize-api-with-node-js-and-passport-jwt-d529b1a618ba)   

passing data to passport from urls

_Alight/routers/api_

```
  router.all('/*', cors(corsOptions), passportJWT,  async (req, res, next) => {
    console.log('[cors/passport] passed');
    next();
  })

  router.use("/items",items);
  router.use("/users",users);
  router.use("/arc",arc);
```
<br/>

#### JWT_TOKEN   

  - where are jwtTokens first created and saved | **OAClient-actions**

_public/oauth-client/src/js/actions/index.js_

  <!-- [**OAClient-actions**]{@link module:OAClient-actions-oauthGoogle} -->

```
export const signIn = (data) => {
  return async (dispatch) => {

  ...

  const res = await axios.post(`${location.origin}/api/auth/signin`, data);

      console.log("[axios res]",res);

      console.log('[ActionCreator] signIn dispatched an action!');
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;

    ...
```

  - where is passport first connected with a config file? | **express-server**   
  <!-- [**express-server**]{@link module:express-server} -->

  _src/index.js_   

  ```
  const passport = require('passport');
  const passportConfig = require('./oauth_server/passport');
  ```

  - where is the basic token first added to a header | [app.js]{@link module:App}


  - where is the passportJWT being set for all routes? | **alight-api**
  <!-- [**alight-api**]{@link module:alight-api}    -->

  _public/alight/routers/api.js_

```
  const passport = require('passport');
  const passportJWT = passport.authenticate('jwt', {session: false, failureRedirect: '/auth'});

  ...

  router.all('/*', cors(corsOptions), passportJWT,  async (req, res, next) => {
    if(display_console || false) console.log('[cors/passport] passed');
    next();
  })
```
[passport.authenticate DOCS:](http://www.passportjs.org/docs/authenticate/)

> in src/index.js server there are 2 routes to target:   
> const arcPagesRouter = require("../public/alight/routers/alight"); - has no knowledge of jwtToken   
> const arcAPIRouter = require("../public/alight/routers/api"); - processes jwtTokens

  - where are jwtTokens verified on each request? | [**JwtStrategy**]{@link module:passport~JwtStrategy}
  - where is it determined whose project im looking at?
    - A: on the server by url | [firestarter **send_host**]{@link module:firestarter~send_host}
    - this sets window['HOST_DATA'] (or not) in views/alight.hbs | [**alight.hbs**]{@link module:alight-hbs}

  - where is the viewer determined? | [App **get-user-prefs**]{@link module:App~get-user-prefs}
  - where is the viewer data determined? | [api/alight/users **getUserPrefs**]{@link module:api-alight-users~getUserPrefs}
  - how does the core know i have editor access? | []{@link module:}

#### to verify tokens manually   

_signToken.js_ >   

```
  const verifyToken = (token, raw = false) => {
    let verifier;
    let project_claim = `${namespace}project_id`;
    try {
      verifier = JWT.verify(token, JWT_SECRET);
      if(display_console || false) console.log(`[verifyToken] verifier`,verifier);
    } catch (e) {
      // verifier will still be undefined if error
      console.error(e);
    }

    return (raw) ? verifier : (verifier != undefined) ? { user_id: verifier.sub, project_id: verifier[`${project_claim}`] } : verifier;
  }// verifyToken
```

#### where is the project token first called?

_App.js_

```
	if(!project_token_response.data.error && project_token_response.data.token != undefined){
		let project_token = project_token_response.data.token;
		sessionStorage.setItem("project_token",project_token);

		axios.defaults.headers.common['Authorization'] = project_token;
	}//if
```

#### where is the project token created?   

_alight/controllers/lib/getProjectToken.js_

#### how is the project token verified? A: same as the jwtToken   

passport.js > JwtStrategy   

```
  passport.use( new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
  },
    async (payload, done) => {

    ...

    // check for the existence of a project_id
    let namespace = "https://sunzao.us/";
    let project_claim = `${namespace}project_id`;
    if(payload[`${project_claim}`]){
      if(display_console || false) console.log(chalk.yellow(`[JwtStrategy] project_claim detected`),payload);
      user.project_id = payload[`${project_claim}`];
    }

    ...
```
#### GOTCHA: 3rd party cookies error
[idpiframe_initialization_failed: Cookies are not enabled in current environment.](https://github.com/googleworkspace/browser-samples/issues/68)   
> 3rd party cookies have to be enabled (turned on) for google login to work

[random password generator](https://www.grc.com/passwords.htm)   