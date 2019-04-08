
[]()

install 3 loaders   
```
npm install html-loader extract-loader file-loader
```

```
module:{
  rules:[
    {
      test:/\.html$/,
      use:[
        {
          loader:"file-loader",
          options:{
            name:"[name].html"
          }
        },
        {
          loader:"extract-loader"
        },
        {
          loader:"html-loader"
        }
      ]
    }
  ]
}
```
