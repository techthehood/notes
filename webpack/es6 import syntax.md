# using es6 import syntax with webpack and babel

GOTCHA
wrote a script to pkg all my functions in to one

wallet.js   
**this worked**
```
import d_u_d from './download_user_data.js';

export const download_user_data = d_u_d;

```

can i export it directly in wallet.js?   
**nope this failed**
```
import download_user_data from './download_user_data.js';
export download_user_data;
```
**failed**


download_user_data.js
### initial attempt
**both failed**
```
export default download_user_data =  function(bkmk){}

export default const download_user_data =  function(bkmk){}
```

### finally i tried
**this worked**
```

export default function download_user_data(bkmk)
{
}
```

### [using import as](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)   
**syntax**
```
	import defaultExport from "module-name";
	import * as name from "module-name";
	import { export } from "module-name";
	import { export as alias } from "module-name";
	import { export1 , export2 } from "module-name";
	import { foo , bar } from "module-name/path/to/specific/un-exported/file";
	import { export1 , export2 as alias2 , [...] } from "module-name";
	import defaultExport, { export [ , [...] ] } from "module-name";
	import defaultExport, * as name from "module-name";
	import "module-name";
	var promise = import("module-name");
```
[es6 import syntax cheatsheet](https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f)   


### why doesn't this work?
```
	import {
		get_user_data,
		htmlDecode,
		wait_a_minute,
		removeSomething
	} from './lib/wallet.js';
```
**the only one that works in the wallet import is wait_a_minute but wait_a_minute has a followup of**
```
window.wait_a_minute = wait_a_minute;

```
>this works as long as you preserve it in a variable like window.wait_a_minute right away.  otherwise variable scope isn't shared

[this answer says to dumb it down to es5 using require](https://stackoverflow.com/questions/52278642/webpack-and-babel-import-issues)   
```
	const { merge } = require("webpack-merge");
	const { join } = require("path");
```

### this failed
```
	const {
		htmlDecode
	} = require("./wallet.js");
```
**keep working on this**


using the above import {...} from syntax
```

	const get_user_data = get_user_data;//failed
	window.get_user_data = get_user_data;//worked
```
**so the import works, the problem is in retaining the variables - nothing can access them**

##### here are 2 ideas - (not necesssarily to be used together | either/or maybe and)
1. ~~export fn by the fnName instead of export function fnName~~
```
	export const fnName = function()...
```
**nope. wallet.js is already exporting as fnName**

2. use import as syntax because setting a const with the same name as the import varName causes an error
error example
```
	const get_user_data = get_user_data;
```

but maybe this will work
```
import {fnName as fn} from "./path";

const fnName = fn;

```
**this works - same as the dud download_user_data example at the beginning.   
i guess you have bring it in in another variable if you want to be able to use it somewhere**

#### final working example
```
	import {
		get_user_data as gUD,
		htmlDecode,
		wait_a_minute,
		removeSomething
	} from './lib/wallet.js';

	// window.get_user_data = get_user_data;
	const get_user_data = gUD;
```

what about if i get it directly without the import brackets?
```
	import get_user_data from './lib/wallet.js';
```
**failed**

what about get_user_data as syntax
```
import get_user_data as gUD from './lib/wallet.js';
```
**failed on compile -  Unexpected token 'as'**


what about get_user_data as syntax
```
import * as gUD from './lib/wallet.js';
```
**this works - it gets all the exports as an object**

what about setting import to a variable?

```
const gUD = import './lib/wallet.js';//fails on compile
const gUD = import from './lib/wallet.js';//also fails on compile
```
**fails on compile expects import()**
**i guess i can get it directly if its a default export, otherwise i need brackets or '*'**

what about get_user_data as syntax
```
const get_user_data = import {get_user_data as gUD} from './lib/wallet.js';
```
**failed**

I think the one above is going to fail, but this will probably work
```
const {get_user_data} = import * from './lib/wallet.js';
```
**failed too**

dynamic import style
```
const {get_user_data} = import('./lib/wallet.js');
```
**failed**


another es6 syntax test

send_attachments.js
```
export const send_attachments = function(atch_obj)
{
}
```
attach_data.js
```
// const {sendAttachments} = require('./send_attachments.js');//fails
import {sendAttachments} from './send_attachments.js';//works
import {send_attachments as sendAttachments} from './send_attachments.js';//works

import {attach_data : attachData} from './send_attachments.js';//fails



const {attach_data as attachData} = require('../attach_move/attach_data.js');//fails doesn't like 'as'
const {attach_data} = require('../attach_move/attach_data.js');//works but i can't assign a name

const {attach_data : attachData} = require('../attach_move/attach_data.js');//works
```

>for assignment import needs `as` syntax and require needs `:`


#### more note on using destructuring assignment
[destructuring assignment docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)   
**observations**
>the top one doesn't work because there is no sendAttachments fn in the send_attachments.js file

>the other two actually work but import doesn't let you see the actual fn/objects being imported using the console like require does. you can only tell it was successful by running the function.

**to use pseudo react syntax (camelcase import from dash separated fns)**   
import attachData from '../attach_move/attach_data.js';

try
```
	export default attach_data = function(e,eID,tObj)
	{
	}// fails - attach_data is not defined
```

```
	export default function attach_data(e,eID,tObj)
	{
	}//works see below
```
**import attachData && export default function attach_data works together**

does this work using default with require?
```
//attach_data.js
export default function attach_data(e,eID,tObj)

//list_items.js
const attachData = require('../attach_move/attach_data.js');//fails - still looking for default
const attachData = (require('../attach_move/attach_data.js')).default;//works when wrapped but still not the same clean/hackless code I'm looking for
```
##### summary
>i don't like the `export default function attach_data(e,eID,tObj)` syntax because it doesn't work cleanly with both require and import, so i will be using destructuring assignment (destructuring) when i can with import and require to select the correct fn name. This will let me use basically the same syntax to setup my modules and then choose how i want to 'import' them into other files.

>I'll also be using assignment to change the names from dash separated to camelCase
