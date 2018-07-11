
com_arc version

    this.set_hold_mode = function(e,el,fn,hdta)
    {
      console.log("hold event happening");
      console.log("hold event = ",event);
      console.log("hold element = ",el);
      console.log("hold fn = ",fn);
        //let me_seeks = e;
        var move_element = document.getElementById(el);
        var hold_time = 1000;//1000 = 1sec
        var use_event = ("ontouchend" in move_element) ? "touchend" : "mouseup";
        var move_timer = setTimeout(function(){fn(e,el,hdta)}, hold_time);//trigger_move
        //alert("use_event = " + use_event);
        move_element.addEventListener(use_event,function(){console.log(move_timer); clearTimeout(move_timer); move_timer = "";});
        window.addEventListener("scroll",function(){clearTimeout(move_timer); /*alert("window scroll fireing");*/});
        document.getElementById("arc_display").addEventListener("scroll",function(){clearTimeout(move_timer);  /*alert("element scroll fireing");*/});

      //console.log("move mode running");
      //alert("move mode running");
      //also connected to view_li_details

    }//end set_hold_mode
	
	//angularjs version
	
	<button class="page_filt_btn page_filt_menu w3-white w3-btn" 
	ng-mousedown="
	page.set_hold_mode('here goes some text',
	page.cycle_menu,
	page.cycle_menu)
	">
	  <i class="material-icons"  style="font-size:1rem;color:#16438a">chrome_reader_mode</i>
	</button>
	
	//stabilized fn
	this.set_hold_mode = function(hdta,fn1,fn2)
    {
      console.log("hold event happening");
      console.log("hold event = ",event);//works
      //console.log("hold element = ",el);//doesnt work in angular - i passed 'this' (no quotes)
      console.log("hold element = ",event.target);
      console.log("hold fn = ",fn1);//works
      console.log("hold data = ",hdta);//works

      //let me_seeks = e;
      var move_element = event.target;
      var hold_time = 1000;//1000 = 1sec
      var use_event = ("ontouchend" in move_element) ? "touchend" : "mouseup";
      pageCtrlr.hold_fired = false;//define a object global hold_fired variable
      var move_timer = setTimeout(function()
      {
        pageCtrlr.hold_fired = true;
        console.log("hold is fired");
        if(fn1 != undefined && typeof(fn1) == "function")
        {
          fn1(move_element,hdta);
        }//end if

      }, hold_time);//trigger_move
      //alert("use_event = " + use_event);

      move_element.addEventListener(use_event,function(){
        console.log(move_timer);
        clearTimeout(move_timer); move_timer = "";
        if(pageCtrlr.hold_fired != true && fn2 != undefined && typeof(fn2) == "function"){
          fn2(move_element,hdta);
          console.log("hold is not fired");
        }//end if
      });

      window.addEventListener("scroll",function(){
        clearTimeout(move_timer); //alert("window scroll fireing");
      });
      /*
      document.getElementById("arc_display").addEventListener("scroll",function(){
        clearTimeout(move_timer);  //alert("element scroll fireing");
      });
      */

      //console.log("move mode running");
      //alert("move mode running");
      //also connected to view_li_details

    }//end set_hold_mode
	
	