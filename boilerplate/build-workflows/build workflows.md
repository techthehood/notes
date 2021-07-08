# build workflow

## development server research notes

#### npm vs npx

#### create-react-app

[react scripts](https://www.npmjs.com/package/react-scripts)   

>This package includes scripts and configuration used buy create react app

[create react app getting started](https://facebook.github.io/create-react-app/docs/getting-started)   
[What exactly is the 'react-scripts start' command?](https://stackoverflow.com/questions/50722133/what-exactly-is-the-react-scripts-start-command)   

>create-react-app and react-scripts

>react-scripts is a set of scripts from the create-react-app starter pack. create-react-app helps you kick off projects without configuring, so you do not have to setup your project by yourself.

>react-scripts start sets up the development environment and starts a server, as well as hot module reloading. >You can read here to see what everything it does for you.

**npm start run the create-react-app server**

```
  cd navTo/dir
  npm start
```

#### nodemon

>i created an alias that runs nodemon and calls the server   

```
$ alias src='nodemon src/index.js'

$ src
```


#### webpack-dev-server   

[What are the benefits of webpack and hot-reload on node server vs babel, npm, and nodemon](https://hashnode.com/post/what-are-the-benefits-of-webpack-and-hot-reload-on-node-server-vs-babel-npm-and-nodemon-cj9woomkm00g1jswt62i2wme1)   

>Generally, your front-end should be managed by webpack which will use babel and npm. Webpack will provide hot-reload, which means your browser will load in new code while developing (not in production). Nodemon should still be used in dev to "hot-reload" your backend code.


#### [Add react to a website](https://reactjs.org/docs/add-react-to-a-website.html)   

> this version works as long as you aren't using import to add your react files
> in the example the author uses one .js file to do everything (all loaded with a script tag)   

> see react cdn from scratch to load a real react component from cdn with babel and imports

Development scripts

```
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

Production scripts

```
  <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```
**adding JSX**

The quickest way to try JSX in your project is to add this <script> tag to your page:

```
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Now you can use JSX in any <script> tag by adding type="text/babel" attribute to it. Here is an example HTML file with JSX that you can download and play with.

**i added this script to the body instead of the js nested in the script tag.**

```
	<script type="text/babel" src="index.js"></script>
```

#### run the webpage without creating a server   

[http-server: a command-line http server (npm docs)](https://www.npmjs.com/package/http-server)   
[http-party/http-server (github home)](https://github.com/http-party/http-server#readme)   

```
  npx http-server -o index.html

```

> -o is open in the browser

change the port with -p

```
 npx http-server -o -p 3000
```

my server example

```
  npx http-server -o \index.html
```
