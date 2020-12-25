# jsdoc json sample

```
  {
    "source":{
      "include": [
        "js",
        "./docs/docs.js"
        "./docs/README.md",
        "../controllers",
        "../routers",
        "../../core/guest",
        "../../templates",
        "../../presets",
        "../../oauth_client/src/js",
        "../../oauth_client/routers",
        "../../../src/index.js",
        "../../../src/oauth_server/passport.js",
        "../../../src/oauth_server/routers",
        "../../../src/oauth_server/controllers"
      ],
      "includePatern":".js$",
      "excludePattern":"(node_modules/|.git|/node_modules)"
    },
    "plugins":[
      "plugins/markdown",
      "node_modules/better-docs/category"
    ],
    "markdown":{
      "tags":["note"]
    },
    "opts":{
      "recurse": true,
      "destination": "./docs/dist",
      "template": "node_modules/better-docs"
    },
    "tags": {
      "allowUnknownTags": ["category","subcategory","note"]
    },
    "templates": {
          "cleverLinks": true,
          "monospaceLinks": true,
          "search": true,
          "default": {
              "staticFiles": {
                "include": [
                    //"./docs-src/statics",
                    "./images/flame@xs.png",
                    "./docs/docs.css",
                    "./docs/docs.js"
                ]
              },
              "layoutFile" :"./docs/docs.tmpl",
              "outputSourceFiles" :false
          },
          "better-docs": {
              "name": "Alight Docs",
              "logo": "flame@xs.png",
              "title": "alight docs", // HTML title
              "css": "docs.css",
              "js":"docs.js",
              //"trackingCode": "tracking-code-which-will-go-to-the-HEAD",
          "hideGenerator": true,
              "navLinks": [
                  {
                      "label": "Github",
                      "href": "https://github.com/inspectaTech/alight"
                  },
                  {
                      "label": "Example Application",
                      "href": "https://sunzao.us/core"
                  }
              ]
          }
      }
  }


```

#### read other file formats?


#### i was excluding the docs
```
  "excludePattern":"(node_modules/|docs|.git|/node_modules)"
```
**now there is no need since docs has been moved outside of the js dist folder**
