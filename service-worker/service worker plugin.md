# service worker plugin

i want to make the service worker script more universal using a plugin so what ive done is moved
the firebase folder to a plugin file. to be activated on system trigger Events

here is a test.  add the service worker js to the document head.
? b4 or after head compile?

### [juri_root hint](https://stackoverflow.com/questions/39794805/get-site-root-url-in-javascript)
```
  $fileLink->addScriptDeclaration('console.log("onAfterRender started"); alert("onAfterRender started");
  ...
  window[\'ROOT_URL\'] =  "' . JUri::root() . '";
  ...
  ');
```
### i changed the manifest start url to the one i wanted (the entire goal)
```
"start_url": "/beta/index.php/alight/arc",
```
