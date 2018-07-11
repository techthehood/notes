# Width adminOption - basic

	<div class="bM_stgs_custom_info bM_stgs_content_box">
	 <label title="customize the size your slideshow should be compared to the viewport">custom size:</label>
	 <div class="bM_stgs_size_wrapr">
	   <div class="bM_stgs_size_wrapr">width:</div>
	   <input class="bM_stgs_custom_input" type="text"  ng-blur="take1.process_size()"
	   ng-model="take1.service.tool.views[take1.view].width">
	 </div>
	 <div class="bM_stgs_size_wrapr">
	   <div >height:</div>
	   <input class="bM_stgs_custom_input" type="text" ng-blur="take1.process_size()"
	   ng-model="take1.service.tool.views[take1.view].height" >
	 </div>
	</div><!--ends custom info-->