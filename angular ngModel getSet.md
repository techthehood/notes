
USING NG-MODEL gETTERsETTER

HTLM
        <label class="tHead_label green">Text Heading</label>
		
          <input type="text" id="tHead_input" class="tHead_input red" placeholder="enter a heading..."
          ng-model="show.setHead" ng-model-options="{ getterSetter: true }" />

WATCH VARIABLES
    <p>title {{scene.title}}</p>
    <p>image url {{scene.url}}</p>
    <p>text {{scene.tBody}}</p>
    <p>valid {{showForm.$valid}}</p>
    <p>tHead {{scene.tHead}}</p>


APP.JS

PARENT CONTROLLER

	this.message = function(message,data){
		$scope.$broadcast(message,data);//'sendText'
	}//end message
  
    var _tHead = "";
    this.setHead = function(newHead){
      if(arguments.length){
        showCtrlr.message('set_txt_heading',newHead);
      };
      return arguments.length ? (_tHead = newHead) : _tHead;
    }
  
  NOTE:
  //it needs the argument.length verifier because this continues to fire a few times even after it is called and seems to process multiple times.
  if(arguments.length){
        showCtrlr.message('set_txt_heading',newHead);
      };
      return arguments.length ? (_tHead = newHead) : _tHead;

SCENE CONTROLLER
  var sceneCtrlr = this;
  this.url = "youknow.com";
  this.tHead = "";
  this.tBody = "";
  this.tLink = "";
  this.tBody = {};
  this.addScene = function(){

  $scope.$on('set_txt_heading',function(event,data){
    sceneCtrlr.tHead = (data != undefined) ? data : sceneCtrlr.tHead;//document.querySelector(".tHead_input").value
  });
  
  NOTE:
  <input type="url" id="link_title" class="link_title_input build_form " ng-focus="form.onTextClick($event)" placeholder="add an image link..." ng-change="form.set_img_preview(scene.ShowData.url)" ng-model="scene.ShowData.url" ng-class="{'w3-disabled':form.isReady}"
  value="{{scene.ShowData.url}}" required />
  
  //i used this with an ng-change and it doesn't update when the value is different.  i need to use ng-model getterSetter