# Total Width pct adminOption - basic

	<div class="bM_stgs_bg_info bM_stgs_content_box">
	 <div class="d3_range_container width_pct">
	   <div class="d3_range_stack">
		 <label class="width_label" title="">total width %:</label>
		 <div class="word_box width_pct">
		 <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].width_pct"
		 min="15" max="100" ng-model-options="{ updateOn: 'blur' }" />
		 </div>
	   </div>
	   <div class="d3_auto_range">
		 <div class="auto_width squaredOne" ng-hide="show.on">
		   <input type="checkbox" value="None" id="auto_width" name="check" checked ng-model="take1.tool.views[take1.view].auto_width" />
		   <label for="auto_width" ></label>
		 </div>
		 <label class="auto_label" title="">auto</label>
	   </div>
	 </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<!--range slider-->
	 <div class="range_box">
	   <input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].width_pct"
	   min="15" max="100" />
	 </div>
	</div>