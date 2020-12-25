# Intersection Observer


[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)   

### example options
```
  let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0
  }
```
**negative numbers in rootMargin act like using the threshold**

#### class component

#### add the callback fn

```
    ObserverSetupCallback = (node) => {

      console.warn(node);

    }//ObserverSetupCallback
```
**early example of ObserverSetupCallback**

#### add the callback to an element ref
>make a distinction in the map - ref only the last element
>if(state.list.length == ndx + 1)

```
if(state.list.length == ndx + 1){
  console.warn("[Arc] prepping elements");// log on the last element
  return (
    <div className="arc_item_wrapper" key={`${item._id}_${ndx}`} ref={this.ObserverSetupCallback}>
      <Item key={`${state.name}_view_${item._id}_${ndx}`} data={item} />
    </div>
  );
}else {
  return (
    <div className="arc_item_wrapper" key={`${item._id}_${ndx}`} >
      <Item key={`${state.name}_view_${item._id}_${ndx}`} data={item} />
    </div>
  );
}
```
**test it out to see if it logs in the console**


#### create the ref in componentDidMount
```
componentDidMount = () => {
  this.observer = createRef();
}
```

#### add the observer ref and the Intersection Observer
```
    ObserverSetupCallback = (node) => {
      // let fetch_me = this.fetch_info;

      this.setState({loading: true});// loading causes an extra render

      console.warn(node);
      if(this.state.loading == true) return;// if loading do nothing

      if(this.observer.current) this.observer.current.disconnect();

      this.observer.current = new IntersectionObserver( entries => {

        if(entries[0].isIntersecting){
          console.warn("visible");
          this.fetch_info();
          // fetch_me();
        }

      },{rootMargin: "250px", root: document.querySelector(`.arc_view_content.${this.state.name}`)})

      if(node) this.observer.current.observe(node);
      // if(node)

    }//ObserverSetupCallback
```

if it exists clear the last observer.current
```
  if(this.observer.current) this.observer.current.disconnect();
```

then observe the element
 ```
  if(node) this.observer.current.observe(node);
 ```




my working example
```
  import { Component, useCallback, createRef } from 'react';
  require('./Arc.scss');
  import Item from './lib/Item/Item';

  class Views extends Component {

  /*
  .dP"Y8 888888    db    888888 888888
  `Ybo."   88     dPYb     88   88__
  o.`Y8b   88    dP__Yb    88   88""
  8bodP'   88   dP""""Yb   88   888888

  [4MAX](http://patorjk.com/software/taag/#p=display&f=4Max&t=state)
  */

    constructor(props){
      super(props);
      this.state = {
        list: [],
        loading: true,
        return_data_length: 0,
        init: false,
        info_page: 1,
        name: props.mode || "default",
        iUN: props.iUN || Math.round(Math.random() * 10000),
        limit: 20,
        pair_page: 1,
        failsafe: 50,
        has_more: true,
        testing: false
      }
    }// constructor

  /*
  88  88  dP"Yb   dP"Yb  88  dP .dP"Y8
  88  88 dP   Yb dP   Yb 88odP  `Ybo."
  888888 Yb   dP Yb   dP 88"Yb  o.`Y8b
  88  88  YbodP   YbodP  88  Yb 8bodP'
  */



    componentDidMount = () => {
      this.observer = createRef();
    }


  /*
  8b    d8 888888 888888 88  88  dP"Yb  8888b.  .dP"Y8
  88b  d88 88__     88   88  88 dP   Yb  8I  Yb `Ybo."
  88YbdP88 88""     88   888888 Yb   dP  8I  dY o.`Y8b
  88 YY 88 888888   88   88  88  YbodP  8888Y"  8bodP'
  */

    fetch_info = async () => {

      let arc = this;
      let state = this.state;
      if(state.has_more == false) return;

      try {

        arc;
        let uploadData = {};
        const ctrl_Url = `${location.origin}/api/alight/arc/getRecent`;

        uploadData.mode = "page";
        uploadData.page = state.info_page;
        uploadData.limit = state.limit;

        const response = await axios.post(ctrl_Url, uploadData);

        let response_data = response.data;

        console.log("[request_binder_data] response",response);

        let requested_items = response_data.data;

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


      } catch (e) {
        console.error(`[paper] request error`,e)
      }
    }// fetch_info




  /*
  88""Yb 888888 88b 88 8888b.  888888 88""Yb
  88__dP 88__   88Yb88  8I  Yb 88__   88__dP
  88"Yb  88""   88 Y88  8I  dY 88""   88"Yb
  88  Yb 888888 88  Y8 8888Y"  888888 88  Yb
  */


    ObserverSetupCallback = (node) => {
      // let fetch_me = this.fetch_info;

      this.setState({loading: true});// loading causes an extra render

      console.warn(node);
      if(this.state.loading == true) return;

      if(this.observer.current) this.observer.current.disconnect();
      this.observer.current = new IntersectionObserver( entries => {
        if(entries[0].isIntersecting){
          console.warn("visible");
          this.fetch_info();
          // fetch_me();
        }
      },{rootMargin: "250px", root: document.querySelector(`.arc_view_content.${this.state.name}`)})

      if(node) this.observer.current.observe(node);
      // if(node)

    }//ObserverSetupCallback

    render(){

      let state = this.state;
      let props = this.props;

      if(typeof props != "undefined"){

        let list_data = state.list.length > 0 ?
        state.list.map((item, ndx) => {
            // <li key={`${data_obj._id}_${item._id}`} >{item.title_data}</li>
            if(state.list.length == ndx + 1){
              console.warn("[Arc] prepping elements");// log on the last element
              return (
                <div className="arc_item_wrapper" key={`${item._id}_${ndx}`} ref={this.ObserverSetupCallback}>
                  <Item key={`${state.name}_view_${item._id}_${ndx}`} data={item} />
                </div>
              );
            }else {
              return (
                <div className="arc_item_wrapper" key={`${item._id}_${ndx}`} >
                  <Item key={`${state.name}_view_${item._id}_${ndx}`} data={item} />
                </div>
              );
            }

        }) : null;

        console.warn("[Arc] rendering",state);

        return (
          <div className={`arc_view_wrapper ${state.name}`}>
            <div className="arc_view_header"></div>
            <div className={`arc_view_cont ${state.name}`}>
              <div className={`arc_view_content ${state.name} plain hide-scroll`}>
                {list_data}
                {(state.loading == true) ? (
                  <div className="arc_loader_wrapper" >
                    <div className="arc_item_loader loader"></div>
                  </div>
                  ) : null }
              </div>
            </div>
          </div>
        );

      }else{
        return null;
      }
    }// render
  }// Views


  export default Views;

  // style={{height: "200px", background: "red", width: "100%"}}

```
