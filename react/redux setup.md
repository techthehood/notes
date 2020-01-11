# Redux setup templates

## Contents
  - <a href="#keyHead">key head (vendor) scripts</a>
  - Create a separate module
  - initial react app
  - setup the react components
  - Webpack setup with scss loading and DynamicCdnWebpackPlugin
  - package.json dependencies
  - npm scripts
  - full webpack
  - Add redux provider, store, reducers and middleware
  - a sample combineReducers template
  - sample generic reducer
  - set up actions types
  - actions index
  - Sample initial app
  - Add redux to the component
  - map state to props
  - redux form and field
  **reduxForm notes are incomplete in these notes.**
  - <a href="#crossError">GOTCA: crossorigin error</a>

#### [key head (vendor) scripts](#keyHead)
```
  <script type="text/javascript" src="https://unpkg.com/redux@4.0.4/dist/redux.js"></script>
  <script type="text/javascript" src="https://unpkg.com/redux-thunk@2.3.0/dist/redux-thunk.js"></script>
  <script type="text/javascript" src="https://unpkg.com/react@16.12.0/umd/react.development.js"></script>
  <script type="text/javascript" src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.development.js"></script>
  <script type="text/javascript" src="https://unpkg.com/react-redux@7.1.3/dist/react-redux.js"></script>
  <script type="text/javascript" src="https://unpkg.com/react-lifecycles-compat@3.0.4/react-lifecycles-compat.js"></script>
  <script type="text/javascript" src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>
```

also may need object assign
```
  <script type="text/javascript" src="https://unpkg.com/@umds/object-assign@4.1.1-beta.24/object-assign.js" defer ></script>
```
> im not sure what needs or produces object assign

#### Create a separate module
only modules can import so i had to run a function that called the module that could import react
```
  const {get_pp_contents} = require('./ppContents');

  get_pp_contents();
```

#### initial react app
setup the initial react app in the first function called
```
  import ReactDOM from "react-dom";
  import { createStore, applyMiddleware } from 'redux';
  import { Provider } from 'react-redux';
  import reduxThunk from 'redux-thunk';

  import Guest from "./guest.js";
  import Profile from "./profile.js";

  export const get_pp_contents = () => {

      let react_display;

      const jwtToken = localStorage.getItem('JWT_TOKEN');
      console.log("[jwtToken]", jwtToken);

      if(typeof jwtToken != "undefined" && jwtToken != null){
        axios.defaults.headers.common['Authorization'] = jwtToken;
        react_display = (
          <Profile />
        );

        // http://localhost:3000/auth/signup
        // http://localhost:3000/auth/signin
      }else{
        react_display = (
          <Guest />
        );
      }//else



      // pp_content_cont
      ReactDOM.render(
          react_display,
          document.querySelector(".pp_content_cont")
      );

  }// get_pp_contents
```

#### setup the react components
```
  import React, { Component} from "react";
  import {reduxForm, Field} from 'redux-form'
  import { connect } from 'react-redux';
  import { compose } from 'redux';

  class Profile extends Component{
    constructor(props){
      super(props);
    }

    render(){
      return <h1>Hi im profile</h1>;
    }
  }// class Profile


  export default Profile;
```

#### Webpack setup with scss loading and DynamicCdnWebpackPlugin
```
  var path = require("path");
  var webpack = require("webpack");
  var path = require('path');
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

  const isProd = process.env.npm_lifecycle_event === 'build';

  const prodObj = isProd ? {
      filename: '[file].map'
  } : {};

  module.exports = {
    output: {
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname,'js','dist'),
        publicPath: '/js/dist/'
    },
    devtool: isProd ? false : 'cheap-module-eval-source-map',
    plugins:[
      /*new BundleAnalyzerPlugin(),*/
      /* i can require my node_modules here and i won't have to require them all over my codebase*/
      new webpack.ProvidePlugin({
        makeUp:path.join(__dirname,'js','lib','upload.js')/* this works */,
        test:path.join(__dirname,'js','lib','test.js')/* this works */,
        test2:path.join(__dirname,'js','lib','test2.js')/* this works */
      }),
      new webpack.SourceMapDevToolPlugin(prodObj),
      new MiniCssExtractPlugin({
          filename: "bundle.css"
      }),
      /*creates a generic index.html file with my cdn script tags so i can copy/paste into my html file*/
      new HtmlWebpackPlugin(),
      /*this creates cdn script tags that i can add to my index.html - saves me from having to add pkgs to my bundle*/
      new DynamicCdnWebpackPlugin()/*the diff between 5.34 MiB and 2.64 MiB*/
    ],
    module: {
      rules: [
        { test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ['@babel/preset-env','@babel/react'],
            plugins: [
              ["@babel/plugin-transform-runtime", {"regenerator": true,}],
              ["@babel/plugin-proposal-class-properties"],
              ["@babel/plugin-syntax-dynamic-import"],
            ],
          }
        },
        {
            test: /\.(s*)?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: { url: false, sourceMap: true } },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true }
                }
            ],
        }
      ]
    }
  }//module

```

