# HTML5 canvas notes 005

offscreen canvas

exercise:
using an offscreen canvas

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
				<input id='scaleSlider' class='scaleSlider' type='range'
				min='1' max='3.0' step='0.01' value='1.0'/>
			</div>
			<div id="canvas_cont" class="canvas_cont">
			<canvas id="canvas" class="canvas" width="1200" height="800"></canvas>
			</div>
		</body>
	</html>
	
	
//js

	var silverhawks = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';

	var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	offscreenCanvas = document.createElement('canvas'),
	offscreenContext = offscreenCanvas.getContext('2d'),
	image = new Image(),
	scaleSlider = document.getElementById('scaleSlider'),
    scaleOutput = document.getElementById('scaleOutput'),
	canvasRadio = document.getElementById('canvasRadio'),
	imageRadio = document.getElementById('imageRadio'),
	scale = scaleOutput.value,
	scale = 1.0,
	MINIMUM_SCALE = 1.0,
	MAXIMUM_SCALE = 3.0;
	
	// Functions...........................................................
	
	function drawScaled() {
		var w = canvas.width,
		h = canvas.height,
		sw = w * scale,
		sh = h * scale;
		context.drawImage(offscreenCanvas, 0, 0,
		offscreenCanvas.width, offscreenCanvas.height,
		-sw/2 + w/2, -sh/2 + h/2, sw, sh);
	}
	
	function drawScaleText(value) {
		var text = parseFloat(value).toFixed(2);
		var percent = parseFloat(value - MINIMUM_SCALE) /
		parseFloat(MAXIMUM_SCALE - MINIMUM_SCALE);
		scaleOutput.innerText = text;
		percent = percent < 0.35 ? 0.35 : percent;
		scaleOutput.style.fontSize = percent*MAXIMUM_SCALE/1.5 + 'em';
	}
	
	function drawWatermark(context) {
		var lineOne = 'Copyright',
		lineTwo = 'Acme, Inc.',
		textMetrics = null,
		FONT_HEIGHT = 128;
		context.save();
		context.fillStyle = 'rgba(100,140,230,0.5);';
		context.strokeStyle = 'yellow';
		context.shadowColor = 'rgba(50, 50, 50, 1.0)';
		context.shadowOffsetX = 5;
		context.shadowOffsetY = 5;
		context.shadowBlur = 10;
		context.font = FONT_HEIGHT + 'px Arial';
		textMetrics = context.measureText(lineOne);
		context.translate(canvas.width/2, canvas.height/2);
		context.fillText(lineOne, -textMetrics.width/2, 0);
		context.strokeText(lineOne, -textMetrics.width/2, 0);
		textMetrics = context.measureText(lineTwo);
		context.fillText(lineTwo, -textMetrics.width/2, FONT_HEIGHT);
		context.strokeText(lineTwo, -textMetrics.width/2, FONT_HEIGHT);
		context.restore();
	}
	
	scaleSlider.onchange = function(e) {
		scale = e.target.value;
		if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
		else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;
		drawScaled();
		drawScaleText(scale);
	}
	
	// Initialization......................................................
	offscreenCanvas.width = canvas.width;
	offscreenCanvas.height = canvas.height;
	image.src = silverhawks;
	
	image.onload = function(e) {
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		offscreenContext.drawImage(image, 0, 0,
		canvas.width, canvas.height);
		drawWatermark(context); drawWatermark(offscreenContext);
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
#scaleSlider {
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