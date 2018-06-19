# border width adminOptions

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'border_width')" >
	  <div class="d3_range_container">
		<label title="">main border width:</label>
		<div class="word_box">
		  <input type="number" class="bM_stgs_border_width bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].border_width"
		  min="0" max="10" ng-change="take1.form_item_style(take1.destination)"/>
		</div>
	  </div>
	  <div class="range_box">
		<input type="range" class="bM_stgs_border_width_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].border_width"
		min="0" max="10" ng-change="take1.form_item_style(take1.destination)"/>
	  </div>
	</div>