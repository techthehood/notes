#PHP Directory Reading
###working Joomla directory reader
```
function d3_getFiles($dir,$ext){

foreach (glob($dir ."*." . $ext) as $d3_filepath) {
    $d3_filepath	
}
}//end d3_getFiles
```



###test code:
```
	echo $_SERVER['DOCUMENT_ROOT'] . "\n";
	echo getcwd() . "\n";
	$module_name = "psmod";
	//$dir = JUri::base() . "modules/mod_" . $module_name . "/xfiles/js/";
	//$dir = "../modules/mod_" . $module_name . "/xfiles/js/";//relative path works
	$my_dir = "components";
	$files1 = scandir($my_dir);
	//print_r($files1);
	//echo implode(",",$files1);
	echo nl2br(implode(",",$files1));//;php linebreak
	
```

##the main code i wanted to use at first was
```
scandir($my_dir);
```
[php scandir](http://php.net/manual/en/function.scandir.php)

##then i thought i found a better one
[](http://php.net/manual/en/function.glob.php)
###but there was an error reading the directory when i pasted the same code 
into a working admin component

###this was something i came across while troubleshooting - not really helpful
echo $_SERVER['DOCUMENT_ROOT'] //is self explanitory


##this was the answer
echo getcwd() . "\n";

[get current working directory](http://php.net/manual/en/function.getcwd.php)
run in Joomla modules default.php file was different from Joomla
admin components edit.php file

echo getcwd() . "\n";//in edit.php returns C:\xampp\htdocs\Joomla\administrator
&& in default.php returns C:\xampp\htdocs\Joomla\

//$dir = "components/com_psmod/xfiles/js/";//relative path works
//$dir = "../administrator/components/com_psmod/xfiles/js/";//relative path  works
//"./administrator/components/com_psmod/xfiles/js/";//doesn't work

//  "./";//goes to Joomla root = what determines that htaccess?
//  "/";//this goes all the way back to C:

echo 'server root = ' . $_SERVER['DOCUMENT_ROOT'];// returns server root = C:/xampp/htdocs

echo 'app root = ' . getenv('APP_ROOT_PATH');//returns blank
echo 'JUri base = ' . JUri::base(); // returns http://localhost/Joomla/administrator/



##GOTCHA key concept
ex:
module = C:\xampp\htdocs\Joomla
admin component = C:\xampp\htdocs\Joomla\administrator

also:
[php linebreaks](https://stackoverflow.com/questions/12994769/how-to-add-a-line-break-within-echo-in-php)

//it does need the \n as part of the string to work

##final test copy:
```
//from current working directory
//$dir = "components/com_psmod/xfiles/js/";//relative path works
$dir = "../administrator/components/com_psmod/xfiles/js/";//relative path works
$files1 = scandir($dir);
echo nl2br(implode(",",$files1) . "\n");


foreach (glob($dir ."*.js") as $filename) {
    echo nl2br("$filename size " . filesize($filename) . "\n");
}
```
## Heres what i used in the module_name.php file in its root folder
//good it only loads once even with multiple mods
```
$dir = "modules/mod_" . $module_name . "/xfiles/templates/";

foreach (glob($dir ."*.js") as $filename) {

		$modScriptLoc = JUri::base() . $filename;
		$modLink->addScript($modScriptLoc);
}
```


##eureka - i got it the current working directory is determined by the location of the single web page the current view is displaying from.  so in Joomla the site cwd is the Joomla directory index.php file for the backend its 
the index.php file found in the administrator directory.

#Directory reader - reading folders
##creates an array of folders

$release_version = "development";//"production"
$core = "core/";
//$core = "../core/";//needed for admin
//$xfiles = JUri::base(). "components/com_psmod/xfiles/";
$xfiles = "modules/mod_psmod/xfiles/";//for module version
//$xfiles = "components/com_psmod/xfiles/";//for component version
$url_prefix= ($release_version == "production") ? JUri::base() : JUri::root();
$home_url = ($release_version == "production") ? JUri::base() . $xfiles : JUri::root() . $core;
$rel_url = ($release_version == "production") ? $xfiles : $core;

$dir = $rel_url . "templates/";//relative path works
$template_ary = [];
foreach (glob($dir ."*") as $filename) {
    echo nl2br ("$filename size " . filesize($filename) . " \n");
    if(is_dir($filename))
    {
      //$url_prefix . $filename doesn't work - $filename alone does
      echo nl2br ("$filename is a directory \n");
      array_push($template_ary,$url_prefix . $filename);
      echo nl2br("".implode(",",$template_ary) ."\n");
    }
}//foreach