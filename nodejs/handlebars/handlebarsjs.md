# Handlebars

[handlebars npm docs](https://www.npmjs.com/package/handlebars)   
[hbs - handlebars for express](https://www.npmjs.com/package/hbs)   

```
  npm i hbs
```

app.js
**diff**
```
  app.set('view engine', 'hbs');//<< added view engine
  //set up a views dir with ext '.hbs'  index.hbs or about.hbs


  //for these to work you have to get rid of public version of index.html
  app.get('', (req, res) => {
    // res.send('Hello express!')
    res.render('index', {
      title:'Weather',
      name: 'Andrew Mead'
    })
  })

  // GOTCHA: remember to remove about.html
  app.get('/about', (req, res) => {
    // res.send('Hello express!')
    res.render('about', {
      title:'About Me',
      name: 'Andrew Mead'
    })
  })

  // GOTCHA: remember to remove help.html
  app.get('/help', (req, res) => {
    // res.send('Hello express!')
    res.render('help', {
      title:'Help',
      help_txt: 'Some help message'
    })
  })
```

>//>> also notice res.render() instead of res.send()

### Controlling handlebars view location

```
  const hbs = require('hbs');


  const viewsPath = path.join(__dirname,"../templates/views");
  const pushPath = path.join(__dirname,"../public/push/view");

  //setup handlebars engine and views location
  app.set('view engine', 'hbs');
  app.set('views', [viewsPath, pushPath]);//this works

  // set up the partials path
  const partialsPath = path.join(__dirname,"../templates/partials");
  hbs.registerPartials(partialsPath);


  // path to public directory - where to find external files
  //setup static directory to serve - server default/root
  // this along with the nginx server blocks directs paths to specific 'public' site directories
  const publicDirectoryPath = path.join(__dirname,"../public");
  app.use('/req',express.static(publicDirectoryPath));
```

express uses a views folder in the site root by default -(site root is the directory package.json is in)
to redirect the views to any other location you can use \__dirname with the the path package

> continue this

#### adding a helper function
```
  hbs.registerHelper('json', function(context) {
      let data_str = JSON.stringify(context);
      return JSON.stringify(data_str);
  });
```

#### all these fail
[Handlebars.js parse object instead of [Object object]](https://stackoverflow.com/questions/10232574/handlebars-js-parse-object-instead-of-object-object)   
```
      // window['DATA_ONLY'] = {data};//single bracket - not hbs syntax
      //
    	// window['SINGLE_BRACKET'] = {data};//single bracket - not hbs syntax

      // window['DOUBLE_BRACKET'] = {{data}};//single bracket [object Object]
      //
      // window['TRIPPLE_BRACKET'] = {{{data}}};//single bracket  [object Object]
```

```
  server:
    res.render('alight', {
      title:'push tester',
      name: 'your pusher',
      use_local_files: keys.use_local_files,
      data:{data}
    });// render

  client:
    window['HOST_DATA'] = {{{data.data}}};//[object Object]
```
> for data.data to work the .data property type would have to be a string
