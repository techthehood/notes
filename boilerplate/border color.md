# border color adminOptions

	<div class="bM_stgs_bg_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'border_color')" >
		<label title="">main border color:</label>
		<input type="color" class="bM_stgs_border_color bM_stgs_bg_option" ng-model="take1.tool.views[take1.view][take1.destination].border_color"
		ng-change="take1.service.color_change(); take1.form_item_style(take1.destination)" />
		<div class="advanced_colors" data-destination="take1.service.tool.views[take1.view][take1.destination]" data-property="border_color"
		data-collection="take1.getMyColors" data-expandto="bM_stgs_sect_cont" ></div>
	</div><!--ends bg info-->