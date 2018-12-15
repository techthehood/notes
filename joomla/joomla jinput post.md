
GET $_POST (POST) Data
getting $_POST variables using joomla's system
side note: maybe useful for get variables: 
print_r($japp->input->get('submit_btn'));
https://forum.joomla.org/viewtopic.php?t=857259


this article says its as easy as this:
JRequest::get( 'post' );
https://docs.joomla.org/J1.5:Retrieving_and_Filtering_GET_and_POST_requests_with_JRequest::getVar

nope but the article is old and the method is deprecated

so this is the next lead
https://joomla.stackexchange.com/questions/55/whats-the-proper-way-to-get-the-entire-post

use this. it will get me a JInput object
$app = JFactory::getApplication();
$postData = $app->input->post;

i can use the JInput object like this
$var = $postData->get('varname', 'defaultvalue', 'filter');

try it out.

//condensed working version
			$postData = JFactory::getApplication()->input->post;
			$searchStr = $postData->get('data', 'defaultvalue', 'filter');

//im using this to help me see
var_dump($app);
it takes the entire JInput object and writes it completely out

notes:
wowwww how frustrating.  $http needs config data which includes a jquery $.param(data) hack to get it to use php recognized protocols

"$http service sends data in request body ; which makes it not available via $_POST"

but Joomla has a json portion to JInput

controller.php
$app = JFactory::getApplication();
            $postData = $app->input->json;
            //$var = $postData->get('varname', 'defaultvalue', 'filter');//template example
            //var_dump($app);//write JInput object out

            $var = $postData->get('projectID','no such thing','RAW');
			
app.js

i used the long version and wrapped the json in a single quoted string


     await $http({ method: "POST", url: site_url, data: '{ "projectID":"7","name":"blah","isFavorite":"false" }' })
     .then((result)=>{
       //in angular result is the retured json data - whatever you name it
         console.log("result = ",result.data);
     });

i'd like to try sending the object itself (without the single quotes)
result: single quotes and not quotes work the same.

what about using the $http.post shortcut?
this works:

    //this $http version sucks using Joomla's post method - needs way too many other configurations (hacks)
    await $http.post(site_url,{projectID:"this is my data again"}).then((result)=>{
      //in angular result is the retured json data - whatever you name it
        console.log("result = ",result.data);
    });//ok so i can add absolute paths
    //works with JInput json
	 