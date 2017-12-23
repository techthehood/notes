
//$http service - adding paths
$http.post("google.com");
//result - http://localhost/Joomla/administrator/google.com

$http.post("/google.com");
//result - http://localhost/google.com

$http.post('https://google.com')
//result - a regular absolute path

are regular js variables available in the angular controller
console.log(FORM_TOKEN); // this worked so yes
console.log(SITEURL);//works - http://localhost/Joomla/administrator/index.php


Sample service i built
app.service("ShowData",['$http',function($http){

  var show = this;
  console.log("showData running!");
  this.updateShowData = async function(){

    let form_token = FORM_TOKEN;
    let urlMod = "ps_add";
    let site_url = "index.php?option=com_psmod&task=" + urlMod + "&format=raw&" + form_token + "=1";


    //this $http version sucks using Joomla's post method - needs way too many other configurations (hacks)
    await $http.post(site_url,{data:'{"some_json":"string"}'}).then((result)=>{
      //in angular result is the retured json data - whatever you name it
        console.log("result = ",result.data);
    });//ok so i can add absolute paths
    //works with JInput json


     /*
     await $http({ method: "POST", url: site_url, data: { "projectID":"no quotes","name":"blah","isFavorite":"false" } })
     .then((result)=>{
       //in angular result is the retured json data - whatever you name it
         console.log("result = ",result.data);
     });//this works
     */

      await console.log("updateShowData running! ",SITEURL);
      await console.log("1. base = ",BASEURL);
      console.log("2. ROOT = ",ROOTURL);
      //throw new Error("some error is thrown");
      return "finished";

  };//end updateShowData


}]);//end service "ShowData"

used in a controller
app.controller('ShowController',["ShowData",function(ShowData){
//show data between the brackets is not a string its the actual variable/parameter
  this.testVar = "running the show.";

  this.stg = true;
  this.bldr = false;
  this.tab = "build";
  this.preview = 0;
  this.on = false;
  this.title = document.querySelector(".inputbox").value;
  this.scene_data = [];
  this.show_editor = 0;
  console.log("tab = ",this.tab);

  //try to get the show data and store it in the custom shared service
  //this gets data from db and stores it in a variable - needs to be thenable
  ShowData.updateShowData().then(function(data){
    console.log("then data is ", data);
    //here you would take the data and andd it to the view

  }).catch(function(err){
    console.log("catch error found ",err);
  });
  
  ...//more component script here....