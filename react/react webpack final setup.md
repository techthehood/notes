# React Webpack Final Setup
### installs
```
npm i -D webpack
npm i -D webpack-cli
npm install worker-loader --save-dev
npm install --save-dev babel-loader @babel/core @babel/preset-env
npm install --save-dev @babel/plugin-transform-runtime
npm install --save-dev @babel/preset-react
npm install --save-dev @babel/plugin-proposal-class-properties
npm install css-loader style-loader --save-dev
npm install sass-loader node-sass --save-dev
npm install --save-dev mini-css-extract-plugin

npm install --save @babel/runtime
```
**omitted exports-loader && babel-cli ( @babel/cli )**

```
var path = require("path");
var webpack = require("webpack");
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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

  },//used to maintain access to CDN global variables
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
    new webpack.SourceMapDevToolPlugin(prodObj),
    new MiniCssExtractPlugin({
        filename: "bundle.css"
    })
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
      },
      {
          test: /\.s?[ac]ss$/,
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

package.json dependencies
```
  "devDependencies": {
    "@babel/core": "^7.2.0",
    "@babel/plugin-proposal-class-properties": "^7.2.1",
    "@babel/plugin-transform-runtime": "^7.2.0",
    "@babel/preset-env": "^7.2.0",
    "@babel/preset-react": "^7.0.0",
    "babel-cli": "^6.26.0",
    "babel-loader": "^8.0.4",
    "css-loader": "^2.0.1",
    "exports-loader": "^0.7.0",
    "mini-css-extract-plugin": "^0.5.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.16.4",
    "webpack-cli": "^3.1.0",
    "worker-loader": "^2.0.0"
  },
  "dependencies": {
    "@babel/runtime": "^7.2.0",
    "jquery": "^3.3.1",
    "jquery-mobile-babel-safe": "^1.4.5-1"
  }
```
