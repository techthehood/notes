
note.js
```
    import React, { useEffect, useState, useContext, Fragment, useRef } from 'react';
    import { observer, inject } from "mobx-react";
    import {FormContext} from '../../formContext';
    require("./Note.scss");
    // const {dataCheck} = require('./dataCheck');
    import { Editor, EditorState, RichUtils } from 'draft-js';
    import { useForm } from 'react-hook-form';
    import {Toolbar} from './toolbars/toolbar';

    const Note = observer( props => {

      // props.children;
      let init = useRef(false);
      let input_el = useRef();
      let domEditor = useRef();
      // let desc_init = useRef(true);

      const FormStore = useContext(FormContext);
      let item_data = FormStore.item_data;
      let data = props.data;

      const form_data = props.data.form;
      const { register, getValues, setValue } = form_data;// is this a global register or a local one - do i have to pass register as props
      // let register = props.register;

      const [draftEditor, setDraftEditor] = useState(EditorState.createEmpty());

      if(init.current == false){

        init.current = true;

      }// init.current

      let iUN = Math.round(Math.random() * 10000);

      const update_editor = (dE) => {
        setDraftEditor(dE);
      }

      const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(draftEditor, command)
        if (newState) {
            update_editor(newState);
            return 'handled';
        }
        return 'not-handled';
      }//handleKeyCommand

      const onItalicClick = (e) => {
        e.preventDefault();
        update_editor(RichUtils.toggleInlineStyle(draftEditor, 'ITALIC'));
        domEditor.current.focus();
      }

      const onBoldClick = (e) => {
        e.preventDefault();
        update_editor(RichUtils.toggleInlineStyle(draftEditor, 'BOLD'));
        domEditor.current.focus();
      }

      const onUnderlineClick = (e) => {
        e.preventDefault();
        update_editor(RichUtils.toggleInlineStyle(draftEditor, 'UNDERLINE'));
        domEditor.current.focus();
      }

      return (
        <div className="note_editor">
          <div className="note_toolbar">
            <div className={`draft_style_btn italic-btn`} onMouseDown={function(e){e.preventDefault(); onItalicClick(e)}}><em>I</em></div>
            <div className={`draft_style_btn bold-btn`} onMouseDown={function(e){e.preventDefault(); onBoldClick(e)}}><em>B</em></div>
            <div className={`draft_style_btn underline-btn`} onClick={function(e){onUnderlineClick(e)}}><em>U</em></div>
          </div>
            <Editor editorState={draftEditor}
            handleKeyCommand={handleKeyCommand}
            onChange={update_editor} ref={domEditor}/>
        </div>
      );
    });//observer

    export default Note;

    const exists = (item) => {
      return (item != null && typeof item != "undefined" && item != false && item != "") ? true : false;
    }

  // LATER: pass in different toolbars for different editor styles

```
 note.scss
```
  .note_editor{
    .DraftEditor-root{
      border: 1px solid #ccc;
      padding: 1rem;
      margin: 0 1rem;
      max-height: 15rem;
      overflow-y: auto;

      .DraftEditor-editorContainer{
      }

      div[class*="DraftEditor-content"]{
        // border: 1px solid red;
        min-height: 100px;
      }
    }

    .note_toolbar{
      display:flex;
      justify-content: flex-start;
      margin: 0 1rem;
      .draft_style_btn{
        border: 1px solid black;
        width: 1.5rem;
        height: 1.5rem;
        margin: .25rem;
        text-align: center;
        box-shadow: 0px 1px 11px 1px rgba(15, 15, 15, 0.2);
        background-color: #34495e;
        color: #fff;
        transistion: all 250ms ease-in-out;
        cursor: pointer;
        &.active, &:hover{
          transform: translateY(1px);/*gives it a little bounce*/
          color: #34495e;
          background-color: transparent;
          box-shadow: none;
          border: 1px solid #34495e;
        }/*active*/
      }
    }
  }/*note_editor*/
```
