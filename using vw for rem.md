# using vw for rem

[px to vw calculator - useful site](http://pxtovw.com/)

research notes:
```
sample:

let screen_width = 1124;//'px'

let root_el_fs = 1.5;//root element font size in vw (1.5 % of screen_width)

let item_height = 217;//(px)

/*
what i did initially to figure out the rem size i needed to convert 
the item to
*/

let single_rem = screen_width * .015;//returned 16.86 (px)

/* 
then i took the single_rem and used it to determine how many
of these unites fit into the desired item height
*/
let new_item_height = item_height / single_rem;//returned 12.87 (px)

/*
so i made the new_items_height 12.87px which ended up being much shorter than
the 217px the item originally was.

when i manually increased to the 12.87 rem i found that the item looked similar
to its regular shape around 19 - 20 rem.  so how do i get this calculation to 
19 - 20rem?

so next i took the 1vw (1% of screen_width) and divided the item_height by it and ended up with 19.30px which was what i wanted.  

i also found that if i times the 12.87 by 1.5 (the vw calc) i ended up with 19.30. its almost as if i needed to magnify the new number by the same % i originally divided by.

this gave me the impression that since i divided by and then multiplied by a similar number (one was a % though) maybe i didn't need either multiplier at all.
*/

conclusion:

when using html{font-size:16px;}  rems are static measurements of the devices pixels. there is a direct correlation between the way you multiply the rems ie 1.3rem, 2.8rem and the multiplication of the root elements single unit of measurement (font-size) so 1.3rem is the same as 1.3 * 16px.  No matter what the device size multiplying rems in this case end up with the exact same numbers, but with the issue of elements that don't look good on given screen sizes due to how it displays its pixels in relation to the screen size.

200px on a laptop is much larger than 200px on a small handheld device.

Using vw:
this is not the case with using vw.  different devices have different unit group sizes. i.e.

489px wide device has a 1% px group of 4.8px
1124px wide device has a 1% group of 11.24px so the multiplcation of the rem
multiplies the groups differently.  

example:
handheld 489px device:
2rem on a 489px wide device would be 4.8 * 2 or 9.78px;

laptop 1124px device:

2rem on a 1124px device would be 11.24 * 2 or 22.48px;

this doesn't look like the consistency that we need. the measurements should still be related to each other.


because the rem in the case of a root using vw seems to be more of a magnification scale of a standard measurement we can use the idea of a sample group of px as our standard measurement on each device.  

1% on a handheld device and 1% on a large device is still 1% regardless of the dimensions of each.

so if i take that 1% group and figure out all other measurements based on that 1% sample i can get a consistent size of 1% * x for all of the measurements in my document.

217px item / 1% sample on a large device would give us about 19 1% units.

if i take 19 1% units on a small device the size of the item in relation to the screen dimensions will appear to be the same.  1% of the width.  Its true that this doesn't do any better for small devices which will still appear to be small like px's did both being too small in their display in comparison to how the are displayed on larger devices.

vw to the rescue:

vw then becomes similar to magnifiers for the devices they are used on.  on desktops a 1 : 1 correlation between the sample groups px size and 1 rem may still be too small in a display to the sizes you may expect things to show up as. but you can use customize the vw which will have the effect of multiplying all of the elements set in rem to n * the vw%.  
so html{font-size:1.5vw;} would be like telling the display to make every unit group 1.5 times larger than their original display.  this would make a 217px item look like 325px in the display.

on small handheld devices you may use 2.8 or 3.2rem which would magnify their sample units to 2 or 3 times their normal size.   a 217px item would then look like they are 694px on a small device with html font-size set to 3.2vw 

html{font-size:3.2vw;}

this is 3 times larger than it appears normally on a tiny display.  which would make it seem similar to font and item sizes found on larger devices.

css media queries

```
  @media only screen and (min-width:300px) and (max-width:479px)
  {
    html{font-size:3.9vw !important;}
  }
  @media only screen and (min-width:480px) and (max-width:768px)
  {
    html{font-size:1.8vw !important;}
  }
  @media only screen and (min-width:769px) and (max-width:992px)
  {
    html{font-size:1.5vw !important;}
  }
  @media only screen and (min-width:993px) and (max-width:1239px)
  {
    html{font-size:1.4vw !important;}
  }
  @media only screen and (min-width:1240px) and (max-width:1343px)
  {
    html{font-size:1.25vw !important;}
  }
  @media only screen and (min-width:1344px) and (max-width:1468px)
  {
    html{font-size:1.15vw !important;}
  }
  

 
## calculating in js:

```
let view_cont_w = target_element.offsetWidth; 
```

### js version of css media calculations
```
      this.view_widths = [
        {min:0,max:299,view:5.0},
        {min:300,max:479,view:3.9},
        {min:480,max:768,view:1.8},
        {min:769,max:992,view:1.5},
        {min:993,max:1239,view:1.4},
        {min:1240,max:1343,view:1.25},
        {min:1344,max:1468,view:1.15},
        {min:1469,view:1.0}
      ];//used with v_units
```




