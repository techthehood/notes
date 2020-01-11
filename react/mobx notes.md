

#### [mobx github](https://github.com/mobxjs/mobx)

#### mobx cdn
```
  https://unpkg.com/mobx/lib/mobx.umd.js

  <script type="text/javascript" crossorigin src="https://unpkg.com/mobx/lib/mobx.umd.js"></script>
  <script type="text/javascript" crossorigin src="https://unpkg.com/mobx@5.15.0/lib/mobx.umd.js"></script>
```
#### npm installs
```
  npm install mobx --save
  npm install mobx-react --save
```
#### GOTCHA: **I tried to add the mobx cdn without npm installs and it couldn't find the mobx module**

#### GOTCHA: [mobx Support for the experimental syntax 'decorators-legacy' isn't currently enabled](https://medium.com/@patrickjbradley/support-for-the-experimental-syntax-decorators-legacy-isn-t-currently-enabled-f69206bade39)   
npm installation
```
    npm i -D @babel/plugin-proposal-decorators
```

#### add babelrc plugin to webpack or babelrc file
```
  ["@babel/plugin-proposal-decorators", { "legacy": true }]
```

#### GOTCHA:
```
  If you are using ["@babel/plugin-proposal-decorators", { "legacy": true }], make sure it comes *before* "@babel/plugin-proposal-class-properties" and enable loose mode, like so:
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
        ["@babel/plugin-proposal-class-properties", { "loose": true }]

```
**so even 3 yrs later these things are still reqired - i did already have plugin-proposal-class-properties but i had to add { "loose" : true }**


#### TodoStore Initial Sample
```
  import { observable, autorun } from 'mobx';

  //nostagia code
  // let store = {
  //   todo: [],
  //   createTodo(){
  //
  //   }
  // }// store

  class TodoStore {
    @observable todos = ["buy milk", "buy eggs"]
    @observable filter = ""
  }

  var store = window.store = new TodoStore;

  export default store;

  autorun(() => {
    console.log(store.filter);
    console.log(store.todos[0]);
  })
  // this autorun and the window.store lets me play around with the store directly from the console.

```
> in the console you can type store.filter = "give it a filter"; && store.todos[0] = "buy cheese";

TodoList.js
```
    console.log("[TodoList]");
    import React, { Component } from "react";
    import { observer } from "mobx-react";

    import Mobx from "mobx";
    import { decorate, observable } from "mobx";

    class TodoList extends Component{
      // constructor(props){
      //   super(props);
      // }

      render(){



        return (
            <h1>Mobx</h1>
        );
      }
    }

    export default TodoList;
```

#### [How does observer work](https://mobx.js.org/refguide/observer-component.html)   
> The observer HoC / decorator subscribes React components automatically to any observables that are used during render. As a result, components will automatically re-render when relevant observables change. But it also makes sure that components don't re-render when there are no relevant changes.


#### [using observable](https://mobx.js.org/refguide/observable-decorator.html)   

main.js
**add store to props**
```
  import store from "./components/TodoStore";

  export const get_mobx = () => {

      // pp_content_cont
      ReactDOM.render(
          <ErrorBoundary>
            <TodoList store={store} />
          </ErrorBoundary>,
          document.querySelector(".pp_mobx_cont")
      );

  }// get_mobx
```

TodoList.js
**add todos array from props - don't forget .Fragment (with a capital F)**
```
      render(){
        return (
          <React.Fragment>
            <h1>Mobx</h1>
            <h1>{this.props.store.todos[0]}</h1>
          </React.Fragment>
        );
      }
```

#### Create a filter
TodoList.js
```

  filter(e){
    this.props.store.filter = e.target.value;
  }

  render(){

    const { todos, filter } = this.props.store;
    const todoList = todos.map( todo => {
      return <li>{todo}</li>
    })

    return (
      <React.Fragment>
        <h1>Mobx Todos</h1>
        <div>{filter}</div>
        <input className="filter" value={filter} onChange={this.filter.bind(this)} />
```
TodoStore.js
**add computed**
```
  import { observable, computed } from 'mobx';

  class TodoStore {
    @observable todos = ["buy milk", "buy eggs"]
    @observable filter = ""
    @computed get filteredTodos(){
      let matchesFilter = new RegExp(this.filter, "i")
      return this.todos.filter( todo => !this.filter || matchesFilter.test(todo))
    }

  }
```
#### [How does computed work](https://mobx.js.org/refguide/computed-decorator.html)   
> Computed values are automatically derived from your state if any value that affects them changes.

create todo input

TodoList.js
```
  createNew(e){
    if(e.which === 13){
      this.props.store.createTodo(e.target.value);
      e.target.value = "";
    }
  }

  render(){
  ...

  <input className="filter" value={filter} onChange={this.filter.bind(this)} />
  <input classname="create" onKeyPress={this.createNew.bind(this)} />
```

