# Nodejs

#### nodejs coarse

[installing nodejs](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)   
[How to Upgrade (or Downgrade) Node.js using NPM](https://www.abeautifulsite.net/how-to-upgrade-or-downgrade-nodejs-using-npm)   
```
?
```
idk if it worked

testing out node
```
  $ clear
  $ node
  >
```
**give you a place to run individual node statements aka an 'repl' (read eval print loop)**
```
>2+3
5
>'andrew'.toUpperCase()
ANDREW
```
the browser has window node has globally
the browser has document node has process
```
  $ process.exit()
```
[nodejs.org docs](https://nodejs.org/en/docs/)    
[docs for node.js 8x](https://nodejs.org/docs/latest-v8.x/api/)   

---

## Lectures

creating a search form
```
  weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log("testing");

    let input_el = document.querySelector('input');
    let place = input_el.value;

    // console.log(place);

    fetch(`http://localhost:3000/weather?address=${place}`)

    ...
```
**notice input and form in querySelector**

#### Browser HTTP requests with fetch
```
  console.log("[public/js] app.js running!");

  fetch('http://localhost:3000/weather?address=washington%20dc')
  .then((response)=>{
    response.json()
    .then((data) => {
      if(data.error){
        console.log(data.error);
      }else{
        console.log(data.location);
        console.log(data.summary);
      }
    })
  })
```
**notice response.json().then(...)  (i want to research response.json())**

#### ES6 default funtion (objects)
```
  callout('an error occured',undefined)

  //below is the callout

  (error,{url,location} = {}) => {
    if(error){
      return res.send(error)
    }
  }
```
> i could have used an empty object instead of undefined or i can use a defaut object


#### The Query string
```
  app.get('/weather', (req, res) => {
    // console.log(req.query);
    // console.log(req.query.search);
    // req.query
    if(!req.query.address){
      // cant send twice so use return
      return res.send({
        error:'You must provide an address'
      })
    }//if

    res.send({
      forcast:'It is raining',
      location:'Washington D.C.',
      address:req.query.address
    })

  })
```
> parse query using req.query (req.query.[selector])
>use return to prevent server from attempting to send twice

#### 404 pages
```
  app.get('/help/*', (req, res) => {
    // res.send('my 404 page')
    res.render('404', {
      title:'404',
      errorMessage:'help article not found'
    });
  })

  app.get('*', (req, res) => {
    // res.send('my 404 page')
    res.render('404', {
      title:'404',
      errorMessage:'page not found'
    });
  })

```
> created 404.hbs

#### Advanced Templating
```
  //setup handlebars engine and views location
  app.set('view engine', 'hbs');
  app.set('views', viewsPath);

  // set up the partials path
  const partialsPath = path.join(__dirname,"../templates/partials");//<<diff
  hbs.registerPartials(partialsPath);//<<diff
```

>Get nodemon to recognize changes to hbs files
```
  $ nodemon src/app.js -e js,hbs
```
> notice the [-e] and the comma separated extension list

#### Customizing the views directory
> changed views dir to templates - caused failure
> once changed i have to tell handlebars haw to find the new view default location

**diff**
```
  app.set('view engine', 'hbs');
  app.set('views', viewsPath)//<< diff set views path
```


#### Dynamic pages with templating
[handlebars npm docs](https://www.npmjs.com/package/handlebars)   
[hbs - handlebars for express](https://www.npmjs.com/package/hbs)   

```
  npm i hbs
```

app.js
**diff**
```
  app.set('view engine', 'hbs');//<< added view engine
  //set up a views dir with ext '.hbs'  index.hbs or about.hbs


  //for these to work you have to get rid of public version of index.html
  app.get('', (req, res) => {
    // res.send('Hello express!')
    res.render('index', {
      title:'Weather',
      name: 'Andrew Mead'
    })
  })

  // GOTCHA: remember to remove about.html
  app.get('/about', (req, res) => {
    // res.send('Hello express!')
    res.render('about', {
      title:'About Me',
      name: 'Andrew Mead'
    })
  })

  // GOTCHA: remember to remove help.html
  app.get('/help', (req, res) => {
    // res.send('Hello express!')
    res.render('help', {
      title:'Help',
      help_txt: 'Some help message'
    })
  })
```

>//>> also notice res.render() instead of res.send()




#### Hello express && Serving up HTML & JSON
**Basic express setup**
```
  const path = require('path');
  const express = require('express');

  console.log(__dirname);
  console.log(path.join(__dirname,"../public"));

  const app = express();

  app.get('', (req, res) => {
    res.send('Hello express!')
  })

  app.get('/help', (req, res) => {
    res.send({
      title: "help page",
      name: "andrew"
      })
  })

  app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
  })

  //the actual server is started here
  app.listen(3000, () => {
    console.log('Server is up on port 3000.');
  })
```

#### Lesson 13: Object Property Shorthand
>destructuring objects
**I can destructure in the fn arguments/parameters**

```
const product = {
  label: 'Red Notebook',
  price: 3,
  stock: 201
  salePrice: undefined
}

const transaction = (type, {label, rating}) => {
  //i can destructure in the fn arguments/parameters
  console.log(typ, label, rating)
}

transaction('order', product)


```

#### Lesson 12: The callback function



#### Lesson 11: Making and customizing http requests
>creating a weather app

[dark sky website](https://darksky.net/)
[add chrome extension json formatter](https://chrome.google.com/webstore/search/json%20formatter?hl=en)

#### Lesson 10 Call Stack, Callback Queue and Event Loop
> understanding the call stack


#### Lesson 9: listing notes
create a note list
refactor to arrow funtions

#### Lesson 9: removing a note
created removeNote fn
export/add to export the new fn
read file
filter out duplicates
write/update file

#### Lecture 8 : adding a note
created addNote fn in notes.js file
export multiple fn
fs.readFileSync && fs.writeFileSync
try/catch add to array
check for unique value

#### Lecture 7 : Storing Data with JSON
**see playground dir**

#### Lesson 6: parsing arguments with yargs
```
  require("./using_yargs.js");
```

using_yargs.js
```
  // challenge #5 adding user input using process.argv
  const chalk = require('chalk');
  const yargs = require('yargs');

  //customize yargs version
  // yargs.version('1.1.0');

  // create an add command
  yargs.command({
    command:'add',
    describe: 'Add a new note',
    builder:{
      title: {
        describe:'Note title',
        demandOption:true,
        type:'string'
      },
      body: {
        describe:'Note body',
        demandOption:true,
        type:'string'
      }
    },
    handler: function(argv){
      // console.log(chalk.green("Adding a new note!",argv))
      console.log(`Adding a new note!,title = ${argv.title}`);
        console.log(`body = ${argv.body}`);
    }
  });

  // create a remove command
  yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
      console.log(chalk.yellow("Removing the note!"));
    }
  })

  // create a list command
  yargs.command({
    command: 'list',
    describe: 'list your note',
    handler: function () {
      console.log(chalk.grey("Listing out all notes!"));
    }
  });

  // create a Read command
  yargs.command({
    command: 'read',
    describe: 'read a note',
    handler: function () {
      console.log(chalk.magenta("reading the note!"));
    }
  });

  const getNotes = require("./notes.js");

  console.log(chalk.blue(process.argv));
  // console.log(chalk.green(yargs.argv));
  // console.log(yargs.argv);// needed if not using yargs.parse()
  yargs.parse();

