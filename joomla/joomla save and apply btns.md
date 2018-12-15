
## 'save and apply btns'

at the bottom of the view.html.php file there is this function

```

protected function addToolbar()
    {

        JFactory::getApplication()->input->set("hidemainmenu", true);
        //take this away later and see what happens

        JToolbarHelper::title(JText::_("COM_PSMOD_MANAGER_PSMOD"), ""); //"COM_FOLIO_MANAGER_FOLIO"

        //important changed from psmod.save to psmod.apply for module save feature
        //change it back to psmod.save if you don't need the module creation feature
        JToolbarHelper::apply("psmod.apply"); 
        JToolbarHelper::save("psmod.apply"); //"folio.save"

        if(empty($this->item->id))
        {
            JToolbarHelper::cancel("psmod.cancel"); //"folio.cancel"
        }
        else
        {
            JToolbarHelper::cancel("psmod.cancel","JTOOLBAR_CLOSE"); //folio.cancel
        }

    }

```

these are the lines for save and apply

```
	JToolbarHelper::apply("psmod.apply"); 
	JToolbarHelper::save("psmod.apply"); //"folio.save"
		
```

this is what i have it doing when i click the save btn

```
var saveBtn = document.getElementById("toolbar-save").firstElementChild;

        saveBtn.onclick = async function(){
          //console.log(Joomla);
          //made sure it doesn"t save & redirect right away
          //try promises next time
          prepSaveModule();//bugfix to update module object b4 saving
           Joomla.submitbutton("psmod.apply");
           await saveModule()/**/;
         }
```

prepSaveModule takes the field data ans saves it into a json object
```
        moduleData = {"menu_title":title,"menu_id":id,access,status,position,publish_up,publish_down,ordering,page_ids};
```

saveModule

it seems i solved the redirect problem with this line on success of the module being saved

````
	//without this the save is successful but the page refresh ends in a sloppy redirect with an error.

	window.location.replace(SITEURL + "?option=com_psmod&view=psmods");
	
	//my solution to the additional btn is to wrap the location change in an if statment
	
	 if(mode != "apply"){
	   window.location.replace(SITEURL + "?option=com_psmod&view=psmods");
	 }//if

	 //my solution to 
```

i will find a way to pass 'apply' to the saveModule() fn when the save(apply) btn is clicked.

actually that "apply" idea doesn't work because i have a code that runs at
startup that tests the existence of the component's item id vs the existence of the module id.

```
if(menu_id.value != 0 && module_id.value == 0){

            /*notice: there are times when the ajax goes faster than expected and
            tries to save the module before the menu gets to save and there is no menu
            reference for the module so it all comes back false. then the menu saves
            this section is written to detect this occurance and resubmit the module save*/

            if(document.getElementsByClassName("alert-success")[0]){
              var alertBox = document.getElementsByClassName("alert-success")[0];
              alertBox.className = "alert alert-warning";
              alertMsg = document.getElementsByClassName("alert-message")[0];
              alertMsg.innerHTML = "one moment while module is still saving... </br> you may need to reconfigure your module position and module config data.";
            }
            prepSaveModule();//it has to be down below the area where the position.value is still being configured
            saveModule();//happens on a new refreshed page with a newly saved menu but no module data saved

        }//end if
```

//this runs save without "apply" because the initial form submission submits the form and reloads the page.  i need persistent data to track the last save btn that was clicked and add its string variable. then clear it.

don't clear it. let it keep updating itself

so i copied a test for sessionStorage availability from here
[Feature-detecting localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

and i used these two together

```

	function session(mode,item,val)
    {
      if(!storageAvailable('sessionStorage') | item == undefined || item == ""){return;}
      var storage = window[sessionStorage];

      switch (mode) {
        case 'set':
          if(val == undefined || val == "")return false
          storage.setItem(item, val);
          return true;
        break;
        case 'get':
          return storage.getItem(item);
        break;
        case 'remove':
          return storage.removeItem(item);
        break;
      }//switch
    }//session

    function storageAvailable(type) {
         try {
             var storage = window[type],
                 x = '__storage_test__';
             storage.setItem(x, x);
             storage.removeItem(x);
             return true;
         }
         catch(e) {
             return e instanceof DOMException && (
                 // everything except Firefox
                 e.code === 22 ||
                 // Firefox
                 e.code === 1014 ||
                 // test name field too, because code might not be present
                 // everything except Firefox
                 e.name === 'QuotaExceededError' ||
                 // Firefox
                 e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                 // acknowledge QuotaExceededError only if there's something already stored
                 storage.length !== 0;
         }
     }//storageAvailable

```

then i used this during brand new module creation to hide the apply btn if there is no sessionStorage so it doesn't save and close anyway (which is what it will do if i can't persist the data).

```

	var applyBtn = document.getElementById("toolbar-apply").firstElementChild;

	if(menu_id.value == 0 && module_id.value == 0)
	{
	  //for brand new editor mode
	  //if there is not sessionStorage hide the apply btn
	  let has_session_storage = (storageAvailable('sessionStorage')) ? false : false;
	  if(!has_session_storage){
		applyBtn.style.display = "none";
	  }//if
	}//menu_id.value == 0
		
```

then i added this code for use after joomla runs the first submit/page reload to apply the components data before it saves the module data.

```

        if(menu_id.value != 0 && module_id.value == 0){
		
			...
			
			let session_data = session('get','last-saved');
			
			let last_saved = (session_data != undefined && session_data != false && session_data != "") ? session_data : "default";
			
			saveModule(last_saved);
		}
		  
```

in the end i would still need to add the new module data to the view on apply or i can just reload the page

```

	window.location.reload();

```

fyi i also updated save btns onclick events to run a common fn

```

	async function run_save(str)
    {
      //console.log(Joomla);
      //made sure it doesn"t save & redirect right away
      //try promises next time
      prepSaveModule();//bugfix to update module object b4 saving
       await Joomla.submitbutton("psmod.apply");

       //i don't think await works like this but no matter im getting what i want
       await saveModule(str)/**/;
    }

    function prepModuleEvents()
    {//"testBut"
        var saveBtn = document.getElementById("toolbar-save").firstElementChild;

        saveBtn.onclick = async function(){
          session('set','last-saved','default');
          run_save('default');
        }//saveBtn

        var applyBtn = document.getElementById("toolbar-apply").firstElementChild;

        applyBtn.onclick = function(){
          session('set','last-saved','apply');
          run_save('apply');
        }//saveBtn
		
		...
	}

```