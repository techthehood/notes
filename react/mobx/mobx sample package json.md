# Mobx sample package.json file

package.json
```
  {
    "name": "updraft",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "webpack --mode development ./js/app.js --output ./js/dist/bundle.js",
      "build": "webpack --mode production ./js/app.js --output ./js/dist/bundle.js"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "@babel/core": "^7.2.0",
      "@babel/plugin-proposal-class-properties": "^7.2.1",
      "@babel/plugin-proposal-decorators": "^7.7.4",
      "@babel/plugin-syntax-dynamic-import": "^7.2.0",
      "@babel/plugin-transform-runtime": "^7.2.0",
      "@babel/preset-env": "^7.2.0",
      "@babel/preset-react": "^7.0.0",
      "babel-cli": "^6.26.0",
      "babel-loader": "^8.0.4",
      "css-loader": "^2.0.1",
      "dynamic-cdn-webpack-plugin": "^4.0.0",
      "exports-loader": "^0.7.0",
      "html-webpack-plugin": "^3.2.0",
      "mini-css-extract-plugin": "^0.5.0",
      "module-to-cdn": "^3.1.5",
      "node-sass": "^4.11.0",
      "sass-loader": "^7.1.0",
      "style-loader": "^0.23.1",
      "webpack": "^4.16.4",
      "webpack-bundle-analyzer": "^3.3.2",
      "webpack-cli": "^3.1.0",
      "worker-loader": "^2.0.0"
    },
    "dependencies": {
      "@babel/runtime": "^7.2.0",
      "mobx": "^5.15.0",
      "mobx-react": "^6.1.4",
      "react": "^16.12.0",
      "react-dom": "^16.12.0",
      "webpack": "^4.41.5"
    },
    "comments": {
      "root_dependencies": {
        "axios": "^0.19.0",
        "request": "^2.88.0",
        "cheerio": "^1.0.0-rc.3"
      },
      "other notes":{
        "note1":"url is a dependency, but its native to nodejs so i don't have to install it"
      }
    },
    "main": "webpack.config.js",
    "keywords": [],
    "description": ""
  }

```
