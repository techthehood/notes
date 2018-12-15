# Joomla! mysql notes
GOTCHA - making the incoming data mirror the format of the data stored in the db
**i was getting a weird encoding format \u00a0**
```
//using htmlentities(varname,ENT_NOQUOTES); makes the data appear the way it is stored in the db
echo "og data htmlentities = " . htmlentities($arc_input->data_str,ENT_NOQUOTES);
// ENT_NOQUOTES takes away the all the &quot;
// i guess the $db->quote does the same task - $db->quote(htmlentities($arc_input->note_data)),
```
**also this is done without json_decode (ing) it first**

another issue was that i originally decoded, then removed a property then re-encoded and htmlentities
i needed to htmlentities the whole thing before its initial decode and it was already complete When
re-encoding back to a string.
```
// $data_clone = json_decode($arc_input->data_str);
$data_clone = json_decode(htmlentities($arc_input->data_str,ENT_NOQUOTES));
$data_clone->info_ids = "";
$data_clone->meta_data = "";


//dont forget htmlentities - the data in the db has been processed with it. - .works with leaving the quotes alone
// $compare_str2 = htmlentities(json_encode($data_clone,JSON_UNESCAPED_SLASHES),ENT_NOQUOTES);
$compare_str2 = json_encode($data_clone,JSON_UNESCAPED_SLASHES);
```
GOTCHA - [fix no such file or directory](https://stackoverflow.com/questions/5116421/require-once-failed-to-open-stream-no-such-file-or-directory)
[php real path docs](http://php.net/realpath)
```
//creates a random login password
// require_once "/random_compat-2.0.9/lib/random.php";
require_once(realpath(dirname(__FILE__) . "/random_compat-2.0.9/lib/random.php"));
```
**i think this was a webpack issue because the original was fine b4 webpack**

## i want to import a method into a class
### [binding this to an external function](https://softonsofa.com/php-how-to-use-this-in-closure-context-matters/)
[php bindTo docs](http://php.net/manual/en/closure.bindto.php)

create a method in the class that will both require and pass data to the fn
this will make the external fn accessible to the rest of the class.
```
function editMyInfo($inStr,$dsp_Dta)
{
  require_once(realpath(dirname(__FILE__) . "/lib/editMyInfo.php"));
}
```

create a file with a variable name set as a function
editMyInfo.php
```
<?php
$editMyInfo_fn = function ($inStr,$dsp_Dta)
{
};
```
**dont forget the semi-colon**

use the bind to method to connect the fn to $this scope of the current class
```
  $editMyInfo_fn = $editMyInfo_fn->bindTo($this);
  $editMyInfo_fn($inStr,$dsp_Dta);
```

finished example
```
public function editMyInfo($inStr,$dsp_Dta)
{
  require(realpath(dirname(__FILE__) . "/lib/editMyInfo.php"));

  $editMyInfo_fn = $editMyInfo_fn->bindTo($this);
  return $editMyInfo_fn($inStr,$dsp_Dta);
}//editMyInfo
```
**i tried adding require_once directly to the class but it gave me an error and
said it was expecting a fn thats why i wrapped the editMyInfo_fn in a class method**

## GOTCHA - **variables imported using the require_once function are create in the local scope of that
function and not in the global namespace. functions and classes that are imported are global but if you import a variable that is a function it will be limited to the scope it was defined in. using require_once then also limits the variables from being imported again in another function**

## use require not require_once for imported $vars
so because i have to use bindTo with variables to avoid errors (undefined constants or class not found) the variables i include are limited in scope so i have to use require instead of require_once

### [using php namespace article](https://www.sitepoint.com/php-53-namespaces-basics/)
[using php namespace article part2](https://www.sitepoint.com/php-namespaces-import-alias-resolution/)

### [php foreach](http://php.net/manual/en/control-structures.foreach.php)
### [using array_search](http://php.net/manual/en/function.array-search.php)
### [using array_push (like js push)](https://www.w3schools.com/php/func_array_push.asp)
### [to lower case - toLowerCase](https://www.w3schools.com/php/func_string_strtolower.asp)
```
  foreach($rows as $data_obj){
    // if category not found in $my_cats array
    $test_category = strtolower($data_obj['category']);
    $is_it_there = array_search($test_category,$my_categories);
    if($is_it_there == "" && $is_it_there !== 0)
    {
      //it returned false - its not there so put it there
      array_push($my_categories,$test_category);
      // and add the object to the list of return data
      array_push($my_return_data,$data_obj);
    }// end if
  }// foreach

```
### [url decode](http://php.net/manual/en/function.urldecode.php)
**fixes http%3A//**
```
  $og_image = '<meta property="og:image" content="' . urldecode($rich_obj->url) . '">';
```
