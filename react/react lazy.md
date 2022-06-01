# react lazy

### Sample Lazy Load template with observer for state management   

#### Initialize the template

```
  let form_section = (
    <FormTemplates key="FormTemplates" data={{form:form_data}} />
  );
  section_array.push(form_section);
```
> in this stage there are no Suspense or Lazy processing

#### Template Component

*FormTemplates.js*

```
  import React, { useContext, Suspense } from 'react';
  import { observer } from "mobx-react";
  import {FormContext} from '../formContext';

  import {get_template} from './templates/get_template';
  import template_selector from './templates/temp_sel';


  require("./formTemplates.scss");

  const FormTemplates = observer((props) => {
    const FormStore = useContext(FormContext);
    const form_data = props.data.form;

    if(typeof FormStore.item_data.data_type != "undefined"){
        //has to lazy load the form templates based on data_types
      let template_name = get_template(FormStore.item_data.data_type);
      let Data_form = template_selector[template_name];

      return(
        <Suspense fallback={<div className="loader_modal w3-modal active"><div className="loader">Loading...</div></div>} >
          <Data_form data={{form:form_data}} />
        </Suspense>
      );
    }else {
      return null;
    }
  });

  export default FormTemplates;
```
> My templates usually include a few steps to allow them to be as dynamic as i can get them.

#### 1. get template name (optional step)
> the template_name is usually extracted from a function that runs a switch statement

```
  export const get_template = (form_type) => {
    switch(form_type)
    {
      case "phone":
        // return "phone";
        return "BlankForm";
      break;

      case "folder":
      case "name":
      case "organization":
      case "preset":
      case "project":
      case "user":
        return "TitleForm";// BasicForm
      break;

      case "e-commerce":
        // return;
        return "BlankForm";
      break;

    }//end switch
  }//get_template


  usage:

  let template_name = get_template(FormStore.item_data.data_type);

```
> the return string is formated the same as a component name in PascalCase   


#### 2. get the template component

*template_selector.js*
```

  import { lazy } from "react";

  console.log("[form] loading lazy");

  const BlankForm = lazy(() => import(/* webpackChunkName: "templates/form/formTemplates" */ `./BlankForm`));

  const ImageForm = lazy(() => import(/* webpackChunkName: "templates/form/formTemplates" */ `./ImageForm`));

  const LinkForm = lazy(() => import(/* webpackChunkName: "templates/form/formTemplates" */ `./LinkForm`));

  const NoteForm = lazy(() => import(/* webpackChunkName: "templates/form/formTemplates" */ `./NoteForm`));

  const CodeForm = lazy(() => import(/* webpackChunkName: "templates/form/formTemplates" */ `./CodeForm`));

  const TitleForm = lazy(() => import(/* webpackChunkName: "templates/form/formTemplates" */ `./TitleForm`));

  export default { BlankForm , ImageForm, LinkForm, NoteForm, CodeForm, TitleForm };


  usage:

  let Data_form = template_selector[template_name];
```
ISSUE: i think it fails if the template name string and the final varName isn't Pascalcase (at least initial caps)   
> the template name has to be initial caps because its compared with component name strings in the lazy loading process of the get template phase

> the final variable that will be used to create the component needs to be capitalized so it isn't confused with reacts default html components which are reserved as lowercase.