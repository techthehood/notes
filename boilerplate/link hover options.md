# link hover options

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'font_hov_color')" >
	  <label title="">hover text color:</label>
	  <input type="color" class="bM_stgs_bg_color bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].font_hov_color"
	  ng-change="take1.service.color_change(); take1.prep_color('color',take1.destination,'font_hov')" /><!-- formerly 'text' -->
	  <div class="advanced_colors" data-destination="take1.service.tool.views[take1.view][take1.destination]" data-property="font_hov_color"
	  data-collection="take1.getMyColors" data-expandto="bM_stgs_sect_cont" ></div>
	</div><!--ends bg info-->
	
	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'bg_hov_color')">
	  <label title="">hover bkgd color:</label>
	  <input type="color" class="bM_stgs_bg_color bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].bg_hov_color"
	  ng-change="take1.service.color_change(); take1.prep_color('color',take1.destination,'bg_hov')" />
	  <div class="advanced_colors" data-destination="take1.tool.views[take1.view][take1.destination]" data-property="bg_hov_color"
	  data-collection="take1.getMyColors" data-expandto="mM_stgs_sect_cont"></div>
	</div><!--ends bg info-->
	
	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'bg_hov_opacity')">
	  <div class="d3_range_container">
		<label title="">hover bkgd opacity:</label>
		<div class="word_box">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].bg_hov_opacity"
		  min="0" max="100" ng-change="take1.prep_color('opacity',take1.destination,'bg_hov')"/>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].bg_hov_opacity"
		min="0" max="100" ng-change="take1.prep_color('opacity',take1.destination,'bg_hov')"/>
	  </div>
	</div><!--ends bg info-->