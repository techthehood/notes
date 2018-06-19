# admin input/form templates

see also 
mN_create_new_psmod_template - overview of changes to make to tool_templates
bp_angularjs_templateUrl_function.md - notes and breakdown of critical fns
mN_mod_psmod_assets_template - notes to clone assets.js as a template

make a copy of the basic template

figure out an appropriate name (underscore_separated)

copy the new name to folder and its files
ex. new_name (dir) >
		new_name.html
		new_name.js
		new_name.json
		
change the .js directive name to one reflecting new_name
ex.: newName (camel cased for directive where dash should be in directive restriction)

this would translate to an element using new-name

change the .json title alias and filename
    "title":"manual slideshow",
    "alias":"manual-slideshow",
    "file_name":"manual_slideshow",
	"type":"gallery",
	
	ex:     
	"title":"new name",
    "alias":"new-name",
    "file_name":"new_name",
	"type":"gallery",
	
	**make sure the alias is separated with a dash not an underscore**
	
change the img and thumnail to a custom image if one is available
    "img":"xfiles/images/tools.png",
    "thumbnail":"xfiles/images/tools.png",

modify the display html to meet the display requirements

set a global scss folder to write to the target css file file in the templates folder

### Setting up a new koala file association

	click add folder if no files in the folder have been associated with css files yet.
	
	(you can use a specific folder or an outer folder that lets you see more files in the target region)
	
	click on the scss files you made in the scss file folder
	
	right click on the new (currently unassociated) scss files and choose 
	'Set Output Path'
	
	
## Template Form (settings)

all stages sections are in a single container

```
<div class="mSS_stgs_sect_cont">
```
	
### basic section
```
<div class="mSS_stgs_basic mSS_stgs_sect mSS_stgs_sect1" ng-show="take1.section == 'basic'">
```

form elements are linked directly to their corresponding json counterparts
```
take1.tool.details.auto_width

//links with
    "details":{
      "data":"none",
      "width":"default",
      "height":"default",
      "ratio":"2.6666666",
      "responsive":"1",
      "background":"#ffffff",
      "auto_width":true,

```
see the entire sample json file below

### basic form elements

all input sections are wrapped in a div with a custom class descriptive name
```
<div class="mSS_stgs_current_info mSS_stgs_content_box">
```

content/display box
```
	<div class="mSS_stgs_current_info mSS_stgs_content_box">
		<label title="size of your current viewport (above the fold)">current screen size:</label>
		<div>width:   {{take1.screen_width}}</div>
		<div>height:   {{take1.screen_height}}</div>
	</div><!--ends current info-->
```


single simple input box
```
  <div class="mSS_stgs_class_info mSS_stgs_content_box">
	<label title="css style unique identifier">custom class:</label>
	<input type="text" class="mSS_stgs_custom_class" ng-model="take1.service.tool.details.class_pfx"/>
  </div><!--ends bg info-->
```

dual simple input boxes (stacked)
```
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
```



range slider with manual input
```
	<div class="mSS_stgs_bg_info mSS_stgs_content_box">
		<div class="d3_range_container width_pct">
		  <div class="d3_range_stack">
			<label class="width_label" title="">width percent:</label>
			<div class="word_box width_pct">
			<input type="number" class="mSS_stgs_bg_opacity_nbr mSS_stgs_bg_option" ng-model="take1.tool.details.width_pct"
			min="15" max="95" ng-model-options="{ updateOn: 'blur' }" />
			</div>
		  </div>
		  <div class="d3_auto_range">
			<div class="auto_width squaredOne" ng-hide="show.on">
			  <input type="checkbox" value="None" id="auto_width" name="check" checked ng-model="take1.tool.details.auto_width" />
			  <label for="auto_width" ></label>
			</div>
			<label class="auto_label" title="">auto</label>
		  </div>
		</div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
		<!--range slider-->
		<div class="range_box">
		  <input type="range" class="mSS_stgs_bg_opacity_rng mSS_stgs_bg_option" ng-model="take1.tool.details.width_pct"
		  min="15" max="95" />
		</div>
	</div>
```

