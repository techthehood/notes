# React Native install and device testing notes
[udemy course: the complete react native and redux course](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/content)

[getting started docs](https://facebook.github.io/react-native/docs/getting-started.html)
**see building projects with native code**

## installations:

	-were going to install dependencies. ESLint optional.
	
//react native has a lot of setup

	google search 'java sdk'
	-java sdk (java jdk)
	>java SE Download (already got it)
	
	g-search node
	-node js (got it)
	
	g-search python 2
	- Python 2
	>windows x86 - 64 MSI installer
	
	g-search android studio download
	-android studio (got it)
	
	run cmd (node version)
```
	node -v4
	//v6.10.10
```

	install react native command line tools
	(generates new project and test project inside android simulator)
```
	npm install -g react-native-cli

```

	i also downloaded yarn and installed to speed react-native compiles
	[yarn downloads](https://yarnpkg.com/en/)
			
Create system variables/paths

	navigate the the Program Files Java folder and copy address

	then to the systems environment variables
	```
	Control Panel > System > Advanced System Settings >
	environment variables > New
	
	variable name: JAVA_HOME
	variable value: paste path
	
	also add to path: C:\Users\LocAdmin\AppData\Local\Android\sdk\platform-tools
	
	then make another New environment variable
	variable name: ANDROID_HOME
	variable value: C:\Users\LocAdmin\AppData\Local\Android\sdk\
	```
	
	for this to work fully i had to install and accept the terms for android SDK build-tools rev 23.0.1 ( be careful of similar revision numbers)
	to do this i had to navigate to the android sdk (link is same as ANDROID_HOME)
	
	it will tell you which revision its looking for so you can go and get it.
	
	then open AVD Manager.exe

	
	create workspace folder 
	```
	mkdir react_native
	```
	navigate to workspace folder and initialize project

	```
	react_native $: react-native init albums
	```
	
	

install gotchas:
kept failing
[npm install --save --save-exact react-native` failed](https://github.com/npm/npm/issues/13345)
i updated npm](https://docs.npmjs.com/cli/update)
```
	npm update -g

```

i tried to clear the cache but it wouldn't let me w/o a fight & it was unnecessary

[i had to install yarn to speed up the process](https://yarnpkg.com)
also after installing yarn i had to restart the cli for it to recognize yarn

after installing 
react-native init albums

this shows up:

To run your app on iOS:
   cd C:\Users\LocAdmin\version-control\react_native\albums
   react-native run-ios
   - or -
   Open ios\albums.xcodeproj in Xcode
   Hit the Run button
To run your app on Android:
   cd C:\Users\LocAdmin\version-control\react_native\albums
   Have an Android emulator running (quickest way to get started), or a device c
onnected
   react-native run-android
   
   Start > control panel > system > advanced system settings > 
   advanced > environment variables:
   
   new > variable name: JAVA_HOME, variable value: C:\Program Files\Java\jdk1.8.0_101
   
   path > edit: add to path: C:\Users\LocAdmin\AppData\Local\Android\sdk\platform-tools
   
gotcha red screen
adb reverse tcp:8081 tcp:8081

the the laptops ip address
```
ipconfig

//IPv4 Address. . . . . . . . . . . : 10.0.0.217
//Default Gateway . . . . . . . . . : fe80::5ee3:eff:fed1:4ff1%14
                                       10.0.0.1

									   //i was using 10.0.0.1 
									   //actually i was 10.0.1.1 (wrong-er)
									   //should have been 10.0.0.217
									   
```
[access the in app developer window](https://facebook.github.io/react-native/docs/debugging.html#accessing-the-in-app-developer-menu)



adb shell input keyevent 82

[McAfee port issue](https://github.com/facebook/react-native/issues/10715)

Change the port in "\node_modules\react-native\local-cli\server\server.js" from default: 8081 to ???

react-native run-android --port 9088 


gotcha
uninstall mcafee

[get uninstall command from registry](https://kc.mcafee.com/corporate/index?page=content&id=KB58231)

[force uninstall w/o a password](https://kc.mcafee.com/corporate/index?page=content&id=kb65863)

add /forceuninstall
full example
```
"C:\Program Files\McAfee\Agent\x86\FrmInst.exe" /forceuninstall

```

install a new av program
[totalAV](https://secure.totalav.com/)
[the review](https://www.thetop10antivirus.com/top-free-virus-protection)

//i took a fiz buzz challenge and killed it in no time

```
var fizzy = function(){
    for(var i = 1; i < 101; i++){
        
        let nbr = i;
       
        let divide_3 = i / 3;
		let is_fizz = (divide_3 == Math.floor(divide_3)) ? true : false;
        let divide_5 = i / 5;
		let is_buzz = (divide_5 == Math.floor(divide_5)) ? true : false;
        
        if(is_fizz && is_buzz)
        {
            console.log("fizz...buzz");
        }else if(is_fizz && !is_buzz){
			console.log("fizz");
        }else if(!is_fizz && is_buzz){
            console.log("buzz");
        }else{
			console.log(i);
        }
    }//for
}

fizzy();

```
Gotcha:
another red screen issue
Unable to load script from assets index.android.bundle on windows

[bundle fix](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows)

1. (in project directory) mkdir android/app/src/main/assets
2. react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
3. react-native run-android

yeaaaaaa, i edited the app.js file and it worked!!!!!

NOW, how do i run it from the wifi using the packager/bundler(if that is your real name)

i did it, but i wanted more to happen.  it doesn't give be the same neat node window which runs alongside my bash/cli but maybe if i needed to do additional codeing with the command line i could just open another window. i simply started the dev app on android and then typed:

```
	react-native start

```

and any updates to app.js are updated on the device.

this opens the dev menu on the device from the cli (without shaking)
	```
	adb shell input keyevent 82 
	```
i did a test to see if i could omit the adb reverse codeing
``` 

```

[command line reload](https://stackoverflow.com/questions/44170991/reload-a-react-native-app-on-an-android-device-manually-via-command-line)

** im already sick of shaking the phone to reload **

```
	adb shell input text "RR"

	or 

	alias reload='adb shell input text "RR"'

	then i can just type reload and it will reload
```

gotcha:
 my device kept shutting down if i used parenthesis around numeric values like padding:'5' or padding:'5px' and possibley because of the reload not set for hot reloading, the app was irreparable
 
 i put padding:'5' and got an error i put padding:'5px' and it crashed