#LIKE IN & CONCAT

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

com_arc site arcassets.php
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
	  
	  
CONCAT
com_arc site arcassets.php
```
function search_media($sMed)
  {
    //function to process search string in bookmark popup srch section
    $cur_arc_user = jFactory::getUser();
    $arc_user_id = $cur_arc_user->id;
    if($arc_user_id == 0){return "unregistered user";}

    if(!isset($sMed) OR $sMed == ""){return;}

    $info_table = '#__arc_my_data';
    $search_media = $sMed;
    $search_media = preg_replace ("/ +/", " ", $search_media); # convert all multispaces to space
    $search_media = preg_replace ("/^ /", "", $search_media);  # remove space from start
    $search_media = preg_replace ("/ $/", "", $search_media);
    if($search_media == ""){return "";}

    $columns = array('desc_data','core_data','other_data','note_data','tag_data','task_data');
    $sel_ary = array('data_id','type','data_type','category','desc_data','core_data','ancestor');
    //$test_ary = array('data_id','type','data_type','category','core_data','desc_data');

    $db = jFactory::getDbo();
    $query = $db->getQuery(true);
    $query->select($db->quoteName($sel_ary));
    $query->from($db->quoteName($info_table));
    $query->where($db->quoteName('user_id') . ' = '. $db->quote($arc_user_id)
    . 'AND CONCAT(' . implode(",",$columns). ')' . ' LIKE '. $db->quote(htmlentities("%" . $search_media . "%")));//arc Test Page
    $db->setQuery($query);

    $sR = $db->loadObjectList();
    //return json_encode($sR) . $query->dump();

    if($sR == false) return;
    /*for($d = 0; $d < count($sR); $d++)*/
    foreach($sR as $value)
    {
      $value->ancestor_list = $this->get_my_ancestors($value);
      //$sR[$d]->ancestor_list = $this->get_my_ancestors($sR[$d]);
    }//end for

    //return json_encode($sR) . $query->dump();
    //return stripslashes(json_encode($sR));
    return json_encode($sR);

    /*
    SELECT *
    FROM projects
    WHERE
    CONCAT(category,"|",name,"|",description,"|",keywords,"|",type) LIKE '%query%'
    ORDER BY name ASC;

    $bkmkData = $db->loadObject();
    */





  }//end search_media
```

```
  protected function getListQuery()
    {
        $db = $this->getDbo();
        $query = $db->getQuery(true);

        $query->select(
            $this->getState(
            "list.select",
            "a.id, a.title, a.page_ids, a.page_desc," .
            "a.options, a.module_id,".
            "b.position,b.access,b.published,".
            "b.publish_up,b.publish_down," .
            "b.ordering"
            )
        );

        $query->from($db->quoteName("#__psmod","a"))
        ->join("INNER",$db->quoteName("#__modules","b") . "ON (" .
        $db->quoteName("a.id") . " = " . $db->quoteName("b.menu_id") . ")");//("#__folio")." AS a");

        $published = $this->getState('filter.published');
        if (is_numeric($published))
        {
          $query->where('b.published = '.(int) $published);
        } elseif ($published === '')
        {
          $query->where('(b.published IN (0, 1))');
        }
        // Filter by search in title
        $search = $this->getState('filter.search');
        if (!empty($search))
        {
          if (stripos($search, 'id:') === 0)
          {
            $query->where('a.id = '.(int) substr($search, 3));
          }elseif (stripos($search, 'page:') === 0){

            $columns = array('title','alias');

            $db2 = jFactory::getDbo();
            $query2 = $db2->getQuery(true);
            $query2->select($db2->quoteName('id'));
            $query2->from($db2->quoteName('#__menu'));
            $query2->where('CONCAT(' . implode(",",$columns) . ')' . ' LIKE '
            . $db2->quote(htmlentities("%" . substr($search,5) . "%")));//arc Test Page
            $db2->setQuery($query2);

            $sR = $db2->loadColumn();

            if(!empty($sR))
            {
              $menu_ids = array();
              for($r = 0; $r < count($sR); $r++)
              {
                $new_str = ' a.page_ids LIKE ' . $db->Quote($db->escape($sR[$r], true))
                . ' OR  a.page_ids LIKE ' . $db->Quote($db->escape($sR[$r], true) .',%')
                . ' OR  a.page_ids LIKE ' . $db->Quote('%,'.$db->escape($sR[$r], true) .',%')
                . ' OR  a.page_ids LIKE ' . $db->Quote('%,'.$db->escape($sR[$r], true));

                array_push($menu_ids,$new_str);
              }
              //echo json_encode($menu_ids);
              /*
			  //works
              [" a.page_ids LIKE '109' OR a.page_ids LIKE '109,%' OR a.page_ids LIKE '%,109,%' OR a.page_ids LIKE '%,109'"," a.page_ids LIKE '121' OR a.page_ids LIKE '121,%' OR a.page_ids LIKE '%,121,%' OR a.page_ids LIKE '%,121'"]
              */
              $search = $menu_ids;

            }else{
              $search = "a.page_ids = ''";
            }
            $query->where($search);


          } else {
            $search = $db->Quote('%'.$db->escape($search, true).'%');
            $query->where('(a.title LIKE '.$search.' OR a.page_desc LIKE '.$search.')');
          }
        }
        $orderCol = $this->state->get('list.ordering');
        $orderDirn = $this->state->get('list.direction');
        $query->order($db->escape($orderCol.' '.$orderDirn));

        //echo $query->dump();
        /*
		//works
		SELECT a.id, a.title, a.page_ids, a.page_desc,a.options, a.module_id,b.position,b.access,b.published,b.publish_up,b.publish_down,b.ordering
		FROM `nfojm_psmod` AS `a`
		INNER JOIN `nfojm_modules` AS `b`ON (`a`.`id` = `b`.`menu_id`)
		WHERE (b.published IN (0, 1)) AND  a.page_ids LIKE '109' OR  a.page_ids LIKE '109,%' OR  a.page_ids LIKE '%,109,%' OR  a.page_ids LIKE '%,109' AND  a.page_ids LIKE '121' OR  a.page_ids LIKE '121,%' OR  a.page_ids LIKE '%,121,%' OR  a.page_ids LIKE '%,121'
		ORDER BY a.title 
		*/

        return $query;
    }
```