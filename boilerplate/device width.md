# device width adminOptions

	<div class="bM_stgs_bg_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'device_small')">
	  <div class="d3_range_container width_pct">
		<div class="d3_range_stack">
		  <label class="width_label" title="">device width:</label>
		  <div class="d3_auto_range">
			<div class="mobile_padding_custom squaredOne" ng-hide="show.on">
			  <button class="" ng-click="take1.make_devices(take1.destination,'clear')">clear</button>
			</div>
			<label class="auto_label" title="" >clear mobile</label>
		  </div>
		  <div class="word_box width_pct">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" data-dest="{{take1.destination}}" ng-model="take1.tool.views[take1.view][take1.destination].device_value"
		  min="1" max="100" ng-change="take1.make_devices(take1.destination)" value="{{take1.tool.views[take1.view][take1.destination].device_value}}"/>
		  </div>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	  <div class="d3_range_container width_pct">
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].device_small}}</div>
		  <div class="content_device_sm squaredOne" ng-hide="show.on">
			<input id="content_device_sm" type="radio" value="None" class="{{take1.destination}}_device_box content_device"
			name="device" data-param="device_small" checked />
			<label for="content_device_sm" ></label>
		  </div>
		  <label class="auto_label" title="">
			SM
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].device_medium}}</div>
		  <div class="content_device_md squaredOne" ng-hide="show.on">
			<input id="content_device_md" type="radio" class="{{take1.destination}}_device_box content_device" value="None"
			name="device" data-param="device_medium" checked />
			<label for="content_device_md" ></label>
		  </div>
		  <label class="auto_label" title="">
			MD
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].device_large}}</div>
		  <div class="content_device_lg squaredOne" ng-hide="show.on">
			<input id="content_device_lg" type="radio" value="None" class="{{take1.destination}}_device_box content_device"
			name="device" data-param="device_large" checked />
			<label for="content_device_lg" ></label>
		  </div>
		  <label class="auto_label" title="">
			LG
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].device_xlarge}}</div>
		  <div class="content_device_xl squaredOne" ng-hide="show.on">
			<input id="content_device_xl" type="radio" value="None" class="{{take1.destination}}_device_box content_device"
			name="device" data-param="device_xlarge" checked />
			<label for="content_device_xl" ></label>
		  </div>
		  <label class="auto_label" title="">
			XL
		  </label>
		</div>
		<!--<div class="d3_auto_range_cube d3_auto_range">
		  <div class="content_device_all squaredOne" ng-hide="show.on">
			<input type="checkbox" value="None" id="content_device_all" class="content_device_all_box content_device" ng-model="take1.tool.views[take1.view][take1.destination].auto_same_devices"
			name="device"  checked ng-click="take1.make_devices('all','content_device_all_box',take1.destination)"/>
			<label for="content_device_all" ></label>
		  </div>
		  <label class="auto_label" title="">all</label>
		</div>-->
	  </div>
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="{{take1.destination}}" ng-model="take1.tool.views[take1.view][take1.destination].device_value"
		min="1" max="100" ng-change="take1.make_devices(take1.destination)" value="{{take1.tool.views[take1.view][take1.destination].device_value}}"/>
	  </div>
	</div><!-- end range container -->