toggle switch
```
	<div class="bM_stgs_mobility_info mSS_stgs_content_box">
		<div class="bM_switch_cont switch_cont">
			<label class="bM_switch_label stgs_access">active? </label>
			<label class="bM_switch switch">
			  <input class="switch_input stgs_access access" type="checkbox" 
		  ng-model="take1.tool.details.link.active_link">
			  <span class="fs_slider"></span>
			</label>
		</div>
	</div>
```

button group
```
  <div class="mSS_stgs_mobility_info mSS_stgs_content_box">
	<label title="should the slideshow be responsive">mobile friendly:</label>
	<button type="button" class="mSS_stgs_resp first w3-btn" ng-click="take1.is_responsive('yes')"
	ng-class="{active:take1.responsive == 1}">yes</button>
	<button type="button" class="mSS_stgs_resp w3-btn" ng-click="take1.is_responsive('no')"
	ng-class="{active:take1.responsive == 0}"  title="if set to 'no' the slideshow will only be visible on desktops" >no</button>
  </div><!--ends mobility info-->
```

color picker
```
  <div class="mSS_stgs_bg_info mSS_stgs_content_box">
	<label title="">background color:</label>
	<input type="color" class="mSS_stgs_bg_color" ng-model="take1.service.tool.details.background"/>
  </div><!--ends bg info-->
```

advanced color picker (w/advanced_colors)
```

	  <div class="bM_stgs_bg_info bM_stgs_content_box">
		<label title="">background color:</label>
		<input type="color" class="bM_stgs_bg_color" ng-model="take1.service.tool.details.background"/>
		
		<div class="advanced_colors" data-destination="take1.service.tool.details" data-property="background"
		data-collection="take1.getMyColors" data-expandto="bM_stgs_sect_cont" ></div>
	  </div><!--ends bg info-->
		  
```

color picker & opacity scripts
a function is involved in processing colors with opacity customizations
```
	//angular events
	
	ng-model="take1.tool.details.btn_bg"
	ng-change="take1.prep_color('color')" ng-change="take1.prep_color('opacity')"
	
	this.prep_opacity = async function()
    {
        let targ_el = event.target;

        //i need to compile the new color
        await boss.form_btn_color("opacity",targ_el.value);
        boss.form_btn_style();

    }//prep_color

	this.prep_color = async function(mod)
	{
		let targ_el = event.target;
		//i need to compile the new color
		await boss.form_btn_color(mod,targ_el.value);
		boss.form_btn_style();
		//$scope.$digest();
		$timeout(function(){},0,true);

		//return arguments.length ? (_name = newName) : _name;//I like this shortcut
	}//prep_color
	  
	this.form_btn_color = function(mod,dat)
      {
        switch(mod)
        {
            case "opacity":
              let nbr = dat;//0 - 100
              let pct = parseInt(dat,10) / 100;
              let targ_nbr = (Math.floor(255 * pct)).toString(16);

              boss.service.tool.details.btn_base16 = targ_nbr;
              boss.service.tool.details.btn_hex = boss.service.tool.details.btn_bg + "" + targ_nbr;
              //boss.service.tool.details.btn_opacity = parseInt(dat,10);
            break;

            case "color":
              boss.service.tool.details.btn_hex = dat + "" + boss.service.tool.details.btn_base16;
              boss.service.tool.details.btn_bg = dat;
            break;
        }//end switch
    }//form_btn_color
	
	this.form_btn_style = function()
	{
		boss.service.tool.details.btn_style = "background-color:" + boss.service.tool.details.btn_hex + " !important;";
	}//form_btn_style

```

notice the details in the stored json data
```
	"btn_hover":"",
	"btn_bg":"#0b3986",
	"btn_hov":"#65bb31",
	"btn_opacity":40,
	"btn_base16":"66",
	"icon_bg":"#ffffff",
	"icon_hov":"#000000",
	"btn_hex":"#0b398666",
	"btn_style":"background-color:#0b398666 !important;",
```
the opacity has to be converted to base 16 format and added to a btn_style string.


and a form reset btn - restores generic default settings
```
  <button type="button" class="mSS_stgs_reset_btn w3-btn" ng-click="take1.form_reset(take1.service.tool.file_name);" title="restore default settings">reset</button>

```

