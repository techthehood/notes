# columns across adminOptions 

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'column_small')" >
	  <div class="d3_range_container width_pct">
		<div class="d3_range_stack">
		  <label class="width_label" title="">columns across?:</label>
		  <div class="word_box width_pct">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" data-dest="content" ng-model="take1.tool.views[take1.view][take1.destination].column_value"
		  min="1" max="6" ng-change="take1.make_columns(take1.destination)" value="{{take1.tool.views[take1.view][take1.destination].column_value}}"/>
		  </div>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	  <div class="d3_range_container width_pct">
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].column_small}}</div>
		  <div class="content_column_sm squaredOne" ng-hide="show.on">
			<input id="content_column_sm" type="radio" value="None" class="content_column_box content_column"
			name="column" data-param="column_small" checked />
			<label for="content_column_sm" ></label>
		  </div>
		  <label class="auto_label" title="">
			SM
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].column_medium}}</div>
		  <div class="content_column_md squaredOne" ng-hide="show.on">
			<input id="content_column_md" type="radio" class="content_column_box content_column" value="None"
			name="column" data-param="column_medium" checked />
			<label for="content_column_md" ></label>
		  </div>
		  <label class="auto_label" title="">
			MD
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].column_large}}</div>
		  <div class="content_column_lg squaredOne" ng-hide="show.on">
			<input id="content_column_lg" type="radio" value="None" class="content_column_box content_column"
			name="column" data-param="column_large" checked />
			<label for="content_column_lg" ></label>
		  </div>
		  <label class="auto_label" title="">
			LG
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].column_xlarge}}</div>
		  <div class="content_column_xl squaredOne" ng-hide="show.on">
			<input id="content_column_xl" type="radio" value="None" class="content_column_box content_column"
			name="column" data-param="column_xlarge" checked />
			<label for="content_column_xl" ></label>
		  </div>
		  <label class="auto_label" title="">
			XL
		  </label>
		</div>
		<!--<div class="d3_auto_range_cube d3_auto_range">
		  <div class="content_column_all squaredOne" ng-hide="show.on">
			<input type="checkbox" value="None" id="content_column_all" class="content_column_all_box content_column" ng-model="take1.tool.views[take1.view][take1.destination].auto_same_columns"
			name="column"  checked ng-click="take1.make_columns('all','content_column_all_box',take1.destination)"/>
			<label for="content_column_all" ></label>
		  </div>
		  <label class="auto_label" title="">all</label>
		</div>-->
	  </div>
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="content" ng-model="take1.tool.views[take1.view][take1.destination].column_value"
		min="1" max="6" ng-change="take1.make_columns(take1.destination)" value="{{take1.tool.views[take1.view][take1.destination].column_value}}"/>
	  </div>
	</div><!-- end range container -->