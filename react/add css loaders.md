# add loaders

udemy react styling lectures
- 46 "adding Styling with Stylesheets"
- 47 "Working with inline Styles"
- 60 module "styling react components"

### can css be imported without using a css loader?
the answer is no
```
  ERROR in ./js/lib/details/details.css 1:0
  Module parse failed: Unexpected token (1:0)
  You may need an appropriate loader to handle this file type.
  > .dv_Desc{border:5px solid green;}

```

### ~do i have to install a module css-loader~ lol look below

[shows css loaders](https://www.youtube.com/watch?v=8DDVr6wjJzQ&t=540s)
```
$ npm install css-loader style-loader --save-dev
$ npm install sass-loader node-sass --save-dev
```
[installing sass-loader](https://medium.com/a-beginners-guide-for-webpack-2/using-sass-9f52e447c5ae) **also  shows test regex for .css && .scss below**
>sass-loader is dependent on another loader – node-sass, so we’ll have to install both.

```
module:{
  rules:[
    {
      test:/\.css$/,
      /*loader:'css-loader'*/
      use:[
        'style-loader',
        'css-loader'
      ]
    }
  ]
}
```
**order is important - css-loader should load first so here because they are loaded in reverse it is added last.**

[another article on css loaders (includes .scss)](https://medium.com/a-beginners-guide-for-webpack-2/webpack-loaders-css-and-sass-2cc0079b5b3a)

[article adding extract-text-loader](https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1)
**hint for extracting css files into a bundled css file? i don't know if i need this or not.  
but... it does give me a hint for a .scss(sass) loader**

**do i need ExtractTextPlugin?**
### [better explaination for ExtractTextPlugin?](https://medium.com/a-beginners-guide-for-webpack-2/extract-text-plugin-668e7cd5f551)
**instead of adding all this style scripting to the style tag in the html head, create a separate file (bundle) for your css**

GOTCHA: for webpack 4 use:
[mini-css-extract-plugin docs](https://github.com/webpack-contrib/mini-css-extract-plugin)

## Using mini-css-extract-plugin
**prevents css from being added to head style section by creating a bundled external stylesheet**
[mini-css-extract-plugin article](https://quantizd.com/webpack-4-extract-css-with-mini-css-extract-plugin/)

install the node package & css loaders above
```
  npm install --save-dev mini-css-extract-plugin
```

require at the top of webpack.config.js
```
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
```

add to config modules
```
module : {
        rules : [
            {
                test: /\.s?[ac]ss$/,
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
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })

    ],
```
**note the bundled .css file still has to added manually to the html file the same way bundle.js did**

test for .sass && .scss
```
  test: /\.s?[ac]ss$/,
```

### test for .css and .scss (article above find:'using-sass')
```
  test:/\.(s*)css$/,
```
i guess testing for .css, .scss && .sass would look like this
```
  test: /\.(s*)?[ac]ss$/,
```
it would also probably accept .ass which doesn't exit
