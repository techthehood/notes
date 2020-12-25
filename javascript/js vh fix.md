# hack to fix vh when youtube link is clicked
#### GOTCHA [The trick to viewport units on mobile](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)   

core_height.scss
```
  :root {
    --vh: 1vh;
  }

  .arc_stage{
    // height: 99vh $mp; //92vh
    height: calc(var(--vh, 1vh) * 100);
    .root{height: 100%;}
  }
```

app.js
```

document.addEventListener('DOMContentLoaded', async function () {
  ...

	window.addEventListener('resize', () => {
	  // We execute the same script as before
	  let vh = window.innerHeight * 0.01;
		console.warn(`[app] app resizing`);
	  document.documentElement.style.setProperty('--vh', `${vh}px`);
		// hack to fix resizing on mobile when youtube link is clicked
	});

  ...

});
```
**i do expect some other challenges - like some jumping on window resizing - that i may need to address**
