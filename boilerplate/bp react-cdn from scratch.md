# react cdn from scratch

start server with:
```
  npx http-server -o index.html
```
**this doesn't always actually open the browser**
**- i still had to manually goto the browser address http://127.0.0.1:8080/**

## 2 methods:
- cdns only (index.html) **works**
- local files (index.html2) **works**

### for the standalone with cdns only:

#### GOTCHA: [babel-standalone not transpilling esm module](https://github.com/babel/babel/issues/9976)   
**error: Uncaught ReferenceError: require is not defined**
[example es modules with bable](https://glitch.com/edit/#!/example-es-modules-with-babel?path=index.html%3A1%3A0)   
the glitch working example
```
  <!DOCTYPE html>
<html lang="en">
  <head>
    <title>example-es-modules-with-babel</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- import the webpage's stylesheet -->
    <link rel="stylesheet" href="/style.css">


    <script src="https://unpkg.com/@babel/standalone@7.4.4/babel.js"></script>    
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>  
    <script>
      Babel.registerPreset("my-preset", {
        presets: [
          [Babel.availablePresets["es2017"], { modules: false }],
          [Babel.availablePresets["react"]]

        ],
        plugins: [
          [Babel.availablePlugins["transform-modules-umd"]]
        ]        
      });
    </script>
    <script type="text/babel" src="./app.js" data-presets="my-preset"></script>
    <!-- <script type="text/babel" src="./App.js" data-presets="my-preset"></script> -->
    <script type="text/babel" src="./index.js" data-presets="my-preset"></script>

  </head>  
  <body>
    <p>Output should appear below.</p>
    <hr/>
    <div id="root"></div>
  </body>
</html>
```
emphasis on this babel config script tag
```
  <script>
    Babel.registerPreset("my-preset", {
      presets: [
        [Babel.availablePresets["es2017"], { modules: false }],
        [Babel.availablePresets["react"]]

      ],
      plugins: [
        [Babel.availablePlugins["transform-modules-umd"]]
      ]        
    });
  </script>
```


#### GOTCHA: dont forget: data-presets="my-preset"
```
  <script type="text/babel" src="App.js" data-presets="my-preset"></script>
  <script type="text/babel" src="index.js" data-presets="my-preset"></script>
```
**also for this method to work App.js has to also be added to the script tag (its possible all scripts are going to have to be added the long way - there really isn't a bundler so maybe thats why import alone isn't working.  however i think import works using local files instead of the cdn files)**
