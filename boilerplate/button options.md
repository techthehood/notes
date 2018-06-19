# button options adminOptions 

	<div class="mSS_stgs_bg_info mSS_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'btn_hov')" >
	  <label title="">bkgd hover color:</label>
	  <input type="color" class="mSS_stgs_bg_color mSS_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.btn_hov" />
	</div><!--ends bg info-->

	<div class="mSS_stgs_bg_info mSS_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'icon_bg')" >
	  <label title="">icon color:</label>
	  <input type="color" class="mSS_stgs_bg_color" ng-model="take1.service.tool.views[take1.view].button.icon_bg"/>
	</div><!--ends bg info-->
	<div class="mSS_stgs_bg_info mSS_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'icon_hov')" >
	  <label title="">icon hover color:</label>
	  <input type="color" class="mSS_stgs_bg_color mSS_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.icon_hov" />
	</div><!--ends bg info-->
	<div class="mSS_stgs_bg_info mSS_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'btn_height')" >
	  <div class="d3_range_container">
		<label title="">btn height:</label>
		<div class="word_box">
		<input type="number" class="mSS_stgs_bg_opacity_nbr mSS_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.btn_height"
		min="15" max="100" ng-change="take1.prep_height()"/>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="mSS_stgs_bg_opacity_rng mSS_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.btn_height"
		min="15" max="100" ng-change="take1.prep_height()"/>
	  </div>
	</div>

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'height')" >
	  <div class="d3_range_container">
		<label title="">btn height:</label>
		<div class="word_box">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.height"
		min="5" max="100" ng-change="take1.get_nav_style('button')"/>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.height"
		min="5" max="100" ng-change="take1.get_nav_style('button')"/>
	  </div>
	</div>
	
	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'width')" >
	  <div class="d3_range_container">
		<label title="">btn width:</label>
		<div class="word_box">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.width"
		min="5" max="100" ng-change="take1.get_nav_style('button')"/>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view].button.width"
		min="5" max="100" ng-change="take1.get_nav_style('button')"/>
	  </div>
	</div>