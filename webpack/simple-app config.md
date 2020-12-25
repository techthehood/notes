# simple react app webpack sample
there are a few slight modifications to the original
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
