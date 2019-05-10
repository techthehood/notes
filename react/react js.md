# React.js
[react beginners guide](https://reactjs.org/docs/hello-world.html)

GOTCHA:
ReactDOM.react() should be ReactDOM.render

GOTCHA:
next i added this script to the body instead of the js nested in the script tag.
```
	<script type="text/babel" src="index.js"></script>
```
babel.min.js:24 Failed to load file:///C:/Users/d3pot/version-control/react/react_scratch/index.js: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.

Cross origin request?

try:
install python
$ python -m SimpleHTTPServer

GOTCHA:
python -v (doesn' work on git bash or CLI)
use python --version-control/react/react_scratch/index

ctrl - z closes python on CLI - bash i don't know

[how to use simpleHttpServer](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/)

GOTCHA:
try:
```
$ python -m SimpleHTTPServer
```
//No module named SimpleHTTPServer

searced error(https://github.com/ghickman/classify/issues/16)
python 3 simple server syntax has changed to:

```
python -m http.server
```

default port is 8000
```
localhost:8000
```

GOTCHA:
	experiments with example file (jquery-mobile)
	<script src="../../build/react.js"></script>
	<script src="../../build/react-dom.js"></script>

	404 localhost:8000/build/react.js file not found

	i assume python server can't go outside of its own root to find a file so i try using a cdn

	[react cdn](https://reactjs.org/docs/cdn-links.html)

GOTCHA: ?
```
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.js"><script>
```

[React.createClass is not a function](https://stackoverflow.com/questions/46482433/reactjs-createclass-is-not-a-function)   
apparently its deprecated

so i try the development versions
```
	<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
	<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

finally i try what i downloaded

#### functional components && class components
```
	//functional component

	function Welcome(props) {
	  return <h1>Hello, {props.name}</h1>;
	}

	//class component (or container)

	class Welcome extends React.Component {
		render() {
			return <h1>Hello, {this.props.name}</h1>;
		}
	}
```

	[The above two components are equivalent from React’s point of view.](https://reactjs.org/docs/components-and-props.html)

##### GOTCHA:
Note: Always start component names with a capital letter.

React treats components starting with lowercase letters as DOM tags. For example, <div /> represents an HTML div tag, but <Welcome /> represents a component and requires Welcome to be in scope.


issue with import
//ReferenceError: require is not defined


##### GOTCHA - slider isn't moving even though the value is changing (appears stuck)
[references defaultValue](https://discuss.reactjs.org/t/how-to-pass-in-initial-value-to-form-fields/869/4)   

**fails**
```
	<input id='checker' className='checker' type='range'
	min='1' max='3.0' step='0.01' value='1.0' onChange={this.changeMe} />
```
**works**
```
	<input id='checker' className='checker' type='range'
	min='1' max='3.0' step='0.01' defaultValue='2.0' onChange={this.changeMe} />
```
**fails**
```
	<input id='checker' className='checker' type='range'
	min='1' max='3.0' step='0.01' value={this.state.scale} onChange={this.changeMe} />
```

##### [react lifeCycle methods](https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm)
> componentDidMount is executed after the first render only on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval. We are using it to update the state so we can trigger the other lifecycle methods.

> componentDidUpdate is called just after rendering.

##### video locations   

**udemy - #51 write variables inside the render fn b4 return**
```
	render(){
		let varName = "value";
		return (
			<div>
			<p>jsx content</p>
			</div>
		)
	}
```
**udemy - #56 key properties on lists so it vdom can inspect and change single items**  

**udemy - #50 rendering content conditionally (similar to ng-show)  - create a method for toggling the value of a variable add showPersons as a variable in the state with a boolean or default value wraps div in js**   
```
	 {(condition) ? <div></div> : null}
	 or a variable
	 Person = (condition) ? (<div></div>) : null;
```
**udemy - #55 use slice operation to make copy of an array (no more bboy or nested parse/stringify)**   
```
	let old_reference_obj = {v1:"1",v2:"2",v3:"3",v4:"4"}
	let new_unreferenced_obj = {...old_reference_obj};//makes a Copy
```
**udemy - #53 - 56 lists using map (inside render before return is the regular js space)**   

```

	componentDidMount = () => {
		let array_obj = [{id:"1"},{id:"2"},{id:"3"},{id:"4"}];
		this.setState({array_obj});
	}

	render(){
		let new_list = this.state.array_obj.map(item => {
		return <div>{item.id}</div>
		})

		return (
			<div>
				{new_list}
			</div>
		)
	}

	or

	return (
		<div>
			{this.state.array_obj.map(item => {
				return <div>{item.id}</div>
			})}
		</div>
	)
	...

```

**udemy - adding 2 way binding - shows issue with adding value={props.value} without an onchange={props.change} handler locking the input to == value**   

App.js - references Person.js
```
	<Person value={this.state.person.name} change={this.someFnName.bind(this)} />
```

Person.js
```
	<input type="text" value={props.value} onchange={props.change}/>
```
**above are attempst so and an onchange handler - defaultValue was used instead of value**   

**[passing a funtion to react](https://www.youtube.com/watch?v=iWcNI4PIjVU)**   
**[passing arguments to event handlers](https://reactjs.org/docs/handling-events.html)**
```
// const {action_msg} = require('./action_msg.js');// produces an error - is not a function
import {action_msg} from './action_msg';//works

return(
	<div onClick={(e) => action_msg({mode:"test"}) } ></div>
	)
```
**notice the onClick camel-case**
i tried to bind without using this and it passed the event first instead of my object

```
	onClick={action_msg.bind({mode:"test"})}
```
**failed**

##### using setState incorrectly
udemy lecture # 103 Setting State Correctly
**(the counter increment example)**

```
	this.setState({
		persons:person,
		changeCounter: this.state.changeCounter + 1
	})
```
>this.state when used for a state update may not be the latest state, it may be a previous state.

```
	this.setState((prevState, props) => {

		return {
			persons:person,
			changeCounter: prevState.changeCounter + 1
		}
	});
```
> you can use a method with a returned value in a method. setState gives you two arguments.The first argument of setState method is previous state, the second is the props just in case you need them.
**first argument is the previous state (guaranteed to be the actual previous state)**

```
my_action
```
//returned : Actions {props: {…}, context: {…}, refs: {…}, updater: {…}, timer: 22, …}

```
my_action.state
```
returned:
{app_state: {…}, message: "custom alpha", prefix: "arc_"}app_state: {size_ary: {…}, device_size: "medium", device_type: "tablet", object_elements: {…}, database_pair: {…}, …}message: "custom alpha"prefix: "arc_"__proto__: Object

```
my_action.setState({message:"new message"});
undefined
```
> this worked. it changed the text on the target

##### can i change the state object properties dynamically?
```
var my_var = "message";
undefined
```
**set up a variable string representing the object property i want to access**

Here is a test to see if i can access the DOM target without using querySelector etc.
```
$("arc_action_cont")
n.fn.init [prevObject: n.fn.init(1), context: document, selector: "arc_action_cont"]

var action_cont = $(".arc_action_cont");
undefined
```


```
action_cont
```
//returned:
n.fn.init [div.arc_action_cont.action_cont.d3-fade-in-quick, prevObject: n.fn.init(1), context: document, selector: ".arc_action_cont"]0: div.arc_action_cont.action_cont.d3-fade-in-quickcontext: documentlength: 1prevObject: n.fn.init [document, context: document]selector: ".arc_action_cont"__proto__: Object(0)
**action_cont variable works but only once accessing the array index**

```
action_cont[0]
```
// returned:
<div class=​"arc_action_cont action_cont d3-fade-in-quick" style=​"display:​ none;​">​…​</div>​
**this is what i wanted**

make my target element visible
```
action_cont[0].style.display = "block"
```
// returned: "block"

```
my_action.setState({`${my_var}`:"another msg"});//failed
VM59114:1 Uncaught SyntaxError: Unexpected template string

my_action.setState({my_var:"another msg"});//failed
undefined

my_action.setState({"mesage":"another msg"});// probably worked
undefined

my_action.setState({my_var});//failed
undefined
my_action.setState(my_var:"something else"});//failed
VM59356:1 Uncaught SyntaxError: missing ) after argument list

my_action.setState({my_var:"something else"});//failed
undefined
```
**for all intents and purposes the above tests were unsuccessful**

[appearantly its called property accessors (who knew?)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)   

let me try a different approach and set the object up and its properties with property accessors before i pass it to set state.
```
let stateful = {};

stateful[my_var] = "another message";

my_action.setState(stateful);

//same but with a spread operator

stateful[my_var] = "more of the same";
"more of the same"
my_action.setState({...stateful});
undefined
```
[dynamically set custom tag names](https://stackoverflow.com/questions/33471880/dynamic-tag-name-in-jsx-and-react)   


react example
```
		let sel_tag = (typeof value == "string" && value.indexOf("http") != -1) ? "a" : "div",
	  let Custom_tag = tag || "div";

	      ret_El = (
					<Custom_tag id={`${name}_TDTag_${iUN}`}
	      		className={custom_class}>
	        	{value}
	      	</Custom_tag>
				);
```
**Custom_tag has to begin with a capital letter

[dynamically set attributes](https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs)   

[unmounting](https://reactjs.org/blog/2015/10/01/react-render-and-top-level-api.html)

mounting multiple components -
multiple apps(components) can't be rendered to the same container.
