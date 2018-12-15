# adding react to webpack
adding react to webpack poses a problem because webpack has a tendency to rename variables during optimization.

### webpack using a CDN
[externals docs](https://webpack.js.org/configuration/externals/)   
[other hints](https://stackoverflow.com/questions/37656592/define-global-variable-with-webpack)   

add regular html script tag with cdn address the in webpack.config.js add
```
  module.exports = {
    //...
    externals: {
      jquery: 'jQuery'
    }
  };
```

### webpack using npm install

note: according to [this video](https://www.youtube.com/watch?v=IYuh8hIyvfE) if you add jquery through npm install into the node_modules folder you still need to import it and add the variables '$' && 'jQuery' to the webpack.config file in webPack
```
var webpack = require("webpack");

module.exports = {

  plugins:[
  new webpack.ProvidePlugin({
    $ : "jquery",
    jQuery : "jquery"
  })
]
}//module

```

[React CDN links](https://reactjs.org/docs/cdn-links.html)   
react recommends
```
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```
**i don't have the crossorigin attribute. it may work without it**

[joomla addScript](https://docs.joomla.org/Adding_JavaScript)   

my joomla test examples
```
  $scriptLoc = "https://unpkg.com/react@16/umd/react.production.min.js";
  $fileLink->addScript($scriptLoc);

  $scriptLoc = "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js";
  $fileLink->addScript($scriptLoc);

  // JHtml::_('script', 'com_example/example.min.js', array('version' => 'auto', 'relative' => true));

```
[attempt at adding attributes](https://www.w3tweaks.com/joomla/add-custom-attribute-in-joomla-3-x-addscript.html)   
**failed**
```
$fileLink->addScript($scriptLoc,array(), array('crossorigin' => 'true'));
```

[it doesn't seem like i need the cross origin attribute after all](https://stackoverflow.com/questions/18336789/purpose-of-the-crossorigin-attribute)   
>Normal script elements pass minimal information to the window.onerror for scripts which do not pass the standard CORS checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See CORS settings attributes for a more descriptive explanation of its valid arguments.

### add babel standalone
[babel standalone docs](https://babeljs.io/docs/en/next/babel-standalone.html)  
[babel standalone on github](https://github.com/babel/babel-standalone)   
[good babel explainer video](https://sunzao.us/beta/alight/arc#&ui-state=dialog)   

### add babel to webPack
[babel setup docs - select 'webpack' btn](https://babeljs.io/setup#installation)   
[babel webpack setup video](https://www.youtube.com/watch?v=iWUR04B42Hc)   
[a later watched video with presets in package.json](https://youtu.be/DhKKNYGFVi8)   
**doesn't cover react**
```
npm install --save-dev babel-loader @babel/core @babel/preset-env
```
**3 packages core loader and preset**
[module.rules vs module.loaders whats the diff?](https://stackoverflow.com/questions/43002099/rules-vs-loaders-in-webpack-whats-the-difference)   

### GOTCHA: ReferenceError: regeneratorRuntime is not defined
seems to be created by babel's failure to process async/await
**failed**
[plugin-transform-regenerator ](https://babeljs.io/docs/en/babel-plugin-transform-regenerator/#via-babelrc-recommended)   
[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill/)   
```
npm install --save-dev @babel/plugin-transform-regenerator
```
webpack.config.js
```
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/preset-env'],
          plugins: [
            ["@babel/plugin-transform-regenerator", {
              "asyncGenerators": false,
              "generators": false,
              "async": false
            }]
          ]
        }
      }
    ]
  }
```
.babelrc
```
  {
    "presets": ["@babel/preset-env"],
    "plugins": [
      ["@babel/plugin-transform-regenerator", {
        "asyncGenerators": true,
        "generators": true,
        "async": true
      }]]
  }
```
**failed**
**worked**
[this article is the answer](https://codingitwrong.com/2018/02/05/await-off-my-shoulders.html)   
[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime/)   
install scripts
```
  npm install --save-dev @babel/plugin-transform-runtime
  npm install --save @babel/runtime
```
**notice one is --save-dev the other is --save**

.babelrc
```
  {
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/plugin-transform-runtime", {"regenerator": true,}],
      ]
  }
```
**i later removed the .babelrc file, the presets & plugins in webpack.config**

webpack.config.js
```
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/preset-env'],
          plugins: [
            ["@babel/plugin-transform-runtime", {"regenerator": true,}],
          ],
        }
      }
    ]
  }
```
GOTCHA: initiall produced Errors
[Hint - Can't resolve '@babel/runtime/helpers/objectSpread' and '@babel/runtime/helpers/typeof'](https://github.com/babel/babel/issues/8730)   
**needed to install @babel/runtime**

GOTCHA: babel-loader unexpected token
[hint](https://stackoverflow.com/questions/33460420/babel-loader-jsx-syntaxerror-unexpected-token)   
[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)   
```
npm install --save-dev @babel/preset-react
```

add react to presets
webPack.config.js
```
query: {
  presets: ['@babel/preset-env','@babel/react'],
```

call module function to initiate react
details.js
```
  state.react_simple_details(evt,t_id,li_liteBoxFront_id,view_prefix,{state});
```

create react intit fn in target file
```
  export const react_simple_details = function(e,vID,lBH,pfx,sObj)
  {
    console.log("react_simple_details running");
    let state = sObj.state,
    lightbox_home = (document.getElementById(lBH)) ? document.getElementById(lBH) : document.getElementsByClassName(lBH)[0],
    targetElement = (document.getElementById(vID)) ? document.getElementById(vID) : document.getElementsByClassName(vID)[0],
    prefix = pfx,
    data_str = targetElement.dataset.info_json;

    let rsd_obj = JSON.parse(data_str);


  }//react_simple_details
```

test code (see if react is working)
details_react.js
```
  ...
    let lightbox_home = (document.getElementById(lBH)) ? document.getElementById(lBH) : document.getElementsByClassName(lBH)[0];
    let rsd_obj = JSON.parse(data_str);

    console.log("react component = ",React.Component);
    class Details extends React.Component {
         render() {
             return (<p>Hello world</p>);
         }
     }

    ReactDOM.render(
        <Details />,
        lightbox_home
    );

  ...
```

move component to external file (test)
display.js
```
  class Details extends React.Component {
      render() {
          return (<p>Hello world</p>);
      }
  }//Details

  export default Details;
```
GOTCHA: adding initial data to the component
**works**
[babel has a problem with class properties](https://stackoverflow.com/questions/43903632/why-wont-babel-transform-my-class-properties)   
```
npm install --save-dev @babel/plugin-proposal-class-properties
```
.babelrc
```
{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```
**works**

### my component easily accepts data
details_react.js
```
  console.log("details react running!");
  // import React from "React";
  // import ReactDOM from "ReactDOM";
  import Details from "./display";

  export const react_simple_details = function(e,vID,lBH,pfx,sObj)
  {
    console.log("react_simple_details running");
    let state = sObj.state,
    lightbox_home = (document.getElementById(lBH)) ? document.getElementById(lBH) : document.getElementsByClassName(lBH)[0],
    targetElement = (document.getElementById(vID)) ? document.getElementById(vID) : document.getElementsByClassName(vID)[0],
    prefix = pfx,
    data_str = targetElement.dataset.info_json;

    let data_obj = JSON.parse(data_str);

    console.log("react component = ",React.Component);
    // class Details extends React.Component {
    //     render() {
    //         return (<p>Hello world</p>);
    //     }
    // }

    ReactDOM.render(
        <Details data={data_obj} />,
        lightbox_home
    );

  }//react_simple_details

```

display.js
```

  export default class Details extends React.Component {

    componentDidMount = () => {
      console.log("details component is ready to roll!");
      console.log(`available data = ${this.props.data}`);
    }

      render() {
          return (<p>Hello world</p>);
      }
  }//Details

  // export default Details;

```

## Summary
```
npm install --save-dev babel-loader @babel/core @babel/preset-env
npm install --save-dev @babel/plugin-transform-runtime
npm install --save-dev @babel/preset-react
npm install --save-dev @babel/plugin-proposal-class-properties

npm install --save @babel/runtime
```
1. regular babel loader requirements
2. to help compile async/await
3. to interpret react/jsx
4. to interpret class properties like componentDidMount && constructor?

5. required helps #2 at runtime

final webpack.config.js
```
  var path = require("path");
  var webpack = require("webpack");
  var path = require('path');
  // console.log("process.env = ",process.env);
  // console.log("path = ",path.resolve(__dirname, './js/lib/upload.js'));
  // console.log("path2 = ",path.resolve(__dirname, 'js','lib','upload.js'));
  // console.log("path3 = ",path.resolve(__dirname, '/js','/lib','/upload.js'));
  // console.log("dirname = ",__dirname);
  //console.log("path test process.env.PATH = ",process.env.PATH);
  //var t_path = path.resolve(__dirname, './js/lib/upload.js');
  // const isProd = NODE_ENV === 'production';
  const isProd = process.env.npm_lifecycle_event === 'build';
  // const ifProd = x => isProd && x;// when using babel
  // const ifProd = function(x){return isProd && x;};
  const prodObj = isProd ? {
      // this is the url of our local sourcemap server
      //publicPath:  'http://localhost:80/joomla/components/com_arc/xfiles/js/dist/',
      //publicPath:  path.join(__dirname,'js','dist'),
      //append: '\n//# sourceMappingURL=https://localhost:80/[url]',
      filename: '[file].map'
  } : {};

  module.exports = {
    /*optimization: {
      minimize: false
    },//this doesn't seem to be doing anything anymore
    */
    /*externals: {
      jquery: 'jQuery'
      /*used to maintain access to CDN global variables*/
    },
    */
    devtool: isProd ? false : 'cheap-module-eval-source-map',
    plugins:[
      new webpack.ProvidePlugin({
        /*$ : "jquery",
        jQuery : "jquery",*/
        /*React : "React",
        ReactDOM : "ReactDOM",*/
        makeUp:path.join(__dirname,'js','lib','upload.js')/* this works */,
        test:path.join(__dirname,'js','lib','test.js')/* this works */,
        test2:path.join(__dirname,'js','lib','test2.js')/* this works */
      }),
      new webpack.SourceMapDevToolPlugin(prodObj)
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
            ],
          }
        }
      ]
    }
  }//module
```
