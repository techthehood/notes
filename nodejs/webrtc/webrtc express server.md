# webRTC-socketio server using express

```
  const express = require('express');
  const path = require('path');
  const app = express();
  var http = require('http').Server(app);
  const io = require('socket.io')(http);
  const PORT = 3002;

  // app.get('/', (req, res) => {
  //   res.send('Hello World!');
  // });


  // https://expressjs.com/en/guide/writing-middleware.html
  const publicDirectoryPath = path.join(__dirname,"../public");
  app.use('/meet',express.static(publicDirectoryPath));

  const appPath = path.join(__dirname,'../public/rocket/index.html');
  app.get('/meet',(req, res, next) => {
    res.sendFile(appPath);
  });

  // app.get('*', (req, res) => {
  //   // res.send('my 404 page')
  //   console.log('[express server] rendering 404')
  //   res.render('404', {
  //     title:'404',
  //     errorMessage:'page not found'
  //   });
  //
  // });

  const server = http.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  })

  // io.listen(server);

  // to learn more about namespaces
  // https://www.tutorialspoint.com/socket.io/socket.io_namespaces.htm

  const peers = io.of('/webrtcPeer');
  let connectedPeers = new Map();

  // keep a reference of all socket connections
  peers.on('connection', (socket) => {
    console.log('[socket] id',socket.id);

    socket.emit('connection-success', {success: socket.id});

    connectedPeers.set(socket.id, socket);
    // FUTURE: i can expand  the peerID data to hold json which includes user id and low-res image blob
    // FUTURE: may need mongodb persistence

    socket.on('disconnect', () => {
      console.log('disconnected');
      connectedPeers.delete(socket.id);
    });

    socket.on('offerOrAnswer', (data) => {
      // send to the other peer(s) if any
      for(const [peerID, peer] of connectedPeers.entries()){
        // don't send to self
        if(peerID !== data.socketID){
          console.log('[offerOrAnswer] id and payload',peerID, data.payload);
          peer.emit('offerOrAnswer', data.payload);// this socket variable is from the for loop
        }else{
          console.log('[same offerAnswer id]');
        }
      }
      // FUTURE: groups need to save the offer and the host and auto offer to new connections
      // or auto offer to all existing pending connections
      // there is an issue with late connections net receiving an offer - late connections also need to be approved
      // its easier to kick the one that doesn't belong than to approve all - allow a kick to remove a socket or
      // add a socket to a banned list - how do you keep the ip address from returning? - if registered user
      // we can hold the user id
    });// offerOrAnswer

    socket.on('candidate', (data) => {
      // send to the other peer(s) if any
      for(const [peerID, peer] of connectedPeers.entries()){
        // don't send to self
        if(peerID !== data.socketID){
          console.log('[candidate] id and payload',peerID, data.payload);
          peer.emit('candidate', data.payload);
        }else{
          console.log('[same candidate id]');
        }
      }
    });// candidate

    // FUTURE: the host can have a list of socketID's attached to thumbnail images
    //  the host can click the id and inform the server to send the candidate to everyone

    // FUTURE: connectedPeers already has the full list of participants
    // parse through the list and match the id to the candidate data - then send the candidate data to each candidate

  });// peers connection

```
