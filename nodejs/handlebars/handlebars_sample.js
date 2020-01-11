// const path = require('path');
//
// const express = require('express');
// // const proxy = require('http-proxy-middleware');
const hbs = require('hbs');
// const chalk = require('chalk');
// const bodyParser = require("body-parser");
// const cors = require('cors');// make sure not just anyone can use my post requests
//
// const corsOptions = require('./utils/cors-options.js');
//
//
// //routers
// // const webpushRouter = require("./routers/web-push");
// // const savepushRouter = require("./routers/save-push");
// const pagesRouter = require("./routers/pages");
// const {pushpageRouter,webpushRouter,savepushRouter} = require("../public/push/routers/push-routers");
// const previewRouter = require("./routers/previews");
// const weatherRouter = require("./routers/weather");
//
//
// // console.log('forecast = ',forecast);
//
// console.log(`[dirname]`,__dirname);
// console.log(`[dirname public path]`,path.join(__dirname,"../public"));
//
// // var nR_Proxy = proxy('/req', {
// //   target: 'https://sunzao.us',
// //   changeOrigin: true
// // })
//
// const app = express();
// //GOTCHA: when i tried to leave the files in templates instead of templates/views it failed
//
// // mongo db setup
// app.use(bodyParser.json());
// const db = require("../public/todo/js/db.js");
// db.connect((err) => {
//   if(err){
//     console.log('unable to connect to database');
//   }else{
//     console.log("connected to database");
//   }
// })

const viewsPath = path.join(__dirname,"../templates/views");
const pushPath = path.join(__dirname,"../public/push/view");

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', [viewsPath, pushPath]);//this works

// set up the partials path
const partialsPath = path.join(__dirname,"../templates/partials");
hbs.registerPartials(partialsPath);


// path to public directory - where to find external files
//setup static directory to serve - server default/root
// this along with the nginx server blocks directs paths to specific 'public' site directories
const publicDirectoryPath = path.join(__dirname,"../public");
app.use('/req',express.static(publicDirectoryPath));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());
//
// // app.use(express.static(publicDirectoryPath));// formerly
//
// // app.use('/req',nR_Proxy);
//
// // setup all routers
// app.use(pagesRouter);
// app.use(previewRouter);
// app.use(pushpageRouter);
// app.use(webpushRouter);
// app.use(savepushRouter);
// app.use(weatherRouter);
//
//
//
//
// // app.options('/req/post', cors(corsOptions),function(req,res){
// //   res.setHeader("Access-Control-Allow-Origin",`https://${req.host}`);
// //   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //   res.end();
// // });
//
//
// //catchall has to be last to work
// app.get('*', cors(corsOptions), (req, res) => {
//   // res.send('my 404 page')
//   console.log('[express server] rendering 404')
//   res.render('404', {
//     title:'404',
//     errorMessage:'page not found'
//   });
// })
//
// // app.get('/help', (req, res) => {
// //   res.send('Help page')
// // })
// // in this case '/help' and '/help.html' in the public folder are both running
//
//
// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// })
