# [basic Routing](https://levelup.gitconnected.com/basic-routing-with-express-bc6a07783eaf)   

Routing is the most important part of a back end application. Express allows us to route URLs to our route handler code easily.
In this article, we’ll look at how to create basic routes with Express.
# Basic Routing
Routing is where an Express application responds to a client request from a URL or path and a specific HTTP request method, like GET or POST.
Each route in Express can have one more handler functions, which are executed when the route is matched.
The general definition of a route takes the following format:
```
app.METHOD(PATH, HANDLER);
```
app is the Express app instance.
The METHOD is an HTTP request method in lowercase. Possible methods include GET, POST, PUT, and DELETE.
PATH is the path for the route. HANDLER is the handler function that’s run when the route is matched.
For example, we can write:
```
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```
To display 'Hello World!' on the screen.
If we want our app to accept a POST request, we can use app.post as follows:
```
app.post('/', (req, res) => {
  res.send('Received POST request');
})
```
We can test this with an HTTP client like Postman by send a POST request to the URL that our app is running on. Then we should get:
Received POST request
In the response body.
Likewise, we can do the same for PUT and DELETE requests as follows:
```
app.put('/', (req, res) => {
  res.send('Got a PUT request at /user')
})
app.delete('/', (req, res) => {
  res.send('Got a DELETE request')
})
```
Notice that in each route handler, we have a req and res parameter. The req has the request object which has the URL, headers and other fields.
The res object lets us render a response back to the client-side.
Request Object
The req parameter we have in the route handlers above is the req object.
It has some properties that we can use to get data about the request that’s made from the client-side. The more important ones are listed below.

#### req.baseUrl
The req.baseUrl property holds the base URL of the router instance that’s mounted.
For example, if we have:
```
const express = require('express');
const app = express();
const greet = express.Router();
greet.get('/', (req, res) => {
  console.log(req.baseUrl);
  res.send('Hello World');
})
app.use('/greet', greet);
app.listen(3000, () => console.log('server started'));
```
Then we get /greet from the console.log .
#### req.body
req.body has the request body. We can parse JSON bodies with express.json() and URL encoded requests with express.urlencoded() .
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/', (req, res) => {
  res.json(req.body)
})
app.listen(3000, () => console.log('server started'));
```
Then when we make a POST request with a JSON body, then we get back the same that we sent in the request.
#### req.cookies
We can get cookies that are sent by the request with the **req.cookies** property.
```
req.hostname
```
We can get the hostname from the HTTP header with **req.hostname** .
When the trust proxy setting doesn’t evaluate to false , then Express will get the value from the X-Forwarded-Host header field. The header can be set by the client or by the proxy.
If there’s more than one X-Forwarded-Host header, then the first one will be used.
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.json(req.hostname)
})
app.listen(3000, () => console.log('server started'));
```
Then we get the domain name that the app is hosted in if there’re no X-Forwarded-Host headers and trust proxy doesn’t evaluate to false .
#### req.ip
We can get the IP address that the request is made from with this property.
#### req.method
The method property has the request method of the request, like GET, POST, PUT or DELETE.
#### req.params
params property has the request parameters from the URL.
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/:name/:age', (req, res) => {
  res.json(req.params)
})
app.listen(3000, () => console.log('server started'));
```
Then when we pass in /john/1 as the parameter part of the URL, then we get:
```
{
    "name": "john",
    "age": "1"
}
```
as the response from the route above.
#### req.query
The query property gets us the query string from the request URL parsed into an object.
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.json(req.query)
})
app.listen(3000, () => console.log('server started'));
```
Then when we append ?name=john&age=1 to the end of the hostname, then we get back:
```
{
    "name": "john",
    "age": "1"
}
```
from the response.

## Response Object
The response object has some useful methods to let us return various kinds of responses.
#### res.append
The append method lets us attach response headers to our responses.
For example, if we have the following code:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
  res.append('Warning', 'Alert')
  res.send();
})
app.listen(3000, () => console.log('server started'));
```
Then when we go to Postman, we should see the same data returned in the Headers tab of the response when we look at the data.
Note that we have to run res.send() to actually send the response.
#### res.attachment
res.attachment let us add a file to the response. It doesn’t send the response.
For example, we can use it as follows:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.attachment('../public/foo.txt');
  res.send();
})
app.listen(3000, () => console.log('server started'));
```
Then if we have a foo.txt in the public folder, then the file will be downloaded if we make the request to the route.
Note that again we have res.send() to actually send the response.
#### res.cookie
res.cookie lets us add a cookie to the response.
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.cookie('name', 'foo', { domain: 'repl.it', path: '/', secure: true })
  res.send();
})
app.listen(3000, () => console.log('server started'));
```
Then we send a cookie with name foo to the client. We can check in Postman under the Cookies link in the top right corner.
#### res.download
res.download sends a file response to the server.
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.download('./public/foo.txt');
})
app.listen(3000, () => console.log('server started'));
```
Then when a request is made to this route, then we’ll get a file downloaded.
#### res.json
res.json lets us send a JSON response to the client. The parameter can be any JSON type, including object, array, string, Boolean, number, or null.
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.json({ message: 'hi' });
})
app.listen(3000, () => console.log('server started'));
```
Then we get:
{"message":"hi"}
as the response.
#### res.redirect
We can use this to redirect to another URL with the string passed in. For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.redirect('http://medium.com');
})
app.listen(3000, () => console.log('server started'));
```
Then we’ll see the content of http://medium.com when we make the request to the route above.
#### res.status
res.status lets us send a status code response. We can use it with the end , send , or sendFile methods by calling them after calling status .
For example, if we have:
```
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.status(403).end();
})
app.listen(3000, () => console.log('server started'));
```
Then we get a 403 response.   

Conclusion   

Adding routes is simple with Express. We just have to tell it the URL and method to listen for, and the route handler to handle requests that match them.   

We can get query strings and URL parameters with the Request object.   

Then we can send a status, text, or file according to our preference with the Response object.   
Nodejs
Expressjs
JavaScript
Software Development
Technology
