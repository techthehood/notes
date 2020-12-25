
#//replaces double quoted double quotes

example_str = "{"name":"value"}"

while(example_str.indexOf('"') != -1)
{
  example_str = example_str.replace("\"","'");
}
http://stackoverflow.com/questions/36574378/escape-unescape-backslashes-using-javascript-jquery

//replaces escaped slashes in urls
while(results.indexOf("\\/") != -1){
  results = results.replace("\\/","/");
}//end while

http://php.net/manual/en/function.json-encode.php


//I think this worked using ITK to call the image element and attach a listener for load and error
var prev_img_id_array = obj_elements.prev_img.get_event_ids();
obj_elements.prev_imgElement = document.getElementById(prev_img_id_array[0]);

try{
obj_elements.prev_imgElement.onerror = function(){
  obj_elements.prev_imgElement.src = ARC_IMG_URL + "flame.svg";
  obj_elements.prev_imgElement.style.backgroundColor = "red";
}
obj_elements.prev_imgElement.onload = function(){
  obj_elements.prev_imgElement.style.backgroundColor = "none";
}

obj_elements.prev_imgElement.src = targetElement.value;
}catch(err){}

//ultimately i updated this to use callouts


//unescape php html entities using javascript
//the forum found this useful function
function htmlDecode(input)
{
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

// This returns "<img src='myimage.jpg'>"
htmlDecode("&lt;img src='myimage.jpg'&gt;");

http://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript

and there was also a testing site
http://www.the-art-of-web.com/javascript/escape/
