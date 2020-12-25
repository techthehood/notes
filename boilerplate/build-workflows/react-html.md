# react html

found in my version-control/react/react-scratch
index.html
```
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <!-- <script src="js/react.js"></script>
    <script src="js/react-dom.js"></script>
    <script src="js/babel.min.js"></script> -->
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <body>
      <div class="root">

      </div>
      <script type="text/babel" src="index.js"></script>
    </body>
  </html>
```
index.js
```
  import App from './App.js'
  // const App = require("./App.js");


  ReactDOM.render(
    <div>
      <App />
      <h1>Im rendering now!!</h1>
    </div>,
    document.querySelector(".root")
  )

```

offline version
```
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <!--
        manifest.json provides metadata used when your web app is added to the
        homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
      -->
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      <!--
        Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`.
      -->
      <title>React Scratch</title>
      <script src="js/react.js"></script>
      <script src="js/react-dom.js"></script>
      <script src="js/react-dom-server.js"></script>
      <script src="js/babel.min.js"></script>
      <script src="js/my_script.js"></script>
    </head>
    <body>

      <div id="root"></div>
      <!--
        This HTML file is a template.
        If you open it directly in the browser, you will see an empty page.

        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the <body> tag.

        To begin the development, run `npm start` or `yarn start`.
        To create a production bundle, use `npm run build` or `yarn build`.
      -->
      <h1>Hi im anything</h1>
      <script type="text/babel">
      //https://unpkg.com/babel-standalone@6/babel.min.js
      //console.log(ReactDom);
      console.log(React);
      console.log(ReactDOM);
        ReactDOM.render(<div>
          <h1>Hi im reacting3</h1>
          <p>with babel stand alone</p>
          </div>,document.getElementById('root'));
      </script>
    </body>
  </html>

```
**need to create script files in js folder**

#### start the server
```
  npx http-server -o \index.html
```

#### GOTCHA: Uncaught ReferenceError: require is not defined at <anonymous>:3:14 at zW (babel.min.js:1)

[babel-standalone not transpilling esm module](https://github.com/babel/babel/issues/9976)   
[You can provide custom options like this:](https://jsfiddle.net/0n8w6zh9/)
```
  <script src="https://unpkg.com/@babel/standalone@7.4.4/babel.js"></script>

  <!-- load AMD runtime to support transpiled modules -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>

  <script>
  // THIS PART DOESN'T WORK
      Babel.registerPreset("my-preset", {
        presets: [
          [Babel.availablePresets["es2015"], { "modules": false }]
        ],
        plugins: [
          [Babel.availablePlugins["transform-modules-amd"]]
        ],
        moduleId: "main"
      });
  </script>

  <script type="text/babel" data-presets="my-preset">
    import Foo from "./module.js";
    alert(Foo);
    export default 1;
  </script>


```
**Babel.registerPreset fails**

another member answered correctly
[For a working reactjs example see below.](https://glitch.com/edit/#!/example-es-modules-with-babel)  
**this one works**
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
    <script type="text/babel" src="./app.js" data-presets="my-preset"></script>
    <script type="text/babel" src="./index.js" data-presets="my-preset"></script>
```
**this person put all their scripts in the head section**
**and their babel standalone was above the react scripts**

```
  <script src="https://unpkg.com/@babel/standalone@7.4.4/babel.js"></script>  
```
