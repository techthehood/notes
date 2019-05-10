#### [introducing hooks](https://reactjs.org/docs/hooks-intro.html)   

#### [useEffect](https://reactjs.org/docs/hooks-effect.html)   
[useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)   
>similar to componentDidMount & componentDidUpdate - the best way to think of this is after (every) render

```
  import { useEffect } from 'react';

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```
