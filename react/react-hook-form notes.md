

### validation

include errors method
```
  const { register, getValues, setValue, handleSubmit, watch, errors } = useForm({mode:"onchange"});// needed to trigger error on change

  let form_data = {register, getValues, setValue, errors};
```
**Notice the mode: "onchange" property added to the useForm options - this is needed to trigger error checking as you type (idk what the default is)**

i can write the validator properties inside the register method
```
  <input id={`${prefix}srchInp_TInput`}
  ref={register({required: true})} />
```

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
GOTCHA: i tried using a name different from the input and the ErrorMessage failed

i can disable the go btn by also using the errors name reference

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
**this version will display whatever message is added as a string to the false outcome of any validation test**

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

#### GOTCHA: [Why is first keystroke is not working?](https://react-hook-form.com/faqs)   
>Double check if you are using value instead of defaultValue.

>React Hook Form is built based on uncontrolled input, which means you don't need to change input value via state by onChange. Hence you don't need value at all, in fact, you only need defaultValue for initial input value.

#### passing message from validation function
```
  const validateSearchText = (value) => {
    // await sleep(1000);
    let is_valid = isAlphanumeric(value);

    return is_valid;// original working version without message

    return (is_valid) ? true : "restricted characters";// works with message string given instead of false value
  }
```
**GOTCHA: function won't trigger unless you add options to useForm**
```
  const { register, getValues, setValue, handleSubmit, watch, errors, formState } = useForm({mode:"onchange"});
```

[Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)   

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
**then i can get the data whenever using the input name and getValue from the form methods}
```
  const { register, getValues, setValue, handleSubmit, watch, errors, formState } = useForm({mode:"onchange"});

  ...

  console.log("[title] getValues", getValues());
  let {search_text} = getValues();
```

#### [use multiple inputs witht the same name](https://github.com/react-hook-form/react-hook-form/issues/1212)   

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
**refer to the unique (iUN inclusive) string name when using **

  const update_title = (e) => {
    let value_obj = getValues();
    let title_data = value_obj[`title_data_${iUN}`];
    FormStore.setData("title_data",title_data);
  }//update_title
