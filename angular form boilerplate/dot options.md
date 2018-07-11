# dot options adminOptions

	<div class="bM_stgs_mobility_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'nav_dots')" >
	  <div class="bM_switch_cont switch_cont">
		<label class="bM_switch_label stgs_access">navigation dots? </label>
		<label class="bM_switch switch">
		  <input class="switch_input stgs_access access" type="checkbox"
		  ng-model="take1.tool.views[take1.view][take1.destination].nav_dots" ng-change="take1.manage_dots(take1.iUN);take1.soft_apply()">
		  <span class="fs_slider"></span>
		</label>
	  </div>
	</div>
	
	<div class="bM_stgs_bg_info bM_stgs_button_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'dot_mode') && take1.tool.views[take1.view][take1.destination].nav_dots" >
	  <label title="">dot mode:</label>
	  <button type="button" class="bM_active_border first w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].dot_mode = 'layered';"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].dot_mode != 'inline'}">layered</button>
	  <button type="button" class="bM_active_border last w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].dot_mode = 'inline';"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].dot_mode == 'inline'}"  title="" >inline</button>
	</div>
	
	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'dot_position') && take1.tool.views[take1.view][take1.destination].nav_dots" >
	  <div class="d3_range_container width_pct">
		<div class="d3_range_stack">
		  <label class="width_label" title="">dot position:</label>
		  <div class="word_box width_pct">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].dot_position"
		  min="-50" max="50" ng-model-options="{ updateOn: 'blur' }" />
		  </div>
		</div>

	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].dot_position"
		min="-50" max="50" />
	  </div>
	</div>
	
	<div class="bM_stgs_bg_info bM_stgs_button_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'wrap_dots') && take1.tool.views[take1.view][take1.destination].nav_dots" >
	  <label title="should the slideshow be responsive">wrap dots:</label>
	  <button type="button" class="bM_active_border first w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].wrap_dots = 'yes';take1.get_nav_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].wrap_dots == 'yes'}">yes</button>
	  <button type="button" class="bM_active_border last w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].wrap_dots = 'no';take1.get_nav_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].wrap_dots != 'yes'}"  title="" >no</button>
	</div>