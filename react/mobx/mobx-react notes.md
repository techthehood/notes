

#### provider setup

```
import { Provider as MobxProvider } from 'mobx-react';



const passportStore = require('./passportStore').default;
const triggerStore = require('./triggerStore').default;


<MobxProvider passportStore={passportStore}>
    <MobxProvider triggerStore={triggerStore}>
      <Router>
        <App store={passportStore}>
          <Route exact path={CHAT_PATH} render={(props) => (<Chat {...props} store={passportStore} />)} />
          <Route exact path={HOME_PATH} render={(props) => (<Home {...props} store={passportStore} />)} />
          <Route exact path={SIGN_UP_PATH} render={(props) => (<SignUp {...props} store={passportStore} />)}/>
          <Route exact path={SIGN_IN_PATH} render={(props) => (<SignIn {...props} store={passportStore} />)}/>
          <Route exact path={DASHBOARD_PATH} render={(props) => (<AuthGuard {...props} store={passportStore}><Dashboard {...props} store={passportStore} /></AuthGuard>)} />
        </App>
      </Router>
    </MobxProvider>
  </MobxProvider>,
```
> i have been using store in props to extract the mobx store (which totally defeats the purpose of using mobx)
> i need a pattern for not passing down the store through props NOTE: it looks deprecated, i need to go back to the context method

#### function component setup
```
import { observer, inject } from "mobx-react";


const QRCoder = inject('triggerStore')(observer(({
  icon,
  name = "",
  project = "",
  uuid = "",
  store
}) => {
  
  const TriggerStore = store;

...

}));

export default QRCoder
```
> notice the double parenthesis at the end