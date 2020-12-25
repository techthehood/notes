# React Component Boilerplate

app.js
```

  const Actions from './tools/actions_react';

  export const actions = function () {

    //this will create a react modal for user actions

    //this will create a react modal for user actions
    let actions_home = document.getElementById('app');
    let data_obj = {};

    ReactDOM.render(
        <Actions data={data_obj} />,
        actions_home
    );


    //OR

    ReactDOM.render(
      <Actions data={data_obj} />,
      document.getElementById('app')
    );

  }//actions

```

actions.js
```
  import blanket from '../elements/blanket'

  export default class Actions extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {}
    }// constructor


    componentDidMount = () => {
      //this section is for setting up initial values just after page is rendered
      console.log("active component is ready to roll!");
      console.log(`available data = ${this.props.data}`);

      this.prep_vars(this.props.data);

    }//componentDidMount

    prep_vars = (sd_obj) => {

          let state = sd_obj.state;//arc's state
          let category = state.htmlDecode(unescape(sd_obj.category));
          let data_id = sd_obj.data_id;

    }

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now
    }//componentDidUpdate



    render() {
      // enter logic here
      return(
        <blanket>
        <div></div>
        </blanket>
        );
    }

  }// Actions

```
##### [ReactJS - Component Life Cycle](https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm)

##### [babel has a problem with class properties](https://stackoverflow.com/questions/43903632/why-wont-babel-transform-my-class-properties)   
```
npm install --save-dev @babel/plugin-proposal-class-properties
```
.babelrc
```
{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```
