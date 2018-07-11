#fiddle experiments
[medium article](https://medium.com/@weberino/you-can-create-truly-private-properties-in-js-without-es6-7d770f55fbc3)

[my fiddle](https://jsfiddle.net/inspectaTech/nvy8wub6/)

[js design patterns article](http://hostmasterzone.info/combination.html)

###private property example

```
 var functional_object = function(name,age,state)
{
  
  var key = {};
  
  var private = function() {
        var obj = {};
        return function(testkey) {
            if(key === testkey) return obj;
            // If the user of the class tries to access private
            // properties, they won't have the access to the `key`
            console.error('Cannot access private properties');
            return undefined;
        };
    };
    
    var functional_object = function(name,age,state) {
		this.iUN = Math.round(Math.random() * 10000);
        this._ = private(); // Creates a private object
        //this._(key).priv_prop = 200; // this._(key) will return the private object
        //private[this.iUN] = {};
		  this._(key).name = name;
		  this._(key).age = age;
		  this._(key).state = state;

  
  
	if (typeof this.sayName != "function"){
		functional_object.prototype.sayName = function(){
			cl("sayName = " + this._(key).name);
		}
	}


	  functional_object.prototype.sayName2 = function(){
	  cl("private name  = " +this._(key).name);
	  cl("private age  = " +this._(key).age);
	  cl("private state  = " +this._(key).state);
	  
	  }
	if (typeof this.sayName2 != "function"){}

    };//end functional_object

return functional_object;

}()//end f_Obj
```

###  THE ENTIRE TEST
[fiddle address](https://jsfiddle.net/inspectaTech/nvy8wub6/)

```
function Example(name, age, job){ 
  //properties 
  this.name = name; this.age = age; this.job = job; 
  //methods 
  if (typeof this.sayName != "function"){ 
    Example.prototype.sayName = function(){
    console.log(this.name);
    }; 
  } 
} 
var person = new Example("Tim", 23, "Software Engineer");
person.sayName();

var person2 = new Example("Manny", 19, "musician");
person2.sayName();

//let test_obj = Object.create(Object.prototype);//!= {}
//let test_obj = Object.create(null);//!= {} - has no properties
function cl(cls){console.log(cls);}
let test_obj = Object.create(Object.prototype);//!= {}
//let quick_obj = {};
let traditional = new Object();//three objects are the same

let quick_obj = {
name : "biff",
age : 75,
state : "ca"
}

 var functional_object = function(name,age,state)
{
	//var name = name;
  //var age = age;
  //var state = state;
  
  var key = {};
  
  this.iUN = Math.round(Math.random() * 10000);
  
  var private = function() {
        var obj = {};
        return function(testkey) {
            if(key === testkey) return obj;
            // If the user of the class tries to access private
            // properties, they won't have the access to the `key`
            console.error('Cannot access private properties');
            return undefined;
        };
    };
    
    var functional_object = function(name,age,state) {
    this.iUN = Math.round(Math.random() * 10000);
        this._ = private(); // Creates a private object
        //this._(key).priv_prop = 200; // this._(key) will return the private object
        //private[this.iUN] = {};
  this._(key).name = name;
  this._(key).age = age;
  this._(key).state = state;
    };


  //private[this.iUN] = {};
  //private[this.iUN].name = name;
  //private[this.iUN].age = age;
  //private[this.iUN].state = state;
  
  this.name = name;
  
if (typeof this.sayName != "function"){
this.sayName = function(){cl("sayName = " + name);}
}


  functional_object.prototype.sayName2 = function(){
  cl("sayName2 = " + name);
  cl("this.name = " + this.name);
  cl("iUN  = " + this.iUN);
  //cl("private name  = " + private[this.iUN].name);
  //cl("private age  = " + private[this.iUN].age);
  //cl("private state  = " + private[this.iUN].state);
  //console.log("private  = ", private[this.iUN]);
  cl("private name  = " +this._(key).name);
  cl("private age  = " +this._(key).age);
  cl("private state  = " +this._(key).state);
  
  }
if (typeof this.sayName2 != "function"){}

return functional_object;

}()//end f_Obj





functional_object.prototype.bigger = function(){console.log("bigger is running");cl(name.toUpperCase());}

let funkie = new functional_object("mary",30,"kansas");
cl("funkie.name = " + funkie.name);

console.log("funkie iUN = ",funkie.iUN);

funkie.bigger();
//funkie.sayName();
funkie.sayName2();

let foosie = new functional_object("todd",40,"texas");
cl("foosie.name = " + foosie.name);
console.log("foosie iUN = ",foosie.iUN);
foosie.sayName2();

console.log("has own property is " + traditional.hasOwnProperty())
  
console.log(test_obj);
console.log(quick_obj);
console.log(traditional);
console.log(funkie);
//console.log(test_obj === abrv_obj);//they look identical - (Object.prototype) & {}
console.log(test_obj == quick_obj);//they look identical - (Object.prototype) & {}
console.log(test_obj == traditional);
console.log(quick_obj == traditional);
```