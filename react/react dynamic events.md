# [React Dynamic Events Study](https://codepen.io/inspectaTech/pen/JVOLjM?editors=0010)   

example.html
```
  <div id="root">
  </div>
```

example.css
```
  body {
      padding: 5px
  }

```

example.js
```
  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    render() {
      let click = (this.props.click) ? {onClick:this.handleClick}: null;
      // let click = (this.props.click) ? {onClick: () => this.handleClick() }: null;// this also works
      return (
        <button {...click} >
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }

  ReactDOM.render(
    <Toggle click={true}/>,
    document.getElementById('root')
  );

```
this worked, i passed the event like i would properties to an attribute object

working example with an external function passed in
```

  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    render() {
      let click = (this.props.click != undefined) ? this.props.click : null;

      return (
        <button {...click} >
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }

    function handleExternalClick() {
      window.toggle_el.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    };

  ReactDOM.render(
    <Toggle click={{onClick:handleExternalClick}}
      ref={(toggle_el)=>{ window.toggle_el = toggle_el }} />,
    document.getElementById('root')
  );
```
[Handling events](https://reactjs.org/docs/handling-events.html)   
[original pen by Dan Abramov](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)   
[dynamic attributes hint](https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs)   

#### [React SyntheticEvent reuse](https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6)   
[React SyntheticEvent docs](https://reactjs.org/docs/events.html#event-pooling)   
```
    export const set_hold_mode = function(e,el,fn,hdta)
    {
      //e.preventDefault();//prevent default here kills the ability for touch screen scrolling
      e.persist();// used for react event pooling (synthetic events)
      let state = hdta.state;
      if(state.sort_mode == "true") return;
```
[Error Boundaries](https://reactjs.org/docs/error-boundaries.html)   

ErrorBoundary.js
```
  class ErrorBoundary extends React.Component {
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
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

app.js
```
  <ErrorBoundary>
    <MyWidget />
  </ErrorBoundary>
```
