# height control
** may depend on font_style **

	<div class="mSS_stgs_mobility_info mSS_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'height_control')" >
	  <label title="flow imagelayer:">height control? </label>
	  <button type="button" class="mSS_stgs_resp flow first w3-btn"  title="height control disabled"
	  ng-click="take1.tool.views[take1.view][take1.destination].height_control = 'disable'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].height_control == 'disable'}">
		disable
	  </button>

	  <button type="button" class="mSS_stgs_resp flow first w3-btn"  title="height control percent"
	  ng-click="take1.tool.views[take1.view][take1.destination].height_control = 'percent'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].height_control == 'percent'}">
		percent
	  </button>

	  <button type="button" class="mSS_stgs_resp flow first w3-btn"  title="height control other"
	  ng-click="take1.tool.views[take1.view][take1.destination].height_control = 'other'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].height_control == 'other'}">
		other
	  </button>
	</div><!--ends mobility info-->

	<div class="mSS_stgs_custom_info mSS_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'height_control')"
	ng-show="take1.tool.views[take1.view][take1.destination].height_control == 'direct'" >
	  <label title="">height:</label>
	  <div class="mSS_stgs_size_wrapr">
		<div >height:</div>
		<input class="mSS_stgs_custom_input" type="text" ng-blur=""
		ng-model="take1.service.tool.views[take1.view][take1.destination].height"
		ng-change="take1.form_item_style(take1.destination)" >
	  </div>
	  <div class="measure_btns measure_btns mSS_stgs_button_info">
		<button type="button" class="mSS_stgs_resp w3-btn first" ng-click="take1.tool.views[take1.view][take1.destination].height_measure = 'px'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].height_measure == 'px'}"  title="" >px</button>
		<button type="button" class="mSS_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].height_measure = 'rem'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].height_measure == 'rem'}">rem</button>
		<button type="button" class="mSS_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].height_measure = 'em'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].height_measure == 'em'}">em</button>
		<button type="button" class="mSS_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].height_measure = '%'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].height_measure == '%'}">%</button>
		<button type="button" class="mSS_stgs_resp w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].height_measure = 'vmax'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].height_measure == 'vmax'}">vmx</button>
		<button type="button" class="mSS_stgs_resp w3-btn last" ng-click="take1.tool.views[take1.view][take1.destination].height_measure = 'vmin'; take1.font_item_style(take1.destination)"
		ng-class="{active:take1.tool.views[take1.view][take1.destination].height_measure == 'vmin'}"  title="" >vmn</button>
	  </div>
	</div><!--ends custom info-->


	<div class="mSS_stgs_bg_info mSS_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'height_control')"
	ng-show="take1.tool.views[take1.view][take1.destination].height_control != false && take1.tool.views[take1.view][take1.destination].height_control != 'direct'" >
	  <div class="d3_range_container height_pct">
		<div class="d3_range_stack">
		  <label class="height_label" title="">total height %:</label>
		  <div class="word_box height_pct">
		  <input type="number" class="mSS_stgs_bg_opacity_nbr mSS_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].height_pct"
		  min="0" max="100" ng-blur="take1.form_item_style(take1.destination)" />
		  </div>
		</div>

	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="mSS_stgs_bg_opacity_rng mSS_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].height_pct"
		min="0" max="100" ng-change="take1.form_item_style(take1.destination)" />
	  </div>
	</div><!-- end height % -->


//deprecated

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