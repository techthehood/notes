# Webpack

### to start create the folder you need
``` mkdir foldername
```

### create a npm project
```
npm init
```

### creat a webpack project
```
npm i -D webpack
//or
npm install -D webpack
```

### install webpack-cli (optional)
```
npm i -D webpack-cli
//or
npm install -D webpack-cli
```
**actually installs automatically on first run of dev build**

### create build and development scripts in the project.json files
```
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"dev": "webpack --mode development ./src/app.js --output ./dist/bundle.js",
	"build": "webpack --mode production ./src/app.js --output ./dist/bundle.js",
	"diff": "diff -u file1 file2 | sed -n '1,2d;/^[-+]/p'"
	},
	```

### create a src folder a dist folder and a lib folder (src and lib folders can also be interchangeable)
```
mkdir src dist lib
```

### create an app.js file in the src folder
```
echo > scr/app.js
```

### create a webpack.config.js file
```
echo > webpack.config.js
```

### add this content to the webpack.config file
**this one is good its a summary of 'BEST CONFIG FILE' below**
```

	var path = require("path");
	var webpack = require("webpack");
	var path = require('path');

	const isProd = process.env.npm_lifecycle_event === 'build';

	const prodObj = isProd ? {
			filename: '[file].map'
	} : {};

	module.exports = {
		devtool: isProd ? false : 'cheap-module-eval-source-map',
		plugins:[
		new webpack.ProvidePlugin({
				test_es2015:path.join(__dirname,'src','lib','test_common.js')/* this works */,
				test_common:path.join(__dirname,'src','lib','test_es2015.js')/* this works */
			}),
			new webpack.SourceMapDevToolPlugin(prodObj)
		]
	}//module

```

### setup library test file
```
echo "export const test = function(){
	console.log('this is only a test');
	}" > lib/test.js
```

### use require to extract modules
app.js
```
const test_var = require('./lib/test.js');
```
**path is relative to webpack target file, which is also the file you are adding this to.**

### run any initial functions inside this block of code
```
	document.addEventListener('DOMContentLoaded', async function () {

		await get_user_data();

		await arc_setTheStage();

	});
```

## Converting legacy code - the big idea

+ external functions and prototypes won't have access to var methods and properties
+ external functions have access to "this" methods and properties but the data won't be private

i can use a single var property/object and nest all the properties of the object inside. then i can
pass the current state of the object as one of the function parameters object properties

var state = {}
state.functionName = function...
state.propertyName = "string"

make sure all functions have a parameter for a single object so i can always add to the data it recieves without
trying to maintain a specific property order.


## see reqire-import-tests.md


### [fix js circular structure](https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json)
### [JSON.stringify docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

my working sample:
```
	/**** experimental = clears circular structure ****/

	let test2 = this.nav_snapshot({"orient":orient});

	var cache = [];
	let snap_data = JSON.stringify(test2, function(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Duplicate reference found
				try {
					// If this value does not reference a parent it can be deduped
					return JSON.parse(JSON.stringify(value));
				} catch (error) {
					// discard key if value cannot be deduped
					return;
				}
			 }
			// Store value in our collection
			cache.push(value);
		}
		return value;
	});
	cache = null; // Enable garbage collection

	/**** experimental = clears circular structure ****/


	terms:
	[]()
	[tree shaking](https://insights.untapt.com/webpack-import-require-and-you-3fd7f5ea93c0)
	[source maps]()
```

## Building a localized source-maps

### [official sourcemap docs](https://webpack.js.org/configuration/devtool/)
### [official SourceMapDevToolPlugin docs](https://webpack.js.org/plugins/source-map-dev-tool-plugin/)
### [unofficial source-map docs](https://survivejs.com/webpack/building/source-maps/)
### [Using sourcemaps on production without revealing the source code](https://itnext.io/using-sourcemaps-on-production-without-revealing-the-source-code-%EF%B8%8F-d41e78e20c89)
[Webpack The Confusing Parts article - a simple guide](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9)
**explains publicPath - when the path references a remote location not the current one - manually point to correct location**

my default sourcemap setup
```
	module.exports = {
	  devtool: 'cheap-module-eval-source-map'
	}//module
```

modified setup with localized sourcemap
```

```

creating multiple config files

> And to create bundles you’ll write scripts in the package.json like so:

```
 “scripts”: {
  /*npm run build to build production bundles*/
  “build”: “webpack --config webpack.config.prod.js”,
  /*npm run dev to generate development bundles and run dev. server*/
  “dev”: “webpack-dev-server”
 }
```

create the file and add "--config webpack.config.prod.js" to the build script

