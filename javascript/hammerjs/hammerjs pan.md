

#### if my first pan movement was up, the icon jumped to the top left of the screen. left/right movement worked
[hammerjs getting started](https://hammerjs.github.io/getting-started/)   

[hammerjs jsDoc](https://hammerjs.github.io/jsdoc/index.html)   

Enabling vertical or all directions for the pan and swipe recognizers:
```
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
```

my example
```
  let hammertime = new Hammer(paperIcon,{domEvents:true});
  // hammertime.get("pan").set({enable: true, velocityX: 0.00000002, velocityY: 0.00000002});
  hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL })

  hammertime.on("pan", function (e) {
    // console.log("[pan] deltaX", e.deltaX);
    // console.log("[pan] gesture deltaX", e.gesture.deltaX);
    // paperStore.x = -1 * e.deltaX;// remove css scroll styling and it works
    paperStore.x = paperStore.lastX + e.deltaX;
    // console.log("[pan] deltaY", e.deltaY);
    paperStore.y = paperStore.lastY + e.deltaY;
    // console.log("[pan] event", e);
    e.preventDefault();
  });

  hammertime.on("panend", function (e) {
    // console.log("[pan] deltaX", e.deltaX);
    // console.log("[pan] gesture deltaX", e.gesture.deltaX);
    // paperStore.x = -1 * e.deltaX;// remove css scroll styling and it works
    paperStore.lastX = paperStore.x; // e.deltaX;
    // console.log("[pan] deltaY", e.deltaY);
    paperStore.lastY = paperStore.y;// e.deltaY;
    // console.log("[pan] event", e);
    e.preventDefault();
  });

}// if paperStore.active

if(thirdRender == false){
  setThirdRender(true);
}
```

**simple setup for moving items on the screen (icons)**

#### i have to constrain the btns movements to the viewport
[layout viewport vs visible viewport](https://developer.mozilla.org/en-US/docs/Glossary/layout_viewport)   
> the layout viewport remains the same while the visible viewport may change based on the viewers current
zoom level

[Window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight)   
> The value of innerHeight is taken from the width of the window's layout viewport.

#### icon rectangle dimensions
```
  iconRect.current = paperIcon.current.getBoundingClientRect();
```

#### containing rectangle dimensions
> im setting this one time instead of setting this each time a var in the dependency array changes (useEffect)
```
  if(paperModal.current.getBoundingClientRect() && paperModal.current.classList.contains("block")){
    // fix for paperModal rect data sets to zero when not in store.show and "block" class
    // only set the current when visible in block mode - may not need resize, but i may need it idk
    paperModalRect.current = paperModal.current.getBoundingClientRect();
  }
```

#### setting min/max limits
```
  // let limitRect = paperModal.current.getBoundingClientRect();// no longer set here

  // only process when the element is ready
  if(exists(paperModalRect.current)){
    // i still need to control the resize

    let limitRect = paperModalRect.current;

    let iconRadius = iconRect.current.height/2;
    let maxX = limitRect.width - iconRect.current.height/2; //iconRadius;
    let minX = iconRadius;
    let maxY = limitRect.height - iconRect.current.height/2; //iconRadius;
    let minY = iconRadius;
    limits.current = { maxX, minX, maxY, minY };
```

#### delta positions
```
  // console.warn("[pan] deltaX", e.deltaX);
  // console.warn("[pan] deltaY", e.deltaY);

  // deltaX and deltaY think (0,0) is where the pan starts
  // deltaX and deltaY is how far you have moved the pan from it's original position
  if(display_console || false) console.warn(`[pan] pan positions \n deltaX = ${e.deltaX}, \n deltaY = ${e.deltaY}`);
```

#### mouse positions
```
  // mouse positions
  // console.warn("[pan] clientX", me.clientX);
  // console.warn("[pan] clientY", me.clientY);
  // console.warn('[pan] event', window.event);

  // clientX and clientY (0,0) is at the top left corner of an element the offset tells us how far away the object initially is from (0,0)
  if(display_console || false) console.warn(`[pan] mouse positions \n clientX = ${me.clientX}, \n clientY = ${me.clientY}`);
```

#### nextX
```
  let nextX = paperStore.lastX + e.deltaX;
  if(display_console || false) console.warn(`[pan] calculate nextX \n paperStore.lastX = ${paperStore.lastX} \n deltaX = ${e.deltaX} \n nextX = `,nextX);
```
> [pan] calculate nextX paperStore.lastX = 0 deltaX = -10 nextX =  -10
> [pan] calculate nextX paperStore.lastX = -231 deltaX = -83 nextX =  -314
> [pan] calculate nextX paperStore.lastX = -276 deltaX = -6 nextX =  -282

lastX helps to maintain the position of the object in the space since deltaX starts over at zero with each release and renewed pan
as long as the accumulated number of lastX and deltaX stays within the min/max this nextX calculated number will be accepted as the object new position
if it does violate the min/max setting the min/max setting will be used as the objects new position instead

#### what does the xoffset have to do with helping me set my limits?
the xoffset helps define where the real edge is based on how far the object initially is from the origin
```
  let xMax = limits.current.maxX - xOffset.current;
  // let xMax = limits.current.maxX;// no offset
  let xMin = limits.current.minX - xOffset.current;
  // let xMin = limits.current.minX;// no offset

```
> [pan] .x calculation (w/o offset) nextX (-10) > xMax (600) ? xMax : nextX < xMin (30) ? xMin : nextX
> so this results in the object being set to 30 (deltaX) which is 30 px to the right of deltaX origin

> [pan] .x calculation (with offset) nextX (-10) > xMax (60.6666259765625) ? xMax : nextX < xMin (-509.3333740234375) ? xMin : nextX
> this tells me 2 things, its 60px from the max x edge of the rectangle so the object can travel only 60 more px to the right
> its also 509 px from the left edge so it can go back (negative #) - 509 more px to the left before it is stopped

[toggle recognizer](https://hammerjs.github.io/toggle-recognizer/)   
```
  const can_enabled = (rec, input) => {
    console.warn(`[pan] rec`,rec);
    console.warn(`[pan] input`,input);
    return false;
  }

  let hammertime;
  window.hammertime = hammertime = new Hammer.Manager(container.current,{domEvents:true});//
  // set the directions
  hammertime.add(new Hammer.Pan({enable:can_enabled}));
```

rec data
```
  id: 1
  manager: Manager {options: {…}, handlers: {…}, session: {…}, recognizers: Array(1), oldCssProps: {…}, …}
  options:
  direction: 24
  enable: ƒ can_enabled(rec, input)
  event: "pan"
  pointers: 1
  threshold: 10
  __proto__: Object
  pX: null
  pY: null
  requireFail: []
  simultaneous: {}
  state: 32
```
direction codes
```
  DIRECTION_NONE	1
  DIRECTION_LEFT	2
  DIRECTION_RIGHT	4
  DIRECTION_UP	8
  DIRECTION_DOWN	16
  DIRECTION_HORIZONTAL	6
  DIRECTION_VERTICAL	24
  DIRECTION_ALL	30
```
**input data looks the same as hammer event data**

#### [touch action](https://hammerjs.github.io/touch-action/)   
```
  window.hammertime = hammertime = new Hammer.Manager(container.current,{domEvents:true, touchAction:"pan-x"});//
```

#### [Accepts multiple events seperated by a space.](https://hammerjs.github.io/api/)   
general api - search: multiple
```
  Hammer.on(window, "load resize scroll", function(ev) {
  	console.log(ev.type);
  });
```

#### full working example
```
  useEffect(() => {
    // let paperIcon = document.querySelector(".paper_icon");//mindsEye
    // console.warn("[Paper] hammertime (5)");
    let hammertime;
    if (paperIcon.current && paperStore.active_id) {
      // let tree = document.querySelector(".mindsEye");


      hammertime = new Hammer(paperIcon.current,{domEvents:true});
      // hammertime.get("pan").set({enable: true, velocityX: 0.00000002, velocityY: 0.00000002});
      hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL })

      // i needed way less calculations - created an animation lag. so im setting static values out here.
      iconRect.current = paperIcon.current.getBoundingClientRect();

      if(paperModal.current.getBoundingClientRect() && paperModal.current.classList.contains("block")){
        // fix for paperModal rect data sets to zero when not in store.show and "block" class
        // only set the current when visible in block mode - may not need resize, but i may need it idk
        paperModalRect.current = paperModal.current.getBoundingClientRect();
      }

      // let limitRect = paperModal.current.getBoundingClientRect();
      if(exists(paperModalRect.current)){
        // i still need to control the resize

        let limitRect = paperModalRect.current;

        let iconRadius = iconRect.current.height/2;
        let maxX = limitRect.width - iconRect.current.height/2; //iconRadius;
        let minX = iconRadius;
        let maxY = limitRect.height - iconRect.current.height/2; //iconRadius;
        let minY = iconRadius;
        limits.current = { maxX, minX, maxY, minY };
        // items pan positions
        if(display_console || false) console.warn(`[pan] limits current = `,JSON.stringify(limits.current));

        hammertime.on("pan", function (e) {
          let me = window.event;
          if(me.type == "pointerup") return;// fixes the extra pan event occuring when release the mouse btn

          // i moved this down below the return so i don't have to click the icon twice to get a toggle action
          panning.current = true;
          // console.warn("[pan] deltaX", e.deltaX);
          // console.warn("[pan] deltaY", e.deltaY);

          // deltaX and deltaY think (0,0) is where the pan starts
          // deltaX and deltaY is how far you have moved the pan from it's original position
          if(display_console || false) console.warn(`[pan] pan positions \n deltaX = ${e.deltaX}, \n deltaY = ${e.deltaY}`);

          // mouse positions
          // console.warn("[pan] clientX", me.clientX);
          // console.warn("[pan] clientY", me.clientY);
          // console.warn('[pan] event', window.event);

          // clientX and clientY (0,0) is at the top left corner of an element the offset tells us how far away the object initially is from (0,0)
          if(display_console || false) console.warn(`[pan] mouse positions \n clientX = ${me.clientX}, \n clientY = ${me.clientY}`);

          if(!xOffset.current){
            // this offset is only being set once.
            xOffset.current = me.clientX - (paperStore.lastX + e.deltaX);
            if(display_console || false) console.warn(`[pan] \n clientX = ${me.clientX} \n lastX = ${paperStore.lastX} \n deltaX = ${e.deltaX} \n offsetX = `, xOffset.current);
            console.warn("[pan] xOffset", xOffset.current);
            yOffset.current = me.clientY - (paperStore.lastY + e.deltaY);
            // console.warn("[pan] yOffset", yOffset.current);
          }

          // i can get the icon width and height from iconRect.current

          // i want to use the modal window as my movement limit

          // i need to track the resize so the limits stay valid

          // on resize the icon needs to be responsive - track a value of realX and realY which is
          // icons true distance from zero edges (mouse pos)

          // console.log("[pan] gesture deltaX", e.gesture.deltaX);
          // paperStore.x = -1 * e.deltaX;// remove css scroll styling and it works

          let nextX = paperStore.lastX + e.deltaX;
          if(display_console || true) console.warn(`[pan] calculate nextX \n paperStore.lastX = ${paperStore.lastX} \n deltaX = ${e.deltaX} \n nextX = `,nextX);

          // let trueX = nextX + xOffset.current;

          // what does the xoffset have to do with helping me set my limits?
          // the xoffset helps define where the real edge is based on how far the object already is from the origin
          let xMax = limits.current.maxX - xOffset.current;
          // let xMax = limits.current.maxX;// no offset
          let xMin = limits.current.minX - xOffset.current;
          // let xMin = limits.current.minX;// no offset

          // [pan] .x calculation (w/o offset) nextX (-10) > xMax (600) ? xMax : nextX < xMin (30) ? xMin : nextX
          // so this results in the object being set to 30 (deltaX) which is 30 px to the right of deltaX origin

          //[pan] .x calculation (with offset) nextX (-10) > xMax (60.6666259765625) ? xMax : nextX < xMin (-509.3333740234375) ? xMin : nextX
          // this tells me 2 things, its 60px from the max x edge of the rectangle so the object can travel only 60 more px to the right
          // its also 509 px from the left edge so it can go back (negative #) - 509 more px to the left before it is stopped

          let nextY = paperStore.lastY + e.deltaY;
          // let trueY = nextY + yOffset.current;
          let yMax = limits.current.maxY - yOffset.current;
          let yMin = limits.current.minY - yOffset.current

          // paperStore.x = paperStore.lastX + e.deltaX;
          if(display_console || false) console.warn(`[pan] .x calculation \n nextX (${nextX}) > xMax (${xMax}) ? xMax : \n nextX < xMin (${xMin}) ? xMin : nextX`);
          paperStore.x = (nextX > xMax) ? xMax : (nextX < xMin) ? xMin : nextX;
          // paperStore.x = (trueX > limits.current.maxX) ? limits.current.maxX - xOffset.current :
          // (trueX < limits.current.minX) ? limits.current.minX - xOffset.current : nextX;
          // paperStore.x = (trueX > maxX || trueX < minX) ? paperStore.lastX : nextX;
          // console.warn("[pan] paperStoreX", paperStore.x);

          // paperStore.y = paperStore.lastY + e.deltaY;
          paperStore.y = (nextY > yMax) ? yMax : (nextY < yMin) ? yMin : nextY;
          // paperStore.y = (trueY > limits.current.maxY) ? limits.current.maxY - yOffset.current :
          // (trueY < limits.current.minY) ? limits.current.minY - yOffset.current : nextY;
          // paperStore.y = (trueY > maxY || trueY < minY) ? paperStore.lastY : nextY;

          // console.warn("[pan] paperStoreY", paperStore.y);
          // console.log("[pan] event", e);

          e.preventDefault();
        });

        hammertime.on("panend", function (e) {
          // console.log("[pan] deltaX", e.deltaX);
          // console.log("[pan] gesture deltaX", e.gesture.deltaX);
          // paperStore.x = -1 * e.deltaX;// remove css scroll styling and it works
          paperStore.lastX = paperStore.x; // e.deltaX;
          // console.warn("[pan] paperStore lastX", paperStore.lastX);
          // console.log("[pan] deltaY", e.deltaY);
          paperStore.lastY = paperStore.y;// e.deltaY;

          console.warn("[Paper] panend",e);
          if(e.pointerType == "touch"){
            // fix for mouseup issue
            panning.current = false;
          }// if
          // console.warn("[pan] paperStore lastY", paperStore.lastY);
          // console.log("[pan] event", e);
          e.preventDefault();
        });

      }
    }// if paperStore.active

    if(thirdRender == false){
      setThirdRender(true);
    }

    return () => {
      // cleanup
      if(hammertime){
        hammertime.destroy();
      }
    }// return

  },[thirdRender, paperIcon.current, paperStore.show])

```
