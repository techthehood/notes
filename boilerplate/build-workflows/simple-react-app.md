# simple react app

getting started
```
  npx simple-react-app appName
```

to start
```
  npm start
```
runs a webpack-dev-server & react-router


#### if you want to create a express server rename the src folder to public and update the webpack.config file
**then create a new src folder**

webpack lets you change the dev-server port number
```
  devServer: {
    host: 'localhost',
    port: '5000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
```
#### GOTCHA: useRef is not a funtion. react version may be old 16.7
```
  npm update react react-dom
```
#i changed this line to help webpack test js as well as jsx
```
  module: {
    rules: [
      {
        test: /\.js(x*)?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },

      // previously
      test: /\.jsx?$/,
```
**i put the x in brackets with an asterisk (x*) (idk if this is corrent but it seems to be working)**
> used when i changed App.jsx to App.js


to run as a server i had to make some changes to the package.json file & the webpack.config.js file

package.json
```
add to scripts

"start":"nodemon src/server.js",
"dev": "webpack --mode development ./public/index.jsx --output ./public/dist/bundle.js",
```


to build my files
```
  npm run dev
```

to start my server
```
  npm run start
```
**uses nodemon to hot reload**


webpack.config
```
  modify plugins at the end to look like this

  plugins:[HTMLWebpackPluginConfig, DefinePluginConfig],
```
change output
```
  // from
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build'),
  },

  // to

  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/public/dist'),
  },

```
**may want to change public to src if you are adding a new app route to a servers public dir**

also move the index.html file to the views file and change the html to you view engine .ext

#### update your bundle.js script path
example
```
  <script type="text/javascript" src="bundle.js"></script></body>

  to

  <script type="text/javascript" src="../src/dist/bundle.js"></script></body>
```

remove unnecessary entry array properties
```
'whatwg-fetch', 'react-hot-loader/patch',
```

remove the dev server property
```
devServer: {
  host: 'localhost',
  port: '5000',
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  historyApiFallback: true,
},
```

i also added watch to the config
```
  watch: true,
  watchOptions: {
    ignored: ['files/**/*.js', 'node_modules/**']
  },
```
**to watch you will need a separate terminal to run start and run dev**


finished webpack.config sample
```
  const path = require('path');
  const webpack = require('webpack');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  const dev = process.env.NODE_ENV !== 'production';

  const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: path.join(__dirname, '/public/index.html'),
    filename: 'index.html',
    inject: 'body',
  });

  const DefinePluginConfig = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  });

  module.exports = {
    devServer: {
      host: 'localhost',
      port: '5000',
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
    },
    entry: ['@babel/polyfill', path.join(__dirname, '/public/index.jsx')],
    module: {
      rules: [
        {
          test: /\.js(x*)?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader'],
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      filename: 'index.js',
      path: path.join(__dirname, '/public/dist'),
    },
    mode: dev ? 'development' : 'production',
    plugins:[HTMLWebpackPluginConfig, DefinePluginConfig],
    watch: true,
    watchOptions: {
      ignored: ['files/**/*.js', 'node_modules/**']
    },
  };

```
#### to use this inside an existing server with its own public file
disregard the server setup
add a folder to the servers public file
change public here in the webpack config to js

change the template path in HTMLWebpackPluginConfig from public/index.html to views/index.html
add a views folder and add index.html to the new views folder

if using a view engine:
add a path to the views folder in the server file (hbs views)

**simple-react-app doesn't come with its own express server you still have to make one**

#### for forms install react-hook-form
```
  npm i react-hook-form
```

#### sample express server
```

```

i set up a paths folder
paths/index.js
```
  export const HOME_PATH = '/projects/track/';
  export const ABOUT_PATH = '/projects/track/about/';
```

so i could use one place to modify paths
```
import {HOME_PATH, ABOUT_PATH} from './paths';

const Routes = () => (
  <Switch>
    <Route exact path={HOME_PATH} component={Home} />
    <Route path={ABOUT_PATH} component={About} />
  </Switch>
);
```

#### GOTCHA: [Dynamic script catchall](https://www.kirupa.com/html5/loading_script_files_dynamically.htm)   
unexpected routes made my js file unreachable, which made the 404 page which depended on it useless
```
  <body>
    <script>
      // DYNAMICALLY LOADED SCRIPT FOR UNEXPECTED ROUTES
      let myScript = document.createElement("script");
      myScript.setAttribute("src", `${location.origin}/projects/track/src/dist/bundle.js`);
      document.body.appendChild(myScript);
    </script>
  </body>
```
