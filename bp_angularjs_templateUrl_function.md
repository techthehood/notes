# notes and breakdown of critical fns

see also
mN_create_new_psmod_template - overview of changes to make to tool_templates
mN_psmod_components_and_template_docs.md - for admin input templates
mN_mod_psmod_assets_template - notes to clone assets.js as a template


	## understanding my dynamic template (injection) process
	
  [template expanding directive docs](https://docs.angularjs.org/guide/directive#template-expanding-directive)
  
	## Note: module.js initialize_asset (2nd part) && $onInit is where the autoloaded tool starts

	//module.js li 43
  this.$onInit = function() {
      //sTCtrlr.my_stars = sTCtrlr.stars;
      //console.log(this);
      $timeout(function(){
         console.log("post Digest with $timeout");
         if(modCtrlr.start_template == true)
         {
		 //runs the display
           ShowData.activate_template(ShowData.tool);
		   
          //runs the settings panel ShowData.activate_template(ShowData.tool,"template_settings","settings");
         }
      },0,true).then(function(){
         //sTCtrlr.showDivs(slideIndex);
      });
    };
	
	//this is activated to switch the current template
	tools.js this.activate template li 443
	
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
	
	## initializing the template
	
	
	ShowData.activate_template(ShowData.tool);
	
	activate_template calls to data.js (service) to run the following to inject the template directive into the specified home element
	
	ShowData.tool is the json/json data associated with the template
	when switching tools/templates it uses the default values.  when using the saved user configurations it uses customized template json data
	
```
	// injection section
	
	let injection_data = '<div class="' + stage + " " + stage_id + " " + tool_class + custom_class + '" data-cast="' + custom_class
      + '" data-motiv="' + template_mode + '" ' + ' data-marquee="' + tool.file_name + '" data-mode="admin" '
      + 'data-home="' + serve.home_url + '" data-stage="' + stage_id + '" style="' + custom_style + '"></div>';
      //marquee is used in templateUrl to set dynamic template.html along with data-home
      //data-motiv is used in template.html ng-if statements
	  
	  angular.element(t_home).injector().invoke(["$compile",function($compile)
      {
        let dir_str = "." + tool.alias;
	
		...
	
```

	## why do i need an injector?  why can't I just add the code using a directive?
	
	because angular loads templates that are already in the code that it is recognizing.  any template directive code that comes late to the party has to be injected.  
	
	here's an example of already in the flow. I can have directive code embedded in a template that im injecting and angular will recognize that directive's template and add the proper template html with the proper angularjs functionality in variables and functions etc.
	
	i have a color.js template that i add to the admin style that i am injecting and it works as expected.
	
```
	
	// full sample code
	
	this.activate_template = async function(tool,home,mode)
    {
      if(typeof tool != "object" || Object.keys(tool).length === 0)return;

      let template_str = home || "showcase";
      let template_home = "." + template_str;
	  
      //dynamically chooses display style for templateUrl (along with template_mode)
      let template_style = tool.template_style || "basic";
      let template_mode = mode || template_style;//alt = settings // formerly || 'tool_default'
	  
      let tempNbr = (template_mode != "settings") ? 0 : 1;
      let custom_class = (template_mode != "settings") ? " " + tool.details.class_pfx + " " + tool.details.class_style + " " : "";
      let custom_style = (tool.details.sample_style != undefined) ? tool.details.sample_style  : "";
      //bugfix for settings display problem - can't use same dimensions as slideshow display

      //clear the stage
      let t_home = (document.getElementById(template_str)) ? document.getElementById(template_str) : document.querySelector(template_home);
      t_home.innerHTML = "";

      let tool_str = escape(JSON.stringify(tool));//formerly crew="'+tool_str+'" & sttngs="' + tool_str + '"

      serve.current_tool = tool;
      serve.tool = tool;//i want to set the tool here so i don't have to use crew

      let tool_class = " " + tool.alias + " " + template_mode + " ";
      let stage = " " + tool.file_name + "_" + template_mode;
      let stage_id = " " + tool.file_name + "_"+  serve.module_id + " ";

      let injection_data = '<div class="' + stage + " " + stage_id + " " + tool_class + custom_class + '" data-cast="' + custom_class
      + '" data-motiv="' + template_mode + '" ' + ' data-marquee="' + tool.file_name + '" data-mode="admin" '
      + 'data-home="' + serve.home_url + '" data-stage="' + stage_id + '" style="' + custom_style + '"></div>';
      //marquee is used in templateUrl to set dynamic template.html along with data-home
      //data-motiv is used in template.html ng-if statements

      t_home.innerHTML = injection_data;
      angular.element(t_home).injector().invoke(["$compile",function($compile)
      {
        let dir_str = "." + tool.alias;
        let dir_obj = document.querySelectorAll(dir_str);
        dir_str = stage_id;
        dir_str = "." + serve.removeSomething(dir_str,' ');
        let scope = angular.element(t_home).scope();
        //im using tempNbt because this is loaded twice. once for the display the other for settings
        $compile(dir_obj[tempNbr])(scope);
      }]);

    }//activate_template
	
```

	dynamically chooses display style for templateUrl 
	(along with template_mode)
```
	let template_style = tool.template_style || "basic";
	let template_mode = mode || template_style;//alt = settings // formerly || 'tool_default'
```
	
	this injects the templates directive which will run the specified templates 'templateName.js' directive templateUrl 

	
	this is the templateUrl that runs in templateName.js (directive/controller)
	
```
	//update: uses templates folder for dynamic templates in templateUrl
    templateUrl:function(elem, attr){
      let file_name = attr.marquee;
      if(file_name != "mega_menu")return;
      let template_style = (attr.motiv == "settings") ? "admin" : attr.motiv;
      //let urlStr = `${BASEURL}components/com_psmod/xfiles/js/${file_name}.html`;

      let urlStr = `${attr.home}tool_templates/${file_name}/templates/${template_style}.html`;

      //console.log(`new url string = ${urlStr}`);

      return urlStr;
    },

	//old way
	templateUrl:function(elem, attr){
      let file_name = attr.marquee;
      //let urlStr = `${BASEURL}components/com_psmod/xfiles/js/${file_name}.html`;//old way
      let urlStr = `${attr.home}tool_templates/${file_name}/${file_name}.html`;

      console.log(`new url string = ${urlStr}`);

      return urlStr;
    },
```
	## so what does tool.js do?
	
	module.js && tools.js work initially work independently of each other.  module.js when when initialized will automatically load the template that is associated with the picture show. 
	
	(i believe if one isn't selected a default is automatically selected and saved so it always has one to load when oading.)
	
	they interact when you select one of the templates from the tools.js html section
	
	tools.html runs this button
	
```
	
	     <button class="tool_btn add_btn{{tool.id}} s3 w3-circle w3-border w3-border-white w3-button"
			ng-click="work.radioCheck(tool.id); work.activate_template(tool)" title="add tool" >
            <i class="material-icons" style="font-size:1rem;color:white">done</i>
         </button>
		  
		  //calling this function
		  work.activate_template(tool)
		  
		  triggering data.js to process the template
```

	## more dynamic templates

	template.html uses a variable passed to the activate_template function to determine if i need to load the admin code or the display code.

	i want to pass more details to the activate_template injector using the ShowData.tools json to tell the templateUrl of the 'templateName'.js to load the specific template.html file found in a new 'templates' folder full of various template styles and names.

	templateUrl has access to attr' which can grab data from the dataset values that i add to the injector's element. (i don't think it can easily access the apps service.  but it really doesn't have to if i can access the dataset)

```

	templateUrl:function(elem, attr){
      let file_name = attr.marquee;
	 ...
	   
```
	# Other Notes
	
		
	<div class="control-group ps_config_ctrls ordering" data-mode="assets" o-data='show.module_position' style="">

	</div>
	<div class="control-group ps_config_ctrls ordering" data-mode="module" o-data='show.module_position' style="">

	</div>


	## my version using template literals
	[template literals docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

	this runs in ordering.js (template directive/component file)

	v1.0
    templateUrl:function(elem, attr){
	  //the elem comes as an array with (in this case) a single property/index
      //let mode = elem[0].dataset.mode;//this works
	  let mode = attr.mode;//works
	  
      //let urlStr = `${BASEURL}components/com_psmod/xfiles/js/${(mode == "module") ? "order_module" : "order_asset"}.html`;//this works
	  
	  let urlStr = `${BASEURL}components/com_psmod/xfiles/js/order_${mode}.html`;//streamlined
	  
      console.log(`new url string = ${urlStr}`);
	  
      return urlStr;
    },
	
	** it was actually revised to look like this (but i don't know why this note is here.) **
	
```
	
	templateUrl:function(elem, attr){
      let mode = attr.mode;
      let urlStr = `${BASEURL}components/com_psmod/xfiles/js/order_${mode}.html`;

      //console.log(`new url string = ${urlStr}`);

      return urlStr;
    },
	
```

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
	
	### ADDING VALUES AND SETTINGS TO DYNAMIC DIRECTIVE
	
	GOTCHAs
	bindToController = true prevents the proper use of directive scope variables 
	```
	scope:{
		var1:'=',
		var2:'@'
	}
	```
	
	but template attributes are then accessible in the templateUrl
	alias.var1 & alias.var2
	
	if bindToController = true only the view var is available as alias.view
	if bindToController is removed a-data & view-me are available
	```
	<div display-menus class="menus_cont w3-row "  a-data="'how'" view="list" view-me="what"></div>
	```
	
	template url experiment
	```
	<div >im in {{display.view}} viewme = {{viewMe}} adata = {{appData}}</div>
	```
	
	
	/*********************************************************/
	# Client Side
	## mod_psmod client side process tmpl/default.php

	//not an injector - a bootstrapped app
	i think angularjs only lets you run one application per page but you can bootstrap as many as you want to run on a page.
```
	
	<div class="mod_psmod<?php echo $module->id ?> mod_psmod" data-module="<?php echo $module->id ?>"
	ng-controller="showTimeController as showTime" root="mod_psmod<?php echo $module->id ?>"
	data-home="<?php echo $home_url; ?>">
		<div id="tool_showcase<?php echo $module->id ?>" class="tool_showcase<?php echo $module->id ?>"></div>
	<!--showTime: {{showTime.app}}</br>
	showData module id: {{showTime.service.module_id}}-->
	</div>

	<script>
	...

	  if(!mod_id_class){var mod_id_class}
		mod_id_class = ".mod_psmod<?php echo $module->id ?>";
		angular.bootstrap(document.querySelector(mod_id_class), ['pictureShow']);

	</script>