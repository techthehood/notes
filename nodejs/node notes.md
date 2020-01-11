

## local over global
i can avoid installing dependencies globally by using the regular install with --save seems optional
ex:
```
  npm install nodemon
```

then go the the package.json file and ad a new script property or add to the script property

"alias":"./node_modules/.bin/package_alias"

```
  "scripts" : {
  "nodemon":"./node_modules/.bin/nodemon"
  }
```

[nodemon to track changes to extensions](https://github.com/remy/nodemon)
use -e or --ext to track extensions
```
  nodemon app.js -e hbs,...
```