#### package.json dependencies
im not sure if these are actually needed at all but its good to have to initiate just in case before using the dynamic cdn webpack plugin
```
  "dependencies": {
    "@babel/runtime": "^7.2.0",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-redux": "^7.1.0",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.1.1",
    "redux": "^4.0.4",
    "redux-form": "^8.2.6",
    "redux-thunk": "^2.3.0"
  },
```

#### npm scripts
```
  npm init -y

  npm install

```

use npm install after pasting dev dependencies from the package.json sample   

```
"devDependencies": {
  "@babel/core": "^7.2.0",
  "@babel/plugin-proposal-class-properties": "^7.2.1",
  "@babel/plugin-syntax-dynamic-import": "^7.2.0",
  "@babel/plugin-transform-runtime": "^7.2.0",
  "@babel/preset-env": "^7.2.0",
  "@babel/preset-react": "^7.0.0",
  "babel-cli": "^6.26.0",
  "babel-loader": "^8.0.4",
  "css-loader": "^2.0.1",
  "dynamic-cdn-webpack-plugin": "^4.0.0",
  "exports-loader": "^0.7.0",
  "html-webpack-plugin": "^3.2.0",
  "mini-css-extract-plugin": "^0.5.0",
  "module-to-cdn": "^3.1.5",
  "node-sass": "^4.11.0",
  "sass-loader": "^7.1.0",
  "style-loader": "^0.23.1",
  "webpack": "^4.16.4",
  "webpack-bundle-analyzer": "^3.3.2",
  "webpack-cli": "^3.1.0",
  "worker-loader": "^2.0.0"
},
```

will also need to paste the dev and build in the scripts

```
  "dev": "webpack --mode development ./js/app.js --output ./js/dist/bundle.js",
  "build": "webpack --mode production ./js/app.js --output ./js/dist/bundle.js"
```


#### full webpack
**has needed dev dependencies**
```
  {
    "name": "profile-panel",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "webpack --mode development ./js/app.js --output ./js/dist/bundle.js",
      "build": "webpack --mode production ./js/app.js --output ./js/dist/bundle.js"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "@babel/core": "^7.2.0",
      "@babel/plugin-proposal-class-properties": "^7.2.1",
      "@babel/plugin-syntax-dynamic-import": "^7.2.0",
      "@babel/plugin-transform-runtime": "^7.2.0",
      "@babel/preset-env": "^7.2.0",
      "@babel/preset-react": "^7.0.0",
      "babel-cli": "^6.26.0",
      "babel-loader": "^8.0.4",
      "css-loader": "^2.0.1",
      "dynamic-cdn-webpack-plugin": "^4.0.0",
      "exports-loader": "^0.7.0",
      "html-webpack-plugin": "^3.2.0",
      "mini-css-extract-plugin": "^0.5.0",
      "module-to-cdn": "^3.1.5",
      "node-sass": "^4.11.0",
      "sass-loader": "^7.1.0",
      "style-loader": "^0.23.1",
      "webpack": "^4.16.4",
      "webpack-bundle-analyzer": "^3.3.2",
      "webpack-cli": "^3.1.0",
      "worker-loader": "^2.0.0"
    },
    "comments": {
      "dynamic_dependencies": {
        "@babel/runtime": "^7.2.0",
        "react": "^16.9.0",
        "react-dom": "^16.9.0",
        "react-redux": "^7.1.0",
        "react-router-dom": "^5.0.1",
        "react-scripts": "3.1.1",
        "redux": "^4.0.4",
        "redux-form": "^8.2.6",
        "redux-thunk": "^2.3.0"
      }
    }
  }

```
#### Add redux provider, store, reducers and middleware
```

```


**React can read an index file from a folder and auto load it without specifying the filename**

reducers are specific actions taken to alter the state
similar actions of the same category are kept together in the same reducer and applied through a switch statement

#### a sample combineReducers template
reducers/index.js
```
  import { combineReducers } from 'redux';
  // import { reducer as formReducer } from 'redux-form';

  // import authReducer from './auth';
  // import dashboardReducer from './dashboard';

  export default combineReducers({
    // form: formReducer,
    // auth: authReducer,
    // dash: dashboardReducer
  });
```

import the combineReducers in app.js
```
  import reducers from "./reducers/";
```

#### sample generic reducer
**is added to the combined reducer**
```
  import { AUTH_SIGN_UP } from '../actions/types';

  const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: ''
  }

  export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case AUTH_SIGN_UP:
          console.log('[AuthReducer] got an AUTH_SIGN_UP action!');
          return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
        break;

      default:

    }
    return state;
  }
```

#### set up actions types
actions/types.js
```
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
// export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
```
> this is kind of redundant code because you end up creating variables of strings with the same name - i believe this is effective because it will alert you to typos immediately wherease typos within strings fail silently

#### actions index

