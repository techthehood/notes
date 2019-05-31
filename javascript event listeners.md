# managing event listeners (garbage collection)
note: i found that my code was adding multiple event listeners to the same object each time the code ref was called.

//so i tried removing the event
```
	move_element.addEventListener(use_event,function()
	{
		// console.log(use_event);
		// console.log(move_timer);
		clearTimeout(move_timer);
		if(hold_mode == false){
			//run details
			view_li_details(e,el,{prefix:"arc"});
		}
		move_element.removeEventListener(use_event,function(){});
		move_timer = "";
	});

```

then i learned that for removing to work i needed an external function

```
	// so i made this adjustment
	move_element.addEventListener(use_event,process_hold.bind(this,{e,move_element,el,state,move_timer,use_event,hold_mode}),{once:true});

	//the external function
	export const process_hold = function(hld_obj)
	{
		//removeEventListener only works with external functions so i had to make this
		let e = hld_obj.e;
		let el = hld_obj.el;//element id
		let move_element = hld_obj.move_element;// the actual element object
		let state = hld_obj.state;
		let move_timer = hld_obj.move_timer;
		let use_event = hld_obj.use_event;
		let hold_mode = hld_obj.hold_mode;

		clearTimeout(move_timer);
		if(hold_mode == false){
			//run details
			state.view_li_details(e,el,{state,prefix:"arc"});
		}
		move_element.removeEventListener(use_event,process_hold);
		move_timer = "";

	}
```

### possibly useful on anonymous function references for removeEventListener
[arguments.callee hint](https://stackoverflow.com/questions/4402287/javascript-remove-event-listener)
[arguments.callee docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee)

hint example
```
	canvas.addEventListener('click', function(event) {
      click++;
      if(click == 50) {
          this.removeEventListener('click',arguments.callee,false);
      }
	  ...

	  // this doesn't work in strict mode

```


then i learned i could use once option and the event would remove itself after use - no need for an external function even though i kept it.
```
// duplicate from above
	move_element.addEventListener(use_event,process_hold.bind(this,{e,move_element,el,state,move_timer,use_event,hold_mode}),{once:true});
```
unfortunately using the once option i may never need to use the arguments.callee method above.

// other code in the experiment

```
    export const set_hold_mode = function(e,el,fn,hdta)
    {
      //e.preventDefault();//prevent default here kills the ability for touch screen scrolling
      let state = hdta.state;
      if(state.sort_mode == "true") return;

			let hold_mode = false;
        //let me_seeks = e;
        var move_element = document.getElementById(el);
        var hold_time = 1000;//1000 = 1sec
        var use_event = (e.constructor.name == "TouchEvent" && "ontouchend" in move_element) ? "touchend" : "mouseup";
        var move_timer = setTimeout(function()
        {
					hold_mode = true;
					fn(e,el,hdta);
					//these below may not be needed but its nice to be thorough
					clearTimeout(move_timer);
					move_timer = "";

          // console.log(use_event);
          // console.log(move_timer);
        }, hold_time);//trigger_move

        //alert("use_event = " + use_event);
				move_element.addEventListener(use_event,process_hold.bind(this,{e,move_element,el,state,move_timer,use_event,hold_mode}),{once:true});

        window.addEventListener(use_event,function(){ clearTimeout(move_timer);},{once:true});
        window.addEventListener("scroll",function(){clearTimeout(move_timer); /*alert("window scroll fireing");*/},{once:true});
        document.getElementById("arc_display").addEventListener("scroll",function(){clearTimeout(move_timer);  /*alert("element scroll fireing");*/},{once:true});

      //console.log("move mode running");
      //alert("move mode running");
      //also connected to view_li_details

    }//end set_hold_mode
```

				// if the admin's icon was clicked do this
				// let icon_click = (e.target.className.indexOf("my_info_icon") != -1 || e.target.className.indexOf("arc_meta_img") != -1) ? true : false;
				// let is_admin = (move_element.dataset.is_admin_data == "true") ? true : false;
				// if(icon_click && is_admin)return;


# removeEventListenervent notes

#### using removeEventListener

[removeEventListener docs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)   
the key to removeEventListener is that the callouts signature be the same.  anonymous functions
have different signatures. they can't be used.  using .bind() also changes the listeners signature. Only binding to a common fn as a variable solves the parameter issue. but if you declare that fn within a fn being called then call the same fn in another instance to remove it the signature is still different.
[using .bind() also changes the listeners signature](https://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind)   
[removeEventListener and this](https://kostasbariotis.com/removeeventlistener-and-this/)   

```
  dummy_fn = function(obj){
  let state = obj.state;
  let declared_bind = target_fn.bind(state,'param');
  let mode = obj.mode;
  switch(mode){
    case "add":
      element.addEventListener('click',declared_bind);    
    break;

    case "remove":
      element.removeEventListener('click',declared_bind);    
    break;
  }
}
```

in the instance above the add and remove are called in different events.  the declared_bind fn in each event instance would produce a different signature because they were created in separate instances of the same fn block.

a solution would be to use onclick
```
  element.onclick = function(){target_fn(state,'param');}

```
the drawback to this would be onclick overwrites other onclick functions and addEventListener doesn't.
[addEventListener vs onclick](https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick)   

[using a named fn without binding works](https://stackoverflow.com/questions/10444077/javascript-removeeventlistener-not-working)   
>in the example above with the switch statements if you take the binding out and use the fn name set from the import/require statement it works.

[no way to inspect attached event listeners yet](https://stackoverflow.com/questions/2623118/inspect-attached-event-handlers-for-any-dom-element)   


# working with 2-n-1 devices
[detect mobile devices](https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript)
```
  if(view_prefix == "arc_" && !is_mobile_device()){
    document.getElementById(mAW_id).addEventListener("touchstart",function(e) {
      set_hold_mode(e,this.id,triggerMove.trigger_move,{state,"title":data1,"prefix":view_prefix});
    });
  }//end if
```
is_mobile_device.js
```
  export const is_mobile_device = function () {

    return (typeof window.orientation !== "undefined") ||
    (navigator.userAgent.indexOf('IEMobile') !== -1);

  }// is_mobile_device

```

### Eureka - i successfully removed a listener of an anonymous fn (semi-anonymous)
```
export const prep_elements = function(obj)
{
	let state = obj.state;

	//...

    let dragEnd_fn = function(e){
      // let fn = this;//fails - this == window
      if(state.sort_mode != "false"){
        drag_end(e,{state,"class":selector_str});
      }else{
        window.removeEventListener("mouseup",dragEnd_fn);//works and successfully removes listener
        window.removeEventListener("touchend",dragEnd_fn, false);
      }
    }//dragEnd_fn

    window.addEventListener("mouseup",dragEnd_fn, false);

    window.addEventListener("touchend",dragEnd_fn, false);

	//...

}// prep_elements
```
**this way the method still has access to the state variable**
