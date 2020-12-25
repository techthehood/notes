# localforage notes

#### original setup
```
  let storage_target = (mode == "history" || mode == "trending" || mode == "hold") ? localStorage : state.userStorage;

  //delete bookmark
  let storage_object = JSON.parse(storage_target["bookmarks"]);
  storage_object[mode].splice(storage_index,1);
```

#### using localforage with react
```
  const ListBookmarks = async (props) => {

    let storage_target = await my_storage({request:mode, state});
  }

  export default ListBookmarks
```
**fails - react wants a returned object not a promise**

#### useEffect and state are needed to allow for async await
```
  useEffect( async () => {
      let get_storage_target = await my_storage({request:mode, state});

      let me_seeks = "im here";
      setStorageTarget(get_storage_target);
  },[]);
```
**also fails - async is not permitted in useEffect. in the error msg they recommend you create a function and immediately call it**

#### proper use of async await in react - notice the condition using the state variable
```
  const ListBookmarks = async (props) => {

    const [storage_target, setStorageTarget] = useState();

    const get_storage = async () => {
      let get_storage_target = await my_storage({request:mode, state});

      let me_seeks = "im here";
      setStorageTarget(get_storage_target);

      return;
    }

    useEffect(() => {
        get_storage();
        setInit(true);
    },[]);

    if(!storage_target) return null;// do nothing
    // otherwise continue...

    // the rest of the code
    let storage_object = JSON.parse(storage_target["bookmarks"]);
    storage_object[mode].splice(storage_index,1);

    ...

  }// ListBookmarks

    export default ListBookmarks
```

## in summary

#### for react components

**replace this**
```
  let storage_target = (mode == "history" || mode == "trending" || mode == "hold") ? localStorage : state.userStorage;
```

**with this**
```
  const [storage_target, setStorageTarget] = useState();

  const get_storage = async () => {
    let get_storage_target = await my_storage({request:mode, state});

    let me_seeks = "im here";
    setStorageTarget(get_storage_target);

    return;
  }

  useEffect(() => {
      get_storage();
      setInit(true);
  },[]);
```
**GOTCHA:**
>react can't return a promise as a component so  fn components cant be async fns.  useEffect also can't return a promise so useEffect callback can't be an async fn.  use effect can call an async function and the async function can update the state. this is the only way
to use asycn/await variable data in react.

[Using Async await in react component](https://stackoverflow.com/questions/54936559/using-async-await-in-react-component)   
**its kind of like this, execpt replace componentDidMout with useEffect**

#### in normal async functions
**replace this**
```
  let storage_target = (mode == "history" || mode == "trending" || mode == "hold") ? localStorage : state.userStorage;
```

**with this**
```
  let storage_target = await my_storage({request:mode, state});
```

#### don't forget my redundancy protection
**im replacing this too**
```
  storage_target["bookmarks"] = await JSON.stringify(storage_object, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              // Duplicate reference found
              try {
                  // If this value does not reference a parent it can be deduped
                  return JSON.parse(JSON.stringify(value));
              } catch (error) {
                  // discard key if value cannot be deduped
                  return;
              }
           }
          // Store value in our collection
          cache.push(value);
      }
      return value;
  });
  cache = null; // Enable garbage collection
```

#### it works but ListBookmarks needs a fresh copy each render and state makes the copy static
```

```

#### GOTCHA: Uncaught (in promise) DOMException: Failed to execute 'put' on 'IDBObjectStore': [object Object] could not be cloned.
**using localforage with mobx**
localforage cant process mobx json symbols, needs to be converted toJS with mobx toJS method
```
  let item_data = store.get_json({...binder_data.item_data});
  if(item_data.deprecated_data){
    item_data.deprecated_data = store.get_json(item_data.deprecated_data);
  }

  // in the mainStore

  import { ..., toJS } from 'mobx';

  ...

  get_json = function(tObj){
    return toJS(tObj);
  }
```
