# react native firebase


[setting up messaging](https://firebase.google.com/docs/cloud-messaging/android/client)   

```
  <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme">
      <service
          android:name=".java.MyFirebaseMessagingService"
          android:exported="false">
          <intent-filter>
              <action android:name="com.google.firebase.MESSAGING_EVENT" />
          </intent-filter>
      </service>
  </application>
```
> [service goes inside of application](https://github.com/firebase/quickstart-android/blob/7e85a2083cb908def88dc86575edba3b42952e60/messaging/app/src/main/AndroidManifest.xml#L50-L56)   

[gatekeeper explaination](https://stackoverflow.com/questions/65516818/java-myfirebasemessagingservice-where-to-find)   
> its like these people really don't want other people to know something