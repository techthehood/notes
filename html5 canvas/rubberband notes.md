# Rubberband Notes

GOTCHA: rubberband precision fails when css width and height are set on the canvas.

in the setup I needed to have 2 canvases
```
  let canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  canvas_clone = document.createElement('canvas'),
  clone_context = canvas_clone.getContext('2d'),
  resetButton = document.getElementById('resetButton');

  canvas_clone.width = canvas.width;
  canvas_clone.height = canvas.height;
```

one canvas is offscreen & not nested on the page

i needed touchscreen and mouse events
```
  s.canvas.onmousedown = (e) => {
    this.start_data(e)
  }// md
  s.canvas.ontouchstart = (e) => {
    this.start_data(e)
  }// md
```

get mouse/touch x
```
  getX = function (e) {
    return (e.pageX == undefined) ? e.targetTouches[0].pageX : e.pageX;
  }// getX
```
i used this to keep track of the mouse coordinates
```
  track_mouse_data = function (e) {
    let s = this.state;

    let loc = this.windowToCanvas(s.canvas, e.clientX, e.clientY);
    let cssW = (s.imageData != undefined) ? s.imageData.width / s.canvas.width : undefined;
    let cssH = (s.imageData != undefined) ? s.imageData.height / s.canvas.height : undefined;
    let touchX = (e.pageX == undefined) ? e.targetTouches[0].pageX : undefined;
    let touchY = (e.pageY == undefined) ? e.targetTouches[0].pageY : undefined;
    console.log(`screen-x: ${e.clientX},
      screen-y: ${e.clientY},
      canvas-x: ${loc.x},
      canvas-y: ${loc.y},
      rb-l: ${s.rubberbandRectangle.left},
      rb-t: ${s.rubberbandRectangle.top},
      rb-w: ${s.rubberbandRectangle.width},
      rb-h: ${s.rubberbandRectangle.height},
      md-x:${s.mousedown.x},
      md-y:${s.mousedown.y},
      ocss-w:${cssW},
      ocss-h:${cssH},
      off-l:${e.pageX - s.canvas.offsetLeft},
      off-t:${e.pageY - s.canvas.offsetTop},
      lastX:${s.lastX},
      lastY:${s.lastY},
      touchX:${touchX},
      touchY:${touchY}
      `);
  }
```
creates a grid overlay
```
  set_grid = function () {
    let s = this.state,
    ctx = s.context;
    let counter = 10;
    while(counter < s.canvas.width)
    {
      ctx.moveTo(counter, 0);
      ctx.lineTo(counter,s.canvas.height);
      ctx.stroke();
      counter = counter + 10;
    }
  }
```

this function calculates the mouse position in the canvas from the
mouse position in the page using canvas.getBoundingClientRect()
```
  loc = this.windowToCanvas(s.canvas, _.getX(e), _.getY(e));

  windowToCanvas = function (canvas, x, y) {
    let s = this.state;

    let canvasRectangle = s.canvas.getBoundingClientRect();
    return {
      x: x - canvasRectangle.left,
      y: y - canvasRectangle.top
    }//return

    // return {
    //   x: x - s.canvas.offsetLeft,
    //   y: y - s.canvas.offsetTop
    // }//return

  }// windowToCanvas
```
```
  rubberbandStretch = function (x, y) {

    this.restoreRubberbandPixels();
    this.setRubberbandRectangle(x, y);
    this.updateRubberband();

  }// rubberbandStretch
```
during rubberbandStretch the restoreRubberbandPixels doesn't seem to do anything
```
  ctx.putImageData(s.imageData, s.rubberbandRectangle.left,
    s.rubberbandRectangle.top);
```
this putImageData is supposed to clear the previous rubberband rectangles from the canvas
it doesn't seem to be working so i created a work around in drawRubberband
```
  // ctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
  s.context.drawImage(s.canvas_clone, 0, 0, s.canvas.width, s.canvas.height);
```
i had to use an offscreen canvas to make it work - the offscreen canvas (canvas_clone)
shows the current canvas without annotations.  once the canvas is updated the clone
is updated too.
```
    rubberbandEnd = function () {

    if (s.press && s.dragging) {

      // update the canvas
      ctx.drawImage(s.canvas,
        s.rubberbandRectangle.left + ctx.lineWidth * 2,
        s.rubberbandRectangle.top + ctx.lineWidth * 2,
        s.rubberbandRectangle.width - 4 * ctx.lineWidth,
        s.rubberbandRectangle.height - 4 * ctx.lineWidth,
        0, 0, s.canvas.width, s.canvas.height);

        // update the clone
        cctx.drawImage(s.canvas, 0, 0, s.canvas.width, s.canvas.height);
    }
```

