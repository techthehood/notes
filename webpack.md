
# Webpack

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

## forming proper es6 and AMD modules

**import seems to create an issue**
```
	import x from 'y.js'// breaks other functions on the page 
```

require can still load es6 formated modules
(modules using module.export default)

heres a working es6 module

test.js
```
export default function crazy(txt){
  console.log("testjs running!");
  console.log(`testjs ${txt}`);
  try{console.log(`testjs ${txt} makeContact = `,makeContact);}catch(err){console.log(err);}

  return "code from test.js"
}

export const whatever = "some string of whatever";
```

it can be called using require
arc_site.js
```
	testjs = require('./lib/test.js');
	console.log("testjs = ",testjs);
	testjs.default("first test");
```
using require the entire module is exported as an object
to access its default value use varname.default
use varname.property to access other properties.



heres a working AMD module
test_req.js
```
define([],function(){

  return function crazy(txt){
    console.log("test_req running!");
    console.log(`test_req ${txt}`);
    try{console.log(`test_req ${txt} makeContact = `,makeContact);}catch(err){console.log(err);}

    alert("check for makeContact6");
    // console.log("makeContact6 = ",mC6);
    console.log("test_req makeContact access = ",window.makeContact);
    try{console.log("makeContact6 = ",makeContact6);}catch(err){console.log(err);}


    return "code from test.js"
  }//end crazy
});
```

im sure i could build the function first and return the function as a return value

## define dependency experiment
day 5

**regular require statement**
```
makeContact = require('./lib/makeContact.js');//this seems to work like the exports-loader

document.addEventListener('DOMContentLoaded', function () {

	//both of these work with above
	try{console.log("window makeContact = ", window.makeContact);}catch(err){console.log(err)}
	try{console.log("makeContact = ",makeContact);}catch(err){console.log(err)}
}
```

**expose-loader require statement**

