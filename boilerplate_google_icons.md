
[google material icons docs](http://google.github.io/material-design-icons/)
[single download](https://material.io/icons/)

//add this to a file
[MaterialIcons-Regular.woff](https://github.com/google/material-design-icons/blob/master/iconfont/MaterialIcons-Regular.woff)

//i put the icons in the xfiles/images folder
//i put the css file in the xfiles/css folder

//here is the code

//this works to help me locate the woff file
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(../images/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(../images/MaterialIcons-Regular.woff2) format('woff2'),
    url(../images/MaterialIcons-Regular.woff) format('woff'),
    url(../images/MaterialIcons-Regular.ttf) format('truetype');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}