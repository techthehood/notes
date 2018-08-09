# Javascript object access

```
external_function = function(caller_id){
  //what can this function access?
  console.log(caller_id);
  console.log(this.name);
  try{
     console.log(name_var);
  }catch(err){
    console.log(err);
  }
 
}

var regular_object = function (){
  this.name = "kelly";
  var name_var = "chris";
  
  this.import_function = external_function;
  this.import_function("import_function");
  
  //console.log("import_function = ",this.import_function);
  
  var private_function = function(){
     console.log("private_function");
     console.log(this.name);
     try{
       console.log(name_var);
     }catch(err){
      console.log(err);
     }
  }
  //console.log("private_function = ",private_function);
  
  private_function("private_function");
  
  this.public_function = function(){
     console.log("public_function");
     console.log(this.name);
     try{
       console.log(name_var);
     }catch(err){
      console.log(err);
     }
  }
  //console.log("public_function = ",this.public_function);
  
  this.public_function("public_function");
  
   var private_import = external_function.bind(this);
  //console.log("private_function = ",private_import);
  
  private_import("private_import");
}

regular_object.prototype.proto_function = function()
{
  //what can this function access
  console.log("proto_function");
  console.log(this.name);
  try{
    console.log(name_var);
  }catch(err){
    console.log(err);
  }
  
}

var test_obj = new regular_object;
test_obj.proto_function("proto_function");



test_obj.import_function();

```

returns
```
"import_function"
"kelly"
[object Error] { ... }
"private_function"
"JS Bin Output "
"chris"
"public_function"
"kelly"
"chris"
"private_import"
"kelly"
[object Error] { ... }
"proto_function"
"kelly"
[object Error] { ... }
undefined
"kelly"
[object Error] { ... }

```