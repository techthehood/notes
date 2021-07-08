# app keeps stopping issue

## SUMMARY - the fix is to do the normal setup using the official android installation docs and adding the bottom configuration on gradle.properties
[Android Installation docs](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md)   
> you don't need to modify the grade wrapper properties

_android/gradle.properties_

```
  android.enableDexingArtifactTransform.desugaring=false
```

_./android/app/src/main/AndroidManifest.xml_   

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
<br>
<hr>
<br>

### Bugfix Notes:

[react native environment setup docs](https://reactnative.dev/docs/environment-setup)   

[list of latest gradle releases](https://gradle.org/releases/)   
Early **GOTCHA:** updated gradle (gradle daemon)

_./android/gradle/wrapper/gradle-wrapper.properties_

```
  distributionUrl=https\://services.gradle.org/distributions/gradle-6.7-all.zip

  to

  distributionUrl=https\://services.gradle.org/distributions/gradle-< latest version #>-all.zip
```
> **GOTCHA:** this will cause react-native run-android to download the latest gradle version for the .apk

```
  adb kill-server
  adb start-server
```
> **GOTCHA:**  may need to restart daemon after it downloads the latest (device offline build fail)   

[and so it continues](https://stackoverflow.com/questions/67093053/react-native-execution-failed-for-task-appgeneratepackagelist)   

> Gradle doesnt support Java 16 except version 7.0 for Gradle. And react-native-cli doesnt support Gradle 7.0. (user post)   

[Prevent type mismatch exception thrown in Gradle 7 ](https://github.com/react-native-community/cli/pull/1396)   

  - Generate a fresh react-native app
  - Update the gradle wrapper to 7.0-rc-1
  - Build the app with ./gradlew assemble, observe that an exception occurs

```
  cd android
  ./gradlew assemble
```
> this appears to run the same gradle download as the run-android builder
> "Starting a Gradle Daemon (subsequent builds will be faster)?

fyi gradle clean

```
  ./gradlew clean
```

[App crash on android when add react-native-webrtc into package.json](https://react-native-webrtc.discourse.group/t/app-crash-on-android-when-add-react-native-webrtc-into-package-json/382/4)   

> Have you tried adding this to your gradle.properties.
> android.enableDexingArtifactTransform.desugaring=false

> Also the latest React Native has issues with Flipper causing crashes.
> Best to stay with version 0.61.5 for now to be honest.

