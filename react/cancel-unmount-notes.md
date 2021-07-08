# cancel during unmounting

_filter.js_

```
  useEffect(() => {
  // console.warn("[filter] value",search_value);

  let cancel_obj = {};

        let value_filter_options = { ancestor, display_data: state.app_state.display_data, value: search_value};// no scroll_data (reset)

        get_data(value_filter_options, state.app_state, cancel_obj)


        return () => {
          cancel_obj.cancelToken.cancel('Operation canceled due to new request.');
          // console.warn(`cancelToken for ${search_value}`,cancel_obj.cancelToken);
        }

    },[search_value, exec_search]);
```

**pass down a cancel object to fetch and use it whenever unmounting is occuring**   

> in this case unmounting occurs whenever a new useEffect process beings (the last useEffect process closes itself)   


*data/get_data.js*   

```
  export const get_data = function(myData,st, obj = {})
  {
      result = await fido({task: urlMod, data: uploadData, obj });
```
**this is an extra step, i can goto axios directly in the fn that runs it**

_http.js_

```

  export const fido = async function(http_obj)
  {
    ...

    let cancel_obj = http_obj.obj || {};
    cancel_obj.cancelToken = axios.CancelToken.source();

    const response = await axios.post(`${location.origin}/api/alight/${path}/${urlMod}`, uploadData,
      {
        cancelToken: cancel_obj.cancelToken.token
      }
    );
    ...
```

#### class based version
```
  export default class Details extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        init: false,
      };

      this.cancel_obj = createRef();
    }// constructor

  componentDidMount = () => {
    // console.log("details component is ready to roll!");
    // console.log(`available data = ${this.props.data}`);
    let cancel_obj = {};
    this.cancel_obj.current = cancel_obj;

    this.prep_vars(this.props.data, cancel_obj)
  }

  componentWillUnmount = () => {
    debugger
    this.cancel_obj.current.cancelToken.cancel('Operation canceled due to new request.');
  }
```
**works**
> i tried to send this.prep_vars(this.props.data, this.cancel_obj.current) and .current was undefined in componentWillUnmount

### Triggers

i used a function that incremented a counter and when the counters state was saved/changed it triggered the useEffect watch
and forced a new render

```
  const [exec_search, setExecSearch] = useState(0);

  const execute_search = () => {
    // this is used to execute a search using the filter type btns without clicking the go/search icon
    setExecSearch(exec_search => ++exec_search);
  }

```

the other trigger was a save/setState for an input value

```

  const [search_value = "", setValue] = useState(store.get_filter_value({ancestor}));

  ...

  <input id={`${name}_${ancestor}_filter_input_${iUN}`}
    onChange={(e) => {
      init.current = true;
      setValue(e.target.value)
      // store.set_filter_value({ancestor, value: e.target.value});
    }}
  />

```

useEffect watch variables

```
  useEffect(() => {

  ...

  },[search_value, exec_search]);
```