[first you have to install expose-loader](https://webpack.js.org/loaders/exports-loader/#src/components/Sidebar/Sidebar.jsx)
```
$ npm install expose-loader --save-dev
```

```
require('exports-loader?makeContact!./lib/makeContact.js');

document.addEventListener('DOMContentLoaded', function () {

	//both of these work with above
	try{console.log("arc_site window makeContact = ", window.makeContact);}catch(err){console.log(err)}
	try{console.log("arc_site makeContact = ",makeContact);}catch(err){console.log(err)}
}
```

*if require is creating my global variable then why do i need expose-loader?*

### expose-loader is also supposed to work from the webpack.config file

the module is found from the npm root folder and requires the ./ start-with-current-folder syntax
```
test: require.resolve('./js/lib/makeContact.js'),
```



these work outside of the loading block but are not recognized yet in the modules that load before this statment is called
```
	try{console.log("arc_site window makeContact = ", window.makeContact);}catch(err){console.log(err)}
	try{console.log("arc_site makeContact = ",makeContact);}catch(err){console.log(err)}

```

the modules recognize the global variable if run after content is loaded.
i think it needs window.varname within an object to distinguish the function from its own methods.

**no variation of Provideplugin seems to be working
```
resolve: {
    extensions: ['.js', '.json'],
    modules:[path.resolve(__dirname, 'js','lib'),'node_modules'],
    alias: {
      //libr: path.resolve(__dirname, 'js/lib/')
      'makeContact0': path.resolve(__dirname, 'js','lib','makeContact.js'),
      makeContact5: 'makeContact',
      makeContact4: 'makeContact',
      makeContact3: path.resolve(__dirname, 'lib','makeContact'),
      makeContact6: path.resolve(__dirname, 'js','lib','makeContact.js'),
      testjs:'./js/lib/'
    }
  },
  plugins:[
    new webpack.ProvidePlugin({
      /*$ : "jquery",
      jQuery : "jquery",*/
      makeContact6:"makeContact6",
      makeContact:'/js/lib/makeContact.js',
      makeContact0:'lib/makeContact.js',
      makeContact1:'/js/lib/makeContact',
      makeContact2:'lib/makeContact',
      makeContact3:'makeContact3',
      'makeContact4':'makeContact4',
      'makeContact5':"makeContact5"/*,
      testjs:'testjs'*/
    })
  ]
```


this seems to work
```
define(['./add_bookmark.js'],function(abmk){
  // alert("makeContact running!");
  console.log("makeContact running!");
  add_bookmark = abmk;
  console.log("add_bookmark = ",add_bookmark);
```

i guess it finds the dependency using the current folder of the file calling the dependency?

if i remove the ./ i get this error
```
ERROR in ./js/lib/makeContact.js
Module not found: Error: Can't resolve 'add_bookmark.js' in 'C:\xampp\apps\joomla\htdocs\components\com_arc\xfiles\js\lib'
 @ ./js/lib/makeContact.js 1:0-532:2
 @ ./js/arc_site.js

 ```

### what do these functions do?
these work with the command line in the webpack.config.js file - not necessarily in the
html - app environment. they are useful to help webpack bundle files.  if used after
bundling they don't return the same types of values if at all.
```
var path = require('path');
console.log("path = ",path.resolve(__dirname,'dist')); 
// returns path =  C:\xampp\apps\joomla\htdocs\components\com_arc\xfiles\dist


console.log("dirname = ",__dirname);
// returns dirname =  C:\xampp\apps\joomla\htdocs\components\com_arc\xfiles


console.log("path test process.env.PATH = ",process.env.PATH);
//returns the entire environment variables path string

``


structure for my experiment
xfiles
```
$ npm init
```

## node_modules folder & package.json is ceated inside the xfiles folder
	
## es6 import
	**this works**
```
	// files are located starting from the main.js or root js file.
	// arc_site.js
	import testjs from './lib/test.js';
	
	//lib/test.js
	export default function crazy(){
	  console.log("testjs running!");

	  return "code from test.js"
	}

```

**__!important: right now the import is breaking my code using webpack - require is not a problem__**

_export default needed to export a single anonymous value._
_if a specific or multiple values are needed export the value name_

**example of importing from multiple values**
```
	//arc_site.js
	import {whatever} from './lib/test.js';
	console.log(whatever);

	//lib/test.js
	export default function crazy(){
	  console.log("testjs running!");

	  return "code from test.js"
	}

	export const whatever = "some string of whatever";


```

### makeContact experiment

*test1 - require makeContact as a global variables*
can the closure/object read it?
does it have access to its variables?
```
makeContact = require('./lib/makeContact.js');

//object
var makeContact = makeContact;
```

observations:
+ the chrome console can access it.
- the closure can't access it. //returns undefined

***

*test2 - using window. syntax to make makeContact global can the 
closure detect it? does it have access to 'this' w/o binding?
```
window.makeContact = require('./lib/makeContact.js');

//object
var makeContact = window.makeContact;
```

observations:
+ yes the closure can detect the window. syntax of makeContact
- no the recognized value of this is the window/document/global object

***

*test3 - does makeContact have access to the closurs 'this' with binding?
```
window.makeContact = require('./lib/makeContact.js');

//object
var makeContact = window.makeContact.bind(this);
```

observations:
- no the recognized value of this is the window/document/global object

### Optimization minimize
**I can get jquery to load from the cdn and use its $ variable because of optimization.minimize is set to false***
```
module.export = {
  optimization: {
    minimize: false
  }
}
```

sample module.export with non-working parts
```
	module.export = {
	  /*entry: "./js/arc_site.js",
	  output: {
		path: path.resolve(__dirname,"js/dist"),
		filename : "bundle.js",
		publicPath: "/dist"
	  },*/
	  optimization: {
		minimize: false
	  },
	  module: {
		rules: [{
		  test: require.resolve('./js/lib/makeContact.js'),
		  use: [{
			loader: 'expose-loader',
			options: 'makeContact'
		  }]
		}]
	  }/*end module*/
	}//module
```

**module variables**

i learned what i should have seen obviously that the variables from the closure of the module are only accessible in
the module.
```
	// upload.js  closure - exported items are the only things accessible
	const d3_bookmark = require('./d3_bookmark.js');
	const add_bookmark = "bkmrk data";

	console.log("d3 add_bookmark = ",add_bookmark);


	/// arc_site declaration
	const d3_bookmark = require('./lib/d3_bookmark.js');
	const add_bookmark = d3_bookmark.add_bookmark;
	console.log("arc_site d3 add_bookmark = ",add_bookmark);


	// arc_site onload function
	console.log("later arc_site d3 add_bookmark = ",add_bookmark);
	
```

**can i put export in front of module variable declarations and still access them within my modules functions?
**A:** yes it works
```
	// test.js
	export const whatever = function(){
	  return "some string of whatever";
	}

	export const something_else = function()
	{
		// nest function for access test
		let ext_str = whatever();
		let new_str = `some string of someting else. ${ext_str}`;
		return new_str;
	}//something_else

	// arc_site.js

	testjs = require('./lib/test.js');
	console.log("testjs = ",testjs);
	testjs.default("first test");

	let test_txt = testjs.something_else();
	console.log("test_txt = ",test_txt);
```

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
*explains publicPath - when the path references a remote location not the current one - manually point to correct location*

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

>And to create bundles you’ll write scripts in the package.json like so:
```
 “scripts”: {
  //npm run build to build production bundles
  “build”: “webpack --config webpack.config.prod.js”,
  //npm run dev to generate development bundles and run dev. server
  “dev”: “webpack-dev-server”
 }
 ```
 
 create the file and add "--config webpack.config.prod.js" to the build script
 
 my package.json script example
 ```
	   "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "webpack --mode development ./js/arc_site_webpack.js --output ./js/dist/bundle.js",
		"build": "webpack --mode production ./js/arc_site_webpack.js --output ./js/dist/bundle.js --config webpack.config.prod.js",
		"diff": "diff -u file1 file2 | sed -n '1,2d;/^[-+]/p'",
		"lesson":"webpack"
	  },
 ```
 
 failed attempt
 
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
 
 ### final file movements
 
 C:\xampp\apps\joomla\htdocs\components\com_arc\views\arcs\views.html.php
 C:\xampp\apps\joomla\htdocs\components\com_arc\views\arcs\tmp\default.php
 mkdir C:\xampp\apps\joomla\htdocs\components\com_arc\xfiles\js\dist\bundle.js
 
 i deleted the bundle.js.map file on the upload server and it all works - its reading from the localized sourcemap
 
 [twarted here is another sourcemap tutorial](https://www.youtube.com/watch?v=qWDwHRZfbDo)
 https://www.youtube.com/watch?v=yk20pAUztLo
