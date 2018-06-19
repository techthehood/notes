# background color adminOptions 

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'bg_color')" >
	  <label title="">main bkgd color:</label>
	  <input type="color" class="bM_stgs_bg_color bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].bg_color"
	  ng-change="take1.service.color_change(); take1.prep_color('color',take1.destination)" />
	  <div class="advanced_colors" data-destination="take1.tool.views[take1.view][take1.destination]" data-property="bg_color"
	  data-callout="take1.prep_color2" data-params="['color',take1.destination]" data-collection="take1.getMyColors"
	  data-expandto="bM_stgs_sect_cont"></div>
	</div><!--ends bg info-->