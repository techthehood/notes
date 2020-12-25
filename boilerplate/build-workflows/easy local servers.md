# easy local servers
### node vs nodemon vs live-server

#### [What is the difference between nodemon and live-server?](https://reactjs.org/docs/add-react-to-a-website.html)   
[live-server vs http-server vs nodemon (npm trends)](https://www.npmtrends.com/live-server-vs-http-server-vs-nodemon)   

  They serve two different purposes.

  Nodemon will restart a Node application when file changes in a directory are detected.

  Live-server on the other hand, will refresh your browser when changes are detected to any supported file types (e.g. HTML, JS, CSS). It also enables Ajax requests when you are working locally — these don't normally work with the file:// protocol.

#### the setup

  To see this in action, let's create a simple Node server.

  First, create a my-app directory, change into it, create a package.json file and a file named server.js. On a 'nix system, like so:
```
  mkdir my-app
  cd my-app
  npm init -y
  touch server.js
```
  Then in server.js add:
```
  const http = require('http');

  const server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello, World!\n");
  });

  server.listen(8000);
  console.log("Server running at http://127.0.0.1:8000/");
```
  Now, if you run node server.js, and visit http://127.0.0.1:8000/ in your browser, you will see a "Hello, World!" message.

#### using node
```
  node server.js
```

  If you edit server.js, for example to change the message to "Goodbye, World!", then refresh your browser, you will still see the original "Hello, World!" message.

  **To see the changes, you have to stop the application** (with Ctrl + C), then restart it (with node server.js), then refresh your browser.

#### using nodemon

  What nodemon does, is to wrap your Node application to automate this step of manually stopping and restarting the application.

  Install it as a dev dependency:
```
  npm i -D nodemon
```
  And start your application like so:

  ./node_modules/.bin/nodemon server.js
  Now when you make changes to server.js, nodemon will detect this automatically, meaning that all you need to is refresh your browser to see them — **you avoid the stop/starting of the application.**

#### using Live-server

  What live-server does on the other hand is quite different. You should install it globally:
```
  npm install -g live-server
```
  then when you start it in a directory, it will attempt to serve up an index.html file if one exists (otherwise it will display the directory's contents).

  Staying in the my-app directory, create an index.html file:
```
  touch index.html
```
  Then add the following content:
```
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Test</title>
      <style></style>
    </head>
    <body>
      <p>Hello, World!</p>
      <script></script>
    </body>
  </html>
```
  Start live-server, by entering live-server in a terminal window and http://127.0.0.1:8080 should open in your browser.

  Now try changing the message in the HTML file, or adding some styles or some JavaScript. When you make any of these changes and save, **the browser will refresh and you will see these changes in your page.**

  This in itself is very practical, but nothing you couldn't do by refreshing the browser manually. Where a package like this becomes indispensable is when you make an Ajax request, include a file without using a protocol, or do anything else that would be blocked by the browser's security policy if you were to open an HTML file directly.



#### run the webpage without creating a server
```
  npx http-server -o index.html

  // or for a specific port use

  npx http-server -o -p 3001 index.html // fails

  npx http-server -o index.html -p 3001 // works
```
**port 8080 is default for http-server**
#### GOTCHA: if you are only trying to open a file that is running on a nodeman port skip adding the port

also mention

#### running a python? local server
**I never really use this one.  i think i found it when i was really looking for http-server**
$ python -m SimpleHTTPServer

GOTCHA:
python -v (doesn' work on git bash or CLI)
use python --version-control/react/react_scratch/index

ctrl - z closes python on CLI - bash i don't know

[how to use simpleHttpServer](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/)

GOTCHA:
try:
```
$ python -m SimpleHTTPServer
```
//No module named SimpleHTTPServer

searced error(https://github.com/ghickman/classify/issues/16)
python 3 simple server syntax has changed to:

```
python -m http.server
```

default port is 8000
```
localhost:8000
```

#### create a basic express server
```

```
