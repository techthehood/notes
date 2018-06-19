# select directive

html template - also has an add btn (optional) to add to the select menu
```

<div class="bM_stgs_class_info column bM_stgs_content_box">

	<label title="css style unique identifier">view control:</label>

	<div class="select-menu mM_stgs_view_class" data-value-mode='none' data-value-data='take1.view'
	data-option-data='take1.view_ary_obj' data-callout="take1.setSelect" data-cname="take1.view_select"
	data-params="{targ:take1,prop:'view',callout:take1.prep_view}"></div>

	<button type="button" class="bM_view_new_item_btn  w3-btn" ng-click="take1.add_view = true"
	ng-show="take1.add_view == false && take1.dummy == true">
	  <i class="material-icons" style="font-size:1.5rem;color:#17315a">add_circle</i>
	</button>
	<div class="bM_view_head_cont" ng-show="take1.add_view == true" >
	  <label title="css style unique identifier">view title/description</label>
	  <div class="bM_view_title_input_cont">
		<input class="bM_view_title_input" ng-class="{invalid:take1.valid_title == 'invalid'}" type="text"
		name="" value=""
		placeholder="title/describe your view" ng-blur="" ng-model="take1.temp_view_text">
	  </div>
	  <button type="button" class="w3-btn bM_view_title_btn confirm" ng-click="take1.make_select('confirm','view')" >
		<i class="material-icons" style="font-size:1rem;color:green">done</i><!--subject-->
	  </button>
	  <button type="button" class="w3-btn bM_view_title_btn cancel" ng-click="take1.make_select('cancel','view')" >
		<i class="material-icons" style="font-size:1rem;color:#17315a">close</i><!--subject-->
	  </button>
	</div>

  </div><!--ends menu style-->

```

properly formed obj and options object

```
  this.template_styles = {};
  this.template_styles.options = bM_temps;
  this.template_styles.label = "basic";

      var bM_temps = {
            "basic":"basic",
            "basic_nav":"basic nav",
            "layer":"layer",
            "nav":"nav",
            "nav_nav":"nav nav"
          }
		  
		  //html attribute
		  data-option-data='take1.template_styles'

```

it can also take an object where the options object is an array instead of
an object by setting the valueMode to an array

```
	this.view_keys = {"":""};
	this.view_ary_obj = {label:"default",options:boss.view_keys};

	this.proper_views = [
		"default","mobile","tablet","desktop"
	];

	//directive attribute
	data-value-mode='array'
	
	//
	ng-if="valueMode == 'array'"
	
```

dissecting the select directive
```

	<div class="select-menu mM_stgs_view_class" data-value-mode='none' data-value-data='take1.view'
	data-option-data='take1.view_ary_obj' data-callout="take1.setSelect" data-cname="take1.view_select"
	data-params="{targ:take1,prop:'view',callout:take1.prep_view}"></div>
	
```

.js compiles select options array/object from an objects properties
```

  this.get_select_props = function(mod,targ)
  {
	return new Promise(function(resolve, reject) {
	  
	  let targ_obj = (targ != undefined) ? targ :(mod == "custom") ? boss.service.tool.views[boss.view] :
	  boss.service.tool.views;
	  let my_keys = Object.keys(targ_obj);
	  if(mod == "custom")boss.custom_keys = {};
	  if(mod == "view")boss.view_keys = {};

	  if(my_keys.length > 0){
		my_keys.forEach(function(entry){

		  let sample_array = (mod == "custom") ? boss.proper_properties: boss.proper_views;
		  let is_in_array = ShowData.valueChecker({"array":sample_array,"string":entry,"mod":"index","type":"sna"});

		  if(is_in_array[0] != -1 || entry.match(/custom\d+/g))
		  {
			///custom[0-9]/g - works but only matches 1 digit
			//filter for approved/proper properties or 'custom' pfx
			if(mod == "custom"){
			  boss.custom_keys[entry] = targ_obj[entry].description || entry;
			}else {
			  boss.view_keys[entry] = targ_obj[entry].description || entry;
			}
		  }//if
		});
	  }
	  boss[`${mod}_ary_obj`].options = (mod == "custom") ? boss.custom_keys : boss.view_keys ;
	  resolve();
	  //return boss.custom_ary_obj;
	});//promise
  }//get_select_props
  
  //used like this
  boss.get_select_props("view");
	  
```

this callout is useful for processing callouts with parameters or just plain fn
```
	this.setSelect = function(data,params)
	{

		boss;
		if(data != undefined)
		{
		  //console.log("here comes data",data);
		  //params.targ[params.prop] = parseInt(data,10);//bugfix - used for font_size select menu - deprecated
		  params.targ[params.prop] = data;
		  //console.log("here comes more ",boss.tool.views[boss.view].title);
		  //console.log("here comes more ",params.targ[params.prop]);
		}

		if(params.callout != undefined){
		  params.callout();
		}//if

		return true;

	}//setSelect
```