## my package.json script example
 ```
	   "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "webpack --mode development ./js/arc_site_webpack.js --output ./js/dist/bundle.js",
		"build": "webpack --mode production ./js/arc_site_webpack.js --output ./js/dist/bundle.js --config webpack.config.prod.js",
		"diff": "diff -u file1 file2 | sed -n '1,2d;/^[-+]/p'",
		"lesson":"webpack"
	  },
 ```

## failed attempt

 ```
	 const isProd = process.env.npm_lifecycle_event === 'build';
	// const ifProd = x => isProd && x;// when using babel
	const ifProd = function(x){return isProd && x};// i couldn't get this to work


	module.exports = {
	  /*optimization: {
		minimize: false
	  },//this doesn't seem to be doing anything anymore
	  */
	  devtool: isProd ? false : 'cheap-module-eval-source-map',
	  plugins:[
	  new webpack.ProvidePlugin({
		/*$ : "jquery",
		jQuery : "jquery",*/
		makeUp:path.join(__dirname,'js','lib','upload.js')/* this works */,
		test:path.join(__dirname,'js','lib','test.js')/* this works */,
		test2:path.join(__dirname,'js','lib','test2.js')/* this works */
	  }),
	  ifProd(new webpack.SourceMapDevToolPlugin({
		  // this is the url of our local sourcemap server
		  publicPath: 'https://localhost/',
		  filename: '[file].map',
	  }))
	]
	}//module
 ```

## Final & Working
**BEST CONFIG FILE**
successful attempt:
 ```
	var path = require("path");
	var webpack = require("webpack");
	var path = require('path');
	//console.log("process.env = ",process.env);

	// const isProd = NODE_ENV === 'production'; // NODE_ENV not defined

	// original code suggestion
	// const ifProd = x => isProd && x;// when using babel
	// const ifProd = function(x){return isProd && x;};

	//my modifications
	const isProd = process.env.npm_lifecycle_event === 'build';
	const prodObj = isProd ? {
		// this is the url of our local sourcemap server
		publicPath: 'https://localhost/',
		filename: '[file].map'
	} : {};

	module.exports = {
		/*optimization: {
		minimize: false
		},//this doesn't seem to be doing anything anymore
		*/
		devtool: isProd ? false : 'cheap-module-eval-source-map',
		plugins:[
		  new webpack.ProvidePlugin({
			/*$ : "jquery",
			jQuery : "jquery",*/
			makeUp:path.join(__dirname,'js','lib','upload.js')/* this works */,
			test:path.join(__dirname,'js','lib','test.js')/* this works */,
			test2:path.join(__dirname,'js','lib','test2.js')/* this works */
		  }),
		  new webpack.SourceMapDevToolPlugin(prodObj)
		]
	}//module

 ```

### GOTCHA - module.export fails needs to be module.exports
in webpack.config.js file & in modules
```

```


### final file movements

C:\xampp\apps\joomla\htdocs\components\com_arc\views\arcs\views.html.php
C:\xampp\apps\joomla\htdocs\components\com_arc\views\arcs\tmp\default.php
mkdir C:\xampp\apps\joomla\htdocs\components\com_arc\xfiles\js\dist\bundle.js

i deleted the bundle.js.map file on the upload server and it all works - its reading from the localized sourcemap

