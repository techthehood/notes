# Picture Show
##component Docs
**client side process**

documentation for converting a ps example template into a component template
(i trace the process)

**_see mN_Joomla_angular_module_system.md for more details on the inner workings of the backend tool template system._**

individual asset data is store in the my_stars array
take1.my_stars example:

```
[
	{
		created:"1511323702000",
		id:"38",
		img_data:"",
		init_date:"2017-11-21 23:11:57",
		modified:"1511323917000",
		params:
		"{
			"title":"the grinch",
			"page_ids":["0"],
			"img":"","img_obj":{"url":"https%3A//www.uphe.com/sites/default/files/2015/04/Dr-Seuss-How-The-Grinch-Stole-Christmas-Gallery-1.jpg",
			"data_type":"canvas_data",
			"canvas_data":"https%3A//www.uphe.com/sites/default/files/2015/04/Dr-Seuss-How-The-Grinch-Stole-Christmas-Gallery-1.jpg,-24,88,800,445,-50,-0.3125,900,500.625,800,300,rgba(255,banner",
			"canvas_json":
				"{\"img_url\":\"https%3A//www.uphe.com/sites/default/files/2015/04/Dr-Seuss-How-The-Grinch-Stole-Christmas-Gallery-1.jpg\",
				\"src_x\":-24,
				\"src_y\":\"88\",
				\"img_w\":\"800\",
				\"img_h\":\"445\",
				\"can_x\":\"-50\",
				\"can_y\":\"-0.3125\",
				\"can_w\":\"900\",
				\"can_h\":\"500.625\",
				\"canvas_width\":\"800\",
				\"canvas_height\":\"300\",
				\"bg_color\":\"rgba(255\",
				\"type\":\"banner\"}
				"},
			"url":"https://www.uphe.com/sites/default/files/2015/04/Dr-Seuss-How-The-Grinch-Stole-Christmas-Gallery-1.jpg",
			"tags":"",
			"canvas":{"width":"800","height":"300"},
			"text":
			{
				"head":
				{
					"text":"",
					"html":"",
					"tHtml":"",
					"font":"",
					"size":"",
					"color":"",
					"date":
					{"toggle_value":0,
						"details":"",
						"created":
						{
							"timestamp":0,"date":""
						},
						"modified":
						{
							"timestamp":0,"date":"9/30/2017, 5:02:31 PM"
						}
					},"toggle_value":3
				},
				"body":
				{
					"html":"",
					"raw":"",
					"trust":""
				},
				"link":
				{
					"alias":"Read more"
					,"url":""
				}
			}
		}"
		title:"",
		txt_data:"",
		user_id:"488"
	},
	...
	
]
```


//process starts with the regular loading of a Joomla! module
mod_psmod > tmpl > default.php

//initiate the showTimeController
```
<div class="mod_psmod<?php echo $module->id ?> mod_psmod" data-module="<?php echo $module->id ?>"
  ng-controller="showTimeController as showTime" root="mod_psmod<?php echo $module->id ?>"
  data-home="<?php echo $home_url; ?>">
  <div id="tool_showcase<?php echo $module->id ?>" class="tool_showcase<?php echo $module->id ?>"></div>
  <!--showTime: {{showTime.app}}</br>
  showData module id: {{showTime.service.module_id}}-->
</div>
```
bootstrap it with a script

```
  if(!mod_id_class){var mod_id_class}
    mod_id_class = ".mod_psmod<?php echo $module->id ?>";
    angular.bootstrap(document.querySelector(mod_id_class), ['pictureShow']);

```

we are still using showData for the shared data object from psmod_service.js
```
    var boss = this;
    this.service = ShowData;
    this.app = "showtime app running";
```

on init runs the following:

```
    this.$onInit = async function() {

      await boss.getData()
      await boss.getAssets()
	  .then(function(){
```

//getData is running a request to the service to the com_psmod component config.php task = "places" (not the admin version the site version)

```
    $query->select($db->quoteName(array("tool_data","data_ids")));
    $query->from($db->quoteName("#__psmod"));
```

places renders this json as the tool_data associated with the given module_id
```
//this json describes the display details of the component
	{
		"id":"sS-1",
		"title":"manual slideshow",
		"alias":"manual-slideshow",
		"file_name":"manual_slideshow",
		"type":"slideshow",
		"img":"xfiles/images/loosie.jpg",
		"thumbnail":"xfiles/images/loosie.jpg",
		"params":{"data":"none"},
		"details":{"data":"none",
		"width":"800",
		"height":"300",
		"ratio":"2.6666666666666665:1",
		"responsive":"1",
		"background":"#b12e7c",
		"auto_width":false,
		"width_pct":95,
		"class_pfx":"",
		"class_style":"  d3S_w95 d3S_h36 ",
		"custom_class":"d3S_w95 d3S_h36",
		"sample_class":"d3S_w76 d3S_h29",
		"class_alt":"  d3S_w76 d3S_h29 ",
		"btn_class":" d3S_ph100 ",
		"btn_hover":"",
		"btn_bg":"#0b3986",
		"btn_hov":"#65bb31",
		"btn_opacity":40,
		"btn_base16":"66",
		"icon_bg":"#ffffff",
		"icon_hov":"#000000",
		"btn_hex":"#0b398666",
		"btn_style":"background-color:#0b398666 !important;",
		"hover_bg":"#CCCCCC",
		"hover_opacity":100,
		"hover_hex":"#CCCCCC",
		"btn_height":100},
		"sS-1":0
	}
```

