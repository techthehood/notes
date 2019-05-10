
	originally i used post data
	.js
```
	uploadData.arc_input = JSON.stringify(arc_input);
	uploadData.display_data = display_data;

	var form_token = FORM_TOKEN;

	var urlMod = (mkr_mod == "add") ? "addMyInfo" : (mkr_mod == "edit") ? "editMyInfo" : (mkr_mod == "delete") ? "deleteMyInfo" : (mkr_mod == "move") ? mov_task : "";//put controller.php method call here

	var ctrl_Url = "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works

	$(document).ready(function()
	{
	   //alert("getMenuData running!");
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

		  //alert("makeContact Ajax test result data = " + result);//string mobile alert
			console.log("makeContact Ajax test result data = " + result);//string


```

controller.php
```
	$info_type = $_POST['arc_input'];
	$display_data = $_POST['display_data'];

	$info_results = $table->editMyInfo($info_type,$display_data);


	//$_POST['arc_input']; returns:
	makeContact Ajax test result data = arc_input return = {"mod":"edit","data_id":"m-1029","data_str":"{\"id\":\"1029\",\"data_id\":\"m-1029\",\"type\":\"media\",\"data_type\":\"link\",\"user_id\":\"630\",\"category\":\"quick link\",\"ancestor\":\"m-0\",\"core_data\":\"https://www.youtube.com/watch?v=ogeOPnwfH7w\",\"desc_data\":\"Anthony Hamilton - I'm Cool (feat. David Banner)\",\"other_data\":\"\",\"note_data\":\"\",\"tag_data\":\"\",\"meta_data\":\"{&quot;title&quot;:&quot;Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29&quot;,&quot;image&quot;:&quot;https://i.ytimg.com/vi/ogeOPnwfH7w/hqdefault.jpg&quot;,&quot;description&quot;:&quot;Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29&quot;}\",\"task_data\":\"\",\"created\":\"2017-07-29 19:52:33\",\"modified\":\"1501375953000\",\"picture\":\"\",\"published\":\"0\",\"extra\":\"\",\"admin\":\"0\",\"container\":\"0\",\"order\":\"0\"}","published":0,"category":"quick link","data_type":"link","desc_data":"Anthony Hamilton - I'm Cool (feat. David Banner)","core_data":"https://www.youtube.com/watch?v=ogeOPnwfH7w","note_data":"","tag_data":"","meta_data":"{\"title\":\"Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29\",\"description\":\"Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29\",\"image\":\"https://i.ytimg.com/vi/ogeOPnwfH7w/hqdefault.jpg\"}","modified":1527127056381,"ancestor":"m-0"}
```

