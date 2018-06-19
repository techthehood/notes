# border radius adminOptions

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'border_radius')" >
	  <div class="d3_range_container">
		<label title="">main border radius:</label>
		<div class="word_box">
		  <input type="number" class="bM_stgs_border_radius bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].border_radius"
		  min="0" max="50" ng-change="take1.form_item_style(take1.destination)"/>
		</div>
	  </div>
	  <div class="range_box">
		<input type="range" class="bM_stgs_border_radius_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].border_radius"
		min="0" max="50" ng-change="take1.form_item_style(take1.destination)"/>
	  </div>
	</div>