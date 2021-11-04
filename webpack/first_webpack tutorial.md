# webpack tutorial (angular)

[best article](https://blog.teamtreehouse.com/bundling-angular-with-webpack)   

1. [download starter project]()

2. initiate npm
```
  npm init
```

3. install webpack
```
  npm i -D webpack webpack-cli webpack-dev-server
```
[localhost link](http://localhost:8080/)

4. add script to package.json file
```
  scripts:{
    "start:dev": "webpack-dev-server"

    //i created an alias in the cli too
    alias start:dev="npm run start:dev"
    ...
```


[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)   
**replaced by**
[splitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)    
[migrating to splitChunks - has a good splitchunks example](https://gist.github.com/gricard/e8057f7de1029f9036a990af95c62ba8)   
[splitChunks video](https://www.youtube.com/watch?v=sX_6ezKfvn0)   
[nice splitChunks article](https://engineering.wingify.com/posts/demystifying-split-chunks-plugin/)   


**forget about trying to this format it doesn't work like this**
```
new webpack.optimization.splitChunks(

```

**use this format for splitChunks**
```
  optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
```

**im not sure why these brackets are used in the test**
[i found a hint about the regex brackets](https://github.com/webpack/webpack/issues/2073)   
**they basically mean either \ or /, but i do think its written wrong it should be [\\\/]**
```
test: /[\\/]node_modules[\\/]/,
```


### adjustments to be made

add to each file:
```
  // in dashboard.controller.js
  module.exports = DashboardController;

  // in yep-nope.directive.js
  module.exports = YepNopeDirective;
```

fix errors for later versions
>There is one other edit to be made if you are using a newer version of angular. I’m on angular 1.6.1 and they have finally removed the .success() function from a service call.
>
>So in the DashboardController you’ll need to change:
```

gh.getStatus().success(function(status) {
  _this.github = status;
  });

  to the now used .then():

  gh.getStatus().then(function(status) {
    _this.github = status;
    });
```
>    I am also troubleshooting a $sce error when running locally, but I suspect that may be an issue on my end.
>
>    Cheers,
>    Dan
>
>
>    Simon
>    For anyone trying to debug the SCE error, in app/app.js the sce error detection can be turned off:
```
    angular.module(‘dashboard’, []).config(function($sceProvider) {
      $sceProvider.enabled(false)
      });

```

bad json
>There will also be an $http:badjsonp in the latest AngularJS that can be fixed by removing the callback parameter from the URL in the service:
```

url: ‘https://status.github.com/api/status.json’,
```

### control chunkNames

when setting output in package.json file it was difficult to override output settings to set the proper chunk name
package.json
```
  "dev": "webpack --mode development ./app/app.js --output ./js/dist/app.bundle.js",
```
### with no --output and no .config output
>results:
main.js
vendor.js


### using no --output && .config with filename
```
output:{
  path: path.join(__dirname,'js','dist'),
  filename:'[name].bundle.js'
},
```
>results:
main.bundle.js
vendor.bundle.js

**webpack gives its own title to the main app using 'main'**

### setting both outputs - --output and .config.js
>results:
app.bundle.js
vendor.app.bundle.js

### use chunkFilename to control the names of the chunks
**Best**
```
output:{
  path: path.join(__dirname,'js','dist'),
  chunkFilename:'[name].bundle.js'
},
```
> name without chunkFilename = vendor.app.bundle.js
with chunkFilename = vendor.bundle.js

*_i finally removed the '.app.'_*

package.json

```
  "scripts": {
    ...
    "dev": "webpack --mode development ./js/index.js --output ./js/dist/bundle.js",

    // remove -- output
    "dev": "webpack --mode development ./js/index.js",
```
> if i remove the --output, webpack.config.js will take over and use the filename in the output property

_webpack.config.js_

```
  output: {
      filename: 'bundle.[contenthash].js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname,'js','dist'),
      publicPath: 'jng/js/dist/'
  },
```
> // returns bundle.c98ecd127109bebdf824.js
> package.json --output seems to override the webpack.config property

#### [css chunkFilename failed in production](https://webpack.js.org/plugins/mini-css-extract-plugin/#chunkfilename)   
```
  // original config

  new MiniCssExtractPlugin({
      filename: "bundle.css"
  }),

  // added chunkFilename

  new MiniCssExtractPlugin({
      filename: "bundle.css",
      chunkFilename: '[name].chunk.css',
  }),
```
**works**

## injecting dependencies
```
GithubStatusService.$inject = ['$http'];
function GithubStatusService($http) {
}

//or   

function GithubStatusService($http) {
}
GithubStatusService.$inject = ['$http'];

```
**above or below? the order doesn't seem to make a difference**

## final code

### package.json
```
{
  "name": "angular-webpack-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development ./app/app.js ",
    "serve": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "angular": "^1.7.5",
    "webpack": "^4.28.3",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.14"
  }
}
```

### webpack.config.js
```
var path = require('path');
var webpack = require('webpack');

module.exports = {

  output:{
    path: path.join(__dirname,'js','dist'),
    chunkFilename:'[name].bundle.js'
  },
  optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
  plugins:[
  ]
}// module.exports

```

### directory structure
```
  project/
  --app/
  ----controllers/
  ------dashboard.controller.js
  ----directives/
  ------yep-nope.directive.js
  ----services/
  ------github-st
  atus.service.js
  ----app.js
  --js/
  ----angular.min.js
  --index.html
```

### index.html
```
  <!doctype html>
  <html>
      <head>
          <title>Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

          <script src="js/dist/vendor.bundle.js"></script>
          <script src="js/dist/app.bundle.js"></script>
          <!--
          <script src="js/angular.min.js"></script>
          <script src="app/app.js"></script>
          <script src="app/directives/yep-nope.directive.js"></script>
          <script src="app/services/github-status.service.js"></script>
          <script src="app/controllers/dashboard.controller.js"></script>
        -->

      </head>
      <body ng-app="dashboard">
          <div class="container">
          <br />
          <div ng-controller="dashboardController as ctrl">
              <div class="alert alert-danger" ng-class="{'alert-danger': !ctrl.github, 'alert-success': ctrl.github}">Is GitHub Up? <yep-nope check="ctrl.github"></yep-nope></div>
          </div>
          </div>
      </body>
  </html>

```

### app/app.js
```
var angular = require('angular');

angular.module('dashboard', []).config(function($sceProvider) {
  $sceProvider.enabled(false)
  });

require('./directives');
require('./controllers');
require('./services');

```
### controllers/index.js
```
  'use-strict';
  var angular = require('angular');

  angular.module('dashboard').controller('dashboardController', require('./dashboard.controller'));

```

### controllers/dashboard.controller.js
```
  'use strict';

  DashboardController.$inject = ['GithubStatusService'];
  function DashboardController(gh) {
      var _this = this;
      _this.github = '';
      gh.getStatus().then(function(status) {
          _this.github = status;
      });
  }

  // angular.module('dashboard').controller('dashboardController', DashboardController);

  module.exports = DashboardController;

```

### directives/index.js
```
  'use-strict';
  var angular = require('angular');

  angular.module('dashboard').directive('yepNope', require('./yep-nope.directive'));

```

### directives/yep-nope.directive.js
```
  function YepNopeDirective() {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.$watch(attrs.check, function (val) {
          var words = val ? 'Yep' : 'Nope';
          element.text(words);
        });
      }
    }
  }

  // angular.module('dashboard').directive('yepNope', YepNopeDirective);


  module.exports = YepNopeDirective;

```

### services/index.js
```
  'use-strict';
  var angular = require('angular');

  angular.module('dashboard').service('GithubStatusService', require('./github-status.service'));

```

### services/github-status.service.js
```
  'use strict';

  GithubStatusService.$inject = ['$http'];
  function GithubStatusService($http) {
      var _this = this;
      _this.getStatus = function getStatus() {
          return $http({
              method: 'jsonp',
              url: 'https://status.github.com/api/status.json',
              transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
                  return (value.status === 'good');
              })
          });
      }
  }

  // angular.module('dashboard').service('GithubStatusService', GithubStatusService);

  function appendTransform(defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    return defaults.concat(transform);
  }

  module.exports = GithubStatusService;

```
