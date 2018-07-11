# active border adminOptions

	<div class="bM_stgs_bg_info bM_stgs_button_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'active_border')" >
	  <label title="should the slideshow be responsive">main active border:</label>
	  <button type="button" class="bM_active_border first w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].active_border = true;take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].active_border == true}">yes</button>
	  <button type="button" class="bM_active_border last w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].active_border = false;take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].active_border != true}"  title="" >no</button>
	</div>