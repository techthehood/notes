# item height adminOptions

item height

	<div class="bM_stgs_class_info bM_stgs_content_box bM_item_height"
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'ellipsis')" 
	ng-show="take1.tool.views[take1.view][take1.destination].ellipsis == true" >
	  <label title="css style unique identifier">image item height:</label>
	  <div class="word_box width_pct">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="25" step=".5" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="10" step=".1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
		<label class=""> {{take1.tool.views[take1.view][take1.destination].font_measure}}</label>

		<div class="font_measure_btns measure_btns bM_stgs_button_info">
				<button type="button" class="bM_stgs_resp w3-btn first" ng-click="take1.tool.views[take1.view][take1.destination].font_measure = 'px'; take1.font_item_style(take1.destination)"
				ng-class="{active:take1.tool.views[take1.view][take1.destination].font_measure == 'px'}"  title="" >px</button>
				<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].font_measure = 'rem'; take1.font_item_style(take1.destination)"
				ng-class="{active:take1.tool.views[take1.view][take1.destination].font_measure == 'rem'}">rem</button>
				<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].font_measure = 'em'; take1.font_item_style(take1.destination)"
				ng-class="{active:take1.tool.views[take1.view][take1.destination].font_measure == 'em'}">em</button>
				<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].font_measure = '%'; take1.font_item_style(take1.destination)"
				ng-class="{active:take1.tool.views[take1.view][take1.destination].font_measure == '%'}">%</button>
				<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].font_measure = 'vmax'; take1.font_item_style(take1.destination)"
				ng-class="{active:take1.tool.views[take1.view][take1.destination].font_measure == 'vmax'}">vmx</button>
				<button type="button" class="bM_stgs_resp w3-btn last" ng-click="take1.tool.views[take1.view][take1.destination].font_measure = 'vmin'; take1.font_item_style(take1.destination)"
				ng-class="{active:take1.tool.views[take1.view][take1.destination].font_measure == 'vmin'}"  title="" >vmin</button>
			</div>

	  </div><!-- end item height -->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="image" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="25" step=".5"  value="{{take1.tool.views[take1.view][take1.destination].item_height}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="image" ng-model="take1.tool.views[take1.view][take1.destination].item_height"
		min="0" max="10" step=".1"  value="{{take1.tool.views[take1.view][take1.destination].item_height}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
	  </div>
	</div><!--ends bM_item_height-->
	
number of lines

	<div class="bM_stgs_class_info bM_stgs_content_box bM_line_height"  
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'ellipsis')"  
	ng-show="take1.tool.views[take1.view][take1.destination].ellipsis == true">
	  <label title="css style unique identifier">number of lines?</label>
	  <div class="word_box width_pct">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].line_number"
		min="1" max="10" step="1" ng-model-options="{ updateOn: 'blur' }" />
		<label class=""> {{take1.tool.views[take1.view][take1.destination].line_number}}</label>
	  </div>
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="image" ng-model="take1.tool.views[take1.view][take1.destination].line_number"
		min="1" max="10" step="1"  value="{{take1.tool.views[take1.view][take1.destination].line_number}}" />
	  </div>
	</div><!--ends bM_line_number-->