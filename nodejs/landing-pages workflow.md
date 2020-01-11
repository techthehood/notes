# landing-pages

### nginx setup
[nginx server block](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)   
server should already be set up to reverse proxy node js servers running express

[add a new location block](https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx/)   
> see location block section

```
    location /newRouteName {
      add_header X-app2-message "newRouteName section entered" always;
      proxy_pass http://localhost:1027;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

```
**each route needs the different port that node.js is listening on**
> proxy_pass http://localhost:[yourNewPort];


set up an express server with the given route
```
  npm init -y
  npm i express body-parser cors chalk request hbs

```
[express](https://www.npmjs.com/package/express)      
[bodyParser](https://www.npmjs.com/package/body-parser)    
[cors](https://www.npmjs.com/package/cors)    
[chalk](https://www.npmjs.com/package/chalk)   
[request](https://www.npmjs.com/package/request)   
[hbs (for handlebars)](https://www.npmjs.com/package/hbs)   


GOTCHA: path/ links issue


this worked in ejs - i guess handlebars uses this differently - the app.use('/apps',basicRoutes) breaks the handlebars views links
```
  app.use('/apps',basicRoutes);//this sets up the router path so i don't have to add it to each route
  // app.use('/',basicRoutes);// this fails - gives a 404 from apps route
  // app.use(basicRoutes);//same 404 issue
```

this let me use routes like this
```
  router.get('/', cors(corsOptions), (req, res) => {
```

the alternative is the use
```
  app.use(basicRoutes);
```

and add the route prefix to each route
```
  router.get('/apps', cors(corsOptions), (req, res) => {
```

**#GOTCHA - cloudflare caching is still in effect even with proxy servers - the original app.use('/apps',basicRoutes); does work
as long as you keep the CF cache current**

[BOOTSTRAP SIDEBAR](https://bootstrapious.com/p/bootstrap-sidebar)   

in the console dev tools use this to scroll to the one i used - or goto \#3. Fixed scrollable sidebar menu with a content overlay (probably easire)
```
  document.documentElement.scrollTop = 15168
```
