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
