# mousewheel event

[WheelEvent deltaMode Property](https://www.w3schools.com/jsref/event_wheel_deltamode.asp)   
### GOTCHA: **deltaMode didn't seem to work originally - use wheelDelta**

[How to Use the Mouse Wheel Event in HTML5 Pages](https://www.sitepoint.com/html5-javascript-mouse-wheel/)   
**a more understandable article than w3schools**


#### tryit editor
[tryit editor](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_wheel_deltamode)   
```
  <!DOCTYPE html>
  <html>
  <body >

  <h1>WheelEvent deltaMode Property</h1>

  <p>Scroll this page to see the length unit of the delta values property.</p>

  <p id="demo"></p>
  <p id="scroller" style="height:1000px; border:1px solid red;" onmousewheel="myFunction(event)"><strong>Note:</strong> 0 = pixels, 1 = lines, 2 = pages.</p>



  <script>
  function myFunction(event) {
    var x = event.wheelDelta;
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));/* i gues this min max doesn't let it go higher or lower than 1 and -1*/
  	console.log("[wheel]",event);  document.getElementById("demo").innerHTML += delta;
  }
  </script>

  </body>
  </html>
```
**onwheel and onmousewheel is the same thing**
