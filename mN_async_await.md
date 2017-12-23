
##experiments:

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
	
	#a·syn·chro·nous

	adjective
	1. (of two or more objects or events) not existing or happening at the same time.
	