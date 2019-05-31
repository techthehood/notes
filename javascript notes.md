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

#### using reduce
```
  var n_val = t_ary.reduce(function(result,something,what)
  {
    // to skip "two" return the result without making any changes
    // otherwise you're pushing to undefined
    if(something == "two"){return result;};

    // let mesee the array values
    console.log("result = ",result);
    console.log("something = ",something);
    console.log("what =",what);

    result.push(something);
    return result;

    // the key to this working is this empty array set here as the
    // 2nd parameter of the reduce fn
  },[]);

```
