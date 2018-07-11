# background opacity adminOptions

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'bg_opacity')" >
	  <div class="d3_range_container">
		<label title="">main bkgd opacity:</label>
		<div class="word_box">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].bg_opacity"
		  min="0" max="100" ng-change="take1.prep_color('opacity',take1.destination)"/>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].bg_opacity"
		min="0" max="100" ng-change="take1.prep_color('opacity',take1.destination)"/>
	  </div>
	</div><!--ends bg info-->