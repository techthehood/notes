# React childern notes
*working with react children*

[React.Children docs](https://reactjs.org/docs/react-api.html#reactchildren)   

#### [How to pass props to {this.props.children}](https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children)   

> setup index.js

```
  const App = () => {
  // This approach is less type-safe and Typescript friendly since it
  // looks like you're trying to render `Child` with `sayHello` missing.
  // It's also confusing to readers of this code.
  return (
    <Parent>
      <Child childName="Billy" />
      <Child childName="Bob" />
    </Parent>
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
```

> the Child component
```
  const Child = ({ childName, sayHello }) => (
    <button onClick={() => sayHello(childName)}>{childName}</button>
  );

  export default Child;
```

> inside the Parent component
```
import {Children, cloneElement} from 'react'
// used instead of import React from 'react'

const Parent = ({
  children,
}) => {

  const sayHello = ()=>{...};

  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { sayHello });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>

}

export default Parent;
```

#### or Parent can call children as a function

> Parent component - return value (not using childrenWithProps part of the example above)
```
   return <div>{children(sayHello)}</div>
```

index.js
```
  return (
    <Parent>
      {(sayHello) => (
        <React.Fragment>
          <Child childName="Billy" sayHello={sayHello} />
          <Child childName="Bob" sayHello={sayHello} />
        </React.Fragment>
      )}
    </Parent>
  );

```
IMPORTANT: Child component explicitly calls the prop.sayHello function 
it doesn't run sayHello just by being a prop

### [How to pass data to props.children](https://frontarm.com/james-k-nelson/passing-data-props-children/)   

#### Render functions

_Link in JSX_
```
  // Display a link, whose style changes depending on whether the
  // link points to the window's current location.
  <Link href='/browse'>
    {isActive => (
      <span style={{ color: isActive ? 'red' : 'black' }}>
        Browse
      </span>
    )}
  </Link>
```

_Link component_

```
  export const Link = (props) =>
    <LocationContext.Consumer>
      {location =>
        <a {...props}>
          {
            // Call the render function to get the `<a>` tag's children.
            props.children(location.pathname === props.href)
          }
        </a>
      }
    </LocationContext.Consumer>
```
> comparison evaluates to true or false

#### Cloning children

```
  const List = (props) => {
  let elements = React.Children.toArray(props.children)

  if (elements.length === 1) {
    elements = React.cloneElement(elements[0], { className: 'top bottom' })
  }
  else if (elements.length > 0) {
    let lastElement = elements[elements.length - 1]
    elements =
      [React.cloneElement(elements[0], { className: 'top' })]
        .concat(elements.slice(1, -1))
        .concat(React.cloneElement(lastElement, { className: 'bottom' }))
  }
  
  return (
    <div className="List">
      {elements}
    </div>
  )
}

export const App = () =>
  <List>
    <div>Tame Impala</div>
    <div>Kingswood</div>
    <div>Flight Facilities</div>
  </List>
```

> note the use of *React.Children.toArray(props.children)* and *React.cloneElement(elements[0], { className: 'top' })*

> in my current setup i may need to use import to draw the needed properties from the react library

```
  import {Children, cloneElement} from 'react';
  // import { Component, createRef } from 'react';
```
