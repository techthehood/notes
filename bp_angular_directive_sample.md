
(function(){
  var app = angular.module("pictureShow");

  app.directive("displayColors",function(){
  return{
    restrict:"AC",
    templateUrl:BASEURL + "components/com_psmod/xfiles/js/colors.html",
    scope: {
      appData: '=tData',
      valData: '=vData',
	  strRef: '@',
	  objRef: '='
	  
    },
    controller:"ColorController",
    controllerAs:"work",
     bindToController: true
  };
});
})();

invoke html
```
<div class="advanced_colors" strRef="string" objRef="object"></div>
```
the invoking works with both advanced_colors && advanced-colors class or attribute but not both

sample html file
```
<div class="color_module">
  <div class="color_intro_btn" data-view="{{work.me_seeks(work.strRef)}}">color themes</div>
</div>

```

scopes are instantly recognized throughout the controller using ctrlrRef.scopeName