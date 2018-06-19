padding adminOptions

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'padding_value')" >
	  <div class="d3_range_container width_pct">
		<div class="d3_range_stack">
		  <div class="bM_stgs_label_cont">
			<label class="width_label" title="">main padding:</label>
		  <!--width mobile margin/padding chk box -->
		  <div class="d3_auto_range">
			<div class="mobile_padding_main squaredOne" ng-hide="show.on">
			  <input type="checkbox" value="None" id="mobile_padding_main" name="check"
			  ng-model="take1.tool.views[take1.view][take1.destination].mobile_padding" ng-change="take1.form_item_style(take1.destination)" />
			  <label for="mobile_padding_main" ></label>
			</div>
			<label class="auto_label" title="" >clear mobile</label>
		  </div>
		</div><!-- bM_stgs_label_cont -->
		  <div class="word_box width_pct">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" data-dest="main" ng-model="take1.tool.views[take1.view][take1.destination].padding_value"
		  min="0.0" max="5.0" step=".1" ng-change="take1.make_padding(take1.destination)" value="{{take1.tool.views[take1.view][take1.destination].padding_value}}"/>
		  </div>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	  <div class="d3_range_container width_pct">
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].padding_top}}</div>
		  <div class="main_padding_top squaredOne" ng-hide="show.on">
			<input id="main_padding_top" type="checkbox" value="None" class="main_padding_box main_padding"
			name="check" data-param="padding_top" checked />
			<label for="main_padding_top" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">expand_less</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].padding_right}}</div>
		  <div class="main_padding_rt squaredOne" ng-hide="show.on">
			<input id="main_padding_rt" type="checkbox" class="main_padding_box main_padding" value="None"
			name="check" data-param="padding_right" checked />
			<label for="main_padding_rt" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">chevron_right</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].padding_bottom}}</div>
		  <div class="main_padding_bot squaredOne" ng-hide="show.on">
			<input id="main_padding_bot" type="checkbox" value="None" class="main_padding_box main_padding"
			name="check" data-param="padding_bottom" checked />
			<label for="main_padding_bot" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">expand_more</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.views[take1.view][take1.destination].padding_left}}</div>
		  <div class="main_padding_lft squaredOne" ng-hide="show.on">
			<input id="main_padding_lft" type="checkbox" value="None" class="main_padding_box main_padding"
			name="check" data-param="padding_left" checked />
			<label for="main_padding_lft" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">chevron_left</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div class="main_padding_all squaredOne" ng-hide="show.on">
			<input type="checkbox" value="None" id="main_padding_all" class="main_padding_all_box main_padding" ng-model="take1.tool.views[take1.view][take1.destination].auto_same_padding"
			name="check"  checked ng-click="take1.make_padding('all','main_padding_all_box',take1.destination)"/>
			<label for="main_padding_all" ></label>
		  </div>
		  <label class="auto_label" title="">all</label>
		</div>
	  </div>
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].padding_value"
		min="0" max="50.0" step="1" ng-change="take1.make_padding(take1.destination)" value="{{take1.tool.views[take1.view][take1.destination].padding_value}}"
		data-dest="main" ng-if="take1.tool.views[take1.view].link.padding_measure == 'px'" />
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].padding_value"
		min="0" max="5.0" step=".1" ng-change="take1.make_padding(take1.destination)" value="{{take1.tool.views[take1.view][take1.destination].padding_value}}"
		data-dest="main" ng-if="take1.tool.views[take1.view].link.padding_measure != 'px'" />
	  </div>

	  <div class="padding_measure_btns measure_btns bM_stgs_button_info">
			<button type="button" class="bM_stgs_resp w3-btn first" ng-click="take1.nav_measure(take1.destination,'padding_measure','px');"
			ng-class="{active:take1.tool.views[take1.view][take1.destination].padding_measure == 'px','w3-disabled':take1.tool.views[take1.view].navigation}"  title="" >px</button>
			<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.nav_measure(take1.destination,'padding_measure','rem');"
			ng-class="{active:take1.tool.views[take1.view][take1.destination].padding_measure == 'rem','w3-disabled':take1.tool.views[take1.view].navigation}">rem</button>
			<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.nav_measure(take1.destination,'padding_measure','em');"
			ng-class="{active:take1.tool.views[take1.view][take1.destination].padding_measure == 'em','w3-disabled':take1.tool.views[take1.view].navigation}">em</button>
			<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.nav_measure(take1.destination,'padding_measure','%');"
			ng-class="{active:take1.tool.views[take1.view][take1.destination].padding_measure == '%','w3-disabled':take1.tool.views[take1.view].navigation}">%</button>
			<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.nav_measure(take1.destination,'padding_measure','vmax');"
			ng-class="{active:take1.tool.views[take1.view][take1.destination].padding_measure == 'vmax','w3-disabled':take1.tool.views[take1.view].navigation}">vmx</button>
			<button type="button" class="bM_stgs_resp w3-btn last" ng-click="take1.nav_measure(take1.destination,'padding_measure','vmin');"
			ng-class="{active:take1.tool.views[take1.view][take1.destination].padding_measure == 'vmin','w3-disabled':take1.tool.views[take1.view].navigation}"  title="" >vmn</button>
		</div>

	</div><!-- end range container -->