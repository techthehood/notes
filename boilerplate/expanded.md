# expanded adminOptions

	<div class="bM_stgs_mobility_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'flex_fill')" >
	  <!-- used with css flex_fill for {flex: 1 auto $mp;} -->
		<div class="bM_switch_cont switch_cont">
			<label class="bM_switch_label stgs_access">expanded? </label>
			<label class="bM_switch switch">
			  <input class="switch_input stgs_access access" type="checkbox"
		  ng-model="take1.tool.views[take1.view][take1.destination].flex_fill" ng-change="take1.make_margin(take1.destination)">
			  <span class="fs_slider"></span>
			</label>
		</div>
	</div>