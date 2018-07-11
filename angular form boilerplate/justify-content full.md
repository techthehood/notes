# justify-content full
** has all justify options available **

** needs "justify_full":true, in the json **

	<div class="bM_stgs_mobility_info bM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.tool.views[take1.view][take1.destination],'display')"
	ng-show="take1.tool.views[take1.view][take1.destination].display == 'flex' && take1.available_option(take1.tool.views[take1.view][take1.destination],'justify_full')" >
	  <label title="justify button:">justify button:</label>
	  <button type="button" class="bM_stgs_resp justify first w3-btn" title="justify-content:flex-start"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'flex-start'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'flex-start'}">
	  <i class="material-icons" style="font-size:1rem;color:blue">format_align_left</i>
	  </button>
	  <button type="button" class="bM_stgs_resp justify w3-btn" title="justify-content:space-around"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'space-around'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'space-around'}">
		<i class="material-icons" style="font-size:1rem;color:blue">fullscreen</i>
	  </button>
	  <button type="button" class="bM_stgs_resp justify w3-btn" title="justify-content:center"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'center'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'center'}">
		<i class="material-icons" style="font-size:1rem;color:blue">format_align_center</i>
	  </button>
	  <button type="button" class="bM_stgs_resp justify w3-btn" title="justify-content:space-between"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'space-between'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'space-between'}">
		<i class="material-icons" style="font-size:1rem;color:blue">fullscreen_exit</i>
	  </button>
	  <button type="button" class="bM_stgs_resp justify last w3-btn" title="justify-content:flex-end"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'flex-end'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'flex-end'}"  title="justify right" >
		<i class="material-icons" style="font-size:1rem;color:blue">format_align_right</i>
	  </button>
	</div><!--ends mobility info-->
	
	** justify min **

	<div class="mM_stgs_mobility_info mM_stgs_content_box"
	ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'justify')"
	ng-show="take1.tool.views[take1.view][take1.destination].display == 'flex' && take1.unavailable_option(take1.tool.views[take1.view][take1.destination],'justify_full')" >
	  <label title="justify imagelayer:">justify content:</label>
	  <button type="button" class="mM_stgs_resp justify first w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'flex-start'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'flex-start'}">
	  <i class="material-icons" style="font-size:1rem;color:blue">format_align_left</i>
	  </button>
	  <button type="button" class="mM_stgs_resp justify w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'center'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'center'}">
		<i class="material-icons" style="font-size:1rem;color:blue">format_align_center</i>
	  </button>
	  <button type="button" class="mM_stgs_resp justify last w3-btn"
	  ng-click="take1.tool.views[take1.view][take1.destination].justify = 'flex-end'; take1.form_item_style(take1.destination)"
	  ng-class="{active:take1.tool.views[take1.view][take1.destination].justify == 'flex-end'}"  title="justify right" >
		<i class="material-icons" style="font-size:1rem;color:blue">format_align_right</i>
	  </button>
	</div><!--ends mobility info-->