advanced section container
```
	<div class="mSS_stgs_advanced mSS_stgs_sect mSS_stgs_sect2" ng-show="take1.section == 'advanced'">
```



nav back btn (advanced section) 
note: this btn shows only when you are in a button styling section and not in the main list of style option btns
```
  <button type="button" class="mSS_stgs_option_back w3-btn" ng-click="take1.option_section = 'options'"
  ng-hide="take1.option_section == 'options'" title="">
	<i class="material-icons" style="font-size:1rem;color:blue">arrow_back</i><!--subject-->
  </button>
```

dynamic label headings for options and style sections
```
  <label class="adv_option_label heading" ng-show="take1.option_section == 'options'">advanced options:</label>
  <label class="adv_option_label heading" ng-show="take1.option_section == 'buttons'">button style:</label>
```

this is the entire button section
```
	  <div class="option_btns option_section option_section1" ng-show="take1.option_section == 'options'">
		<div class="adv_option_btn w3-button btn_design" ng-click="take1.option_section = 'buttons'">
		  <p>button style</p>
		  <div class="list_icon"><i class="material-icons" style="font-size:1.5rem;color:grey">chevron_right</i></div>
		</div>
		<!-- new section button sample copy below-->
		<div class="adv_option_btn w3-button btn_design" ng-click="take1.option_section = 'sample'">
		  <p>sample style</p>
		  <div class="list_icon"><i class="material-icons" style="font-size:1.5rem;color:grey">chevron_right</i></div>
		</div>
		<!-- new section button sample copy above-->
	  </div>
```

sample of a single btn opens an option section
```
	<!-- new section button sample copy below-->
		<div class="adv_option_btn w3-button btn_design" ng-click="take1.option_section = 'sample'">
		  <p>sample style</p>
		  <div class="list_icon"><i class="material-icons" style="font-size:1.5rem;color:grey">chevron_right</i></div>
		</div>
	<!-- new section button sample copy above-->
```
to use the btn create a section and label its show variable the same as the single btns ng-click variable

simple sample of an option section - section for nesting various form elements 
```
	<!-- new section sample copy below -->
		<div class="option_section option_section1" ng-show="take1.option_section == 'sample'">
			sample section
		</div>
	<!-- new section sample copy above -->
```

sample bg color, opacity and hover form elements
notice the opacity has both a range slider and input box
```
	<div class="mSS_stgs_bg_info mSS_stgs_content_box">
	  <label title="">bkgd color:</label>
	  <input type="color" class="mSS_stgs_bg_color mSS_stgs_bg_option" ng-model="take1.tool.details.btn_bg"
	  ng-change="take1.prep_color('color')" />
	</div><!--ends bg info-->
	<div class="mSS_stgs_bg_info mSS_stgs_content_box">
	  <div class="d3_range_container">
		<label title="">bkgd opacity:</label>
		<div class="word_box">
		  <input type="number" class="mSS_stgs_bg_opacity_nbr mSS_stgs_bg_option" ng-model="take1.tool.details.btn_opacity"
		  min="0" max="100" ng-change="take1.prep_color('opacity')"/>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	  <div class="range_box">
		<input type="range" class="mSS_stgs_bg_opacity_rng mSS_stgs_bg_option" ng-model="take1.tool.details.btn_opacity"
		min="0" max="100" ng-change="take1.prep_color('opacity')"/>
	  </div>
	</div><!--ends bg info-->
	<div class="mSS_stgs_bg_info mSS_stgs_content_box">
	  <label title="">bkgd hover color:</label>
	  <input type="color" class="mSS_stgs_bg_color mSS_stgs_bg_option" ng-model="take1.tool.details.btn_hov" />
	</div><!--ends bg info-->
```

single select menu (dependencies on select.js/selectMenu.html data.js)
```
	<div class="mSS_stgs_class_info mSS_stgs_content_box">
	  <label title="css style unique identifier">title font:</label>
	  <div class="select-menu mSS_stgs_custom_class" data-value-mode='none' data-value-data='take1.tool.details.title.font'
	  data-option-data='take1.service.custom_head.font' data-callout="take1.setSelect" data-params="{targ:take1.tool.details.title,prop:'font'}"></div>
	</div><!--ends bg info-->
```

