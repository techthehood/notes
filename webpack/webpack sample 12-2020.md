# webpack sample 12-2020

webpack.config.js
```
var path = require("path");
var webpack = require("webpack");
var path = require('path');
const dotenv = require('dotenv');
dotenv.config();// .env has to be in the site root to work
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
// console.log("process.env = ",process.env);
// console.log("path = ",path.resolve(__dirname, './js/lib/upload.js'));
// console.log("path2 = ",path.resolve(__dirname, 'js','lib','upload.js'));
// console.log("path3 = ",path.resolve(__dirname, '/js','/lib','/upload.js'));
// console.log("dirname = ",__dirname);
//console.log("path test process.env.PATH = ",process.env.PATH);
//var t_path = path.resolve(__dirname, './js/lib/upload.js');
// const isProd = NODE_ENV === 'production';
const isProd = process.env.npm_lifecycle_event === 'build';// this has to do with which package.json script is run (dev or build)
// const ifProd = x => isProd && x;// when using babel
// const ifProd = function(x){return isProd && x;};
const prodObj = isProd ? {
    filename: '[file].map'
} : {};

// const isOffline = process.env.OFFLINE;// LATER: get .env file to work with webpack
const isOffline = true;
console.log(`[Offline]`,isOffline);

module.exports = {
  /*optimization: {
    minimize: false
  },//this doesn't seem to be doing anything anymore
  */
  /*
  IMPORTANT!! if the module uses require, it will throw an error. you will have to make it a regular dependency
  or maybe try using require not import to use them - nope, i had to do the above
  */
  externals: {
    /* @ comment out externals for/to create DynamicCdnWebpackPlugin scripts in ./dist/index.html file */
    'react': 'React',
    'react-dom':'ReactDOM',
    'mobx':'mobx',
    'axios':'axios',
    'tinycolor':'tinycolor',
    'validator':'validator',
    // 'color':'Color',
    // 'draft-js':'draft-js',
    /*'react-hook-form':'react-hook-form'/*'ReactHookForm'*/
    // jquery: 'jQuery'
  },//used to maintain access to CDN global variables
  // optimization:{
  //   splitChunks:{chunks:'all'}
  // },
  optimization: {
      splitChunks: {
            cacheGroups: {
              commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendor',
                  chunks: 'all'
              },
              styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true,
              },
          }
      }
  },
  output: {
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname,'js','dist'),
      publicPath: 'alight/xfiles/js/dist/'
  },
  watch: true,
  watchOptions: {
    ignored: ['files/**/*.js', 'node_modules/**']
  },
  devtool: isProd ? false : 'cheap-module-eval-source-map',
  plugins:[
    new BundleAnalyzerPlugin(),
    /* i can require my node_modules here and i won't have to require them all over my codebase*/
    new webpack.ProvidePlugin({
      /*$ : "jquery",
      jQuery : "jquery",*/
      /*React : "react",
      ReactDOM : "react-dom",
      axios: "axios",
      mongoose: "mongoose",*/
      makeUp:path.join(__dirname,'js','lib','upload.js')/* this works */,
      test:path.join(__dirname,'js','lib','test.js')/* this works */,
      test2:path.join(__dirname,'js','lib','test2.js')/* this works */
    }),
    new webpack.SourceMapDevToolPlugin(prodObj),
    new MiniCssExtractPlugin({
        filename: "bundle.css",
        chunkFilename: '[name].chunk.css',
    }),
    /*creates a generic index.html file with my cdn script tags so i can copy/paste into my html file*/
    new HtmlWebpackPlugin({chunksSortMode:"none"}),
    /*this creates cdn script tags that i can add to my index.html - saves me from having to add pkgs to my bundle*/
    // new DynamicCdnWebpackPlugin()/*the diff between 5.34 MiB and 2.64 MiB*/
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
            ["@babel/plugin-proposal-decorators", { "legacy": true }],/*needed for mobx - see mobx notes*/
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
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
                options: { url: false, sourceMap: true }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true }
              }/*[sass-loader failing](https://github.com/sass/node-sass/releases/tag/v4.13.1)*/
          ],
      }
    ]
  }
}//module.exports


// module.export = {
//   optimization: {
//     minimize: false
//   },
//   devtool: 'cheap-module-eval-source-map',
//   module: {
//     rules: [{
//       test: require.resolve('./js/lib/upload.js'),
//       use: [{
//         loader: 'expose-loader',
//         options: 'makeContact'
//       }]
//     }]
//   }/*end module*/
// }//module
```
