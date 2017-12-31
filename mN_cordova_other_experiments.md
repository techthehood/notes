# hosted web app
[hostedwebapp npm](https://www.npmjs.com/package/cordova-plugin-hostedwebapp)
[hostedwebapp on git](https://github.com/pwa-builder/ManifoldCordova)
i forked the repository and changed the following

plugin.xml
<repo>https://github.com/inspectaTech/ManifoldCordova.git</repo>
<engine name="cordova-android" version="<=8.0.0" />
** changed from 5.1.9 **

package.json
"url": "https://github.com/inspectaTech/ManifoldCordova.git"

bash
```
cordova plugin add https://github.com/inspectaTech/ManifoldCordova.git
```

https://www.npmjs.com/package/cordova-lib
npm install cordova-lib

https://www.npmjs.com/package/cordova-common
npm install cordova-common

//end of hosted web app
---