select menu uses this function
```
   this.setSelect = function(data,params)
    {

      boss;
      if(data != undefined)
      {
        console.log("here comes data",data);
        params.targ[params.prop] = data;
        console.log("here comes more ",boss.tool.details.title);
      }

      return true;

    }//setSelect

```

select menu depends on objects with option,value,label properties

```
    this.custom_head = {font:{},size:{}};
    this.custom_head.font.options = myFonts;
    this.custom_head.font.value = serve.data.text.head.font;
    this.custom_head.font.label = "font";
    this.custom_head.size.options = mySize;
    this.custom_head.size.value = serve.data.text.head.size;
    this.custom_head.size.label = "size";
	
	*custom_head.font.value is not supported outside of 'default' valueMode

```

simple loader

```
	<div ng-show="picasso.loader == 1" class="curtain col_win_edit_curtain" ng-dblclick="picasso.loader = 0">
	<div class="loader"></div>
	</div>
```

modified loader
```
	<div class="bookmark_hidden" >
	  <div class="curtain bookmark_curtain"
	  ng-init="libro.service.hold_up(libro.loader_el,'hide');"
	  ng-dblclick="libro.service.hold_up(libro.loader_el,'hide');">
		<div class="loader"></div>
	  </div>
	</div>

```

mod loader js
```
    this.hold_up = function(tEl,mod)
    {
      //global scope function

      var modify = mod || "show";
      let action = (modify == "show") ? "flex" : "none";
      let targ_el = document.querySelector(`.${tEl}`);
      targ_el.style.display = action;

    }//end hold_up

```
mod loader css
```
    .bookmark_hidden{
      width:100%; position:relative;
      .bookmark_curtain{
        display: flex; justify-content: center; align-items: center;
        width:100%; height:22rem;
        .loader{border-width: $rem * .5; width:75px; height:75px;}
      }
    }

```

loader css
```
	.col_win_edit_curtain{
	  display: flex; justify-content: center; align-items: center;
	  width:90%; height:90%;
	.loader{border-width: 10px; width:75px; height:75px;}
	}
	.curtain {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		z-index: 1600;
		background-color: rgba(255, 255, 255, 0.83);
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
```

margin sliders and check boxes
```

	<div class="bM_stgs_bg_info bM_stgs_content_box">
	  <div class="d3_range_container width_pct">
		<div class="d3_range_stack">

		  <div class="bM_stgs_label_cont">
			<label class="width_label" title="">main margin %:</label>

			<!--width mobile margin/padding chk box -->
			<div class="d3_auto_range">
			  <div class="mobile_margin_main squaredOne" ng-hide="show.on">
				<input type="checkbox" value="None" id="mobile_margin_main" name="check" checked
				ng-model="take1.tool.details.main.mobile_margin" ng-change="take1.make_margin('main')" />
				<label for="mobile_margin_main" ></label>
			  </div>
			  <label class="auto_label" title="" ng-show="take1.tool.details.main.mobile_margin == true" >on</label>
			  <label class="auto_label" title="" ng-show="take1.tool.details.main.mobile_margin != true" >off</label>
			</div>

		  </div><!-- bM_stgs_label_cont -->

		  <div class="word_box width_pct">
		  <input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" data-dest="main" ng-model="take1.tool.details.main.margin_value"
		  min="0.0" max="3.0" step=".1" ng-model-options="{ updateOn: 'blur' }" ng-blur="take1.make_margin('main')" value="{{take1.tool.details.main.margin_value}}"/>
		  </div>
		</div>
	  </div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
	  <div class="d3_range_container width_pct">
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.details.main.margin_top}}</div>
		  <div class="main_margin_top squaredOne" ng-hide="show.on">
			<input id="main_margin_top" type="checkbox" value="None" class="main_margin_box main_margin"
			name="check" data-param="margin_top" checked />
			<label for="main_margin_top" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">expand_less</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.details.main.margin_right}}</div>
		  <div class="main_margin_rt squaredOne" ng-hide="show.on">
			<input id="main_margin_rt" type="checkbox" class="main_margin_box main_margin" value="None"
			name="check" data-param="margin_right" checked />
			<label for="main_margin_rt" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">chevron_right</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.details.main.margin_bottom}}</div>
		  <div class="main_margin_bot squaredOne" ng-hide="show.on">
			<input id="main_margin_bot" type="checkbox" value="None" class="main_margin_box main_margin"
			name="check" data-param="margin_bottom" checked />
			<label for="main_margin_bot" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">expand_more</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div>{{take1.tool.details.main.margin_left}}</div>
		  <div class="main_margin_lft squaredOne" ng-hide="show.on">
			<input id="main_margin_lft" type="checkbox" value="None" class="main_margin_box main_margin"
			name="check" data-param="margin_left" checked />
			<label for="main_margin_lft" ></label>
		  </div>
		  <label class="auto_label" title="">
			<i class="material-icons" style="font-size:1rem;color:blue">chevron_left</i>
		  </label>
		</div>
		<div class="d3_auto_range_cube d3_auto_range">
		  <div class="main_margin_all squaredOne" ng-hide="show.on">
			<input type="checkbox" value="None" id="main_margin_all" class="main_margin_all_box main_margin" ng-model="take1.tool.details.main.auto_same_margins"
			name="check"  checked ng-click="take1.make_margin('all','main_margin_all_box','main')"/>
			<label for="main_margin_all" ></label>
		  </div>
		  <label class="auto_label" title="">all</label>
		</div>
	  </div>
	<!--range slider-->
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="main" ng-model="take1.tool.details.main.margin_value"
		min="0.0" max="3.0" step=".1" ng-change="take1.make_margin('main')" value="{{take1.tool.details.main.margin_value}}"/>
	  </div>
	</div><!-- end range container -->

```

