# express   

[express docs](http://expressjs.com/en/4x/api.html)   

> warning bodyParser is now the old way (deprecated)    

[Handle GET and POST Request in Express 4](https://codeforgeek.com/handle-get-post-request-express-4/)   

[How should I organize multiple Express servers on the same system?](https://stackoverflow.com/questions/9332865/how-should-i-organize-multiple-express-servers-on-the-same-system)    

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

#### [setup a simple express server](https://expressjs.com/en/starter/hello-world.html)   

```
  const express = require('express')
  const app = express()
  const port = 3000

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

#### [send html files](https://scotch.io/tutorials/use-expressjs-to-deliver-html-files)   

```
  var express = require('express');
  var app = express();
  var path = require('path');

  // viewed at http://localhost:8080
  app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
  });

  app.listen(8080);
```

[Retrieve the POST request parameters using Express](https://flaviocopes.com/express-post-query-variables/)   

_server src/app.js_

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

_js/app.js_

```
    let uploadData = {title:"post test",var1:"foo",var2:"bar"};

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

> fetch body needs to be stringified or server body-parser error occurs

> when i use axios i don't have to stringify the data - maybe its done for me?   

```
  let uploadData = {};

  const ctrl_Url = `${location.origin}/api/details/items/getItem`;

  uploadData.item_id = iId;

  const response = await axios.post(ctrl_Url, uploadData);
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

#### **GOTCHA:** i have to catch undefined origins    

> which come up when the page is first loaded from the address bar (not a request)   

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

>note:

```
  res.setHeader("Access-Control-Allow-Origin",`https://example.com, https://www.example.com`);
```

>doesn't work b/c you cant have multiple entries so i needed to narrow the field

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

_sites-enabled/example.com_

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
virtual host server block

> replace /req with /desired-path
> replace localhost:3000 with localhost:desired-port#

copy

#### according to this article i can chain routers   

[Keeping API Routing Clean Using Express Routers](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)   

#### [getting chalk colors to show up in bash](https://stackoverflow.com/questions/32742865/no-console-colors-if-using-npm-script-inside-a-git-bash-mintty)   

_.bash_profile_

```
  FORCE_COLOR=true
```
**adding this to .bash_profile works**

get url from req

[how to get the full url in express](https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express)   

```
  console.log(chalk.cyan("[vID req] protocol"),req.protocol);// http
  console.log(chalk.cyan("[vID req] originalUrl"),req.originalUrl);// /appName/path/path
  console.log(chalk.cyan("[vID req] url"),req.url);// path without the appName

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;// the whole thing
  console.log(chalk.cyan("[vID req] fullUrl"),fullUrl);
```

sharing render functions (dynamically render view)   

```
  console.log(chalk.cyan("[vID req] protocol"),req.protocol);
  console.log(chalk.cyan("[vID req] originalUrl"),req.originalUrl);//pathname
  console.log(chalk.cyan("[vID req] url"),req.url);

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(chalk.cyan("[vID req] fullUrl"),fullUrl);

  let toolname = await get_tool_name(req.originalUrl);
  console.log(chalk.cyan("[vID req] toolname"),toolname);
```

#### **GOTCHA: view hbs filename now must match router path**

>my app.use("detail") didn't match my render(toolName) where toolName = 'detail' and the filename was details.hbs   

#### GOTCHA: .env file failed detection   
```
  cd src
  nodemon index.js
```
> the issue occurs when i cd into the servers src folder and then run the server.js file
.env is detected from the root. when i cd into the src folder the src folder becomes the root not its parent folder where i placed the .env file

#### [using a redirect](http://expressjs.com/en/api.html#res.redirect)

res.redirect([status,] path)

Redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an HTTP status code . If not specified, status defaults to “302 “Found”.

```
  res.redirect('/foo/bar')
  res.redirect('http://example.com')
  res.redirect(301, 'http://example.com')
  res.redirect('../login')
```

#### redirect sample

_server.js_

```
  app.get('/',(req, res) => {
    res.redirect('/req/weather');
    // this works to redirectthe origin to anywhere
  })
```

# send html files
[express | docs](https://inspectatech.github.io/notes/?path=/docs/nodejs-express-express-notes--page)   
[Serving Static Files with Node and Express.js](https://stackabuse.com/serving-static-files-with-node-and-express-js/)   
[Serving static assets through wildcard rule](https://codereview.stackexchange.com/questions/29401/serving-static-assets-through-wildcard-rule)   

[Express.js sendfile() vs. render()](https://stackoverflow.com/questions/23875360/express-js-sendfile-vs-render)   

_server.js_

```
    var express = require('express');
    var app = express();
    var path = require('path');

    // viewed at http://localhost:8080/public

    // public option
    app.get('/public', function(req, res) {
        // res.sendFile(path.join(__dirname,'../public/index.html'));// works
        // res.sendFile('public/index.html',{ root: path.dirname(__dirname)});// works
        res.sendFile('index.html',{ root: path.join(__dirname,'../public/')});// works
    });

    app.get('/public/css/*', function(req, res) {
        console.log(req.path);
        res.sendFile(path.join(__dirname,`..${req.path}`));// works
    });


    app.listen(8080);
```
> using a wildcard rule also helps locate and render asses like a css file
