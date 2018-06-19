# i made my own http req with ajax
```
	var http_req = async function(http_obj)
	{
		/*
		js example:
			http_req({task:"search_bkmk",data:srch_val})
			.then(function(result){
				console.log("return data = ",result);
				//print the count to log
			})

		controller.php example:
			$postData = JFactory::getApplication()->input->post;
			$searchStr = $postData->get('data', 'defaultvalue', 'filter');

			$srch_results = $table->search_media($searchStr);

			echo $srch_results;//works to return display_data
		*/
		return new Promise((resolve, reject)=>{
				var form_token = FORM_TOKEN;
				var urlMod = http_obj.task;
				var uploadData = {};
				uploadData.data = http_obj.data;

				var ctrl_Url = "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works
				wait_a_minute();

					 $(document).ready(function()
					 {
							$.ajax(
							{
								url:ctrl_Url,
								data:uploadData,
								type:'POST',
								success:function(result,textStatus,xhr)
								{
									//console.log("scan textStatus = " + textStatus);
									//console.log("scan xhr  = " + xhr);
									//console.info("scan xhr status = " + xhr.status);

									//alert("Ajax test result data = " + result);//string
								 console.log("Ajax test result data = " + result);//string
								 //var makeMenu = new menuMaker(result);
								 //makeMenu.display();

								 //if upload is successful

								 //change the upload icon to successful
								 //if(result.indexOf("invalid token") == -1)
								 if(result != "Invalid Token")
								 {
									 if(result.indexOf("<!doctype html>") == -1 && result != "no data available"
									 && result != "unregistered user" && result != "")
									 {
										 wait_a_minute("hide");

										 resolve(result);//remove the php htmlentities (js version of - html_entity_decode)

									 }else{
										 wait_a_minute("hide");
										 reject(htmlDecode(result));
									 }//else

								 }else
								 {
										 //alert("Its not you... its me. \n Your session timer has expired. \n Please reset the page and give \n \"us\" a little more time.")
										 reject(result);
										 if(localStorage.saved_state)
										 {
											 localStorage.saved_state = JSON.stringify(folder_data.nav_snapshot("main"));
											 //used with fn restore_state
										 }//if

										wait_a_minute("show","your session has expired, </br> updating session.")
										var token_reset = setTimeout(function() {
											clearTimeout(token_reset)
											window.location.replace(SITEURL);
										},150);
								 }//else
								 //hide

							 }//end success

						 })//end ajax
					 })//end document.ready
				 })//end promise function
	}//end http_req
	
```
