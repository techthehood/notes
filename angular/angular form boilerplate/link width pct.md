# link width%

	<div class="bM_stgs_bg_info bM_stgs_content_box">
	  <div class="d3_range_container width_pct">
		<div class="d3_range_stack">
		  <label class="width_label" title="">link width %:</label>
		  <div class="word_box width_pct">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].link.width_pct"
		  min="15" max="95" ng-change="take1.prep_height('link','d3_pmw')" />
		  </div>
		</div>
		<div class="d3_auto_range">
		  <div class="active_link_width squaredOne" ng-hide="show.on">
			<input type="checkbox" value="None" id="active_link_width" name="check" checked ng-model="take1.tool.views[take1.view].link.active_width" />
			<label for="active_link_width" ></label>
		  </div>
		  <label class="active_link_width_label" title="">active</label>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].link.width_pct"
		min="15" max="95" ng-change="take1.prep_height('link','d3_pmw')" />
	  </div>
	</div>