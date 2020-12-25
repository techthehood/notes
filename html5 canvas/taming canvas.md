

managable css
```
  div.canvas_wrapper{
    display:flex;
    width:100% $mp;
    flex: 0 0 auto;
    /*height:100% $mp;*/
    /*margin:.5rem auto;*/
    .canvas_cont{
      display:table-cell $mp;
      /*width:unset $mp;*/
      width:100%;
      .canvas_area{
        margin:0 auto;
        width:unset $mp;
        height:unset $mp;
        display:unset $mp;
        .ImgCanvas{width:100% $mp; height:auto $mp;}
      }
    }
  }
```
the best use of images is not to use canvas at all, but to use img elements

the next best use is the use locally saved images in the canvas. do your editing in the canvas then right click and save the edited results

if you must use canvas (because you want custom edited images that are not local to your site) the canvas_wrapper scheme helps to keep the canvas from overflowing the html element boundaries
