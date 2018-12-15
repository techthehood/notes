# HTML5 canvas notes 003

drawing outside the canvas

exercise:
scales image by drawing src image outside destination canvas

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
			<div id='controls'>
				<output id='scaleOutput'>1.0</output>
				<input id='checker' class='checker' type='range'
				min='1' max='3.0' step='0.01' value='1.0'/>
			</div>
			<div id="canvas_cont" class="canvas_cont">
			<canvas id="canvas" class="canvas" width="1200" height="800"></canvas>
			</div>
		</body>
	</html>


//js

	var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	image = new Image(),
	scaleSlider = document.querySelector('.scaleSlider'),
	scale = 1.0,
	MINIMUM_SCALE = 1.0,
	MAXIMUM_SCALE = 3.0;

	function drawImage() {
		var w = canvas.width,
		h = canvas.height,
		sw = w * scale,
		sh = h * scale;
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(image, -sw/2 + w/2, -sh/2 + h/2, sw, sh);
	}

	function drawScaleText(value) {
		var text = parseFloat(value).toFixed(2);
		var percent = parseFloat(value - MINIMUM_SCALE) /
		parseFloat(MAXIMUM_SCALE - MINIMUM_SCALE);
		scaleOutput.innerText = text;
		percent = percent < 0.35 ? 0.35 : percent;
		scaleOutput.style.fontSize = percent*MAXIMUM_SCALE/1.5 + 'em';
	}

	scaleSlider.onchange = function(e) {
		scale = e.target.value;
		if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
		else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;
		drawScaleText(scale);
		drawImage();
	};

	// Initialization......................................................
	context.fillStyle = 'cornflowerblue';
	context.strokeStyle = 'yellow';
	context.shadowColor = 'rgba(50, 50, 50, 1.0)';
	context.shadowOffsetX = 5; context.shadowOffsetY
	= 5;
	context.shadowBlur = 10;
	image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
	image.onload = function(e) {
	drawImage();
	drawScaleText(scaleSlider.value);
	};

//css

#canvas{
  height:100%;
  border:1px solid red;
  /*margin: 10px 20px 0px 20px;*/
border: thin solid #aaaaaa;
cursor: crosshair;
}
.canvas_cont{
  display:flex;
  justify-content:center;
  padding:10px;
  width:90%;
  height:200px;
  border:2px solid blue;
}
body {
background: rgba(100, 145, 250, 0.3);
}
#checker {
vertical-align: 10px;
width: 100px;
margin-left: 90px;
}
#canvas {

}
#controls {
margin-left: 15px;
padding: 0;
}
#scaleOutput {
position: absolute;
width: 60px;
height: 30px;
margin-left: 10px;
vertical-align: center;
text-align: center;
color: blue;
font: 18px Arial;
text-shadow: 2px 2px 4px rgba(100, 140, 250, 0.8);
}

```
