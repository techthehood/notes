# socket.io server example

server.js
```
    const mongo = require('mongodb').MongoClient;
    const client = require('socket.io').listen(3000).sockets;

    // connect to mongo
    mongo.connect('mongodb://localhost:27017/mongochat',{ useUnifiedTopology: true } , function (err, mg) {
    //wraps all interactions between server and client
    // the second callback argument represents the entire mongoDB database
      if(err){
        throw err;
      }

      console.log('mongoDB connected...');

      // Conect to Socket.io
      client.on('connection',function (socket) {
        // also wraps all interactions between server and client
        // on('connection' is a one time event

      // set the chat collection to a variable
        let chat = mg.db('mongochat').collection('chats');

        // Create fn to send status - this is an easy way to emit without rewriting socket.emit('status',) DRY
        let sendStatus = function (s) {
          socket.emit('status',s);
        }// sendStatus

          // get chats from mongo collection
          // this is all the chats - not specific to rooms or users - i haven't learned that yet
        chat.find().limit(100).sort({_id:1}).toArray(function (err, res) {

          if (err) {
            throw err;
          }

          // emit the messages
          socket.emit('output',res);
        });// chat.find

        // handle input events
        // i can call events whatever i want as long as client and server match interaction names
        // - like angularjs broadcast
        //  use on for receiving events and emit to send them
        socket.on('input',function (data) {
          let name = data.name;
          let message = data.message;

          // check for name and message
          if(name == "" || message == ""){
            // send error status
            sendStatus('please enter a name and message');
          }else {
            // insert message
            chat.insertOne({name, message}, function () {
              // DeprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.

              client.emit('output',[data]);
              // emit what data? - sends the users input data to all (including user who sent it)


              // send status object
              sendStatus({
                message: 'message sent',
                clear: true
              })// sendStatus
            });// chat.insert
          }// else
        });// on

        // handle clear - used for demo, not useful in production (i don't think)
        socket.on('clear', function (data) {
          // remove all chats form the collection
          chat.remove({}, function () {
            // Emit cleared
            socket.emit('cleared');
          });// chat.remove
        });// on clear


      });//connection


    });//mongo.connect

```
