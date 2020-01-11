# icon fonts

#### [Creating and Implementing Your Own Icon Font – A Tutorial](https://mediatemple.net/blog/tips/creating-implementing-icon-font-tutorial/)    

#### test 1
```
  src:  url('fonts/icomoon.eot?ukb6uu');
  src:  url('./fonts/icomoon.eot?ukb6uu');//failed
```
**both created a path relative to the dist folder**

#### test 2
```
  src:  url('/user/alight/xfiles/icomoon/fonts/icomoon.eot?ukb6uu');//worked
```
**good for requireing in react**
**this worked and added the location origin (https://example.com)**



#### what about partials version?

[root]/templates/partials/icomoon.hbs
```
  <link rel="stylesheet" href="icomoon/style.css">
```

[index].hbs (add partial)
```
  {{>icomoon}}
```

add icomoon folder to public dir
**note: be sure to use koala to compile scss (no webpack available for this)





#### final working version
```
  $mod_route:'/user';
  $site_path:'#{$mod_route}/alight/xfiles/icomoon';

  @font-face {
    font-family: 'icomoon';
    src:  url('#{$site_path}/fonts/icomoon.eot?ukb6uu');
    src:  url('#{$site_path}/fonts/icomoon.eot?ukb6uu#iefix') format('embedded-opentype'),
      url('#{$site_path}/fonts/icomoon.ttf?ukb6uu') format('truetype'),
      url('#{$site_path}/fonts/icomoon.woff?ukb6uu') format('woff'),
      url('#{$site_path}/fonts/icomoon.svg?ukb6uu#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

```
**I had to manually add the path to the folder myself without the origin which is programatically added**

#### here is what the disc version css should be
```
  .d3-disc:before{
    content: "\e905";
    display: block;
    width: 22px;
    height: 22px;
    background-color: rgba(0,0,0,.3);
    -webkit-border-radius: 1em;
    border-radius: 1em;
    text-align: center;
    line-height: 22px;
  }
```
**font-size: 1rem (15px in this case) by default**

#### change the width, height and line-height to give the :before disc some padding
```
  :before{
    width: 25px;
    height: 25px;
    line-height: 25px;
  }
```
**note: i want the before width the push out the shape of the container. if there is a discrepancy remove the contain dimensions**

### to manage the container and give it some padding
```
  .d3-disc{
    border: 1px solid #ccc;
    width: fit-content;
    padding: 3px;
  }
```
**fit-content is key to getting the right sized container**
**GOTCHA: <a></a> elements have an issue with border and padding - causes an issue**
**GOTCHA: d3-btn also causes a styling conflict :after & :before probably has some contributing factors**

#### for that rounded container look add:
```
  .d3-disc{
    border: 1px solid #ccc;
    width: fit-content;

    padding: .15em;
    border-radius: 50px;
  }
```
#### the finished icon-font look
```
    .d3-ico{
      width: fit-content;
      padding: .15em;
    }
    .d3-ico:before{
      display: block;
      width: 22px;
      height: 22px;
      text-align: center;
      line-height: 22px;
    }

    .d3-disc{
      border: 1px solid #ccc;
      border-radius: 50px;
    }
    .d3-disc:before{
      color:white;
      background-color: rgba(0,0,0,.3);
      -webkit-border-radius: 1em;
      border-radius: 1em;
    }
```
**GOTCHA: text indent moves the icon waaayyyy off the page - never use**
```
  /*text-indent: -9999px;*/
```
