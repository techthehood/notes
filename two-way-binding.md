
gotcha:

//theres a gotch where it will save to the db but not load in the view when
opened.

on joomla autoloaded forms

//i ran a function called 'initialize_asset' very early in the controllers construction
  app.controller("ModuleController",["$scope","ShowData",function($scope,ShowData){

    var modCtrlr = this;
    this.tab = 1;
    this.seeSection = '1';
    this.shuffle = 'modules';
    this.asset_ids;
    this.service = ShowData;

	/***************************************/
    this.initialize_asset = function()
    {
      let my_val = document.getElementById('jform_data_ids').value;
      if(my_val != ""){
        my_val = my_val.split(",");
        ShowData.asset_ids = my_val;
      }else {
        my_val = [];
      }
      modCtrlr.asset_ids = my_val;
      $scope.$emit('broadcast asset pair check');
    }//initialize_asset

    this.initialize_asset();// = ShowData.asset_ids;
	
	
	
	//i can also use a variable in the initialize_asset to help me run a 
	delay that loads after the $digest with $onInit
	
	this.$onInit = function() {
        //sTCtrlr.my_stars = sTCtrlr.stars;
        //console.log(this);
        $timeout(function(){
			console.log("post Digest with $timeout");
			sTCtrlr.initiated = true;
			//sTCtrlr.my_stars = sTCtrlr.update_assets(ShowData.asset_ids);
			sTCtrlr.my_stars = ShowData.asset_info;
		},0,true).then(function(){
			//sTCtrlr.showDivs(slideIndex);
        });
    };
	
	i tried to run $scope.$emit("str") inside the $timeout and got an error
	that you can't copy a scope
	[error url](https://docs.angularjs.org/error/ng/cpws)
	
	so my solution was to add the item to the service and call the function 
	directly, without using $scope.$broadcast
	
	