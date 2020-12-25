#### Externals
observations on using externals

[webpack Externals docs](https://webpack.js.org/configuration/externals/)   

sample externals used in profile-panel component
```
    externals: {
      /*jquery: 'jQuery'*/
      'react': 'React',
      'react-dom':'ReactDOM',
      'react-redux':'ReactRedux',
      'redux-thunk':'ReduxThunk',
      'redux':'Redux',
      'mobx':'mobx',
      'axios':'axios'
    },//used to maintain access to CDN global variables
```

externals follow this pattern:
```
  import globalVarName from 'importFileName'


  externals: {
    'importFileName': 'globalVarName'
  }
```
#### externals disable creation of html script tags
**once components are referenced in externals DynamicCdnWebpackPlugin won't create a cdn script tag for the component**
**packages through npm i must also be installed for script tags to be created**

**this seems accurate according to experiments and the docs above. but i guess the DynamicCdnWebpackPlugin actually needs to draw from dependencies and externals basically disables them so DynamicCdnWebpackPlugin then can't access them to locate and create script tags.**
