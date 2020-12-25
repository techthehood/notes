
#### a working sample

upload.js > makeContact()
```
  if(mkr_mod != "delete" && mkr_mod != "move")
  {
    let form_obj = process_form("contact_form");
    console.log("[form obj]",form_obj);

    arc_input = {...arc_input, ...form_obj}
  }// mkr_mod != delete
  
```

upload_process_form.js
```
    export const process_form = function (formName) {

      let form = document.forms.namedItem(formName);
      console.log("[big form]",form);
      let form_data = new FormData(form);
      console.log("[form data]",form_data)

      console.log("[form data] entries",form_data.entries());
      console.log("[form data] type",typeof form_data)

      // for(let [name, value] of form_data) {
      //   console.log(`${name} = ${value}`); // key1=value1, then key2=value2
      // }
      //
      // for(let pair of form_data.entries()) {
      //    console.log(pair[0]+ ', '+ pair[1]);
      // }

      /* let fde = form_data.entries();
      fde.forEach( item => {
        console.log("[from fde] item", `${item[0]} = ${item[1]}`);
        //this fails
      }); */

      let form_array = Array.from(form_data);
      let form_object = {};
      console.log("joining",form_array.join(","));

      form_array.forEach( item => {
        console.log("[from f] item object", item);
        console.log("[from f] item props", `${item[0]} = ${item[1]}`);
        form_object[`${item[0]}`] = item[1];
        //this works
      })

      return form_object;

    }//process_form

```
