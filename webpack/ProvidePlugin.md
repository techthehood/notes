# Understanding webpack ProvidePlugin


[Webpack ProvidePlugin vs externals?](https://stackoverflow.com/questions/23305599/webpack-provideplugin-vs-externals)   
```
  Example without ProvidePlugin:

  // You need to require underscore before you can use it
  var _ = require("underscore");
  _.size(...);


  Example with ProvidePlugin:

  plugins: [
    new webpack.ProvidePlugin({
      "_": "underscore"
    })
  ]

  // If you use "_", underscore is automatically required
  _.size(...)
```

#### My webpack sample
```
  plugins:[
    /*new BundleAnalyzerPlugin(),*/
    new webpack.ProvidePlugin({
      /*$ : "jquery",
      jQuery : "jquery",*/
      /*React : "React",
      ReactDOM : "ReactDOM",*/
      React : "react",
      ReactDOM : "react-dom",
      makeUp:path.join(__dirname,'js','lib','upload.js')/* this works */,
      test:path.join(__dirname,'js','lib','test.js')/* this works */,
      test2:path.join(__dirname,'js','lib','test2.js')/* this works */
    }),
    new webpack.SourceMapDevToolPlugin(prodObj),
    new MiniCssExtractPlugin({
        filename: "bundle.css"
    })
  ],
```
**Notice the variables are on the left and the package reference is on the right just like when using import/require**
> using externals the json is written in the opposite way
