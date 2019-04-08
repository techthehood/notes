# Canvas Printing

[canvas2image hing](https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl)   
[canvas2image docs](https://github.com/hongru/canvas2image)   

[How to save an HTML5 Canvas as an image on a server? (hint)](https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server)   
[Save a Base64 Encoded Canvas image to a png file using PHP](http://j-query.blogspot.com/2011/02/save-base64-encoded-canvas-image-to-png.html)   
**article code**
```
<?php
	// requires php5
	define('UPLOAD_DIR', 'images/');
	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . uniqid() . '.png';
	$success = file_put_contents($file, $data);
	print $success ? $file : 'Unable to save the file.';
?>
```

```
setSnapData({cors:false})// cors:false in js won't help - someone can just change the js to true

```
>i will need to sanitize the img data anyway before saving it to the server

[Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)   
[canvas.toDataURL() SecurityError](https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror)   
**no direct way to test for tainted canvas**
[test for tainted canvas](https://stackoverflow.com/questions/22575636/how-to-check-if-a-canvas-element-has-been-tainted)   


GOTCHA: securityerror if site http and img https don't match on same origin
make sure your admin site is served over correct protocol

```
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);// this one replaces spaces with '+'
$data = base64_decode($img);
```
[php docs file_put_contents](http://php.net/manual/en/function.file-put-contents.php)   
[simple example for file_put_contents](https://www.geeksforgeeks.org/php-file_put_contents-function/)   

**failed**
```
  $snap_retData .= file_put_contents(JUri::root() . "test2.md","some text for the test.");
```

>JUri::root() is like trying to add something in the house from the outside address.  the outside address is of no use to those inside the house.
JPATH_ROOT is for the inside of the house


>JPATH_ROOT = /home2/sitename/public_html/test

**this works**
```
  $snap_retData .= file_put_contents(JPATH_ROOT . "/test2.md","some text for the test.");
```

**i tried joomlas jwrite... it didn't work (failed)**
[joomla jFile::write](https://docs.joomla.org/API16:JFile/write)
[jfile write example](https://hotexamples.com/examples/-/JFile/write/php-jfile-write-method-examples.html)
```
// JFile::write(JUri::root() . "test2.md", "some text for the test.");
```
**it actually broke my php script (500 error)**

### GOTCHA: on canvas change and server update the cache still shows the old img
[force cache to reload img hint](https://engineering.shoutapp.io/forcing-reload-of-an-image-in-html-c601712524ba)   

```
logo_animated.svg?rnd=5234
```
**works**


### summary
```
	state.take_snapshot = false;
	state.snap_data = "";

  this.setSnapData = function () {
    state.take_snapshot = true;// may not need this - maybe for downloads?
  }
  this.getSnapData = async function() {
    return make_snapData()
    .then(function (result) {
      return state.snap_data = result;
    })
    .catch(function (err) {
      console.log(`tainted canvas issue ${err}`)
      return state.snap_data;
    });

  }//getSnapData

  var make_snapData = async function () {
    let snap_shot = state.canvas.toDataURL();
    return snap_shot;
  }
	```
