# hammerjs pinch

mobx store
```
  @observable scale = 1;
  final_scale = 1;
  last_scale = 1;
  current_scale = 1;
```

updraft/index.js
useEffect setup
```
  React.useEffect(() => {
    //prep hammer js
    if (draftStore.initiated != false) {
      let tree = document.querySelector(".mindScape");

      let hammertime = new Hammer(tree,{domEvents:true});

      hammertime.get("pinch").set({enable: true, velocityX: 0.00000002, velocityY: 0.00000002});

      hammertime.on("pinch", function (e) {
        console.log("[hammertime] scale", e.scale);
        console.log("[hammertime] velocity", e.velocity);
        console.log("[hammertime] event", e);

        if(draftStore.final_scale != null){
          console.log("[hammertime] final_scale", draftStore.final_scale);
          // reset the helpers on initial touch
          draftStore.last_scale = null;
          draftStore.final_scale = null;
        }

        // initial touch can be any scale distance so don't use the scale distance directly
        // get the difference of the distance since the last movement
        let diff = (draftStore.last_scale != null) ? e.scale - draftStore.last_scale : 0;
        console.log("[hammertime] diff", diff);

        // add the last movements difference to the current size
        let calc = draftStore.current_scale + diff;
        console.log("[hammertime] calc", calc);
        draftStore.last_scale = e.scale;


        let scale_max = 3;
        let scale_min = .4;
        // draftStore.scale = ( calc > scale_limit_small && calc < scale_limit_large ) ? calc : draftStore.scale;
        draftStore.scale = ( calc > scale_min && calc < scale_max ) ? calc : (calc <= scale_min) ? scale_min : scale_max;
        draftStore.current_scale = draftStore.scale;

        e.preventDefault();
      });

      hammertime.on("pinchend", function (e) {
        // prep for initial touch
        draftStore.final_scale = draftStore.scale;
        e.preventDefault();
      });
    }
  },[draftStore.initiated]);
```
**works nicely - smooth scaling**

forming elements add scale to inline style if element is outer target
```
  let tree_style = (root == true) ? {transform: `scale(${draftStore.scale})`} : {};
  // draftStore.completed = true;
  return (
    <ul {...ul_class} style={tree_style}>
      {list}
    </ul>
  )
```

### Modifications for trackpad