```


#### Lesson 5: adding user input using process.argv
```
  const chalk = require('chalk');

  const getNotes = require("./notes.js");

  const command =  process.argv[2]

  switch (command) {
    case "add":
    console.log(chalk.green.bold("adding note!"));
    break;
    case "remove":
    console.log(chalk.yellow.bold("removing note!"));
    break;
    default:

  }
```

#### [lesson 4: install nodemon](https://www.npmjs.com/package/nodemon)
```
  $ sudo npm i -g nodemon@1.18.5 -g
```

new command
```
  $ nodemon app.js
```
**-g = global flag, sudo had to run as admin**
>with nodemon and winscp keep directory up to date the process is completely automated
**ctrl - c stops nodemon process and returns to command prompt**

#### challenge #3 [install chalk](https://www.npmjs.com/package/chalk)   
```
  npm i chalk@2.4.1
```

app.js
```
  // challenge #3 install chalk
  const chalk = require('chalk');

  const getNotes = require("./notes.js");

  const notes = getNotes("some notes");

  console.log(chalk.green("success!"));

  console.log(chalk.blue.bold(notes));
  const chalk = require('chalk');

  const getNotes = require("./notes.js");

  const notes = getNotes("some notes");

  console.log(chalk.green("success!"));

  console.log(chalk.blue.bold(notes));
