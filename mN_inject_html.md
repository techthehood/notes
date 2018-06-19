# Inject HTML

example found in forms.js li 307
```
      template:"<div class='tp_head'>
	  <div ng-bind-html='txtView.service.THTML(editorText.head.html)'></div></div>"
	  + "<div class='tp_body' ng-bind-html='txtView.service.THTML(editorText.body.html)'></div>",
	  
	  //i like the look of this line
	  ng-bind-html='txtView.service.THTML(editorText.head.html)'
```

//in the service there is this function
```
      this.THTML = function(html){
        return $sce.trustAsHtml(html);
      };
```

//supported with this when the service is initiated
```
	app.service("ShowData",['$http',"$sce","$rootElement",function($http,$sce,$rootElement){
	
	//the important part for this documentation
	"$sce"  && ,$sce
```

blog_module.html example

```
    <div id="blogMod_item_{{take1.iUN}}_{{action.id}}"
    ng-repeat="action in take1.my_stars" ng-if="take1.initiated" data-test="{{take1.me_seeks(action)}}"
    class="blogMod_item pure-h w3-card" style="{{take1.getStyle()}}">
	...
	
	//this is able to use the functions return value as an object
     <div>{{(take1.getParam(action)).title}}</div><!-- this works -->
	 
	 <div>{{take1.getParam(action).title}}</div><!-- this works too with no paretnesis-->
	 
	...
	
```

blog_module.js triggers this function to get the param object
```

```

now using this prints out only the html string but doesn't actually convert the string to actual html elements
```
<div ng-bind-html="">{{take1.getParam(action).text.head.html}}</div>
```

this results in an unsafe html warning
```
<div ng-bind-html="take1.getParam(action).text.head.html"></div>
```


```
