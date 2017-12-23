
##the system begins in the mod_psmod.php file (same code in the view.html.php)

##parse the tool_templates directory to:

```
//Load all the tool_templates js files
//parse each tool_templates directory to add dirname to an array to be added
//to the angularjs app


//process location tool_templates directory
	$dir = ($release_version == "production") ? "modules/mod_" . $module_name . "/xfiles/tool_templates/" :
	"core/tool_templates/";//relative path works

	$template_name_array = [];
	foreach (glob($dir ."*") as $filename) {
	  $my_filename = str_replace("../","",$filename);//this gets rid of '../' or '../core'
		if(is_dir($filename))
		{
		  //array_push($template_name_array,$url_prefix . $my_filename);
					//take the directory url and split it along its "/"
		  $file_ary = explode("/",$filename);
					//the directory wont have an .ext so take the last section of the array you 
					//created above add it to an array of directory names.
		  $file_index = count($file_ary) - 1;
		  $targ_filename = $file_ary[$file_index];
		  array_push($template_name_array,$targ_filename);
		}
	}//foreach

		//add all the tool templates in the templates folder to document head script tags
		//use the template_name_array you created above to locate each tools directory
	foreach ($template_name_array as $template_name) {
	  foreach (glob($dir . $template_name . "/" . "*.js") as $filename) {
		  //echo nl2br ("$filename size " . filesize($filename) . " \n");
		  $modScriptLoc = $filename;//good it only loads once even with multiple instances of the module
		  $modLink->addScript($modScriptLoc);
	  }//foreach
	}//end $template_name
	
	//in the component's edit file at the top do this
	
	//determine the url's path
	
	$release_version = "development";//"production"
	//prep url for template home
	$core = "../core/";//needed for admin
	$xfiles = "components/com_psmod/xfiles/";
	$url_prefix= ($release_version == "production") ? JUri::base() : JUri::root();
	$home_url = ($release_version == "production") ? JUri::base() . $xfiles : JUri::root() . $core;
	$rel_url = ($release_version == "production") ? $xfiles : $core;

	$dir = $rel_url . "tool_templates/";//relative path works

	//prefixes may not work with php glob($dir) but they do work in a string in js
	$template_ary = [];
	foreach (glob($dir ."*") as $filename) {
	  $my_filename = str_replace("../","",$filename);//this gets rid of '../' or '../core'
		if(is_dir($filename))
		{
		  array_push($template_ary,$url_prefix . $my_filename);
		}
	}//foreach

//creates an array of template directories and useful to extract template filenames
$tool_templates = implode(",",$template_ary);//stringify the array

//add the new string of tool_template directory names to the data-templates 
//attribute in the angular application's rootElement 

<div class="bigBox"  ng-controller="ShowController as show" data-home="<?php echo $core; ?>" data-templates="<?php echo $tool_templates; ?>">


//when it is bootstrapped it will be available to the service (ShowData)
    this.tool_templates = $rootElement[0].dataset.templates;

//bootstrapping reads all the tool_template json files 

tool.js

      this.getToolData = function()
      {
        ShowData.getToolData();
      }//end getToolData
	  
ShowData

//this runs a json version of the request directly to the tool_templates 
//json file

  this.getToolData = async function()
    {
      //make an array of tool tool_template folders
      let tool_temp_array = serve.tool_templates.split(",");
	  
      //gets the json list of all tool parameters
      tool_temp_array.forEach(async function(entry){
	  
            let tool_name = serve.prep_tool_name(entry);
            let tool_url = entry + "/" + tool_name + ".json";
            await serve.request({task:"getTools",data:JSON.stringify({data:"none"})},
            tool_url)
            .then(function(results){
                console.log("req results = ",results);
                //return a json object array
                //let final_results = (Array.isArray(results)) ? results[0] : results;
                let is_here = "false";
                serve.toolData.forEach(function(entry)
                {
                  let tool_file = entry.file_name;
                  let res_file = results.file_name;

                  is_here = (tool_file == res_file) ? "true" : "false";
                });
                if(is_here == "false")
                {
                  serve.toolData.push(results);
                }//end is_here

            });


//then either runs the 
//first tool_template string/array name as a default tool or it uses the 
//toolname saved in the db as the initial tool.

//the saved file will be a customized version of the tool_templates json file

//either json is then fed to the ShowData activate_template fn as its first parameters

(ShowData.activate_template)
this.activate_template = async function(tool,home,mode)
    {
      if(typeof tool != "object" || Object.keys(tool).length === 0)return;

      let template_str = home || "showcase";
      let template_home = "." + template_str;
      let template_mode = mode || "tool_default";//alt = settings
      let tempNbr = (template_mode != "settings") ? 0 : 1;
      let custom_class = (template_mode != "settings") ? " " + tool.details.class_pfx + " " + tool.details.class_style + " " : "";
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

      let injection_data = '<div class="' + stage + " " + stage_id + " " + tool_class + custom_class + ' pure-h" data-cast="' + custom_class
      + '" data-motiv="' + template_mode + '" ' + ' data-marquee="' + tool.file_name + '" data-mode="admin" '
      + 'data-home="' + serve.home_url + '" data-stage="' + stage_id + '" ></div>';
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
	
	//this injects/invokes (sort of bootstraps) the module within the parent app
	
	it calls the tool's directive and passes it the target url within its own
	scope attributes connected to its own rootElement (not the same as the original - in fact not called by rootElement at all. they are accessed as attributes and better still as variables auto available to the tool's controller)
	
	I should be able to plug in views to the  siteside template using these formats and the _manual_slideshow.scss mixin file
	
	//Display data
	    <div class="mSS_stgs_current_info mSS_stgs_content_box">
          <label title="size of your current viewport (above the fold)">current screen size:</label>
          <div>width:   {{take1.screen_width}}</div>
          <div>height:   {{take1.screen_height}}</div>
        </div><!--ends current info-->
		
	//Two inputs
		<div class="mSS_stgs_custom_info mSS_stgs_content_box">
          <label title="customize the size your slideshow should be compared to the viewport">custom size:</label>
          <div class="mSS_stgs_size_wrapr">
            <div class="mSS_stgs_size_wrapr">width:</div>
            <input class="mSS_stgs_custom_input" type="text"  ng-blur="take1.process_size()"
            ng-model="take1.service.tool.details.width">
          </div>
          <div class="mSS_stgs_size_wrapr">
            <div >height:</div>
            <input class="mSS_stgs_custom_input" type="text" ng-blur="take1.process_size()"
            ng-model="take1.service.tool.details.height" >
          </div>
        </div><!--ends custom info-->
		
	//Button group
		<div class="mSS_stgs_mobility_info mSS_stgs_content_box">
          <label title="should the slideshow be responsive">mobile friendly:</label>
          <button type="button" class="mSS_stgs_resp first w3-btn" ng-click="take1.is_responsive('yes')"
          ng-class="{active:take1.responsive == 1}">yes</button>
          <button type="button" class="mSS_stgs_resp w3-btn" ng-click="take1.is_responsive('no')"
          ng-class="{active:take1.responsive == 0}"  title="if set to 'no' the slideshow will only be visible on desktops" >no</button>
        </div><!--ends mobility info-->
		
	//color input
		<div class="mSS_stgs_bg_info mSS_stgs_content_box">
          <label title="">background color:</label>
          <input type="color" class="mSS_stgs_bg_color" ng-model="take1.service.tool.details.background"/>
        </div><!--ends bg info-->
		
	//text input
		<div class="mSS_stgs_class_info mSS_stgs_content_box">
          <label title="css style unique identifier">custom class:</label>
          <input type="text" class="mSS_stgs_custom_class" ng-model="take1.service.tool.details.class_pfx"/>
        </div><!--ends bg info-->
		
	//number input
	<div class="mSS_stgs_bg_info mSS_stgs_content_box">
	
		<div class="d3_range_container">
		  <label title="">transparency:</label>
		  <div class="word_box">
			<input type="number" class="mSS_stgs_bg_opacity_nbr mSS_stgs_bg_option" ng-model="take1.tool.details.btn_opacity"
			min="0" max="100" ng-change="take1.prep_color('opacity')"/>
		  </div>
		</div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
		
	//range slider
		<div class="range_box">
		  <input type="range" class="mSS_stgs_bg_opacity_rng mSS_stgs_bg_option" ng-model="take1.tool.details.btn_opacity"
		  min="0" max="100" ng-change="take1.prep_color('opacity')"/>
		</div>
		
	</div>
	


	