
(function(){
  var app = angular.module("pictureShow");


    app.controller("ColorController",["ShowData","$sce","$scope",function(ShowData,$sce,$scope){
      //console.log("tool js running!");
      var boss = this;
      this.toolData = ShowData.toolData;
      this.object_details = [];
      this.object_elements = {};
      boss.initiated = true;

      /*
      $scope.$watch(function(){return ShowData.toolData}, function (newValue, oldValue, scope) {
        //Do anything with $scope.letters
        //console.log("newValue = ",newValue);

        boss.toolData = newValue;
      }, true);
      */

      this.$onInit = function() {
        //in here i can run $timouts, watchers and $timouts inside of watchers
        $timeout(function(){
           //console.log("post Digest with $timeout");
           boss.initiated = true;

        },0,true).then(function(){

        });//end .then() of $timeout
      };//$oninit


      this.me_seeks= function(data)
      {
        boss;
        if(data != undefined)
        {
          console.log("here comes data",data);
        }
        let tVar = data || "";
        console.log("im working",tVar);
        return true;

      }//me_seeks


    }]);//colorController
})();
