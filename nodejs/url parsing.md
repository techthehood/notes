# Node url parsing

#### [regular js solution](https://davidwalsh.name/query-string-javascript)   

```
  var urlParams = new URLSearchParams(window.location.search);

  console.log(urlParams.has('post')); // true
  console.log(urlParams.get('action')); // "edit"
  console.log(urlParams.getAll('action')); // ["edit"]
  console.log(urlParams.toString()); // "?post=1234&action=edit"
  console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"
```

#### [node js solution](https://www.w3schools.com/nodejs/nodejs_url.asp)   
```
  var url = require('url');
  var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
  var q = url.parse(adr, true);

  console.log(q.host); //returns 'localhost:8080'
  console.log(q.pathname); //returns '/default.htm'
  console.log(q.search); //returns '?year=2017&month=february'

  var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
  console.log(qdata.month); //returns 'february'
```

#### [node.js request object](https://www.tutorialspoint.com/nodejs/nodejs_request_object)   
[express docs - req. params](https://expressjs.com/en/4x/api.html#req.params)   
request.params
```
  app.delete('/delete/:id', async (req, res) => {
    // console.log('TEST');
    try {

    let client = new Client({
      connectionString: connectionString
    });


      await client.connect()
      const result = await client.query('DELETE FROM recipes WHERE id = $1',
      [req.params.id]);// reads the id from the url path

      await client.end()
      res.status(200).send(200);

    } catch (e) {
      console.log("[pg route] error",e);
    }

  })// delete
```
> app.delete('/delete/:id', async (req, res) => {
> req.params.id

##### [req.param (no 's') - request methods](https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params)   
**deprecated**
```
  req.param(id)
```
> works with example.com/req/id
> works same as params above but also works with query string parameters i.e. ?id=1234

#### [getting the request header](http://expressjs.com/en/5x/api.html#req.get)   
req.get(field)
> Returns the specified HTTP request header field (case-insensitive match). The Referrer and Referer fields are interchangeable.
```
  req.get('Content-Type')
  // => "text/plain"

  req.get('content-type')
  // => "text/plain"

  req.get('Something')
  // => undefined
```
> Aliased as req.header(field).
