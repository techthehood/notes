
To use the snapper controls to scroll to an item/element
```
  target.scrollIntoView();
```

#### [Smooth Scrolling](https://css-tricks.com/snippets/jquery/smooth-scrolling/)   
```
  target.scrollIntoView({behavior: 'smooth'});
```

#### [Detecting when a visitor has stopped scrolling with vanilla JavaScript](https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/)   
```
  // Setup isScrolling variable
var isScrolling;

// Listen for scroll events
window.addEventListener('scroll', function ( event ) {

	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		// Run the callback
		console.log( 'Scrolling has stopped.' );

	}, 66);

}, false);
```
**i used isScrolling in a class so inside the scroll function it became this.isScrolling**

[Detecting if an element is in the Viewport : jQuery](https://medium.com/talk-like/detecting-if-an-element-is-in-the-viewport-jquery-a6a4405a3ea2)   
**i used this to get the gist of how this worked - i used vanilla js not jQuery**
