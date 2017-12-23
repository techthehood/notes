
##angular index.html
  <div class="control-group ps_config_ctrls ordering" data-mode="assets" o-data='show.module_position' style="">

  </div>
  <div class="control-group ps_config_ctrls ordering" data-mode="module" o-data='show.module_position' style="">

  </div>
  [template expanding directive docs](https://docs.angularjs.org/guide/directive#template-expanding-directive)
  
##Note: module.js initialize_asset (2nd part) && $onInit is where the autoloaded tool starts

  this.$onInit = function() {
      //sTCtrlr.my_stars = sTCtrlr.stars;
      //console.log(this);
      $timeout(function(){
         console.log("post Digest with $timeout");
         if(modCtrlr.start_template == true)
         {
           ShowData.activate_template(ShowData.tool);
           ShowData.activate_template(ShowData.tool,"template_settings","settings");
         }
      },0,true).then(function(){
         //sTCtrlr.showDivs(slideIndex);
      });
    };
	
	//this grabs the json string data out of the form field and converts it to an object - it doesn't just read it into angular automatically i have to go get the data the first time i use it, then when it is updated i have 2 way binding capability
	
	this.initialize_asset = function()
    {
      let my_val = document.getElementById('jform_data_ids').value;
      if(my_val != ""){
        my_val = my_val.split(",");
        ShowData.asset_ids = my_val;
      }else {
        my_val = [];
      }
      modCtrlr.asset_ids = my_val;
      $scope.$emit('broadcast asset pair check');

      let txt_val = document.getElementById('jform_data').innerHTML;
      if(txt_val != "" && "{}"){
        txt_val = JSON.parse(txt_val);
        ShowData.tool = txt_val;
        modCtrlr.tool = txt_val;
        modCtrlr.start_template = true;
      }
    }//initialize_asset

##my version using template literals
[template literals docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

	v1.0
    templateUrl:function(elem, attr){
	  //the elem comes as an array with (in this case) a single property/index
      //let mode = elem[0].dataset.mode;//this works
	  let mode = attr.mode;//works
	  
      //let urlStr = `${BASEURL}components/com_psmod/xfiles/js/${(mode == "module") ? "order_module" :"order_asset"}.html`;//this works
	  
	  let urlStr = `${BASEURL}components/com_psmod/xfiles/js/order_${mode}.html`;//streamlined
	  
      console.log(`new url string = ${urlStr}`);
	  
      return urlStr;
    },

	## ADDING AN DYNAMIC VIEW LOGIC TO THE TEMPLATE
	
	//I ADDED AN NG-IF TO THE TOP LINE
	
	  template:'<div class="showTime_manual_slideshow w3-content w3-display-container pure-h" ng-if="take1.motiv == \'default\'">'
      + '<div class="showTime_img_cont pure-h" >'
        + '<div id="showTime_img_{{take1.iUN}}_{{action.id}}"'
        + 'ng-repeat="action in take1.my_stars" ng-if="take1.initiated"'
        + 'class="showTime_img pure-h  mySlides" ng-bind="take1.insertCanvas(action)">'
        + '</div>'
      + '</div>'
      + '<button class="w3-button w3-black w3-display-left" ng-click="take1.plusDivs(-1)">&#10094;</button>'
      + '<button class="w3-button w3-black w3-display-right" ng-click="take1.plusDivs(1)">&#10095;</button>'
    + '</div>'
	
	//I ADDED THIS LINE TO THE TEMPLATE
    + '<div ng-if="take1.motiv == \'settings\'">switched to settings \n data params = {{take1.service.current_tool.params.data}}</div>',
	
	//MOTIVE IS DEFINED IN SERVICE activate_template FN AND IS USED 
	TO DESCRIBE WHICH LAYOUT TO USE
	
	//v1.1
	
	```
	templateUrl:function(elem, attr){
      let file_name = attr.marquee;
      //let urlStr = `${BASEURL}components/com_psmod/xfiles/js/${file_name}.html`;//old way
      let urlStr = `${attr.home}tool_templates/${file_name}/${file_name}.html`;

      console.log(`new url string = ${urlStr}`);

      return urlStr;
    },
	```
	