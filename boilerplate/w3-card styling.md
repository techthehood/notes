w3-card styling

	<div class="bM_stgs_bg_info bM_stgs_button_info bM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'card_styling')" >
	  <label title="should the slideshow be responsive">w3-card styling?:</label>
	  <button type="button" class="bM_active_border first w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].card_styling = true;"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].card_styling != false}">yes</button>
	  <button type="button" class="bM_active_border last w3-btn" ng-click="take1.tool.views[take1.view][take1.destination].card_styling = false;"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].card_styling == false}"  title="" >no</button>
	</div>