the results are added to showData in a .then()

```
	ShowData.app = results;
	ShowData.tool_data = JSON.parse(results[0].tool_data);
	ShowData.data_ids = results[0].data_ids.split(",");
	console.log("tool_data = ",ShowData.tool_data);
```

getAssets ultimately runs this request to get the data of the given ids (array)

```
  public function getAssets($asID)
  {

          $info_table = '#__psmod_assets' ;

          $db = jFactory::getDbo();
          $query = $db->getQuery(true);

            //this is my fix for query IN condition array string
            //db quote to escape - sanitize
            $move_ids = $db->quote($asID);

            //explode with more sanitation
            $move_ids = explode(',',htmlentities($move_ids));
            //implode below to add inner quotes

            $query->select('*');
            $query->from($db->quoteName($info_table));
            $query->where($db->quoteName('id') . ' IN (' . implode("','",$move_ids) . ')');
            //bugfix for stopping IN keyword reordering
            $query->order("FIND_IN_SET(" . $db->quoteName('id') . "," . $db->quote(htmlentities($asID)) . ")");
            $db->setQuery($query);

            //return $query->dump();

            /* //working sample
              SELECT * FROM `uavz2_psmod_assets`
              WHERE `id` IN ('38','36','1','6','3','5','29')
              ORDER BY FIND_IN_SET(`id`,'38,36,1,6,3,5,29')
            */

            $dbData = $db->loadObjectList();

          for($v = 0; $v < count($dbData); $v++){
            $dbData[$v]->params = html_entity_decode($dbData[$v]->params);
          }

          return json_encode($dbData);
  }//getAssets
			
```

getAssets then adds the data to showData
```
	ShowData.asset_info = results;
```

once the assests are returned bootstrap the tool_showcase
the tool showcase element is initially nested inside the inital bootstrapped angular app with this line

```
	<div id="tool_showcase<?php echo $module->id ?>" class="tool_showcase<?php echo $module->id ?>"></div>
```
adding the module id we saved in the showTimeController's service.module_id
```
	if(typeof boss.service.asset_info == "object" && boss.service.asset_info.length  != 0){
	  let home_str = "tool_showcase" + boss.service.module_id;
	  boss.service.activate_template(boss.service.tool_data,home_str);
	}//end if
```

###showData activate_template script
```
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

      boss.current_tool = tool;
      boss.tool = tool;//i want to set the tool here so i don't have to use crew

      let tool_class = " " + tool.alias + " " + template_mode + " ";//important! triggers directive (tool.alias)
      let stage = " " + tool.file_name + "_" + template_mode;
      let stage_id = " " + tool.file_name + "_" +  boss.module_id + " ";//why tool.id not modul_id?

      let injection_data = '<div class="' + stage + " " + stage_id + " " + tool_class + custom_class + ' pure-h" data-cast="' + custom_class
      + '" data-motiv="' + template_mode + '" ' + ' data-marquee="' + tool.file_name + '" data-mode="site" '
      + 'data-home="' + boss.home_url + '" data-stage="' + stage_id + '" ></div>';
      //marquee is used in templateUrl to set dynamic template.html along with data-home
      //data-motiv is used in template.html ng-if statements

      t_home.innerHTML = injection_data;
      angular.element(t_home).injector().invoke(["$compile",function($compile)
      {
        let dir_str = "." + tool.alias;
         dir_str = stage_id;
         dir_str = "." + boss.removeSomething(dir_str,' ');
        let dir_obj = document.querySelectorAll(dir_str);//bugfix for multiple slideshows
        let scope = angular.element(t_home).scope();
        //im using tempNbt because this is loaded twice. once for the display the other for settings
        $compile(dir_obj[tempNbr])(scope);
      }]);

    }//activate_template
```

this dynamically creates the module i want to bootstrap using the db data and the available component templates
```
	let injection_data = '<div class="' + stage + " " + stage_id + " " + tool_class + custom_class + ' pure-h" data-cast="' + custom_class
	+ '" data-motiv="' + template_mode + '" ' + ' data-marquee="' + tool.file_name + '" data-mode="site" '
	+ 'data-home="' + boss.home_url + '" data-stage="' + stage_id + '" ></div>';
```

then i inject the dynamically created element and invoke(like bootstrap) the angular module/component i want created
```
	t_home.innerHTML = injection_data;

      angular.element(t_home).injector().invoke(["$compile",function($compile)
      {
        let dir_str = "." + tool.alias;
         dir_str = stage_id;
         dir_str = "." + boss.removeSomething(dir_str,' ');
        let dir_obj = document.querySelectorAll(dir_str);//bugfix for multiple slideshows
        let scope = angular.element(t_home).scope();
        //im using tempNbt because this is loaded twice. once for the display the other for settings
        $compile(dir_obj[tempNbr])(scope);
      }]);
```

## Running the tool template directive (siteside)

//the development version runs the copy found in core/tool_templates/
it runs a dynamic templateUrl to get the html location
```
	templateUrl:function(elem, attr){
	  let file_name = attr.marquee;
	  //let urlStr = `${BASEURL}components/com_psmod/xfiles/js/${file_name}.html`;
	  let urlStr = `${attr.home}tool_templates/${file_name}/${file_name}.html`;

	  console.log(`new url string = ${urlStr}`);

	  return urlStr;
	},
```

