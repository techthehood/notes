# web worker notes

original sample from aliintro default.php template
```
window['WKR_URL'] = "<?php echo JUri::root(); ?>components/com_aliintro/xfiles/js/alicleaner_site.js";

if (typeof(ali_wkr) == "undefined") {
    /*this doesn't work
  //ali_wkr = new Worker("alicleaner_site.js");
  //thislooks for it here https://yoursite.com/index.php/alight/alicleaner_site.js
  */

  //try this instead
  ali_wkr = new Worker(WKR_URL);
  ali_wkr.postMessage({'form_token':FORM_TOKEN});

  ali_wkr.onmessage = function(event){
    //console.info('PostMessage = ' + event.data);
    if(event.data == "wkr complete"){
      ali_wkr.terminate();
      ali_wkr = undefined;
      //console.info("web worker script finished");
    }
  };
}//end if typeof
```

alicleaner_site.js
```
//clean up localStorage where date is past now();
//clean up gps_cnx - done server side
//clean up pairing - done server side
//TODO:30 - needs something to delete guest localStorage expired transactions
var FORM_TOKEN = "";
var HOST_PREFIX = "";

onmessage = function(e) {
  postMessage('Message received from main script');
  //var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  //console.log(e.data);

  if(e.data.form_token){
    //console.info("the message = " + e.data.form_token);
    FORM_TOKEN = e.data.form_token;
    start_cleanups();
  }//end if


}//end onmessage

function start_cleanups(){

  var ali_clean_gps_cnx = new Promise(function(resolve,reject){

    //console.info("gps cleanup is happening");
    postMessage("gps cleanup is happening");

    //origin returns https://yoursite.com - no folders
    postMessage(" origin " + location.origin);

    //hostname returns only yoursite.com
    postMessage(" hostname " + location.hostname);

    //returns first directory to the location of this file - no index.php
    postMessage(" pathname " + location.pathname);
    //called from default in views > aliintros > tmpl > default
    //ajax calls getFakeData in aliintro controller.php

    var pathVar = location.pathname;
    var pathArray = pathVar.split("components");

    HOST_PREFIX = location.origin + pathArray[0];
    postMessage("host_prefix = " + HOST_PREFIX)

    postMessage("now = " + Date.now());

    //alert("module id = " + mId);
    //console.info("form token = " + FORM_TOKEN);
    var form_Token = FORM_TOKEN;
    var cleanData = {};
    // var ctrl_Url = HOST_PREFIX + "index.php?option=com_aliintro&task=dataCleanUp&format=raw&" +  FORM_TOKEN + "=1";//this works
    var ctrl_Url = "index.php?option=com_aliintro&task=dataCleanUp&format=raw&" +  FORM_TOKEN + "=1";//this works
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        postMessage("ali_cleanup return value " + this.responseText);

      }//end if
    };
    xmlhttp.open("GET",ctrl_Url, true);
    xmlhttp.send();

    /*
    $(document).ready(function()
    {
       //alert("getMenuData running!");
       $.ajax(
       {

      url:ctrl_Url,
      data:cleanData,
      type:'POST',
         success:function(result)
         {
           //alert("Ajax test result data = " + result);//string
          postMessage(" return value " + result);

          //var makeMenu = new menuMaker(result);
          //makeMenu.display();
           resolve();
        }

      })
    })//end ajax
    */


    //resolve();


  });

  ali_clean_gps_cnx.then(function(){
    ali_clean_pairs();
  }).catch(function(e){
    postMessage("failed promise");
    postMessage(e.message);
    postMessage("wkr complete");
  });

  function ali_clean_pairs()
  {
      //console.info("pairs are clean");
      postMessage("pairs are clean");
      postMessage("wkr complete");

  }//end ali_clean_pairs

}//end start cleanups


```

### webpack webworker
[worker-loader plugin](https://webpack.js.org/loaders/worker-loader/)
[Getting Started with Web Workers via Webpack](https://www.experoinc.com/post/getting-started-with-web-workers-via-webpack)
[Simple Web Workers workflow with webpack](https://viblo.asia/p/simple-web-workers-workflow-with-webpack-3P0lPkobZox)
[Webpack web-workers loader not working](https://stackoverflow.com/questions/35802868/webpack-web-workers-loader-not-working)
load the plugin
```
npm install worker-loader --save-dev
```
**installing worker-loader is required**
>if you have the worker-loader at the root package.json and node_modules folder you don't need to add it to the subdirectory package.json files

import the worker
```
import MyWorker from "worker!./file.js"
```

other attempts
```
// import d3Worker from "worker-loader!./lib/worker";
// const d3Worker = require("worker-loader!./lib/worker.js");
// const d3Worker = require("worker-loader?name=worker.js!./lib/worker");

```

[worker-loader inline] mode(https://www.w3cschool.cn/doc_webpack/webpack-loaders-worker-loader.html)

working import
```
const d3Worker = require("worker-loader?inline&name=worker.js!./lib/worker");
```
**inline was needed to make it work**

activate the worker
```
document.addEventListener('DOMContentLoaded', function () {

	let w = new d3Worker();
	w.postMessage('ping');
	w.onmessage = (event) => {
	  console.log(event.data);
	};

});
```
[public path hack](https://github.com/webpack-contrib/worker-loader/issues/26)
```
__webpack_public_path__ = '/js/dist/';
```

web workers can pass any type of data - they can use JSON objects too
```
  let w = new d3Worker();
	w.postMessage({task:"test"});
```

**web workers can use indexedDB**
>But you can use a large number of items available under window, including WebSockets, and data storage mechanisms like IndexedDB and the Firefox OS-only Data Store API. See Functions and classes available to workers for more details.   

#### the key is to make an instance of the inline worker-loader
```
  let w = new d3Worker();
```


#### [Object Object] could not be cloned
>[workHorse] error  DOMException: Failed to execute 'postMessage' on 'Worker': [object Object] could not be cloned.
    at edit_data


```
  let update_data = stringMe(state.modify_data.target_data[target_id]);// solves the [Object, Object] cannot be cloned issue
```

stringMe.js
```
  export const stringMe = function (ref_obj, objectify) {

    /**** experimental = clears circular structure ****/
    let cache = [];
     let ret_var = JSON.stringify(ref_obj, function(key, value) {
         if (typeof value === 'object' && value !== null) {
               if (cache.indexOf(value) !== -1) {
                   // Duplicate reference found
                   try {
                       // If this value does not reference a parent it can be deduped
                       return JSON.parse(JSON.stringify(value));
                   } catch (error) {
                       // discard key if value cannot be deduped
                       return;
                   }
                }
               // Store value in our collection
               cache.push(value);
           }// if
           return value;
       });
     cache = null;// Enable garbage collection
     /**** experimental = clears circular structure ****/

     if(objectify){
       return JSON.parse(ret_var);
     }else{

       return ret_var;
     }

  }// string_me
```
