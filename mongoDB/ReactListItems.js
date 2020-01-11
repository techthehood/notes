  import Blanket from '../elements/blanket';
  import Box from '../elements/Box';
  import List_li from './templates/list_li';
  import Ul_list from './templates/ul_list';
  import AWrapr from './templates/aWrapr';
  import Info_icon from './templates/info_icon';
  import Info_text from './templates/info_text';
  import List_options_btn from './templates/list_options_btn';
  import Sort_options_btn from './templates/sort_options_btn';
  import Drop_option from './templates/drop_option';
  import Sort_option from './templates/sort_option';
  import Navbk_option from './templates/navbk_option';
  import Portal_option from './templates/portal_option';
  import Attach_option from './templates/attach_option';
  import Bkmk_option from './templates/bkmk_option';
  import Edit_option from './templates/edit_option';
  import Delete_option from './templates/delete_option';
  import Check_option from './templates/check_option';
  import Jump_option from './templates/jump_option';
  import Test_option from './templates/test_option';




  console.log("ReactListItems running!");
  const d3_sC = require('../data/sort_category.js');
  const dropView = require('../data/drop_view.js');
  const {open_folder} = require('../navigation/open_folder.js');
  const navBack = require('../navigation/nav_back.js');
  const removeSomething = require('../tools/remove_something.js');
  const valueChecker = require('../tools/value_checker.js');
  const addBookmark= require('../bookmark/add_bookmark.js');
  const form = require('../form/form.js');
  const d3_upload = require('../upload.js');
  const loadBookmark = require('../bookmark/load_bookmark.js');
  const d3_http = require('../http.js');
  const formReset = require('../form/form_reset.js');
  const triggerMove = require('../attach_move/trigger_move.js');
  const {set_hold_mode} = require('../attach_move/set_hold_mode.js');
  const {attach_data} = require('../attach_move/attach_data.js');
  const clearMove = require('../attach_move/clear_move.js');
  const {view_li_details} = require('../details/view_li_details.js');
  const {erase_bookmarks} = require('../bookmark/erase_bookmarks.js');
  const {is_mobile_device} = require('../tools/is_mobile_device.js');

  export default class ReactListItems extends React.Component {
    constructor(props){
      super(props);
      this.state = {}
    }// constructor


    componentDidMount = () => {
      //this section is for setting up initial values just after page is rendered
      console.log("active component is ready to roll!");
      console.log(`available data = ${this.props.data}`);

      this.prep_vars(this.props.data);

    }//componentDidMount

    prep_vars = (vObj) => {

      let prep = {};//prep_object
      prep.app_state = vObj.state;
      prep.ul_id = vObj.id;
      prep.category_array = vObj.cat_array;
      prep.my_info_data_key = vObj.key_array;//also indicates original display category
      prep.view_icon_switch = vObj.icon_switch;
      prep.binder = vObj.binder || 0;
      prep.view_prefix = vObj.view_prefix;
      prep.view_orient = (vObj.view_prefix == "arc_" || vObj.view_prefix == "arc") ? "main" : "alt";
      prep.check_mode = vObj.check_mode;
      prep.folder_mode = (vObj.check_mode == "true") ? "alt" : "main";
      prep.par_data_id = vObj.par_data_id;
      prep.par_ancestor = vObj.par_ancestor;
      prep.par_category = vObj.par_category;
      prep.par_admin = vObj.par_admin;
      prep.action = vObj.action;
      prep.has_admin_element = "false";//looks deprecated
      prep.admin_ancestor = vObj.tab.ancestor;
      prep.admin_category = unescape(vObj.tab.category);

      this.setState({...prep});

      return;

    }//prep_vars

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now


    }//componentDidUpdate



    render() {
      // enter logic here

            //idk if i still need this
            let s = this.state;
            let list_elements = null;

      if(s.app_state){

            let category_array = (s.app_state.data_mode != "full") ? d3_sC.sort_category(s.category_array) : s.category_array;

            //use this space to order the category
            let dummy_tVar;

            list_elements = category_array.reduce( (result,target_data,ndx) =>
            {
              // let target_data = category_array[tVar.x];
              let tVar = {};
              tVar.s = this.state;
              tVar.curr_category = (s.app_state.data_mode != "full") ? unescape(target_data.category) : "";
              tVar.x = ndx;
              tVar.binder = s.binder;
              tVar.myIn_id = target_data.data_id || "";//.id
              tVar.view_prefix = s.view_prefix;
              tVar.target_data = target_data;
              tVar.check_mode = s.check_mode;

              // var in_bkmk_array = valueChecker.value_checker({"array":s.app_state.bkmk_targ_ids,"string":tVar.myIn_id,"mod":"index","type":"sna"});

              tVar.bkmk_targ_class = "";
              //moved to get.js .then after display_my_info
              // if(in_bkmk_array[0]  != -1) {
              //
              //   //i think this takes it out of the array here.
              //   s.app_state.bkmk_targ_ids.splice(in_bkmk_array[0],1);
              //   bkmk_targ_class = " bkmk_targ ";
              // }else {
              //   bkmk_targ_class = "";
              // }//end else

              tVar.data1;
              tVar.data2;
              tVar.data3;
              tVar.myIn_user_id = target_data.user_id || "";
              tVar.empty_text = "update your data";//"empty"
              tVar.myIn_type = (target_data.type != undefined && target_data.type != "") ? target_data.type : "";
              tVar.myIn_data_type = (target_data.data_type != undefined && target_data.data_type != "") ? target_data.data_type : "";
              tVar.myIn_ancestor = (target_data.ancestor != undefined && target_data.ancestor != "") ? target_data.ancestor : folder_data[folder_mode].current.ancestor;
              tVar.myIn_core = (target_data.core_data != undefined && target_data.core_data != "") ? target_data.core_data : tVar.empty_text;//*need
              tVar.myIn_title = (target_data.title_data != undefined && target_data.title_data != "") ? target_data.title_data : tVar.empty_text;
              tVar.myIn_category = (target_data.category != undefined && target_data.category != "") ? target_data.category : tVar.empty_text;
              tVar.myIn_desc = (target_data.desc_data != undefined && target_data.desc_data != "") ? target_data.desc_data : tVar.empty_text;
              tVar.myIn_other = (target_data.other_data != undefined && target_data.other_data != "") ? target_data.other_data : tVar.empty_text;
              tVar.myIn_notes = (target_data.note_data != undefined && target_data.note_data != "") ? target_data.note_data : tVar.empty_text;
              tVar.myIn_tag = (target_data.tag_data != undefined && target_data.tag_data != "") ? target_data.tag_data : tVar.empty_text;
              tVar.no_disc = (target_data.picture == "") ? "" : "ui-nodisc-icon";
              tVar.myIn_created = target_data.created || "";
              tVar.my_date = new Date(tVar.myIn_created);
              tVar.slash_date = tVar.my_date.toLocaleString();
              tVar.abbrev_date = tVar.my_date.toString();
              tVar.myIn_modified = target_data.modified || "";
              tVar.myIn_extra = target_data.extra || "";
              tVar.myIn_json = JSON.stringify(target_data);//*need - data_str
              // tVar.myIn_filter = target_data.filter || "alpha";
              tVar.myIn_pNbr = target_data.published || "0";
              tVar.myIn_assoc = target_data.info_ids || "";
              tVar.myIn_collect_txt = (tVar.myIn_assoc != "")? "collection" : "";
              tVar.myIn_picture = (target_data.picture != undefined && target_data.picture != "") ? target_data.picture : (tVar.myIn_data_type == "folder") ? "folder" : "";

              //icons have 3 phases the 3rd fallback phase is set up near line 1736 view_icon_switch
              //this section is the secondary phase and the first is the db picture column
              tVar.alt_icon_str = (tVar.myIn_type == "media") ? tVar.myIn_data_type : tVar.my_info_data_key;//use media's data_type
              tVar.alt_icon = s.app_state.icon_finder(tVar.alt_icon_str);
              tVar.myIn_admin = parseInt(target_data.admin,10);
              tVar.is_container = target_data.container || "0";
              tVar.myIn_collection = (tVar.myIn_assoc != "" || parseInt(tVar.is_container) != 0 ) ? "true" : "false";
              tVar.admin_ancestor = s.admin_ancestor;
              tVar.admin_category = s.admin_category;
              //i may not need the tVar.myIn_desc code for tVar.is_admin_data but for now its in there
              //tVar.is_admin_data = (check_mode == "true" && tVar.myIn_data_type == "fldr" && tVar.curr_category == s.par_category && tVar.myIn_desc == tVar.curr_category && tVar.myIn_admin == parseInt(1) ||
              //check_mode != "true" && tVar.myIn_data_type == "fldr" && tVar.curr_category == my_info_data_key && tVar.myIn_desc == my_info_data_key  && tVar.myIn_admin == parseInt(1)) ? "true" : "false";
              tVar.is_admin_data = (tVar.myIn_data_type == "tab" && tVar.myIn_admin == parseInt(1,10)) ? "true" : "false";//use "category" to disable
              //tVar.is_native_data = (tVar.curr_category == s.par_category && par_admin == "true") ? "true" : "false";//tVar.is_attachment may be better
              tVar.is_native_data;
              tVar.is_attachment;
              if(s.app_state.data_mode == "full"){
                tVar.is_native_data = (tVar.myIn_ancestor == s.admin_ancestor) ? "true" : "false";
                tVar.is_attachment = (tVar.myIn_ancestor == s.admin_ancestor) ? "false" : "true";
              }else {
                tVar.is_native_data = (tVar.myIn_ancestor == s.admin_ancestor && tVar.curr_category.toLowerCase() == tVar.admin_category.toLowerCase()) ? "true" : "false";
                tVar.is_attachment = (tVar.myIn_ancestor == s.admin_ancestor && tVar.curr_category.toLowerCase() == tVar.admin_category.toLowerCase()) ? "false" : "true";
              }//else


              tVar.dd_icon = (tVar.is_attachment == "true") ? "attach" : "options_dk";
              tVar.is_par_folder = (tVar.s.app_state.data_mode != "full" && s.par_ancestor == tVar.admin_ancestor && s.par_category.toLowerCase() == tVar.admin_category.toLowerCase()
              || tVar.s.app_state.data_mode == "full" && s.par_ancestor == tVar.admin_ancestor) ? "true" : "false";

              tVar.admin_class = (tVar.is_admin_data == "true") ? "bigBoi category" : "";
              if(tVar.alt_icon[0] == "none" || tVar.alt_icon[0] == undefined)
              {
                //tVar.li_icon_switch = (action == "none") ? s.app_state.display_data : (action == "info") ? "contact" : action;
                tVar.alt_icon = [s.view_icon_switch];//"contact_chk"
              }
              tVar.user_icon = (tVar.myIn_picture != undefined && tVar.myIn_picture != "") ? tVar.myIn_picture : tVar.alt_icon[0];//*need - what are we saving in picture that can actually be an icon?
              //tVar.myIn_icon = (tVar.myIn_collection == "true") ? "collection" : tVar.user_icon;//final icon

              tVar.myIn_icon = tVar.user_icon;//i want to use the original icon - no more collection icon here
              tVar.myIn_icon = (tVar.is_admin_data == "true") ? "collection" : tVar.myIn_icon;//ok do a admin collection
              tVar.myIn_icon_class = (tVar.myIn_data_type == "activity") ? tVar.myIn_core : "";


              //console.log("tVar.myIn_pNbr = ",tVar.myIn_pNbr);
              tVar.myIn_published = (tVar.myIn_pNbr == "0") ? "unpublished" : "published";
              tVar.display_order_value = (tVar.myIn_data_type == "folder" && tVar.myIn_admin != 1) ? tVar.myIn_data_type : tVar.curr_category;


              tVar.test_class = (tVar.myIn_collection == "true" || tVar.myIn_data_type == "tab" || tVar.myIn_data_type == "folder") ? " arc_collection " : "";//NOTE  i could make a separate class for folders
              tVar.collect_class = tVar.test_class;
              //add to the tVar.collect_class variable to customize the display
              tVar.collect_class += (tVar.myIn_data_type == "tab") ? " arc_tab " : (tVar.myIn_data_type == "folder") ? " arc_folder " : "";

                // if im in full mode get rid of all the admin anchors/tabs
                if(s.app_state.data_mode == "full" && tVar.myIn_admin == parseInt(1,10)){ return result; };

                // only show collections in chk mode (now only if data_mode != "full")
                if(s.app_state.data_mode != "full" && s.app_state.move_mode == "true" && tVar.test_class != " arc_collection " && s.view_prefix != "arc_"){return result;};

                //filter attachment mode for admin anchors
                tVar.attach_mode = (s.app_state.move_mode == "true" && s.app_state.move_type == "attach") ? "true" : "false";
                tVar.is_native_admin = (tVar.is_admin_data == "true" && tVar.is_native_data == "true") ? "true" : "false";


                //added to phase out admin folders - deprecated
                //try it again
                //if(tVar.myIn_data_type == "folder" && tVar.myIn_admin == 1)return false;

              switch(tVar.display_order_value){

                //standar display section
                case "favorite apps":
                case "email":
                case "notification":
                case "name":
                case "phone":
                case "social community":
                //whatever isn't good goes up here
                  tVar.data1 = unescape(s.app_state.htmlDecode(tVar.myIn_core));
                  tVar.data2 = unescape(s.app_state.htmlDecode(tVar.myIn_title));
                  tVar.data3 = unescape(s.app_state.htmlDecode(tVar.myIn_other));
                  //DONE:10 add social community to standard display section
                break;
                /*# 	case "apps":
                //# 	case "article":
                //# 	case "blog":
                //# 	case "picture":
                //## 	case "music":
                //# 	case "social network":
                //# 	case "video":
                //# 	case "website":*/

                //dynamic display section
                default:
                  tVar.data1 = unescape(s.app_state.htmlDecode(tVar.myIn_title));
                  tVar.data2 = unescape(s.app_state.htmlDecode(tVar.myIn_core));
                  tVar.data3 = unescape(s.app_state.htmlDecode(tVar.myIn_other));
                break;
              }//switch

              let list_option_btn = null, drop_option_menu = null, navbk_option_menu = null;
              let key_str = `${tVar.binder}_${tVar.myIn_id}`

              dummy_tVar = {...tVar};

            result.push(<List_li tVar={tVar} >
                          <AWrapr tVar={tVar} >
                            <Info_icon tVar={tVar} />
                            <Info_text tVar={tVar} />
                            <List_options_btn tVar={tVar} />
                            <Sort_options_btn tVar={tVar} />
                            <Check_option tVar={tVar} />
                          </AWrapr>
                          <Drop_option tVar={tVar} key={`dropMen_${key_str}`} >
                            <Test_option tVar={tVar} key={`tstOpt_${key_str}`} />
                            <Navbk_option tVar={tVar} key={`navbkOpt_${key_str}`} />
                            <Portal_option tVar={tVar} key={`portOpt_${key_str}`} />
                            <Attach_option tVar={tVar} key={`atchOpt_${key_str}`} />
                            <Bkmk_option tVar={tVar}  key={`bkmkOpt_${key_str}`} />
                            <Edit_option tVar={tVar} key={`editOpt_${key_str}`} />
                            <Delete_option tVar={tVar} key={`delOpt_${key_str}`} />
                          </Drop_option>
                          <Sort_option tVar={tVar} >
                            <Jump_option tVar={tVar} mode="top" key={`jump_top_${key_str}`} />
                            <Jump_option tVar={tVar} mode="up" key={`jump_up_${key_str}`} />
                            <Jump_option tVar={tVar} mode="down" key={`jump_down_${key_str}`} />
                            <Jump_option tVar={tVar} mode="bottom" key={`jump_bottom_${key_str}`} />
                          </Sort_option>
                        </List_li>);

            return result;

          },[]);//end li for
          console.log("list_elements = ",list_elements);

            let ul_obj = (list_elements != null) ?
            (
              <Ul_list tVar={dummy_tVar} >
                {list_elements}
              </Ul_list>
            )
            : null;

          return(
            <Blanket>
              {ul_obj}
            </Blanket>
          );

      }else{

        return null;

      }//else

    }// render

  }// Actions
