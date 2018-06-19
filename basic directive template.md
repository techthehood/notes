
.dir.js

```

(function(){
  var app = angular.module("pictureShow");

	app.directive("advancedColors",function(){
	  return{
		restrict:"AC",
		templateUrl:BASEURL + "components/com_psmod/xfiles/js/color.html",
		scope: {
		  destination: '=',
		  property: '@',
		  callout: '=',
		  params: '=',
		  collection: '=',
		  expandto: '@'
		},
		controller:"ColorController",
		controllerAs:"picasso",
		 bindToController: true
	  };
	});
	
})();

```

.ctrlr.js

```

(function(){
  var app = angular.module("pictureShow");


    app.controller("ColorController",["ShowData","$sce","$scope","$timeout",function(ShowData,$sce,$scope,$timeout){
      //console.log("tool js running!");

      var boss = this;
      this.iUN = Math.round(Math.random() * 10000);

      this.service = ShowData;
      this.object_details = [];
      this.object_elements = {};
	  
	 $scope.$watch(function(){return ShowData.colorJSON}, function (newValue, oldValue, scope) {
        //Do anything with $scope.letters
        //console.log("newValue = ",newValue);
        if(newValue){
          boss.colorJSON = newValue;
        }//if
      }, true);
	  
	  
	    this.$onInit = function() {
        //in here i can run $timouts, watchers and $timouts inside of watchers

        $timeout(function(){
           //console.log("post Digest with $timeout");
           boss.initiated = true;

        },0,true).then(function(){

        });//end .then() of $timeout

      };//$oninit
	  
	  
	  this.soft_apply = function()
      {
        $timeout(function(){},0,true);
      }//soft_apply
	  
	 

    }]);//colorController
	
})();

```


invoke html
```
<div class="advanced_colors" strRef="string" objRef="object"></div>

//or

<div class="advanced_colors" data-destination="take1.service.tool.details.title" data-property="font_color"
              data-collection="take1.getMyColors" data-expandto="bM_stgs_sect_cont" ></div>
```
