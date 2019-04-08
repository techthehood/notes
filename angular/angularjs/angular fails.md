# Angular fails
## finding angularjs' achilles heels

ng-repeat finished callback
ideas:
[directive emit](https://www.linkedin.com/pulse/20140822090331-106754325-execute-code-after-ng-repeat-renders-the-items)
** only fires once ***

[another done directive](https://coderwall.com/p/5dpe2w/execute-function-when-ngrepeat-done)
** this one without emit **

[this seems like it works](http://jsfiddle.net/jwcarroll/ZFp3a/)

html
```
<div ng-controller="MyCtrl" class="well">
    <h3 ng-repeat="name in names" class="mynames" repeat-end="onEnd()">{{name}}</h3>
</div>
```

js
```
(function () {      

    angular.element(document).ready(function () {
        var app = angular.module('myApp', []);
        
        app.controller("MyCtrl", function($scope, $timeout){
        
            $scope.names = ['Josh', 'Brad', 'Igor', 'Mesko'];
            
            $scope.onEnd = function(){
                $timeout(function(){
                let name_col = document.querySelectorAll(`.mynames`);
                name_col.forEach(function(entry){
                entry.style.color = "red";
                })
                    alert('all done');
                }, 1);
            };
            
        });
        
        app.directive("repeatEnd", function(){
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    if (scope.$last) {
                        scope.$eval(attrs.repeatEnd);
                    }
                }
            };
        });

        angular.bootstrap(document, ['myApp']);
    });


}());

```

my live experiments

```

(function(){
 console.log("repeat done running!");
 var app = angular.module("pictureShow");

  app.directive('repeatDone', function() {
    return {
      link: function(scope, element, attrs) {
      let meseeks = "im in";
      //scope.callout(scope.lastly);
      scope.$emit('repeatDone',{iun:scope.iun,toolname:scope.toolname,last:scope.lastly});
      //element.bind('$destroy', function(event) {
        if (scope.$last) {
          scope.$eval(attrs.repeatDone);
        }
      //});
    },
    scope: {
      callout: '=',
      iun: '=',
      toolname: '@',
      lastly: '='
    }
  }
  });
  
  ```
  
  if i use 
  ```
    scope: {
      callout: '=',
      iun: '=',
      toolname: '@',
      lastly: '='
    }
	
	//then this doesn't work
	if (scope.$last) {
	  scope.$eval(attrs.repeatDone);
	}
```