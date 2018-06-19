# active url

	<div class="mM_stgs_bg_info mM_stgs_button_info mM_stgs_content_box">
	  <label title="should the slideshow be responsive">title active url:</label>
	  <button type="button" class="mM_active_url first w3-btn" ng-click="take1.tool.views[take1.view].title.active_url = true;take1.form_item_style('title')"
	  ng-class="{active:take1.tool.views[take1.view].title.active_url == true}">on</button>
	  <button type="button" class="mM_active_url last w3-btn" ng-click="take1.tool.views[take1.view].title.active_url = false;take1.form_item_style('title')"
	  ng-class="{active:take1.tool.views[take1.view].title.active_url != true}"  title="" >off</button>
	</div>