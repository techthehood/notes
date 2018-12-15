//ISOLATING THE DIRECTIVE SCOPE
[iso scope = @ docs](https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object)

- the @ is for strings
- the = is for using exactly this data object. you can pass callouts & objects with =
//SCRIPT.JS
angular.module('docsIsolateScopeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
  $scope.igor = { name: 'Igor', address: '123 Somewhere' };
}])
.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      customerInfo: '=info' /*here we set a random varName to a random attr*/
    },
    templateUrl: 'my-customer-iso.html'
  };
});

//INDEX.HTML
<div ng-controller="Controller">
  <my-customer info="naomi"></my-customer>/*here we used the random attr*/
  <hr> /*set equal to our controllers name objects*/
  <my-customer info="igor"></my-customer>
</div>

//MY-CUSTOMER-ISO.HTML
Name: {{customerInfo.name}} Address: {{customerInfo.address}}
/*here we used the random varName and the controllers object properties*/

//RETURNS
Name: Naomi Address: 1600 Amphitheatre
Name: Igor Address: 123 Somewhere

## to use the scope properties in the controller you have to use
```
bindToController:true
```
##in the directives return properties
##along with
```
      this.$onInit = function() {
        sTCtrlr.my_stars = sTCtrlr.stars;
        console.log(this);
      };
```
##in the controller - the values will be available just before this is called

## in the template the values will be available following the alias
```
  data-txt="{{alias.stars}}" ng-click="alias.callout()"
```
**dont forget the parenthesis after using the 'callout' value**


# [iso scope article](https://www.c-sharpcorner.com/article/learning-custom-directives-in-angularjs-a-practical-approach/)

//test

directive sample
```
	  <div class="select-menu mM_stgs_custom_class" data-value-mode='none' data-value-data='take1.destination'
	  data-option-data='take1.custom_ary_obj' data-callout="take1.setSelect" data-cname="'bM_custom_select_' + take1.iUN"
	  data-params="{targ:take1,prop:'destination'}"></div>

```

template sample
```
	<div class="tHead_sel">
	  <select class="{{cname}} w3-select w3-border" ng-model="valueData.getValue"
	  ng-if="valueMode == 'default'"
	  ng-model-options="{ getterSetter: true }" name="{{optionData.label}}" >
		<option  value="" disabled selected>{{optionData.label}}</option>
		<option ng-selected="{{$index == 0 ? 'selected' : ''}}" ng-repeat="(key,val) in optionData.options track by $index" value="{{key}}">{{val}}</option>
	  </select>

	  <select class="{{cname}} w3-select w3-border" ng-model="valueData" ng-change="callout(valueData,params)"
	  ng-if="valueMode != 'default'" name="{{optionData.label}}" >
		<option  value="" disabled selected>{{optionData.label}}</option>
		<option ng-selected="{{$index == 0 ? 'selected' : ''}}" ng-repeat="(key,val) in optionData.options track by $index" value="{{key}}">{{val}}</option>
	  </select>
	</div>

```

dir sample
```
	(function(){
		 var app = angular.module("pictureShow");
		  app.directive("selectMenu",function(){
		  return{
			restrict:"C",
			templateUrl:BASEURL + "components/com_psmod/xfiles/js/selectMenu.html",
			scope: {
			  optionData: '=',
			  valueData: '=',
			  valueMode: '@',
			  callout: '=',
			  params: '=',
			  cname: '@'
			},
			controller:function(){

			  //console.log("select array = ",this.selectArray)
			},
			controllerAs:"choice"
		  };
		});
	})();

```

//notes:
cname: '@'

works with
data-cname="bM_custom_select_{{take1.iUN}}"

//notes:
cname: '='

works with
data-cname="'bM_custom_select_' + take1.iUN"
