

#### function provider setup

_profile-panel/js/mxr.js_

```
  import ReactDOM from "react-dom";
  import { Provider } from 'mobx-react';
  // using a provider makes the store available to all the children app components without passing store props to each one


  import BirdList from "./components/bird-cage/BirdList";
  import BirdStore from "./components/bird-cage/BirdStore";
  import ErrorBoundary from "./components/Error";
  import "../css/mobx.scss";


  export const get_mxr = () => {

    const root = (
      <ErrorBoundary>
        <Provider BirdStore={BirdStore} >
          <BirdList />
        </Provider>
      </ErrorBoundary>
    )

      // pp_content_cont
      ReactDOM.render(
          root,
          document.querySelector(".pp_mxr_cont")
      );

  }// get_mxr
```
> NOTE: notice the use of only a Provider component

```
  import { Provider } from 'mobx-react';

  <Provider BirdStore={BirdStore} >
    <BirdList />
```
> mobx-react has a provider that doens't have to be created separately

#### sample function component

_Birdlist.js_

```
    // console.log("[BirdList]");
    import React, { Component, useEffect, Fragment } from "react";
    import { observer, inject } from "mobx-react";

    const BirdList = inject('BirdStore')(observer(
      (props) => {

        useEffect(() => {
          // console.log("[BirdList] props",props);

        })// useEffect

        let output = null;
        let birdIn;
        const { BirdStore } = props;

        const handleSubmit = (e) => {
          e.preventDefault();
          let bird = birdIn.value;
          bird = bird.trim();

          if(bird == "") return;// prevent blank submissions

          BirdStore.addBird(bird);
          birdIn.value = '';
        }

        if(props.BirdStore){


          output = (
            <Fragment>
              <h1>You have {BirdStore.birdCount} Birds.</h1>
              <div className="App">
                <form onSubmit={ e =>  handleSubmit(e) }>
                <input type="text" placeholder="Enter bird" ref={ input => birdIn = input } />
                <button>Add Bird</button>
                </form>
              </div>
              <ul>
              {
                BirdStore.birds.map( bird => (
                  <li key={bird}>
                  {bird}
                  </li>
                ))
              }
              </ul>
            </Fragment>

          );

        }//if


          return output;

      }
    ))

    export default BirdList;

```

#### sample store

_BirdStore.js_

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