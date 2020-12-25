jsdoc notes

initiate a package.json file (if not one)
```
  npm init -y
```

install jsdoc
```
  npm i -D jsdoc
```
**you can skip this step if you use npx in the package.json scripts**

create a config file (to avoid using default configurations)
```
  touch jsdoc.json
  echo > jsdoc.json
```

jsdoc.json
```
{
  "source":{
    "include": ["src"],
    "includePatern":".js$",
    "excludePattern":"(node_modules/|docs)"
  },
  "plugins":["plugins/markdown"],
  "templates":{
    "cleaverLinks": true,
    "monospaceLinks": true
  },
  "opts":{
    "recurse": true,
    "destination": "./js/dist/docs/"
  }
}
```
- source: is where jsdoc is going to look - it could be multiple folders in the array.
- include: .js files - i will make this more i think
opts > destination: - is my destination folder

create run script in package.json
```
  scripts: {
    "doc": "jsdoc -c jsdoc.json"
    "docs": "npx jsdoc -c jsdoc.json"
  }

  then use npm run docs - or create a docs alias
```
**i used npx in the script instead of installing a -D dev dependency and then running the script.**


adding variables to the docs
```
    /**
     * some description for iUN
    * \@var {string} iUN2
    */

   /** \@var {string} iUN2 */
```
**both work**

```
  /**
   * \@member modal_home
   * \@type {Object} modal_home selects the modal home DOM element
   * \@example let modal_home = document.querySelector(`${home}`);
   */

  /**
   * \@var modal_home
   * \@property {Object} modal_home selects the modal home DOM element
   * \@example let modal_home = document.querySelector(`${home}`);
   */
```

what about inline with description
```
  /** \@var {string} iUN2 some description for iUN */
```
**still works**


#### best practice for documenting the constructor

using constructs
```
  /**
   * Actions constructor
  * \@constructs Actions
  * \@param {Object} props component props
  * \@param {Object} props.data data object prop
  * \@param  {Object} props.data.state                         app state object (store)
  * \@param  {String} data.message                       message to the viewer
  * \@param  {String} data.name                          unique identifier string
  * \@param  {Number} [data.iUN=Math.round(Math.random() *             10000)] individual unique number
  * \@param  {Number} [data.seconds]                       [description]
  * \@param  {Number} [data.sec]                           [description]
  * \@param  {Boolean} [data.auto]
  */
```
**mostly works - works the best so far. i don't like the way it writes prep_vars method twice and adds the class separately in
a section below**

using \@lends
```
  /**
   * Actions constructor
  * \@lends Actions
  * \@param {Object} props component props
  * \@param {Object} props.data data object prop
  * \@param  {Object} props.data.state                         app state object (store)
  * \@param  {String} data.message                       message to the viewer
  * \@param  {String} data.name                          unique identifier string
  * \@param  {Number} [data.iUN=Math.round(Math.random() *             10000)] individual unique number
  * \@param  {Number} [data.seconds]                       [description]
  * \@param  {Number} [data.sec]                           [description]
  * \@param  {Boolean} [data.auto]
  */
```
**failed**


#### better-docs custom template
```
  {
    "source":{
      "include": ["js"],
      "includePatern":".js$",
      "excludePattern":"(node_modules/|docs)"
    },
    "plugins":[
      "plugins/markdown",
      "node_modules/better-docs/category"
    ],
    "opts":{
      "recurse": true,
      "destination": "./js/dist/docs/",
      "template": "node_modules/better-docs"
    },
    "tags": {
      "allowUnknownTags": ["category"]
    },
    "templates": {
          "cleverLinks": true,
          "monospaceLinks": true,
          "search": true,
          "default": {
              "staticFiles": {
                "include": [
                    //"./docs-src/statics",
                    "./images/flame\@xs.png",
                    "./css/docs.css"
                ]
              }
          },
          "better-docs": {
              "name": "Alight Documentation",
              "logo": "flame\@xs.png",
              "title": "some title", // HTML title
              "css": "docs.css",
              //"trackingCode": "tracking-code-which-will-go-to-the-HEAD",
          "hideGenerator": false,
              "navLinks": [
                  {
                      "label": "Github",
                      "href": "https://github.com/inspectaTech/alight"
                  },
                  {
                      "label": "Example Application",
                      "href": "https://sunzao.us/core"
                  }
              ]
          }
      }
  }

```

#### my better-docs custom template mods (VANILLA)

