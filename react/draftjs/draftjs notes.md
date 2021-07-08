
notes.js
```
    import React, { useEffect, useState, useContext, Fragment, useRef } from 'react';
    import { observer, inject } from "mobx-react";
    import {FormContext} from '../../formContext';
    require("./Note.scss");
    import { Editor, EditorState } from 'draft-js';
    import { useForm } from 'react-hook-form';

    const Note = observer( props => {

      let init = useRef(false);
      let input_el = useRef();

      const FormStore = useContext(FormContext);
      let data = FormStore.item_data;

      const form_data = props.data.form;

      // is this a global register or a local one - do i have to pass register as props
      const { register, getValues, setValue } = form_data;

      const [draftEditor, setDraftEditor] = useState(EditorState.createEmpty());

      if(init.current == false){

        init.current = true;

      }// init.current

      let iUN = Math.round(Math.random() * 10000);

      const update_editor = (dE) => {
        setDraftEditor(dE);
      }

      return (
        <Fragment>
          <Editor editorState={draftEditor} onChange={update_editor} />
        </Fragment>
      );
    });//observer

    export default Note;

    const exists = (item) => {
      return (item != null && typeof item != "undefined" && item != false && item != "") ? true : false;
    }
```

notes.scss

```
  .DraftEditor-root{
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem;
    max-height: 15rem;
    overflow-y: auto;

    .DraftEditor-editorContainer{
    }

    div[class*="DraftEditor-content"]{
      // border: 1px solid red;
      min-height: 100px;
    }
  }

```

handle key command - lets you use ctrl-B for bold and ctrl-I for italics
```
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(draftEditor, command)
    if (newState) {
        update_editor(newState);
        return 'handled';
    }
    return 'not-handled';
  }//handleKeyCommand
```

```
  onItalicClick = () => {
    update_editor(RichUtils.toggleInlineStyle(draftEditor, 'ITALIC'))
  }
```

#### GOTCHA: [Clicking on styling button steals focus from editor, sometimes doesn't apply style to document](https://github.com/facebook/draft-js/issues/696)   
>I'm having similar issue. It seems that onMouseDown (with preventDefault) preserves the focus selection , but onClick have a different behavior.
```
  let toolbar_btns = constants.map((item, ndx) => {
    return (
      <div className={`draft_style_btn ${item.type}-btn ${isActive(item.style)}`}
      onMouseDown={function(e){e.preventDefault(); applyStyle(item.style)}}
      key={`${item.type}_${ndx}`} >
        <em>{item.icon}</em>
      </div>
    )
  });
```
**fixed with onMouseDown instead of onClick**

#### [convertToRaw](https://youtu.be/0k9suXgCtTA)   
time: 8:50
```
  import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

  ...

  const raw = convertToRaw(EditorState.getCurrentContent());// this creates an object

  return (
    <div>
      {JSON.stringify(raw)}
    </div>
    );
```

