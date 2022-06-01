# [express cors middleware](https://expressjs.com/en/resources/middleware/cors.html)   

#### [CORS](https://www.npmjs.com/package/cors)   

[express js cors](https://expressjs.com/en/resources/middleware/cors.html)   
[Allow multiple CORS domain in express js](https://stackoverflow.com/questions/26988071/allow-multiple-cors-domain-in-express-js)   
[Using CORS in Express](https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b)   

#### test1
```
  var express = require('express')
  var cors = require('cors')
  var app = express()

  var whitelist = ['http://example1.com', 'http://example2.com']
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  app.get('/products/:id', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
  })
```
**failed**

#### test2
working example
```

  var corsOptions = {
    origin: 'https://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
```
**this once works**

#### GOTCHA: i have to catch undefined origins - which come up when the page is first loaded from the address bar (not a request)
```
  var whitelist = [
    'https://example.com',
    'https://www.example.com'
  ];

  var corsOptions = {
    origin: function (origin, callback) {
      console.log(origin);//sometimes its undefined
      if(!origin) return callback(null, true);

      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback('Not allowed by CORS')
      }//else
    }//anon fn
  }//corsOptions

```
>this line was needed to catch undefined origins

```
  if(!origin) return callback(null, true);
```
#### GOTCHA: im having a problem with post request
>Access to fetch at 'https://example.com/req/post' from origin 'https://www.example.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.


[Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.](https://github.com/expressjs/cors/issues/159)   

#### add cors without cors package
[How to add CORS functionality to your NodeJS web app](https://www.codementor.io/nodejsappdeveloper/how-to-add-cors-functionality-to-your-nodejs-web-app-ed4eu7ltf)   

```
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
```

>note: res.setHeader("Access-Control-Allow-Origin",`https://example.com, https://www.example.com`); doesn't work b/c you cant have multiple entries so i needed to narrow the field

>note: using app.use and a dynamic why to check req.host against a whitelist did work but it set it one time for all subsequent requests (somehow failed when requests didn't match original)


#### This does the trick
[CORS express not working predictably](https://stackoverflow.com/questions/34644622/cors-express-not-working-predictably)   
[Get hostname of current request in node.js Express](https://stackoverflow.com/questions/7507015/get-hostname-of-current-request-in-node-js-express)   

```
  app.options('/req/post', cors(corsOptions),function(req,res){
    //if it gets through run this script
    res.setHeader("Access-Control-Allow-Origin",`https://${req.host}`);
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.end();
  });

  app.post('/req/post', cors(corsOptions),function(req,res){
    // constroller - distribute by task
    console.log(req.body);
    let obj = req.body;
    ...
```
**set the option b4 each post request**

> GOTCHA: using cors with postman - postman shows "no origin detected"
> i can use cors with local server but a live server won't allow postman requests under my current cors config.

```
  if(!origin){
    if(display_console || true) console.log(`[no origin detected]`,origin);
    return callback(null, true);
  }
```
> NOTE: actually this passes cors - it does the same thing it does for the valid origin "callback(null, true)"
[postman access live servers](https://support.postman.com/hc/en-us/articles/211913929-My-request-is-redirected-to-a-GET-request)   
> there are settings in cors dealing with 301 redirects etc that makes postman unable to access my live server directly   

#### [reporting errors using 'next'](https://expressjs.com/en/guide/error-handling.html)

> if next() fn is give any value it reports as an error

```
  next("anything is error text");
```

#### [Joi middleware config](https://stackoverflow.com/questions/57956609/joi-1-default-validate-is-not-a-function)   
> GOTCHA: joi.validate is not a function

```
  const validateBody = (req, res, next) => {
    //updated joi

    // This is a shorter version
    console.log(chalk.yellow(`[routeHelper] req.body`),req.body);

    const { error } = schema.validate(req.body);

    // Error in response

    // res.send(error.details[0].message);
    let error_msg = "[routeHelpers] Joi an error has occured";
    if (error) next(error);// error_msg, false

    // next(error_msg);// use this to disable manual signups and signins
    next();
  }

  const schema = Joi.object({
    // name: Joi.string().min(3).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required()
  });

  module.exports = { schema, validateBody };
```