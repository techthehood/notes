# Require.js notes

most helpful videos
[require js docs](https://requirejs.org/docs/whyamd.html#amd)
[first useful video](https://www.youtube.com/watch?v=eRqsZqLyYaU)
[video on a basic setup](https://www.youtube.com/watch?v=VGlDR1QiV3A)

basic require.js loader
```
<script src="require.js"></script>
```

it doesn't need data-main="scripts/main"
data-main defines the modules root if you don't define it it will read whats inside the script tag.(?)

once its loaded its ready to use. it doesn't need a configuration file either.

uses require and define

example
```

	//use the filename w/o extension in the dep-name array
	require(['dependency-name','message','another-module'],function(ref-var,mod,aMod){
		//once you call this everything inside will run

	});


```

define works similar

message.js
```

	//use the filename w/o extension in the dep-name array
	define(function(ref-var){
		//once you call this everything inside will run

	});//creates a default function

	define(['another-module'],function(ref-var){
	//once you call this everything inside will run

	});//a named function gives a reference to a module other than default


```
