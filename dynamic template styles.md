
	//i started with a select directive
```
	<div class="mM_stgs_class_info mM_stgs_content_box">
		<label title="css style unique identifier">menu style:</label>
		<div class="select-menu mM_stgs_custom_class" data-value-mode='none' data-value-data='take1.service.tool.template_style'
		data-option-data='take1.template_styles' data-callout="take1.setSelect"
		data-params="{targ:take1.service.tool,prop:'template_style',callout:take1.setTemplateStyle}"></div>
	</div><!--ends bg info-->
```

it needs 2 properties, options and a label

```      
	this.template_styles = {};
    this.template_styles.options = mM_temps;
    this.template_styles.label = "single basic";
```

// i made an object for the options property in the closure just outside of the mega_menu.js directive

```
  //first the value for the json file / then the human readable value for the select options

  var mM_temps = {
    "basic":"single basic",
    "mega":"mega menu"
  }
```

note: my first test was "mega_menu":"mega menu" with a file named mega_menu.html.
it produced an error. doesn't like underscores
	

    this.setTemplateStyle = function()
    {
      //calling to module.js
      $scope.$emit("broadcast change template");
    }//setTemplateStyle
	
	//i started with an emit to the parent for a broadcast to module.js
	but that is totally unneccessary.  i can trigger the template right here.
	
	