font size slider

```

<div class="bM_stgs_class_info bM_stgs_content_box bM_font_size">
  <label title="css style unique identifier">title font size:</label>
  <div class="word_box width_pct">
  <input type="number" class="mSS_stgs_bg_opacity_nbr mSS_stgs_bg_option" ng-model="take1.tool.details.title.font_size"
  min="8" max="72" step="1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.details.title.font_measure != 'rem'" />
  <input type="number" class="mSS_stgs_bg_opacity_nbr mSS_stgs_bg_option" ng-model="take1.tool.details.title.font_size"
  min="0.2" max="5" step=".1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.details.title.font_measure == 'rem'" />
  </div>
  <div class="font_measure_btns bM_stgs_button_info">
	<button type="button" class="bM_stgs_resp w3-btn first" ng-click="take1.tool.details.title.font_measure = 'px'; take1.tool.details.title.font_size == 14"
	ng-class="{active:take1.tool.details.title.font_measure == 'px'}"  title="" >px</button>
	<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.details.title.font_measure = 'rem'; take1.font_item_style('title')"
	ng-class="{active:take1.tool.details.title.font_measure == 'rem'}">rem</button>
	<button type="button" class="bM_stgs_resp w3-btn last" ng-click="take1.tool.details.title.font_measure = 'pt'; take1.tool.details.title.font_size == 14"
	ng-class="{active:take1.tool.details.title.font_measure == 'pt'}"  title="" >pt</button>
  </div>

  <div class="range_box">
  <input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="title" ng-model="take1.tool.details.title.font_size"
  min="8" max="72" step="1"  value="{{take1.tool.details.title.font_size}}" ng-if="take1.tool.details.title.font_measure != 'rem'" />
  <input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="title" ng-model="take1.tool.details.title.font_size"
  min="0.2" max="5" step=".1"  value="{{take1.tool.details.title.font_size}}" ng-if="take1.tool.details.title.font_measure == 'rem'" />
  </div>
</div><!--ends bg info-->

```

```

	//js for font_size slider
    this.setSelect = function(data,params)
    {

      boss;
      if(data != undefined)
      {
        console.log("here comes data",data);
        params.targ[params.prop] = parseInt(data,10);
        console.log("here comes more ",boss.tool.details.title);
      }

      return true;

    }//setSelect

    this.getTextStyle = function(data)
    {

      let prep_font = (data.font != undefined && data.font != "") ? data.font : "Arial, Helvetica, sans-serif";
      let single_font = (prep_font.split(",").length < 2) ? true : false;
      prep_font = (single_font == true) ? `font-family:${prep_font},Arial, sans-serif;` :`font-family:${prep_font};`;

      let font = prep_font;
      let font_size = (data.font_size != undefined && data.font_size != "") ? `font-size:${data.font_size}${data.font_measure};` : "";
      let font_color = (data.font_color != undefined && data.font_color != "") ? `color:${data.font_color};` : "";


      let txt_style = font + font_size + font_color;

      return txt_style;

    }//getTextStyle

```

