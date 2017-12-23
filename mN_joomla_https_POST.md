
	/*
	//works for angularjs json https request
	$postData = JFactory::getApplication()->input->json;
	$position = $postData->get('data','no such thing','RAW');
	
	//NOTE:
	//with the angular data i can send the json without stringify and 
	//and without json_decoding on the server
	
	//no it actually turns it into an array and then its difficult to
	//access
	
	
	
	//works for regular post data ajax call
	$postData = JFactory::getApplication()->input->post;
	$searchStr = $postData->get('data', 'defaultvalue', 'filter');
	
	//NOTE: this stringifies the json object when uploaded
		
	//ajax sample
	
	var uploadData = {};
			uploadData.data = http_obj.data;//still in the form or ajax data

			var ctrl_Url = "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works
			wait_a_minute();

				 $(document).ready(function()
				 {
						$.ajax(
						{
							url:ctrl_Url,
							data:uploadData,
	*/
	
	//here is the working uCheck ajax example
	
	jQuery.ajax(
           {
            url:ctrlrUrl,data:{data:JSON.stringify(tData)},type:"POST",
			
	//on the controller
	        //works for regular post data ajax call
            $postData = JFactory::getApplication()->input->post;
      			$uCheckData = $postData->get('data', 'defaultvalue', 'filter');
            //echo "uCheckData = " . $uCheckData;
            //return;

            if($uCheckData == "defaultvalue"){
              $postData = JFactory::getApplication()->input->json;
              $uCheckData = $postData->get('data','no such thing','RAW');
            }
	
	
	//GENERIC REQUEST
	this.someGeneric = function()
	{
		//alert("uniqueCheck running");
        let trans = {}
        trans.data = JSON.stringify(uObj);
        trans.task = "uCheck";
        let check_results = "";

        await serve.request(trans).then(function(result){
          console.log("returned data = ",result);
          check_results = result;
        }).catch(function(err){
          console.log("a request error has occured: ",err);
        });
        return check_results;
	}