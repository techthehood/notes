# Cordova sign in
---

[NPM website](https://www.npmjs.com/package/cordova-plugin-googleplus)

### command line for the google plugin

```
cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=myreversedclientid
cordova prepare
```

### add this code to the .js onDeviceReady function

```
window.plugins.googleplus.login(
  {
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': 'google id here', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
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
```

### FINISHED EXAMPLE

```
onDeviceReady: function() {
    this.receivedEvent('deviceready');

    //i removed all the scopes
    //i used the web app credentials instead of android and it worked
    window.plugins.googleplus.login(
      {
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '123456789012-p892dnvnotmyrealclientids221p2tu.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
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
```

### to create a debug fingerprint

```
keytool -exportcert -list -v -alias androiddebugkey -keystore 'C:\Users\LocAdmin\.android\debug.keystore'
```

### to create a release fingerprint (my custom bash script)
./keyup
copy the sha-1

#### i need to modifiy the script to ask you if you want to create a key, build.json, fingerprint, or degbug fingerprint

### config file generator
https://developers.google.com/mobile/add?platform=android&cntapi=signin

### generates a project, an api key an android OAuth2 key and a webapp keytool recommended to use a debug key SHA-1 then add the release SHA-1 fingerprint later
#### *i beleive you can use the same OAuth2 webapp key for both

