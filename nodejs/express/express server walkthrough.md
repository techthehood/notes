# server walkthrough line by line   
<hr/>

**recommended install dependencies**

```
  npm i express hbs chalk cors mongoose passport
```

[path | node.js docs](https://nodejs.org/dist/latest-v15.x/docs/api/path.html#path_path)   
The path module provides utilities for working with file and directory paths. It can be accessed using:

```
  const path = require('path');
```
> the path module **doesn't have to be installed** its already available with nodejs

[Express, a popular Node.js Framework](https://flaviocopes.com/express/)   

Express is a Node.js Web Framework. Node.js is an amazing tool for building networking services and applications. Express builds on top of its features to provide easy to use functionality that satisfy the needs of the Web Server use-case.

[express | npm](https://www.npmjs.com/package/express)

```
  const express = require('express');
  const app = express();
```
import and  initialize express then instantiate an express app   

[What is the difference between “instantiated” and “initialized”?](https://stackoverflow.com/questions/2330767/what-is-the-difference-between-instantiated-and-initialized)   

#### setup [express json](http://expressjs.com/en/api.html#express.json)   

```
  app.use(express.json());
```
> no longer bodyParser.json now using express.json

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

#### [chalk (optional)](https://www.npmjs.com/package/chalk)   

Terminal string styling done right   

```
  const chalk = require('chalk');
```

**usage**

```
  const chalk = require('chalk');

  console.log(chalk.blue('Hello world!'));
```

#### set your port

```
  let PORT = (os.hostname().includes("myDomainName")) ? 1027 : 3000 ;
```
> checks for live or localhost   
> local doesn't work because my laptop was 'DESKTOP' not local

#### configure .env keys

_server.js_

```
  const Keys = require('./utils/keys').mongodb;
```

_./utils/keys_

```
  const dotenv = require('dotenv');
  dotenv.config();

  module.exports = {
    mongodb:{
      dbURI: process.env.MONGODB_LOCAL_TASK_URI,
      liveURI:process.env.MONGODB_LIVE_TASK_URI,
      db:process.env.MONGODB_LOCAL_DB,
      liveDB:process.env.MONGODB_LIVE_DB,
      localhost:process.env.MONGODB_LOCALHOST_DB
    },
    session:{
      cookieKey:process.env.SESSION_COOKIE_KEY
    }
  }

```

_.env_

```
  JWT_SECRET='XXXXXXXXXXXX'
  GOOGLE_CLIENT_ID='XXXXXXXXXXXX'
  GOOGLE_CLIENT_SECRET='XXXXXXXXXXXX'
  FACEBOOK_CLIENT_ID='XXXXXXXXXXXX'
  FACEBOOK_CLIENT_SECRET='XXXXXXXXXXXX'
  MONGODB_LOCAL_TASK_URI='mongodb://111.11.11.11:????/task-manager-api'
  MONGODB_LIVE_TASK_URI='mongodb://111.11.11.11:????/task-manager-api'
  MONGODB_LOCAL_DB='mongodb://111.11.11.11:????/DBName'
  MONGODB_LIVE_DB='mongodb://111.11.11.11:????/DBName'
  MONGODB_LOCALHOST_DB='mongodb://localhost/DBName'
  SESSION_COOKIE_KEY='XXXXXXXXXXXX'
  YOUTUBE_API_KEY='XXXXXXXXXXXX'
  NODE_ENV='development'
  USE_LOCAL_FILES='false'
```
> set your own data in place of 111.11.11.11 and XXXXXXXXXXXX etc.

> the .env file should be added to the site root (the folder containing everything)
> **GOTCHA:** in order for dotenv to be able to detect your .env file the server has to be started from the
same folder the .env file is found in.

for example **use this**

```
  nodemon src/server.js
  // and/or
  pm2 start src/server.js
```

**not this**

```
  cd src
  nodemon server.js
  // and/or
  pm2 start server.js
```
> don't navigate into a folder .env isn't contained in to start the server or you loose the .env file


#### set up mongoose (optional)

```
  const mongoose = require('mongoose');

  ...

  let dbConnect = (os.hostname().includes("mySiteDomain")) ? Keys.liveDB : Keys.db;
  mongoose.connect(dbConnect,{ useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
```


#### [Using template engines with Express](https://expressjs.com/en/guide/using-template-engines.html)   
[Template engines | express docs](https://expressjs.com/en/resources/template-engines.html)   

A **template engine** enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.

[Express.js view engine (template engine) for handlebars.js](https://www.npmjs.com/package/hbs)   

```
  const hbs = require('hbs');
```

#### hbs usage
> set view engine, set views, set partials, create helpers if needed


_server.js_

- setup where to look for view directories (an array of view file paths)   

```
  app.set('view engine', 'hbs');

  const viewsPath = path.join(__dirname,"../templates/views");// default views location
  const appsPath = path.join(__dirname,"../public/apps/views");
  ...

  app.set('views', [viewsPath, appsPath, alightPath, oauthClientPath, businessPath, updraftPath, rocketPath]);//this works
```

- setup where to look for view partials (hbs views snippets that are shared on multiple views)

```
  const partialsPath = path.join(__dirname,"../templates/partials");
  hbs.registerPartials(partialsPath);
```

- setup helper functions that are used on server variables to help process view template data

```

  hbs.registerHelper('json', function(context) {
    // why stringify the data?
      let data_str = JSON.stringify(context);
      return JSON.stringify(data_str);
  });

  hbs.registerHelper('vendor', function(name, use_local_files, force_local) {

    console.log(chalk.red(`[vendor] use_local_files`),name, typeof name);
    console.log(chalk.red(`[vendor] use_local_files`),use_local_files, typeof use_local_files);

    // console.log(chalk.red(`[vendor] force_local`),force_local, typeof force_local);

    let force_local_file = (typeof force_local == "boolean" && force_local == true) ? true : false;
      return (typeof use_local_files == "string" && use_local_files == "true" || force_local_file ) ?
      `${name}_local` : name;

  });
```

_views/sample.hbs_ (similar to an index.html file)

```
  {{>(vendor 'bootstrap' use_local_files true)}}

  {{>pp_head}}

  window['HOST_DATA'] = JSON.parse({{{json data}}});
```

vendor used a registered helper and a use\_local\_files variable from the server
pp_head is using a partial to add profile panel html elements to the head section of the html
json data is using the json registered helper to process server generated json data

#### setup server router result data to be processed by the client side views

_routers/alight.js_ > firestarter route

```
  res.render(toolname, {
    title:'push tester',
    name: 'your pusher',
    use_local_files: keys.use_local_files,
    data
  });// render
```
> render data

#### set all routes to use the public directory (root)
> this allows all views reference to scripts and links to work. it helps their paths refererence the root directory.

```
  const publicDirectoryPath = path.join(__dirname,"../public");

  app.use('/',express.static(publicDirectoryPath));

  app.use('/updraft',express.static(publicDirectoryPath));//
  app.use('/updraft/:val1?',express.static(publicDirectoryPath));// needed for the links and scripts to work
  app.use('/updraft/:val1?/:val2?',express.static(publicDirectoryPath));

  app.use('/auth',express.static(publicDirectoryPath));
```

#### set up path to routers

```
  const updraftRouter = require("../public/updraftjs/routers/updraft");

  ...

  app.use('/auth', require('../public/oauth_client/routers/auth'));
  app.use('/updraft',updraftRouter);
```
> im sure you could require it in directly (like i did for one router) but most were set up the traditional way where require was called higher upin the page and the variable was set into the .use method

#### to add a new page feature:

1. add its new location path to the server block

2. add the new page directory to public
  - page directory should include its own views, and router/routes folder along with all its logic and styles

*_wire up the page_*

3. add its server location path to use the publicDirectoryPath   

```
  app.use('/newpath',express.static(publicDirectoryPath));

  // if it uses additonal path values
  app.use('/newpath/:val1?',express.static(publicDirectoryPath));
```

4. set up the path to the views directory

```
  const newPath = path.join(__dirname,"../public/newpathjs/views");
```
- and add the view path to the set views method array   

```
  app.set('view engine', 'hbs');
  app.set('views', [previousViewsPath,  newPath]);
```

5. set up the path to its router file(s)

```
  const newPathRouter = require("../public/newpathjs/routers/newpath");

  app.use('/newpath',newPathRouter);
```

thats it.  
> that should be all the customization you have to do in the server.js file - everything else should be done in the new page's directory


#### setup any catchall routes

- a root redirect (optional)

```
  app.get('/', (req, res) => {
    res.redirect('/core');
  })

```

- a 404 page

```

  //catchall has to be last to work
  app.get('*', cors(corsOptions), (req, res) => {
    // res.send('my 404 page')
    if(display_console || true) console.log('[express server] rendering 404')
    res.render('404', {
      title:'404',
      errorMessage:'page not found'
    });

  });
```

#### start your server

```
  if(display_console || true) console.log("[prepping server] ... ");

  app.listen(PORT, () => {
    if(display_console || true) console.log(`Server is up on port ${PORT}.`);
    process_memory();
  })
```