actions/index.js
```
  import axios from 'axios';
  import { AUTH_SIGN_UP } from './types';
  // console.log("[host]",location.host);

  // ActionCreators
  console.log("[actions] index.js");


  export const signIn = (data) => {
    return async (dispatch) => {
      /*
      Step 1: Use the data to make HTTP requrest to our Backend and send it along [x]
      Step 2: Take the Backend's response (jwtToken is here now!) [x]
      Step 3: Dispatch user just signed up (with jwtToken) [x]
      Step 4: save the jwtToken into our localStorage [x]
      */

      try {
        console.log('[ActionCreator] signIn called!');
        // const res = await axios.post('http://localhost:3000/api/auth/signup', data);
        const res = await axios.post(`${location.origin}/api/auth/signin`, data);

        console.log("[axios res]",res);

        console.log('[ActionCreator] signIn dispatched an action!');
        dispatch({
          type: AUTH_SIGN_IN,
          payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;

      } catch (err) {
        dispatch({
          type: AUTH_ERRORS,
          payload: 'Email and password combination isn\'t valid'
        })
      }

    }
  }// signIn
```
**redux-thunk allows us to create actions that don't just return type and payload. but can also contain a function where we
can process and prepare the data before we dispatch it to the reducer.**

same action without redux thunk
```
    const signIn = (data) => {
      return {
        type: 'AUTH_SIGN_IN',
        payload: data
      }
    }
```


#### Sample initial app
```
  import ReactDOM from "react-dom";
  import { createStore, applyMiddleware } from 'redux';
  import { Provider } from 'react-redux';
  import reduxThunk from 'redux-thunk';

  import Guest from "./guest.js";
  import Profile from "./profile.js";

  export const get_pp_contents = () => {

      let react_display;

      const jwtToken = localStorage.getItem('JWT_TOKEN');
      console.log("[jwtToken]", jwtToken);

      if(typeof jwtToken != "undefined" && jwtToken != null){
        axios.defaults.headers.common['Authorization'] = jwtToken;
        react_display = (
          <Profile />
        );

        // http://localhost:3000/auth/signup
        // http://localhost:3000/auth/signin
      }else{
        react_display = (
          <Guest />
        );
      }//else



      // pp_content_cont
      ReactDOM.render(
          /*<Provider store={createStore(reducers, {})}>*/
          <Provider store={createStore(reducers, {
            auth: {
              token: jwtToken,
              isAuthenticated: jwtToken ? true : false
             }
          }, applyMiddleware(reduxThunk))}>
          {react_display}
          </Provider>,
          document.querySelector(".pp_content_cont")
      );

  }// get_pp_contents

```

### Add redux to the component

#### map state to props
```

```
**map the state of the redux store to the components props so we can call an item like state.item using props.item or even state.auth.item as props.item**

for example:
```
  import React, {Component} from 'react';
  import { connect } from 'react-redux';
  import * as actions from '../actions';

  class Dashboard extends Component {

    async componentDidMount(){
      await this.props.getSecret();
    }

    render(){
      return (
        <div>
          This is a Dashboard
          <br />
          Our secret: <h3>{this.props.secret}</h3>
        </div>
      )
    }
  }// Component

  function mapStateToProps(state){
    return {
      secret: state.dash.secret
    }
  }

  export default connect(mapStateToProps, actions)(Dashboard);
```
**notice the syntax uses return {prop_entry: state.reducer.entry}**
state is added to the mapStateToProps function through/from redux

actions in the actions/index.js file are all exported separately using
```
  export const actionName = () => { }
```

i can import them all into a single object using
```
  import * as actions from '../actions';
```

Omit state to props and just add actions
```
  connect(null, actions)
```

#### using actions in props
```
  async componentDidMount(){
    await this.props.useAction();
    await this.props.signIn(data)
  }
```

#### redux form and field
**reduxForm notes are incomplete in these notes.**
```
  import {reduxForm, Field} from 'redux-form'
  import { connect } from 'react-redux';
  import { compose } from 'redux';

  ....
  // component class
  ...

    export default compose(
    /*connect(null, actions),*/
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
    )(SignUp)
```
compose is needed to add both connect (redux state and actions) and reduxForm to the component
**reduxForm notes are incomplete in these notes.**

#### [GOTCA: crossorigin error](https://reactjs.org/docs/cross-origin-errors.html)
[GOTCHA: cross origin error](#crossError)   
```
  <script type="text/javascript" crossorigin src="https://unpkg.com/redux@4.0.4/dist/redux.js"></script>
```
i had to add 'crossorigin' to the script tags

#### [adding an error boundary component](https://reactjs.org/docs/error-boundaries.html)   
```
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      logErrorToMyService(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }

```
#### [GOTCHA: I'm getting an invalid react hook call ](https://reactjs.org/warnings/invalid-hook-call-warning.html)
my partials were loading 2 different sets/versions of react 16.10.1 & 16.12.0
i had to comment out one set
