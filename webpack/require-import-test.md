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



these work outside of the loading block but are not recognized yet in the modules that load before this statement is called
```
	try{console.log("arc_site window makeContact = ", window.makeContact);}catch(err){console.log(err)}
	try{console.log("arc_site makeContact = ",makeContact);}catch(err){console.log(err)}

```

the modules recognize the global variable if run after content is loaded.
i think it needs window.varname within an object to distinguish the function from its own methods.

**no variation of Provideplugin seems to be working**
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

```


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

### [best article on using es6 import](https://www.kaplankomputing.com/blog/tutorials/javascript/understanding-imports-exports-es6/)   

**module.js**
```
	//module.js
	export default class {
	  constructor() {
	    console.log("GOOD");
	  }
	}

	export class Foo {
	  constructor() {
	    console.log("FOO");
	  }
	}

	export const url = "http://www.kaplankomputing.com";

	export function bar() {
	  console.log("bar");
	}
```

**app.js**
```
	import Custom, {Foo, url, bar} from './module';
	const custom = new Custom();
	const foo = new Foo();
	bar();
	console.log(url);
```

**the import statement says it all.  default exports can be used with any namespace outside of the brackets.  all other exports with exact namespace match inside the brackets.**


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
closure detect it? does it have access to 'this' w/o binding?*
```
window.makeContact = require('./lib/makeContact.js');

//object
var makeContact = window.makeContact;
```

observations:
+ yes the closure can detect the window. syntax of makeContact
- no the recognized value of this is the window/document/global object

***

*test3 - does makeContact have access to the closurs 'this' with binding?*
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

### another es6 test
**original working format**
default_dimensions.js
```
	export const default_dimensions = function(){

	}

```

app.js
```
	const dd = require('./lib/default_dimensions.js');
```
>//returns dd == module {
	default_dimensions: f (obj)
}

default_dimensions.js
```
	const default_dimensions = function(){

	}

	export default default_dimensions
```
app.js
```
	const dd = require('./lib/default_dimensions.js');
```
>//returns dd == module {
	default: f default_dimensions(obj)
}

### can i get import to work with this?
```
	import {default_dimensions} from './lib/default_dimensions.js';
```
**failed**
>//returns undefined

### what about if i remove the brackets?
```
	import default_dimensions from './lib/default_dimensions.js';
```
**still failed**

### what about using require().default with export default
```
	const default_dimensions = require('./lib/default_dimensions.js').default;
```
**this works**

[Difference between export const foo, export default foo and module.exports = foo](https://stackoverflow.com/questions/42461330/difference-between-export-const-foo-export-default-foo-and-module-exports-foo)   
[Difference between “module.exports” and “exports” in the CommonJs Module System](https://stackoverflow.com/questions/16383795/difference-between-module-exports-and-exports-in-the-commonjs-module-system)

#### other strange issues

require item is undefined in devtools and error 'is not a function'
```
	// const {getMyInfo} = require('../data/get.js');// fails
  // const {getMyInfo} = require('../data/get.js');// fails
  // const {getMyInfo} = import('../data/get.js');// still fails
  // const getMyInfo = require('../data/get.js').getMyInfo;// fails
  // const getMyInfo = (require('../data/get.js')).getMyInfo;// fails
  const getMyInfo = require('../data/get.js');// works

	...

	getMyInfo.getMyInfo(binder_info)

```
**the work around is import the whole object and use its properties in the function name**
**i wish i knew the cause of this**

#### GOTCHA:
i tried using module.exports and the browser gave this msg:
>Cannot assign to read only property 'exports' of object '#<Object>'
