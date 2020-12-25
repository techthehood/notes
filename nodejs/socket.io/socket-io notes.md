
[Build a Chat App With MongoDB & Socket.io [Part 1]](https://youtu.be/8Y6mWhcdSUM)   
[Build a Chat App With MongoDB & Socket.io [Part 2]](https://youtu.be/hrRue5Rt6Is)   
> walkthrough videos

#### [get mongodb native node driver](https://mongodb.github.io/node-mongodb-native/)   

#### [socket.io emit cheatsheet](https://socket.io/docs/v3/emit-cheatsheet/index.html)   

#### GOTCHA: [api example](https://mongodb.github.io/node-mongodb-native/3.5/api/)   
```
let chat = db.collection('chats') is not a function
```

fix
```
  let chat = mg.db('mongochat').collection('chats');
```

#### [socket.io docs](https://github.com/socketio/socket.io)   

#### start the node server (the long way)
```
   node server.js
```

start it the short way modify package.json
```
  "scripts": {
    "start": "node server.js"
  },

  then run
  npm start
```

#### [add bootstrap 4 cdn (google search)](https://getbootstrap.com/docs/4.0/getting-started/introduction/)   
```
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
```

add these to your html head
> useful in mobile scaling and responsiveness
```
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
```

#### [add socket.io cdn (google search)](https://cdnjs.com/libraries/socket.io)   
```
  https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js
```

i had some server connection challenges
> DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
```
  mongo.connect('mongodb://127.0.0.1:27017/mongochat',{ useUnifiedTopology: true } , function (err, mg) {

    //127.0.0.1:27017

    // 'mongodb://localhost:27017/mongochat'
```
**this worked**
**localhost also worked**

> when the first message is sent the db and collection are made, but not before then. (not on connection)


## SERVER SIDE NOTES

The server setup is a little different from what im used to using express.  it seems pretty simple and
straight forward
```
  const mongo = require('mongodb').MongoClient;
  const client = require('socket.io').listen(4000).sockets;
```

the entire rest of the interactions between the server and client happen inside of the mongo.connect wrapper
```
  mongo.connect('mongodb://localhost:27017/mongochat',{ useUnifiedTopology: true } , function (err, mg) {
```
**mongo.connect returns an instance of all the mongoDB databases in the callbacks second argument 'mg'**

**{ useUnifiedTopology: true } fixes DeprecationWarning**

> i think i want to rename 'client' to 'group' and 'socket' to 'user'

> it seems that the client.on('connect') & mongo.connect( are mutually exclusive processess
  other than the fact that client.on('connect') is written inside the mongo.connect fn and also after the error message client.on('connect') actually deals with client browser connecting to the server not whether or not
  we are connected to the db

like the mongo.connect fn all the rest of the interaction functions are also wrapped inside
```
  client.on('connection',function (socket) {
```

#### Warning
```
  chat.insert({name, message}, function () {
    // DeprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.

  //use

  chat.insertOne({name, message}, function () {
```
**insert one can be fitted with a callback to do something afterward or async before the process wrapped in a try catch statement**

>when i stop and restart the server, browser opened to this page gets all the messages sent all over again
you may see duplicates in the message feed.

*_see server.js for the rest of server observations_*


## Client side observations
similarly client side js is wrapped in an if statement that test to see if the socket has been
established.
```
  let socket = io.connect('http://127.0.0.1:4000');// io from above script

  if (socket != undefined) {
    console.log('Connected to socket...');

    //  get the chats (output)
    // Handle outputs
    socket.on('output',function (data) {
```

then the socket events are added as needed.

#### add the chat apps web address to io.connect
```
  io.connect('http://127.0.0.1:4000');
```
here we use a specific port but on a live server a path is enough

#### Research Questions
how is this managed with express? so i can control paths and create dynamic paths?

```
  const express = require('express');
  const socket = require('socket.io');

  // App setup

  const app = express();
  const server = app.listen(4000, () => {
    console.log('listening to requests on port 4000');
  });

  //static files
  app.use(express.static('public'));

  // socket setup
  const io = socket(server);

  io.on('connection', (socket) => {
      console.log('made socket connection');

  })
```
**no connection will be made to socket.io on the server without socket.io running on the client.**

#### to run the html open the file in the browser
```
  file:///C:/Users/.../socket.io/foldername/index.html
```

### GOTCHA: needed to run on live servers (nginx)
```
    upstream upstream-nodejs {
            server  127.0.0.1:3002;
            #new
    }

     server {

    	root /var/www/example.com/html;

    ...
```

A location block to match socket.io's default path setting
```
    location /socket.io/ {
            proxy_pass              http://upstream-nodejs;
            proxy_redirect off;

            proxy_http_version      1.1;

            proxy_set_header        Upgrade                 $http_upgrade;
            proxy_set_header        Connection              "upgrade";

            proxy_set_header        Host                    $host;
            proxy_set_header        X-Real-IP               $remote_addr;
            proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
    }
```

client side connection
```
  const socket = io(
    '/webrtcPeer'
  );// worked
```
**a default configuration that includes an optional namespace**



right now adding a path wouldn't necessarily help because idk a way to set bearer tokens in a socket.io header

client side io connect url is unexpected when looking at devtools network tab (poling)
```
  socket_ref.current = io.connect(`${location.origin}`,{
    path:"/narrator"
  });
```
**this made it fit my expectations**

#### Path not working
[Connect to Socket.IO server with specific path and namespace](https://stackoverflow.com/questions/29511404/connect-to-socket-io-server-with-specific-path-and-namespace)   
sample

server.js
```
  const express = require('express');
  const socketio = require('socket.io');


  const app = express();
  const server = http.createServer(app);

  const io = socketio(server,{ path: '/narrator' });
```

i added the path to the server options
```
  const io = socketio(server,{ path: '/narrator' });
```

#### path vs namespace

client
```
  socket_ref.current = io.connect(`${location.origin/namespace}`,{
    path:"/pathname"
  });
```

server
```
  const io = socketio(server,{ path: '/pathname' });
   // pathname is added to the url path - example.com/pathname

   io.of('namespace')
```
>namespace is used to specify a specific socket

[socket.io rooms or namespacing?](https://stackoverflow.com/questions/10930286/socket-io-rooms-or-namespacing)
> namespaces are static spaces specifically created on the server by the developer.  the client can only join
the pre-determined namespace and the developer usually harcodes that namespace on the client.

>rooms are dynamic spaces that can be created on the fly as needed by the user and the parties they want
to interact with.  they are not hard coded on the server.


#### how do i block a user and force close a connection on the server?
[Is Socket.close() considered a clean way to end the connection?](https://stackoverflow.com/questions/41409670/is-socket-close-considered-a-clean-way-to-end-the-connection)   
> i can send a message to the client which in theory will do a similar thing unless the user finds a way to block that message
somehow.   i haven't found a way to disconnect on the server or blacklist a users connection.  i think i can add the user to the rooms
blacklist array and disable all emissions for them.

```
  userEffect(()=>{

      socket.on("blocked", message => {
        // print blocked message?
        socket.close();
      })
      // return () => {
      //   leaveRoom();
      // }
      return () => {
        socket.close();
      }
    },[]);
```
