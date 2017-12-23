
//this is the code i was using to check for internet connections

	/****** This code checks for an internet connection  *******/
	$connected = @fsockopen("www.google.com",80);
	if($connected)
	{
	  $is_conn = true;
	  fclose($connected);
	}else
	{
	  $is_conn = false;
	}
	/****************** end connection checker  ****************/

	//i need to simplify this code to check for the availability of
	//the cdn - if it isn't available - use something else? 

	$fileLink = JFactory::getDocument();
	// Note: "JUri::" works well online and offline without confusing "\" and "/"

	//$cnx = @fsockopen("https://www.w3schools.com/w3css/4/w3.css",80);
	//needs to be
	$cnx = @fsockopen("www.w3schools.com/w3css/4/w3.css",80);
    $styleLoc = ($cnx) ? function(){fclose($cnx); return "https://www.w3schools.com/w3css/4/w3.css"; } : JUri::root() . "core/css/w3.css";
    $fileLink->addStyleSheet($styleLoc);

	//bugfix
	//Unable to find the socket transport "https"
	https://stackoverflow.com/questions/378574/unable-to-find-the-socket-transport-https

	//this partially worked but produced an error with the anon fn in the conditional operator
	$cnx = @fsockopen("https://www.w3schools.com/w3css/4/w3.css",80);
	$styleLoc = ($cnx) ? function(){fclose($cnx); return "https://www.w3schools.com/w3css/4/w3.css"; } : JUri::root() . "core/css/w3.css";
	$fileLink->addStyleSheet($styleLoc);

	//this works
	$cnx = @fsockopen("www.w3schools.com",80);
    $styleLoc = ($cnx) ? "https://www.w3schools.com/w3css/4/w3.css" : JUri::root() . "core/css/w3.css";
    $fileLink->addStyleSheet($styleLoc);
    fclose($cnx);

	FINAL VERSION
	//but i want to close the cnx with less steps
	//this works

	$cnx = $this->check_cnx("www.w3schools.com");
    $styleLoc = ($cnx) ? "https://www.w3schools.com/w3css/4/w3.css" : JUri::root() . "core/css/w3.css";
    $fileLink->addStyleSheet($styleLoc);

	function check_cnx($url)
    {
      $chx_cnx = @fsockopen($url,80);
      if($chx_cnx)
      {
        fclose($chx_cnx);
        return true;
      }else
      {
        return false;
      }
    }//check_cnx

	//Note:
	//using the entire route results in false - we don't need it anyway to
	//check if the site is up and running
	$cnx = $this->check_cnx("www.w3schools.com/w3css/4/w3.css");
