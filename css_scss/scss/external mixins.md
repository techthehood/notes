# scss external mixin notes

[scss external mixins](https://sass-lang.com/documentation/at-rules/use)   

**_media.scss**

```
$desktop: 1199px;

@mixin desktop{
  @media only screen and (max-width: #{$desktop}){
    // GOTCHA: change to XL mixin
    @content
}// desktop
```

**Register.scss**

```
  @use "../media"

  @include media.desktop{
    font-size: 40px $mp;
  }
```
> You can access variables, functions, and mixins from another module by writing <namespace>.<variable>, <namespace>.<function>(), or @include <namespace>.<mixin>()

[Nested mixins or functions in SASS](https://stackoverflow.com/questions/16020316/nested-mixins-or-functions-in-sass)   

> [this seems to work](https://codepen.io/crazyrohila/pen/mvqHo)   

```
  @mixin a {
    @content
  }
  @mixin b {
    @include a{background: red;};
    color: white;
    font-size: 20px;
  }
  div {
    @include b();
  }
```

#### Using a placeholder selector in a media query   

**GOTCHA: failed - can not @extend selector across media queries**

> see scss notes.md