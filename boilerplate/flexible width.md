# flexible width

<div class="mM_stgs_bg_info mM_stgs_logo_info mM_stgs_content_box" 
ng-if="take1.is_custom() || take1.available_option(take1.service.tool.views[take1.view][take1.destination],'flexible')" >
  <label title="should the slideshow be responsive">flexible width:</label>
  <button type="logo" class="mM_active_border first w3-btn" ng-click="take1.tool.views[take1.view].logo.flexible = 'none';take1.form_item_style('logo')"
  ng-class="{active:take1.tool.views[take1.view].logo.flexible == 'none'}">none</button>
  <button type="logo" class="mM_active_border  w3-btn" ng-click="take1.tool.views[take1.view].logo.flexible = 'grow';take1.form_item_style('logo')"
  ng-class="{active:take1.tool.views[take1.view].logo.flexible == 'grow'}">grow</button>
  <button type="logo" class="mM_active_border  w3-btn" ng-click="take1.tool.views[take1.view].logo.flexible = 'shrink';take1.form_item_style('logo')"
  ng-class="{active:take1.tool.views[take1.view].logo.flexible == 'shrink'}"  title="" >shrink</button>
  <button type="logo" class="mM_active_border last w3-btn" ng-click="take1.tool.views[take1.view].logo.flexible = 'both';take1.form_item_style('logo')"
  ng-class="{active:take1.tool.views[take1.view].logo.flexible == 'both'}"  title="" >all</button>
</div>