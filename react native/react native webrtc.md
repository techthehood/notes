# react native webrtc notes
[react native webrtc | github](https://github.com/react-native-webrtc/react-native-webrtc)   


```
  npm i react-native-webrtc socket.io-client
```

**GOTCHA:** [TypeError: null is not an object (evaluating ‘WebRTCModule.peerConnectionInit’)](https://react-native-webrtc.discourse.group/t/typeerror-null-is-not-an-object-evaluating-webrtcmodule-peerconnectioninit/1245)   
[React Native: always gradlew clean before run react-native-run-android](https://stackoverflow.com/questions/42570067/react-native-always-gradlew-clean-before-run-react-native-run-android)   

#### preparations
[ios](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/iOSInstallation.md)   

_./ios/podfile_   

```
  platform :ios, '11.0'
```


_<ProjectFolder>/ios/<ProjectName>/info.plist_

```
  <dict>

  ...

  <key>NSCameraUsageDescription</key>
  <string>Camera permission description</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>Microphone permission description</string>

  ...

```
> paste at the top of the dict tag   

<br>
<hr>
<br>

[android](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md)   

__

```

```

_./android/app/src/main/AndroidManifest.xml_   

```
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
  <uses-permission android:name="android.permission.WAKE_LOCK" />
```

> paste this code over (near the top just under the manifest tag): 
```
  ...

  <uses-permission android:name="android.permission.INTERNET" />

  ...
``` 

_my sample permissions for react native webrtc_

```
  <uses-permission android:name="android.permission.INTERNET" />

  <uses-permission android:name="android.permission.CAMERA" />
  <uses-feature android:name="android.hardware.camera" />
  <uses-feature android:name="android.hardware.camera.autofocus"/>

  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.WAKE_LOCK" />
```

[another setup hint example](https://github.com/react-native-webrtc/react-native-webrtc/issues/885)   

_android/gradle.properties_

```
  android.enableDexingArtifactTransform.desugaring=false
```

## [Debugging socket.io](https://socket.io/docs/v3/logging-and-debugging/)   

### debugging on the server side

_server terminal_

```
  DEBUG=* node yourfile.js
```
> this worked - im not sure how to stop it though

```
  DEBUG=engine,socket.io* pm2 start rocket-server/src/server.js [--name "someName"]
  pm2 log server
  pm2 list
  pm2 delete server
```
> this worked with pm2 also - it saved the server under the name "server" you can see it with pm2 list
> you can also name the server yourself 

### Debugging on the client side

> GOTCHA: using the debug option in the dev app, dev menu caused an error 
> (the browser appeared to work but the app crashed)

#### GOTCHA: [Calling synchronous methods on native modules is not supported in Chrome](https://github.com/facebook/react-native/issues/26705)   
> Error when using debuggin on the app emulator

[Chrome Debugging does not work if you use Sync APIs / Invariant violation: Calling synchronous methods on native modules is not supported in Chrome](https://github.com/react-native-device-info/react-native-device-info/issues/776)   


#### Solution: [Invariant Violation: Calling synchronous methods on native modules is not supported in Chrome](https://stackoverflow.com/questions/61067004/invariant-violation-calling-synchronous-methods-on-native-modules-is-not-suppor/66583605#66583605)   

_/react-native/Libraries/BatchedBridge/MessageQueue.js_
> NOTE: start in node_modules/

```
  // callNativeSyncHook(
  //   moduleID: number,
  //   methodID: number,
  //   params: mixed[],
  //   onFail: ?(...mixed[]) => void,
  //   onSucc: ?(...mixed[]) => void,
  // ): mixed {
  //   if (__DEV__) {
  //     invariant(
  //       global.nativeCallSyncHook,
  //       'Calling synchronous methods on native ' +
  //         'modules is not supported in Chrome.\n\n Consider providing alternative ' +
  //         'methods to expose this method in debug mode, e.g. by exposing constants ' +
  //         'ahead-of-time.',
  //     );
  //   }
  //   this.processCallbacks(moduleID, methodID, params, onFail, onSucc);
  //   return global.nativeCallSyncHook(moduleID, methodID, params);
  // }

  callNativeSyncHook(
    moduleID: number,
    methodID: number,
    params: any[],
    onFail: ?Function,
    onSucc: ?Function,
  ): any {
    const isDebuggingEnabled = (typeof atob !== 'undefined');
    this.processCallbacks(moduleID, methodID, params, onFail, onSucc);
    if (!isDebuggingEnabled) {
      return global.nativeCallSyncHook(moduleID, methodID, params);
    }
  }
```
> i went to the node_modules file and commented out the above code and pasted in the other code.

then in the browser: 

```
  localStorage.debug = '*';
```

#### GOTCHA: [Socket.io client is not working with React Native](https://stackoverflow.com/questions/55443912/socket-io-client-is-not-working-with-react-native)   
> i had to roll back to a previous version (i was using version 4 something)

```
  npm i socket.io-client@2.1.1
```