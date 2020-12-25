
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
