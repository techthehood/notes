# linkable adminOptions

	<div class="bM_stgs_mobility_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'linkable')" >
	  <div class="bM_switch_cont switch_cont">
		<label class="bM_switch_label stgs_access">linkable? </label>
		<label class="bM_switch switch">
		  <input class="switch_input stgs_access access" type="checkbox"
		  ng-model="take1.tool.views[take1.view][take1.destination].linkable" ng-change="take1.soft_apply()">
		  <span class="fs_slider"></span>
		</label>
	  </div>
	</div>

template html

```
	ng-class="{linkable:take1.tool.views[take1.get_view()].textlayer.linkable == true}"
	ng-click="take1.test_link('textlayer',take1.getParam(action).text.link.url)"
```

admin template html

```
	<div class="bM_stgs_mobility_info bM_stgs_content_box">
	  <div class="bM_switch_cont switch_cont">
		<label class="bM_switch_label stgs_access">linkable? </label>
		<label class="bM_switch switch">
		  <input class="switch_input stgs_access access" type="checkbox"
		  ng-model="take1.tool.views[take1.view].textlayer.linkable" ng-change="take1.soft_apply()">
		  <span class="fs_slider"></span>
		</label>
	  </div>
	</div>
```

js
```
	this.test_link = function(dest,lnk)
	{
		let link = lnk || "";
		if(boss.service.tool.views[boss.view][dest].linkable !== true || link == "")return;
		//window.location.replace(lnk);
		boss.link(lnk);
	}//link

```