i think the imageData in captureRubberbandPixels is supposed to work with putImageData
other than that the captureRubberbandPixels fn is useless and so is setting imageData

one of 2 major fns

drawRubberband written as is and is self explanatory
```
  drawRubberband = function () {
    let s = this.state,
    ctx = s.context;

    // useful for clearing the canvas to redraw - removing rubber band, but drawImage does it in one step
    // ctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
    s.context.drawImage(s.canvas_clone, 0, 0, s.canvas.width, s.canvas.height);

    ctx.strokeRect(s.rubberbandRectangle.left + ctx.lineWidth,
      s.rubberbandRectangle.top + ctx.lineWidth,
      s.rubberbandRectangle.width - 2 * ctx.lineWidth,
      s.rubberbandRectangle.height - 2 * ctx.lineWidth);

      // this.set_grid();

  }// drawRubberband
```
 the other major and most complex fn

 the extra code ensures that the scaled image remains in its original aspect ratio
 ```
   setRubberbandRectangle = function (x, y) {
     let s = this.state,
     ctx = s.context;

     s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
     // s.rubberbandRectangle.top = (y > s.mousedown.y) ? Math.min(y, s.mousedown.y) : ;
     s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);

     if(s.lock_ratio){

       let x_quad = (x > s.mousedown.x) ? "b" : "a",
       y_quad = (y > s.mousedown.y) ? "b" : "a",
       quadrant = x_quad + y_quad;

       switch (quadrant) {
         case "aa":
           if(s.lastX != x){
             s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
             s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
             s.rubberbandRectangle.top =  s.mousedown.y - s.rubberbandRectangle.height;// modification
             s.lastX = x;
           }else{
             s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
             s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
             s.rubberbandRectangle.left = s.mousedown.x - s.rubberbandRectangle.width;// modification
             s.lastY = y;
           }// if
         break;
         case "ba":
           // bottom right
           s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
           if(s.lastX != x){
             s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
             s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
             s.rubberbandRectangle.top =  s.mousedown.y - s.rubberbandRectangle.height;// modification
             s.lastX = x;
           }else{
             s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
             s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
             s.lastY = y;
           }
         break;
         case "bb":
           // bottom right
           s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
           s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
           if(s.lastX != x){
             s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
             s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
             s.lastX = x;
           }else{
             s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
             s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
             s.lastY = y;
           }
         break;
         case "ab":
           // bottom left
           s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
           if(s.lastX != x){
             s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
             s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
             s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
             s.lastX = x;
           }else{
             s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
             s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
             s.rubberbandRectangle.left = s.mousedown.x - s.rubberbandRectangle.width;// modification
             s.lastY = y;
           }// if

         break;
       }// switch


     }else{
       // original and less complex version
       s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
       s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
       s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
       s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
     }

     console.log(`l ${s.rubberbandRectangle.left},
       t  ${s.rubberbandRectangle.left},
       w  ${s.rubberbandRectangle.width},
       h  ${s.rubberbandRectangle.height}`);
   }// setRubberbandRectangle
 ```

heres the original and simplified version of the above
the issus with this version is it stretches the img if you don't drag to the
exact aspect ratio dimensions of the canvas.  you may get lucky but there will
always be a distortion this way whether noticable or not.
 ```
   setRubberbandRectangle = function (x, y) {
     let s = this.state,
     ctx = s.context;

       // original and less complex version
       s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
       s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
       s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
       s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);

   }// setRubberbandRectangle
 ```