TodoStore.js
**create a createTodo method in the store**
```
  class TodoStore {
    @observable todos = ["buy milk", "buy eggs"]
    @observable filter = ""
    @computed get filteredTodos(){
      let matchesFilter = new RegExp(this.filter, "i")
      return this.todos.filter( todo => !this.filter || matchesFilter.test(todo))
    }
    createTodo(value){
      this.todos.push(value);
    }

  }//TodoStore
```

#### Nested Observable objects (nested stores)
**create a todo type**
TodoStore.js
```
  class Todo {
    @observable values
    @observable id
    @observable complete

    constructor(value){
      this.value = value
      this.id = Date.now()
      this.complete = false
    }
  }
```

also update value in filteredTodos todo >> todo.value
```
  return this.todos.filter( todo => !this.filter || matchesFilter.test(todo))

  to

  return this.todos.filter( todo => !this.filter || matchesFilter.test(todo.value))
```

TodoList.js
**update output to refelct new todo object**
```
  return <li>{todo}</li>

  return <li key={todo.id} >{todo.value}</li>
```

#### add an input that toggles the complete property
TodoList.js
```
  return <li key={todo.id} >

  <input type="checkbox" value={todo.complete} checked={todo.complete} onChange={this.toggleComplete.bind(this, todo)} />

  {todo.value}</li>
```

add a toggleComplete method above render()
```
  toggleComplete(todo){
    todo.complete = !todo.complete;
  }
```
#### GOTCHA: needs onChange or it will fail without using defaultChecked
> Warning: Failed prop type: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.


#### add a clear complete

add a new clear complete btn
TodoList.js
```
    <ul>{todoList}</ul>

    <a href="#" onClick={this.props.store.clearComplete} >Clear Complete</a>

  </React.Fragment>
```

add a method to the store
```
  clearComplete = () => {
    // this.todos = [];// this doesn't work with observable arrays
    let incompleteTodos = this.todos.filter( todo => !todo.complete )// will return all the values where complete == false
    this.todos.replace(incompleteTodos); //replace old array with new version - in this case with the incomplete values

  }
```

## mobx react (birdStore)
[introduction to mobx and react](https://youtu.be/Dp75-DnGFrU)   

BirdStore.js
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

    const Store = new BirdStore();

    export default Store;// prevents many copies of the same store. we want a single store
```
**nothing really different here**
> there is a way to go into strict mode and restrict changes to the actions
#### GOTCHA: computed can't take '='
```
        @computed get birdCount = function () {
          return this.birds.length;
        }

        >>

        @computed get birdCount() {
          return this.birds.length;
        }
```
>  ERROR in ./js/components/bird-cage/BirdStore.js expected "("



#### Add a Provider (capital P)
mxr.js (app.js)
```
    import ReactDOM from "react-dom";
    import { Provider } from 'mobx-react';



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
> using a provider makes the store available to all the children app components without passing store props to each one
#### GOTCHA: [mobx - Leading decorators must be attached to a class declaration](https://stackoverflow.com/questions/40721277/mobx-leading-decorators-must-be-attached-to-a-class-declaration)   

```
  console.log("[BirdList]");
  import React, { Component, useEffect } from "react";
  import { observer, inject } from "mobx-react";

  @inject('BirdStore')
  @observer
  const BirdList = (props) => {
```
**@inject and @observer don't work with const ...**

#### [How to inject mobx store into a stateless component](https://stackoverflow.com/questions/42943719/how-to-inject-mobx-store-into-a-stateless-component)   
example
```
  const Example = inject("myStore")(observer(({myStore, otherProp}) => {
    // ...
  }));
```
My test which failed
```
  const BirdList = (props) => {
    // constructor(props){
    //   super(props);
    // }
    useEffect(() => {
      console.log("[BirdList] props",props);

    })// useEffect

      return (
          <h1>Birds</h1>
      );

  }
  inject('BirdStore')(observer(BirdList))

  export default BirdList;
```
**fails**

this test works and finally gives access to the props.BirdStore
```
      console.log("[BirdList]");
      import React, { Component, useEffect } from "react";
      import { observer, inject } from "mobx-react";

      const BirdList = inject('BirdStore')(observer(
        (props) => {

          useEffect(() => {
            console.log("[BirdList] props",props);

          })// useEffect

            return (
                <h1>Birds</h1>
            );

        }
      ))

      export default BirdList;
```

#### dynamic updates
Profile/ProfileStore.js
```
  var store = window.pStore = new ProfileStore;
```

Profile/index.js
```
  <h2>{props.ProfileStore.text}</h2>
```

devtools console
```
  pStore.text = "who";
```
>I can add dynamic values to the store but i can't make them observable so they update in react  renders
> (or can I? - need research)   
