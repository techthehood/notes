#### [introducing hooks](https://reactjs.org/docs/hooks-intro.html)   

#### [useEffect](https://reactjs.org/docs/hooks-effect.html)   
[useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)   
>similar to componentDidMount & componentDidUpdate - the best way to think of this is after (every) render

```
  import { useEffect } from 'react';

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

## GOTCHA: Function components cannot be given refs.


#### Convert to a class based component

heading
```
  import { Component } from 'react';

  //const Views = (props) => {


  class Views extends Component {

  }

  export default Views;

  or

  //export default class Views extends Component {
```
**i like to export at the bottom**

```
  /*
  .dP"Y8 888888    db    888888 888888
  `Ybo."   88     dPYb     88   88__
  o.`Y8b   88    dP__Yb    88   88""
  8bodP'   88   dP""""Yb   88   888888

  [4MAX](http://patorjk.com/software/taag/#p=display&f=4Max&t=state)
  */
  // this will get all data eventually unless i put a total (failsafe)
  // once i create forever scrolling the failsafe wont be needed
  let [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);
  let return_data_length = useRef(0);
  let init = useRef(false);
  let [info_page, setPage] = useState(1);
```

this is easy if its clearly a state or ref we can add this to the state constructor
```
  constructor(props){
    super(props);
    this.state = {}
  }// constructor
```

Example
```
  constructor(props){
    super(props);
    this.state = {
      list: [],
      loading: true,
      return_data_length: 0,
      init: false,
      info_page: 1
    }
  }// constructor
```

```
  /*
  88""Yb 88""Yb  dP"Yb  88""Yb 888888 88""Yb 888888 88 888888 .dP"Y8
  88__dP 88__dP dP   Yb 88__dP 88__   88__dP   88   88 88__   `Ybo."
  88"""  88"Yb  Yb   dP 88"""  88""   88"Yb    88   88 88""   o.`Y8b
  88     88  Yb  YbodP  88     888888 88  Yb   88   88 888888 8bodP'
  */



    let name = props.mode || "default";
    let iUN = Math.round(Math.random() * 10000);
    let limit = 20;
    let pair_page = 1;
    let failsafe = 50;
    let snapper = props.snapper;

```
these are a little trickier because you are free to omit some of them form the state and run in the render
as a general rule if the property is referenced in a method, it helps to add it to the state or unless its part of
the props object you passed into the component.

in this case limit, pair_page and failsafe should be part of the state.

name and snapper can legitimately be take out of the props
iUN could wait for render but i like to have it in state anyway to save recoding
```
    constructor(props){
      super(props);
      this.state = {
        list: [],
        loading: true,
        return_data_length: 0,
        init: false,
        info_page: 1,
        name: props.name || "default",
        iUN: props.iUN || Math.round(Math.random() * 10000),
        limit: 20,
        pair_page: 1,
        failsafe: 50
      }
    }// constructor
```
**idk if using or statement works in defining json properties ex. props.iUN || Math.round(Math.random() * 10000),**
**idk if props can be added to the state directly in the constructor, i have be using a prep_vars fn to define them in componentDidMount**


```
/*
88  88  dP"Yb   dP"Yb  88  dP .dP"Y8
88  88 dP   Yb dP   Yb 88odP  `Ybo."
888888 Yb   dP Yb   dP 88"Yb  o.`Y8b
88  88  YbodP   YbodP  88  Yb 8bodP'
*/

  useEffect(() => {
    // get lazy list data (increments of 20)
    if(init.current == false && props.snapper.current.state.current_section == 1){
      fetch_info();
    }
      // window.snapper = props.snapper;
      // console.log('[snapper] test', props.snapper);
      // fetch_pairs();
  },[props.snap_section]);

  useEffect(() => {
    // get lazy list data (increments of 20)
    if(init.current == true && return_data_length.current == limit && list.length < failsafe){
      //set new variables and fetch again
      // info_page ++;
      fetch_info();
    }// end if
      // fetch_pairs();
  },[info_page]);
