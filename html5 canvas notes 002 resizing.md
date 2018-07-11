# HTML5 canvas notes 002

using drawImage argument sets

exercise:
scale the image to fit the canvas when checkbox is checked

simple canvas starter

	drawImage(image, dx, dy)
	drawImage(image, dx, dy, dw, dh)
	drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

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
			<input class="checker" type="checkbox" onclick="drawImage()"/>
			<div class="canvas_cont">
			<canvas id="canvas" class="canvas" width="200" height="1600"></canvas>
			</div>
		</body>
	</html>

//js

var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	image = new Image();
	image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
	image.onload = drawImage();
	
    function drawImage(e) {
		let canvas = document.getElementById('canvas'),
		checker = document.querySelector(".checker");
		checker.style.borderColor="red";
		
		//see if checker is working
		console.log(`checker = ${checker.checked}`);
		context.clearRect(0, 0, canvas.width, canvas.height);
		if(checker.checked == true){
		
			//see if canvas is working
			console.log(`canvas = ${canvas.width}`)
			
			//or i can start with a different destination x and y
			context.drawImage(image,30,200,canvas.width,canvas.height);
			
			context.drawImage(image,0,0,canvas.width,canvas.height);
		
		}else{
			context.drawImage(image, 0, 0);
		}
    }//end drawImage

//css

#canvas{
  height:100%;
  border:1px solid red;
}
.canvas_cont{
  display:flex;
  justify-content:center;
  padding:10px;
  width:90%;
  height:200px;
  border:2px solid blue;
}

```