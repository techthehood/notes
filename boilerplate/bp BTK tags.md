#BTK Tags

### css ctrls
.tags_box{
/*btk default*/
	height
	margin

/*needs*/
	display:flex;
	align-itmes:center;
	align-self: flex-start;//makes it collapse to its contents
	display: flex;
	align-items: center;
}
.tags_inner{
/*btk default*/
	margin

/*needs*/
    display: inline-flex;
    align-items: center;
    margin:0;
    height:unset;

}

##js BTK
//sets up the tagSYS

	//i think this works to preserve the view upon switching (com_arc app)
	//along with object_elements.tagSYS.preserveEntry();
    var tagSYS_home = "build_section2";
    var tagsMaxLength = 200;
	object_elements.tagSYS  = (object_elements.tagSYS != undefined) ? object_elements.tagSYS : new masterButtons({varName:'bldrTagSYS',home:tagSYS_home,type:'tags'});
	
	//this is the line i used for a fresh new tagSYS every time
	object_elements.tagSYS  = new masterButtons({varName:'bldrTagSYS',home:tagSYS_home,type:'tags'});

	
	object_elements.tagSYS.setPrefix('bldrTagSYS');
	object_elements.tagSYS.setCustomClass(["iconbox"]);
	object_elements.tagSYS.setInputIcon("plus","right","ui-btn ui-btn-right ui-btn-inline ui-nodisc-icon ui-mini ui-btn-icon-right ui-btn-icon-notext");
	//object_elements.tagSYS.setPosition("up");//sets display items up or down
	object_elements.tagSYS.setLabels("<small>type a phrase then press enter:</small>");
	//object_elements.tagSYS.preserveEntry();
	//if(in_value == "activity"){
		object_elements.tagSYS.setTitles("tag maker:");
		//document.getElementById("contact_form_rear_title").innerHTML = "<h6>list maker:</h6>";
	//}//end if

	object_elements.tagSYS.setInputAttributes({"maxlength":tagsMaxLength});
	object_elements.tagSYS.setInputAttributes({"placeholder":"enter text..."});//another way to set placeholder - single entry for now

	if(obj_data != undefined && obj_data.tag_data != undefined && obj_data.tag_data != "")
	{
		object_elements.tagSYS.setTags(obj_data.tag_data);//sets initial text
	}//end if
	//setFirst
	//_replace
	//setTags
	//object_elements.tagSYS.setCallout(checkChange,{"mode":"validate","more_info":more_info},trans_obj);
	//object_elements.tagSYS.clearHome("false");
	object_elements.tagSYS.display();

	var tags_id_ary = object_elements.tagSYS.get_event_ids();
	var targetElement = document.getElementById(tags_id_ary[0]);

      //object_elements.tagSYS.getCurrentValue();

//gets the data
        let tag_data = object_elements.tagSYS.getCurrentValue();
		
//validation check

	var check_it = object_elements[pair_keys[i]].runDataCheck();
	if(check_it == "invalid")
	{
	  isReady = "false";
	}//end if