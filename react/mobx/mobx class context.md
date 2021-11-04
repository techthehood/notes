# mobx class context
[Access stores from class using mobX and react Context](https://stackoverflow.com/questions/54263228/access-stores-from-class-using-mobx-and-react-context)   

from NavBtns functional component
MainProvider was wrapped on a parent component so MainContext is available
```
const state = useContext(MainContext);

let binder_chk = (
    <BinderCheck store={state}/>
  )
```

```
  constructor(props){
    super(props);
    // const state = React.createContext(MainContext);// fails
    const store = props.store;
  }// constructor
```
**this is an accurate, working store  passed through props by mainContext - observer doesn't cause rerenders though**

```
  import mainStore from '../../../main/mainStore';


  @observer
    class BinderCheck extends React.Component {

      constructor(props){
        super(props);

        const store = mainStore;

        console.warn(`[mainStore]`,store);
      }// constructor
```
**same, it works the same as passing props - still no rerenders**

> both of the above methods fail to create re-renders when store items change, even if observables change
> not neccessarily true. i may have had a coding error using main instead of alt in folder_data

[Connect MobX observer components to the store with the React Provider](https://egghead.io/lessons/react-connect-mobx-observer-components-to-the-store-with-the-react-provider)   
**this passes the store into the observer as an array string ["storeName"]**
```
  @observer(["mainContext"])
  class BinderCheck extends React.Component {
```
error: Cannot read property 'componentWillReact' of undefined
**failed**

#### GOTCHA: observer not triggering re-renders
**ok observer is working, you just have to be using an observable property from the store in the render.**
```
  <div>{store.text_view}</div>
```

#### class provider setup

> NOTE: notice it doesn't need a provider

_profile-panel/js/mobx.js_

```
import ReactDOM from "react-dom";
import TodoList from "./components/todo/TodoList";
import Store from "./components/todo/TodoStore";
import ErrorBoundary from "./components/Error";
import "../css/mobx.scss";


export const get_mobx = () => {

    // pp_content_cont
    ReactDOM.render(
        <ErrorBoundary>
          <TodoList store={Store} />
        </ErrorBoundary>,
        document.querySelector(".pp_mobx_cont")
    );

}// get_mobx
```

#### sample class component

```
  // console.log("[TodoList]");
  import React, { Component } from "react";
  import { observer } from "mobx-react";

  import Mobx from "mobx";
  import { decorate, observable } from "mobx";

  @observer
  class TodoList extends Component{
    // constructor(props){
    //   super(props);
    // }
    filter(e){
      this.props.store.filter = e.target.value;
    }

    createNew(e){
      if(e.which === 13){
        this.props.store.createTodo(e.target.value);
        e.target.value = "";
      }
    }

    toggleComplete(todo){
      todo.complete = !todo.complete;
    }

    render(){

      const { todos, filter, filteredTodos } = this.props.store;
      const todoList = filteredTodos.map( todo => {
        let listStyle = {listStyle: "none"};
        return <li key={todo.id} style={listStyle}>
        <input type="checkbox" value={todo.complete} checked={todo.complete}
        onChange={this.toggleComplete.bind(this, todo)} />
        {todo.value}</li>
      });

      return (
        <React.Fragment>
          <h1>Mobx Todos</h1>
          <label>Filter</label>
          <input className="filter" value={filter} onChange={this.filter.bind(this)} />
          <label>add todo:</label>
          <input className="create" onKeyPress={this.createNew.bind(this)} />
          <ul>{todoList}</ul>
          <a href="#" onClick={this.props.store.clearComplete} >Clear Complete</a>
        </React.Fragment>
      );
    }
  }

  export default TodoList;

```

#### sample store

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

  class TodoStore {
    @observable todos = []
    @observable filter = ""
    @computed get filteredTodos(){
      let matchesFilter = new RegExp(this.filter, "i")
      return this.todos.filter( todo => !this.filter || matchesFilter.test(todo.value))
    }
    createTodo(value){
      // this.todos.push(value);
      this.todos.push(new Todo(value))
    }

    clearComplete = () => {
      // this.todos = [];// this doesn't work with observable arrays
      let incompleteTodos = this.todos.filter( todo => !todo.complete )// will return all the values where complete == false
      this.todos.replace(incompleteTodos); //replace old array with new version - in this case with the incomplete values

    }

  }//TodoStore

  var store = window.store = new TodoStore;

  export default store;

```