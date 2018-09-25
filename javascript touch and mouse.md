# javascript touch and mouse

### [touch and mouse article](https://www.html5rocks.com/en/mobile/touchandmouse/)

// i had an issue where onTouch on my 2n1 touch fired then mouse fired
touchend then mouseup

i used e.preventDefault() to stop it
[hint doc](https://stackoverflow.com/questions/14530734/handle-both-mouse-and-touch-events-on-touch-screens)
> " You can't really predict in advance which events to listen for (eg. for all you know a USB touch screen could get plugged in after your page has loaded).

> Instead, you should always listen to both the touch events and mouse events, but call preventDefault() on the touch events you handle to prevent (now redundant) mouse events from being fired for them. "

[also in the hint](https://plus.google.com/+PaulIrish/posts/Y2jydx31Bor)

```
	move_element.addEventListener(use_event,function(ev)
	{
		console.log(`lister running ${use_event}`);
		// console.log(move_timer);

		clearTimeout(move_timer);
		if(hold_mode == false){
			//run details
			view_li_details(e,el,{prefix:"arc"});
		}
		move_element.removeEventListener(use_event,function(){});
		move_timer = "";
		ev.preventDefault();
	},{once:true});
```

### [Google touch action options docs](https://developers.google.com/web/updates/2016/10/touch-action)

```
	// .css
	.pan-x {
	  touch-action: pan-x;
	}

	.pan-y {
	  touch-action: pan-y;
	}
```