## Entire rubberband code
MyCanvas.js - git checkout rubber_bands (written as a react app)
```
  import React from 'react';
  import './MyCanvas.css';

  // this is a function component - it takes properties it doesn't have its own state
  // const myCanvas = () => {
  //       return (
  //         <div>
  //         <h1>New canvas element</h1>
  //         <canvas id="canvas"></canvas>
  //         </div>
  //       )
  //   }
  //
  // export default myCanvas;

  // [touchscreen hint from ](https://codepen.io/leenalavanya/pen/zvGmZZ)
  // [touch event hints](https://www.w3schools.com/jsref/obj_touchevent.asp)

  // [using canvas with react](https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753)
  class myCanvas extends React.Component {
    // this is a function component - it takes properties it doesn't have its own state

      state = {
        canvas : "",
        context : "",
        image : new Image(),
        lastX:undefined,
        lastY:undefined,
        lock_ratio:true,
        imageData:undefined,
        mousedown:{},
        rubberbandRectangle:{},
        dragging:false,
        press:false
      }; // state

      componentDidMount = () => {
        //this section is for setting up initial values just after page is rendered
        console.log("myCanvas mounted");
        let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        canvas_clone = document.createElement('canvas'),
        clone_context = canvas_clone.getContext('2d'),
        resetButton = document.getElementById('resetButton');

        canvas_clone.width = canvas.width;
        canvas_clone.height = canvas.height;

        this.setState({
          canvas,
          context,
          canvas_clone,
          clone_context,
          resetButton
        });//setState

      };// componentDidMount

      componentDidUpdate = () => {
        //this section is for executing just after first state update - all init vars are set by now
          let s = this.state,
          ctx = s.context,
          cctx = s.clone_context;

          ctx.strokeStyle = 'navy';
          ctx.lineWidth = 1.0;

          // s.image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
          s.image.src = './images/crew.jpg';
          s.image.onload = (e) => {
            s.context.drawImage(s.image, 0, 0, s.canvas.width, s.canvas.height);
            s.clone_context.drawImage(s.image, 0, 0, s.canvas.width, s.canvas.height);
            // this.set_grid();
          }// onload

          s.resetButton.onclick = (e) => {
            console.log('resetting btn');
            ctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
            ctx.drawImage(s.image, 0, 0, s.canvas.width, s.canvas.height);

            // reset the clone too
            cctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
            cctx.drawImage(s.image, 0, 0, s.canvas.width, s.canvas.height);
          }// resetButton

          s.canvas.onmousedown = (e) => {
            this.start_data(e)
          }// md
          s.canvas.ontouchstart = (e) => {
            this.start_data(e)
          }// md

          s.canvas.onmousemove = (e) => {
            this.move_data(e);
          }// mm
          s.canvas.ontouchmove = (e) => {
            this.move_data(e);
          }// mm

          s.canvas.onmouseup = (e) => {
            this.end_data(e);
          }// mu
          s.canvas.ontouchend = (e) => {
            this.end_data(e);
          }// mu
          s.canvas.ontouchcancel = (e) => {
            this.end_data(e);
          }// mu

      }; // componentDidUpdate

      getX = function (e) {
        return (e.pageX == undefined) ? e.targetTouches[0].pageX : e.pageX;
      }// getX

      getY = function (e) {
        return (e.pageY == undefined) ? e.targetTouches[0].pageY : e.pageY;
      }// getX

      start_data = function (e) {
        console.log("mousedown action");
        let _ = this,
        s = _.state,
        loc = this.windowToCanvas(s.canvas, _.getX(e), _.getY(e));

        e.preventDefault();
        this.rubberbandStart(loc.x, loc.y);
      }// start_data

      move_data = function (e) {
        console.log("mousemove action");
        let _ = this,
        s = _.state,
        loc;

        if(s.press){
          s.dragging = true;
        }

        if(s.dragging){
          console.log("dragging action");
          loc = this.windowToCanvas(s.canvas, _.getX(e), _.getY(e));
          this.rubberbandStretch(loc.x, loc.y);
        }// if
        this.track_mouse_data(e)
      }// move_data

      end_data = function (e) {
        let _ = this,
        s = _.state;
        console.log("mouseup action");
        _.rubberbandEnd();
        s.press = false;
      }// end_data

      track_mouse_data = function (e) {
        let s = this.state;

        let loc = this.windowToCanvas(s.canvas, e.clientX, e.clientY);
        let cssW = (s.imageData != undefined) ? s.imageData.width / s.canvas.width : undefined;
        let cssH = (s.imageData != undefined) ? s.imageData.height / s.canvas.height : undefined;
        let touchX = (e.pageX == undefined) ? e.targetTouches[0].pageX : undefined;
        let touchY = (e.pageY == undefined) ? e.targetTouches[0].pageY : undefined;
        console.log(`screen-x: ${e.clientX},
          screen-y: ${e.clientY},
          canvas-x: ${loc.x},
          canvas-y: ${loc.y},
          rb-l: ${s.rubberbandRectangle.left},
          rb-t: ${s.rubberbandRectangle.top},
          rb-w: ${s.rubberbandRectangle.width},
          rb-h: ${s.rubberbandRectangle.height},
          md-x:${s.mousedown.x},
          md-y:${s.mousedown.y},
          ocss-w:${cssW},
          ocss-h:${cssH},
          off-l:${e.pageX - s.canvas.offsetLeft},
          off-t:${e.pageY - s.canvas.offsetTop},
          lastX:${s.lastX},
          lastY:${s.lastY},
          touchX:${touchX},
          touchY:${touchY}
          `);
      }

      set_grid = function () {
        let s = this.state,
        ctx = s.context;
        let counter = 10;
        while(counter < s.canvas.width)
        {
          ctx.moveTo(counter, 0);
          ctx.lineTo(counter,s.canvas.height);
          ctx.stroke();
          counter = counter + 10;
        }
      }

      windowToCanvas = function (canvas, x, y) {
        let s = this.state;

        let canvasRectangle = s.canvas.getBoundingClientRect();
        return {
          x: x - canvasRectangle.left,
          y: y - canvasRectangle.top
        }//return

        // return {
        //   x: x - s.canvas.offsetLeft,
        //   y: y - s.canvas.offsetTop
        // }//return

      }// windowToCanvas

      rubberbandStart = function (x, y) {
        let s = this.state,
        ctx = s.context;

        s.mousedown.x = x;
        s.mousedown.y = y;
        s.lastX = x;
        s.lastY = y;

        s.rubberbandRectangle.left = x;
        s.rubberbandRectangle.top = y;

        // im using press to help eliminate the break caused by dev breakpoints
        // it still blunders but its not permanently broken
        s.press = true;
      }// rubberbandStart

      rubberbandStretch = function (x, y) {
        let s = this.state,
        ctx = s.context;

        if(s.rubberbandRectangle.width > 2 * ctx.lineWidth &&
          s.rubberbandRectangle.height > 2 * ctx.lineWidth)
        {
          if(s.imageData !== undefined){
            this.restoreRubberbandPixels();
          }//if`
        }// if

        this.setRubberbandRectangle(x, y);

        if(s.rubberbandRectangle.width > 2 * ctx.lineWidth &&
          s.rubberbandRectangle.height > 2 * ctx.lineWidth)
        {
          console.log("updating rubberband");
          this.updateRubberband();
        }// if
      }// rubberbandStretch

      // deprecated fn works with captureRubberbandPixels
      restoreRubberbandPixels = function functionName() {
        let s = this.state,
        ctx = s.context;

        // this doesn't seem to be working - so im using clearRect instead
        ctx.putImageData(s.imageData, s.rubberbandRectangle.left,
          s.rubberbandRectangle.top);

          console.log(`s.imageData = ${s.imageData}`);
      }// restoreRubberbandPixels

      restoreRubberbandPixels2 = function functionName() {
        let s = this.state,
        ctx = s.context;

        let deviceWidthOverCSSPixels = s.imageData.width / s.canvas.width,
        deviceHeightOverCSSPixels = s.imageData.height / s.canvas.height;

        ctx.putImageData(s.imageData, 0, 0,
          s.rubberbandRectangle.left,
          s.rubberbandRectangle.top,
          s.rubberbandRectangle.width,
          s.rubberbandRectangle.height);

          console.log(`s.imageData = ${s.imageData}`);
      }// restoreRubberbandPixels2

      setRubberbandRectangle = function (x, y) {
        let s = this.state,
        ctx = s.context;

        s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
        // s.rubberbandRectangle.top = (y > s.mousedown.y) ? Math.min(y, s.mousedown.y) : ;
        s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);

        if(s.lock_ratio){

          let x_quad = (x > s.mousedown.x) ? "b" : "a",
          y_quad = (y > s.mousedown.y) ? "b" : "a",
          quadrant = x_quad + y_quad;

          switch (quadrant) {
            case "aa":
              if(s.lastX != x){
                s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
                s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
                s.rubberbandRectangle.top =  s.mousedown.y - s.rubberbandRectangle.height;// modification
                s.lastX = x;
              }else{
                s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
                s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
                s.rubberbandRectangle.left = s.mousedown.x - s.rubberbandRectangle.width;// modification
                s.lastY = y;
              }// if
            break;
            case "ba":
              // bottom right
              s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
              if(s.lastX != x){
                s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
                s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
                s.rubberbandRectangle.top =  s.mousedown.y - s.rubberbandRectangle.height;// modification
                s.lastX = x;
              }else{
                s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
                s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
                s.lastY = y;
              }
            break;
            case "bb":
              // bottom right
              s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
              s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
              if(s.lastX != x){
                //when x is moving
                if(x < s.lastX && y !< lastY){
                  //dont change the canvas width

                }else{
                  s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
                  s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
                }

                s.lastX = x;
              }else{
                s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
                s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
                s.lastY = y;
              }
            break;
            case "ab":
              // bottom left
              s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
              if(s.lastX != x){
                s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
                s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
                s.rubberbandRectangle.height = (s.rubberbandRectangle.width / s.canvas.width ) * s.canvas.height;
                s.lastX = x;
              }else{
                s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
                s.rubberbandRectangle.width = (s.rubberbandRectangle.height / s.canvas.height ) * s.canvas.width;
                s.rubberbandRectangle.left = s.mousedown.x - s.rubberbandRectangle.width;// modification
                s.lastY = y;
              }// if

            break;
          }// switch


        }else{
          // original and less complex version
          s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
          s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
          s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
          s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
        }

        console.log(`l ${s.rubberbandRectangle.left},
          t  ${s.rubberbandRectangle.left},
          w  ${s.rubberbandRectangle.width},
          h  ${s.rubberbandRectangle.height}`);
      }// setRubberbandRectangle

      updateRubberband = function () {
        this.captureRubberbandPixels();
        this.drawRubberband();
      }// updateRubberband

      // deprecated fn - works with restoreRubberbandPixels
      captureRubberbandPixels = function () {
        let s = this.state,
        ctx = s.context;

        s.imageData = s.context.getImageData(
          s.rubberbandRectangle.left,
          s.rubberbandRectangle.top,
          s.rubberbandRectangle.width,
          s.rubberbandRectangle.height
        );
        console.log(`s.imageData = ${s.imageData}`);
      }// captureRubberbandPixels

      drawRubberband = function () {
        let s = this.state,
        ctx = s.context;

        // useful for clearing the canvas to redraw - removing rubber band, but drawImage does it in one step
        // ctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
        s.context.drawImage(s.canvas_clone, 0, 0, s.canvas.width, s.canvas.height);

        ctx.strokeRect(s.rubberbandRectangle.left + ctx.lineWidth,
          s.rubberbandRectangle.top + ctx.lineWidth,
          s.rubberbandRectangle.width - 2 * ctx.lineWidth,
          s.rubberbandRectangle.height - 2 * ctx.lineWidth);

          // this.set_grid();

      }// drawRubberband

      rubberbandEnd = function () {
        let s = this.state,
        ctx = s.context,
        cctx = s.clone_context;

        if (s.press && s.dragging) {

          ctx.drawImage(s.canvas,
            s.rubberbandRectangle.left + ctx.lineWidth * 2,
            s.rubberbandRectangle.top + ctx.lineWidth * 2,
            s.rubberbandRectangle.width - 4 * ctx.lineWidth,
            s.rubberbandRectangle.height - 4 * ctx.lineWidth,
            0, 0, s.canvas.width, s.canvas.height);

            // prep the clone
            cctx.drawImage(s.canvas, 0, 0, s.canvas.width, s.canvas.height);
        }

        s.dragging = false;
        s.imageData = undefined;
      }// rubberbandEnd



    render(){
        return (
          <div className="canvas_display">
          <button id="resetButton">reset</button><h1>New canvas element</h1>
          <canvas id="canvas" className="canvas" width="450" height="275"></canvas>
          </div>
        );
      }//render
    }// class

  export default myCanvas;

```
