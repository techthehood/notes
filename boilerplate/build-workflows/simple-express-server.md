

#### [setup a simple express server](https://expressjs.com/en/starter/hello-world.html)
```
  const express = require('express')
  const app = express()
  const port = 3000

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

[use an express generator](https://expressjs.com/en/starter/generator.html)   
```
  $ npx express-generator
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

### [Handlebars](https://www.npmjs.com/package/hbs)   
if you want to use handlebars as the view engine
install hbs
```
  npm i hbs
```

#### change the view engine to hbs
```
  const hbs = require('hbs');

  ...

  app.set('view engine', 'hbs');

```

#### use html instead of hbs
```
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
```

#### set the views in an array
```
 // default
 app.set('views', path.join(__dirname, 'views'));

 // upgraded
 const businessPath = path.join(__dirname,"public/business/views");

 app.set('views', [viewsPath, appsPath, alightPath, oauthClientPath, businessPath, updraftPath, rocketPath]);//this works
```

#### set public path directory for each route
```
  const publicDirectoryPath = path.join(__dirname,"public");

  // set the public path for the link and script urls found in the views directories
  app.use('/',express.static(publicDirectoryPath));
  app.use('/core',express.static(publicDirectoryPath));
```
**be careful to know if you need "../public" or just "public"**

#### GOTCHA: basePath **important**
- there really is no way to set a basePath in the server for all routes to use (haven't found in my reserach)
- you can route the basePath to a route file that can use express Router to redirect all other paths to where you want them to go.
> in essence just move the other paths out of the server file to a router file

there may not be an error view in you views folder and if there is and you aren't familiar with jade you still don't have one

write a new error view using hbs
```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="icon" href="/img/sunzao.png">
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <div class="main-content">
      <h1>{{title}}</h1>
      <p>{{errorMessage}}</p>
    </div>
  </body>
</html>

```

server error mods
app.js
```
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.locals.error= req.app.get('env') === 'development' ? err : {};// change for hbs

    // render the error page
    res.status(err.status || 500);
    res.render('error',{
      errorMessage: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
  });
```

i added my own 404 path to catch everything else
```
  app.get('*', (req, res) => {
    // res.send('my 404 page')
    console.log('[express server] rendering 404')
    res.render('404', {
      title:'404',
      errorMessage:'page not found'
    });

  });
```
