# Javascript notes

[disable 2-in-1 options menu after longpress](https://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript)

the solution that worked - found lower in the docs
```
document.body.addEventListener("contextmenu", function(evt){evt.preventDefault();return false;});
```

[detect mobile devices](https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript)
```
  function isMobileDevice() {
    return (typeof window.orientation !== "undefined") ||
    (navigator.userAgent.indexOf('IEMobile') !== -1);
};
```
