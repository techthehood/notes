# w3-css notes

#### [using w3-css grid](https://www.w3schools.com/w3css/w3css_grid.asp)   

```
  <div className="w3-row">
  <fieldset className={`w3-col m4 w3-right`}>
    // name input
  </fieldset>
  <fieldset className={`w3-rest`}>
    // title input
  </fieldset>
</div>
```

#### using rest for 2nd items   
> so when the 2nd item is taken away the first item takes up all the remaining space

```
<div className="w3-row">
  <fieldset className={`w3-col m4 w3-right`}>
    // title input
  </fieldset>
  <fieldset className={`w3-rest`}>
    // name input
  </fieldset>
</div>
```
> NOTE: the inputs orders are reversed for rest to work

> GOTCHA: it looks great when you hide the smaller item that should appear at the end but when screen switches to mobile that items appear out of place because the rest item has to be the last item

try using :only-child as a fix

```
.w3-row{
  *:only-child(){ width: 100%;}
}
```
[CSS :only-child Selector](https://www.w3schools.com/cssref/sel_only-child.asp)