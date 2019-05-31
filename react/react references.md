# React references
>[access components externally](https://brettdewoody.com/accessing-component-methods-and-state-from-outside-react/)

>intro found in Using Refs (lecture 105 & Refs with React Hooks Lecture 106)

**Old method**
```
const ourComponent = ReactDOM.render(<OurComponent />, document.getElementById("app"));

ourComponent.someMethod() // would call the method
```


**New Method (correct)**
```
ReactDOM.render(<Page ref={(ourComponent) => {window.ourComponent = ourComponent}} />, document.getElementById("app"));
```

tutorial example.html
```
<div id="app"></div>

<button id="parentButton">Get Parent State</button>
<button id="childButton">Get Child State</button>
```

tutorials example.js
```
  class ChildComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: 0
      }
    }

    returnCounter = () => {
      return this.state.counter;
    }

    increment = (event) => {
      event.stopPropagation();
      this.setState(prevState => {
        return {
          counter: prevState.counter + 1
        }
      })
    }

    render() {
      return (
        <div onClick={this.increment}>
          Child Value - {this.state.counter} - Click to increment
        </div>
      )
    }
  }

  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: 0
      }
    }

    returnCounter = () => {
      return this.state.counter;
    }

    increment = () => {
      this.setState(prevState => {
        return {
          counter: prevState.counter + 1
        }
      })
    }

    render() {
      return (
        <div onClick={this.increment}>
          <div>Parent Value - {this.state.counter} - Click to increment</div>
          <ChildComponent ref={(childComponent) => {window.childComponent = childComponent}}/>
        </div>
      )
    }
  }

  ReactDOM.render(<Page ref={(ourComponent) => {window.ourComponent = ourComponent}} />, document.getElementById("app"));

  const parentBtn = document.getElementById("parentButton");
  parentBtn.addEventListener("click", event => {
    alert(window.ourComponent.returnCounter());
  });

  const childBtn = document.getElementById("childButton");
  childBtn.addEventListener("click", event => {
    alert(window.childComponent.returnCounter());
  });
```
### [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)   
useState
```
  const [stateName, setStateName]  React.useState("initial value");
```
useEffect
```
  React.useEffect(() => {
    //set something after the elements have been rendered
    let targ_el = document.querySelector(`.${elemenNameString}`);
    targ_el.click = (e) => {
      callout_fn();
    }
  })
```
