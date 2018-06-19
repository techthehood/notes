# font select and font-size

	<div class="bM_stgs_mobility_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'font_style')">
	  <div class="bM_switch_cont switch_cont">
		<label class="bM_switch_label stgs_access">font style? </label>
		<label class="bM_switch switch">
		  <input class="switch_input stgs_access access" type="checkbox"
		  ng-model="take1.tool.views[take1.view][take1.destination].font_style"
		  ng-change="take1.service.linkedve(take1.destination,'font_style','height_control')">
		  <span class="fs_slider"></span>
		</label>
	  </div>
	</div>

	<div class="bM_stgs_class_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'font')"
	ng-show="take1.available_option(take1.tool.views[take1.view][take1.destination].font_style == true" >
	  <label title="css style unique identifier">font:</label>
	  <div class="select-menu bM_stgs_custom_class" data-value-mode='none' data-value-data='take1.tool.views[take1.view][take1.destination].font'
	  data-option-data='take1.service.custom_head.font' data-callout="take1.setSelect" data-params="{targ:take1.tool.views[take1.view][take1.destination],prop:'font'}"></div>
	</div><!--ends bg info-->
	<div class="bM_stgs_class_info bM_stgs_content_box bM_font_size"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'font_size')"
	ng-show="take1.available_option(take1.tool.views[take1.view][take1.destination].font_style == true" >
	  <label title="css style unique identifier">font size:</label>
	  <div class="word_box width_pct">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].font_size"
		min="8" max="72" step="1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].font_size"
		min="0.2" max="5" step=".1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
		<label class=""> {{take1.tool.views[take1.view][take1.destination].font_measure}}</label>
	  </div>
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

	  <div class="range_box">
	  <input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="custom" ng-model="take1.tool.views[take1.view][take1.destination].font_size"
	  min="8" max="72" step="1"  value="{{take1.tool.views[take1.view][take1.destination].font_size}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure == 'px'" />
	  <input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="custom" ng-model="take1.tool.views[take1.view][take1.destination].font_size"
	  min="0.2" max="5" step=".1"  value="{{take1.tool.views[take1.view][take1.destination].font_size}}" ng-if="take1.tool.views[take1.view][take1.destination].font_measure != 'px'" />
	  </div>
	</div><!--ends bM_font_size-->