[twarted here is another sourcemap tutorial](https://www.youtube.com/watch?v=qWDwHRZfbDo)
https://www.youtube.com/watch?v=yk20pAUztLo

export vs exports vs module.exports
### [export vs exports hint](https://www.quora.com/What-is-difference-between-module-exports-and-export-in-node-js)
this seems to express that exports are used for 'require' and export is used with 'import x from'
[a forum discussion](https://spectrum.chat/thread/5aabb07a-df24-42d2-9ff1-5c026d15ec77)
[a decent article on common.js AMD && es2015](https://auth0.com/blog/javascript-module-systems-showdown/)
```
```
all tests done without babel

es2015

```
import test_ie from './lib/test_es2015';

//only the default came through using import

export default function crazy(txt){
  console.log("testjs running!");
  console.log(`testjs ${txt}`);
  try{console.log(`testjs ${txt} makeContact = `,makeContact);}catch(err){console.log(err);}

  return "code from test.js"
}

```
**all other variations came through**

how does test_common.js do with 2 exports exposed
and one redundant value?
```
	const whatever = function(){
	  return "some string of whatever";
	}
	module.exports = whatever;

	const something_else = function()
	{
	  let ext_str = whatever();
	  let new_str = `some string of someting else. ${ext_str}`;
	  return new_str;
	}//something_else

	module.exports = {
	  whatever,
	  something_else
	};

```

### GOTCHA test_common.js only recognizes the last declared module.exports

webpack.config ProvidePlugin
test_common.js - gives access to last module.exports
test_es2015 - gives access to all its export properties
the same happened with require - **__it follows that webpack.config is using require__**

```
const test_re = require('./lib/test_es2015');
```
**i wonder how import and require react to babel**

conclusion:
- require gives access to all es2015 functions exported or not. and the last common.js styled
module.exports

- import gives only the default es2015 fn (no default no access) or the last module.exports fn.

## the verdict - use require with es20xx

## a security issue came up on github unrelated to anything i was working on and i wanted to fix it.

## github security issue
[similar docs](https://github.com/fuse-box/fuse-box/issues/1427)
```
	CVE-2018-16469 More information
	high severity
	Vulnerable versions: < 1.2.1
	Patched version: 1.2.1
	The merge.recursive function in the merge package in versions before 1.2.1 can be tricked into adding or modifying properties of the Object prototype. These properties will be present on all objects allowing for a denial of service attack.
```

"requires": {
	"merge": "^1.2.0"
}

"merge": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/merge/-/merge-1.2.0.tgz",
      "integrity": "sha512-VjFo4P5Whtj4vsLzsYBu5ayHhoHJ0UqNm7ibvShmbmoz7tGi0vXaoJbGdB+GmDMLUdg8DpQXEIeVDAe8MaABvQ=="
    },

so i went to the package.json.lock file and search for "merge" & got back 2 instances

i manually changed the 1st

```
"requires": {
	"merge": "^1.2.0"
}

"requires": {
	"merge": "^1.2.1"
}
```
recommendation was to update the dependency in package.json.lock
but the actual module the package is using would be the outdated security threat so i would also have to change that.

[how do i update a dependency](https://bytearcher.com/articles/using-npm-update-and-npm-outdated-to-update-dependencies/)

my example
```
	npm install merge@latest --save

```

updating merge gave me a new security issue
```
	npm install merge@latest --save
	npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
	npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
	npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

	+ merge@1.2.1
	updated 1 package and audited 14537 packages in 14.997s
	found 1 high severity vulnerability
	  run `npm audit fix` to fix them, or `npm audit` for details
	warning: LF will be replaced by CRLF in package-lock.json.
	The file will have its original line endings in your working directory.
```

so i npm audit
```
	npm audit
	=== npm audit security report ===

	# Run  npm install react-scripts@2.1.1  to resolve 1 vulnerability
	SEMVER WARNING: Recommended action is a potentially breaking change

	High            Missing Origin Validation

	Package         webpack-dev-server

	Dependency of   react-scripts

	Path            react-scripts > webpack-dev-server

	More info       https://nodesecurity.io/advisories/725



	found 1 high severity vulnerability in 14537 scanned packages
	1 vulnerability requires semver-major dependency updates.
	warning: LF will be replaced by CRLF in package-lock.json.

```
**next time i'll try to run npm audit fix**
so i ran audits recommendation
```
	npm install react-scripts@2.1.1
```

### [using loaders](https://youtu.be/DhKKNYGFVi8)

#### [webpack watch](https://webpack.js.org/configuration/watch/)   

```
	watch: true,
  watchOptions: {
    ignored: ['files/**/*.js', 'node_modules/**']
  },
```
#### working offline
```
	const isOffline = true;
	console.log(`[Offline]`,isOffline);

	const dCWP = (isOffline) ? function(){} : new DynamicCdnWebpackPlugin();// it wants a function
	const external_obj = (isOffline) ? {} : {
	  /*@ comment out externals for/to create DynamicCdnWebpackPlugin scripts in ./dist/index.html file */
	  'react': 'React',
	  'react-dom':'ReactDOM',
	  'mobx':'mobx',
	  'axios':'axios'
	  // jquery: 'jQuery'
	};

	const providePlugin_obj = (!isOffline) ? {} : {
	  $ : "jquery",
	  jQuery : "jquery",
	  React : "react",
	  ReactDOM : "react-dom",
	  axios: "axios",
	  mongoose: "mongoose",
	}
```
**here's part of my working offline experiment - ultimately all i need to do is make the hbs partials routes more dynamic with local and copy the contents of the cdn files**

#### erase unneccessary files from build folder

[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)   

```
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  ...

  plugins:[
    ...
    new HtmlWebpackPlugin({ chunksSortMode: "none" }),
    new CleanWebpackPlugin(),
  ],
  ...
```