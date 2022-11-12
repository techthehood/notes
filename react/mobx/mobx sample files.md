# mobx store sample

#### Store Sample
draftStore.js
```
  console.log("[draftStore]");
  import { observable, autorun, runInAction, action, computed, decorate } from 'mobx';
  import DraftService from "./draftService";

  class DraftStore {
    constructor(draftservice){
      this.DraftService = draftservice;
    }// constructor

    @observable ITEM_DATA;
  }

  const store_api = new DraftService();
  // const store = new DraftStore(store_api);
  const store = window.draftStore = new DraftStore(store_api);

  export default store;

  autorun(() => {
    console.log("[draftStore] ITEM_DATA ",store.ITEM_DATA);
    // console.log(store.todos[0]);
  })
  // this autorun and the window.store lets me play around with the store directly from the console.
```

#### Service Sample
draftService.js
```
  console.log("[draftService]");
  import { observable, runInAction, action, computed, decorate } from 'mobx';

  class DraftService {

  }

  export default DraftService;

```

#### Wrapping your components with the provider component in app.js
App.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import Updraft from './lib/updraft';
import {DraftProvider} from './lib/updraft/draftContext';
import ErrorBoundary from "./lib/updraft/Error";

import '../css/app.css';

const addUpdraft = (
  <ErrorBoundary>
    <DraftProvider >
      <Updraft />
    </DraftProvider>
  </ErrorBoundary>
)

ReactDOM.render(addUpdraft, document.getElementById('updraft_content'));
```
**at this stage you can modify the ITEM_DATA variable from the devtools console and see the console's autorun output**

### more sample Provider

> NOTE: see mobx function context.md for update on using Provider with mobx-react

```
  import {MainContext, MainProvider} from './lib/main/mainContext';
  const mainStore = require('./lib/main/mainStore').default;
  const {store2} = require('./lib/main/mainStore');  


  function main_core(){

    let main = (
      <MainProvider>
        {main_el}
      </MainProvider>
    )
  }// main_core

  function portable_core(){

      let main = (
        <MainProvider store={store2}>
          {main_el}
        </MainProvider>
      )
  }// portable_core
```
> NOTE: if a store isn't provided the MainProvider will use the default store by default
> otherwise a store can be added

#### Create an error boundary
Error.js - ErrorBoundary
```
  import React, { Component } from "react";

  // class ErrorBoundary extends React.Component {
  class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error("[error boundary] an error occured: ",error, errorInfo)
      // logErrorToMyService(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }
  export default ErrorBoundary;

```

#### create a context/provider component and add the store as its value
draftContext.js
```

  import DraftStore from './draftStore';

  const DraftContext = React.createContext();

  const DraftProvider = (props) => {
    return (
      <DraftContext.Provider value={DraftStore}>
        {props.children}
      </DraftContext.Provider>
    )
  }// DraftProvider

  export {
    DraftProvider,
    DraftContext
  }

```

### advanced context/provider

_mainContext.js_

> can take a passed in store or use the available default

```
import MainStore from "./mainStore";

const MainContext = React.createContext();

const MainProvider = (props) => {
  return (
    <MainContext.Provider value={props.store ? props.store : MainStore} MainStore={props.store ? props.store : MainStore} >
      {props.children}
    </MainContext.Provider>
  );
}

export {
  MainProvider,
  MainContext
}
```

#### functional component use
custom_check.js
```
  const custom_check = observer((props) => {
    // const custom_check = observer(forwardRef((props, ref) => {
    ...
    let coreStore = useContext(CoreContext);// not dynamic

    if(tVar.check_mode == "false"){
      return (
        <>
        </>
      );
    }else{
      return null;
    }//else

  });//custom_check

  export default custom_check;
```
> GOTCHA: don't forget to add the observer() around the component declaration so the component can rerender when relavent changes occur to the state. Also NOTE forwardRef inside observer above

#### class based component use
check_option.js
```
  class check_option extends React.Component {

    constructor(props){
      super(props);
    }// constructor

    render(){

      this.context;//works

      ...

    }//render

  }// check_option

  check_option.contextType = CoreContext;

  export default check_option;
```
**GOTCHA:**
> i don't think this version updates dynamically with changes to the store.  for that i would need to use mobx observer or
CoreContext.Consumer.  I think the Consumer is limited to the

#### [React hooks useContext](https://daveceddia.com/usecontext-hook/)   
**this article suggests useContext as an alternative to CoreContext.Consumer - maybe useContext is dynamic afterall?**
#### [official React Context docs](https://reactjs.org/docs/context.html)   

#### more add context to your component (functional component)
index.js
```
    // import React from 'react';
    // import React, { useContext } from "react";
    import {observer} from 'mobx-react';
    import { useContext } from "react";
    import './Updraft.css';
    import InContext from '../inContext';
    import {DraftContext} from './draftContext';

    console.log("loading updraftjs");
    /**
      * @desc translates db data into an interactive organizational chart
      * @param
      * @return
      *
      * @author
      * @required hammer js
    */



    const Updraft = observer(() => {

      const draftStore = useContext(DraftContext);
      const  menu = [
        {"label":"Item 1"},
        {"label": "Menu item 2"},
        {"label": "Apple"},
        {"label": "This is orange"},
        {"label": "Context menu is fun"},
        {"label": "Cool"}
      ];

      React.useEffect( () => {
        console.log("[updraft] useEffect running");

        console.log("[updraft] draftStore ITEM_DATA",draftStore.ITEM_DATA);
        draftStore._update_item_data(ITEM_DATA);

      },[]);// single use setup

      const context_action = function (e) {
        e.preventDefault();
        let target = e.target;
        console.log("[context action] you clicked on ", e.target.innerHTML);
      }

      return (
        <div className="updraft hide-scroll">
          <div className="flightCtrls"></div>
          <InContext items={ menu } callback={context_action} />
            <div className="mindScape">
              <div className="whatso">Hello World!</div>
            </div>
        </div>
      );

    })// updraft

    export default Updraft;
```