docs.scss
```
  $mp: !important;
  body{
    font-size: 15px !important;
  }

  .core{
      font-size: .8rem $mp;
      h1{font-size: 1.6rem $mp; }
      h2{font-size: 1.4rem $mp; }
      h3{font-size: 1.2rem $mp; }
      h3{font-size: 1rem $mp; }
      h5{font-size: .8rem;}
      p{font-size: .8rem $mp; margin-bottom: .5rem;}

      .description p{font-size: 1rem;}
      .code-name{
        font-size: 1.2rem $mp;
      }
      .details a{height: unset $mp; padding: .25rem .5rem;}
      .method-parameter {
        font-size: .9rem;
      }
      .tag-source span a{color: #a6a6c4;}
      .members{
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(200px, 1fr));
        gap: 1rem;
        .member{
          display:grid;
          grid-template-areas: "h4 span" "description description" "h5 h5" "table table" "h52 h52"  "example example" "details details";
          border-radius: 7px;
          border: 1px solid #dee1e5;
          // box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
          // box-shadow: 4px 4px 7px 2px rgba(0,0,0,0.2);
          padding: 1rem;
          &>span{ grid-area: span;}
          &>h4{grid-area: h4;}
          &>h5:nth-of-type(1){grid-area: h5;}
          &>h5:nth-of-type(2){grid-area: h52;}
          .prettyprint{grid-area: example;}
          .table-container{grid-area: table;}
          .description{grid-area: description;}
          .details{grid-area: details;}

          &:after{display: none;}
          /*the h5s mess it up - theyre too variable*/
        }
      }
  }
  .table-container{font-size: .8rem;
    tr th{
      font-size: .9rem;
      &:nth-child(4){background: green; max-width:20px;};
    }
    td.name code, td p{font-size: .8rem;}
  }

  .logo{
    display: flex;
    align-items: center;
    img{
        width: 1.5rem;
    }
  }
  #main{
    .sidebar, .side-nav{
      width: 10rem;
      padding: 1rem;
      font-size: .8rem;
      /*hide-scroll*/
      -ms-overflow-style: none;
      scrollbar-width: none;/*hides in firefox*/
      &::-webkit-scrollbar{
        display: none;
      }
    }
    .sidebar{
      .search-wrapper{
        margin: 0 0 .5rem;
      }
    }
  }

```

#### better links \@see and \@requires
> \@see and \@requires and {\@links name} seem to work better when you reference the item using  memberof on one of its member items
```
  /**
   * \@var modal_home
   * \@memberof wrapr
   * \@property {Object} modal_home selects the modal home DOM element
   * \@example let modal_home = document.querySelector(`${home}`);
   */
  let modal_home = document.querySelector(`${home}`);// input should include . or #
```
**\@memberof makes whatever member you were referencing disappear from the docs - im trying a dummy \@memberof at the bottom
without referencing anything just so \@see will work**
> this idea worked but has the same results as above - the members aren't displayed and the modal is changed to a namespace



#### How do i write notes? can i use \@description?
- i can use @description but it has to be attached to a comment block that describes a @member or some documented element

#### GOTCHA @see
i got @see to work again by removing @requires and limiting @see to only the class (which needed @class classname & @constructs classname)


#### using multiple requires
```
    /**
     * \@requires Item
     * Pref
     */
    // this fails

     /**
      * \@requires Item
      * \@requires Pref
      */
     // works
```
**requires \@requires prefix**

#### [force newlines (line breaks) in jsdoc](https://stackoverflow.com/questions/28245463/how-to-force-newlines-in-google-apps-jsdoc-descriptions)   
>3 spaces worked in \@example but not in \@description

using pre tags
```
   * <pre>
   * an array of arrays.<br>
   * -1 is the same as desc or descending order.<br>
   * '1' is the same as asc or ascending order (from low to hight)<br>
   * </pre>
```
**works**

using br tags
```
   * an array of arrays.
   * -1 is the same as desc or descending order.
   * '1' is the same as asc or ascending order (from low to hight)
```
**works**

using extra enters
```
   *
   * an array of arrays.<br>
   * -1 is the same as desc or descending order.
   * '1' is the same as asc or ascending order (from low to hight)
   *
```
**failed (execpt for single break tag)**

#### adding your own javascript file
>there was no simple way to do this by simply referring to your js file in the jsdoc.json
- create your js file
- create your layout.tmpl or whatevername.tmpl file
- go to your current templates layout.tmpl file and copy its contents
**my file was located in node_modules/better-docs/tmpl/layout.tmpl**
- paste the copied contents into your new \*.tmpl files
- add a script tag to the js files you want to include
- include the js file in the templates['default']['include'] section of your jsdoc.json file
- add the .tmpl file to templates['default']['layoutFile']
```
  "default": {
      "staticFiles": {
        "include": [
            //"./docs-src/statics",
            "./images/flame@xs.png",
            "./docs/docs.css",
            "./docs/docs.js",
        ]
      },
      "layoutFile" :"./docs/docs.tmpl",
      "outputSourceFiles" :false
  },
```

#### Using other filenames for layout.tmpl
**alternative names for layout.tmpl does work - you can name this file whatever.tmpl as long as you point to it
with "layoutFile": fileName.tmpl**


