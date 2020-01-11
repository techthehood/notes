#### Externals
observations on using externals

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
