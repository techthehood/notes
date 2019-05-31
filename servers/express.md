# express
[express docs](http://expressjs.com/en/4x/api.html)   
**warning bodyParser is now the old way**
[Handle GET and POST Request in Express 4](https://codeforgeek.com/handle-get-post-request-express-4/)   

#### POST Request:
>Express version 4 and above requires extra middle-ware layer to handle POST request. This middle-ware is called as ‘bodyParser’.

```
  $ sudo npm install --save body-parser
  $ sudo npm install body-parser
```
[as of 5.0.0 --save option no longer needed](https://stackoverflow.com/questions/19578796/what-is-the-save-option-for-npm-install)   

[express.json vs bodyParser.json](https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json)   
> Earlier versions of Express used to have a lot of middleware bundled with it. bodyParser was one of the middlewares that came it. When Express 4.0 was released they decided to remove the bundled middleware from Express and make them separate packages instead. The syntax then changed from app.use(express.json()) to app.use(bodyParser.json()) after installing the bodyParser module.

> bodyParser was added back to Express in release 4.16.0, because people wanted it bundled with Express like before. That means you don't have to use bodyParser.json() anymore if you are on the latest release. You can use express.json() instead.

[Retrieve the POST query parameters using Express](https://flaviocopes.com/express-post-query-variables/)   

server src/app.js
```
  // app.use(express.static(publicDirectoryPath));// formerly

  // app.use('/nodereq',nR_Proxy);

  app.post('/nodereq/handle',function(req,res){
    console.log(req.body);
    // const query1=request.body.var1;
    // const query2=request.body.var2;
    return res.send({message:"handle received"})
  });
```

js/app.js
```
    let uploadData = {title:"post test"};

    let options = {
            method:'POST',
            body:JSON.stringify(uploadData),
            headers: new Headers({'Content-Type': 'application/json'})
        }// options

      fetch(`https://example.com/nodereq/handle`,options)
      .then((response)=>{
        response.json()
        .then((data) => {
          if(data.error){
            console.log(data.error);
          }else{
            console.log(data);
          }
        })
      })//.then
```
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

## setting up a testing environment
> i want to be able to create quick apps to test features and practice workflows

#### set up another express server on a different port
> use nginx server block to direct traffic to that block using the url path

sites-enabled/example.com
```
  location /req {
  add_header X-app2-message "nodereq section entered" always;
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

```

> replace /req with /desired-path
> replace localhost:3000 with localhost:desired-port#

copy
