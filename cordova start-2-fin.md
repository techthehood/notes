# Cordova start 2 finish
[cordova docs](http://cordova.apache.org/docs/en/latest/)
[build your first app](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)

1. create a cordova app and directory
```
	cordova create [alias] com.example.[alias] ['app name']
```

2. navigate to new app folder
```
	cd [alias]
```

3. add the android platform
[add platforms](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)
```
	cordova platform add android
```

4. add plugins
** note: use cordova plugin ls or cordova plugin to see list of installed plugins **

This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
NOTE: ...add android AUTOMATICALLY ADDS cordova-plugin-whitelist
```
	cordova plugin add cordova-plugin-whitelist
	
```

## plugin for connection
```
	cordova plugin add cordova-plugin-network-information
```

test for connection
```
	if(navigator != undefined && navigator.connection.type != "none"){
			//code here...
	}/if
```

## plugin for multiple webviews
[npm second webview](https://www.npmjs.com/package/cordova-plugin-second-webview)
```
	cordova plugin add https://github.com/walidowais/cordova-plugin-second-webview.git
	
	or 
	cordova plugin add https://github.com/inspectaTech/cordova-plugin-second-webview.git
	
	//and in the index.js file add below this.receivedEvent('deviceready');
	var URL = "https://example.com/beta/alight/arc/";
	webview.Show(URL);
```

# The Main Ingredient
## plugin to inject cordova into webviews
[injectview npm](https://www.npmjs.com/package/cordova-plugin-fastrde-injectview)
[injectview article](https://medium.com/@barsh/loading-cordova-js-from-a-website-27966844ba56)

```
	cordova plugin add cordova-plugin-fastrde-injectview
```

** note: inject view injects (seemingly) all js files in root 
the current file which runs document.addEventListener('deviceready'... 
causes a loop use the code below to protect from looping **

```
	//add to index.html script tag
	<script type="text/javascript" src="js/index.js" 
	onload="javascript:window.isCordovaApp = true;"></script>

	//add to index.js initialize function

	try{
		//this keeps this only being run once
		if(window.isCordovaApp != undefined)
		{
			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		}
	}catch(err){console.log("device ready error = ",err);}
```

5. add to config.xml file
without this it opens in a new chrome browser window
<allow-navigation href="*" />

removes the lower widget tag and add the new navigation with the widget closing tag
[stream editor (find/replace)](https://askubuntu.com/questions/20414/find-and-replace-text-within-a-file-using-commands)
[append text to file](https://stackoverflow.com/questions/6207573/how-to-append-output-to-the-end-of-text-file-in-shell-script-bash)


```
	sed -i 's/<\/widget>/ /g' config.xml
	echo '<allow-navigation href="*" />
	</widget>' >> config.xml
```

6. add navigation to web app
** note: don't forget to make sure the index.html file has the necessary script tags 
add this line:

	onload="javascript:window.isCordovaApp = true;"
	
	to src="cordova.js" script tag to create a detection global variable
	
	add to "index.js" script tag to help prevent 
**

i can make a website the startup page instead of index.html using this in the config.xml file
```
<content src="https://example.com/beta/alight/arc/" />

```

** 	"start_url": "/beta/index.php/alight/arc" old manifest start_url 
	"start_url": "https://example.com/beta/alight/arc/" new one
**

```
<script type="text/javascript" src="cordova.js"  onload="javascript:window.isCordovaApp = true;"></script>
<script type="text/javascript" src="js/index.js" 
onload="javascript:window.isCordovaApp = true;"></script>
```

add to index.js file		
```
var app = {
    // Application Constructor
    initialize: function() {
        try{
			//this keeps this only being run once
			if(window.isCordovaApp != undefined)
			{
			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
			}
		}catch(err){console.log("device ready error = ",err);}
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		//webview.Show(URL);//for second-webview
        //window.location.href = "https://example.com/beta/alight/arc";
		window.location.replace("https://example.com/beta/alight/arc");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
		try{
			if(isCordovaApp != undefined)
			{
				var parentElement = document.getElementById(id);
				var listeningElement = parentElement.querySelector('.listening');
				var receivedElement = parentElement.querySelector('.received');

				listeningElement.setAttribute('style', 'display:none;');
				receivedElement.setAttribute('style', 'display:block;');

				console.log('Received Event: ' + id);
			}//if
		}catch(err){console.log("isCordovaApp error = ",err);}

    }
};

app.initialize();
```


## test on device

7. hook device up to this computer with usb chord
turn on usb debugging mode

[restart adb server if there is no response](https://stackoverflow.com/questions/21925992/chrome-devtools-devices-does-not-detect-device-when-plugged-in)

code to fix a mobile device not responding to setup
```
adb kill-server
adb start-server

```

8. navigate in the browser to one of the following (both the same):
[about:inspect](about:inspect)
[chrome://inspect](chrome://inspect)

** this checks for build requirements **
```
	cordova requirements
``` 

9. build a debug apk
```
	cordova build android
```

or build for all devices using:
```
	cordova build
```

10. run the test code to deploy to device
Note: cordova run android creates a build then deploys to device

``` 
	cordova run android
```

debug apk location [alias] dir\platforms\android\app\build\outputs\apk\debug

[cordova detection](http://damien.antipa.at/blog/2014/02/08/3-ways-to-detect-that-your-application-is-running-in-cordova-slash-phonegap/)

11. create a signed apk then a build.json file
```
keytool -genkey -v -keystore [alias].keystore -alias [alias] -keyalg RSA -keysize 2048 -validity 10000

{
  "android":{
    "release":{
      "keystore":"[alias].keystore",
      "storePassword":"test123",
      "alias":["alias"],
      "password":"test123",
      "keystoreType":""
    }
  }
}
```

12. publish a released apk
```
cordova build android --release
```
13. [upload to the play](https://play.google.com/apps/publish)

---
## arrange google sign in

[NPM website](https://www.npmjs.com/package/cordova-plugin-googleplus)

### command line for the google plugin

```
	cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=myreversedclientid
	cordova prepare
```
**try without using cordova prepare **

create the debug signing key

navigate browser to googles config file generator
### config file generator
https://developers.google.com/mobile/add?platform=android&cntapi=signin

navigate to dashbord to add release fingerprint
[google developer console](https://console.developers.google.com)

add to index.js
```
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        //i removed all the scopes
        //i used the web app credentials instead of android and it worked
        window.plugins.googleplus.login(
          {
            'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': '1123456789112-p89notmyrealsigninkeytu.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
          },
          function (obj) {
            alert(JSON.stringify(obj)); // do something useful instead of alerting
            console.log("json string = ",JSON.stringify(obj));
            obj.email          // 'eddyverbruggen@gmail.com'
            obj.userId         // user id
            obj.displayName    // 'Eddy Verbruggen'
            obj.familyName     // 'Verbruggen'
            obj.givenName      // 'Eddy'
            obj.imageUrl       // 'http://link-to-my-profilepic.google.com'
            obj.idToken        // idToken that can be exchanged to verify user identity.
            obj.serverAuthCode // Auth code that can be exchanged for an access token and refresh token for offline access
          },
          function (msg) {
            alert('error: ' + msg);
          }
        );
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

```

i need to combine the 2 scripts to both connect to google social login & go to my web app.

maybe async await and make initialize thenable (if it isn't already) then save the login token to a variable the is accessible to cordova and pass it to 
my web app for further processing.

## **can i create the debug sha1 without creating a keygen file (only creating a debug apk?)**

**Note: manage resources deletes project (shut down) after 30 days. **
