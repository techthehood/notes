# height control
** may depend on font_style **

	<div class="bM_stgs_mobility_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'height_control')">
	  <div class="bM_switch_cont switch_cont">
		<label class="bM_switch_label stgs_access">height control? </label>
		<label class="bM_switch switch">
		  <input class="switch_input stgs_access access" type="checkbox"
		  ng-model="take1.tool.views[take1.view][take1.destination].height_control"
		  ng-change="take1.service.linkedve(take1.destination,'height_control','font_style')">
		  <span class="fs_slider"></span>
		</label>
	  </div>
	</div>
	<div class="bM_stgs_custom_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'height_control')"
	ng-show="take1.tool.views[take1.view][take1.destination].height_control == true" >
	  <label title="">height:</label>
	  <div class="bM_stgs_size_wrapr">
		<div >height:</div>
		<input class="bM_stgs_custom_input" type="text" ng-blur=""
		ng-model="take1.service.tool.views[take1.view][take1.destination].height" >
	  </div>
	  <div class="measure_btns measure_btns bM_stgs_button_info">
		<button type="button" class="bM_stgs_resp w3-btn first" ng-click="take1.tool.views[take1.view][take1.destination].measure = 'px'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].measure == 'px'}"  title="" >px</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].measure = 'rem'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].measure == 'rem'}">rem</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].measure = 'em'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].measure == 'em'}">em</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].measure = '%'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].measure == '%'}">%</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].measure = 'vmax'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].measure == 'vmax'}">vmx</button>
		<button type="button" class="bM_stgs_resp w3-btn last" ng-click="take1.tool.views[take1.view][take1.destination].measure = 'vmin'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].measure == 'vmin'}"  title="" >vmn</button>
	  </div>
	</div><!--ends custom info-->