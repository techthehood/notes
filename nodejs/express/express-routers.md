# Express router notes

 ```
  const express = require('express');
 ```

create paths to the routers you want to use in the variouse applications
```
  //routers
  // const landingpagesRouter = require("./routers/lead-pages");
  const appspagesRouter = require("../public/apps/routers/apps");
  const arcPagesRouter = require("../public/alight/routers/alight");
  const detailPagesRouter = require("../public/alight/routers/detail");
  const arcAPIRouter = require("../public/alight/routers/api");
  const ppAPIRouter = require("../public/profile-panel/routers/api");
  const businessRouter = require("../public/business/routers/business");
```

### see side mission below

#### set the public path for the link and script urls found in the views directories
```
  app.use('/core',express.static(publicDirectoryPath));
  app.use('/detail',express.static(publicDirectoryPath));//
  app.use('/detail/:val1?',express.static(publicDirectoryPath));// needed for the links and scripts to work
  app.use('/detail/:val1?/:val2?',express.static(publicDirectoryPath));// needed for the links and scripts to work
  // app.use('/view/:val1?/:val2?/:val3?',express.static(publicDirectoryPath));// needed for the links and scripts to work


  app.use('/auth',express.static(publicDirectoryPath));// client side auth
  app.use('/brand',express.static(publicDirectoryPath));
```
**notice the :val1?/:val2? paths - used to process paths with dynamic values**


#### connect the variables which hold the routes from various applications to the paths that will be used to call the route
```
  app.use('/core',arcPagesRouter);
  app.use('/detail',detailPagesRouter);
  // app.use('/view/:val1?',detailPagesRouter);// not needed - contaminates the params with links and scripts
  // app.use('/view/:val1?/:val2?',detailPagesRouter);// not needed - contaminates the params with links and scripts
  // app.use('/view/:val1?/:val2?/:val3?',detailPagesRouter);// not needed - contaminates the params with links and scripts
  app.use('/auth', require('../public/oauth_client/routers/auth'))// client side auth
  app.use('/brand', require('../public/business/routers/business'))
  app.use('/api/auth', require('./oauth_server/routers/oauth'))// server side auth
  app.use('/api/alight', arcAPIRouter)// server side auth
  app.use('/api/profile', ppAPIRouter)// server side auth
```
**more on this can be found in express/params notes.md**

#### routes can be nested/chained where routes can call other routes which can be called using other paths
alight/routers/api.js
```
    router.all('/*', cors(corsOptions), passportJWT,  async (req, res, next) => {
      console.log('[cors/passport] passed');
      next();
    })

    router.use("/items",items);
    router.use("/users",users);
```


#### Set up route handlers
```
  const ItemsController = require('../controllers/items');
  const addMyInfo = require('../controllers/lib/addMyInfo');
  const editMyInfo = require('../controllers/lib/editMyInfo');
  const deleteMyInfo = require('../controllers/lib/deleteMyInfo');
  const detachMyInfo = require('../controllers/lib/detachMyInfo');
  const attachMyInfo = require('../controllers/lib/attachMyInfo');
  const getMyInfo = require('../controllers/lib/getMyInfo');
  const getPreviewData = require('../controllers/lib/getPreviewData');
  const uploadOrder = require('../controllers/lib/uploadOrder');
```
**in the route folders you can set up functions to handle the request**

#### add the route handler function to the post request
```
  items.route('/getMyInfo')
  .post(getMyInfo);

  items.route('/addMyInfo')
  .post(addMyInfo);

  items.route('/editMyInfo')
  .post(editMyInfo);

  items.route('/deleteMyInfo')
  .post(deleteMyInfo);
```

#### Sample of route handler function
```
    const chalk = require('chalk');
    // const Item = require('../../models/item');
    // const Pair = require('../../models/pair');
    const Pref = require('../../models/pref');

    const uploadBookmark = async function(req, res)
    {
      try {

        let new_bkmk = req.body.payload;
        // info_table = "#__ali_user_prefs";

        console.log(chalk.blue("[new_bkmk]"),new_bkmk);

        // cur_arc_user = jFactory::getUser();
        // arc_user_id = cur_arc_user.id;
        // if(arc_user_id == 0){return "[server note:]unregistered user[server note]";}
        let user_id = req.user._id;

        let prefs = await Pref.findOneAndUpdate({ user_id: user_id}, { $set:{ bookmarks: new_bkmk} }, { new: true, upsert: true });

        if(prefs)
        {
          let success_msg = "upload successful";
          // res.json({
          //   message: success_msg
          // });
          res.send(success_msg);
        }else {
          let fail_msg = "upload failed";
          // res.json({
          //   message: fail_msg
          // });
          res.send(fail_msg);
        }//end else

      } catch (e) {
        let error_msg = "[uploadBookmark] error has occured";
        console.error(chalk.red(error_msg),e);

        // res.json({
        //   error: true,
        //   message: error_msg
        // });
        res.send(error_msg);
      }


    }//end upload_bookmark


  module.exports = uploadBookmark;
```
**notice the function(req, res) to access the request object and the response**













### Side mission - set up your view and partials locations
```
  const viewsPath = path.join(__dirname,"../templates/views");// default views location
  const appsPath = path.join(__dirname,"../public/apps/views");
  const alightPath = path.join(__dirname,"../public/alight/views");
  const oauthClientPath = path.join(__dirname,"../public/oauth_client/views");// client side auth
  const businessPath = path.join(__dirname,"../public/business/views");

  //setup handlebars engine and views location
  app.set('view engine', 'hbs');
  app.set('views', [viewsPath, appsPath, alightPath, oauthClientPath, businessPath]);//this works

  // set up the partials path
  const partialsPath = path.join(__dirname,"../templates/partials");
  const qpPartialsPath = path.join(__dirname,"../public/quick-panel/views");
  const qlPartialsPath = path.join(__dirname,"../public/quick-link/views");
  const pPPath = path.join(__dirname,"../public/profile-panel/views");
  const oauthClientPartialsPath = path.join(__dirname,"../public/oauth_client/views");// client side auth
  const bizPartialsPath = path.join(__dirname,"../public/business/views");
  const alightPartialPath = path.join(__dirname,"../public/alight/views");

  console.log("[pPPath]",pPPath);
  hbs.registerPartials(partialsPath);
  hbs.registerPartials(qpPartialsPath);
  hbs.registerPartials(qlPartialsPath);
  hbs.registerPartials(pPPath);
  hbs.registerPartials(oauthClientPartialsPath);// client side auth
  hbs.registerPartials(bizPartialsPath);
  hbs.registerPartials(alightPartialPath);
```
