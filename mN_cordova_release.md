# Cordova release
---
## original view
```
keytool -genkey -v -keystore [keystore_name].keystore -alias [alias_name] -keyalg RSA -keysize 2048 -validity 10000
```

### original build.json configuration file - store in main directory (not www)
```
{
  "android":{
    "release":{
      "keystore":"",
      "storePassword":"",
      "alias":"",
      "password":"",
      "keystoreType":""
    }
  }
}
```

### modified for new_test
```
keytool -genkey -v -keystore new_test.keystore -alias new_test -keyalg RSA -keysize 2048 -validity 10000

{
  "android":{
    "release":{
      "keystore":"new_test.keystore",
      "storePassword":"test123",
      "alias":"new_test",
      "password":"test123",
      "keystoreType":""
    }
  }
}
```

## system paths to add to your computers operating system 
### find this path on your computer
/control panel > system > advanced system settings > environment variables > system variables > path

### paste in these two paths
C:\Users\LocAdmin\AppData\Local\Android\sdk\platform-tools;
C:\Users\LocAdmin\AppData\Local\Android\sdk\tools;

### it all starts on the plugin page
[initial website](https://www.npmjs.com/package/cordova-plugin-googleplus)
SHA-1 FINGERPRINT
SHA-1 signing certificate fingerprint example:
keytool -exportcert -keystore 'C:\Users\LocAdmin\version-control\phonegap\'$app_name'.keystore' -list -v -alias $app_name
*above works*

without quotes you get the url without slashes
C:UsersLocAdminversion-controlphonegap'$app_name'.keystore
and a file does not exist warning

*single quotes work*

## DEBUG FINGERPRINT
[instructions found here ](https://developers.google.com/android/guides/client-auth)
[good video for debug keystore](https://www.youtube.com/watch?v=IQs8lcVkbLU)
location: C:\Users\LocAdmin\.android\debug.keystore

**gotch: no slash in front of -alias (\ -alias) and single quotes around url**
```
keytool -exportcert -list -v -alias androiddebugkey -keystore 'C:\Users\LocAdmin\.android\debug.keystore'
```
### add the cordova plugin
cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=us.suzao.goosi

##I built a bash script that will do this - (research how it works)