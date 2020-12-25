
#### adding your own js
- locate your templates layout.tmpl file
- copy its contents and paste them into your own filename.tmpl file
- replace the templates layoutFile by pointing to your own using templates > default > layoutFile in the config json file
jsdoc.json
```
  "templates": {
    "default": {
      "layoutFile" :"./docs/docs.tmpl",
```

- add a script tag in the .tmpl file that will link to your js file
docs.tmpl
```
  <script src="./docs.js"></script>
```


#### Home page - adding a README
```
    "source":{
      "include": [
        "js",
        "./docs/README.md",
```

#### Home page - linking to pages from the readme
```
  ### Roots
    - [How do i get to the root of the entire **Core**? (client-side root)]{@link module:App}
    - [where does the **VIEWER_DATA** first come in]{@link module:user-prefs}
    - [what is the trigger for the **'Details'** view]{@link external:react_simple_details}
```
**working examples**

#### controlling the menus with js
docs.js
```

```
