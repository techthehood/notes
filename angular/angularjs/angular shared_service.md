# creating a shared service

### service template
shared.js
```
(function(){

  console.log("shared service running!");

  var app = angular.module("pictureShow");

  app.service("CoStars",["ShowData",function(ShowData){

    // methods


  }]);//end service "ShowData"

  var other_common_variabes = true;

})();//end closure

```

### add service to controller
project.controller.js
```
  controller:["ShowData","CoStars",function(ShowData,CoStars){

  }
```

### add fn as a reference
project.controller.js
```
    this.update_view = CoStars.update_view.bind(this);
```
>bind this here when the fn is being referenced to give the service access to all of the controllers data


### then call the fn regularly
project.controller.js
```
  boss.update_view()
  .catch(function(err){
    console.log('not on my watch',err);
  });
```

### Save 'this'
shared.js
>in the service you can reference the controllers This. set it as a variable to help maintain 'this' throughout
in this example 'this' became different (window object) once it entered into the Promise's function. but passed as a variable it was constant in the Promise without binding
```
  this.update_view = function(fc)
  {
    this;
    var boss = this;
    return new Promise(function(resolve, reject) {

      let force = fc || false;
      let view_str = "default";
      if(boss.mode == "admin")
      {
        //if admin use dropdown
        let targ_sel_str = boss.view_select;

        ...
```
