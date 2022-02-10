# react-hook-form notes   

## Articles   

[The complete guide to React Hook Form](https://blog.logrocket.com/the-complete-guide-to-react-hook-form/)   
> helpful in using handleSubmit with form to process submit on form completion   

[migration guide v5 to v6](https://react-hook-form.com/migrate-v5-to-v6)   
> my version is "react-hook-form": "^4.10.2"

### GOTCHA(s)   

[**GOTCHA:**](#onchange1) mode "onchange" is needed to trigger error on change   
[**GOTCHA:**](#e-msg) i tried using a name different from the input and the ErrorMessage failed   
[**GOTCHA:**](#sameName) use multiple inputs witht the same name


### validation   

include errors method   

```
  // needed to trigger error on change
  const { register, getValues, setValue, handleSubmit, watch, errors } = useForm({mode:"onchange"});

  let form_data = {register, getValues, setValue, errors};
```

> Notice the mode: "onchange" property added to the useForm options - this is needed to trigger error checking as you type (idk what the default is)

<br/>

#### i can write the validator properties inside the register method   

```
  <input id={`${prefix}srchInp_TInput`}
  ref={register({required: true})} />
```   

<br/>

##### <a name="onchange1">**GOTCHA:**</a> mode "onchange" is needed to trigger error on change

and ErrorMessage   

```

  import { useForm, ErrorMessage } from 'react-hook-form';
  <div>
    <input id={`${prefix}srchInp_TInput`}
    ref={register({required: true})}
    name={`search_text`}
    />
  </div>
  <ErrorMessage errors={errors} name="search_text" message="This is required" />
```

> I put the ErrorMessage component under the container for the input and used the same name as the input to reference the input   

##### <a name="e-msg">**GOTCHA:**</a> i tried using a name different from the input and the ErrorMessage failed   

<br/>

#### i can disable the go btn by also using the errors name reference   

```
  <button id={`${prefix}srchInp_inBtn`}
    className={`${prefix}srchInp_inBtn ${prefix}srchInp_inBtn ${prefix}srchInp_inBtn0 inBtn  inbox ui-btn icon-search`}
    onClick={(e) => {
      e.persist();
      if(!errors.search_text){
        //this errors.search_text test works
        mc_search(e,'',{state,prefix,form_data})
      }
    }}
  >
  </button>
```

#### [i can use a form state with this too](https://react-hook-form.com/api/#formState)    

```
  const { register, getValues, setValue, handleSubmit, watch, errors, formState } = useForm({mode:"onchange"});
  const { dirty, isSubmitting, touched, submitCount, isValid } = formState;

  ...

  if(!errors.search_text && isValid){
    //this errors.search_text test works
    mc_search(e,'',{state,prefix,form_data})
  }
```

I can also add the error message to the input and reference it in the ErrorMessage   

```
  <input id={`${prefix}srchInp_TInput`}
  ref={register({required: "This is required"})}
  name={`search_text`}
  />
  <ErrorMessage errors={errors} name="search_text">
    {({ message }) => <p>{message}</p>}
  </ErrorMessage>
```

> this version will display whatever message is added as a string to the false outcome of any validation test

#### can i use validator.js with this?   

```
  const validateSearchText = (value) => {
    // await sleep(1000);
    let is_valid = (value == "bill") ? true : false;
    return is_valid;
  }


  <input id={`${prefix}srchInp_TInput`}
  ref={register({required: "This is required", validate: validateSearchText})}
  />
```

```
  let ref_data = { required: "this is required",validate:(value) => {
    return value.trim() != "";
  }};
```

#### GOTCHA: isValid is always false

[downgrade to v6.4.1](https://fantashit.com/react-hook-formstate-formstateproxy-isvalid-value-always-false/)   

```
  npm i react-hook-form@6.4.1 --save --save-exact
```

#### form submission issue   
[a nice example of a properly working form](https://codesandbox.io/s/7o2wrp86k6?file=/src/index.js:1400-1434)   
> the form in the example invalidates properly while pristine   

_inform.js_   

```
  const modal_ref = useRef();

  const modal_data = {
    name: "inform",
    ref: modal_ref,
    content:{
      addClass:"hide-scroll"
    },
    close:{
      show: true,
      callback:close_inform
    }
  };

  let form_ctrls = (
    <>
    <button type="submit"
      className={`inform_goBtn inform goBtn modal_ctrls glass_confirm  d3-ico-full d3-disc-bg icon-checkmark`}
    ></button>
    <div onClick={close_inform}
      className={`inform_cancelBtn inform cancelBtn modal_ctrls arc_can_btn ui-btn  d3-ico-full d3-disc-bg icon-cross `}
    ></div>
    </>
  )

  return (
    <Modal data={modal_data}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(upload_form)}>
        <Snapper data={Snap_data} ref={FormStore.snapper}>
          {section_array}
        </Snapper>
        {form_ctrls}
      </form>
    </Modal>
  );
```  
> modal_data doesn't need a cancel or a go btn property it can still use a close property (optional)   

#### GOTCHA: form doesn't invalidate pristine forms. **TL:DR; my usual way causes issues - do it the r-h-f way**   
> the issue was the form wasn't invalidating a submitted form that i didn't touch (all fields empty and untouched).
The remedy was to let the form element handle submission instead of subverting that submission the way i usually do.
In order for this to fully work i had to omit using the modals built in go btn because the modal would have to be nested inside the Form for the modals modified go btn (input type="submit") to trigger the form submission.  Nesting caused umounting errors because the modal is used to removing itself from a DOM container but in this case from the form element causing an error. (idk i think it still mounted to the container but the form's elements it is watching would instantly
disappear without removing the form with it.)

#### [GOTCHA: submit btn icon font](https://stackoverflow.com/questions/11686007/font-awesome-input-type-submit)   

```
  <button type="submit"
    className={`inform_goBtn inform goBtn modal_ctrls glass_confirm  d3-ico-full d3-disc-bg icon-checkmark`}
  ></button>

  // instead of

  <input type="submit" value="go"
    className={`inform_goBtn inform goBtn modal_ctrls glass_confirm  d3-ico-full d3-disc-bg icon-checkmark`}
  />
```


#### GOTCHA: [Why is first keystroke not working?](https://react-hook-form.com/faqs)      

>Double check if you are using value instead of defaultValue.

>React Hook Form is built based on uncontrolled input, which means you don't need to change input value via state by onChange. Hence you don't need value at all, in fact, you only need defaultValue for initial input value.

**USE defaultValue with react-hook-form** - you can still update a state it just won't inform the input   

#### passing message from validation function   

```
  const validateSearchText = (value) => {
    // await sleep(1000);
    let is_valid = isAlphanumeric(value);

    return is_valid;// original working version without message

    return (is_valid) ? true : "restricted characters";// works with message string given instead of false value
  }
```

**GOTCHA:**  function won't trigger unless you add options to useForm   

```
  const { register, getValues, setValue, handleSubmit, watch, errors, formState } = useForm({mode:"onchange"});
```

#### [Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)   

my use of uncontrolled component using react-hook-form   

```
  <input id={`${prefix}srchInp_TInput`}
    // ref={register}
    ref={register({required: true, validate: validateSearchText})}
    className={`${prefix}srchInp_TInput ${prefix}srchInp_TInput0 srchInp_TInput TInput  inbox`}
    type={`text`}
    name={`search_text`}
    placeholder={`Enter search request`}
    maxLength={`40`}
    // required={false}
    title={`Message title`}
    defaultValue={""}
    // value={searchText}
    // error={!!errors.search_text}
    onFocus={(e) => {
      e.preventDefault();
      e.target.select();
    }}
    // onChange={update_text}
    onKeyPress={(e) => {
      e.persist();
      // let {search_text} = getValues();
      // console.warn("[search_text]",search_text);
      // this is a little less accurate than onchange and onInput but it seems to relay the value accurately with enter
      // which is all i really need

      let _key = e.which || e.keyCode;
      if (e.which == 13 || e.keyCode == 13)
      {
        // console.warn("[PSP] entering enter...");
        find_it(e);
      }/*else{
        // not needed - does no real work
        update_text();// this may work
      }*/
    }}
  />
```

i used async/await to set the initial value from localforage (indexedDB)   

```
  useEffect(() => {
    setInit( (prev) => {return {...prev, start: true};});

    add_initial_text();
  },[]);

  const add_initial_text = async () => {
    let stored_session = await my_storage({request: "search"});

    if(exists(stored_session.bookmarks) && exists(stored_session.bookmarks.request)){
      setValue("search_text",stored_session.bookmarks.request);// i can set the value here
    }

  }// add_initial_text
```

then i can get the data whenever using the input name and getValue from the form methods   

```
  const { register, getValues, setValue, handleSubmit, watch, errors, formState } = useForm({mode:"onchange"});

  ...

  console.log("[title] getValues", getValues());
  let {search_text} = getValues();
```

#### <a name="sameName">**GOTCHA:**</a> [use multiple inputs witht the same name](https://github.com/react-hook-form/react-hook-form/issues/1212)   


```
  const iUN_ref = useRef(Math.round(Math.random() * 10000));//props.iUN || Math.round(Math.random() * 10000)
  let iUN = iUN_ref.current;
```

**add an iUN that is set once and stays the same throughout the life of the component using userRef**   

elements/Title/Title.js   

```
  <input ref={register}
  name={`title_data_${iUN}`}
  onChange={update_title}
  value={unescape(FormStore.item_data.title_data)}
  />
<textarea
name={`desc_data_${iUN}`}
onChange={update_description}
value={unescape(FormStore.item_data.desc_data)}
></textarea>
```

**use an iUN with the element name to add an element of uniqueness to the name string**   

```
  const update_title = (e) => {
    let value_obj = getValues();
    let title_data = value_obj[`title_data_${iUN}`];
    FormStore.setData("title_data",title_data);
  }//update_title

  const update_description = (e) => {
    let value_obj = getValues();
    let desc_data = value_obj[`desc_data_${iUN}`];
    FormStore.setData("desc_data",desc_data);
  }//update_description
```

DOCS: or to keep the entire process anonymous
> NOTE: remember there is no need for 2 same name inputs to reside in the same component 
> (even though they may live in the same react-hooks-form form_data)
> so setting one iUN for the component will be enough to call it again in the update functions

```
  const update_title = (e) => {
    let value_obj = getValues();

    let field_names = Object.keys(value_obj);
    field_names.forEach((entry) => {

      let tru_name = entry.remove(`_${iUN}`);
      FormStore.setData(tru_name,value_obj[`${entry}`]);
    });
  }//update_title
```

**refer to the unique (iUN inclusive) string name when using mulitple inputs with same data reference (not same name)**   

```
  const update_title = (e) => {
    let value_obj = getValues();
    let title_data = value_obj[`title_data_${iUN}`];
    FormStore.setData("title_data",title_data);
  }//update_title
```

#### [setting custom errors (setError docs)](https://react-hook-form.com/api/#setError)   

using setError and clearErrors

```
  const form_data = props.data.form;

  const { register, getValues, setValue, errors, formState, setError } = form_data;

  ...

  setError(name, "type", "message");

```
> works but also overwrites all other error messages so this is the only one

**setError has 3 parameters**   

1. name - input name   
2. type - name of the violated register property (i.e. minLength)   
3. message - message to show during error   

[setError example on codesandbox](https://codesandbox.io/s/react-hook-form-seterror-epesl?from-embed=&file=/src/index.js)   

> in my case i have to set the properties of form_data from Inform.js component   

setError fails


```
  // await setError((prev) => {
  //   let target = prev[`title_data_${iUN}`];
  //   let new_error = {type:"some type", message:"some message"};
  //   target = {...target, ...new_error}
  //   return {...prev, ...target};
  // });// fails - doesn't even acknowledge it exists

  setError(name, {type, message});//fails even though it is shown in the docs
  // returns type:{type,message} instead of {type, message}

  // setError(`title_data_${iUN}`,{ type:"some type", message:"some message"});// failed
  // setError(`title_data_${iUN}`,{...errors[`title_data_${iUN}`], type:"some type", message:"some message"});// also failed
```

_Inform.js_   

```
  const { register, getValues, setValue, handleSubmit, watch, errors, formState, setError, clearErrors } = useForm({mode:"onchange"});

  let form_data = {register, getValues, setValue, errors, formState, setError, clearErrors};
```
> otherwise the property won't be available in the form_data object prop

#### [criteriaMode "all" (find criteriaMode)](https://react-hook-form.com/api/#errors)   

> criteriaMode
firstError | all
When set to firstError (default), only the first error from each field will be gathered.

> When set to all, all errors from each field will be gathered.

```
  const { register, getValues, setValue, handleSubmit, watch, errors, formState, setError, clearErrors } = useForm({
    mode:"onchange",
    criteriaMode:"all"
  });
```

```
  // setError(name, "type", "message");// works but still overwrites in criteriaMode
  // setError(`title_data_${iUN}`,{ type:"some type", message:"some message"});// failed again with criteriaMode
```

#### targeting errors   

_Title.js_   

```
  let title_error = errors[`title_data_${iUN}`] ? "error" : "";

  ...

  <input ref={register(ref_data)} className={`title_input ${title_error}`} name={`title_data_${iUN}`} />

  ...

```

_Title.scss_   

```
  input.error{
    border-bottom-color: red $mp;
  }//.error
```

#### triggerValidation   

>i found a solitary hint for triggerValidation - trigger() is not a function but
triggerValidation works.   

[triggerValidation("key") not working as expected](https://spectrum.chat/react-hook-form/help/triggervalidation-key-not-working-as-expected~41fd27e4-ec5c-4562-add0-a4db1b1f9610)

i got it to work like this:

_LinkPreview_   

```
form_data.triggerValidation();// run this trigger once - hidden behind a condition
```
[migration guide v5 to v6](https://react-hook-form.com/migrate-v5-to-v6)   

#### [react-hook-form docs](https://react-hook-form.com/api#register)   

_register: (Ref, RegisterOptions?) => void_   

[Intercepting ref](https://github.com/react-hook-form/react-hook-form/issues/25)   

```
  <input ref={(ref) => {
    myRef.current = ref;
    register(ref);
  }} />
```
**works**   

my example   

```
  <input type="text"
    {...input_attributes}
    ref={(ref) => {
      input_ref.current = ref;
      register(ref, ref_data)
    }}
    ...
```
