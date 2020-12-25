# scss notes


#### [placeholder selectors in scss](https://naxoc.net/2014/01/28/placeholder-selectors-in-sass/)
```
  %speak {
    font-family: Courier New, monospace;
    max-width: 400px;
    clear: both;
    span {
      font-weight: bold;
      display: block;
    }
  }
.voice-1 {
  @extend %speak;
  span {
    color: magenta;
  }
}
```
> doesn't render %speak class like @extend .speak does
