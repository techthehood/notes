# CSS scroll

### css scroll snap

[Practical CSS Scroll Snapping](https://css-tricks.com/practical-css-scroll-snapping/)   

[How TO - Custom Scrollbar](https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp)   


```
  .container{
    display: flex;
    flex-flow: row nowrap;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
  }

  .item{
    margin: auto .20rem;
    flex: 1 0 96%;
    scroll-snap-align: start;
  }
```

#### How do you hide the scroll bars in css?
[Hide Scrollbars But Keep Functionality](https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp)   

```
  /* Hide scrollbar for Chrome, Safari and Opera */
  .example::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE and Edge */
  .example {
    -ms-overflow-style: none;
  }

  .hide-scroll {
    scrollbar-width: none;/*hides in firefox*/
  }
```

##### finished sample
```
      .snap_cont{
        display: flex;
        flex-flow: row nowrap;
        width:100%;
        height: 20rem;
        border:1px solid #ddd;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll;
        -ms-overflow-style: none;/* Hide scrollbar for IE and Edge */
        scrollbar-width: none;/*hides in firefox*/
        &::-webkit-scrollbar {
          display: none;
        }
        .snap_dummy{
          /*width: 100%;*/
          height:100%;
          border:1px solid red;
          margin: auto .20rem;
          flex: 1 0 96%;
          scroll-snap-align: start;
        }
      }/*snap_cont*/
```
firefox scrollbar width
[can i use scrollbar-width](https://caniuse.com/#search=scrollbar-width)   
[Hide scrollbar in firefox](https://stackoverflow.com/questions/19580366/hide-scrollbar-in-firefox/54098571)   
```
  .not-scroll-body {
    overflow: auto;
    height: 200px;
    width: 90%;
    background: linear-gradient(to bottom, cyan, blue);
    white-space: no-wrap;

    /* the line that rules them all */
    scrollbar-width: none;/*hides in firefox*/
    /* */
  }
```
**i think you need overflow: auto too**

a univeral example
```
    /* Hide scrollbar for Chrome, Safari and Opera */
    .hide-scroll::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE and Edge */
    .hide-scroll {
      -ms-overflow-style: none;
      scrollbar-width: none;/*hides in firefox*/
    }
```

#### [fix overscroll behavior](https://developers.google.com/web/updates/2017/11/overscroll-behavior)   
[caniuse overscroll-behavior](https://caniuse.com/#feat=css-overscroll-behavior)   
#### controlling scroll chaining

```
      overscroll-behavior-x: contain;
```

#### Disabling pull-to-refresh
```
  body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```