#### [live-reloading instructions](https://github.com/jsdoc/jsdoc/issues/1608)    
[change jsdoc.json file to jsdoc.js file](https://jsdoc.app/about-configuring-jsdoc.html#configuration-file-formats)   
```
  module.exports = {
    same-json-data:""
  }
```
**these instructions are horrible, but they did give me a great lead**

#### alias tests and progressions
```
  alias docs='npm run docs'

  alias watch-docs="npx nodemon --exec 'npm run docs' --watch ./js/lib/dist"
  alias wdocs='watch-docs'

  alias live-docs='npx live-server --wait=5000 --open=docs/dist/ --watch=docs/dist/'
  alias ldocs='live-docs'

  alias xdocs='ldocs & wdocs'

```

#### [bash's job control](https://www.digitalocean.com/community/tutorials/how-to-use-bash-s-job-control-to-manage-foreground-and-background-processes)   
using the '&' after a command runs the command in the background

> alias live-docs2='npx livereload ./docs/dist/index.html' // failed

**see notes/cli/bash job control.md**

#### if live reloading works but results are outdated
use --wait=MS (milliseconds)
```
  npx live-server --wait=5000 --open=docs/dist/ --watch=docs/dist/
```
**wait made things worse**

so now magically its working. i don't know how. it was behind my changes, now its on time. was it because i made changes before the first render? idk - nope it just works now. maybe i was changing and checking to fast?

#### package.json scripts
```
    "scripts": {
      "docs": "npx jsdoc -c jsdoc.json",
      "watch:jsdoc-src": "npx nodemon --exec \"npm run docs\" --watch ./js/lib/dist/",
      "watch:jsdoc-output": "npx live-server --open=docs/dist/",
      "watch-out": "npx nodemon --exec \"npm run docs\" --watch ./js/lib/dist/",
      "watch-server": "npx live-server --open=docs/dist/ --watch=docs/dist/",
      "watch:jsdocs": "npm run watch:jsdoc-output & npm run watch:jsdoc-src",
      "watch-live": "npx concurrently \"npm run watch-server &\" \"npm run watch-out\""
    },
```
### GOTCHA: npm run watch-live issue
- nodemon is not detecting changes like it does when i run this outside of the package.json

lets try no background - concurrently may not need it

i tried running the docs command in the bg
```
  "watch-out": "npx nodemon --exec \"npm run docs &\" --watch ./js/lib/dist/",
```

i tried adding the nodemon code in more directly but couldn't get past the double escapes
```
  "watch-live": "npx concurrently \"npx nodemon --exec \\"npm run docs &\\" --watch ./js/lib/dist/\" \"npm run watch-server\""
```
**both failed**

the practical action here is to just run the scripts in the alias - not package.json

escaping single quotes in json?
```
  "watch:jsdoc-src": "npx nodemon --exec \'npm run docs\' --watch ./js/lib/dist/",
```
**also failed**

i tried grouping the commands
```
  "watch-live": "(npx concurrently \"npm run watch-server &\" \"npm run watch-out\")"
```

what about without concurrently
```
  "watch-live": "(npm run watch-out & npm run watch-server 8)"
```
**nope trying this only ran one process**

## ULTIMATELY  if i don't want to muddy up the global alias space
> i can add my docs alias' to a local .bash_rc file
then i have to make the extra step to re-initialize the file in the new terminal
```
  . .bashrc
```
> then i can use the alias

####GOTCHA: moving to .bashrc failed
moving back to .bash_profile worked

#### i want nodemon to watch more
```
  alias watch-docs="npx nodemon  -e js,css,hbs --exec 'npm run docs' --watch
./js/lib/dist --watch ../controllers -- watch ../routers -- watch
./docs/docs.js --watch ./docs/docs.css --watch ../views"

```
**add --watch for each item or directory that you want to watch**

#### nodemon tracking extensions
```
  -e js,css,hbs
```
> use -e and a comma separated string of extensions (no-spaces)

#### i want to link backward in the stack
```
  /**
   * @module paper-starter
   * @desc some desc text
   * @category Paper
   * @subcategory Init
   * @param  {object} data_obj
   * @param {string} data_obj.home
   * @param {string} data_obj.prefix
   * @param {object} data_obj.state
   * @example paper_starter({home: "paper_cont",prefix: "arc_", state: mainStore });
   * @see [App (linkback)]{@link module:App}
   * @return {void}
   */

  @see {@link App#paper-starter}
```
**any variations or link 'App' failed - i needed module:App**

### when it goes somewhere use require and when it came from somewhere use link

#### can todo use multiple lines? n
```
/**
 * @todo
 * change dummy data to real data <br>
 * does this work?
 */

/**
 * @todo change dummy data to real data <br>
 * @todo does this work?
 */
```
**not really - it puts everything on one line despite having a break**
