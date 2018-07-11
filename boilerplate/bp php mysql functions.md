

simple controller setup

```

	function addPallet()
	{
		JSession::checkToken( "get" ) or die( "Invalid Token" );
		JTable::addIncludePath(JPATH_COMPONENT . "/tables");
		$table = JTable::getInstance("moduleassets","Table");


		$postData = JFactory::getApplication()->input->json;
		$pallets = $postData->get('data','no such thing','RAW');
		//echo $orders;
		//return;

		$resultStr = $table->addPallet($pallets);

		echo $resultStr;

	}//end addPallet

```


to get data

```

	function getData()
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);
      $query->select('*');
      $query->from($db->quoteName("#__psmod_assets"));
      $db->setQuery($query);

      $dbData = $db->loadObjectList();

      for($v = 0; $v < count($dbData); $v++){
        $dbData[$v]->params = html_entity_decode($dbData[$v]->params);
      }

      return json_encode($dbData);

    }//end getData
	
```

another get data 

```

    function getPages()
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      /*    title:"",
            alias:"",
            id:"0",
            published:true,
            access:1,
            publish_up:'0000-00-00 00:00:00',
            publish_down:'0000-00-00 00:00:00',
            template_style_id:0,
            menutype:"psmodmenu"
      */
      $fields = [
        "id",
        "title",
        "alias",
        "params",
        "access",
        "menutype",
        "published",
        "component_id",
        "home",
        "template_style_id"
      ];

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);
      $query->select($db->quoteName($fields));
      $query->from($db->quoteName("#__menu"));
      $db->setQuery($query);

      $dbMenus = $db->loadObjectList();

      for($v = 0; $v < count($dbMenus); $v++){
        //$dbData[$v]->params = html_entity_decode($dbData[$v]->params);
      }

      return json_encode($dbMenus);

    }//end getPages

```

to edit data

```

    function editPallet($dStr)
    {
      $cur_arc_user = jFactory::getUser();
      $col_user_id = $cur_arc_user->id;
      $col_username = $cur_arc_user->username;

      if($col_user_id == 0){return "unregistered user";}

      $color_obj = json_decode($dStr);
      if($col_user_id !== $color_obj->user_id){return;};

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      $fields = array
      (
      $db->quoteName("title") . " = " . $db->quote(htmlentities($color_obj->title)),
      $db->quoteName("user_id") . " = " . $db->quote($color_obj->user_id),
      $db->quoteName("user_name") . " = " . $db->quote($color_obj->user_name),
      $db->quoteName("data") . " = " . $db->quote(htmlentities($color_obj->data))
      );
      $conditions = array($db->quoteName("id") . " = " . $db->quote(htmlentities($color_obj->id)));

      $query->update($db->quoteName("#__psmod_colors"))->set($fields)->where($conditions);
      $db->setQuery($query);
      $db->execute();

    }//editPallet

```

to add data

```

    function addPallet($dStr)
    {
      $cur_arc_user = jFactory::getUser();
      $col_user_id = $cur_arc_user->id;
      $col_username = $cur_arc_user->username;

      if($col_user_id == 0){return "unregistered user";}
      $color_obj = json_decode($dStr);


      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      $columns = array("title","user_id","user_name","data");

      //insert values
      $values = array(
        $db->quote(htmlentities($color_obj->title)),
        $db->quote($col_user_id),
        $db->quote($col_username),
        $db->quote(htmlentities($color_obj->data))
      );

      //prep the insert query
      $query->insert($db->quoteName("#__psmod_colors"))
      ->columns($db->quoteName($columns))
      ->values(implode(",",$values));
      $db->setQuery($query);
      $color_results = $db->execute();

      if($color_results == 1){
        return "upload successful";
      }else {
          return "your upload was not successful";
      }
    }//addPallet
	
	```