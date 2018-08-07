
# Webpack


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