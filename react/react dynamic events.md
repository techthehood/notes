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
