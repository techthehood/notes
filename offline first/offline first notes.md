# Offline first notes

[what is it?](https://www.html5rocks.com/en/tutorials/offline/whats-offline/)   

[A Beginner's Guide to Using the Application Cache](https://www.html5rocks.com/en/tutorials/appcache/beginner/)   

[database  trasaction fyi](https://en.wikipedia.org/wiki/Database_transaction)   

### multi threading
>JavaScript is fundamentally single-threaded, meaning that only one thing happens at a time.

>the most important thing you can do is exploit asynchronous APIs. With these APIs, the browser will automatically create a new thread for you, do the work, and then return results back to the main thread.
>If you've made XMLHttpRequest before, you'll already know that it's almost always used in asynchronous mode, so you should do that for any Ajax calls.


>The other way to do things asynchronously is to use WebWorkers,

### Detecting if you're online
>There's an HTML5 API to let you query if a browser is online: navigator.onLine(). It works on recent IE, Firefox, Opera, and Chrome. You can also listen for these online/offline events using document.body.addEventListener("online", function () {...} and document.body.addEventListener("offline", function () {...}.

### one browser many family members
>As Nicholas Zakas has pointed out, a risk with offline storage is that users sometimes share the same browser.

### [good service worker hints](https://medium.com/offline-camp/enabling-offline-first-experiences-on-the-web-with-service-workers-e4bc8c773dae)   

## [webpack has an offline plugin](https://github.com/NekR/offline-plugin)   
