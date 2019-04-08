
app.js
```
  var uploadData = {};
  uploadData.data = http_obj.data;

  var ctrl_Url = site_url + "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works

  let post = { title: "some text"};

  let options = {
    method:'POST',
    body:JSON.stringify(uploadData),
    headers: new Headers({'Content-Type': 'application/json'})
  }

  fetch(ctrl_Url,options)
  .then(function(response) {
    resolve(response.text());
  });
```

>once the stringified json is passed to the POST request it is decoded/parsed on the server side. the value that is detected is actually a property of the json object that was passed. (not calling the POST's body as if it was a property to be accessed.)


>ultimately (in this case), im only sending one property which is 'title' in my true examples that would be 'data' with its value being a string which will later be parsed/decoded into an object

controller.php
```
	function upload_order()
	{
		JSession::checkToken( 'get' ) or die( 'Invalid Token' );
		echo "updating order";

		JTable::addIncludePath(JPATH_COMPONENT . '/tables');
		$table = JTable::getInstance('arcassets','Table');


    $postData = JFactory::getApplication()->input->post;
		$orderStr = $postData->get('title', 'defaultvalue', 'filter');

		echo "order string = ";
		print_r($orderStr);
		print_r("POST RESPONSE");
		print_r(json_encode($_POST));// doesn't work

    if($orderStr == "defaultvalue"){
      $postData = JFactory::getApplication()->input->json;
      $orderStr = $postData->get('title','no such thing','RAW');
    }


		$order_results = $table->upload_order($orderStr);

		echo $order_results;

	}// end update_order
```
**the JSON part works.  i have to use the passed in json object property to get the data**

```
        state.workHorse.postMessage({
          mode:"reorder",
          task:"update_order",
          token:FORM_TOKEN,
          site:SITEURL,
          data:{data_ids,attach_ids,ancestor}
          // data:JSON.stringify({data_ids,attach_ids,ancestor})
        });
```

> i send a raw json object to the fetch request - not stringified

```
data:{data_ids,attach_ids,ancestor}
```

> it was passed to a fetch processor that ran the actual fetch request
```
  let upload_data = obj.data;
  let resp_var = await fido({
    task:"upload_order",
    data:upload_data,
    token,
    site
  })
```

the longhand version looks like this
```
  data: upload_data,
  is really
  data:{data_ids,attach_ids,ancestor}
```

finally fetch adds this - notice how the fetch body's data is being stringified (required).  the server immediately parses this string and makes its properties accessible.

```
fetch(url,{body:JSON.stringify({...,data:{data_ids,attach_ids,ancestor})});
OR
fetch(url,
  {
    method:"POST",
    body:JSON.stringify(
    {
      data:
      {
        data_ids,
        attach_ids,
        ancestor
      }
    })
  }
);
```

> in this case the server parses the stringified body object like this and array-object json data the is part of the properties of the body data is now a multidirectional array

```
  {
    data:[
      ancestor->value,
      data_ids->values,
      data_ids->values
    ]
  }
```
> i dont know why it turns the object into a multidirectional array but it does
so it has to be accessed like this
```
$upload_order = function($oStr)
{

  $order_obj = $oStr;

  $ancestor = $order_obj['ancestor'];
  echo "ancestor = $ancestor";

  ...
```

> i want my data to be more predictable, if i pass in an object i want to access its data as an object not switch data types. so to make sure the data type stays consistent i want to stringify the object before it is stringified again for the POST request - (ultimately it will be double stringified)


reorder.js - workhorse is sending this data to the service worker - notice the data is now being stringified for the above issue.
```
  state.workHorse.postMessage({
    mode:"reorder",
    task:"update_order",
    token:FORM_TOKEN,
    site:SITEURL,
    data:JSON.stringify({data_ids,attach_ids,ancestor})
  });
```

worker.js
```
  case "reorder":
    upload_order(data)
    .then((response) => {
      self.postMessage(response);
    })
    .catch((err) => {
      console.warn(`worker order error = ${err}`);
    });
  break;
```

upload_order.js
```
    let upload_data = obj.data;
    let resp_var = await fido({
      task:"upload_order",
      data:upload_data,
      token,
      site
    }).then((response) => {
      return response;
    })
```


http.js
```
  uploadData.data = http_obj.data;

  var ctrl_Url = site_url + "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works

  let options = {
    method:'POST',
    body:JSON.stringify(uploadData),
    headers: new Headers({'Content-Type': 'application/json'})
  }// options

  fetch(ctrl_Url,options)
```
>here the second stringify is added which will give me a chance the json_decode on the server and control the type of the data as an object not a multidirectional array.