```

depending on when these items are fired they can be split between componentDidMount and componentDidUpdate
if i need it to run like useEffect((){},[]) then it should be componentDidMount otherwise if its a reaction to a change componentDidUpdate


Methods are a lot different in the different component types the only difference is that in class based components the methods
are defined without using a prefix like const or let unless you add a plugin   ["@babel/plugin-proposal-class-properties", { "loose": true }],
```
  /*
  8b    d8 888888 888888 88  88  dP"Yb  8888b.  .dP"Y8
  88b  d88 88__     88   88  88 dP   Yb  8I  Yb `Ybo."
  88YbdP88 88""     88   888888 Yb   dP  8I  dY o.`Y8b
  88 YY 88 888888   88   88  88  YbodP  8888Y"  8bodP'
  */




    let fetch_info = async () => {

      try {
        // let data_id = data_obj._id;
        // NOW: paper list - list request
        let uploadData = {};
        const ctrl_Url = `${location.origin}/api/alight/arc/getRecent`;
        // const ctrl_Url = `${location.origin}/api/details/items/getItemInfo`;// it doesn't have to be a public api
        // const ctrl_Url = `${location.origin}/api/alight/users/${urlMod}`;// used to get recent during user_prefs request var urlMod = "getUserPrefs";
        // const recent = require('./lib/getData/recent');// location of routers recent query

        // uploadData.item_data = data_obj;
        uploadData.mode = "page";
        uploadData.page = info_page;
        uploadData.limit = limit;

        const response = await axios.post(ctrl_Url, uploadData);

        let response_data = response.data;

        console.log("[request_binder_data] response",response);

        let requested_items = response_data.data;

        ...
```

```
  /*
  88""Yb 888888 88b 88 8888b.  888888 88""Yb
  88__dP 88__   88Yb88  8I  Yb 88__   88__dP
  88"Yb  88""   88 Y88  8I  dY 88""   88"Yb
  88  Yb 888888 88  Y8 8888Y"  888888 88  Yb
  */

  let list_data = list.length > 0 ?
    list.map((item, ndx) => {
      return (
        // <li key={`${data_obj._id}_${item._id}`} >{item.title_data}</li>
        <Item key={`${name}_view_${item._id}_${ndx}`} data={item} />
      );
    }) : null;

    return (
      <div className={`arc_view_wrapper ${name}`}>
        <div className="arc_view_header"></div>
        <div className={`arc_view_cont ${name}`}>
          <div className={`arc_view_content ${name} plain hide-scroll`}>
            {list_data}
          </div>
        </div>
      </div>
    );
```

```
  render(){}

  render(){

  let list_data = list.length > 0 ?
    list.map((item, ndx) => {
      return (
        // <li key={`${data_obj._id}_${item._id}`} >{item.title_data}</li>
        <Item key={`${name}_view_${item._id}_${ndx}`} data={item} />
      );
    }) : null;

    return (
      <div className={`arc_view_wrapper ${name}`}>
        <div className="arc_view_header"></div>
        <div className={`arc_view_cont ${name}`}>
          <div className={`arc_view_content ${name} plain hide-scroll`}>
            {list_data}
          </div>
        </div>
      </div>
    );
  }// render
```
**GOTCHA: props is not defined**

```
  render(){
    let state = this.state;
    let props = this.props;
    
    if(typeof props == "undefined"){

      let list_data = list.length > 0 ?
        list.map((item, ndx) => {
          return (
            // <li key={`${data_obj._id}_${item._id}`} >{item.title_data}</li>
            <Item key={`${name}_view_${item._id}_${ndx}`} data={item} />
          );
        }) : null;

        return (
          <div className={`arc_view_wrapper ${name}`}>
            <div className="arc_view_header"></div>
            <div className={`arc_view_cont ${name}`}>
              <div className={`arc_view_content ${name} plain hide-scroll`}>
                {list_data}
              </div>
            </div>
          </div>
        );

    }else{
      return null;
    }
  }
```
