# The Component

## What's a component?

A component is a small, reusable chunk of code that is responsible for one job. That job is often to render some HTML.

## Import the React object (react library)

```
	import React from 'react';
```


class names are written in UpperCamelCase.

here is my component syntax
```
//import the React object
import React from 'react';

//import the ReactDOM object for DOM interaction
import ReactDOM from 'react-dom';

//create the new component - UpperCamelCase naming convention
class MyReactComponent extends React.Component {
	render(){
		return <h1>Hello world!</h1>
	}
};

ReactDOM.render(<MyReactComponent />,document.getElementById('app'));
```

don't forget that the rule for multi-line JSX rendering still applies
```
	return(
	<blockquote>
        <p>
          The world is full of objects, more or less interesting; I do not wish to add any more.
        </p>
        <cite>
          <a target="_blank"
            href="https://en.wikipedia.org/wiki/Douglas_Huebler">
            Douglas Huebler
          </a>
        </cite>
      </blockquote>
	)
```

## Use a variable attribute in a component

check out my code
```

	import React from 'react';
	import ReactDOM from 'react-dom';


	const owl = {
	  title: 'Excellent Owl',
	  src: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-owl.jpg'
	};

	// Component class starts here:
	class Owl extends React.Component {
	  render(){
		return (
		<div>
			<h1>{owl.title}</h1>
			<img
			  src={owl.src}
			  alt={owl.title}
			  />

		 </div>
		);
	  }
	};

	ReactDOM.render(<Owl />,document.getElementById('app'));
```

**notice the brackets inside the h1 element.**
```
<h1>{owl.title}</h1>
```
 i omitted the brackets and it rendered the string 'owl.title' instead of 'Excellent Owl'


#### preserving 'this'  
```
	// to preserve 'this' use:
  onScroll={(e) => { this.active_section(e); }}
  // not
  onScroll={ this.active_section }

  // otherwise i have to bind this
  onScroll={ this.active_section.bind(this) }
  // which still preserves the event
```
