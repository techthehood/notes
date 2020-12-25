# mobx class context
[Access stores from class using mobX and react Context](https://stackoverflow.com/questions/54263228/access-stores-from-class-using-mobx-and-react-context)   

from NavBtns functional component
MainProvider was wrapped on a parent component so MainContext is available
```
const state = useContext(MainContext);

let binder_chk = (
    <BinderCheck store={state}/>
  )
```

```
  constructor(props){
    super(props);
    // const state = React.createContext(MainContext);// fails
    const store = props.store;
  }// constructor
```
**this is an accurate, working store  passed through props by mainContext - observer doesn't cause rerenders though**

```
  import mainStore from '../../../main/mainStore';


  @observer
    class BinderCheck extends React.Component {

      constructor(props){
        super(props);

        const store = mainStore;

        console.warn(`[mainStore]`,store);
      }// constructor
```
**same, it works the same as passing props - still no rerenders**

> both of the above methods fail to create re-renders when store items change, even if observables change
> not neccessarily true. i may have had a coding error using main instead of alt in folder_data

[Connect MobX observer components to the store with the React Provider](https://egghead.io/lessons/react-connect-mobx-observer-components-to-the-store-with-the-react-provider)   
**this passes the store into the observer as an array string ["storeName"]**
```
  @observer(["mainContext"])
  class BinderCheck extends React.Component {
```
error: Cannot read property 'componentWillReact' of undefined
**failed**

#### GOTCHA: observer not triggering re-renders
**ok observer is working, you just have to be using an observable property from the store in the render.**
```
  <div>{store.text_view}</div>
```
