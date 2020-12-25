# Mobx sample webpack config

webpack.config.js
```
  var path = require("path");
  var webpack = require("webpack");
  var path = require('path');
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    externals: {
      /*@ comment out externals for/to create DynamicCdnWebpackPlugin scripts in ./dist/index.html file */
      /*jquery: 'jQuery'*/
      'react': 'React',
      'react-dom':'ReactDOM',
      'mobx':'mobx',
      'axios':'axios'
    },//used to maintain access to CDN global variables
    output: {
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname,'js','dist'),
        publicPath: 'updraftjs/js/dist/'
    },
    devtool: isProd ? false : 'cheap-module-eval-source-map',
    plugins:[
      /*new BundleAnalyzerPlugin(),*/
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
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
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
