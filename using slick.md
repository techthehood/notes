

modified with bootstrap - ng-app taken out of the html tag

```

<!DOCTYPE html>
<html ><!-- ng-app="slick-example" -->

  <head>
    <script data-require="angular.js@1.2.19" data-semver="1.2.19" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>
    <script data-require="jquery@2.1.1" data-semver="2.1.1" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="http://vasyabigi.github.io/angular-slick/bower_components/slick-carousel/slick/slick.css" />
    <script src="http://vasyabigi.github.io/angular-slick/bower_components/slick-carousel/slick/slick.js"></script>
    <script src="angular-slick.js"></script>
    <script src="script.js"></script>
  </head>

  <body class="bigBox" ng-controller="appController">
    <h1>Hello Plunker!</h1>
    <button type="button" ng-click="messItUp()">Mess it up</button>
    
    <slick ng-if="dataLoaded" init-onload="false" data="dataLoaded" slides-to-show="3" dots="true">
      <div ng-repeat="item in items">
        <span>
            <img ng-src="{{ item.imgSrc }}" alt="{{ item.label}}" />
        </span>
        <span>{{ item.label }}</span>
      </div>
    </slick>
  </body>
  <script>
    //ng-app="slick-example"
    angular.bootstrap(document.querySelector('.bigBox'), ['slick-example']);
  </script>

</html>


```

seems key to loading it

```
ng-if="dataLoaded" init-onload="false" data="dataLoaded" 
```

GOTCHA:
slick conflicts with mootools in joomla
 https://github.com/kenwheeler/slick/issues/2550
 
 go into slick-carousel/slick/slick.js and change 
 setPosition to setPosition1
 
 ## initial test standard
 failed miserably, it was because of the gotcha, i need to redo this test
 
 ## initial test (angular)
 after fixing the gotcha it worked. i had to give the slick container a 
 width of 100% and an height of 100% for it to fill the space then i also had to give the items a width and height.
 
 ##retest standard
 -updated slick.js to slick.mod.js and replaced setPosition
 
 angular slick directive
```
       <slick ng-if="take1.dataLoaded" init-onload="false" data="take1.dataLoaded" slides-to-show="3" dots="true" >
	   </slick>
```

here is my initial slick effort using vasyabigi

```
      <slick ng-switch-when="true" class="bM_slider bM_slider_{{take1.iUN}}" ng-if="take1.dataLoaded" init-onload="false"
      ng-class="{part:take1.tool.details.button.nav_dots == false || take1.tool.details.button.wrap_dots == 'no'}"
      data="take1.dataLoaded" slides-to-scroll="3" slides-to-show="3" vertical="{{take1.slick_orient()}}" vertical-swiping="true"
      dots="{{take1.tool.details.button.nav_dots}}" init="take1.f_resize()" enabled="false" settings="'{{take1.slickConfig}}'" >
	  
		<div ng-repeat ele...
	  
	  </slick>
```
[slick angular vasyabigi](https://github.com/vasyabigi/angular-slick)
in vasyabigi's version settings doesn't work i had to switch to devmark's version

[slick angular devmark](https://github.com/devmark/angular-slick-carousel)

enabled="false" didn't work on v's version. it works on devmarks

this is the same in both

```
if(admin){
}
else {
      angular.element($window).bind('resize', function(){
        let my_scope = scope;
        //let el_ctrlr = element.controller();//bug: doesn't always have a controller
        let el_ctrlr = scope.take1;//fixed
        el_ctrlr.service.resize_id ++;
        //el_ctrlr.slick_refresh();
        el_ctrlr.soft_apply(el_ctrlr.slick_refresh);

      });
    }
	
//and this

      this.slick_refresh = function()
      {
        let targ_slider = `.bM_slider_${boss.iUN}`;
        let targ_el = document.querySelector(targ_slider);
        if(targ_el == undefined || targ_el.slick == undefined)return;
        targ_el.slick.refresh();
        //targ_el.slick.setPosition();
        //targ_el.slick('resize');
        boss.soft_apply();
      }//slick_refresh
```

here is my devmark html version

```
      <slick ng-switch-when="true" class="bM_slider bM_slider_{{take1.iUN}}" ng-if="take1.dataLoaded" init-onload="false"
      ng-class="{part:take1.tool.details.button.nav_dots == false || take1.tool.details.button.wrap_dots == 'no'}"
      data="take1.dataLoaded" slides-to-scroll="3" slides-to-show="3" vertical="{{take1.slick_orient()}}" vertical-swiping="false"
      dots="{{take1.tool.details.button.nav_dots}}" init="take1.f_resize()" enabled="true" center-mode="false"
       settings="'{{take1.slickConfig}}'" >
		<div...
	   </slick>

```

i want to control all the attribute stuff with settings - (the reason for the change to devmark)

slick config test

```

	this.slickConfig = {
		slidesToShow: 4,
		slidesToScroll:4,
		enabled: false,
		event: {
			init: function (event, slick) {
			  //slick.slickGoTo($scope.currentIndex); // slide to correct index when init
			  boss.f_resize();
			},
			reInit: function (event, slick) {
			  //slick.slickGoTo($scope.currentIndex); // slide to correct index when init
			  boss.f_resize();
			}
		}
	};

```
