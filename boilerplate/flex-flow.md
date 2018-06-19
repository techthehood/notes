flex-flow (flow content) adminOptions

	<div class="bM_stgs_mobility_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'display')" >
	ng-show="take1.tool.views[take1.view][take1.destination].display == 'flex'" >
	  <label title="flow imagelayer:">flow content:</label>
	  <button type="button" class="bM_stgs_resp flow first w3-btn" title="row wrap"
	  ng-click="take1.tool.views[take1.view][take1.destination].flow = 'row wrap'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].flow == 'row wrap'}">
	  wrap
	  </button>

	  <button type="button" class="bM_stgs_resp flow w3-btn" title="row nowrap"
	  ng-click="take1.tool.views[take1.view][take1.destination].flow = 'row nowrap'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].flow == 'row nowrap'}">
		nowrap
	  </button>
	  <button type="button" class="bM_stgs_resp flow last w3-btn" title="'column nowrap"
	  ng-click="take1.tool.views[take1.view][take1.destination].flow = 'column nowrap'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].flow == 'column nowrap'}"  >
		column
	  </button>
	</div><!--ends mobility info-->