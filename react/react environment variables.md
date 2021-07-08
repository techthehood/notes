# react environment variables (client side)   

## [The Twelve-Factor App](https://12factor.net/config)   
> seems like its a thing.   

## [adding client side environment variables](https://youtu.be/Q9QxS0NJjJg)   

#### GOTCHA: i think react-scripts needs webpack to work properly - my react-native app is being compiled with metro
> i need a solution that works with metro

## React-Native env variables   
[Setting environment variable in react-native?](https://stackoverflow.com/questions/33117227/setting-environment-variable-in-react-native)   
> from 2016, solutions progress with evolving technology

### [react-native-config](https://github.com/luggit/react-native-config)   
> Bring some 12 factor love to your mobile apps!

```
  npm i react-native-config
```

_App.js_

```
  import Config from 'react-native-config';
  console.log('[RocketNative] config = ', Config);

  socket = io(`https://${Config.REACT_APP_DOMAIN_MAIN}/webrtcPeer`);// fails - no namespace
```

_.env_

```
  DOMAIN_MAIN=sunzao.us
```
> this failded



#### [GOTCHA: showing undefined](https://github.com/luggit/react-native-config/issues/170)   
>needs another setp for run-android (android builds)
>Extra step for Android
>You'll also need to manually apply a plugin to your app, from android/app/build.gradle:

_/android/app/build.gradle_

```
// 2nd line, add a new apply:
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```
> i also had to uninstall and reinstall the android app so these changes would be present on the android build (won't reload in place)

