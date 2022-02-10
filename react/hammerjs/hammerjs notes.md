# Hammer.js notes

#### GOTCHA: [ghost clicks](https://hammerjs.github.io/tips/)   

“After a tap, also a click is being triggered, I don’t want that!”
That click event is also being called a ‘ghost click’. I’ve created a small function to prevent clicks after a touchend. It is heavily inspired from this article from Ryan Fioravanti.

[ghost tap gist](https://gist.github.com/jtangelder/361052976f044200ea17)   

> happen after every tap event

#### adds 'PreventGhostClick' to the global scope

```
  require('../../tools/PreventGhostClick');
```

```
   require('../../tools/PreventGhostClick');

  ...

  let mc;
        let elem = document.querySelector(`.${aName}`);

        if(exists(elem)){
          let parent_cont = elem.parentNode;
          if(typeof parent_cont.dataset.search_string == "undefined"){
            create_search_string(parent_cont,elem);
          }// if typeof


          mc = new Hammer(elem, {domEvents: true});

          mc.on("tap", (ev) => {
            // console.warn("[aWrap] tap: ", ev.type +" gesture detected.");
            //omit the white list
            // hammer has challenges with bubbling events

            PreventGhostClick(ev.target);

            ev.preventDefault();


            if(ev.target.className.includes("my_info_icon") || ev.target.className.includes("icon_img") ||
            ev.target.className.includes("my_info_options") || ev.target.className.includes("arc_info_copy") ||
            ev.target.className.includes("chk_info_chk") || ev.target.className.includes("chk_custom_chk") ) return;

            if(display_console || false) console.warn(`[aWrapr] item title`,details_data.title);

            /**
             * @callback view-li-details
             * @desc starts details process
             * @requires view-li-details
             */
            details_data.auto_page = false;

            let t_target = true_target(ev.target, "ListArea", "class");// my_a_wrap
            demo(t_target, () => {
              view_li_details(ev,`_${aName}`,details_data);
            });

            // ev.stopPropagation();

          });// on tap

```

> add PreventGhostClick(ev.target); to hammer tap event


[ghost tap gist](https://gist.github.com/jtangelder/361052976f044200ea17)   

```
  /**
  * Prevent click events after a touchend.
  * 
  * Inspired/copy-paste from this article of Google by Ryan Fioravanti
  * https://developers.google.com/mobile/articles/fast_buttons#ghost
  * 
  * USAGE: 
  * Prevent the click event for an certain element
  * ````
  *  PreventGhostClick(myElement);
  * ````
  * 
  * Prevent clicks on the whole document (not recommended!!) * 
  * ````
  *  PreventGhostClick(document);
  * ````
  * 
  */
  (function(window, document, exportName) {
      var coordinates = [];
      var threshold = 25;
      var timeout = 2500;

      // no touch support
      if(!("ontouchstart" in window)) {
          window[exportName] = function(){};
          return;
      }

      /**
      * prevent clicks if they're in a registered XY region
      * @param {MouseEvent} ev
      */
      function preventGhostClick(ev) {
          for (var i = 0; i < coordinates.length; i++) {
              var x = coordinates[i][0];
              var y = coordinates[i][1];

              // within the range, so prevent the click
              if (Math.abs(ev.clientX - x) < threshold && Math.abs(ev.clientY - y) < threshold) {
                  ev.stopPropagation();
                  ev.preventDefault();
                  break;
              }
          }
      }

      /**
      * reset the coordinates array
      */
      function resetCoordinates() {
          coordinates = [];
      }

      /**
      * remove the first coordinates set from the array
      */
      function popCoordinates() {
          coordinates.splice(0, 1);
      }

      /**
      * if it is an final touchend, we want to register it's place
      * @param {TouchEvent} ev
      */
      function registerCoordinates(ev) {
          // touchend is triggered on every releasing finger
          // changed touches always contain the removed touches on a touchend
          // the touches object might contain these also at some browsers (firefox os)
          // so touches - changedTouches will be 0 or lower, like -1, on the final touchend
          if(ev.touches.length - ev.changedTouches.length <= 0) {
              var touch = ev.changedTouches[0];
              coordinates.push([touch.clientX, touch.clientY]);

              setTimeout(popCoordinates, timeout);
          }
      }

      /**
      * prevent click events for the given element
      * @param {EventTarget} el
      */
      window[exportName] = function(el) {
          el.addEventListener("touchstart", resetCoordinates, true);
          el.addEventListener("touchend", registerCoordinates, true);
      };

      document.addEventListener("click", preventGhostClick, true);
  })(window, document, 'PreventGhostClick');
```