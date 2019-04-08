# line-height and item-height

	<div class="bM_stgs_class_info bM_stgs_content_box bM_line_height" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'line_height')" >
	  <label title="css style unique identifier">title line height:</label>
	  <div class="word_box width_pct">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].line_height"
		min="0" max="25" step=".5" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].line_height"
		min="0" max="10" step=".1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
		<label class=""> {{take1.tool.views[take1.view][take1.destination].font_measure}}</label>
	  </div>
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="title" ng-model="take1.tool.views[take1.view][take1.destination].line_height"
		min="0" max="25" step=".5"  value="{{take1.tool.views[take1.view][take1.destination].line_height}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="title" ng-model="take1.tool.views[take1.view][take1.destination].line_height"
		min="0" max="10" step=".1"  value="{{take1.tool.views[take1.view][take1.destination].line_height}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
	  </div>
	</div><!--ends bM_line_height-->
	
	<div class="bM_stgs_class_info bM_stgs_content_box bM_item_height" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'item_height')" >
	  <label title="css style unique identifier">title item height:</label>
	  <div class="word_box width_pct">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="25" step=".5" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="10" step=".1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
		<label class=""> {{take1.tool.views[take1.view][take1.destination].font_measure}}</label>
	  </div>
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="title" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="25" step=".5"  value="{{take1.tool.views[take1.view][take1.destination].item_height}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="title" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="10" step=".1"  value="{{take1.tool.views[take1.view][take1.destination].item_height}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
	  </div>
	</div><!--ends bM_item_height-->