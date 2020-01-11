

initial imports
```
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import App from './App';
```

1st i need a store = globalized state

2nd i need an action - describes what you want to do - well do INCREMENT

3rd reducer - checks what action you did and modifies the global store

4th dispatch - execute the action to the reducer

create store
```
  import { createStore } from 'redux';

  let store = createStore(reducer)
```

create an action
a function that returns an object
```
  const increment = (nr) => {
    return {
      type: 'INCREMENT',
      payload: nr
    }
  }
  const decrement = () => {
    return {
      type: 'DECREMENT'
    }
  }
```

create reducer
```
  const counter = ( state = 0, action ) => {
    switch(action.type){
      case 'INCREMENT':
        return state + action.payload;
      case 'DECREMENT':
        return state - 1;
    }
  }
```

side mission
```
  //Display it in the console
  store.subscribe( () =>  console.log(store.getState()));
```

//Dispatch
store.dispatch(increment(5));


ReactDom.render(<App />, document.getElementById('root'));


[add chrome extension redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension)   

```
  const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
```

[]()   
```
 import { createStore } from 'redux';

 const initialState = {
   auth: {loggedIn: false}
 }

 const store = createStore( (state = initialState, action) => {

   switch(action.type){
     case "LOG_IN":
      return { ...state, auth: { loggedIn: true }}
     case "LOG_OUT":
      return { ...state, auth:{ loggedIn : false } }

     default:
      return state;
   }

 });
```

```
import { createStore } from 'redux';

//create a store

let store = createStore(counter);

//create actions

const increment = (nr) => {
  return {
    type: 'INCREMENT',
    payload: nr
  }
}

const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

// Create Reducer with default state

const counter = (state = 0, action ) => {

  switch(action.type){
    case 'INCREMENT':
      return state + action.payload;
    case: 'DECREMENT':
      return state - 1;
      /*return sets a new state (like calling .setState())*/
  }
}

// Dispatch action

store.dispatch(increment(5));

//Display it in the console
store.subscribe( () => console.log( store.getState()));


```
