# css animation notes
[fade in](https://stackoverflow.com/questions/11660710/css-transition-fade-in)
```
.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 2s;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
```
i used the class d3-fade-in in a scss mixin
```
  _fade.scss

  psmod.scss
  @import "fade";
```

*it works on element.style.display != none
so whenever a display is activated after being inactive*
