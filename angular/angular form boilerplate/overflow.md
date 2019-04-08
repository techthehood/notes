# overflow adminOptions

	<div class="bM_stgs_bg_info bM_stgs_button_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'overflow')" >
	  <label title="should the slideshow be responsive">overflow?:</label>
	  <button type="button" class="bM_active_border first w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].overflow = 'unset'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].overflow == 'unset'}">unset</button>
	  <button type="button" class="bM_active_border w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].overflow = 'hidden';take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].overflow == 'hidden'}">hidden</button>
	  <button type="button" class="bM_active_border last w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].overflow = 'scroll';take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].overflow == 'scroll'}"  title="" >scroll</button>
	</div>