line height input and slider

```

	<div class="bM_stgs_class_info bM_stgs_content_box bM_line_height">
	  <label title="css style unique identifier">body line height:</label>
	  <div class="word_box width_pct">
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.details.body.line_height"
		min="0" max="25" step=".5" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.details.body.font_measure != 'rem'" />
		<input type="number" class="bM_stgs_bg_opacity_nbr bM_stgs_bg_option" ng-model="take1.tool.details.body.line_height"
		min="0" max="2.5" step=".1" ng-model-options="{ updateOn: 'blur' }" ng-if="take1.tool.details.body.font_measure == 'rem'" />
		<label class=""> {{take1.tool.details.body.font_measure}}</label>
	  </div>
	  <div class="range_box">
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="body" ng-model="take1.tool.details.body.line_height"
		min="0" max="25" step=".5"  value="{{take1.tool.details.body.line_height}}" ng-if="take1.tool.details.body.font_measure != 'rem'" />
		<input type="range" class="bM_stgs_bg_opacity_rng bM_stgs_bg_option" data-dest="body" ng-model="take1.tool.details.body.line_height"
		min="0" max="2.5" step=".1"  value="{{take1.tool.details.body.line_height}}" ng-if="take1.tool.details.body.font_measure == 'rem'" />
	  </div>
	</div><!--ends bM_line_height-->
			
```

info_space - simple (info dot/info space)
single message

```
	
	<div class="fyinfo" ng-class="{'w3-pale-yellow open':take1.info_space.limit_devices == 1}">
		<p class="bM_content_control_info"
		ng-show="take1.info_space.limit_devices == 1">
			feature disabled during <strong>admin</strong> display. testing is only visible on the <strong>site-side</strong> / <strong>client-side</strong>.
		</p>

		<button class="info_btn w3-btn" ng-show="take1.info_space.limit_devices != 1"
		ng-click="take1.info_space.limit_devices = 1">
		<i class="material-icons" style="font-size:1.2rem;color:#17315a">info</i>
		</button>
		<button class="info_btn w3-btn" ng-show="take1.info_space.limit_devices == 1"
		ng-click="take1.info_space.limit_devices = 0">
		<i class="material-icons" style="font-size:1.2rem;color:#17315a">close</i>
		</button>
	</div><!--ends fyinfo-->

```
note: the first info.limit_devices deals with a color change of the entire area including the close box. the rest are for visibility

info_space - dynamic (info dot/info space)
**conditional**

```

  <div class="fyinfo" ng-class="{'w3-pale-yellow open':take1.info_space.height_style == 1}">
	  <p class="bM_content_control_info" ng-if="take1.tool.details.height_style != 'strict'"
	  ng-show="take1.info_space.height_style == 1">
		The <strong>flex</strong> setting automates the height & works best with <strong>'content control'</strong> settings turned <strong>on</strong>.
	  </p>
	  <p class="bM_content_control_info" ng-if="take1.tool.details.height_style == 'strict'"
	  ng-show="take1.info_space.height_style == 1">
	  The <strong>strict</strong> setting requires a manually set height & works best with <strong>'content control'</strong> settings turned <strong>off</strong>.
	  </p>
	  <button class="info_btn w3-btn" ng-show="take1.info_space.height_style != 1"
	  ng-click="take1.info_space.height_style = 1">
		<i class="material-icons" style="font-size:1.2rem;color:#17315a">info_space</i>
	  </button>
	  <button class="info_btn w3-btn" ng-show="take1.info_space.height_style == 1"
	  ng-click="take1.info_space.height_style = 0">
		<i class="material-icons" style="font-size:1.2rem;color:#17315a">close</i>
	  </button>
</div><!--ends fyinfo-->

```
note: change the html name take1.info_space.height_style to reflect the name of the content area the info_space is placed in, then update the js object with the same named property


