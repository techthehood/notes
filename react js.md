# React.js
[react beginners guide](https://reactjs.org/docs/hello-world.html)

Gotcha:
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
	
	//class component
 
	class Welcome extends React.Component {
		render() {
			return <h1>Hello, {this.props.name}</h1>;
		}
	}
```

	[The above two components are equivalent from React’s point of view.](https://reactjs.org/docs/components-and-props.html)
	
GOTCHA:
Note: Always start component names with a capital letter.

React treats components starting with lowercase letters as DOM tags. For example, <div /> represents an HTML div tag, but <Welcome /> represents a component and requires Welcome to be in scope.


issue with import
//ReferenceError: require is not defined


