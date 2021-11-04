

## [mobx cheat sheet](https://devhints.io/mobx)   

#### [mobx github](https://github.com/mobxjs/mobx)   

#### [best practices](https://medium.com/dailyjs/mobx-react-best-practices-17e01cec4140)   

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
**so even 3 yrs later these things are still required - i did already have plugin-proposal-class-properties but i had to add { "loose" : true }**


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
### Using decorators
You can approach using decorators in two ways in MobX

  1. Enable the currently experimental decorator syntax in your compiler (read on)
  2. Don't enable decorator syntax, but leverage the MobX built-in utility decorate to apply decorators to your classes / objects.

#### Nested Observable objects (nested stores) - decorator syntax
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

#### another pattern using decorate - MobX built-in utility decorate
```
  import { observable, computed, decorate } from 'mobx';

  class Todo {
    values
    id
    complete

    constructor(value){
      this.value = value
      this.id = Date.now()
      this.complete = false
    }
  }

  decorate(Todo,{
    values: observable,
    id: observable,
    complete: observable
  })
```

**for either to work i think webpack has to be engaged and plugins have to be added to package.json or npm installed**
npm
```
  npm i @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators -D
```

package.json
```
"devDependencies": {
  "@babel/plugin-proposal-class-properties": "^7.2.1",
  "@babel/plugin-proposal-decorators": "^7.7.4",
```

