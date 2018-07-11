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
**allow-intent & access origin are there by default, allow-navigation is not**

without this it opens in a new chrome browser window
<allow-navigation href="*" />

[bash echo add to file](https://stackoverflow.com/questions/6207573/how-to-append-output-to-the-end-of-text-file-in-shell-script-bash)
```
$ echo "hello" > file
$ echo "world" >> file
$ cat file 
hello
world

```


[the first answer was reassuring](https://stackoverflow.com/questions/30151385/how-to-make-phonegap-window-location-href-not-launch-chrome-on-android)

i ran this code in the preset device ready that came with the most basic setup
[cordova website](https://cordova.apache.org/)
```
$ cordova create gooLog
```


```
onDeviceReady: function() {


  //code i added
    window.location.href = "https://sunzao.us/beta/alight/arc";

  //no other plugins were available - no crosswalk, not InAppBrowser
  //i should be able to access the cordova api's

  //google signin still doesn't run - i need a plugin for that.

  //2nd test bones



},
```

## The most basic setup 
```
$ cordova create gooLog
```
### creates a generic appname and generic REVERSED_CLIENT_ID
it seems only to name the outer folder not the app
** what happens if there is a space after the asterisk? **

### config.xml file contains:
```
<widget id="io.cordova.hellocordova" ...
<name>HelloCordova</name> 
```

I ran this code
```
$ cordova create us.sunzao.bones2 bareBones2

```

### config.xml output:

folder name was: us.sunzao.bones2
```
<widget id="bareBones2"...
    <name>HelloCordova</name>
```
seems like output is in reverse of what i need it to be

##try this

```
$ cordova create bareBones3 us.sunzao.bones3
```

### config.xml output:

```
<widget id="us.sunzao.bones3"...
<name>HelloCordova</name>
```
its better but the name is still generic

##try this - final version
```
$ cordova create bones4 com.example.bones4 bareBones4
```

this structure works 
cordova create [dirName(use_alias)] [reverse_client_id(with_alias)] [appName/display Title]
[structure found here](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)
[Cordova Command-line-interface (CLI) Reference](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-create-command)

