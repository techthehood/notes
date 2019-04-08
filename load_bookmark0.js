// const loadBookmark = require('./bookmark/load_bookmark.js');

const addBookmark = require('./add_bookmark.js');
const constructNavigation = require('../navigation/current/construct_navigation.js');

export const load_bookmark = async function(e,eID,dObj)
{
  let state = dObj.state;
  let mode = dObj.mode;
  let timestamp = dObj.timestamp || "";
  let orient = dObj.orient;
  let prefix = dObj.prefix;
  let store_data;
  let my_navData;
  let data_mode = "compile";//compile by default - used for bookmark data compile

  switch(mode)
  {
    // case "search":
    // case "recent":
    //   let my_navData;
    //   store_data = await state.construct_navigation(dObj.data,prefix,{state});
    // break;

    case "restore":
    case "move":/*from list_items load_bookmark li:1148*/
    case "detach":
    /*case "attach_push": from pair_distribution*/
    case "attach":

      store_data = dObj.data;//JSON.stringify(dObj);//takes an object or string ur choice
      // attempt to fix break when attachments are deleted and it tries to refresh the display
      // store_data.label = store_data.category;
      data_mode = "restore";// used when data is already acquired
    break;

    default:
    /*
    here for example history takes the same current data with timestamp and passes it to the
    get_bookmark_index to get the same exact data. I wonder why this step is neccessary?

    i don't think it is. i can stringify the dObj and get the same result
    */
      // let storage_index = state.get_bookmark_index(e,eID,{"timestamp":timestamp,"mode":mode});
      // if(storage_index == -1){return;}
      //
      // let storage_object = JSON.parse(localStorage.bookmarks);
      // store_data = JSON.stringify(storage_object[mode][storage_index]);

        // let my_navData;
        // dObj.data.title_data = dObj.data.category;
        // label bugfix - convert_to_recent & set_to_current
        dObj.data.label = (dObj.data.label) ? dObj.data.label : dObj.data.category;
        store_data = await constructNavigation.construct_navigation(dObj.data,prefix,{state});
        // data_mode = "compile";
    break;
  }//switch

  let st_obj = (typeof(store_data) == "object") ? store_data : JSON.parse(store_data);
  //used as a marker for search highlighting
  if(data_mode != "restore"){
    //filter for admin
    state.bkmk_targ_ids = (st_obj.current.item_title != undefined &&
      unescape(st_obj.current.item_title.toLowerCase()) != unescape(st_obj.current.tab_cat.toLowerCase())) ?
    [st_obj.current.id] : [];//
  }//if


  console.dir("store data = ",st_obj);
  //delete bookmark
  await state.folder_data.load_data({
    state,
    "orient":orient,
    "store_data":store_data,
    mode
  });

  //close the bookmark panel
  if($("." + prefix + "rF_Box_looking_glass  ")[0]){
    $("." + prefix + "rF_Box_looking_glass  ")[0].click();
  }//if

  let item_title = st_obj.current.item_title || "";
  let data_id = st_obj.current.id || "";
  let category = st_obj.current.category;
  addBookmark.add_bookmark(e,"",{state,"prefix":prefix,"mode":"history",item_title,data_id,category});
  // if(mode != "history")
  // {
  //   addBookmark.add_bookmark(e,"",{state,"prefix":prefix,"mode":"history"});
  // }else {
  //   let current_obj = dObj.data.current;
  //   let item_title = current_obj.item_title;
  //   let data_id = current_obj.id;
  //   addBookmark.add_bookmark(e,"",{
  //     state,
  //     "prefix":prefix,
  //     "mode":"history",
  //     item_title,
  //     data_id
  //   });
  // }

  if(data_mode == "restore"){
    console.log("restore successful");
  }//if

  return;


}//end load_bookmark
