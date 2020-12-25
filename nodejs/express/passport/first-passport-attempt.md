# PHP Passport js notes

[OAuth login (passport.js)](https://youtu.be/sakQbeRjgwg)   
```
const express = require("express");
const path = require('path');

const app = express();
```


set up view engine - so ejs will know where to find the route template views (look for .ejs files)
```
const viewsPath = path.join(__dirname,"../template");
const oauthPath = path.join(__dirname,"../public/OAuth/views");

app.set('view engine', 'ejs');// like handlebars
app.set('views',[viewsPath, oauthPath]);
```

// remember to tell it where the html root folder is so we can write the paths to js & css files
```
const oauthRouters = require('../public/OAuth/routers/auth-routes');
app.use('/auth',oauthRouters);
```

```
const publicDirectoryPath = path.join(__dirname,"../public");
app.use('/', express.static(publicDirectoryPath));
```
## Setting up passport

#### [TokenError in Google oauth2](https://github.com/jaredhanson/passport-google-oauth/issues/76)   
> i didn't immediately document this issue but i did find its solution. I believe this had something to do with the site credentials i added to the console.developers.google credentials form   

[credentials page](https://console.developers.google.com/apis/credentials)   
> ?project=example-push

# passport-lesson
**this was my 1st attempt passport lesson - i came to a dead end because they were using sessions**

#### **GOTCHA: TokenError: Bad Request
    at Strategy.OAuth2Strategy.parseErrorResponse (C:\Users\d3pot\version-control\nodejs\test-server\node_modules\passport-oauth2\lib\strategy.js:358:12)**

[Error at Strategy.OAuth2Strategy.parseErrorResponse - NodeJS passport google oauth2.0](https://stackoverflow.com/questions/51226112/error-at-strategy-oauth2strategy-parseerrorresponse-nodejs-passport-google-oau)   
> You have to specify the full url in the callbackURL section of the strategy: for example: when if running the code locally on localhost:3000 with code like this:
```
  passport.use(new googleStrategy({
      clientID:keys.clientID,
      clientSecret:keys.clientSecret,
      callbackURL:'http://localhost:3000/auth/google/callback'
  },(accessToken,refreshToken, profile,done)=>{
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
  }
));
```

##### console.developers.google

**Authorized JavaScript origins**
>	http://localhost:3000

**Authorized redirect URIs**
> http://localhost:3000/auth/google/redirect


#### **GOTCHA: my model had googleID and i was saving googleId (camelCase) and it didn't save the gID - the model is case sensitive**

#### [Bearer tokens vs cookies](https://stackoverflow.com/questions/37582444/jwt-vs-cookies-for-token-based-authentication)   

GOTCHA: unauthorized

>improved order

[passport.js passport.initialize() middleware not in use](https://stackoverflow.com/questions/16781294/passport-js-passport-initialize-middleware-not-in-use)   

[Disable Sessions - passport docs](http://www.passportjs.org/docs/)   

[Authenticate with a backend server](https://developers.google.com/identity/sign-in/web/backend-auth)   
**use the section marked - Calling the tokeninfo endpoint**
```
  https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123
```

my version

com_aliintro/tables/aliassets.php
```
  function googleLogin($tID)
	{
		$id_token = $tID;
		$log_string = "";


    //client id for webapp
    $this->console_log("google login here ");

		$CLIENTID = "???-XXXYYYZZZ.apps.googleusercontent.com";

    //localhost test client id for other
    // $CLIENTID = "???-XXXYYYZZZ.apps.googleusercontent.com";

		$url = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

		/*
		the variable $post_data contains a string where each parameter is
		separated by  unencoded ampersands
		*/

		$post_data = 'id_token='. $id_token;
		//$post_data .= '&id_token='. $id_token;//for another field

		$ch = curl_init ();
		curl_setopt ( $ch, CURLOPT_URL, $url );
		curl_setopt ( $ch, CURLOPT_POST, true );
		//curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );

    // header('Content-Type: image/jpeg');
    // header("Access-Control-Allow-Origin: *");

		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, $post_data );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYHOST, 2 );
		$result = curl_exec ( $ch );
		$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		//echo $result;
		curl_close ( $ch );

		$login_data = json_decode($result);
    $login_data->host = "google";

    ...

```
[google php client](https://github.com/googleapis/google-api-php-client)   
