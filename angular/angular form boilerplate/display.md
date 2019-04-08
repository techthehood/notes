custom display adminOptions

	<div class="bM_stgs_mobility_info bM_stgs_content_box info_space"  
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'display')" >
	  <label title="should the slideshow be responsive">custom display:</label>
	  <button type="button" class="bM_stgs_resp first w3-btn"   title=""
	  ng-click="take1.tool.views[take1.view][take1.destination].display = 'none'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].display == 'none'}">none</button>
	  <button type="button" class="bM_stgs_resp w3-btn"   title=""
	  ng-click="take1.tool.views[take1.view][take1.destination].display = 'block'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].display == 'block'}" >block</button>
	  <button type="button" class="bM_stgs_resp last w3-btn" title=""
	  ng-click="take1.tool.views[take1.view][take1.destination].display = 'flex'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].display == 'flex'}" >flex</button>
	</div><!--ends custom element-->