//this one was helpful
//https://stackoverflow.com/questions/21995108/angular-get-controller-from-element
//this one didn't work for me
//https://stackoverflow.com/questions/25409734/i-cant-detect-programmatically-value-change-in-angularjs
//this gets a response at least
```
document.getElementById('jform_publish_up2').onchange=function(){console.log("i changed");};
```

//this gives me access to the controller
```
document.getElementById('jform_publish_up2').onchange=function(){console.log("i changed");
console.log(angular.element(this).controller());};
```

//i can access the controllers variables but it still doesn't 
recognize the change in the variables but i can call a
$scope.$digest(); if i can call a function within the controller.
```
document.getElementById('jform_publish_up2').onchange=function(){
console.log("i changed");
console.log(angular.element(this).controller().edit.publish_up);
};
```

//this is the complete successful example
document.getElementById('jform_publish_up2').onchange=function(){console.log("i changed");
//refresh the new data
angular.element(this).controller().refresh(); 
//log the update
console.log(angular.element(this).controller().edit.publish_up)};

//i used this function in the controller
this.refresh = function()
{
  $scope.$digest();
}//refresh

//my init.js script
document.getElementById('jform_publish_up2').setAttribute("ng-model","page.edit.publish_up");
document.getElementById('jform_publish_up2').onchange=function()
{
  angular.element(this).controller().edit.publish_up = this.value;
  angular.element(this).controller().refresh();
  console.log(angular.element(this).controller().edit.publish_up);
};

//then eventually using bootstrap like calling ng-app="pictureShow"
angular.bootstrap(document.querySelector('.bigBox'), ['pictureShow']);


//originally I tried to use a $scope.$watch but it never registered the 
//programatic changes - i could actually use this to update the controller
//variable but i added a line to do this in the onchange function

$scope.$watch(function(){return document.querySelector(".publish_up2").value;}, function(newValue, oldValue) {
	if (newValue)
		console.log("I see a data change!");
		pageCtrlr.edit.publish_up = newValue;
}, true);//this watch works with $scope.$digest();


