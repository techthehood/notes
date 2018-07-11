
	see other notes: mN_async_await.md
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
  ↵<!DOCTYPE …P/5.6.24</span>
  ↵</address>
  ↵</body>
  ↵</html>
  ↵
  ↵", status: 404, config: {…}, statusText: "Not Found", headers: ƒ}
  */
