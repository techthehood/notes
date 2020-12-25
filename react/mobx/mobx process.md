# Mobx process


### functional component process

#### 1. Create a Store
```
  class DraftStore {
    constructor(draftservice){
      this.DraftService = draftservice;
    }// constructor

    @observable initiated = false;
    @observable item_data = {title_data:"none"};
    @observable binders = {};
    @observable scale = 1;
    final_scale = 1;
    last_scale = 1;
    current_scale = 1;
    speed = 1;
    binder_ids = [];// not observable - i don't want the component to update with each change
    @observable token;
    @observable x = 0;
    @observable y = 0;
    lastX = 0;
    lastY = 0;


    @action _init_data = (iDat) => {
      this.item_data = (typeof iDat == "string") ? JSON.parse(iDat) : iDat;
      this.root_data = toJS(this.item_data);
    }/*_init_data*/

    @action _request_binder_data = async (item_data) => {
      let uploadData = {};
      // LATER: Paper list - updraft draftStore getItemInfo request
      const ctrl_Url = `${location.origin}/api/updraft/items/getItemInfo`;

      uploadData.item_data = item_data;

      const response = await axios.post(ctrl_Url, uploadData);

      console.log("[request_binder_data] response",response);

      let requested_data = response.data;

      this.binders[item_data._id] = {data: requested_data.data};

    }/*_request_binder_data*/

  }//DraftStore

  const store_api = new DraftService();
  // const store = new DraftStore(store_api);
  const store = window.draftStore = new DraftStore(store_api);

  export default store;

  autorun(() => {
    console.log("[draftStore] ITEM_DATA", store.item_data);

    // if its a proxy, convert it to js (like using .lean() in mongoose)
    console.log("[draftStore] ITEM_DATA toJS", toJS(store.item_data));
    // console.log(store.todos[0]);

    console.log("[draftStore] binders toJS", toJS(store.binders));
  })
```

#### -2 create a context and provider
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

#### Wrap app in Provider

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

#### 4. add context and observer to component

```
    // import React from 'react';
    // import React, { useContext } from "react";
    import { useContext, Fragment } from "react";
    import './Updraft.scss';
    import InContext from '../inContext';
    import {DraftContext} from './draftContext';
    import { observer, inject } from "mobx-react";
    const {exists} = require("../exists")


    const Updraft = observer(() => {

      const draftStore = useContext(DraftContext);

      return (
        <div className="updraft">
          <div className="flightCtrls"></div>
          <InContext items={ menu } callback={context_action} target="updraft_content" />
            <div className="mindScape">
              <div className="mindsEye hide-scroll" style={{transform: `scale(${draftStore.scale})`}}>
                {/*<div className="whatso">{draftStore.ITEM_DATA.title_data}</div>*/}
                {chart}
              </div>
            </div>
        </div>
      );

    })// updraft

    export default Updraft;
```

## Templates

#### Store
```
    import { observable, action, computed } from 'mobx';

    class BirdStore {
      @observable birds = [];

      @action addBird = (bird) => {
        this.birds.push(bird);
      }// addBird

      @computed get birdCount() {
        return this.birds.length;
      }
    }

    const Birdy = window.Birdy = new BirdStore();

    export default Birdy;// prevents many copies of the same store. we want a single store
```

#### Context & Provider

```
    import BirdStore from './BirdStore';

    const BirdContext = React.createContext();

    const BirdProvider = (props) => {
      return (
        <BirdContext.Provider value={BirdStore}>
          {props.children}
        </BirdContext.Provider>
      )
    }// BirdProvider

    export {
      BirdProvider,
      BirdContext
    }
```

#### wrapper

```
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Bird from './lib/Bird/Bird';
  import {BirdProvider} from './lib/Bird/BirdContext';
  import ErrorBoundary from "./lib/Bird/Error";

  import '../css/app.css';

  const addBird = (
    <ErrorBoundary>
      <BirdProvider >
        <Bird />
      </BirdProvider>
    </ErrorBoundary>
  )

  ReactDOM.render(
    addBird,
    document.getElementById('Bird_content')
  );
```

#### store and observer

```
  // import React from 'react';
  // import React, { useContext } from "react";
  import { useContext, Fragment } from "react";
  import './Bird.scss';
  import InContext from '../inContext';
  import {BirdContext} from './BirdContext';
  import { observer, inject } from "mobx-react";
  const {exists} = require("../exists")


  const Bird = observer(() => {

    const BirdStore = useContext(BirdContext);

    return (
      <div className="Bird">
        <div className="flightCtrls"></div>
        <InContext items={ menu } callback={context_action} target="Bird_content" />
          <div className="mindScape">
            <div className="mindsEye hide-scroll" style={{transform: `scale(${BirdStore.scale})`}}>
              {/*<div className="whatso">{BirdStore.ITEM_DATA.title_data}</div>*/}
              {chart}
            </div>
          </div>
      </div>
    );

  })// Bird

  export default Bird;
```
