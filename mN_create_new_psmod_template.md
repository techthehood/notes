# overview of changes to make to tool_templates

see also 
mN_psmod_components_and_template_docs.md - for admin input templates
bp_angularjs_templateUrl_function.md - notes and breakdown of critical fns
mN_mod_psmod_assets_template - notes to clone assets.js as a template

folder_name
file_name.js
file_name.json

css
file_name.css
file_name.css.map

scss
file_name.scss
file_name.css
file_name.css.map

admin.html
oN_ > nN_
old_name > new_name

old name settings > new name settings

basic.html
oldName_ > newName_
old_name > new_name

file_name.js

directiveName
oldName > newName_
oldName > newName 
directive - if( != "old_name")return; > if( != new_name)

file_name.json
id : 'mM-1'
title : 'new name'
alias : 'new-name'
file_name : 'new_name'

file_name.scss
oN_ > nN_
oldName > newName
old-name > new-name
old_name > new_name

GOTCHAS

tool.js or module.js is identifying the cloned template as the selected one
remember to change the .json tool_id id:"mM-1",

the settings display is a mess - some error in the css
Koala wasn't outputting to the correct folder

when i switch the templates the scopes and watchers are confused - still checking past template

change watcher if( != "old_name")return; to if( != new_name)
if(boss.service.tool.file_name != "blog_module")return;

where is the database data stored?
alias.myStars (boss.myStars)
boss.tool || boss.service.tool
