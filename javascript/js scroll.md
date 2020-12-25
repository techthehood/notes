
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


#### scrollIntoView breaking after a few uses.
- having difficulty maintaining vertical scroll so it can perform horizontal scolling
```
  let behavior = (!this.force_scroll.current) ? {
    behavior: 'smooth',
    block: 'nearest'
  } : {};
  // [fix for scrollIntoView ](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

  target.scrollIntoView(behavior);

  block: 'nearest'// worked
  block: 'start'//failed
  block: 'center'//failed
  block: 'end'// failed
```
**nearest was the only one to do the job. (a rare 1st try)**

#### there is a mysterious resize that is breaking it.
- using Exporter with snapper's controls
> resizing happened when going to a youtube link in mobile, but somehow also happened on desktop ( i think when using filter.js binder filter)
> so far i haven't been able to reproduce the resize, and so not able to reproduce the breaking issue so keep this under watch

virtualscroll
## Articles

### Binary search articles
[binary search](https://www.geeksforgeeks.org/binary-search/)   
[JavaScript Algorithms: What Is Binary Search, A Detailed Step-By-Step, And Example Code](https://medium.com/@jeffrey.allen.lewis/javascript-algorithms-explained-binary-search-25064b896470)   
[Iterative and Recursive Binary Search Algorithm](https://iq.opengenus.org/binary-search-iterative-recursive/)   

[Build your own virtualScroll pt 1](https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib)   
[virtualize long lists with react-window](https://web.dev/virtualize-long-lists-react-window/)   
