

		var listener_items = (type == "select") ? 'input' : 'change';
		//msg_id input_id char_limit
		
		
			//newObj_input.oninput = function(){
			
			
			var selectProcess = function(){
				var ch_lim = newObj_input.attributes.maxlength.value || "";
				var in_id =  newObj_input.id;
				var ms_id = newObj_sel_tally.id;
				newObj_sel_tally.style.display = "none";
				
				
				var theIndex = newObj_input.selectedIndex;
				var inputValue = newObj_input[theIndex].value;
				if(inputValue == custom_select_str)
				{
					newObj_input.style.display = "none";
					newObj_input2.style.display = "block";
					newObj_input2.focus();
				}//end if
				
				dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":"text"});
				
				extractData(newObj_input.id,type);
			};
		
		if(type == "select"){
			newObj_input.oninput = function()
			{
				selectProcess();
			}
		}else{
			newObj_sel_cont.onchange = function()
			{
				selectProcess();
			}
		}
		
		
		if(custom_select != "false"){
			
			var ch_lim = newObj_input.attributes.maxlength.value || "";
			
			//this isn't another dataCheck its an array i can pass to an 
			//external data checker
			data_check_array = data_check_array.concat({"msg_id":newObj_sel_tally.id,"input_id":newObj_input2.id,"char_limit":ch_lim,"type":"text"});
			
			//msg_id input_id char_limit
			//newObj_input2.oninput = function(){
			
			
			
			var selectProcess2 = function(){
				var ch_lim = newObj_input.attributes.maxlength.value || "";
				var in_id =  newObj_input2.id;
				var ms_id = newObj_sel_tally.id;
				
				newObj_sel_tally.style.display = "block";
				
				
				dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":"text"});
				
				extractData(newObj_input2.id,type);
			};
			
			newObj_input2.oninput = function()
			{
				selectProcess2();
			}
			
			
			
			//other version
			
			
			var listener_item = (type == "select") ? 'input' : 'click';
			//msg_id input_id char_limit
			
			
				//newObj_input.oninput = function(){
				newObj_input.addEventListener(listener_item,function(){
					var ch_lim = newObj_input.attributes.maxlength.value || "";
					var in_id =  newObj_input.id;
					var ms_id = newObj_sel_tally.id;
					newObj_sel_tally.style.display = "none";
					
					
					var theIndex = newObj_input.selectedIndex;
					var inputValue = newObj_input[theIndex].value;
					if(inputValue == custom_select_str)
					{
						newObj_input.style.display = "none";
						newObj_input2.style.display = "block";
						newObj_input2.focus();
					}//end if
					
					dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":"text"});
					
					extractData(newObj_input.id,type);
				});
			
			
			
			if(custom_select != "false"){
				
				var ch_lim = newObj_input.attributes.maxlength.value || "";
				
				//this isn't another dataCheck its an array i can pass to an 
				//external data checker
				data_check_array = data_check_array.concat({"msg_id":newObj_sel_tally.id,"input_id":newObj_input2.id,"char_limit":ch_lim,"type":"text"});
				
				//msg_id input_id char_limit
				//newObj_input2.oninput = function(){
				newObj_input2.addEventListener(listener_item,function(){
					var ch_lim = newObj_input.attributes.maxlength.value || "";
					var in_id =  newObj_input2.id;
					var ms_id = newObj_sel_tally.id;
					
					newObj_sel_tally.style.display = "block";
					
					
					dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":"text"});
					
					extractData(newObj_input2.id,type);
				});