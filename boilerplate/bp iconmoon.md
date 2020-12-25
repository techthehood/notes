# iconmoon notes

#### paste four files from ./fonts folder into live ./fonts folder
```
  icomoon.eot
  icomoon.svg
  icomoon.ttf
  icomoon.woff

```
#### koala compile the .css file from the .scss file
#### create or edit (if created) the style.scss file
file is imported in templates/partials/icomoon.hbs
```
  <link rel="stylesheet" href="icomoon/style.css">
```
#### sample heading
style.scss
```
  $mp: !important;
  $mod_route:'/core';
  $site_path:'#{$mod_route}/icomoon';// public version

  @font-face {
    font-family: 'icomoon';
    src:  url('#{$site_path}/fonts/icomoon.eot?355iv0');
    src:  url('#{$site_path}/fonts/icomoon.eot?355iv0#iefix') format('embedded-opentype'),
      url('#{$site_path}/fonts/icomoon.ttf?355iv0') format('truetype'),
      url('#{$site_path}/fonts/icomoon.woff?355iv0') format('woff'),
      url('#{$site_path}/fonts/icomoon.svg?355iv0#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-hold:before {
    content: "\e915";
  }
  .icon-attach-out:before {
    content: "\e913";
  }
  .icon-attach-in:before {
    content: "\e912";
  }
  .icon-file:before {
    content: "\e904";
  }
  .icon-trophy2:before {
    content: "\e908";
  }

  ...

```


#### stock (unaltered) sample heading
```
  @font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?pptzph');
  src:  url('fonts/icomoon.eot?pptzph#iefix') format('embedded-opentype'),
    url('fonts/icomoon.ttf?pptzph') format('truetype'),
    url('fonts/icomoon.woff?pptzph') format('woff'),
    url('fonts/icomoon.svg?pptzph#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
