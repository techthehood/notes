advanced style/class

admin template html

For everything except basic
advanced class
```
	<div class="bM_stgs_class_info bM_stgs_content_box">
		<!-- advanced class -->
		<label title="css style unique identifier">advanced class:</label>
		<input type="text" class="bM_stgs_advanced_class" ng-model="take1.service.tool.views[take1.view][take1.destination].advanced_class"
		ng-change="take1.soft_apply()"/>
	</div><!--ends bg info-->

	<div class="bM_stgs_class_info bM_stgs_content_box">
		<!-- advanced style -->
		<label title="css style unique identifier">advanced style:</label>
		<input type="text" class="bM_stgs_advanced_class" ng-model="take1.service.tool.views[take1.view][take1.destination].advanced_style"
		ng-change="take1.form_item_style('main')"/>
	</div><!--ends bg info-->
```



For Basic
advanced class
```
	<div class="bM_stgs_class_info bM_stgs_content_box">
		<label title="css style unique identifier">advanced class:</label>
		<input type="text" class="bM_stgs_advanced_class" ng-model="take1.service.tool.views[take1.view].advanced_class"/>
	</div><!--ends bg info-->
```

advanced class
```
	<div class="bM_stgs_class_info bM_stgs_content_box">
		<label title="css style unique identifier">advanced style:</label>
		<input type="text" class="bM_stgs_advanced_class" ng-model="take1.service.tool.views[take1.view].advanced_style"/>
	</div><!--ends bg info-->
```

.js

is.form_item_style

```
	
            let advanced_style = (boss.service.exists(target_detail.advanced_style)) ? 
            target_detail.advanced_style : "";


```

```
	    let target_detail = ShowData.tool.views[boss.view][str];
        let advanced_class = "";

		advanced_class = (boss.service.exists(target_detail.advanced_class)) ?
		target_detail.advanced_class : "";

		use_class = `${use_class} ${advanced_class}`;

```

.json
```
	"advanced_class":"",
	"advanced_style":""
```