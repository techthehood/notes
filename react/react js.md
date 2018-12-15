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

GOTCHA:
```
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.js"></script
```

	[React.createClass is not a function](https://stackoverflow.com/questions/46482433/reactjs-createclass-is-not-a-function)
	apparently its deprecated

	so i try the development versions
```
	<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
	<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

finally i try what i downloaded

# functional components && class components
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

## GOTCHA:
Note: Always start component names with a capital letter.

React treats components starting with lowercase letters as DOM tags. For example, <div /> represents an HTML div tag, but <Welcome /> represents a component and requires Welcome to be in scope.


issue with import
//ReferenceError: require is not defined


## GOTCHA - slider isn't moving even though the value is changing (appears stuck)
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

## [react lifeCycle methods](https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm
> componentDidMount is executed after the first render only on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval. We are using it to update the state so we can trigger the other lifecycle methods.

> componentDidUpdate is called just after rendering.

### video locations
- **udemy - #51 write variables inside the render fn b4 return**
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
- **udemy - #56 key properties on lists so it vdom can inspect and change single items**
- **udemy - #50 rendering content conditionally (similar to ng-show)  - create a method for toggling the value of a variable add showPersons as a variable in the state with a boolean or default value wraps div in js**
```
	 {(condition) ? <div></div> : null}
	 or a variable
	 Person = (condition) ? (<div></div>) : null;
```
- **udemy - #55 use slice operation to make copy of an array (no more bboy or nested parse/stringify)**
```
	let old_reference_obj = {v1:"1",v2:"2",v3:"3",v4:"4"}
	let new_unreferenced_obj = {...old_reference_obj};//makes a Copy
```
- **udemy - #53 - 56 lists using map (inside render before return is the regular js space)**
```
	...

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
- **udemy - adding 2 way binding - shows issue with adding value={props.value} without an onchange={props.change} handler locking the input to == value**

App.js - references Person.js
```
	<Person value={this.state.person.name} change={this.someFnName.bind(this)} />
```

Person.js
```
	<input type="text" value={props.value} onchange={props.change}/>
```
**above are attempst so and an onchange handler - defaultValue was used instead of value**
