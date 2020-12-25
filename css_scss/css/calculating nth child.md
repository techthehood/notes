# calculating nth-child

[Useful :nth-child Recipes](https://css-tricks.com/useful-nth-child-recipies/)   

[from the demo](https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_nth-child_formula)   
```
  <!DOCTYPE html>
<html>
<head>
<style>
p:nth-child(3n+0) {
  background: red;
}
</style>
</head>
<body>
Using a formula (an + b). Description: a represents a cycle size, n is a counter (starts at 0), and b is an offset value.
<p>The first paragraph.</p>
<p>The second paragraph.</p>
<p>The third paragraph.</p>
<p>The fourth paragraph.</p>
<p>The fifth paragraph.</p>
<p>The sixth paragraph.</p>
<p>The seventh paragraph.</p>
<p>The eight paragraph.</p>
<p>The ninth paragraph.</p>

<p><b>Note:</b> Internet Explorer 8 and earlier versions do not support the :nth-child() selector.</p>

</body>
</html>

```
in my own language

a tells the display to apply to every a-count items
n+b go together and together they describe where to start

p:nth-child(2n+0) apply to every 2nd item / start at item zero
**(this appears to skip the first item and start at item 2)**

p:nth-child(1n+0) apply to every item or **(every 1 item)**/ start at item zero
p:nth-child(2n+1) apply to every 2nd item / start at item 1
p:nth-child(2n+4) apply to every 2nd item / start at item 4
p:nth-child(2n+2) apply to every 2nd item / start at item 2
p:nth-child(3n+0) apply to every 3rd item / start at item 0
**starting at item 0 - is like starting off screen**

p:nth-child(n+5) apply to every item **(no item number defaults to 1)**/ start at item 5
**start at also includes that item**

#### do not apply
p:nth-child(-n+5) apply to every item backward from / start at item 5
p:nth-child(-n+-5) apply to every item backward from / start at item -5
**in this case nothing shows**

p:nth-child(4n-7) apply to every 4th item / start at item -7  (looks like 4n+1 )

i needed every 2nd and 3rd item to have a 45% flex and the first and every counted 3rd to have 100%
```
  ...
  .clip_item{
    &:nth-child(3n+1){
      //the 1st and every 4th item
      flex: 0 0 100%;
    }
    //otherwise make every 2nd and 3rd
    flex: 1 1 45%;
  ...

```
**i made every item 45% and then counted the 1st and every 3rd as special**
**when you need multiple items in a row to have something you add it to everything and take away from
the ones that don't need it**
 > what if its 2 - 2 -2 -2? idk.

#### [nth of type](https://www.w3schools.com/cssref/sel_nth-of-type.asp)
Specify a background color for every <p> element that is the second p element of its parent:
```
p:nth-of-type(2) {
  background: red;
}
```
