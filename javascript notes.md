# Javascript notes

[disable 2-in-1 options menu after longpress](https://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript)

the solution that worked - found lower in the docs
```
document.body.addEventListener("contextmenu", function(evt){evt.preventDefault();return false;}); 
```