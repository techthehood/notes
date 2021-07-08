
## Articles:

[socket.io server api docs](https://socket.io/docs/v3/server-api/)   
[socket.io client api docs](https://socket.io/docs/v3/client-api/)   
[socket.io client initialization](https://socket.io/docs/v3/client-initialization/)   
[Dynamic Namespaces Socket.IO](https://stackoverflow.com/questions/13143945/dynamic-namespaces-socket-io)   
[Dynamic Namespaces in Socket.io](https://dev.to/stolleydotdev/dynamic-namespaces-in-socket-io-35o6)   
[layout (style) props](https://reactnative.dev/docs/layout-props)   
[Webviews and social authentication with React Native](https://codeburst.io/webviews-and-social-authentication-with-react-native-cfecf96ac7d7)   

#### GOTCHA: absolute position not working (z-index issue)
> fix: i had to reorder the rN elements so absolute positioned elements would show in front of other elements
> its more like z-index didn't work

#### GOTCHA: react native socket.io-client issue  
> i did a lot of research and found a lot of leads that may prove useful in other areas but were 
> useless when dealing with this issue.

- react native or socket.io needs to add this disparity to their docs.
- IDEA: i want to create a gist and maybe a video about this issue
- i would also like to track these types of issues and raise funds to update their challenges
- [socket.io gets 4 million downloads per week](https://www.npmjs.com/package/socket.io-client)   
  image if we could get people to donate 10 cents to updating some of these issues?

### [Working with socket.io dynamic namespaces](https://alxolr.com/articles/working-with-socket-io-dynamic-namespaces)   

#### creating dynamic namespaces on the client   

_App.js_   

```
  import io from 'socket.io-client';

  const namespace = '/category/1/item/2/chat'

  const socket = io.connect(`${serverIoUrl}/${namespace}`, {
    query: `ns=${namespace}`,
    resource: 'socket.io'
  });
```

#### reading dynamic namespaces on the server   

_server.js_   

```
  const app = require('express')();
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  const sock = io.sockets.use((socket, next) => {

    const myQry = socket.handshake.query;
    console.log('[.use] ns = ', myQry.ns);

  }).on('connection', (socket) => {

    const namespace = socket.handshake.query.ns;
    console.log('[connection] namespace = ', namespace);

  ...

  server.listen(80);

```

### socket.use(fn)   

> middleware that executes before a connection - i can use this to block connections

```
  const sock = io.sockets.use((socket, next) => {
    // socket.disconnect(true);// works
    
    // const hasNamespace = typeof myQry === 'undefined' || typeof myQry.ns === 'undefined' ? false : true;

    if (!hasNamespace) {
      // send an error
      console.log('[.use] namespace not detected');
      const err = new Error('not authorized');
      err.data = { content: 'Please retry later' }; // additional details
      next(err);
    } else {
      next();
    }// else
  })
```

> Registers a middleware, which is a function that gets executed for every incoming Packet and receives as parameter the packet and a function to optionally defer execution to the next registered middleware.
> NOTE: **Errors** passed to the middleware callback are then emitted as error events on the server-side:

- client-side  error catcher

```
  socket.on("connect_error", err => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });
```

#### detect server connection and transport upgrade
[Troubleshooting connection issues](https://socket.io/docs/v4/troubleshooting-connection-issues/#A-proxy-in-front-of-your-servers-does-not-accept-the-WebSocket-connection)   
> covers Problem: the socket is stuck in HTTP long-polling

_App.js_

```
  useEffect(() => {

    console.log('[RocketNative] connecting...');
    socket = io('https://sunzao.us/webrtcPeer');
    socket.on("connect", () => {

      const transport = socket.io.engine.transport.name; // in most cases, "polling"
      console.log(`[io] transport`, transport);

      socket.io.engine.on("upgrade", () => {
        const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
        console.log(`[io] upgradedTransport`, upgradedTransport);
      });

  ...

```
> i was experiencing this:
> If you don’t see a HTTP 101 Switching Protocols response for the 4th request, that means that something between the server and your browser is preventing the WebSocket connection.

> unfortunately there was nothing i could do except downgrade my version of socket.io-client

#### [server handshake properties](https://socket.io/docs/v3/server-api/#socket-request)   

```
  {
  headers: /* the headers sent as part of the handshake */,
  time: /* the date of creation (as string) */,
  address: /* the ip of the client */,
  xdomain: /* whether the connection is cross-domain */,
  secure: /* whether the connection is secure */,
  issued: /* the date of creation (as unix timestamp) */,
  url: /* the request URL string */,
  query: /* the query params of the first request */,
  auth: /* the authentication payload */
}
```

#### [react native multi platform](https://necolas.github.io/react-native-web/docs/multi-platform/)    

```
  import { Platform } from 'react-native';

  ...

  const styles = StyleSheet.create({
    height: (Platform.OS === 'web') ? 200 : 100,
  });
```

