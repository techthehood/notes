# mobx unlimited stores

core.js
```
  import {CoreContext, CoreProvider} from './coreContext';
  import {createCoreStore, removeCoreStore} from './coreStore';

  const Core = observer((props) => {
    ...

    const coreStore = createCoreStore(state.main_IUN);

    useEffect(() => {

      return () => {
        removeCoreStore(state.main_IUN);
      }

    },[]);

    ...

    let panel_display = (
      <CoreProvider store={coreStore}>
        <Panel data={panel_data} />
      </CoreProvider>
    )
```
> note: if i didn't need to use ReactDOM.render and render other components outside the natural react flow i could
actually use the parents state to create unlimited stores

#### garbage collecting the store
when the component is deleted make sure it takes its store with it
```
  useEffect(() => {

    return () => {
      removeCoreStore(state.main_IUN);
    }

  },[]);

  or

  componentWillMount() {
    removeCoreStore(this.state.main_IUN);
  }
```

```
  const [coreStore, setCoreStore] = useState({values});
```
> but this method doesn't let me reference the state further down through childnodes and functions unless i somehow pass this
state down as props which totally defeats the purpose - my method still requires a tracking method like this im using
another store to track the id reference number (main_IUN) - i could use a single coreStore then i wouldn't need a reference
but that would prevent me from having unlimited stores and it would force every component instance to use the same store

> i could also remedy this by passing the store/state as a prop to non react functions (where i need this for creating ReactDOM.render components) but this instance i don't want to add to the already monolithic fn code when i can simply use things that are already available like main_IUN and the available state

#### sample
>this sample actually doesn't use mobx - it doesn't need updates - its used for settings so its values are set once at the beginning
```
  const {exists} = require('../tools/exists.js');

  // store class (template)
  class coreStore{

    constructor(coreService){
      this.coreService = coreService;
    }// constructor

    name = "";


  }// coreStore

  // static store container object
  const cores = {
  };

  // store factory
  export const createCoreStore = (iUN) => {
    cores[iUN] = new coreStore();
    cores[iUN].name = `coreStore${iUN}`;
    return cores[iUN];
  };

  // removes stores on unmounting
  export const removeCoreStore = (iUN) => {
    delete cores[iUN]
  };

  // 2 ways to export all stores
  export default cores;

  export const getCoreStore = (iUN) => {
    return cores[iUN];
  }
```

#### functional component use
custom_check.js
```
  const custom_check = observer((props) => {
    ...
    let coreStore = useContext(CoreContext);// not dynamic

    if(tVar.check_mode == "false"){
      return (
        <>
        </>
      );
    }else{
      return null;
    }//else

  });//custom_check

  export default custom_check;
```

#### class based component use
check_option.js
```
  class check_option extends React.Component {

    constructor(props){
      super(props);
    }// constructor

    render(){

      this.context;//works

      ...

    }//render

  }// check_option

  check_option.contextType = CoreContext;

  export default check_option;
```
**GOTCHA:**
> i don't think this version updates dynamically with changes to the store.  for that i would need to use mobx observer or
CoreContext.Consumer.  I think the Consumer is limited to the

#### [React hooks useContext](https://daveceddia.com/usecontext-hook/)   
**this article suggests useContext as an alternative to CoreContext.Consumer - maybe useContext is dynamic afterall?**
#### [official React Context docs](https://reactjs.org/docs/context.html)   
