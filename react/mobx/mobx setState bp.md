# mobx setState boilerplate

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
