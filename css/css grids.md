# css grids
[favorite reference](https://css-tricks.com/snippets/css/complete-guide-grid/)
[w3schools css grid docs](https://www.w3schools.com/css/css_grid.asp)

.html file
```
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
  </head>
  <body>
    <div class="wrapper">
      <div class="box box1">
        box 1
      </div>
      <div class="box box2">
        box 2
      </div>
      <div class="box box3">
        box 3
      </div>
      <div class="box box4">
        box 4
      </div>
          <div class="box box5">
        box 5
      </div>
      <div class="box box6">
        box 6
      </div>
    </div>

  </body>
  </html>
```

css file
```
  .wrapper{
    display:grid;
    grid-template-columns: 1fr 1fr  1fr;
    grid-auto-rows:minmax(100px,auto);
    grid-gap:.5em;
  }
  .wrapper > div{
    background:#eee;
    padding:1em;
  }
  .wrapper > div:nth-child(odd){
    background:#ddd;
  }
  .box1{
    grid-column:1;
    grid-row:1/3;
    border:1px solid blue;
  }
  .box4{
    grid-column:1/3;
    grid-row:2/4;
    border:1px solid red;
  }
  .box3{
    grid-row:1/3;
  }
  .box5{
    grid-colum:
    grid-row:2/3;
    border:1px solid red;
  }
```
### GOTCHA - [word wrapping issue](https://www.w3schools.com/cssref/css3_pr_text-overflow.asp)
```
  white-space:normal;
```

### GOTCHA - [fill the space without specifying number of columns](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)
**items will auto stretch to fill the available space**
```
.resrc_ctrls_cont{
  grid-area:ctrls;/*needed to span the container across its parents columns*/

  display:grid;/*to create a grid enviromment for the target child nodes (nested grid)*/
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
  /*the 20% represents its fullest state where the item is at its smallest. 20% for 5 columns*/
  /*the 1fr is at its largest state if there is only a single item - here 1fr says take up 100% of the available space at max*/

  what if i just did repeat 1fr? it would fail.
```

### my code without the comments
```
grid-area:ctrls;
display:grid;
grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
```
## **!important: auto-fit** not ~~auto-fill~~

### create a single column grid with variable height rows
**[grid template shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)**   
```
.build_section3{
  display:grid;
  grid-template:"h_label" 1fr "h_input" 1fr "ctrls" 1fr "c_label" 1fr "c_input" 4fr/auto;
  grid-gap:.5rem;
}
```
**template is built in shortcut syntax**
**the /auto at the end is for column width, if there were 3 columns it could be written
as**
```
/1fr 25px auto
```

**here is my failed test trial**
```
grid-template:"title title title ctrls" 1fr/1fr
"content content content content" 4fr/1fr;
```

**so i just did it with regular syntax**
```
grid-template-areas:"title title title ctrls"
"content content content content";
grid-template-columns: auto 20%;
grid-template-rows: 10% auto;
```
[align-items vs align-content](https://stackoverflow.com/questions/40740553/what-is-the-difference-between-align-items-vs-align-content-in-grid-layout)   


### finished form - b4 final changes
.html
```
<div class="build_section3 build_sections"  ng-show="scene.seeSection == '3'">
  <label class="h_label">css targets</label>
  <input type="text" class="h_input" value="" title="use space or commas"
  placeholder="space or comma separators">
  <button type="button" class="style_btn button w3-btn" >style</button>
  <button type="button" class="class_btn button w3-btn" >class</button>
  <label class="c_label">{{}} array</label>
  <textarea class="c_txtarea style_ta" rows="8" cols="80"
  placeholder="create a double quoted array"></textarea>
  <textarea class="c_txtarea class_ta" rows="8" cols="80"
  placeholder="create a double quoted array"></textarea>
</div>
```
.css
```
.build_section3{
  display:grid;
  grid-template:"h_label h_label" auto
  "h_input h_input" auto
  "style_btn class_btn" .8fr
  "c_label c_label" auto
  "c_txtarea c_txtarea" 4fr/1fr 1fr;
  grid-gap:.5rem;
  padding: .5rem 1rem 1rem !important;
  .h_label{grid-area:h_label; justify-self: start;}
  label{ margin: unset; font-size: 1.2rem;}
  .h_input{grid-area:h_input; justify-self: stretch; width:100%; height:2.5rem;}
  .ctrls{grid-area:ctrls; justify-self: stretch;}
  button{border-radius:7px; border: 1px solid #ccc; padding:unset;}
  .c_label{grid-area:c_label;justify-self: start;}
  .c_txtarea{grid-area:c_txtarea; justify-self: stretch; width:100%;}
}

```

### advanced display
**asset elements can be customized have individual display designs**

on container 'main'
```
grid-template-columns: repeat(4,1fr);
grid-template-rows: repeat(4,1fr);
```

on 'content' container
```
grid-column:1/span3;
grid-row:2/span4;
```

GOTCHA - module wouldn't show up on the Page
**module wasn't activated on the pages menu**
