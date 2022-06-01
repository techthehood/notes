# React router notes

### DOCS: Articles
[route render methods](https://v5.reactrouter.com/web/api/Route/route-render-methods)   

- covers render props
- path string
- covers exact
- strict

#### server router setup
*routers/routerName.js*
```
  router.get('/*', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    //I do need this catchall for the react router to take direct links (address bar initiated - not in the router link)
    // without this even page refreshes won't work in restoring the samee page
    console.log("[trigger] req", req.baseUrl);
    console.log("[oauth client] entered");

    res.render('trigger', {
      title:'Help',
      name: 'Andrew Mead',
      help_txt: 'Some help message',
      use_local_files: keys.use_local_files,
    });
  });
```
> a catchall route for all router values including the 404 page   
> 

imports

```
  import ReactDOM from 'react-dom';
  import {BrowserRouter as Router, Route} from 'react-router-dom';

  import ErrorBoundary from './components/Error';
```

> render to the root html element
*working sample*
```
  ReactDOM.render(
    /*<Provider store={createStore(reducers, {})}>*/
    /**
     * @member Provider
     * @type {Object}
     * @desc react-redux Provider to connect components with the redux store
     * // NOW: Auth - test user can be created but doesn't add info directories. document where init dir are created
     */

    /**
     * @inner
     * @name note-name
     * @desc
     * # note title <br>
     * <br>
     * <p>note body text </p>
     * <br>
     * <code>//code example </code>
     * @requires reduxThunk applyMiddleware
     */
    <ErrorBoundary>
    <PassportProvider store={passportStore}>
      <TriggerProvider store={triggerStore}>
        <Router>
          <App store={passportStore}>
            <Route exact path={CHAT_PATH} render={(props) => (<AuthGuard {...props} store={passportStore}>
            <Chat {...props} store={passportStore} /></AuthGuard>)} />
            {/* <Route path={['/client/:title', CLIENT_PATH]} render={(props) => (<Client {...props} store={passportStore} />)} /> */}
            <Route path={CLIENT_PATH} render={(props) => (<Client {...props} store={passportStore} />)} />
            <Route exact path={HOME_PATH} render={(props) => (<Home {...props} store={passportStore} />)} />
            <Route exact path={SIGN_UP_PATH} render={(props) => (<SignUp {...props} store={passportStore} />)} />
            <Route exact path={SIGN_IN_PATH} render={(props) => (<SignIn {...props} store={passportStore} />)} />
            <Route exact path={DASHBOARD_PATH} render={(props) => (<AuthGuard {...props} store={passportStore}><Dashboard {...props} store={passportStore} /></AuthGuard>)} />
          </App>
        </Router>
      </TriggerProvider>
    </PassportProvider>
    </ErrorBoundary>,
    document.querySelector('#oauth_root'));
```
> the router and is children are nested inside the any state management "Providers" to give all its content access to
> the saved state

> The "APP" component represents the shared header/menu found on all the pages if route does not share the menu don't nest it with the "App" component

#### GOTCHA: what props is Route render using?
> Route render props are limited to route, location, and history - all other props are added to 
> passportStore though the App component
[Route props](https://reactrouter.com/web/api/Route/route-render-methods)

> i had to find a way to pass props to the components - in the traditional version Route usually accepts the component name as a property.  But with only a string reference to the component name the component doesn't get any props passed in.

#### traditional way using the component prop

```
  ReactDOM.render(
    <Router>
      <Route path="/user/:username" component={ComponentName} />
    </Router>,
    node
  );
```


#### Using the render fn prop

```
  ReactDOM.render(
    <Router>
      <Route path="/home" render={() => <div>Home</div>} />
    </Router>,
    node
  );
```

render fn props

*DOCS: example*
```
  // You can spread routeProps to make them available to your rendered Component
  function FadingRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={routeProps => (
          <FadeIn>
            <Component {...routeProps} />
          </FadeIn>
        )}
      />
    );
  }

  ReactDOM.render(
    <Router>
      <FadingRoute path="/cool" component={Something} />
    </Router>,
    node
  );
```

*my example*

```
  <Route path={CLIENT_PATH} render={(props) => (<Client {...props} store={passportStore} />)} />
```
> in my example i passed the render props (route, location and history) and a store prop for state management

#### Using the children: func

> untested
*DOCS: example*
```
  function ListItemLink({ to, ...rest }) {
    return (
      <Route
        path={to}
        children={({ match }) => (
          <li className={match ? "active" : ""}>
            <Link to={to} {...rest} />
          </li>
        )}
      />
    );
  }

  ReactDOM.render(
    <Router>
      <ul>
        <ListItemLink to="/somewhere" />
        <ListItemLink to="/somewhere-else" />
      </ul>
    </Router>,
    node
  );
```
> i like this for menu items all of which need to render but only one (the one that matches) needs a special 
> render condition like className="active" this is achieved using the match prop which validates the to props 
> match with the url path

NOTE: The children render prop receives all the same route props as the component and render methods, except when a route fails to match the URL, then match is null. This allows you to dynamically adjust your UI based on whether or not the route matches. Here we’re adding an active class if the route matches

> so it gets (route, location and history) but it also gets a match prop in props object

```
  children={({ match, route, location and history }) => (
    <li className={match ? "active" : ""}>
      <Link to={to} {...rest} />
    </li>
  )}

  or {match, ...anyName}

```

#### variable paths

```
  <Route path="/users/:id">
    <User />
  </Route>

  <Route path={["/users/:id", "/profile/:id"]}>
    <User />
  </Route>
```