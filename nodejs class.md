# Nodejs notes

GOTCHA: get rid of fs.appendFile() warning

```
d3pot class-notes $ node app.js
starting app.js!
(node:8952) [DEP0013] DeprecationWarning: Calling an asynchronous function witho
ut callback is deprecated.
```

GOTCHA: [skip global installs](https://codeburst.io/maybe-dont-globally-install-that-node-js-package-f1ea20f94a00#40ab)

npm install nodemon --save
//--save is important to add the file to the node_modules .bin
(i need to test this. i don't know that this is true)

```
//this works
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "nodemon":"./node_modules/.bin/nodemon"
  },
  
  //i tried it w/o the './' and it failed 
  node_modules/.bin/nodemon
  //'node_modules' is not recognized as an internal or external command,

 ```