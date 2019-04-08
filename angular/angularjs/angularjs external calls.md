
      let targ_el = event.target;
      let color_el = targ_el.parentNode.querySelector(".color_module");

	  //this one seems to return the scope of the pages main app controller
      let color_ctrlr = angular.element(color_el).controller();

	  //this one seems to give be the same scope as above but includes access
	  //to all attached controllers, including the one i want
      let color_ctrlr2 = angular.element(color_el).scope();


      color_ctrlr.update_input_color(targ_el.value);
      console.log("color change running!",event,e);


	  so here is my final solution

	//get the events target
	et targ_el = event.target;

	//get the sibling element you want the scope of from the parent node
	let color_el = targ_el.parentNode.querySelector(".color_module");

	//call the alias of the controller you need then call the fn
	let color_ctrlr = angular.element(color_el).scope().picasso;
	color_ctrlr.update_input_color(targ_el.value);

	are the variables also available?

	yes the object properties are available.

  ### force angularjs to refresh from external fn calls
  [safeApply](https://coderwall.com/p/ngisma/safe-apply-in-angular-js)

  full example
  ```
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
  ```

  i was working in the directives link property which also makes scope available
  i couldn't tap into $scope using the controllers variable
  ```
  el_ctrlr.$scope or el_ctrlr.scope
  ```

  but i could access links scope and i abbreviated the script
  ```
    let el_ctrlr = scope.take1;//fixed
    el_ctrlr._.resize_id ++;


    var phase = scope.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
        el_ctrlr.update_view();
    } else {
      scope.$apply(el_ctrlr.update_view());
    }

  ```
  **now it works**
