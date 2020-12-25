# my jsdoc workflow

- follow jsdoc notes.md for setup notes

## the main value i can get out of docs
1. is be able to link forward and backwards the related fns
>it gives me a chance to trace through my files to pinpoint the relevant files pertaining to the task   

2. is to be able to document difficult process sequences
> - helping me remember the theory behind difficult code

### once setup my usecase workflow
- use require to link forward
```
  @requires mainStore
```
- use see and link to link back (who called this fn)
```
  @see [user (link-back)]{@link module:user}
  @see [user-prefs (link-back)]{@link module:user-prefs}
```
- use desciptions to create robust in-section README style files documents (i can even use html elements with classes and style the classes using docs.scss)

### the biggest challenge
> is using comments that show up in the documentation

**List of callback experiences**

| tag             | page | in-docs | notes                                                                |
|--               |--    |--       |--                                                                    |
|callback         |same  | yes     |                                                                      |
|module           |same  |yes      | can mis-name without adding name - doesn't render info without desc  |
|class            |same  |yes      |                                                                      |
|var              |same  |yes      | wont render without name                                             |
|inner            |n/a   |no       | doesn't render without using name item-name                          |
|memberof         |n/a   |no       | makes whatever member you were referencing disappear from the docs   |
|link             |n/a   |yes      | underscores break links. links are tricky, need to be exaclty like html address output to be picked up (follow templates) - may need module:name |
|see              |n/a   |yes      | works only the class which needed @class classname & @constructs classname add link to work with anything else   |
|requires         |same  |yes      | works like link                                       |

**without descriptions the in-doc render is limited to the title (no other tags displayed)**

#### my basic workflow template for each page
```
  /**
   * @module Docs
   * @category Docs
   * @subcategory js
   * @desc docs js insertion
   * @return {void}
   */

  /**
   * @file
   */
```
#### GOTCHA: **file above** - if you put the file above the module definition the README link won't have a blue active link element or moduleName attached (just a url)

#### GOTCHA: **naming conflicts** - if you name 2 modules the same name even with different categories jsdoc will combine the doc in one file under one category

#### GOTCHA: underscores break links to namepaths
```
  require action_msg fails
  require action-msg works
```


mainStore.js
  class method
```
  /**
   * method for config owners preferred publicly visible sections
   * @method
   * @param {array} sAry section array
   * @param {string} hm which section in the array is the home section
   */
  @action set_sections = (sAry = ["recent"], hm = "") => {
```
- no name added to method but name appeared
- without @method it appeared as a member without params

```
  /**
   * @callback set_sections
   * @param {array} section_array
   * @see mainStore
   * @see {@link module:action-msg}
   */
  mainStore.set_sections(my_results.section_views);// works - i can access the state this early and outside of react
```
- see works with a class - has to match url path
- see works with link. module-action-msg (matches url) does not work written this way. module:??? works instead.

#### GOTCHA: failing to name module properly
```
    /**
     * details and Arc view default item display
     * @category Paper
     * @module
     * @param {object} props reactjs component props
     */
    const Clips = (props)

    //added: @module clips
```
> named: xfiles/js/lib/elements/Clips/Clips

#### GOTCHA: var without a name is not showing
```
  /**
   * modifies the default text_only if the img_url is empty - otherwise localhost is not showing error when using img.src=""
   * @var
   * @type Boolean
  */
 let initial_text_only = (img_url == "") ? true : text_only;

 //added: @var initial_text_only
```

#### GOTCHA: module without desc didn't render in docs
```
  /**
   * @external paper-starter
   * @desc can i run Paper without item_data?
   * @param {object} object
   * @return {void}
   */
  paper_starter({home: "paper_cont" /*"paper_header_cont"*//*li_liteBoxFront_id*/,prefix: "arc_", state: mainStore })

  added:
  /**
    * some desc text
    * @external ...
```

#### I wanted to reference a module's fn
paper_starter.js
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
   * @see [App (link-back)]{@link module:App}
   * @return {void}
   */
  export const paper_starter = (data_obj) => {

  failed @see [App (linkback)]{@link module:App#~paper-starter}
  failed @see [App (linkback)]{@link App#~paper-starter}
  failed @see [App (linkback)]{@link module:App.method:paper-starter}
```
> i still can't get see to use anchors to select the correct page position but i can at least link back to the page

referenced in app.js
```
  /**
   * @category Paper
   * @method paper-starter
   * @desc can i run Paper without item_data?
   * @param {object} object
   * @requires paper-starter
   * @return {void}
   */
  paper_starter({home: "paper_cont" /*"paper_header_cont"*//*li_liteBoxFront_id*/,prefix: "arc_", state: mainStore })
```

todo needs multiple todos
```
  /**
   * @callback render
   * @param {string} data.use_local_files response data boolean value for local assets
   * @param {object} data.data contacted hosts core data - should include prefs and presets
   * @todo change dummy data to real data
   * @todo does this work?
   */
```

#### writing only comments
```
  /**
   * @member if-No-Page-Array-Items
   * @desc
   * **fix** for broken item id's in the url - so the app doesn't hang/break <br>
   * if im at the end and still nothing happened - reset paperStore <br>
   * update the url with history.pushState <br>
   * clear the papaer_cont from all react contents so clicking on items runs Paper component not Piece component
   */
```

#### documenting an object
```
  /**
   * @var query
   * @type {Object}
   * @property {string} user_id takes the host_id
   * @property {string} ancestor if it exists (which is now always should get the item_ancestor variable)
   * @property {string} item_type media, info or group
   * @example let query = { user_id: host_id, ancestor: {$exists: true, $eq:item_ancestor}, type: item_type };
   * @mixes 'query.text'
   * @mixes 'query.data_type'
           */
```

#### use a typedef for callback and fn object params
```
    /**
     * @typedef myData
     * @type {object}
     * @prop {array} active_filters  (4) ["folder", "link", "text", "image"]
     * @prop {string} ancestor "5e7225db2f6d4006fb704c15"
     * @prop {string} data_mode "full"
     * @prop {string} display_data "media"
     * @prop {object} host_data {user_id: "5e7225db2f6d4006fb704c15"}
     * @prop {number} limit 20
     * @prop {boolean} root
     */

    // used like this:
    /**
     * @module get-data
     * @category Request
     * @desc get data request
     * @param  {myData} myData  user data object
     ...
```

####
note description
```
/**
 * @inner
 * @name note-name
 * @desc
 * # note title <br>
 * <br>
 * <p>note body text </p>
 * <br>
 * <code>//code example </code>
 */
```

### creating file overviews in the home doc page
```
   /**
    * @module Oauth-SignIn
    * @category Auth
    * @subcategory init
    * @desc some desc
    */

   /**
    * @file
    */

  /**
   * @class Oauth-SignIn
   * @extends Component
```
**creating a mdule inside the class file give the file tag a modules name and linkback to the file. classes don't show names and don't link back**
**keep file tag separate so the entire element block doesn't appear in the home doc page**
> file tags on the home page also shows the filepath - i don't need "outputSourceFiles" : true anymore
