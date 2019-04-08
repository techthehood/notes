# [Dynamic imports - lazy loading](https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234)   
1st attempt
```
	export const get_user_data = async function(){

    console.log("entering user_data fn!");

    const {get_user_data} =  await import('./user_data');

    let mesee = 1;
    return get_user_data;
  };
```

**failed - error: Support for the experimental syntax 'dynamicImport' isn't currently enabled**
[fix hint](https://github.com/styleguidist/react-styleguidist/issues/987)   
["@babel/plugin-syntax-dynamic-import docs](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)   

```
	npm install --save-dev @babel/plugin-syntax-dynamic-import
```

.babelrc
```
	{
	"plugins": ["@babel/plugin-syntax-dynamic-import"]
	}
```

**error - Uncaught (in promise) Error: Loading chunk # failed.**
[chunks not loading hint](https://stackoverflow.com/questions/48280949/webpack-chunking-no-content-appearing-chunks-not-loaded)
**i definitely forgot to add it to my views.html.php file**

lazy loading articles
[babel-plugin-dynamic-import-webpack](https://github.com/airbnb/babel-plugin-dynamic-import-webpack)   
[dynamic imports react and redux](https://codeburst.io/dynamic-imports-react-and-redux-29f6d2d88d77)   
[angular js webpack lazyload](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd)   
[code splitting webpack dynamic import react](https://blog.pusher.com/code-splitting-webpack-dynamic-import-react/)   
[webpack 3 dynamic imports code splitting and long term caching made easy](https://blog.cloudboost.io/webpack-3-dynamic-imports-code-splitting-and-long-term-caching-made-easy-1892981e0ae7)   
[webpack4 course part 3ight dynamic imports with prefetch and preload](https://wanago.io/2018/08/20/webpack-4-course-part-eight-dynamic-imports-with-prefetch-and-preload/)  

>Preload directive has a bunch of differences compared to prefetch:
>
A preloaded chunk starts loading in parallel to the parent chunk. A prefetched chunk starts after the parent chunk finishes loading.
A preloaded chunk has medium priority and is instantly downloaded. A prefetched chunk is downloaded while browser is idle.
A preloaded chunk should be instantly requested by the parent chunk. A prefetched chunk can be used anytime in the future.
Browser support is different.

prefetch example
```
import(
  `./utilities/divide`
  /* webpackPrefetch: true */
  /* webpackChunkName: "utilities" */
)
```

>By using prefetch you indicate that the module is probably needed in the future. The browser will download it in the idle time and the downloading will start after the parent chunk finishes.

Preload example
```
	import(
		`./utilities/divide`
		/* webpackPreload: true */
		/* webpackChunkName: "utilities" */
	)
```
joomla doesn't use an html file so webpack won't be able to add prefetch or preload script tags
[Is there a way to add rel='preload' using addScript/addStyleSheet?](https://joomla.stackexchange.com/questions/23778/is-there-a-way-to-add-rel-preload-using-addscript-addstylesheet)   

script example:
```
	<script>
	// Lazy load all your CSS and fonts
	for (const css of [
	  '<?php echo $this->baseurl . '/templates/' . $this->template . '/css/template.css'; ?>',
	  // You can define more CSS or font files here in the array
	]) {
	  const link = document.body.appendChild(document.createElement('link'));
	  script.rel = 'stylesheet';
	  script.href = css;
	}

	// Lazy load all your JS
	for (const js of [
	  '<?php echo $this->baseurl . '/templates/' . $this->template . '/css/template.js'; ?>',
	  // You can define more Javascript files here in the array
	]) {
	  const script = document.body.appendChild(document.createElement('script'));
	  script.async = false;
	  script.src = js;
	}
	</script>
```


[webpack and dynamic imports doing it right](https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234)   
[webpack code splitting example](https://veerasundar.com/blog/2018/02/webpack-code-splitting-example/)   
[how to create a chrome extension in react js](https://veerasundar.com/blog/2018/05/how-to-create-a-chrome-extension-in-react-js/)   
[react router and webpack v4 code splitting using splitchunksplugin](https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)   

## in summary:

**add the chunk as a dependency to the view.html.php file NOTE: order is important (dependencies first)**
```
	$scriptLoc = JUri::base() . "components/com_arc/xfiles/js/dist/form.bundle.js";
	$fileLink->addScript($scriptLoc);

	$scriptLoc = JUri::base() . "components/com_arc/xfiles/js/dist/bundle.js";
	$fileLink->addScript($scriptLoc);
```

**use /* webpackChunkName: "form" */ both to help name the chunk files and to direct the chunk file the import should be included in**
```
	const {get_user_data} =  await import(/* webpackChunkName: "form" */ './user_data');
```
adding this output with the chunkFilename property is optional in this current form since webpack automatically uses a similar format to name the chunks.  the name will be [whatever you used in the webpackChunkName ]/[or #] .bundlename.js - i think you can use this to change the rest of the name that will be used.  i actually prefer .chunk.js
```
output: {
		path: path.resolve(__dirname, 'dist/'),
		chunkFilename: '[name].chunk.js',
},
```
//outputs form.chunk.js

**can we see if it works without using path?**
and it works without using 'path'

after i got all my ducks in a row it still failed to execute because i was returning a fn refernece instead of executing the fn.
```
  const {get_user_data} =  await import('./user_data');


  //i was returning
  return get_user_data;

  //i should have been returning
  return get_user_data(...add props);
```

##### can i use the dynamic import directly?

##### Final script
```
	const {get_user_data} =  await import(/* webpackChunkName: "test" */ './user_data');
```

wallet.js
```
	export const get_user_data = async function(){

			console.log("entering user_data fn!");

			const {get_user_data} =  await import(/* webpackChunkName: "test" */ './user_data');

			let mesee = 1;
			return get_user_data();

	};
```

##### where does dynamic import get its files to dynamically import if its not in a chunk?
```
const d3_main = async function(){
	let {create_form} = await import('./lib/main.js');
	console.log(`main = ${main}`);
	 return {create_form};
 }
```
**failed to import**

##### running it in an async click fn worked
```
	$(".arc_my_media").click(async function(){

		...

			const d3_main = await import('./lib/main.js');
			const {create_form} = d3_main;

			var iFC = new create_form({"display_data":"media"});

		...
```
**is it really going to get and bring back code from this same js file?**

##### how does webpack dynamic import work?
[this one kind of explains the how](https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234)   
[some more insight](https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)   
[Code Splitting hint - search how it works topic](https://survivejs.com/webpack/building/code-splitting/)   
