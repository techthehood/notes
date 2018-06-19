
[first article](https://gist.github.com/EpokK/5884263)
[second article](https://codepen.io/TheLarkInn/post/angularjs-directive-labs-ngenterkey)

working example
```
	(function(){
	  var app = angular.module("pictureShow");

	  //console.log("ngEnter running!");
	  app.directive('ngEnter', function() {
			  return function(scope, element, attrs) {
				  element.bind("keydown keypress", function(event) {
					  if(event.which === 13) {
							  scope.$apply(function(){
									  scope.$eval(attrs.ngEnter);
							  });

							  event.preventDefault();
					  }
				  });
			  };
	  });
	})();

```