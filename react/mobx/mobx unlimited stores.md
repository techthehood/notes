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

  // optional
  export const createCoreStore = ({ iUN = Math.round(Math.random() * 10000), name = "coreStore"} = {}, existing = false) => {


    if (cores[iUN] && existing) {
      // do nothing if both are true
      // in this case if cores exists don't make any changes, skip to the return statement
    } else {

      // if store exists and its not asking to return the existing one - send back a new store
      // otherwise send back the existing store
      let counter = 0;
      while (cores[iUN]) {
        iUN = Math.round(Math.random() * 10000);
        counter++;
        console.log(`creating coreStore iUN`, counter);
      }
      cores[iUN] = new coreStore();
      cores[iUN].name = `${name}${iUN}`;
    }// !existing

    return [cores[iUN], iUN];
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

> old version
```
  // store factory
  export const createCoreStore = (iUN) => {
    cores[iUN] = new coreStore();
    cores[iUN].name = `coreStore${iUN}`;
    return cores[iUN];
  };
```

### multiple store usage 1

```
  let core_el = <Core data={core_data} />;

  const [newMainStore, iUN] = await createMainStore({host_data: state.host_data, display_data: state.display_data});
  // the new iUN is already added with prep_vars

  let core = (
    <MainProvider store={newMainStore}>
      {core_el}
    </MainProvider>
  )
```

### multiple store usage 2

> also had the ability to inject initial store data (props/values) see advanced store creator below

```
  let store_data = { iUN, name: "ref_store_" };// host_data: { root_id: VIEWER_DATA.project_id,host_id: VIEWER_DATA.project_id}, display_data: "media" 

  let [temp_store] = await createMainStore(store_data, true);

  temp_store.move_type = "attach";// important values for selection mode
  temp_store.move_style = "pull";// important values for selection mode
  temp_store.move_task = "custom";
  temp_store.folder_data = folder_data;
  temp_store.display_data = "media";
  temp_store.root_id = VIEWER_DATA.project_id;
  temp_store.host_id = VIEWER_DATA.project_id;
  temp_store.viewer_id = VIEWER_DATA.project_id;

  let core = (
    <MainProvider store={temp_store}>
      {core_el}
    </MainProvider>
  )
```

### Advanced store creator

_mainStore.js_

```
  export const createMainStore = async (
    { 
      iUN = Math.round(Math.random() * 10000), 
      name = "mainStore", 
      host_data, 
      display_data = "media"
    }={}, existing = false) => {


    if (stores[iUN] && existing){
      // do nothing if both are true
      // in this case if stores exists don't make any changes, skip to the return statement
    }else{
      
      // if store exists and its not asking to return the existing one - send back a new store
      // otherwise send back the existing store
      let counter = 0;
      while(stores[iUN]){
          iUN = Math.round(Math.random() * 10000);
          counter++;
        console.log(`creating mainStore iUN`,counter);
      }
      stores[iUN] = new mainStore();
      stores[iUN].name = `${name}${iUN}`;
  
      if(host_data){
        // this is when im trying to create a mainStore to be used in core
        await prep_vars({
          display_data,
          root_id: host_data.project_id,
          host_id: host_data.project_id,
          viewer_id: VIEWER_DATA.project_id,
          /*portable:true,*/
          host_data,
          store: stores[iUN],
          iUN
        });
      }// if
    }// !existing
    
    return [stores[iUN], iUN];
  };// createMainStore
```