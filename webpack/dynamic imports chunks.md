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
[webpack4 course part eight dynamic imports with prefetch and preload](https://wanago.io/2018/08/20/webpack-4-course-part-eight-dynamic-imports-with-prefetch-and-preload/)  

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

joomla framework example
```
	$this->addHeadLink($this->baseurl . '/templates/' . $this->template . '/js/template.js' . $mediaVersion, 'preload', 'rel', array('as' => 'script'));
```
**my test worked**

script only example:
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


### Test import with react

react test_option.js
```
	  // import React from 'React';
	  console.log("test_option ready");
	  // import AWrapr from '../templates/aWrapr';
	  const removeSomething = require('../../tools/remove_something.js');
	  const dropView = require('../../data/drop_view.js');
	  // const {test_fn} = require('./test/test_fn.js');

	  import Box from '../../elements/Box';

	  const test_option = (props) => {
	    //sample:
	    // <AWrapr tVar={tVar} ></AWrapr>
	    let tVar = props.tVar;
	    let s = tVar.s;
	    let mode = props.mode;

	    if(s.app_state.data_mode == "full" ||
	    tVar.is_admin_data == "true" && tVar.is_native_data == "true" ||
	    tVar.test_class == " arc_collection " ){

	      let iUN = s.iUN || Math.round(Math.random() * 10000);
	      let value = "change";//null;

	      let tstName = `test_options_${mode}_${tVar.binder}_${tVar.myIn_id}`;
	      let tstName_cls_str = removeSomething.removeSomething(`${tstName} my_info test_options test_${mode} li_opt_btn info_dot d3-icon-up`," ");

	      let tstName_attr = {
	        id:`_${tstName}`,
	        className:tstName_cls_str,
	        title:`test something`,
	        "href":"#"
	      };

	      let test_callout = async function(e)
	      {
	        // test_fn();
	        // w/o await test_fn == [[PromiseStatus]]: "pending"
	        const testFn = await import(/* webpackChunkName: "test" */'./test/test_fn');// this works
	        // this version returns module test_fn: (...)
	        // this will be my regular way to do this

	        // lets try it using destructuring
	        // const {testFn} = await import(/* webpackChunkName: "test" */'./test/test_fn');// fails

	        // try with export default test_fn
	        // const testFn = await import(/* webpackChunkName: "test" */'./test/test_fn');// this works
	        // can use testFn.default works - testFn.test_fn  fails

	        //this long version also works with export default
	        // const test_fn = await import(/* webpackChunkName: "test" */'./test/test_fn')
	        // .then(({default:test_fn}) =>{
	        //   return test_fn;
	        // })
	        // test_fn();



	        let mesee = 1;
	        // return testFn.test_fn;// this fails
	        // return testFn.test_fn();// this works
	        testFn.test_fn();// this also works
	      }// test_callout

	      let tstName_events = {};

	      tstName_events.onClick = {
	        callout:test_callout,
	        data:[
	          {
	            state:s.app_state,
	            mode,
	            tVar
	          }
	        ]
	      }//click


	      let tstName_obj = (
	        <Box data={{
	          tag:"button",
	          attributes:tstName_attr,
	          events:tstName_events
	        }}>
	        {value}
	        </Box>
	      );

	      return tstName_obj;
	    }else{
	      return null;
	    }//else

	  }// test_option

	  export default test_option;

```
[Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)   
[hint from webpack code-splitting docs](https://webpack.js.org/guides/code-splitting/)   

#### outputs to test.chunk.js
```
	await import(/* webpackChunkName: "test" */'./test/test_fn');
```
#### set in output
```
output: {
		path: path.resolve(__dirname, 'dist/'),
		chunkFilename: '[name].chunk.js',

		...

```
> chunk is optional - could be bundle or anything else

#### test 1
```
	const testFn = await import(/* webpackChunkName: "test" */'./test/test_fn');// this works
	testFn.test_fn();// this also works

```
> w/o await test_fn == [[PromiseStatus]]: "pending"
> this version returns module test_fn: (...)
> this will be my regular way to do this

#### test 2
> lets try it using destructuring
```
	const {testFn} = await import(/* webpackChunkName: "test" */'./test/test_fn');// fails
```
**fails**

#### test 3
> try with export default test_fn
```
  const testFn = await import(/* webpackChunkName: "test" */'./test/test_fn');// this works
	testFn.default();
```
> can use testFn.default works - testFn.test_fn  fails

#### test 4
> this long version also works with export default
```
  const test_fn = await import(/* webpackChunkName: "test" */'./test/test_fn')
  .then(({default:test_fn}) =>{
    return test_fn;
  })
  test_fn();
```

test_fn.js
```
	// const test_fn = require('./test/test_fn.js');//sample

	// export const test_fn = async function(e,obj)
	const test_fn = async function(e,obj)
	{
	  let meseeks = "testing, testing";
	  console.log("test in progress.");
	  alert("test in progress!");
	}

	export default test_fn;// not good with {test_fn} = import ...
	// module.exports = test_fn;// fails
```

#### regular test
```
		export const test_fn = async function(e,obj)
		{
		  let meseeks = "testing, testing";
		  console.log("test in progress.");
		  alert("test in progress!");
		}
```

#### default test
```
	const test_fn = async function(e,obj)
	{
	  let meseeks = "testing, testing";
	  console.log("test in progress.");
	  alert("test in progress!");
	}

	export default test_fn;// not good with {test_fn} = import ...
```


### Joomla lazy load experiment
> this is the hint im doing my experiment off of

[JDocumentHTML::addHeadLink - joomla docs](https://docs.joomla.org/API17:JDocumentHTML::addHeadLink)   
[JDocumentHTML::addHeadLink doesn't allow adding different links to same URI ](https://github.com/joomla/joomla-cms/issues/6117)   
> addHeadLink example

```
	$document = JFactory::getDocument();
	$document->addHeadLink('/mysite/site-map', 'next', 'rel');
	$document->addHeadLink('/mysite/site-map', 'contents', 'rel');
```
> returns: <link href="/mysite/site-map" rel="next"/>
<link href="/mysite/site-map" rel="contents"/>



[Joomla adding javascript](https://docs.joomla.org/Adding_JavaScript)   
```
	// this style worked for me see below
	JHtml::_('script', 'com_example/example.min.js', array('version' => 'auto', 'relative' => true));

	JHtml::script(Juri::base() . 'templates/custom/js/sample.js');

	$doc->addScript('templates/'.$this->template.'/js/fancy-script.js');
```

[Is there a way to add rel='preload' using addScript/addStyleSheet?](https://joomla.stackexchange.com/questions/23778/is-there-a-way-to-add-rel-preload-using-addscript-addstylesheet)   

```
  $scriptLoc = JUri::base() . "components/com_arc/xfiles/js/dist/test.chunk.js";
  // $fileLink->addScript($scriptLoc);

  $fileLink->addHeadLink($scriptLoc, 'preload', 'rel', array('as' => 'script'));
  JHtml::_('script', 'test.chunk.js', array('version' => 'auto', 'relative' => true));
```
**failed**

> actually ...
```
	$fileLink->addHeadLink($scriptLoc, 'preload', 'rel', array('as' => 'script'));
```
worked, but i need to research more to know - i think im missing a part

[<link rel=”prefetch/preload”> in webpack](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)   
> webpack 4.6.0 adds support for prefetching (and preloading).

**Multiple magic comments hint**
>I already have a magic comment at import(). Can I add multiple magic comments?
Yes, either separated with , or in separate comments:

```
	import(
	  /* webpackChunkName: "test", webpackPrefetch: true */
	  "LoginModal"
	)
	// or
	import(
	  /* webpackChunkName: "test" */
	  /* webpackPrefetch: true */
	  "LoginModal"
	)
	// spacing optional
```

[mozilla preloading content docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)   

> this works but not a what i need - its a regular script
```
	JHtml::_('script', $scriptLoc, array('version' => 'auto', 'relative' => true));
```

#### GOTCHA: [Uncaught (in promise) Error: Loading chunk # failed.](https://github.com/webpack/webpack/issues/7502)   
> try adding a path?

```
	output: {
    chunkFilename: '[id].[hash].js',
    // https://reactjs.org/docs/cross-origin-errors.html
    crossOriginLoading: "anonymous",
    filename: '[name].[hash].js',
    path: path.resolve(__dirname,'js', 'dist'),
  },
```
**failed**

> try public path

[Added publicPath to output ](https://github.com/webpack/webpack.js.org/pull/2420)
```
	publicPath: 'dist/'
```

[What does “publicPath” in Webpack do? - (article)](https://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do)   

> By using /assets/, the app will find webpack assets at: http://server/assets/. Under the hood, every urls that webpack encounters will be re-written to begin with "/assets/".

```
	src="picture.jpg" Re-writes ➡ src="/assets/picture.jpg"

	Accessed by: (http://server/assets/picture.jpg)

	src="/img/picture.jpg" Re-writes ➡ src="/assets/img/picture.jpg"

	Accessed by: (http://server/assets/img/picture.jpg)
```

[webpack Public Path docs](https://webpack.js.org/guides/public-path/)   

```
	...
		publicPath: 'components/com_arc/xfiles/js/dist/'
	...
```
**works**

what about using path.resolve?
```
	publicPath: path.resolve(__dirname,'js', 'dist'),
```
**fails**
> returns: C:/xampp/apps/joomla/htdocs/components/com_arc/xfiles/js/disttest.chunk.js

### [Webpack Bundle analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)   

my test
```
	var webpack = require("webpack");
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

	module.exports = {
		...

		  plugins:[
		    new BundleAnalyzerPlugin(),
				new webpack.ProvidePlugin({
```

#### dynamic CDN with dynamic-cdn-webpack-plugin
[How To Reduce Your Bundle Size By Automatically Getting Your Dependencies From A CDN](https://medium.com/comparethemarket/how-to-reduce-your-bundle-size-by-automatically-getting-your-dependencies-from-a-cdn-96b25d1e228)   
	install
		html-webpack plugin
		dynamic-cdn-webpack-plugin
		module-to-cdn

```
	npm install --save-dev dynamic-cdn-webpack-plugin module-to-cdn html-webpack-plugin
```

how it works: it takes all the require/import statements and creates a script tag in webpacks index.html file linked to a unpkg cdn package

it reduces the size of the bundle without having to create a vendor bundle

#### GOTCHA: **for DynamicCdnWebpackPlugin to work:
- package.json/node_modules must have the dependencies
- externals must be commented out
otherwise the ./dist/index.html files wont have the dynamic cdn scripts**
> externals can be turned back on after the scripts are created

webpack.config.js
```
	plugins:[
    /*new BundleAnalyzerPlugin(),*/
    new webpack.ProvidePlugin({
      /*$ : "jquery",
      jQuery : "jquery",*/
      React : "React",
      ReactDOM : "ReactDOM",
      axios: "axios",
      makeUp:path.join(__dirname,'js','lib','upload.js')/* this works */,
      test:path.join(__dirname,'js','lib','test.js')/* this works */,
      test2:path.join(__dirname,'js','lib','test2.js')/* this works */
    }),
    new webpack.SourceMapDevToolPlugin(prodObj),
    new MiniCssExtractPlugin({
        filename: "bundle.css"
    }),
    new HtmlWebpackPlugin(),
    new DynamicCdnWebpackPlugin()
  ],
```
**idk if i need the react and ReactDOM in the webpack.ProvidePlugin section**
eventually you will have to go to the output folder and copy the script links and add to your html file
> webpack.ProvidePlugin section eliminates the need to write import statements

**GOTCHA: had to add localhost to cors whitelist**
```
	var whitelist = [
	  'https://sunzao.us',
	  'https://www.sunzao.us',
	  'https://beta.sunzao.us',
	  'http://localhost:3000'
	];
```
**origin will read localhost**

#### read the req.body property
```
	router.post('/', cors(corsOptions), passportJWT, (req, res) => {

	...
	  console.log("[req.body]",req.body);// {task: "validate_token"}
	...

	}
```
## SEE ALSO 'code splitting.md'

#### GOTCHA: i believe there was a problem with babel and require so i put it in the vendor chunk

#### GOTCHA reactivate externals
once DynamicCdnWebpackPlugin has helped add cdn files to the dist/index.html file re-activate the externals otherwise

>ERROR in ./js/lib/mainStore.js
Module not found: Error: Can't resolve 'mobx' in ...

```
	externals: {
    /*@ comment out externals for/to create DynamicCdnWebpackPlugin scripts in ./dist/index.html file */
    'react': 'React',
    'react-dom':'ReactDOM',
    'mobx':'mobx',
    'axios':'axios'
    // jquery: 'jQuery'
  },
```


#### a quick lazy load template
set_form_controls.js > arc_add_info.onclick
```
  arc_add_info.onclick = async function(){

    const form = await import(/* webpackChunkName: "form" */ '../form/form.js');
    await form.get_info_form({"mod":"add","view":this.dataset.view},{state});

  }
```
**put the import load behind a user interaction**
