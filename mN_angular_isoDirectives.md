//ISOLATING THE DIRECTIVE SCOPE

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