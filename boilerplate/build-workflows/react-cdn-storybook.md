# react cdn storybook

see version-control/react/react_cdn_sb/README.md

## THE VERDICT:

- **STORYBOOK CANNOT RUN ON CDN ALONE!** (or with using local files) - needs react in the package.json

**GOTCHA:** ERR! Error: Cannot find module 'react/package.json'

> i probably can configure sb's webpack to use external vendor files from cdn (for another day)

- initial size: 2.97KB   
- size with npm init: 3.26KB   
- size with sb: 136MB (all of the bulk is added to node_modules folder)   

#### start server with:   

```
  npx http-server -o index.html
```

#### for it to work you have to add this   

```
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script>
    Babel.registerPreset("my-preset", {
      presets: [
        [Babel.availablePresets["es2017"], { modules: false }],
        [Babel.availablePresets["react"]]

      ],
      plugins: [
        [Babel.availablePlugins["transform-modules-umd"]]
      ]        
    });
  </script>
  <script type="text/babel" src="./app.js" data-presets="my-preset"></script>
  <script type="text/babel" src="./index.js" data-presets="my-preset"></script>
```