add 'info_space' class to parent container

```
	//sample of info_space addition
	<div class="bM_stgs_mobility_info bM_stgs_content_box info_space">

```

initilization variable found in 'templateName'.js

      this.info_space = {
        height_style:0,
		limit_devices:0
      }

	  whenever you add more info_spaces remember to update this object with another property
	  
info_space fyinfo css
```

	fyinfo{
	  display:flex;
	  flex-flow:row nowrap;
	  width:100%;
	  justify-content: flex-end;
	  margin-top: 10px;
	  button.info_btn{
		display: flex; justify-content: center; align-items: center; flex: 0 1 auto; position:absolute;
		right:5px; top:10px; width:20px; height:20px; padding:0px $mp; border:unset $mp; margin-left: 5px;
	  }
	  p{ font-size: 11px; line-height: 15px; width:80%; text-align: justify;}
	}
	.fyinfo.open{padding: 5px;}

```

add font_measure section
may not need %
```
	<div class="font_measure_btns measure_btns bM_stgs_button_info">
		<button type="button" class="bM_stgs_resp w3-btn first" ng-click="take1.tool.details.body.font_measure = 'px'; take1.font_item_style('body')"
		ng-class="{active:take1.tool.details.body.font_measure == 'px'}"  title="" >px</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.details.body.font_measure = 'rem'; take1.font_item_style('body')"
		ng-class="{active:take1.tool.details.body.font_measure == 'rem'}">rem</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.details.body.font_measure = 'em'; take1.font_item_style('body')"
		ng-class="{active:take1.tool.details.body.font_measure == 'em'}">em</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.details.body.font_measure = '%'; take1.font_item_style('body')"
		ng-class="{active:take1.tool.details.body.font_measure == '%'}">%</button>
		<button type="button" class="bM_stgs_resp w3-btn" ng-click="take1.tool.details.body.font_measure = 'vmax'; take1.font_item_style('body')"
		ng-class="{active:take1.tool.details.body.font_measure == 'vmax'}">vmx</button>
		<button type="button" class="bM_stgs_resp w3-btn last" ng-click="take1.tool.details.body.font_measure = 'vmin'; take1.font_item_style('body')"
		ng-class="{active:take1.tool.details.body.font_measure == 'vmin'}"  title="" >vmin</button>
	</div>
	
```
limit on devices
```

	<div class="mM_stgs_mobility_info mM_stgs_content_box">
		<div class="mM_switch_cont switch_cont">
		  <label class="mM_switch_label stgs_access">limit devices? </label>
		  <label class="mM_switch switch">
			<input class="switch_input stgs_access access" type="checkbox"
			ng-model="take1.tool.details.limit_devices"   ng-change="take1.outer_style(); take1.soft_apply()" >
			<span class="fs_slider"></span>
		  </label>
		</div>
	 </div>
	 <div class="mM_stgs_bg_info mM_stgs_content_box" ng-show="take1.tool.details.limit_devices">
		<div class="d3_range_container width_pct">
		  <div class="d3_range_stack">
			<label class="width_label" title="">hide on?:</label>
		  </div>
		</div><!--d3_range_container  ng-model-options="{ getterSetter: true }"  -->
		<div class="d3_range_container width_pct">
		  <div class="d3_auto_range_cube d3_auto_range">
			<div class="hide_on_sm squaredOne" ng-hide="show.on">
			  <input id="hide_on_sm" type="checkbox" value="None" class="hide_on_box hide_on"
			  name="device" data-param="device_small" ng-model="take1.tool.details.hide_small"
			  ng-change="take1.outer_style(); take1.soft_apply()" />
			  <label for="hide_on_sm" ></label>
			</div>
			<label class="auto_label" title="">
			  SM
			</label>
		  </div>
		  <div class="d3_auto_range_cube d3_auto_range">
			<div class="hide_on_md squaredOne" ng-hide="show.on">
			  <input id="hide_on_md" type="checkbox" class="hide_on_box hide_on" value="None"
			  name="device" data-param="device_medium" ng-model="take1.tool.details.hide_medium"
			  ng-change="take1.outer_style(); take1.soft_apply()"  />
			  <label for="hide_on_md" ></label>
			</div>
			<label class="auto_label" title="">
			  MD
			</label>
		  </div>
		  <div class="d3_auto_range_cube d3_auto_range">
			<div class="hide_on_lg squaredOne" ng-hide="show.on">
			  <input id="hide_on_lg" type="checkbox" value="None" class="hide_on_box hide_on"
			  name="device" data-param="device_large"  ng-model="take1.tool.details.hide_large"
			  ng-change="take1.outer_style(); take1.soft_apply()" />
			  <label for="hide_on_lg" ></label>
			</div>
			<label class="auto_label" title="">
			  LG
			</label>
		  </div>
		  <!--<div class="d3_auto_range_cube d3_auto_range">
			<div>{{take1.tool.details.nav.device_xlarge}}</div>
			<div class="hide_on_xl squaredOne" ng-hide="show.on">
			  <input id="hide_on_xl" type="radio" value="None" class="hide_on_box hide_on"
			  name="device" data-param="device_xlarge"  />
			  <label for="hide_on_xl" ></label>
			</div>
			<label class="auto_label" title="">
			  XL
			</label>
		  </div>-->
		</div>

	</div><!-- end limit on -->

```

