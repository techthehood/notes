# HTML5 canvas notes 001
pg 255

creates an image, sets the source of the image, and, after waiting for
the image to load, draws the image into the canvas’s upper-left corner.

simple canvas starter

```
//html

	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width">
	  <title>JS Bin</title>
	</head>
	<body>
	<canvas id="canvas" width="1200" height="700"></canvas>
	</body>
	</html>

//js

	var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	image = new Image();
	image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
	image.onload = function(e) {
	context.drawImage(image, 0, 0);
	};

//css

	#canvas{
	  height:200px; 
	  width:90%; 
	  border:1px solid red;
	}

```