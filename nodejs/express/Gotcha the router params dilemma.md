# the router params dilemma

[Multiple optional route parameters in Express?](https://stackoverflow.com/questions/41736413/multiple-optional-route-parameters-in-express/41748728)   

**without making changes http://localhost:3000/view/more works**

terminal message
```
  [req params] { val1: 'css', val2: 'd3po_ITK.css.map', val3: undefined }
  [params] val1 css
  [params] val2 d3po_ITK.css.map
  [params] val3 undefined

```
**the consoles js.map and .css.map files leak through into the route get request**
> i didn't originally notice this, it appeared to work. my goal was multiple params so i tried another
> adding any more params broke the client side view

#### original test http://localhost:3000/view/more/so/

view.js
```
  router.get("/:val1?/:val2?/:val3?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
```

src/server.js
```
app.use('/view',express.static(publicDirectoryPath));
app.use('/view',viewPagesRouter);
```
> produced multiple 404s
> http://localhost:3000/view/more/core/js/file.js 404

terminal message
> url http://localhost:3000/view/more/so/   
```
  [req params] { val1: 'more', val2: 'css', val3: 'icon.css' }
  [params] val1 more
  [params] val2 css
  [params] val3 icon.css
```
> blank errored out screen
> all link and script files were getting through the route
> 'so' (the second param) was being ignored

[Uncaught SyntaxError: Unexpected token <](https://idiallo.com/javascript/uncaught-syntaxerror-unexpected-token#n)
> this article make me instantly realize that 404 was involved and i started looking at the network routes in the console
> idk if thats what the article was about, but it triggered a thought

#### second test http://localhost:3000/view/more/so/ overkill
**the next morning**
> realizing the routes were wrong i started making the publicDirectoryPath more robust
> i did it with the view router too

src/server.js
```
  app.use('/view',express.static(publicDirectoryPath));
  app.use('/view/:val1?',express.static(publicDirectoryPath));
  app.use('/view/:val1?/:val2?',express.static(publicDirectoryPath));
  app.use('/view/:val1?/:val2?/:val3?',express.static(publicDirectoryPath));


  app.use('/view',viewPagesRouter);
  app.use('/view/:val1?',viewPagesRouter);
  app.use('/view/:val1?/:val2?',viewPagesRouter);
  app.use('/view/:val1?/:val2?/:val3?',viewPagesRouter);
```

view.js
```
  router.get("/", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?/:val2?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?/:val2?/:val3?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
```

terminal
> url http://localhost:3000/view/more/so/   

```
  [req params] { val1: 'so', val2: 'css', val3: 'icon.css' }
  [params] val1 so
  [params] val2 css
  [params] val3 icon.css

```
> params are still contaminated and multiple get requests are made to the route from loading link/script files


#### final working example

src/server.js
```
  app.use('/view',express.static(publicDirectoryPath));
  app.use('/view/:val1?',express.static(publicDirectoryPath));
  app.use('/view/:val1?/:val2?',express.static(publicDirectoryPath));
  app.use('/view/:val1?/:val2?/:val3?',express.static(publicDirectoryPath));


  app.use('/view',viewPagesRouter);
```
> all the public paths have to be written explicitly
> notice only one view router - this made the difference in combination with the other 2.

view.js
```
  router.get("/", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?/:val2?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?/:val2?/:val3?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
```



### Observations

#### One public path (using only the longest one in server.js)
src/server.js
```
  // app.use('/view',express.static(publicDirectoryPath));//
  // app.use('/view/:val1?',express.static(publicDirectoryPath));// needed for the links and scripts to work
  // app.use('/view/:val1?/:val2?',express.static(publicDirectoryPath));// needed for the links and scripts to work
  app.use('/view/:val1?/:val2?/:val3?',express.static(publicDirectoryPath));// ne
```
having only the longest route exposed:
view still works
3 params works
nothing in between works
> so they all have to be exposed to get the full benefit

#### a different order?
views.js
```
  router.get("/", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?/:val2?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?/:val2?/:val3?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);

  router.get("/:val1?/:val2?/:val3?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?/:val2?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/:val1?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
  router.get("/", cors(corsOptions), /*passportJWT,*/ viewItemDetails);

```
> the order like this comment is inconsequential

#### chrome devtools console-terminal issue
```
  http://localhost:3000/view/more/
  http://localhost:3000/view
```

> when the chrome browser console is open view and view/more let in the consoles get request for some of webpack's .js.map and .css.map files this won't effect my setup since ill be ignoring view altogether and filtering out view/more looking for a valid ObjectId and a valid item id. If its valid for the item ill ignore anything else.  If its a valid ObjectId but its for a user_id, ill move to check the next param for item info.

> if this wasn't the case i would have to write something specific that dealt with the consoles intrusion into my route


#### more link/script contamination (using only the longest one in view.js)

view.js
```
// router.get("/", cors(corsOptions), /*passportJWT,*/ viewItemDetails);
// router.get("/:val1?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);// needed to help link/script contamination
// router.get("/:val1?/:val2?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);// needed to help link/script contamination
router.get("/:val1?/:val2?/:val3?", cors(corsOptions), /*passportJWT,*/ viewItemDetails);// needed to help link/script contamination
```
> if i cut out the other routers all the links/scripts will be processed through the remaining get request therefore also showing multiple requests in the terminal console

> i think multiple requests are always made but they don't go through the router.get script. without the other routes they all go through

#### just the shortest params route
```
  router.get("/:val1?", cors(corsOptions), /*passportJWT,*/ viewI
```
> if i just use the shortest params route the links/scripts don't go through the route but the longer params also don't work.

> idk how having them all filters out the links/scripts but it does ( apart from the console .maps for the shortest one)

[more on express route params](https://stackoverflow.com/questions/34704593/express-routes-parameters)   

#### GOTCHA: i guess just wait? (reboot the browser?)
this last time activating the :val2? router param the .hbs links failed but then my computer shut down and once it rebooted they just worked.
