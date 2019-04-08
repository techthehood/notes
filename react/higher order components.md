higher order components
>it wraps another component, does not contain its own logic, styling or add any structure to the jsx code or real DOM

>introduced in rendering adjacent JSX Elements (udemy React 16.6 lecture 97)
```
return [
  <div></div>,
  <p></p>
]
```

if you use an array you should add a key to the element
```
  return [
    <div key="i2"></div>,
    <p key=i3""></p>
  ];

```

hoc/auxillary.js (Aux.js and Aux/ aux is a reserved word in windows - creates naming zip error)
```
  //import React from 'react';// not needed

  const aux = props => props.children;

  export default aux;
```
>case is not important on import because this export default will take whatever name you use on import

person.js using the Aux component
```
import Aux from './hoc/auxillary'

return  (<Aux>
          <div></div>
          <p></p>
        </Aux>);
```

**Using React.Fragment (built in hoc)***
react now has a build in component that does the same same thing

```
return  (<React.Fragment>
          <div></div>
          <p></p>
        </React.Fragment>);

        or

import {Fragment} from 'react'

return  (<Fragment>
          <div></div>
          <p></p>
        </Fragment>);



```