table.php
```
	public function editMyInfo($inStr,$dsp_Dta)
	{

		$arc_input = json_decode($inStr);
		return "arc_input = " . $arc_input->data_id . " && json error = " . json_last_error();

```


	for this to truely work you actually need data within data for example:
	$.ajax(
		{
			url:ctrl_Url,
			data:{data:uploadData},

	its not the first data that is being red its the attributes within the object you are sending and for my purposes its looking for the data property of that object.

	&& it still needs to be stringified

	/*
	//works for angularjs json https request
	$postData = JFactory::getApplication()->input->json;
	$position = $postData->get('data','no such thing','RAW');

	//NOTE:
	//with the angular data i can send the json without stringify and
	//and without json_decoding on the server

	//no it actually turns it into an array and then its difficult to
	//access

	//**OK SO I DO HAVE TO STRINGIFY IT!!!!**



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

	GENERIC CONTROLLER.PHP FN

	```
	      function savePallet()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $postData = JFactory::getApplication()->input->json;
            $pallets = $postData->get('data','no such thing','RAW');
            //echo $orders;
            //return;

            //$resultStr = $table->savePallet($pallets);

            //echo $resultStr;
            echo "savePallet reached";

        }//end savePallet
	```

	userdata format

```

	G_name:"12345"
	activation:"0"
	block:"0"
	email:"me@example.com"
	groups:{5: "5", 8: "8"}
	guest:0
	id:"488"
	lastResetTime:"0000-00-00 00:00:00"
	lastvisitDate:"2018-02-05 14:20:27"
	name:"Super User"
	otep:""
	otpKey:""
	params:"{"admin_style":"","admin_language":"","language":"", "editor":"","helpsite":"","timezone":""}"
	password:"wxy&z"
	password_clear:""
	registerDate:"2016-11-22 21:12:04"
	requireReset:"0"
	resetCount:"0"
	sendEmail:"1"
	username:"inspectaTech4"

```

taken from this php script
```
	$cur_arc_user = jFactory::getUser();
      $col_user_id = $cur_arc_user->id;
      $col_username = $cur_arc_user->username;

      if($col_user_id == 0){return "unregistered user";}
      return json_encode($cur_arc_user);

```

here is my official conversion of my joomla makeContact script

arc_site.js
```
	uploadData.arc_input = JSON.stringify(arc_input);
	uploadData.display_data = display_data;

	let payloadData = {data:JSON.stringify(uploadData)};//**key stringified
```

controller.php
```
			$postData = JFactory::getApplication()->input->post;
			$post_str = $postData->get('data', 'defaultvalue', 'filter');
			$post_obj = json_decode($post_str);
			//$input_str = $post_obj->arc_input;

			//$info_type = $_POST['arc_input'];
			$info_type = $post_obj->arc_input;

			//$display_data = $_POST['display_data'];
			$display_data = $post_obj->display_data;
```

this also works
i made the data function like that $_POST variable - which is a multidirectional array

controller.php
```
			$postData = JFactory::getApplication()->input->post;
			$post_str = $postData->get('data', 'defaultvalue', 'filter');
			//$post_obj = json_decode($post_str);
			//$attach_str = $post_obj->arc_input;

			//echo json_encode($attach_str);
			echo $post_str['arc_input'];
```

arc_site.js
```
	uploadData.arc_input = JSON.stringify(arc_input);
	uploadData.display_data = display_data;

	let payloadData = {data:uploadData};//**key - not stringified

```

so now i don't need to stringify the data nor decode it on the server
later...
the problem with this is it doesn't recognize the stringified code i send it.
it doesn't error out as invalid json, it just turns blank.

so im getting this in the table
```
public function editMyInfo($inStr,$dsp_Dta)
	{
    //return "editMyInfo running";
		$arc_input = json_decode($inStr);
    return "arc_input = " . $arc_input;// ""

```

[google came back with this answer](https://stackoverflow.com/questions/11738655/json-decode-returns-blank-but-its-valid-json)

```
You need to escape your \ once for PHP and once again for JSON

D:\\\\....
```

go back to the other way.

much later...
they both have the same issue

// $post_str['arc_input']; returns:
makeContact Ajax test result data = arc_input return = {"mod":"edit","data_id":"m-1029","data_str":"{\"id\":\"1029\",\"data_id\":\"m-1029\",\"type\":\"media\",\"data_type\":\"link\",\"user_id\":\"630\",\"category\":\"quick link\",\"ancestor\":\"m-0\",\"core_data\":\"https://www.youtube.com/watch?v=ogeOPnwfH7w\",\"desc_data\":\"Anthony Hamilton - I'm Cool (feat. David Banner)\",\"other_data\":\"\",\"note_data\":\"\",\"tag_data\":\"\",\"meta_data\":\"{"title":"Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29","image":"https://i.ytimg.com/vi/ogeOPnwfH7w/hqdefault.jpg","description":"Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29"}\",\"task_data\":\"\",\"created\":\"2017-07-29 19:52:33\",\"modified\":\"1501375953000\",\"picture\":\"\",\"published\":\"0\",\"extra\":\"\",\"admin\":\"0\",\"container\":\"0\",\"order\":\"0\"}","published":0,"category":"quick link","data_type":"link","desc_data":"Anthony Hamilton - I'm Cool (feat. David Banner)","core_data":"https://www.youtube.com/watch?v=ogeOPnwfH7w","note_data":"","tag_data":"","meta_data":"{\"title\":\"Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29\",\"description\":\"Anthony%20Hamilton%20-%20I%27m%20Cool%20%28feat.%20David%20Banner%29\",\"image\":\"https://i.ytimg.com/vi/ogeOPnwfH7w/hqdefault.jpg\"}","modified":1527127259365,"ancestor":"m-0"}

//notice the title and image properties of the first meta_data object reference. the quotes aren't escaped which causes invalid syntax to appear in the json_last_error(); (appears as 4)
