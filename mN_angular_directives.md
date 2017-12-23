(funtion(){
	//this is the correct syntax for a closure
	
})();

(funtion(){
	//reference the module
	var app = angular.module("ModuleName");
	
	//build the directive
	app.directive("DirectiveName",function(){
	
		return {
			restrict:"C",
			controllerAs:"alias",
			controller:function(){
			},
			templateUrl:"url"
			
		};
	});
})();

//create separate controller files
https://stackoverflow.com/questions/20087627/how-to-create-separate-angularjs-controller-files

## i like this controller line
```
controller:["ShowData","$sce","$scope","$timeout",function(ShowData,$sce,$scope,$timeout){
```
MY TEST
INDEX.HTML:

<div class="text-preview" e-txt='scene'></div>
//This works but the attribute can't be camelCased if the scope option
is camelCased this has to be dashed in the view.

BUILD.JS

TEST1
  app.directive("textPreview",function(){
    return{
      restrict:"C",
      templateUrl:BASEURL + "components/com_psmod/xfiles/js/sideTemp.html",
        scope: {
          editorText: '=eTxt'
        }
    };
  });//this worked
  //absolute path worked - relative path didn't
  //relative would probably work without the BASEURL variable but
  // that gets confusing - a little out of control
  
  TEST2
      template:"<div class='tp_head'>{{editorText.tHead}}</div>"
			 + "<div class='tp_body'>{{editorText.tBody}}</div>",
				  
	//this did too
	
TEST3 
	//doesn't need angular or window.angular passed to the closure
	
INJECTING HTML
false lead:
https://stackoverflow.com/questions/15754515/how-to-render-html-with-angular-templates

true answer:
https://stackoverflow.com/questions/18340872/how-do-you-use-sce-trustashtmlstring-to-replicate-ng-bind-html-unsafe-in-angu

//in the directive
      template:"<div class='tp_head'><h5>{{editorText.tHead}}</h5></div>"
                  + "<div class='tp_body' ng-bind-html='editorText.dBody'></div>",
				  
//in the target controller - (holding the html variable)

