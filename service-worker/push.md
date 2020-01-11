# Push Notifications

### [The Service Worker Cookbook](https://serviceworke.rs/)   
> great demo and example pages js & sw.js
> also shows offline usecases

[chrome service worker monitor](chrome://serviceworker-internals/)   
[Adding Push Notifications to a Web App](https://codelabs.developers.google.com/codelabs/push-notifications/#10)   
[Mozilla Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)   
[web push libraries on github](https://github.com/web-push-libs/)   
[Web Push Notifications: Timely, Relevant, and Precise](https://developers.google.com/web/fundamentals/push-notifications/)   
[The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)   
> i was down in the 'waiting' section of the lifecycle article

[my push tester page](https://example.com/req/push/)   

[ADD PUSH NOTIFICATIONS TO YOUR WEB APP WITH NODE.JS AND SERVICE WORKERS](https://pusher.com/tutorials/push-notifications-node-service-workers)   
> pusher.com is actually not a bad article

[Push Notifications - developers.google](https://developers.google.com/drive/api/v3/push)   
> this is not an old argument as it encourages you to first register its domain in the Google API Console.

### [Web Push Interoperability Wins](https://developers.google.com/web/updates/2016/07/web-push-interop-wins#introducing_vapid_for_server_identification)   
> updated developers.google article - hightlights vapid ids
> With VAPID you no longer need to sign up for an account with GCM to use push in Chrome and you can use the same code path for subscribing a user and sending a message to a user in both Chrome and Firefox.

[Domain verification page](https://console.developers.google.com/apis/credentials/domainverification)      


Push dependencies
#### push without firebase    
### [Beginners guide to Web Push Notifications using Service Workers](https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679)    

html
```
  ...

    <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js" type="text/javascript">
      window['ROOT_URL'] = `${location.origin}/`;
    </script>

    <script src="/req/push/js/fire.js">
      //fire.js cloned from d3firebase plugin - update original
    </script>
    <script src="/req/push/js/app.js"></script>
    </head>
    <body>
    <!--<button id="permission-btn" onclick="main()">Ask Permission</button>-->
    <button id="permission-btn" >Ask Permission</button>
    <script type="text/javascript">
      document.querySelector(`#permission-btn`).onClick = main();
    </script>

  ...

```
> the firebase cdn defines the firebase variable in fire.js and beyond
> and it needed an early definition of ROOT_URL for fire.js
> i could have included the scripts in the head section (i think) and kept the original btn setup

app.js
```
  console.log('push js is working');

  const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
  }

  // I added a function that can be used to register a service worker.
  const registerServiceWorker = async () => {
      // const swRegistration = await navigator.serviceWorker.register('./service.js'); //notice the file name
      const swRegistration = await navigator.serviceWorker.register('https://sunzao.us/firebase-messaging-sw.js');//works
      // try{
      //   // get the token
      //   var myMsg;
      //   myMsg = firebase.messaging();
      //   let token = await myMsg.getToken().then(function(result){ return result;});
      //   console.log(`[token]`,token);
      // }catch(error){
      //   console.log(error);
      // }

      return swRegistration;
  }

  const requestNotificationPermission = async () => {
      const permission = await window.Notification.requestPermission();
      // value of permission can be 'granted', 'default', 'denied'
      // granted: user has accepted the request
      // default: user has dismissed the notification permission popup by clicking on x
      // denied: user has denied the request.
      if(permission !== 'granted'){
          throw new Error('Permission not granted for Notification');
      }
  }

  const showLocalNotification = (title, body, swRegistration) => {
      const options = {
          body,
          // here you can add more properties like icon, image, vibrate, etc.
      };
      swRegistration.showNotification(title, options);
  }

  const main = async () => {
    try{

      check();
      //sw already registered
      const swRegistration = await registerServiceWorker().catch((err) => {
        console.error(`[sw registration]`,err);
      });

      // const subscription = await swRegistration.pushManager.getSubscription()

      // const swRegistration = navigator.serviceWorker;// not needed - could ref og sw
      // showLocalNotification('This is title', 'this is the message', swRegistration);// works

      //I want this behind a click event
      const permission =  await requestNotificationPermission();
    }catch(err){
      console.error(err);
    }
  }
  // main()
  // .catch( e =>{
  //   console.error(e);
  // })

```

service.js
```
  console.log('Hello from service worker');
  // copied from firebase-massaging-sw.js
  // [START initialize_firebase_in_sw]
  //  ADD THIS FILE TO THE SITE ROOT - OR ROOT OF FILES YOU WANT CONTROLLED BY SW
  // Give the service worker access to Firebase Messaging.
  // Note that you can only use Firebase Messaging here, other Firebase libraries
  // are not available in the service worker.
  try{

    importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

    //apiKey: "AIzaSyBtvRdO_UXCqhfPC8t4Wu4A5ecuYNDBChs",//old api key

    var config = {
      apiKey: "AAAA8LV77Uw:APA91bFGZ7Gn8nO3qA5Ta1wmI23d_aJNDbP5FXaApXh5ZmfNhqXrPokElxMJEV9KuFZVnEV7wDgT1Zs9M0a3pwDJZ5-G3ThLPBdJZBDe8AIYFvjIr-Gp8kW6KooX_8iHoPFnkJQBMxFA4dAR2RykPBN9j3d1efZXog",
      authDomain: "sunzao-push.firebaseapp.com",
      databaseURL: "https://sunzao-push.firebaseio.com",
      storageBucket: "sunzao-push.appspot.com",
      messagingSenderId: "1033836948812"
    };
    firebase.initializeApp(config);

    // Initialize the Firebase app in the service worker by passing in the
    // messagingSenderId.
    /*firebase.initializeApp({
      'messagingSenderId': '1033836948812'/*'YOUR-SENDER-ID'*/
      //});*/

      // Retrieve an instance of Firebase Messaging so that it can handle background
      // messages.
      console.log("service workers revenge.")
      console.log(firebase);
      const messaging = firebase.messaging();
      // [END initialize_firebase_in_sw]
      console.info("messaging");
      console.log(messaging);
  }catch(e){
    console.log("[firebase registration erro]",e);
  }

  console.info("self");
  console.log(self);

  /*self.registration.showNotification(notificationTitle,
        notificationOptions);*/
  /*var CACHE_NAME = 'my-site-cache-v1';
  var urlsToCache = [
    '/',
    '/styles/main.css',
    '/script/main.js'
  ];*/

  //example links
  //https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#update-a-service-worker

  //https://github.com/w3c/ServiceWorker/blob/master/explainer.md
  const VERSION = 2;

  var CACHE_NAME = 'my-site-cache-v' + VERSION;
  var SW_NAME = 'service worker v'+VERSION;  //'firebase-messaging-sw.js',
  var urlsToCache = [

  ];

  //site where caching worked was
  //https://medium.com/@boopathi/service-workers-gotchas-44bec65eab3f#.xg6wz4yqk

  /*  Sites example and explaination

  navigator
    .serviceWorker
    .register('/sw.js')
    .then(registration => {
      button.onClick = () => registration.update();
      window.onSomethingHappened = () => registration.update();
    })

    registration.update() will try for a new update of service worker bypassing the ~24 hour update check. Note that the byte diff requirement still applies.


  */


  self.addEventListener('install',function(event){

  	console.log(`[Service Worker] Installing ` + SW_NAME);
  	self.skipWaiting();
  	  // pre cache a load of stuff:
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      }).then(function(e){ return self.skipWaiting();})
    )

  });

    // ===============================================
    // more push test additions
    // urlB64ToUint8Array is a magic function that will encode the base64 public key
    // to Array buffer which is needed by the subscription option
    const urlB64ToUint8Array = base64String => {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
      const rawData = atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }
    // ===============================================

  const saveSubscription = async subscription => {
    const SERVER_URL = 'https://sunzao.us/req/save-subscription'
    const response = await fetch(SERVER_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })
    return response.json()
  }

  self.addEventListener('activate',async function(event){

  	console.log(`[Service Worker] Is active ` + SW_NAME);

  	 //var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  	 var cacheWhitelist = [CACHE_NAME];//'none'

  	  event.waitUntil(
  	  Promise.all([self.clients.claim(),
  		caches.keys().then(function(cacheNames) {
  		  return Promise.all(
  			cacheNames.map(function(cacheName) {
  			  if (cacheWhitelist.indexOf(cacheName) === -1) {
  				return caches.delete(cacheName);
  			  }
  			})
  		  );
  		})
  		])
    );//wait until

    //push test additions

    try {

      const applicationServerKey = urlB64ToUint8Array(
        'BFz8Gl2g1DfL7zC8p1WzM4fkV1AyMyHe0tQBKd5b9LrRwT67iMUcF5bTBUwOo5f0EuWMZdw2kcrPS_M4Zez6B18'
      )
      const options = { applicationServerKey, userVisibleOnly: true }

      const subscription = await self.registration.pushManager.subscribe(options)
      const response = await saveSubscription(subscription)
      console.log(`[sw subscription]`,JSON.stringify(subscription))
      console.log(`[sw saveSub response]`,response)
    } catch (err) {
      console.log('[sw subscription] Error', err)
    }

  });

  console.info("logging this");
  console.log(this)

  self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received. ' + SW_NAME);
    if(event.data){
      console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
      console.log(typeof event.data.text());
      console.log(event.data.text());

      try{
        var event_data = JSON.parse(event.data.text());
        console.log(event_data);
        var note = (event_data.data != undefined) ? event_data.data : event_data.notification;

        const title = note.title + " v." + VERSION || 'Push Codelab';
        console.log("note bodey = " + note.body);
        var n_body = (note.body != undefined) ? "\"body\":\"" + note.body + "\"" : "";//'New Cache Scripts ' + SW_NAME
        var n_tag = (note.tag) ? ",\"tag\":\"" + note.tag + "\"" : "";
        var n_icon = (note.icon) ? ",\"icon\":\"" + note.icon + "\"" : "";
        var n_subtitle = (note.subtitle) ? ",\"subtitle\":\"" + note.subtitle + "\"" : "";
        var n_tickerText = (note.tickerText) ? ",\"tickerText\":\"" + note.tickerText + "\"" : "";
        var n_vibrate = (note.vibrate) ? ",\"vibrate\":\"" + note.vibrate + "\"" : "";
        var n_sound = (note.sound) ? ",\"sound\":\"" + note.sound + "\"" : "";
        var n_largeIcon = (note.largeIcon) ? ",\"largeIcon\":\"" + note.largeIcon + "\"" : "";
        var n_smallIcon = (note.smallIcon) ? ",\"smallIcon\":\"" + note.smallIcon + "\"" : "";
        var n_message = (note.message) ? ",\"message\":\"" + note.message + "\"" : "";


        var option_data = "{" + n_body + n_tag + n_icon + n_subtitle + n_tickerText + n_vibrate + n_sound + n_largeIcon + n_smallIcon + n_message + "}";

        const options = JSON.parse(option_data);
      }catch(error){
        title = "manual notification";
        options = {body:`message txt = ${event.data.text()}. \n error txt = ${error}`};
      }

      event.waitUntil(self.registration.showNotification(title, options));
    }else{
      console.log('Push event but no data')
    }

  });//end push

  self.addEventListener('fetch', function(event) {
  	console.log("fetch running");
   /* var response;
    event.respondWith(caches.match(event.request).catch(function() {
      return fetch(event.request);
    }).then(function(r) {
      response = r;
      caches.open(CACHE_NAME2).then(function(cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    }).catch(function() {
      return caches.match('firebase-messaging-sw.js');
    }));*/

    // this way of using fetch is causing db to recieve multiple calls
    // return fetch(event.request);
  });


  // [START background_handler]
  /*
  messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
  });
  */
  // [END background_handler]

```

### Deprecations   

fire.js - deprecated (use as reference)
```
  // [START get_messaging_object]
    // Retrieve Firebase Messaging object.

    //accomodation made so firebase can be found outside of root.
    var config = {
      apiKey: "AIzaSyBtvRdO_UXCqhfPC8t4Wu4A5ecuYNDBChs",
      authDomain: "sunzao-push.firebaseapp.com",
      databaseURL: "https://sunzao-push.firebaseio.com",
      storageBucket: "sunzao-push.appspot.com",
      messagingSenderId: "1033836948812"
    };
    firebase.initializeApp(config);

    //https://console.firebase.google.com
    //"AIzaSyBtvRdO_UXCqhfPC8t4Wu4A5ecuYNDBChs" web api key

    const tokenDivId = 'token_div';
    const permissionDivId = 'permission_div';
    //console.log(firebase);
    const messaging = firebase.messaging();
    var sw_registration = "";

    console.log('fire js running!');

    function getServiceWorker(){

  	  if(!navigator.serviceWorker){return;}
  	  //console.info("service worker");
  	  //console.log(navigator.serviceWorker);//FIREBASE_DIR
  	  //console.log("old firebase dir = " + FIREBASE_DIR + "firebase-messaging-sw.js");
  	  //console.log("new firebase dir = ",ROOT_URL + "firebase-messaging-sw.js");//covers entire site
  	  navigator.serviceWorker.register(ROOT_URL + "firebase-messaging-sw.js")
  	  .then(function(registration){



  	  sw_registration = registration;
  	  messaging.useServiceWorker(registration)
  	  // [END get_messaging_object]
  	  // IDs of divs that display Instance ID token UI or request permission UI.

  	  // [START refresh_token]
  	  // Callback fired if Instance ID token is updated.
  		return messaging.getToken()
  	   })
  	  .then(function(currentToken) {
  		if (currentToken) {
  		  sendTokenToServer(currentToken);
  		  updateUIForPushEnabled(currentToken);
  		  token_endpoint_available = true;
  		  token_endpoint = currentToken;
  		  sessionStorage.token_endpoint = currentToken;
  		} else {
  		  // Show permission request.
  		  //console.log('No Instance ID token available. Request permission to generate one.');
  		  // Show permission UI.
  		  updateUIForPushPermissionRequired();
  		  setTokenSentToServer(false);
  		  //requestPermission();
  		  //console.log('initial permission = '+ Notification.permission);
  		  token_endpoint_available = false;
  		}
  	  })
  	  .catch(function(err) {
    		console.log('An error occurred while retrieving token. ', err);
    		showToken('Error retrieving Instance ID token. ', err);
    		setTokenSentToServer(false);
    		token_endpoint_available = false;
  	  });


    }//end get service worker

    messaging.onTokenRefresh(function() {
      messaging.getToken()
      .then(function(refreshedToken) {
        //console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // [START_EXCLUDE]
        // Display new Instance ID token and clear UI of all previous messages.
        resetUI();
        // [END_EXCLUDE]
      })
      .catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
  	  token_endpoint_available = false;
      });
    });
    // [END refresh_token]
    // [START receive_message]
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker
    //   `messaging.setBackgroundMessageHandler` handler.


    messaging.onMessage(function(payload) {
      //console.log("Message received. ", payload);
  	//console.log(payload.data);

  	//msg_data = payload.data
  	var msg_data = payload.notification;

  	var msg_title = msg_data.title;

  	alert(Notification);
  	alert(Notification.permission);
  	//console.log("message data = " + msg_data);
  	//alert("msg_title = " + msg_title);
  	//var notify_me = new Notification("hi there");
  	var notify_me = new Notification(msg_title);

      // [START_EXCLUDE]
      // Update the UI to include the received message.
      appendMessage(payload);
      // [END_EXCLUDE]
    });
    // [END receive_message]



    function resetUI() {
      //clearMessages();
      showToken('loading...');
      // [START get_token]
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken()
      .then(function(currentToken) {
        if (currentToken) {
          sendTokenToServer(currentToken);
          updateUIForPushEnabled(currentToken);
  		token_endpoint = currentToken;
  		sessionStorage.token_endpoint = currentToken;
  		token_endpoint_available = true;
  		//console.log("the token has returned");
  		//console.log(currentToken);
        } else {
          // Show permission request.
          //console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          updateUIForPushPermissionRequired();
          setTokenSentToServer(false);
  		token_endpoint_available = false;
        }
      })
      .catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
  	  token_endpoint_available = false;
      });
    }
    // [END get_token]
    function showToken(currentToken) {
      // Show token in console and UI.
      //var tokenElement = document.querySelector('#token');//not needed for sunzao
      //tokenElement.textContent = currentToken;//not needed for sunzao
  	//console.info("show token running")
  	//console.log(currentToken);
    }
    // Send the Instance ID token your application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    function sendTokenToServer(currentToken) {
      if (!isTokenSentToServer()) {
        //console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
      } else {
        //console.log('Token already sent to server so won\'t send it again ' + 'unless it changes');
  		  //console.info('service worker for update');
  		  //console.log(sw_registration);

  		  //force update - clear cache ? - then update the version on the firebase-messaging-sw to create a
        //byte difference
  		  sw_registration.update();
      }
    }
    function isTokenSentToServer() {
      if (window.localStorage.getItem('sentToServer') == 1) {
            return true;
      }
      return false;
    }
    function setTokenSentToServer(sent) {
      if (sent) {
        window.localStorage.setItem('sentToServer', 1);
      } else {
        window.localStorage.setItem('sentToServer', 0);
      }
    }
    function showHideDiv(divId, show) {
      const div = document.querySelector('#' + divId);
      if (show) {
        //div.style = "display: visible";
      } else {
        //div.style = "display: none";
      }
    }
    function requestPermission() {
      //console.log('Requesting permission...');
      // [START request_permission]
      messaging.requestPermission()
      .then(function() {
        //console.log('Notification permission granted.');
  	  //console.log(messaging);
  	  //console.log('permission = '+ Notification.permission);

        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // [START_EXCLUDE]
        // In many cases once an app has been granted notification permission, it
        // should update its UI reflecting this.
        resetUI();
        // [END_EXCLUDE]
      })
      .catch(function(err) {
        //console.log('Unable to get permission to notify.', err);
  	  token_endpoint_available = false;
      });
      // [END request_permission]
    }
    function deleteToken() {
      // Delete Instance ID token.
      // [START delete_token]
      messaging.getToken()
      .then(function(currentToken) {
        messaging.deleteToken(currentToken)
        .then(function() {
          //console.log('Token deleted.');
          setTokenSentToServer(false);
          // [START_EXCLUDE]
          // Once token is deleted update UI.
          resetUI();
          // [END_EXCLUDE]
        })
        .catch(function(err) {
          console.log('Unable to delete token. ', err);
        });
        // [END delete_token]
      })
      .catch(function(err) {
        console.log('Error retrieving Instance ID token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
  	  //token_endpoint_available = false;
      });
    }
    // Add a message to the messages element.
    function appendMessage(payload) {
  	//clearMessages();//i can use this for now if I don't want the messages to accumulate
      /*
  	const messagesElement = document.querySelector('#messages');
      const dataHeaderELement = document.createElement('h5');
      const dataElement = document.createElement('pre');
      dataElement.style = 'overflow-x:hidden;'
      dataHeaderELement.textContent = 'Received message:';
      dataElement.textContent = JSON.stringify(payload, null, 2);
      messagesElement.appendChild(dataHeaderELement);
      messagesElement.appendChild(dataElement);
  	*/
    }
    // Clear the messages element of all children.
    function clearMessages() {
      const messagesElement = document.querySelector('#messages');
      while (messagesElement.hasChildNodes()) {
        messagesElement.removeChild(messagesElement.lastChild);
      }
    }
    function updateUIForPushEnabled(currentToken) {
      showHideDiv(tokenDivId, true);
      showHideDiv(permissionDivId, false);
      showToken(currentToken);
    }
    function updateUIForPushPermissionRequired() {
      showHideDiv(tokenDivId, false);
      showHideDiv(permissionDivId, true);
    }
    //resetUI();

    //push-notifications-master/completed/firebase-example

   //curl -X POST --header "Authorization: key=AIzaSyBkG1-WNl8capVzTCuu2La-XfwAnr1jX5Q" --Header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"d-l2o2QdKNU:APA91bGXu-OQX5TxZkWueLc-6PyAZF89S05VdPPFfEycO24QvOqnDEQHxbqNGeQf-joSArgIwgUx5k-l1QSm4MM0bHEB4xN2vlceJR8cJhMOoQ91e76DsjlTXoiXoy7GS7oeko9qMxHM\",\"notification\":{\"title\": \"Hello\",\"body\": \"world\"},\"priority\":10}"

   //curl --header "Authorization: key=AIzaSyBkG1-WNl8capVzTCuu2La-XfwAnr1jX5Q" --Header "Content-Type: application/json" -d "{\"to\":\"d-l2o2QdKNU:APA91bGXu-OQX5TxZkWueLc-6PyAZF89S05VdPPFfEycO24QvOqnDEQHxbqNGeQf-joSArgIwgUx5k-l1QSm4MM0bHEB4xN2vlceJR8cJhMOoQ91e76DsjlTXoiXoy7GS7oeko9qMxHM\",\"notification\":{\"title\": \"Hello\",\"body\": \"world\"},\"priority\":10}" https://fcm.googleapis.com/fcm/send

    //curl -X POST --header "Authorization: key=AIzaSyBkG1-WNl8capVzTCuu2La-XfwAnr1jX5Q" --Header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"d-l2o2QdKNU:APA91bGXu-OQX5TxZkWueLc-6PyAZF89S05VdPPFfEycO24QvOqnDEQHxbqNGeQf-joSArgIwgUx5k-l1QSm4MM0bHEB4xN2vlceJR8cJhMOoQ91e76DsjlTXoiXoy7GS7oeko9qMxHM\",\"notification\":{\"title\": \"Hello\",\"body\": \"world\"},\"priority\":10}"

  //Server key   AIzaSyBkG1-WNl8capVzTCuu2La-XfwAnr1jX5Q  //works
  //Sender ID   1033836948812

  //apiKey: "AIzaSyBtvRdO_UXCqhfPC8t4Wu4A5ecuYNDBChs",
  //Web API Key  AIzaSyBtvRdO_UXCqhfPC8t4Wu4A5ecuYNDBChs

  /*
  curl -X POST --header "Authorization: key=AIzaSyBkG1-WNl8capVzTCuu2La-XfwAnr1jX5Q" --header "content-type:application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"d-l2o2QdKNU:APA91bGXu-OQX5TxZkWueLc-6PyAZF89S05VdPPFfEycO24QvOqnDEQHxbqNGeQf-joSArgIwgUx5k-l1QSm4MM0bHEB4xN2vlceJR8cJhMOoQ91e76DsjlTXoiXoy7GS7oeko9qMxHM\",\"notification\":{\"title\":\"My Curl Test\",\"body\":\"This is the first installment for applying my newfound push notification skills\",\"icon\":\"http://www.ew.com/sites/default/files/styles/tout_image_612x380/public/i/2016/06/26/he-ma.jpg?itok=qtUVbFU7\"},\"priority\":5}"

  curl -X POST --header "Authorization: key=AIzaSyBkG1-WNl8capVzTCuu2La-XfwAnr1jX5Q" --header "content-type:application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"d-l2o2QdKNU:APA91bGXu-OQX5TxZkWueLc-6PyAZF89S05VdPPFfEycO24QvOqnDEQHxbqNGeQf-joSArgIwgUx5k-l1QSm4MM0bHEB4xN2vlceJR8cJhMOoQ91e76DsjlTXoiXoy7GS7oeko9qMxHM\",\"notification\":{\"title\":\"My 2nd Curl test\",\"body\":\"Second times a charm\",\"icon\":\"http://www.ew.com/sites/default/files/styles/tout_image_612x380/public/i/2016/06/26/he-ma.jpg?itok=qtUVbFU7\"},\"priority\":5}"
  */

```
