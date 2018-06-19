notes to clone assets.js as a template

	see also 
	mN_create_new_psmod_template - overview of changes to make to tool_templates
	bp_angularjs_templateUrl_function.md - notes and breakdown of critical fns
	mN_psmod_components_and_template_docs.md - for admin input templates

	rename files
	assets.js
	assets_dir.js
	assets.html

	//note: use dot notation on file names instead of underscores
	newname.js
	newname.dir.js
	newname.html

	
	### name.dir.js  
	change the directive name
	app.directive("displayAssets",function(){

	to 
	app.directive("newName",function(){

	//change the templateUrl
	templateUrl:BASEURL + "components/com_psmod/xfiles/js/assets.html",
	to 
	templateUrl:BASEURL + "components/com_psmod/xfiles/js/newNames.html",
	
	//change the controller name in the directive
	controller:"AssetController",
	to
	controller:"NewnameController",
	
	### name.js
	//change the controller name
	app.controller("AssetController",["ShowData","$sce","$scope",function(ShowData,$sce,$scope){
	to 
	app.controller("NewnameController",["ShowData","$sce","$scope",function(ShowData,$sce,$scope){
	
	find and replace all capital letter references of 'Asset'
	find and replace all the lowercase letter references
	
	### assets.html
	find and replace all capital letter references of 'Asset'
	find and replace all the lowercase letter references

	
	### assets.scss
	copy and rename the file to newnames.scss
	find and replace all the lowercase letter references of 'asset'
	
	### view.html.php
	copy and rename css addStyleSheet for assets.css
	    $styleLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/assets.css" : "../core/css/assets.css";
    $fileLink->addStyleSheet($styleLoc);
	
	### data.js
	find copy and rename all references to asset (case sensitive)
	download:
	change getShowData to getNewnameData or use getMenuData (alt)
	change getShowData urlMod variable to ps_getNewname
	
	
	upload:
	saving assets uses scene.js scene.processEntry && 
	service.uploadData();
	
	### controller.php
	download:
	change the function name ps_getData to ps_getNewname
	change the tabel fn too $table->getData(); to $table->getNewname();
	
	upload:
	
	moduleassets.php
	download:
	change function getData to function getNewname
	find and replace all the lowercase letter references of 'asset'
	
	upload:
	
	