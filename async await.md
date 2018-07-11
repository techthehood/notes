
##experiments:

async await still seems experimental - at the very least its

return new Promise(function(resolve, reject) {
	resolve();
	reject();
});

### major note:  all async functions need a return value to work.
if you are using an ajax call and want to pass its data after a then statement you can use a variable defined externally to the ajax.then process.  set the variable to the request results and feed that variable to the return statement.

for example:
```

	this.getDBColor = async function()
    {
      let my_db_color_data;
      await serve.request({task:"getPallet",data:JSON.stringify({data:"none"})})
      .then(function(results){
          //console.log("req results = ",results);
          //return a json object array


          serve.colorData = results;
          my_db_color_data = results;
      });

      return my_db_color_data;
    }//

```

the async/return combo makes a fn thenable even without using await.

  this.getData = async function()
    {
      trans = {};
      trans.task = "places";
      trans.data = "places everyone places.";

      //this await here works to delay the processing of this function until the data returns from the db
      await boss.service.request(trans)
      .then(function(results)
      {
        console.log("places results = ",results);
        ShowData.app = results;
        //$scope.$apply();
      }).catch(function(err)
      {
        console.log(`psmod_app getData error ${err}`);
      });

	  console.log("getData finished running!");
    }//getData

	adding async/await to getData and putting timeout in its then function worked - (onInit is not using async/await to help delay its processes)

	this.$onInit = function() {

      await boss.getData()
      .then(function(){
        //timeout works as a $digest function
        $timeout(function(){
          //$scope.$apply();
        },0,true).then(function(){
          //sTCtrlr.showDivs(slideIndex);
        });
      });
    };//onInit

	##Adding async to onInit function and adding await to getData also works to delay the timeout without using .then
	this.$onInit = async function() {

      await boss.getData()
        //timeout works as a $digest funciton
        $timeout(function(){
          //$scope.$apply();
        },0,true).then(function(){
          //sTCtrlr.showDivs(slideIndex);
        });
    };//onInit


	##removing await async await from getData fails this setup

	this.getData = function()
    {
      trans = {};
      trans.task = "places";
      trans.data = "places everyone places.";

      //this await here works to delay the processing of this function until the data returns from the db...
      boss.service.request(trans)

	in this case all the console.log("getData finished running!"); run b4
	console.log("places results = ",results);

	so making the request not finish b4 it recieves its request data makes
	the then section take its effect at the proper time.

	##async works to make anything thenable but it doesn't make it wait to execute (asyncronously)

	#a�syn�chro�nous

	adjective
	1. (of two or more objects or events) not existing or happening at the same time.

	### old notes


  Im testing out async
  here are the links
  https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

  http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/


  //my async function in my custom service
  this.updateShowData = async function(){
    //$http.post()
    try{
      await console.log("updateShowData running!");
      throw new Error("some error is thrown");
      return "finished";
    }catch(err){
      console.log('error goes here',err);
      return err;
    }
  };//end updateShowData

  //the function called in my controller
  ShowData.updateShowData().then(function(data){
    console.log("then data is ", data);
    //here you would take the data and andd it to the view

  }).catch(function(err){
    console.log("catch error found ",err);
  });

  NOTES:
  concerns that i will need a transpiler with js async/await

  //traspiler article
  https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them

  so far it works without one.  i suspect i would need one with js on the server like using nodejs

  seems to need try and catch.
  test1: pass try/catch error and pass as return value to catch statement.

  i added a catch after a .then() to see if i coult pass the error through a function return.  it didn't work. the then() statement used the error i passed. it didn't register with the catch.

  test 2: i want to try to see if it will work without a try catch.

	//remove the try/catch block
    this.updateShowData = async function(){
    //$http.post()

      await console.log("updateShowData running!");
      //throw new Error("some error is thrown");
      return "finished";

  };//end updateShowData

  //my result seemed to pass the error the the thenable .catch() function

  test3: comment out error
  commenting out the error returns the regular flow of the script

  test4: google.com
  //this threw a nice error

  this.updateShowData = async function(){
    await $http.post('google.com');

      await console.log("updateShowData running!");
      //throw new Error("some error is thrown");
      return "finished";

  };//end updateShowData

  //result
  /*
  angular.js:12587 POST http://localhost/Joomla/administrator/google.com 404 (Not Found)
  (anonymous) @ angular.js:12587
  p @ angular.js:12332
  (anonymous) @ angular.js:12084
  (anonymous) @ angular.js:16832
  $digest @ angular.js:17971
  $apply @ angular.js:18269
  (anonymous) @ angular.js:1917
  invoke @ angular.js:5003
  c @ angular.js:1915
  Sc @ angular.js:1935
  prepElements @ psmod.js:46
  (anonymous) @ index.php?option=com_psmod&view=psmod&layout=edit&id=1:664
  app.js:24 catch error found  {data: "<?xml version="1.0" encoding="UTF-8"?>
  ?<!DOCTYPE �P/5.6.24</span>
  ?</address>
  ?</body>
  ?</html>
  ?
  ?", status: 404, config: {�}, statusText: "Not Found", headers: �}
  */

  ### another experiments

  total script

 ```


      this.item_report = async function(type)
      {
        boss.item_order = [];
        let item_array = document.querySelectorAll(`.${type}_mov`);
        let targ_ary = boss.getCurrentArray(type,"parent");

		//run async function
		boss.get_element_objects(item_array,targ_ary,type).then(function(elData){
          console.log("el obj thenable running")
          //if the lengths aren't still the same something went wrong. abort.
          if(elData.length !== item_array.length)return;//boss.item_order
          targ_ary[type] = elData;//boss.item_order;
          console.log(targ_ary);
        });

        //write a function that will parse the id's and reorder the menu array
        //let stringy = boss.item_order.join();
        //ShowData.asset_ids = stringy.split(",");
      }//item_report

	  //async function
      this.get_element_objects = async function(item_array,targ_ary,type)
      {
        //takes element array and gets associated obj data
        let temp_order = []
        await item_array.forEach(function(entry,ndx,ary){

          let list_id = entry.dataset.my_id;
          let list_src = entry.dataset.my_src;
          let itemData = boss.getItemData(targ_ary[type],list_id,list_src);

          if(itemData != "none") temp_order.push(itemData);

          if(ndx == ary.length - 1){console.log("el obj ary complete!");}
        });

        console.log("el obj data returning!");
        return temp_order;
      }//get_element_objects

 ```

	console output
	el obj ary complete!
	el obj data returning!
	el obj thenable running

	observation
	it seemd to first iterate through the entire forEach - el obj ary complete!
	next i found the .then function
	then it grabbed the return statement - el obj data returning!
	next it ran the beginning of the .then function - el obj thenable running
	finally if finished the .then function - console.log(targ_ary);
