# Service Worker notes

### creating a service worker

[how to set up a very basic service worker](https://youtu.be/BfL3pprhnms)
[chrome service worker monitor](chrome://serviceworker-internals/)

register the service worker

app.js
```
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js',{scope:'./'})
    .then(function(registration){
      console.log(`service worker Registered ${registration}`);
      })
      .catch(function(err){
        console.log(`service worker failed to Register ${err}`);
        });
  }

```
**note service-worker file in the example is in the same directory as the app.js file**

inside service worker 3 events we will be working with
install, activate and fetch events

sw.js
```
// const CACHE_NAME = '1';
const VERSION = 1;

const PFX = 'mod-sw-v'
var CACHE_NAME = PFX + VERSION;
var SW_NAME = 'service worker v'+VERSION;

self.addEventListener('install',function(e){
  console.log(`[ServiceWorker installed]`);

  //make sure sw is updated when new one is loaded - don't wait for refresh
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then()
  )
});

**e.waitUntil - works like await**

self.addEventListener('activate',function(e){
  console.log(`[ServiceWorker activated]`);

  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
          if(thisCacheName.indexOf(PFX) != -1 && thisCacheName != CACHE_NAME){
            console.log(`[mod serviceWorker] Removing Cached Files from ${thisCacheName}`);
            return caches.delete(thisCacheName);
          }
        })//.map
      )//.all
    })//.then
  );//waitUntil
});//activate

self.addEventListener('fetch',function(e){
  console.log(`[ServiceWorker fetching] ${e.request.url}`)
});

```

[webpack docs pwa/service workers](https://webpack.js.org/guides/progressive-web-application/)   
**webpack reccomends using workbox**

**im trying to research making a service worker without using workbox by google**
[service worker webpack without framework](https://stackoverflow.com/questions/50152670/webpack-service-worker)   

## if i don't use workbox

load get the serviceworker-webpack-plugin
[service worker webpack plugin](https://www.npmjs.com/package/serviceworker-webpack-plugin)  
```
  npm i -D serviceworker-webpack-plugin
```

add to webpack.config
```
  import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin';

  ...

  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    }),
  ],
```

add to the script
app.js
```
  import runtime from 'serviceworker-webpack-plugin/lib/runtime';

  if ('serviceWorker' in navigator) {
    const registration = runtime.register();
  }
```

### in the sw.js file use this to access the webpack   
sw.js
```
  const { assets } = global.serviceWorkerOption;
```
**using a global.serviceWorkerOption is the only strange thing that deviates from the regular sw process.  but its needed to access the webpack assets.**

[research workbox](https://developers.google.com/web/tools/workbox/guides/get-started)   



## Final SW (boilerplate)
```
  const { assets } = global.serviceWorkerOption;
  console.log(`service worker assets = ${assets}`);

  const VERSION = 1;

  const PFX = 'mod-sw-v'
  var CACHE_NAME = PFX + VERSION;
  var SW_NAME = 'service worker v'+VERSION;

  self.addEventListener('install',function(e){
    console.log(`[ServiceWorker installed]`);

    //make sure sw is updated when new one is loaded - don't wait for refresh
    self.skipWaiting();

    e.waitUntil(
      caches.open(CACHE_NAME).then()
    )
  });

  self.addEventListener('activate',function(e){
    console.log(`[ServiceWorker activated]`);

    e.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (thisCacheName) {
            if(thisCacheName.indexOf(PFX) != -1 && thisCacheName != CACHE_NAME){
              console.log(`[mod serviceWorker] Removing Cached Files from ${thisCacheName}`);
              return caches.delete(thisCacheName);
            }
          })//.map
        )//Promise.all
      })//.then
    );//waitUntil
  });//activate

  self.addEventListener('fetch',function(e){
    console.log(`[ServiceWorker fetching] ${e.request.url}`)
  });
```

## Final .config plugin
```
  new ServiceWorkerWebpackPlugin({
    entry: path.join(__dirname,'js/sw.js'),
    publicPath:'./modules/mod_psmod/xfiles/js/dist/'
  })
```
**GOTCHA: the key to the public path is the './' instead of '/' the ./ is used for the root directory**

[debugging service-workers](https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers/)   

#### using Service-Worker-Allowed
> S-W-A caused an issue because core and details are the roots of their perspective public directories, therefore i couldn't set scope to '/'
> in fire.js. ultimately this will take more experimentation because i would like to control the add-to-homescreen process.
> i don't need details to add to homescreen.  idk if i need sunzao.us to A2H. even if it did have a site landing page, i may still only want
> core with A2H

you can find Service-Worker-Allowed with its scope in sites-enabled server blocks
```
	location /core {
    add_header X-app2-message "alight section entered" always;
    add_header 'Service-Worker-Allowed' '/core';
    proxy_pass http://localhost:1027;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
	}

```
the scope in S-W-A, manifest.json, and fire.js all have to match for valid A2H functionality
[what does it take to be installable? (collection)](https://sunzao.us/core/?pages=5f2fe46b68ee4b794c5d07f1)   
[install criteria](https://web.dev/install-criteria/)   
