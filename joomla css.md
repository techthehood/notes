# joomla css patterns
### manage the image editor css

// ...templates/isis/css/template.css
```
	ul.thumbnails{
		display:flex !important;
		flex-flow: row wrap;
		justify-content:space-between;
	}
	
	
```

### manage the image editor close btn

// ...templates/isis/css/template.css
```
	#sbox-btn-close {
		right: 30px;
		top: 0px;
	}
```

### manage the image editor iframe

// psmod.scss
```
	#sbox-window.upload {
		width: 80vw !important;
		height: 80vh !important;
		position: absolute !important;
		top: 10vh !important;
		left: 10vw !important;
	}
```

### change the height on the media manager window

//root/media/media/css/popup-imagemanager.css

```
	iframe#imageframe {
		height: 400px;
	}
	
```

https://stackoverflow.com/questions/2148131/xampp-wamp-whatever-it-is-apache-is-running-super-slow