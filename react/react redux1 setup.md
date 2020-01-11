React Redux and redux form setup

install redux form
```
  npm i redux-form redux react-redux
```

```
  import React, { Component } from 'react';
  import { reduxForm, Field } from 'redux-form';
```

```
  <form>
    <fieldset>
      <field
        name="email"
        type="text"
        id="email"
        components="input"
      />
    </fieldset>
  </form>
```
**In order to style input you have to create a separate component and
the fields properties will automatically be available to it throught props**

```
      <field
        name="email"
        type="text"
        id="email"
        components={ CustomInput }
      />
```


Create a reducers dir with index.js files. with it we will combine all the reducers
reducer comes from redux-form

finished example of reducers/index.js
```
  import { combineReducers } from 'redux';
  import { reducer as formReducer } from 'redux-form';

  import authReducer from './auth';

  export default combineReducers({
    form: formReducer,
    auth: authReducer
  })
```


at the bottome of the component use reduxForm
```
  export default reduxForm({ form: 'name the current form' })(current-component-here)
```
**be sure to remove upper export default - no longer needed**

from redux import createStore, from react-redux import Provider
```
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';
  import reducers from './reducers'
```
**no need to specify ./reducers/index.js - its automagic**

user Provider to wrap your app
set a store inside the provider - it needs reducers and an empty object
```
  <Provider store={createStore(reducers, {})}>
```
**initial version**


```
  ReactDOM.render(
    /*<Provider store={createStore(reducers, {})}>*/
    <Provider store={createStore(reducers, {
      auth: {
        token: jwtToken,
        isAuthenticated: jwtToken ? true : false
       }
    }, applyMiddleware(reduxThunk))}>
      <BrowserRouter>
        <App>
          <Route exact path="/" component={Home} />
          <Route exact path="/Signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/dashboard" component={Dashboard} />
        </App>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));
```
the form needs to access handleSubmit which is already available through props - from redux-form
```
  <form onSubmit={ handleSubmit(this.onSubmit) }>
```
then pass in the method you made to handle submissions

onsubmit get formData automatically available to it
```
  async onSubmit(formData){
    console.log('onSubmit called!');
    console.log("[formData]",formData);

    // We need to call some action
    await this.props.signUp(formData)// runs the signUp action
  }
```

Finished example of CustomInput.js
```
  import React, {Component} from 'react';

  export default class CustomInput extends Component {
    render(){
      const { input: { value, onChange } } = this.props;
      return (
        <div className="form-group">
        <label htmlFor={this.props.id} >{ this.props.label }</label>
        <input name={this.props.name}
        id={this.props.id}
        placeholder={this.props.placeholder}
        className="form-control"
        type={this.props.type}
        value={value}
        onChange={onChange}
        />
        </div>
      );
    }
  }
```

Finished examples of form, fieldset and field
```
  export default class SignUp extends Component
  {
    async onSubmit(formData){
      console.log('onSubmit called!');
      console.log("[formData]",formData);

      // We need to call some action
      await this.props.signUp(formData)// runs the signUp action
    }

    render(){
      return (
        <div>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
              name="email"
              type="text"
              id="email"
              label="Enter your email"
              placeholder="example@example.com"
              component={ CustomInput } />
            </fieldset>
            <fieldset>
              <Field
              name="password"
              type="password"
              id="password"
              label="Enter your password"
              placeholder="yoursuperpassword"
              component={ CustomInput } />
            </fieldset>

            { this.props.errorMessage ?
            <div className="alert alert-danger">
              { this.props.errorMessage }
            </div>
           : null }

            <button type="submit" className="btn btn-primary" >Sign Up</button>
          </form>
        </div>
        );
    }
  }
```
