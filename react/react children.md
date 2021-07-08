# React childern notes
*working with react children*


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