//add $sce to the controller (inject?)
app.controller("SceneController",['$scope',"ShowData","$sce",function($scope,ShowData,$sce){

//do this at the variable
	sceneCtrlr.tBody = {html:editorText,raw:pureText};

    sceneCtrlr.dBody = $sce.trustAsHtml(sceneCtrlr.tBody.html);
	//tells angular its ok to print html as is
	

//in the index.html files - class directive
//camelCase in js is dashed in html eTxt == e-Txt
//relate controller to the attribute

<div class="text-preview" e-txt='scene'></div>

//once you add a controllerAs property to the directive it is ready
//to use (within a limited scope - as with everything)

but its own template can use it referring to it's alias
ex:

not using the scope variable  and trying to pass its alias to 
the attribute but using the alias directly

"<div class='tp_head'><h5>{{alias.tHead}}</h5></div>"

//DIRECTIVE WITH CONTROLLER - USING THE CONTROLLERS SCOPE
created 2 files - one for the js the other for the html
and i added the js file to the view.html.php
//VIEW.HTML.PHP
    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/assets.js";
    $fileLink->addScript($scriptLoc);

//JS FILE - assets.js
(function(){
  var app = angular.module("pictureShow");
  app.directive("displayAssets",function(){
  return{
    restrict:"C",
    templateUrl:BASEURL + "components/com_psmod/xfiles/js/assets.html",
    scope: {
      selData: '=sData',
      valData: '=vData'
    },
    controller:function(){
      this.head = "this is the head";
      this.body = "this is the body";
      //console.log("select array = ",this.selectArray)
    },
    controllerAs:"display"
  };
});
})();

//HTLM FILE - assets.html
<div class='tp_head'>{{display.head}}</div>
<div class='tp_body'>{{display.body}}</div>

//updating the directive controller
//to update the directive's object value being used in the template i had
//to $watch the value
	this.AssetData = ShowData.assetData;
	
	$scope.$watch(function(){return ShowData.assetData}, function (newValue, oldValue, scope) {
		//Do anything with $scope.letters
		//console.log("newValue = ",newValue);
		//console.log("oldValue = ",oldValue);
		display.AssetData = newValue;

	}, true);
	  
//i iterated through the assetData in the template
<div class="asset_space w3-col m4" ng-repeat="asset in display.AssetData">

//i set the value in the $http request
  await $http.post(site_url,{data:'{"some_json":"string"}'}).then((result)=>{
          console.log("result = ",result.data);
          if(result.data == undefined || result.data == "Invalid Token"
          || result.data == "" || result.data == []){return;};

          show.assetData = result.data;
          console.log("show assetData = ",show.assetData);
      });
	  

//there is an article that suggests not having to use $watch to update
//the directive controller 
http://www.tothenew.com/blog/using-bindtocontroller-with-controlleras-syntax-in-angular/
//updating another controller using the service

//USING WATCH

	this.module_list = [];

      $scope.$watch(function(){return orderCtrlr.module_list}, function(newValue, oldValue) {
          if (newValue)
              console.log("I see a data change!");
      }, true);//this watch works with $scope.$digest();
	  
	 //$DIGEST
//i placed $digest inside the http request to renew template & variables	 //https://stackoverflow.com/questions/18785400/why-do-i-have-to-call-scope-digest-here
	  
//I had to watch an array that was repeated in the template
    <div id="mov{{$index}}" ng-repeat="module in order.module_list" class="mov dropzone mov{{$index}}"
     draggable="true"  >{{module.title}}</div>
	 
//but to attach the events to the element and still be able to use
//the controllers variables i had to use link parameter

//USING LINK
//https://stackoverflow.com/questions/43280908/dragover-and-dragleave-in-angularjs
link: function(scope, elem, attrs, ctrl) {
        
		//my first example
		elem.on('dragstart',function(){console.log("i got one");
        console.log("scope module_list = ",ctrl.module_list);
      });//it worked

      elem.on("dragstart",function(event){ctrl.dragstart_handler(event);});

      elem.on("dragover",function(event){ctrl.allowDrop(event);});
},

//dynamic ng-bind
//i needed a value to be binded to a dynamically created element

//so i created the element and added it to an innerHTML
//then i made a serious $watch that could populate the element with
//the appropriate data.

//WATCH
  $scope.$watch(function(){return ShowData.module_title}, function(newValue, oldValue) {
          if (newValue)
              orderCtrlr.module_title = newValue;
              console.log("I see an order data change!",orderCtrlr.module_title);
              let orders = document.querySelectorAll(".mov");

              for(let h = 0; h < orders.length; h++)
              {
                let test_obj = JSON.parse(orders[h].dataset.module_data);
                if(test_obj.id == "00"){
                  let temp_obj = {id:"00",title:ShowData.module_title};
                  orders[h].dataset.module_data = JSON.stringify(temp_obj);
                  orders[h].innerHTML = ShowData.module_title;
                }
              }
      }, true);//this watch works with $scope.$digest();
	  
//REQUEST ELEMENT CREATOR
let pop = document.querySelector(".order_list");

	pop.innerHTML += "<div id='mov"+ order_count + "' class='mov dropzone mov" + order_count
	+ "' draggable='true' data-module_data='" + JSON.stringify(temp_obj) + "' ng-bind='show.title'></div>";
	
	#accessing directive properties
	direct access not working
	{{head}}
	
	controllerAs syntax working
	{{take1.head}}
	
	  <div class="img_cont" ng-repeat="action in take1.my_stars">
		<img class="mySlides" src="{{action}}" style="width:100%" />
	  </div>
	  //this works - i made sure it was a proper array
	  
#DYNAMIC DIRECTIVES

right now i can inject a dynamic directive using php
```
<?php
defined("_JEXEC") or die;
$my_directive = "manual-slideshow";
?>

<div class="<?php echo $my_directive; ?> pure-h" stars="['one','two']" marquee="manual_slideshow" make-up=""></div>
```
php lets me add the string b4 the client side code is processed.  if i use
the 'show' alias for the controller like {{show.templatename}} this isn't
processed til after the page is loaded. which is too late.

##DYNAMIC ALTERNATIVE

here is my research for alternatives to the php method
[using $compile/injector](https://stackoverflow.com/questions/22370390/how-can-we-use-compile-outside-a-directive-in-angularjs)

[official example docs](https://docs.angularjs.org/api/ng/function/angular.injector)

tests:

```
//this works

        let t_home = document.querySelector(".showcase");
        t_home.innerHTML = "";
        let bigDaddy = document.querySelector(".bigBox");
        let injection_data = '<div class="' + tool.alias + ' pure-h" cast="[\'one\',\'two\']" marquee="' + tool.file_name + '" crew=""></div>';
        t_home.innerHTML = injection_data;
        angular.element(bigDaddy).injector().invoke(function($compile)
        {
          let dir_str = "." + tool.alias;
          let dir_obj = document.querySelector(dir_str);
          let scope = angular.element(bigDaddy).scope();
          $compile(dir_obj)(scope);
        });
	
i had to space the concatenated tool.vars to make sure it compiled with
the proper space between the words

i also had to use innerHTML instead of append because i wasn't using
jQuery so the string is not of type node.

also the compile parenthases had a comma in between them i had to take out.

now can i add the ["$compile" ... minified protection?

cutting out bigDaddy works / final version

      this.activate_template = function(tool)
      {
        //clear the stage
        let t_home = document.querySelector(".showcase");
        t_home.innerHTML = "";

        let injection_data = '<div class="' + tool.alias + ' pure-h" cast="[\'one\',\'two\']" marquee="' + tool.file_name + '" crew=""></div>';
        t_home.innerHTML = injection_data;
        angular.element(t_home).injector().invoke(["$compile",function($compile)
        {
          let dir_str = "." + tool.alias;
          let dir_obj = document.querySelector(dir_str);
          let scope = angular.element(t_home).scope();
          $compile(dir_obj)(scope);
        }]);

      }//activate_template

//this failed using $rootscope

      this.activate_template = function(tool)
      {
        //clear the stage
        let t_home = document.querySelector(".showcase");
        t_home.innerHTML = "";

        let injection_data = '<div class="' + tool.alias + ' pure-h" cast="[\'one\',\'two\']" marquee="' + tool.file_name + '" crew=""></div>';
        t_home.innerHTML = injection_data;
        angular.element(t_home).injector().invoke(["$compile","$rootscope",function($compile,$rootscope)
        {
          let dir_str = "." + tool.alias;
          let dir_obj = document.querySelector(dir_str);
          $compile(dir_obj)($rootscope);
        }]);

      }//activate_template
	  
	  $emit and $broadcast fails with this b/c of the use of $scope somehow
	  to fix i added this function to the "globally available" service i use
	  
```
	
            