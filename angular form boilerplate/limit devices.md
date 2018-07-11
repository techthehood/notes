# limit devices

<div class="mM_stgs_mobility_info mM_stgs_content_box" 
ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'limit_devices')" >
	<div class="mM_switch_cont switch_cont">
	  <label class="mM_switch_label stgs_access">limit devices? </label>
	  <label class="mM_switch switch">
		<input class="switch_input stgs_access access" type="checkbox"
		ng-model="take1.tool.views[take1.view][take1.destination].limit_devices"   ng-change="take1.outer_style(); take1.soft_apply()" >
		<span class="fs_slider"></span>
	  </label>
	</div>
</div>

<div class="mM_stgs_bg_info mM_stgs_content_box" 
ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'hide_small')" 
 ng-show="take1.tool.views[take1.view][take1.destination].limit_devices">
	<div class="d3_range_container width_pct">
	  <div class="d3_range_stack">
		<label class="width_label" title="">hide on?:</label>
	  </div>
	</div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<div class="d3_range_container width_pct">
	  <div class="d3_auto_range_cube d3_auto_range">
		<div class="hide_on_sm squaredOne" ng-hide="show.on">
		  <input id="hide_on_sm" type="checkbox" value="None" class="hide_on_box hide_on"
		  name="device" data-param="device_small" ng-model="take1.tool.views[take1.view][take1.destination].hide_small"
		  ng-change="take1.outer_style(); take1.soft_apply()" />
		  <label for="hide_on_sm" ></label>
		</div>
		<label class="auto_label" title="">
		  SM
		</label>
	  </div>
	  <div class="d3_auto_range_cube d3_auto_range">
		<div class="hide_on_md squaredOne" ng-hide="show.on">
		  <input id="hide_on_md" type="checkbox" class="hide_on_box hide_on" value="None"
		  name="device" data-param="device_medium" ng-model="take1.tool.views[take1.view][take1.destination].hide_medium"
		  ng-change="take1.outer_style(); take1.soft_apply()"  />
		  <label for="hide_on_md" ></label>
		</div>
		<label class="auto_label" title="">
		  MD
		</label>
	  </div>
	  <div class="d3_auto_range_cube d3_auto_range">
		<div class="hide_on_lg squaredOne" ng-hide="show.on">
		  <input id="hide_on_lg" type="checkbox" value="None" class="hide_on_box hide_on"
		  name="device" data-param="device_large"  ng-model="take1.tool.views[take1.view][take1.destination].hide_large"
		  ng-change="take1.outer_style(); take1.soft_apply()" />
		  <label for="hide_on_lg" ></label>
		</div>
		<label class="auto_label" title="">
		  LG
		</label>
	  </div>
	  <!--<div class="d3_auto_range_cube d3_auto_range">
		<div>{{take1.tool.views[take1.view][take1.destination].device_xlarge}}</div>
		<div class="hide_on_xl squaredOne" ng-hide="show.on">
		  <input id="hide_on_xl" type="radio" value="None" class="hide_on_box hide_on"
		  name="device" data-param="device_xlarge"  />
		  <label for="hide_on_xl" ></label>
		</div>
		<label class="auto_label" title="">
		  XL
		</label>
	  </div>-->
	</div>

</div><!-- end hide on -->