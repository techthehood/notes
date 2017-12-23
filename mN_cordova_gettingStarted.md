#GETTING STARTED STEPS
1. $ cordova create us.sunzao.bones bareBones
2. navigate to folder $ cordova platform add android
3. add to script     window.location.href = "https://sunzao.us/beta/alight/arc";
4. add to config.xml  <allow-navigation href="*" />
5. cordova run android
thats it.

##NOTES:

# cordova/phonegap Notes

//i used in app browser


[this url describes the use of the whitelist plugin](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/index.html)
i added <allow-navigation href="*" />
i also added/ or verified that these existed
<allow-intent href="http://*/*" />
<access origin="*" />

without this it opens in a new chrome browser window
<allow-navigation href="*" />




[the first answer was reassuring](https://stackoverflow.com/questions/30151385/how-to-make-phonegap-window-location-href-not-launch-chrome-on-android)

i ran this code in the preset device ready that came with the most basic
$ cordova create gooLog

onDeviceReady: function() {

  ```
  //code i added
    window.location.href = "https://sunzao.us/beta/alight/arc";
  ```

  //no other plugins were available - no crosswalk, not InAppBrowser
  //i should be able to access the cordova api's

  //google signin still doesn't run - i need a plugin for that.

  2nd test bones



},