```

#### lesson 3: [install validator](https://www.npmjs.com/package/validator)   
```
  $ npm i validator
```
app.js
```
  // lesson 3 - loading npm modules
  const validator = require('validator');
  // import {validator} from 'validator';//ES6 syntax import doesn't work in node

  const getNotes = require("./notes.js");

  const notes = getNotes("some notes");

  console.log(notes);

  console.log(validator.isEmail('andrew@example.com'));//true
  console.log(validator.isEmail('example.com'));//false
  console.log(validator.isURL('https://example.com'));
```

#### challenge #2: importing a fn
```
  const getNotes = require("./notes.js");

  const notes = getNotes("some notes");

  console.log(notes);
```
#### lesson 2b: adding your own files
```
  const add = require('./utils.js');//fn
  const sum = add(4,-2);

  console.log(sum);
```

#### lesson 2a: adding your own files
```
  const name = require('./utils.js');
  const firstname = require('./utils.js');//fn


  console.log(firstname);
```

#### lesson 1: [were using .writeFileSync](https://nodejs.org/docs/latest-v8.x/api/fs.html#fs_fs_writefilesync_file_data_options)   
```
  const fs = require('fs');

  fs.writeFileSync('notes.txt','This file was created by Node.js!');
```

[Writing to Files in Node.js](https://stackabuse.com/writing-to-files-in-node-js/)   
**fs.writeFile vs fs.writeFileSync - fs.writeFile is better (non-blocking)**

#### Apache and node running on the same domain

[How to get Apache and Node working together on the same domain with Proxied Javascript AJAX requests](https://blog.cloudboost.io/get-apache-and-node-working-together-on-the-same-domain-with-javascript-ajax-requests-39db51959b79)   
> following article steps

add to example.com-le-ssl.conf
**letsencrypt ssl configuration**
```
  ProxyRequests on
  ProxyPass /recordings/ http://localhost:3001/recordings/
```

run in the ssh terminal
```
  $ sudo a2enmod proxy
  $ sudo a2enmod proxy_http
  $ sudo a2enmod proxy_balancer
  $ sudo a2enmod lbmethod_byrequests
```

Notes:
> so i tried to run the server directly, maybe i need to start it first?

[setup nodejs to work with nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)  

other reading
[Differences Between Forward Proxy and Reverse Proxy](https://www.linuxbabe.com/it-knowledge/differences-between-forward-proxy-and-reverse-proxy)    
[How to Set Up Apache Traffic Server as a Reverse-Proxy on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-traffic-server-as-a-reverse-proxy-on-ubuntu-14-04)   

[Nodejs and Apache in the same doplet](https://www.digitalocean.com/community/questions/nodejs-and-apache-in-the-same-doplet)   
[How to host a Node.js app on shared host](https://medium.com/@mayomi1/how-to-host-a-node-js-app-on-shared-host-52e12a62a259)   
[How To Set Up a Node.js Application for Production on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)   

```
  Joomla will be installed as your homepage with the following login credentials:

  Username: admin
  Password: 787f5b86a13d7cdb

  This password will not be emailed to you, please take note of it now or you will have to reset it in cPanel. If you wish to customize your installation please select None. You'll be able to use Softaculous in your control panel to install your application. Please note your application may not function correctly until your domain resolves to your new account.
```

[express app.post](https://codeforgeek.com/handle-get-post-request-express-4/)   
