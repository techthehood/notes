align content adminOptions

	<div class="mM_stgs_mobility_info mM_stgs_content_box" 
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'align')" >
	  <label title="align imagelayer:">align content:</label>
	  <button type="button" class="mM_stgs_resp align first w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].align = 'flex-start'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].align == 'flex-start'}">
	  top
	  </button>

	  <button type="button" class="mM_stgs_resp align w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].align = 'center'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].align == 'center'}">
		center
	  </button>
	  <button type="button" class="mM_stgs_resp align last w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].align = 'flex-end'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].align == 'flex-end'}"  title="align right" >
		bottom
	  </button>
	</div><!--ends mobility info-->