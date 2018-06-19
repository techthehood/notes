# font color adminOptions

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'font_color')" >
	  <label title="">title font color:</label>
	  <input type="color" class="bM_stgs_bg_color" ng-model="take1.service.tool.views[take1.view][take1.destination].font_color"
	  ng-change="take1.service.color_change(); "/>

	  <div class="advanced_colors" data-destination="take1.service.tool.views[take1.view][take1.destination]" data-property="font_color"
	  data-collection="take1.getMyColors" data-expandto="bM_stgs_sect_cont" ></div>
	</div><!--ends bg info-->