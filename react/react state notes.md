# react state notes

[React Docs now recommends using function with prevState inside of setState](https://teamtreehouse.com/community/react-docs-now-recommends-using-function-with-prevstate-inside-of-setstate)   

```
  arc.setState((prevState, props) => {
    let change_obj = {}
    change_obj.return_data_length = requested_items.length;
    let ready_list = prevState.list.concat(requested_items);
    change_obj.list = ready_list;
    // return {return_data_length: requested_items.length, list: ready_list}

    if(state.testing == true){

      // this is to manually advance the page - during forever scrolling i won't need this
      if(requested_items.length == prevState.limit && ready_list.length < prevState.failsafe){
        // this process is for testing, this way won't give be a page past the failsafe # so it will continue
        // loading the same data over and over.
        change_obj.info_page = prevState.info_page + 1;
        change_obj.has_more = true;
      }else{
        change_obj.has_more = false;
      }//else

    }else {

      if(requested_items.length == prevState.limit){
        change_obj.has_more = true;
        change_obj.info_page = prevState.info_page + 1;
      }else{
        change_obj.has_more = false;
      }// else

    }


    if(prevState.init == false) change_obj.init = true;
    change_obj.loading = false;

    return change_obj;
  });
```

#### force update (functional component)
sample
```
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }

  // inside the component
  const forceUpdate = useForceUpdate();
```

actual use - pass parent update to child component
```
  const [value, setValue] = useState(0); // integer state
  const forceUpdate = () => {
    setValue(value => ++value); // update the state to force render
  }// forceUpdate

  // pass to childNodes
  return <MakeBookmarks data={mb_obj} modal={modal} key={bk_mb_name} parentUpdate={forceUpdate} />;
```
