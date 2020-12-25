# webrtc notes

#### the handshake process
create offer - send sdp to remote
set sdp as remote on answerer
create answer - send sdp of remote back to caller
set sdp as remote on caller
send candidate to answerer
add candidate on answerer

#### GOTCHA:
namespace not working - i wasn't even working on the file smh
```
  const socket = io(
    '/webrtcPeer'
  );
```
**works**

#### GOTCHA: live namespace not working
[using socket.io with express docs](https://socket.io/docs/#using-with-express-3/4)  

server
```
  // change the namespace to meet
  const peers = io.of('/meet');
```

**good http is already listening instead of express**

express is configured for 'meet' path
```
  const publicDirectoryPath = path.join(__dirname,"../public");
  app.use('/meet',express.static(publicDirectoryPath));

  const appPath = path.join(__dirname,'../public/idex.html');
  app.get('/meet',(req, res, next) => {
    res.sendFile(appPath);
  });
```

client
```
  const socket = io.connect("http://localhost:3002/meet");//works - meet namespace
```
also needs dotenv and a .env file (deprecated)

#### try adding a dotenv file (deprecated)
.env
```
  NODE_ENV='development'
```
**ultimately this was not needed**


##### GOTCHA index.html prematurely sent
file config: public/index.html
new config: public/rocket/index.html
>with the new configuration the index.html wasn't automatically being sent and the express route could be used to handle the request.


#### Nginx had to be configured to handle socket polling

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
```
