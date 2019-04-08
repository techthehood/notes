
## original slider version
```
	<div class="mM_stgs_mobility_info mM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'width_control')">
	  <div class="mM_switch_cont switch_cont">
		<label class="mM_switch_label stgs_access">width control? </label>
		<label class="mM_switch switch">
		  <input class="switch_input stgs_access access" type="checkbox"
		  ng-model="take1.tool.views[take1.view][take1.destination].width_control"
		  ng-change="">
		  <span class="fs_slider"></span>
		</label>
	  </div>
	</div>
```

## button version (patterned after width control)
```
	<div class="mM_stgs_mobility_info mM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'width_control')" >
	  <label title="flow imagelayer:">width control? </label>
	  <button type="button" class="mM_stgs_resp first w3-btn"  title="width control disabled"
	  ng-click="take1.tool.views[take1.view][take1.destination].width_control = false; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].width_control == false}">
		disable
	  </button>

	  <button type="button" class="mM_stgs_resp w3-btn"  title="width control percent"
	  ng-click="take1.tool.views[take1.view][take1.destination].width_control = 'percent'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].width_control == 'percent'}">
		standard
	  </button>

	  <button type="button" class="mM_stgs_resp last w3-btn"  title="width control other"
	  ng-click="take1.tool.views[take1.view][take1.destination].width_control = 'direct'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].width_control == 'direct'}">
		multi device
	  </button>
	</div><!--ends mobility info-->
```

device_value
device_small
device_medium
device_large
device_xlarge

