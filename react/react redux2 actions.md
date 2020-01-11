creators, actions, reducers


finished example of auth reducer (reduces/auth.js)
```
  import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_ERRORS } from '../actions/types';

  const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: ''
  }

  export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case AUTH_SIGN_UP:
          console.log('[AuthReducer] got an AUTH_SIGN_UP action!');
          return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
        break;
      case AUTH_SIGN_OUT:
          console.log('[AuthReducer] got an AUTH_SIGN_UP action!');
          return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' }
        break;
      case AUTH_ERRORS:
          console.log('[AuthReducer] got an AUTH_ERRORS action!');
          return { ...state, errorMessage: action.payload };
        break;

      default:

    }
    return state;
  }

```

call the action in the onSubmit method
also install redux-thunk middleware so dispatch can be made asyncronous
to do this you have to go to the main app and import applyMiddleware from redux then add redux-thunk
as a third parameter to the createStore



```
    npm i redux-thunk
```

app.js (index.js)
```
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'


<Provider store={ createStore( reducers, {}, applyMiddleware(reduxThunk) ) } >
```

The action process - ActionCreators -> create/return Actions ({}) -> dispatched -> middlewares -> reducers
redux-thunk means ActionCreator don't just have to return an object only, it can operate like a function and do things, and even delay doing things before returning something
