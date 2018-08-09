
# Webpack

### define dependency experiment

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

###what do these functions do?
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