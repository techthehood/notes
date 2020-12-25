# css animation notes

#### [css animation libraries](https://css-tricks.com/css-animation-libraries/)   

[animista](https://animista.net/)   


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

```
	.list_ctrls.grow{min-width:90%;}
	.list_ctrls.shrink{min-width:10%;}


	@keyframes shrink {
	    from {min-width: 90%;}
	    to {min-width:10%;}
	}
	@keyframes grow {
	    from {min-width:10%;}
	    to {min-width:90%;}
	}

	/* The element to apply the animation to */
	.shrink {
	    min-width: 10%;
	    animation-name: shrink;
	    animation-duration: .5s;
	    animation-fill-mode: forwards;
	}
	.grow {
	    min-width: 90%;
	    animation-name: grow;
	    animation-duration: .5s;
	    animation-fill-mode: forwards;
	}
```
#### original stretch squish test
```

  .description_display_cont{
    display: flex;
    justify-content: center;
    flex-flow: column;
    grid-area: desc;
    overflow: hidden;

    &.stretch{  height:90%;}
    &.squish{ height:0%; display:none;}
  }

  @keyframes  stretch{
    from {height:0%;}
    to {height:90%;}
  }
	@keyframes squish  {
	    from {height: 90%;}
	    to {height:0%;}
	}

	/* The element to apply the animation to */
  .stretch {
    height: 90%;
    animation-name: stretch;
    animation-duration: .5s;
    animation-fill-mode: forwards;
  }
	.squish {
	    height: 0%;
	    animation-name: squish;
	    animation-duration: .5s;
	    animation-fill-mode: forwards;
	}

```
**works - see GOTCHA**

[best for making collapsibles](https://alligator.io/css/collapsible/)
```
	.description_display_cont{
	  display: flex;
	  justify-content: center;
	  flex-flow: column;
	  grid-area: desc;
	  overflow: hidden;
		transition: max-height .25s ease-in-out;

	  &.stretch{
	    max-height: 10rem;
	  }
	  &.squish{
	    max-height:0rem;
	  }
	}
```
**works - see GOTCHA**
####GOTCHA: **css grid - this method ( = the one above?) and the original stretch squish method don't work well in css grid because the grid keeps space for the content elements even though the parent element's height is set to zero**

**i like this animation because i didn't have to make keyframes and use the css animation boilerplate**

#### another height adjustment animation
```
	.pully_pull_to_refresh{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border: 1px solid red;
	  // max-height: 5rem;
	  width: 100%;
	  max-height:200px;

	  transition: max-height .10s ease-in-out;

	  &.shrink{
	    max-height:50px;
	  }
	}
```
> here im just shrinking a div.  because i use max-height (so i didn't have to compete with an inline height style) i had to set a
> stay out the way max-height that was twice the size of the full height i was using. then decreased the max height with a transition
