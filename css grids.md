# css grids

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
