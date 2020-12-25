
[sample site - react-hook-form](https://react-hook-form.com/get-started)

npm package
```
  npm install react-hook-form
```
[search on unpkg for the cdn package](https://unpkg.com/)   

[CDN package](https://unpkg.com/react-hook-form@4.9.8/dist/react-hook-form.js);

#### update webpack.config file
```
  externals: {
    /*@ comment out externals for/to create DynamicCdnWebpackPlugin scripts in ./dist/index.html file */
    'react': 'React',
    'react-dom':'ReactDOM',
    'mobx':'mobx',
    'axios':'axios',
    'react-hook-form':'react-hook-form'
  },
```
**there isn't a camel cased version like ReactHookForm in the docs so i just used the regular dash separated file call**

#### add cdn to vendors and vendors_local partials
```
  <script type="text/javascript" crossorigin src="https://unpkg.com/react-hook-form@4.9.8/dist/react-hook-form.js" defer ></script>
  <script type="text/javascript" crossorigin src="./locals/react-hook-form@4.9.8/dist/react-hook-form.js" defer ></script>
```

#### copy js file from chrom using the cdn url in the adddress bar to a file in the public/locals folder

use it in a react component
