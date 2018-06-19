##My Codepen
[my drag and drop codepen](https://codepen.io/inspectaTech/pen/zEMweq?editors=0010)
##HTML SECTION
```

<div class="_cont" >
 
    <div id="mov1" class="mov dropzone mov1" draggable="true">line 1</div>
    
    <div id="mov2" class="mov dropzone mov2" draggable="true">line 2</div>
    
    <div id="mov3" class="mov dropzone mov3"draggable="true">line 3</div>
    
    <div id="mov4" class="mov dropzone mov4"draggable="true">line 4</div>
    
    <div id="mov5" class="mov dropzone mov5" draggable="true">line 5</div>
    
    <div id="mov6" class="mov dropzone mov6"draggable="true">line 6</div>


</div>
<div class="list_log"></div>

```

##CSS SECTION
```
body{font-size:20px}
._cont,.list_log{
  width:70%;
  height:220px;
  border:1px solid #ccc;
  padding:10px;
  margin:100px auto 0;
}
._cont div{border:1px solid #ccc; padding:5px;
}
.placeMe{width:100%; height:25px; border:1px solid #ccc;}
.ghost{
  opacity:.4;
  width:90%;
  margin:5px auto;
  background-color:blue;
  color:white;
}
div.list_log{
  height:200px !important;
  margin-top:50px !important;
  overflow-y:auto;
  padding-left:20px;
}
```


##JS section:
```
//https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

//https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop

document.addEventListener('DOMContentLoaded', function () {
    /* ... */
    console.log("content loaded running!")
    prep_elements();
});

var last_item = "";
var last_count = 0;
var move_obj;
var list_order = [];

function prep_elements()
{
	//document.querySelector("._cont").addEventListener("dragover",function(event){allowDrop(event)});

  
  let all_divs = document.querySelectorAll(".mov");
  
  for(let b = 0; b < all_divs.length; b++){
  	let cur_div = all_divs[b];
    cur_div.addEventListener("dragstart",function(event){dragstart_handler(event);});
    
    cur_div.addEventListener("dragover",function(event){allowDrop(event);});
    
    cur_div.addEventListener("drop",function(event){drop_handler(event);});
    
    cur_div.addEventListener("dragenter",function(event){dummy(event,"in");});
    
    cur_div.addEventListener("dragleave",function(event){dummy(event,"out");});
    
    cur_div.addEventListener("dragend",function(event){stop_the_press(event);});
    
  
  }//end for
  
  list_report();



}//end prep_elements



function dragstart_handler(ev) {
  // Add the drag data
  if(ev.dataTransfer){
  ev.dataTransfer.setData("text/plain", ev.target.id);
  console.log(ev.target.id);
  move_obj = document.getElementById(ev.target.id);
  move_obj.className += " ghost";
    console.log("move class = ",move_obj.className);
  //img test
    //var img = new Image(); 
  //img.src = 'http://miftyisbored.com/wp-content/uploads/2013/07/autobots-logo-17.jpg'; 
  //ev.dataTransfer.setDragImage(img, 10, 10);//not working
  
    ev.dropEffect = "move";
  }//end if
}//end dragstart_handler

function allowDrop(ev) {
    ev.preventDefault();
  if(ev.dataTransfer){
     ev.dataTransfer.dropEffect = "move";
  }//end if
}//end allowDrop

function drop_handler(ev) {
 ev.preventDefault();
    console.log("drop recognized");
 // Get the id of the target and add the moved element to the target's DOM
 var data = ev.dataTransfer.getData("text");
 let mover = document.getElementById(data);
 let targEl = ev.target;
 
  //console.log("dropable = ",targEl.)

  placeItem(ev,targEl,mover);
  move_obj.className = move_obj.className.replace(" ghost","");
  //removeItem(ev,targEl,"drop");
  //ev.target.appendChild(document.getElementById(data));
  console.log("move class = ",move_obj.className);
  list_report();
}//end drop_handler

function dummy(ev,str){
  ev.preventDefault();
  let targEl = ev.target;
  console.log("my id = ",targEl.id);
  
  let data = ev.dataTransfer.getData("text");
  let mover = document.getElementById(data);

  
  switch(str)
    {
      case "in":
        
        console.log("place in");
        let placeHolder = document.createElement("div");
        placeHolder.className = "placeMe";
        placeHolder.id = "place" + last_count;
        last_count++;
        

        
        placeItem(ev,targEl,move_obj);
        
      break;
      case "out":
        console.log("place out");
        //removeItem(ev,targEl);
       
      break;
    }
}//end dummy

	function placeItem(ev,targEl,mover)
	{
	let sibling = targEl.nextSibling;
	let bigDaddy = targEl.parentNode;
	if(targEl != bigDaddy.firstChild || targEl != bigDaddy.lastChild ){
	  bigDaddy.insertBefore(mover,sibling);
	}else if(mover != targEl){
	  bigDaddy.insertBefore(mover,targEl);
	}
	}//end placeItem

function removeItem(ev,targEl,mod){
   let every_place = document.querySelectorAll(".placeMe");
  let mode = mod || "none";
  for(let p = 0; p <  every_place.length; p++){
    let out_of_place = every_place[p];
    let biggie = targEl.parentNode;
    if(mode == "drop" || out_of_place.id != "place" + last_count){
    console.log("oop id = ",out_of_place.id);
      biggie.removeChild(out_of_place);
    }
  }//end for
}//end removeItem

function list_report()
{
  let every_place = document.querySelectorAll(".mov");
  list_order = [];
  for(let r = 0;r < every_place.length;r++)
  {
    list_order.push(every_place[r].id);
  }//end for
  
  console.log("list order =",list_order);
  document.querySelector(".list_log").innerHTML = "<p>" + list_order + "</p>" +  document.querySelector(".list_log").innerHTML;
}//end list_report

function stop_the_press(ev)
{
    ev.target.className = move_obj.className.replace(" ghost","");
}//end stop_the_press

```

updated place item


child node interferance

```
[child node interferance](https://stackoverflow.com/questions/12509602/html5-is-there-a-way-to-prevent-children-interfering-with-drag-events)

```

this.drop_handler = function(ev) {
       ev.preventDefault();
          //console.log("drop recognized");
       // Get the id of the target and add the moved element to the target's DOM
       var data = ev.dataTransfer.getData("text");
       let mover = document.getElementById(data);
	   
	   //this prevents childnode from becoming the target
       let targEl = boss.drop_target(ev.target);
	   
	   ...
	   
	   //drop_target script
	   
	  this.drop_target = function(targ)
      {
        let current_el = targ;
        let lvl = 5;
        while(current_el && lvl > 0){

          if(current_el.dataset.moving != undefined) return current_el;

          current_el = current_el.parentNode;
          lvl --;
        }//end while

        return current_el;
		
      }//drop_target
	  
	  //also applied to the dummy
	  
	   this.dummy = function(ev,str){
        ev.preventDefault();
        let targEl =  boss.drop_target(ev.target);
        //console.log("my id = ",targEl.id);
		
		...
	  
```

variations of place item

``` 
//somewhat of a disaster on conflicting/similar containers but it may work well by itself or where you didn't cookie cut clones
      /*
        if(mover == younger){
          bigDaddy.insertBefore(mover,targEl);
        }else if(mover == older && targEl != bigDaddy.lastElementChild){
          bigDaddy.insertBefore(mover,younger);
        }else if(targEl == bigDaddy.lastElementChild && mover == older){
          /*bigDaddy.appendChild(mover);*//* bigDaddy.insertBefore(targEl,mover);
        }else if(targEl != bigDaddy.lastElementChild){
          bigDaddy.insertBefore(mover,younger);
        }else if(targEl == bigDaddy.lastElementChild){
          /*bigDaddy.appendChild(mover);*//* bigDaddy.insertBefore(targEl,mover);
        }*/

```

simplist and most effective - doesn't work on the top most item

```

        if(targEl != bigDaddy.firstElemetChild || targEl != bigDaddy.lastElementChild ){
          bigDaddy.insertBefore(mover,younger);
        }else if(mover != targEl){
          bigDaddy.insertBefore(mover,targEl);
        }
		
```

another workable section - works with top item, probably good for single use

```

      this.placeItem = function(ev,targEl,mover)
      {
		
		let younger = targEl.nextElementSibling;
        let older = targEl.previousElementSibling;

        let moving = targEl.dataset.moving;
        let bigDaddy = targEl.parentNode;
        //if(bigDaddy.className.indexOf(`${moving}_dropzone`) == -1) return;
        if(bigDaddy.className.indexOf(`${orderCtrlr.mode}_dropzone`) == -1) return;

        if(mover == younger){
          bigDaddy.insertBefore(mover,targEl);
        }else if(mover == older && targEl != bigDaddy.lastElementChild){
          bigDaddy.insertBefore(mover,younger);
        }else if(targEl == bigDaddy.lastElementChild && mover == older){
          bigDaddy.appendChild(mover);
        }
		
```

[clear data](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/clearData)

```

	event.dataTransfer.clearData();

    // Set the drag's format and data (use event target's id for data)
    event.dataTransfer.setData('text/plain', event.target.id);
```
