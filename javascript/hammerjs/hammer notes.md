# hammer notes

#### how do i detect a swipe on the upper or top part of the screen?

get the outer dimensions of the body element
```
	const bodyRect = document.body.getBoundingClientRect();
	const limitRect = bodyRect;
```

then its just a matter of how far the mouse is away from the origin
```
  hammertime.on("pan", function (e) {
    let event = window.event;
    // console.warn(`[app] document receieved a pan`);

    if(event.clientY < 50 && event.clientY > 0){
      console.warn(`[pan] swipe beginning`);
      console.warn(`[pan] mouse positions \n clientX = ${event.clientX}, \n clientY = ${event.clientY}`);
    }
  });
```

i want to use swipe instead of pan and use swipe up on the condition that the top menu has the extended className
