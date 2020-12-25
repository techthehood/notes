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

#### add context to your component (functional component)
index.js
```
    // import React from 'react';
    // import React, { useContext } from "react";
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



    const Updraft = () => {

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

    }// updraft

    export default Updraft;
```