#### [GOTCHA: placeholder takes up 2 lines (should only take one)](https://github.com/facebook/draft-js/issues/403)   
[fix (github gist)](https://github.com/facebook/draft-js/blob/67c5e69499e3b0c149ce83b004872afdf4180463/src/component/base/DraftEditorPlaceholder.css)
```

  .public-DraftEditorPlaceholder-root {
    color: var(fbui-desktop-text-placeholder);
    position: absolute;
    z-index: 0;
  }

  .public-DraftEditorPlaceholder-hasFocus {
    color: var(fbui-desktop-text-placeholder-focused);
  }

  .DraftEditorPlaceholder-hidden {
    display: none;
  }

```
#### [focus the editor by clicking the placeholder](https://www.javascripting.com/view/draft-js)   
> ctrl - f find: focus on the webpage
```
  useEffect(() => {
    let editor_root = entry_ref.current.querySelector(`.DraftEditor-root`);
    let placeholder = editor_root.querySelector(".public-DraftEditorPlaceholder-inner");

    if(placeholder && !placeholder.classList.contains("ready")){
      placeholder.classList.add("ready");
      placeholder.addEventListener("click",() => {
        if(display_console || true) console.warn(`[Entry] focus has been called`);
        // entry_ref.current.focus();// this isn't the ref to the actual editor
        domEditor.current.focus();
        // draftEditor.focus();// failed
      })
    }// if
  })

  return (
    <Editor editorState={draftEditor}
    handleKeyCommand={handleKeyCommand}
    onChange={update_editor}
    {...placeholder}
    ref={domEditor} />
  )
```

#### [How to clear input field in Draft-js](https://stackoverflow.com/questions/37463757/how-to-clear-input-field-in-draft-js)   
```
  // The proper way to reset content of the editor:

  import { EditorState, ContentState } from 'draft-js';

  const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
  this.setState({ editorState });
```
> id like to try this alternative

#### send back access to Draftjs component ("Note.js") EditorState
Narrator.js
```
const messageStateArray = useRef();

const getMessageState = (stateArrays) => {
  messageStateArray.current = stateArrays;
}

let hidden_data = {
  getEditorCallback:getMessageState
}

<Message data={{...hidden_data }} />
```

Message.js
```
let getEditorCallback = data.getEditorCallback;

if(getEditorCallback){
  note_data.getEditorCallback = getEditorCallback;
}

<Note data={note_data} />
```

Note.js
```
let getEditorCallback = data.getEditorCallback;

useEffect(() => {
  if(getEditorCallback){
    getEditorCallback([EditorState, draftEditor, setDraftEditor, convertFromRaw]);
    }// if
    },[]);
    ```

#### update EditorState
[search: draft js update editorstate](https://github.com/draft-js-plugins/draft-js-plugins/issues/210)   
>I had a similar problem and the comments guided me to the solution. I wanted to update the editor from raw JSON which comes from an API. So this is what worked for me:
```
componentWillReceiveProps(newProps) {
  const newContentState = convertFromRaw(JSON.parse(newProps.text))
  const editorState = EditorState.push(this.state.editorState, newContentState)
  this.setState({editorState})
}
```
> I think the gist of this is (like @nikgraf said): always use EditorState.pushand never set the state directly after its initialization.

#### GOTCHA: i didn't JSON.parse the saved data string
my example
Narrator.js
```
  const update_hidden = (txt_obj) => {
      const [editorState, draftEditor, setDraftEditor, convertFromRaw] = messageStateArray.current;
      // debugger
      const newContentState = convertFromRaw(JSON.parse(txt_obj));// GOTCHA: needed to be parsed
      setDraftEditor(editorState.createWithContent(newContentState));

      // const ContentState = convertFromRaw(JSON.parse(txt_obj))
      // // debugger
      // setDraftEditor(editorState.push(editorState, ContentState));
  }// update_hidden
```
**works**

#### [Convert from html](https://youtu.be/vOZAO3jFSHI?t=1090s)
18:10 minute mark - he actually tries to skip past this section of code, but with the magic of pause...

this actually has 4 steps not the usual 3

```
  // import { /*Editor,*/ EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
  import { convertFromHtml } from 'draft-js';// i assume i can get it from here and not need the "Draft" var

  createWithHtml = () => {
    const contentBlocks = Draft.convertFromHtml(this.state.html);

    const contentState = Draft.ContentState.createFromBloackArray(contentBlocks);

    const newEditorState = Draft.EditorState.createWithContent(contentState);

    this.setState({editorState: newEditorState});

  }


  this will be added to a useState in a fn component

  const [draftEditor, setDraftEditor] = (note_data != "" && typeof note_obj == "object") ?
  useState(EditorState.createWithContent(convertFromRaw(note_obj))) :
  useState(EditorState.createEmpty());
```

#### HTML that is recognized out of the box

```
  <h1>
  <h2>
  <h3>
  <h4>
  <h5>
  <h6>
  <blockquote>
  <pre>
  <figure>
  <li>
  <div>
```

#### getting the focused image

inside of update_editor fn i can use the same editorState (draftEditor || dE) to call the fn getSelection.  

```
  const update_editor = (dE) => {
    setDraftEditor(dE);
    // let raw = convertToRaw(dE.getCurrentContent());
    let raw = dE.getSelection();

    draft_note_output.current = JSON.stringify(raw,null,2);
  }
```

when the media item is selected getSelection has an output that shows me which key is in focus

```
{ "anchorKey": "cv77l", "anchorOffset": 0, "focusKey": "cv77l", "focusOffset": 0, "isBackward": false, "hasFocus": false }
```
i can use "anchorKey": "cv77l" and/or "focusKey": "cv77l" to detect the item im focused on.  i may need to create something to
help me focus on videos (and to focus on inline blocks)

the media item has a 'Figure' element that i can use to detect which entity is targeted

#### view the editorState json

```
  let selection = JSON.stringify(dE.getSelection(),null,2);
```

> viewing the dE alone has no particular value

#### [use prettier.io to display readable json from the draftjs json strings](https://prettier.io/playground/)   
**set parser to json**

#### process to getting the target figures entity

1. get the selection data from the editorState (dE)

```
  let selection = dE.getSelection()
```

2. locate the anchorKey or focusKey
3. get the raw json

```
  let raw = convertToRaw(dE.getCurrentContent());
```

4. loop through each block looking for the key that matches the anchor/focus
5. once identified find the **entityRanges** property array
6. get the first object in the array (index zero) and find that objects key property
7. save the number from the key
8. get the entityMap property from the and search for the matching key property

once you found the matching property make the changes that you need this copy of the editorState object

#### updating editors

the editorState is IMMUTABLE - to save this copy of the contentState: you have to merge it with the current editor or replace it with a completely new editorState

```
  const update_editor = ({editor, blocks}) => {

      if(editor.current == undefined) return;// do nothing

      const [editorState, draftEditor, setDraftEditor, convertFromRaw] = editor.current;

      const newContentState = convertFromRaw(JSON.parse(blocks));// GOTCHA: needed to be parsed
      setDraftEditor(editorState.createWithContent(newContentState));

      // const ContentState = convertFromRaw(JSON.parse(blocks))

      // setDraftEditor(editorState.push(editorState, ContentState));
  }// update_editor
```
> using this method i was saving references of whatever editors i was using to useRef(); see below

#### saving references of various editorStates

```
    const getEditorState = (stateArrays) => {
      editorStateArray.current = stateArrays;
    }// getEditorState

    const getMessageState = (stateArrays) => {
      messageStateArray.current = stateArrays;
    }// getMessageState

    const getReplyState = (stateArrays) => {
      replyStateArray.current = stateArrays;
    }// getReplyState
```
> i separated the desired editor states into separate fns so i could directly target the one i wanted to go with a certain editor

_Narrator.js_

```
  let hidden_data = {
    custom: "msg_preview",
    payload:{text: comment.text, height: comment.height},
    ...v_data,
    un_reply,
    getEditorCallback:getMessageState,
    reply_data,
    getReplyState: getReplyState
  }

  ...

  <Message data={hidden_data} />
```

> then i added the editor state fn to the generic getEditorState property in the data props i was passing down to eventually get to the editor component

the data would eventually get to the Editor component as a prop

_Message.js_

```
const Message = ({data}) => {

  ...

  let getEditorCallback = data.getEditorCallback;

  ...

  const note_data = {item_data:payload, name:"text", custom};

  if(getEditorCallback){
    note_data.getEditorCallback = getEditorCallback;
  }

  <Note data={note_data} />

  ...

```

finally i would process the callback in the editor Component

_Note.js_

```
  import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';

  ...

  const Note = observer( props => {
    let data = props.data;

    let getEditorCallback = (typeof props.data != "undefined" && props.data.getEditorCallback) ? props.data.getEditorCallback :
        (props.getEditorCallback) ? props.getEditorCallback : undefined;

    const [draftEditor, setDraftEditor] = (note_data != "" && typeof note_obj == "object") ?
        useState(EditorState.createWithContent(convertFromRaw(note_obj))) :
        useState(EditorState.createEmpty());

    useEffect(() => {
      if(getEditorCallback){
        getEditorCallback([EditorState, draftEditor, setDraftEditor, convertFromRaw]);
      }// if
    },[]);
```

 > once all the data is set up i used useEffect (set to run once) to send the editor data back to the parent using the callback
> i could have also used forwardRef here instead of the useEffect and the callback but that would take an entirely different setup - see using the ref prop along with [forwardRef]


#### [Creating decorators](https://draftjs.org/docs/advanced-topics-decorators#compositedecorator)   
[Draftjs sample - deep dive (26 min mark)](https://www.youtube.com/watch?v=vOZAO3jFSHI&feature=youtu.be?t=1560s)   


#### what makes the draft-js-alignment-plugin display break?
not being able to read this line of code:

```
  import 'draft-js-alignment-plugin/lib/plugin.css';
```

#### for video to work properly
i have to find the item "figure"
append a child to add close (unfocus) functionality (image also)
i need a paddding around the video item (so it can be focused)
all iframes in the editor need a width of 100%


#### checking to see if note is empty

```
  const constentState = draftEditor.getCurrentContent()
  let has_text = constentState.hasText();
```
**semi-works** but if i make an entry and delete all it still thinks it has text unless i enter a space, then hasText is false?

My modified version - this way is more responsive but multiple spaces creates a true condition - i will need a trim
```
  let raw_data = JSON.parse(prepared_value);

  ready_send.current = raw_data.blocks.some((block) => {
    return block.text != "";
  });
```
final version
```
  const {removeSomething} = require('../../../../../tools/remove_something');

  ...

  let has_text = raw.blocks.some((block) => {
    let test_text = block.text;
    test_text = test_text.trim();// so does this for our purposes
    return test_text != "";
  });

  let blocks = "";
  if(has_text){
    blocks = JSON.stringify(raw,null,2);
  }
```
**works**

#### I need to pass a ref to a functional component
MainCore.js
```
  <Segue mode="bookmarks"
    key={`arc_bookmarks_${iUN}`}
    // ref={element => {
    //   return user_sections.current[bkmk_id] = element;// bkmk_index
    // }}
    init={user_sections.current[bkmk_id]}
    render="delay"
    path='api/alight/arc' task='getBookmarks' payload={sect.name} store={state}
    name={sect.name} icon={sect.icon}
  />
```

Segue.js
```
  const Segue = (props, ref) => {

    const [state, setState] = useState({init:false})
    const ref = props.init;


    const initialize = () => {
      console.warn("[Segue] initializing");
    }
    ref.state = state;// works
    ref.initialize = initialize;// works

    ...
```

#### using the ref prop along with [forwardRef](https://reactjs.org/docs/forwarding-refs.html)    

MainCore.js

```
  <Segue mode="bookmarks"
    key={`arc_bookmarks_${iUN}`}
    ref={user_sections.current[bkmk_id]}
    render="delay"
    path='api/alight/arc' task='getBookmarks' payload={sect.name} store={state}
    name={sect.name} icon={sect.icon}
  />
```

Segue.js

```
  const Segue = forwardRef((props, ref) => {

    const [state, setState] = useState({init:false});


    const initialize = () => {
      console.warn("[Segue] initializing");
    }
    ref.state = state;// works
    ref.initialize = initialize;// works
```

**this one uses ref directly**

#### using a functional components reference with class based component references   

MainCore.js

```
  if(typeof user_sections.current[ref_id] == "undefined") return;// do nothing
  init = user_sections.current[ref_id].state.init;
  // if not un the initial fn
  if(display_console || false) console.log("[user_recent] init",init, user_sections.current[ref_id].state.init);
  if(user_sections.current[ref_id].state.init == false){
    // user_sections.current[ref_id].fetch_info();
    user_sections.current[ref_id].initialize();
  }
```

**i also got around user_sections.current[ref_id].state.init by setting a state hook with an init: false property**

Segue.js

```
  const Segue = forwardRef((props, ref) => {

    const [state, setState] = useState({init:false});

    ref.state = state;// works
```
