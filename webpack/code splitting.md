[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)   
[As of webpack v4 the CommonsChunkPlugin is deprecated.](https://stackoverflow.com/questions/49017682/webpack-4-migration-commonschunkplugin)   
**replaced by**
[splitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)    
[migrating to splitChunks - has a good splitchunks example](https://gist.github.com/gricard/e8057f7de1029f9036a990af95c62ba8)   
[splitChunks video](https://www.youtube.com/watch?v=sX_6ezKfvn0)   
[nice splitChunks article](https://engineering.wingify.com/posts/demystifying-split-chunks-plugin/)   
> i don't know if its nice   

[Webpack and Dynamic Imports: Doing it Right](https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234)   
**Lazy, lazy-once, eager, weak**
[](https://wanago.io/2018/08/20/webpack-4-course-part-eight-dynamic-imports-with-prefetch-and-preload/)   
**webpackInclude and webpackExclude**


[<link rel=”prefetch/preload”> in webpack](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)   


[Webpack (v4) Code Splitting using SplitChunksPlugin](https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)



**forget about trying to use this format it doesn't work like this**
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

**i tried using a condensed version of the one above for vendors**
```
    optimization:{
      splitChunks:{chunks:'all'}
    },
```
> outputs vendors~main.chunks.js
> otherwise its commented out - i guess to use a customized vendor i would use the top (more robust) version

**im not sure why these brackets are used in the test**
[i found a hint about the regex brackets](https://github.com/webpack/webpack/issues/2073)   
**they basically mean either \ or /, but i do think its written wrong it should be [\\\/]**
```
test: /[\\/]node_modules[\\/]/,
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
>name without chunkFilename = vendor.app.bundle.js
with chunkFilename = vendor.bundle.js

*_i finally removed the '.app.'_*


My split test
dep: tools.js && test_split.js
```
  export const code_splitter = async function(){

      console.log("entering user_prefs fn!");

      const {get_user_prefs} =  await import(/* webpackChunkName: "test" */ '/alight/xfiles/js/dist/test_split');

      let mesee = 1;
      return get_user_prefs();
  };
```

#### GOTCHA: test.chunk failure
```
  Uncaught (in promise) Error: Loading chunk test failed.
(missing: http://localhost:3000/path/xfiles/js/dist/test.chunk.js)
```
**it skips from the origin to the relative path - missing the path from the origin dir**
**the key to fixing this error was to update the public path**

```
  output: {
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname,'js','dist'),
      publicPath: 'alight/xfiles/js/dist/'
  },
```

test_split.js
```
  export default function split(txt){
    console.log("split running!");
    console.log(`split ${txt}`);
    try{console.log(`split ${txt} makeContact = `,makeContact);}catch(err){console.log(err);}

    return "code from test.js"
  }

  export const Some_split_function = function(){
    return "some string of whatever";
  }

  export const another_split_function = function()
  {
    let ext_str = Some_split_function();
    let new_str = `some string of someting else. ${ext_str}`;
    return new_str;
  }//something_else

```

tools.js
```
  export const code_splitter = async function(){

      console.log("entering user_prefs fn!");

      const split =  (await import(/* webpackChunkName: "split" */ './test_split')).default;

      const { Some_split_function, another_split_function } =  await import(/* webpackChunkName: "split" */ './test_split');

      let mesee = 1;
      split("I'm about to split!");
      console.log(another_split_function());
      return;
  };
```
**to use the default export i had to import and call the default (and wrap in parenthesis)**
```
  const split =  (await import(/* webpackChunkName: "test" */ './test_split')).default;
```
**to call the others i can use brackets**
```
  const { Some_split_function, another_split_function } =  await import(/* webpackChunkName: "test" */ './test_split');
```

#### Loading
> right now its loading regularly after bundle.js - i want to see if i can get it to load last after a click event.

#### On demand test
arc_site_webpack.js
**split.chunk.js**
```
	document.addEventListener("click",async function () {
		console.log("running the splitter");
		code_splitter();

	});
```
**this works***

```
  	document.addEventListener("click",async function () {
  		console.log("running the splitter");
  		// code_splitter();
  		const split =  (await import(/* webpackChunkName: "split" */ './lib/test_split')).default;
  		const { Some_split_function, another_split_function } =  await import(/* webpackChunkName: "split" */ './lib/test_split');

      let mesee = 1;
      split("I'm about to split!");
      console.log(another_split_function());
  	});
```
**this works**

#### GOTCHA: this does actually load only after click - i probably need a loading msg though
other variations
```
	document.addEventListener("click",async function () {
		console.log("running the splitter");

		import(/* webpackChunkName: "split" */ './lib/test_split').then(
			(split) => {
				    let mesee = 1;
				    split.default("I'm about to split!");
				    console.log(split.another_split_function());
			}
		)//import

	});
```

this time i want to see if it will make test_split.js the actual chunk
```
	document.addEventListener("click",async function () {
		console.log("running the splitter");

		import('./lib/test_split').then(
			(split) => {
				    let mesee = 1;
				    split.default("I'm about to split!");
				    console.log(split.another_split_function());
			}
		)//import

	});
```
> I think test_split.js is the actual chunk but not using the actual file. and the fine name is non-descriptive using zero.chunk.js    

**this produces 0.chunk.js**

#### GOTCHA: webpackChunkName isn't working
i think its because i don't have all the instances of the entrypoint wrapped up with the 'webpackChunkName' magic comment
i had to go through the files and search for form.js and eventually form_display.js. im not sure why i had to do form_display.js but i think its because it had a reference to form.js (circular reference if you ask me - both files refer to each other)

#### simple example
```
  const form = await import(/* webpackChunkName: "form" */ '../form/form.js');
  await form.get_info_form({"mod":"add","view":this.dataset.view},{state});
```

## Prefetch/Preload
[<link rel=”prefetch/preload”> in webpack](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)   

#### I already have a magic comment at import(). Can I add multiple magic comments?
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
**this is what I'm looking for**

#### GOTCHA: [im running into a toposort issues](https://github.com/marcelklehr/toposort/issues/20)   
[google search: throw new error('cyclic dependency' + noderep)](https://www.google.com/search?q=where+to+add+chainWebpack&oq=where+to+add+chainWebpack&aqs=chrome..69i57.2412j0j7&sourceid=chrome&ie=UTF-8)   

[Lazy loading routes Error: Cyclic dependency #1669](https://github.com/vuejs/vue-cli/issues/1669)   
```
  This seems to be a problem with a dependency of the html-webpack-plugin, named toposort:

  Not much we can do about this...
```

#### The fix
[the fix came all the way from asia](https://www.jianshu.com/p/db133e1f5a00)
```
  new HtmlWebpackPlugin({chunksSortMode:"none"}),
```
**i added chunksSortMode:"none"**

#### GOTCHA: react-dom.development.js:14894 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
> react doesn't like me adding webpackChunkName objects where i would usually have a fn

```
  atcName_events.onClick = {
    // callout:attach_data,
    callout:stay_together,
```
**so i add a callout fn instead that runs the webpackChunkName inside it**
```
    // im using this to help me make move data a chunk.js file
    // i needed to use event.persist in the box element to be able to pass an event to another fn
    export const stay_together = async function(e,eID,obj)
    {
      let evt = e;
      const {attach_data} = await import(/* webpackChunkName: "move" */ './attach_data.js');
      let meseeks = "set breakpoint";
      attach_data(evt,eID,obj);
    }// stay_together
```

#### GOTCHA: Warning: This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property `target` on a released/nullified synthetic event. This is set to null. If you must keep the original synthetic event around, use event.persist().

```
  let icon_click = (e.target.
```
**caused e.target to be undefined**

[event pooling](https://reactjs.org/docs/events.html#event-pooling)
> i needed to use event.persist in the box element to be able to pass an event to another fn
```
  event_obj[action] = (e) => {
    e.persist()
```
#### save webpackChunkName to folders
```
  const BasicProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Basic" */ `./BasicProfile`));

  const SomeProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Some" */ `./SomeProfile`));

  const AnotherProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Another" */ `./AnotherProfile`));
```
**create directories by adding them 'without leading slashes'**
[Specify output directory with dynamic import](https://github.com/webpack/webpack/issues/5401)   