limit on devices js
```

	//limit/hide on devices
	let hide_small = (boss.service.tool.details.hide_small == true) ? " d3_hide_small " : "";
	let hide_medium = (boss.service.tool.details.hide_medium == true) ? " d3_hide_medium " : "";
	let hide_large = (boss.service.tool.details.hide_large == true) ? " d3_hide_large " : "";

	//restrict action to site/client side display
	let device_limits = (boss.mode != "admin" && boss.service.tool.details.limit_devices == true) ? ` ${hide_small} ${hide_medium} ${hide_large} ` : "";
	let newClass = ` ${boss_cont.className} ${use_class} ${device_limits} `;

	boss_cont.className = ShowData.removeSomething(newClass,' ');
  }//outer_style
  
  //also in some 'this.getClass'

```

note: this code limits the action to site/client side display
```
boss.mode != "admin"
```
		
sample json file
```
	{
		"id":"mSS-1",
		"title":"manual slideshow",
		"alias":"manual-slideshow",
		"file_name":"manual_slideshow",
		"type":"slideshow",
		"img":"xfiles/images/tools.png",
		"thumbnail":"xfiles/images/tools.png",
		"params":{
		  "data":"none"
		},
		"details":{
		  "data":"none",
		  "width":"default",
		  "height":"default",
		  "ratio":"2.6666666",
		  "responsive":"1",
		  "background":"#ffffff",
		  "auto_width":true,
		  "width_pct":95,
		  "class_pfx":"",
		  "class_style":"",
		  "custom_class":"",
		  "sample_class":"",
		  "class_alt": "",
		  "btn_class":"d3S_ph15",
		  "btn_hover":"",
		  "btn_bg":"#000000",
		  "btn_hov":"#CCCCCC",
		  "btn_opacity":100,
		  "btn_base16":"ff",
		  "icon_bg":"#ffffff",
		  "icon_hov":"#000000",
		  "btn_hex":"#000000",
		  "btn_style":"background-color:#000000;"
		}
	}
```		

an actual database saved sample of json data
```
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

## Duplicate section checklist

copy paste entire section

replace keyword ie. image -> title (careful of words like content which may be used in class global classnames)

add option label and btn section (change variable str)
```
/****** ADVANCED SECTION

<label class="adv_option_label heading" ng-show="take1.option_section == 'image'">title style:</label>
```

copy paste json section

add keyword to form_item_style switch statements
```
      this.form_item_style = function(dest)
      {
        switch (dest) {
          case "main":
          case "content":
          case "image":
		...

```

add stylegetter to html container
```
style="{{take1.tool.details.image.style}}"
```

### Bugfix

having trouble displaying both tools with tools.js
activate_template is somehow rewriting the toolData array

issue 1: filename was undefined should have been file_name == not filename
issue 2: i think i need to reset the data - no update the stage - no i had to create a way to block multiple settings from processing the same data (when the setting wasn't being used.)

	




