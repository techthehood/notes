# create custom npm packages   

## articles   
[How to Build and Publish NPM packages with Webpack](https://itnext.io/how-to-build-and-publish-npm-packages-with-webpack-dea19bb14627)   
[Writing & Publishing your First NPM Package!](https://youtu.be/4zzbNac6f6Q)   
[What are peer dependencies in a Node module?](https://flaviocopes.com/npm-peer-dependencies/)   
[SOLVING REACT HOOKS' INVALID HOOK CALL WARNING](https://robkendal.co.uk/blog/2019-12-22-solving-react-hooks-invalid-hook-call-warning)   
[How to build a CLI with Node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js)   


### web package


### react package

[webpack externals](https://webpack.js.org/configuration/externals/)   

_webpack.config.js_

```
  externals: {
        'react': 'react',
        'react-dom':'react-dom'
  },//used to maintain access to CDN global variables


  // fails
  // 'react': 'React',
  // 'react-dom':'ReactDOM'/*,
```

#### adding peer dependencies   

[peer dependency](https://stackoverflow.com/questions/60584098/does-npm-have-a-flag-for-peer-dependency-install)   
[npm link, peerDependencies and webpack](https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7)   

_package.json_

```
  "peerDependencies":{
    "react": "^16.14.0",
    "react-dom": "^16.14.0"
  },
  "dependencies": {
    "@babel/runtime": "^7.2.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  }
```

> i lowered the react and react-dom version to match the react of the target repository   
> im not sure if this helped - i need more experiments

Starting with NPM v3.0, peer dependencies are not automatically installed on npm install, and it can be a hassle to install them all manually. The install-peerdeps tool makes the process fast and easy.   

[webpack output](https://webpack.js.org/configuration/output/#outputumdnameddefine)   

_webpack.config.js_

```
  output: {
      filename:'d3po_ITKR.js',
      library:'D3poITKR',
      libraryTarget:'umd',
      globalObject:'this',
      umdNamedDefine: true
  },
```

### node package



```
  npm publish
```
