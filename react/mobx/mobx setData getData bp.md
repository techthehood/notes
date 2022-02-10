# mobx setData getData boilerplate

```
  @action setData = (property, value, test = false) => {
    let target_obj = (test == false) ? this.item_data : this.test_data;
    let property_array = (property.includes(".")) ? property.split(".") : [property];
    let location = property_array.reduce((result, prop, ndx, ary) => {
      if(ndx < ary.length - 1){
        result = result[prop];
      }else{
        result[prop] = value;
        result = result[prop];
      }

      return result;
    },target_obj);
    // my other setData idea is to use root[property] = value
  }
```
> takes pseudo object strings the same way mongodb does and finds the object property then applies the value


#### creating a dynamic data getter

_mobx store_

```
  ...

    @observable item_data = {title_data:""};

    @action getParent = (property, test = false) => {
      // DOCS: attempt to return a parent object
      let target_obj = (test == false) ? this.item_data : this.test_data;
      let property_array = (property.includes(".")) ? property.split(".") : [property];

      let parent_data = property_array.reduce((result, prop, ndx, ary) => {
        if (ndx < ary.length - 1) {
          if (!result[prop]) result[prop] = {};// if its an object property and it doesn't exist do this
          result = result[prop];
        }

        return result;
      }, target_obj);
      
      let ndx = property_array.length - 1;
      let last = property_array[ndx];

      return [parent_data, last];// returns an array with 2 indexes
    };

    @action getData = (property) => {
      // NOTE: may return the item data and not a reference object if endpoint is a string
      // if you need to return a reference object, try using getParent
      let [parent_data, last] = this.getParent(property);

      let new_data = parent_data[`${last}`];
      return new_data;
    };
  ...

```
> getParent returns a reference mobx object - the parent object of the intended value
> getData returns the intended value which may or may not be a mobx ref item (if its a string it will only return a value)

> getParent returns an array with the parent and the last (or target) elements key (name)

> you can use getParent to setup a reference to the desired target using its return values


> this lets me use dot notation names in the name string of the input

```
  <SampleComponent {...{name:"links.data.1642453490217.description"}} />
```

_SampleComponent.js_

```

  const SampleComponent = (props) => {

    const {name} = props;

    let [parent, lastly] = FormStore.getParent(name);

    <input type="checkbox" checked={parent[lastly]} onChange={update_access} />
  ...

```
> setting a (mobx observable) reference to the target value allows mobx to force a render when the (mobx) state changes