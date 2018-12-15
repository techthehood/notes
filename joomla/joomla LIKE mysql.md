
find a word sequence in multiple fields
arcassets.php 
search_media()

    $columns = array('desc_data','core_data','other_data','note_data','tag_data','task_data');
    $sel_ary = array('data_id','type','data_type','category','desc_data','core_data','ancestor');
    //$test_ary = array('data_id','type','data_type','category','core_data','desc_data');

    $db = jFactory::getDbo();
    $query = $db->getQuery(true);
    $query->select($db->quoteName($sel_ary));
    $query->from($db->quoteName($info_table));
    $query->where('CONCAT(' . implode(",",$columns). ')' . ' LIKE '. $db->quote(htmlentities("%" . $search_media . "%")));//arc Test Page
    $db->setQuery($query);

    $sR = $db->loadObjectList();

    //return json_encode($sR) . $query->dump();
    return stripslashes(json_encode($sR));
	
//renames categories
arcassets.php
moveMyInfo()

    $info_table = '#__arc_my_data' ;

    $db = jFactory::getDbo();
    $query = $db->getQuery(true);

      //this is my fix for query IN condition array string
      //db quote to escape - sanitize
      $move_ids = $db->quote($move_obj->move_ids);

      //explode with more sanitation
      $move_ids = explode(',',htmlentities($move_ids));
      //implode below to add inner quotes

      $query->select('*');
      $query->from($db->quoteName($info_table));
      $query->where($db->quoteName('data_id') . ' IN (' . implode("','",$move_ids) . ')');//aliintro Test Page
      $db->setQuery($query);

      $all_Data = $db->loadObjectList();
	  
	  //notice how i exploded them into an array to reform the array
	  with a unique separator which would work with the IN clause
	  
	  
