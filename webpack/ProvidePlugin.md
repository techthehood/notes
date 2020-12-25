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
**write just like import statments**

Using DynamicCdnWebpackPlugin - what effect does provide plugin have on using import statements?

 baseline
 webpack.config.js
 ```
    externals: {
      /*@ comment out externals for/to create DynamicCdnWebpackPlugin scripts in ./dist/index.html file */
      /*jquery: 'jQuery'*/
      'react': 'React',
      'react-dom':'ReactDOM',
      'mobx':'mobx',
      'axios':'axios'
    },//used to maintain access to CDN global variables

    new webpack.ProvidePlugin({
      /*$ : "jquery",
      jQuery : "jquery",*/
      /*React : "react",
      ReactDOM : "react-dom",
      axios: "axios",
      mongoose: "mongoose",*/
    }),
 ```
 **all commented out**

 updraft.js
```
  // import React from 'react';

  const Updraft = () => {

    useEffect(() => {
      console.log("[updraft] useEffect running");
    })

  ...

}
```
**no react import**
ReferenceError: useEffect is not defined


 updraft.js
```
  // import React from 'react';

  const Updraft = () => {

    React.useEffect(() => {
      console.log("[updraft] useEffect running");
    })

  ...

}
```
**no react import**
**it worked**
webpack.config.js
```
   externals: {
     /*@ comment out externals for/to create DynamicCdnWebpackPlugin scripts in ./dist/index.html file */
     /*jquery: 'jQuery'*/
     // 'react': 'React',
     'react-dom':'ReactDOM',
     'mobx':'mobx',
     'axios':'axios'
   },//used to maintain access to CDN global variables
```
**comment out react and all externals**
**still worked**

> observation: neither are having any effect. lets see how long it lasts
