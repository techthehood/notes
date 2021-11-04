# samesite cookie notes

### articles   
[SameSite Cookie recipes](https://web.dev/samesite-cookie-recipes/)   
[SameSite Cookies Explained](https://web.dev/samesite-cookies-explained/)   
[SameSite Cookie attribute explained by example (Hussein)](https://youtu.be/aUF2QCEudPo)   
[SameSite Cookies | Chrome update](https://youtu.be/GPz7onXjP_4)   
[caniuse samesite](https://caniuse.com/?search=samesite)   
[]()   
[]()   

#### cookie checker in front of the api route

_trigger/routers/api.js_

```
const express = require('express');
const cp = require('cookie-parser');
router.use(cp());

router.all('/*', cors(corsOptions), async (req, res, next) => {
  console.log(chalk.keyword('pink')('[trigger] pre passport api - entered'));

  // check for sameSite cookies
  console.log("[sample] req.headers", req.headers);
  console.log(chalk.keyword('pink')("[sample] req.cookies", req.cookies['d3Cookie']));


  let cookieVal = null;

  if (req.cookies['d3Cookie']) {
    // check the new style cookie first
    cookieVal = req.cookies['d3Cookie'];
  } else if (req.cookies['d3Cookie-legacy']) {
    // otherwise fall back to the legacy cookie
    cookieVal = req.cookies['d3Cookie-legacy'];
  }

  if (cookieVal == null){
    next(new Error("Permission denied."));
  }else{
    next();
  }// else

})

```

#### set cookie

_trigger/routers/trigger.js_

```
  router.get('/*', cors(corsOptions), (req, res) => {
    // res.send('Hello express!')
    //I do need this catchall for the react router to take direct links (address bar initiated - not in the router link)
    // without this even page refreshes won't work in restoring the samee page
    console.log("[trigger] req", req.baseUrl);
    console.log("[oauth client] entered");

    
    // res.setHeader('set-cookie',['samesite=strict; secure']);
    res.cookie('d3Cookie', 'trigger', { sameSite: 'Lax', secure: true });
    // set a legacy cookie for other browsers
    res.cookie('d3Cookie-legacy', 'trigger', { secure: true });
  // i think the second one overwrites the first one

    res.render('trigger', {
      title:'Help',
      name: 'Andrew Mead',
      help_txt: 'Some help message'
    })
  })
```

#### 2 ways to set cookies   

```
  res.setHeader('set-cookie',['samesite=strict; secure']);
  // or
  res.cookie('d3Cookie','trigger4', {sameSite:'Lax', secure: true});
```
> you can't use both at the same time
> i think the second one overwrites the first one

#### set two types of cookies just in case (browser issues and inconsistencies)   

```
  res.cookie('d3Cookie','trigger4', {sameSite:'Lax', secure: true});
  // set a legacy cookie for other browsers
  res.cookie('d3Cookie-legacy', 'trigger4', { secure: true });
  
```