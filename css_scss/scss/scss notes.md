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

#### Using a placeholder selector in a media query   

**GOTCHA: failed - can not @extend selector across media queries**

```
  %sv-mobile { 
  // [sass mixin](https://sass-lang.com/documentation/at-rules/mixin)
  background-size: 72% 10%, 30% 30%, 88% 60%;
  background-position: 70px 210px, 20px 200px, 20px 20px;
}



.d3-skeleton-video {
  ...
  @include media.mobile{
    min-height: 250px; 
    @extend %sv-mobile;// fails
  }
  ...
```
> i tried to use the placeholder selector in a media query   
> instead i had to convert it to a mixin and it worked   
[sass mixin](https://sass-lang.com/documentation/at-rules/mixin)

**works**

```
  @mixin sv-mobile { 
    background-size: 72% 10%, 30% 30%, 88% 60%;
    background-position: 70px 210px, 20px 200px, 20px 20px;
  }

  .d3-skeleton-video {
    ...
    @include media.mobile{
      min-height: 250px; 
      @include sv-mobile;// works
      // @extend %sv-mobile;// fails
    }
    ...
```
> works

#### [sass mixin with media query](https://youtu.be/roywYSEPSvc?t=2087)   

_prep_

```
  $desktop: 840px;

  @mixin desktop{
    @media(min-width: #{$desktop}){
      @content;
    }// @media
  }// desktop
```
> @content works similar to react's props.children

_usage_

```
  .bg{
    width: 100%;
    @include desktop{
      width: 50%;
    }// desktop
  }// .bg
```
#### working example

*_queries.scss*

```
  @mixin wearable{
    @media only screen and (min-width:300px) and (max-width:324px)
    {
      @content;
    }
  }// tiny-range

  @mixin mobile{
    @media only screen and (min-width:320px) and (max-width:479px)
    {
      @content;
    }
  }// mobile-range

  @mixin smartphone{
    @media only screen and (min-width:480px) and (max-width:767px){
      @content;
    }
  }// tablet-range

  @mixin tablet{
    @media only screen and (min-width:768px) and (max-width:991px)
    {
      @content;
    }
  }// desktop-range

  @mixin desktop{
    @media only screen and (min-width:992px) and (max-width:1999px)
    {
      @content;
    }
  }// desktop-range


  /* AT LEAST THIS TALL*/
  @mixin wearable-min{
    @media only screen and (min-width:300px){
      @content;
    }
  }// tiny-min

  @mixin mobile-min{
    @media only screen and (min-width:480px)
    {
      @content;
    }
  }// mobile-min

  @mixin tablet-min{
    @media only screen and (min-width:768px)
    {
      @content;
    }
  }// tablet-min

  @mixin desktop-min{
    @media only screen and (min-width:992px)
    {
      @content;
    }
  }// desktop-min
```

**[sass using @import (article)](https://sass-lang.com/documentation/at-rules/import)**   

```
  @import '../../../../css/queries';
    .toaster_home{
      position: fixed;
      bottom: 0;
      width: 100vw;
      margin: 0 auto;
      padding: .5rem;
      .d3-toast, .d3_toast{background-color: cornsilk; padding: .5rem;
        p{margin: unset; word-break: break-word;/*helps in p tag word wrapping*/}
        margin: 0 auto;
        @include mobile{
          max-width: 30rem;
        }// mobile
        @include smartphone{
          max-width: 30rem;
        }
      }// d3_toast
    }
```
#### GOTCHA: import produced an error when i used @import at the bottom of the page (under referencing calls)
