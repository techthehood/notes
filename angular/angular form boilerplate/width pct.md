# width %

<div class="mM_stgs_bg_info mM_stgs_content_box" 
ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'width_pct')" >
  <div class="d3_range_container width_pct">
	<div class="d3_range_stack">
	  <label class="width_label" title="">logo width %:</label>
	  <div class="word_box width_pct">
	  <input type="number" class="mM_stgs_bg_opacity_nbr mM_stgs_bg_option" ng-model="take1.tool.views[take1.view].logo.width_pct"
	  min="0" max="100" ng-change="take1.prep_height('logo','d3_pw')" />
	  </div>
	</div>
	<div class="d3_auto_range">
	  <div class="active_logo_width squaredOne" ng-hide="show.on">
		<input type="checkbox" value="None" id="active_logo_width" name="check"  ng-model="take1.tool.views[take1.view].logo.active_width" />
		<label for="active_logo_width" ></label>
	  </div>
	  <label class="active_logo_width_label" title="">active</label>
	</div>
  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
<!--range slider-->
  <div class="range_box">
	<input type="range" class="mM_stgs_bg_opacity_rng mM_stgs_bg_option" ng-model="take1.tool.views[take1.view].logo.width_pct"
	min="0" max="100" ng-change="take1.prep_height('logo','d3_pw')" />
  </div>
</div>