webpack.config.js
```
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/preset-env','@babel/react'],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }]
          ]
        }
      },
      ...
    ]
  }
```
[How to (not) use decorators](https://mobx.js.org/best/decorators.html)   

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

#### Parenthesis optional
**also it seems parenthesis are optional here**
```
  const Store = new BirdStore();

  //or

  const Store = new BirdStore;
```

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
**@inject and @observer don't work with const ... (functional components)**

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
[Mobx React — Best Practices](https://medium.com/dailyjs/mobx-react-best-practices-17e01cec4140)    
#### Separate your rest calls from the stores
>Do not call your rest interface from within your stores. This makes them hard to test. Instead put these rest calls into extra classes and pass these instances to each store using the store’s constructor.

you can add it directly
```
class TodoApi {

  fetchTodos = () => request.get('/todos')
}

class TodoStore {

  @observable todos = [];

  constructor() {
    this.todoApi = new TodoApi();
  }
...

}
```

or add it through the constructors params
```
class TodoApi {

  fetchTodos = () => request.get('/todos')
}

class TodoStore {

  @observable todos = [];

  constructor(todoApi) {
    this.todoApi = todoApi;
  }
...

}

// Then in your main
const todoApi = new TodoApi();// notice 'new' is still used here
const todoStore = new TodoStore(todoApi);
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


## React and mobx api calls
[React AJAX and APIs](https://reactjs.org/docs/faq-ajax.html)   

> Where in the component lifecycle should I make an AJAX call?
You should populate data with AJAX calls in the componentDidMount lifecycle method. This is so you can use setState to update your component when the data is retrieved.

```
  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

```

[Mobx React — Best Practices](https://medium.com/dailyjs/mobx-react-best-practices-17e01cec4140)   
[Async Web API calls using React  with Mobx](https://mono.software/2019/04/16/async-webapi-calls-using-react-with-mobx/)    
[Managing React Application State with Mobx — Full stack tutorial (Part 1)](https://levelup.gitconnected.com/managing-react-application-state-with-mobx-full-stack-tutorial-part-1-372a7825847a)   

#### did i use a provider in my mobx experiment?
yes, i did in my BirdStore
```
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

```
**reminder above:  with mobx provider i could inject the store**
```

      const BirdList = inject('BirdStore')(observer(
        (props) => {
```
**without mobx Provider (deprecated) i have to find another way.


## React Context Api
[React Context API as an Alternative to State Management Libraries](https://levelup.gitconnected.com/react-context-api-as-an-alternative-to-state-management-libraries-cd061e3f70a2)   

[The React useContext Hook in a Nutshell](https://alligator.io/react/usecontext/)   

[React Hooks + MobX TodoList](https://levelup.gitconnected.com/react-hooks-mobx-todolist-c138eb4f3d04)    
**finally a clear description**
[How to Use the useContext Hook in React](https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react)   
**and a really great followup - maybe even better**
#### GOTCHA: the Context itself has to be imported and added to useContext

ColorContext.js
```
  const colors = {
  blue: "#03619c",
  yellow: "#8c8f03",
  red: "#9c0312"
};

export const ColorContext = React.createContext(colors.blue);
```

App.js
```
  import { ColorContext } from "./ColorContext";

function App() {
  return (
    <ColorContext.Provider value={colors}>
      <Home />
    </ColorContext.Provider>
  );
}
```

using .consumer
```
  return (
  <ColorContext.Consumer>
    {colors => <div style={colors.blue}>...</div>}
  </ColorContext.Consumer>
);
```

using useContext
```
  import React, { useContext } from "react";

const MyComponent = () => {
  const colors = useContext(ColorContext);

  return <div style={{ backgroundColor: colors.blue }}>...</div>;
};
```
**this example must be for a single file where you can reference the Context**

#### multiple file version
Context & Provider
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

Provider wrapper in app.js
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

add the store to your component
```
  import { observer, inject } from "mobx-react";

  const Updraft = observer( () => {

    const draftStore = useContext(DraftContext);
```

#### React Hooks Api calls
[React Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)   
> We only want to fetch data when the component mounts. That's why you can provide an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component.

```
  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
    setData(result.data);
  }, []);
```

#### GOTCHA: importing an object into the store caused the object to be converted to a proxy object

updraft.js
```
  const Updraft = () => {

    const draftStore = useContext(DraftContext);

    useEffect(() => {

      let draft_data = (typeof ITEM_DATA == "string") ? JSON.parse(ITEM_DATA) : ITEM_DATA;
      draftStore.ITEM_DATA = draft_data;

      draftStore.ITEM_DATA = draft_data;
    })
```

attempt to fix using mobx.toJS()
./updraft/index.js (updraft.js)
```
  import {toJS} from "mobx";

  const Updraft = () => {

    const draftStore = useContext(DraftContext);

    useEffect(() => {

      let draft_data = (typeof ITEM_DATA == "string") ? JSON.parse(ITEM_DATA) : ITEM_DATA;
      draftStore.ITEM_DATA = draft_data;

      draftStore.ITEM_DATA = toJS(draft_data);
    })
```
**failed**

attempt to modify it in an action
./updraft/index.js (updraft.js)
```
  React.useEffect( () => {
    console.log("[updraft] useEffect running");

    draftStore._update_item_data(ITEM_DATA);

  },[]);// single use setup
```

draftStore.js
```
  @action _update_item_data = (iDat) => {
    this.ITEM_DATA = (typeof iDat == "string") ? JSON.parse(iDat) : iDat;
  }
```
**works but fails to make a difference - output is still a proxy object**

**i thing the proxy is created because the object is @observable - i think to output js you have to reduce it using toJS within the store**
```
    autorun(() => {
      console.log("[draftStore] ITEM_DATA", store.ITEM_DATA);

      // if its a proxy, convert it to js (like using .lean() in mongoose)
      console.log("[draftStore] ITEM_DATA toJS", toJS(store.ITEM_DATA));
      // console.log(store.todos[0]);
    })
```
**works**

can i modify the objects properties directly?
A: yes - even though its a proxy object i can still call its properties and modify them like regular js

devtools console
```
  draftStore.ITEM_DATA.title_data = "can i modify this?";
```
**worked**

i set up an experiment to see what it is originally
```
  @observable ITEM_DATA = {item:"none"};
```
and it comes out as a proxy
```
  console.log("[updraft] draftStore ITEM_DATA",draftStore.ITEM_DATA);
  draftStore._update_item_data(ITEM_DATA);
```
// returns [updraft] draftStore ITEM_DATA proxy

#### mobx and functional components
> functional components don't
- use async

#### class based components
> class based components don't
- use provider ( pass the store as a prop )
- use hooks like useEffect or useState

#### store data show proxy
> Proxy {…}
but it still functions like any other json data - i just cant view it easily without opening proxy's [target] property


#### Can i have multiple instances of the same store

#### I don't need to wrap a provider to make a functional component observable
```
  if(permission_to_store == true){
    bkmk_sections.push(
      // <MainProvider>
        <HoldYourHorses key="search" modal={{name:modal_name}} data={{prefix,state}}>
          <ListBookmarks mode={"hold"} modal={{name:modal_name}} data={dbData} key={`${prefix}hold`} />
        </HoldYourHorses>
      // </MainProvider>
    );
```

#### GOTCHA: [React not rerendering after mobx observer change](https://stackoverflow.com/questions/46513024/react-not-rerendering-after-mobx-observer-change)   
[Enabling decorators](https://mobx.js.org/enabling-decorators.html)   

```
  class sampleStore {
    @observable todos = []

    constructor() {
        makeObservable(this)
    }

    @computed
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length
    }
}

```
