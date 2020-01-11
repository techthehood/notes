#### test 1
can the parent form still iterate multiple nested forms
.html
```
  <form action="" name="bigForm">
  <form action="" name="little1">
  <label for="L1_input">L1</label>
    <input class="L1_input fI" type="text" name="L1_input">
  </form>
  <form action="" name="little2">
  <label for="L2_check fI">L2</label>
    <input class="L2_check fI" type="checkbox" name="L2_check">
  </form>
  <form action="" name="little3">
  <label for="L3_txt">L3</label>
    <textarea class="L3_txt fI" name="L3_txt" id="" cols="30" rows="10">
    </textarea>
  </form>
</form>
```
> No it can't but it does seem to recognize the 1st nested form inputs

.js
```
  console.log("console working")

  let myEls = document.querySelectorAll(".fI");

  myEls.forEach( (item)=>{
    item.addEventListener("change", function(){
  	    console.log("change fired",this.name);

        let form = document.forms.namedItem("bigForm");
        console.log("[big form]",form);

        let form_data = new FormData(form);
        console.log("[form data]",form_data);
  	 });
  })
```
> bigForm in this case FormData was empty

#### Test 2

.html
```
  <form action="" name="bigForm">

  <label for="L1_input">L1</label>
    <input class="L1_input fI" type="text" name="L1_input">

  <label for="L2_check fI">L2</label>
    <input class="L2_check fI" type="checkbox" name="L2_check">

  <label for="L3_txt">L3</label>
    <textarea class="L3_txt fI" name="L3_txt" id="" cols="30" rows="10">
    </textarea>

</form>
```
> same result the FormData object is still empty

enctype="multipart/form-data"

.html
```
<form action="" enctype="multipart/form-data" name="bigForm">

  <label for="L1_input">L1</label>
    <input class="L1_input fI" type="text" name="L1_input">

      <label for="L2_check">L2</label>
    <input class="L2_check fI" type="checkbox" name="L2_check">
    <hr>

  <label for="L3_txt">L3</label>
    <textarea class="L3_txt fI" name="L3_txt" cols="30" rows="10">
    </textarea>

</form>
```
> the nested forms confused things - it works without them

.js
```
  console.log("console working")

  let myEls = document.querySelectorAll(".fI");

  myEls.forEach( (item)=>{

    item.addEventListener("change", function(){

	    console.log("change fired",this.name);
      console.log("input type",this.type);
      console.log("input value",this.value);

      let form = document.forms.namedItem("bigForm");
      console.log("[big form]",form);

      let form_data = new FormData(form);
      console.log("[form data]",form_data.entries());

      for(let [name, value] of form_data) {
        console.log(`${name} = ${value}`); // key1=value1, then key2=value2
      }

      for(let pair of form_data.entries()) {
         console.log(pair[0]+ ', '+ pair[1]);
      }

    });//item

  });//myEls
```

#### Converting iterables
> array like objects

.js
```
  console.log("console working")

  let myEls = document.querySelectorAll(".fI");

  myEls.forEach( (item)=>{

    item.addEventListener("change", function(){
      console.log("change fired",this.name);
      console.log("input type",this.type);
      console.log("input value",this.value);

      let form = document.forms.namedItem("bigForm");
      console.log("[big form]",form);
      let form_data = new FormData(form);
      console.log("[form data]",form_data)

      console.log("[form data] entries",form_data.entries());
      console.log("[form data] type",typeof form_data)

      for(let [name, value] of form_data) {
        console.log(`${name} = ${value}`); // key1=value1, then key2=value2
      }

      for(let pair of form_data.entries()) {
         console.log(pair[0]+ ', '+ pair[1]);
      }

      /* let fde = form_data.entries();
      fde.forEach( item => {
        console.log("[from fde] item", `${item[0]} = ${item[1]}`);
        //this fails
      }); */

      let f = Array.from(form_data);
      console.log("joining",f.join(","));
      f.forEach( item => {
        console.log("[from f] item object", item);
      	console.log("[from f] item props", `${item[0]} = ${item[1]}`);
        //this works
      })
      // [converting iterables](https://javascript.info/iterable)   


    });// item

  });//myEls
```
