
started with a link and switched to folder created a problem with php parsing json
```
folder
arc_input:"{"mod":"move","parent_str":"{\"id\":\"6764\",\"data_id\":\"m-6764\",\"type\":\"media\",\"data_type\":\"folder\",\"user_id\":\"630\",\"category\":\"website%20themes\",\"ancestor\":\"m-1000\",\"core_data\":\"standard\",\"desc_data\":\"website%20themes\",\"other_data\":\"\",\"note_data\":\"\",\"tag_data\":\"\",\"meta_data\":\"{&quot;title&quot;:&quot;No%20preview%20available&quot;}\",\"task_data\":\"\",\"created\":\"2018-12-03 17:15:03\",\"modified\":\"1543878903000\",\"picture\":\"\",\"published\":\"1\",\"extra\":\"\",\"admin\":\"0\",\"container\":\"1\",\"order\":\"0\",\"move_type\":\"move\"}","move_ids":"m-6766","display_data":"media","ancestor":"m-1000"}"


tab
arc_input:"{"mod":"move","parent_str":"{\"id\":\"6765\",\"data_id\":\"m-6765\",\"type\":\"media\",\"data_type\":\"tab\",\"user_id\":\"630\",\"category\":\"website%20themes\",\"ancestor\":\"m-6764\",\"core_data\":\"tab\",\"desc_data\":\"website%20themes\",\"other_data\":\"\",\"note_data\":\"\",\"tag_data\":\"\",\"meta_data\":\"\",\"task_data\":\"\",\"created\":\"2018-12-03 17:15:03\",\"modified\":\"1543878903000\",\"picture\":\"folder\",\"published\":\"0\",\"extra\":\"\",\"admin\":\"1\",\"container\":\"0\",\"order\":\"0\",\"help_data\":\"ancestor recieved : m-6764 \",\"move_type\":\"move\"}","move_ids":"m-6766","display_data":"media","ancestor":"m-6764"}"
```
**there is something about this meta_data and using php json_decode that breaks the json.**
