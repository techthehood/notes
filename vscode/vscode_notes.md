# vscode notes   

### Articles   
[Enable Emmet support for JSX in Visual Studio Code | React](https://medium.com/@eshwaren/enable-emmet-support-for-jsx-in-visual-studio-code-react-f1f5dfe8809c)   
> starred on medium
 - ctrl + comma
 - extensions > emmet
 - edit in settings.json

> add this snippet
```
    ...
    ,
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }
    ...
```

#### match brackets   

- ctrl + shift + \

#### [Vscode TODO-HIGHLIGHT Unofficial Document](https://titanwolf.org/Network/Articles/Article?AID=6dc8480d-ee21-44be-a836-c78a651f5528#gsc.tab=0)   

i excluded a lot of files to cut down on all the TODO tags i was searching and displaying

```
"todohighlight.exclude": [


        "**/node_modules/**",
        "**/bower_components/**",
        "**/dist/**",
        "**/build/**",
        "**/.vscode/**",
        "**/.github/**",
        "**/_output/**",
        "**/*.min.*",
        "**/*.map",
        "**/.next/**",
        "**/public/locals/**",
        "**/d3_jquery.*",
        "**/arc_site_serv*.*",
        "**/icon.css*",
        "**/d3po_BTK.*",
        "**/d3po_BTK/**",
        "**/arc_site.*",
        "**/quick-link/**",
        "**/aliassets.*",
    ],
```

#### to get to the setting.json file follow the template instructions

ctrl + , (settings) > extensions > todo highlight  then find "edit in settings.json"   

<br/>

#### Bookmark ctrls   

|command| shortcut|
| :--- | :--- |
| toggle bookmarks |  ctrl + alt + K |
| previous bookmark | ctrl + alt + J |
| next bookmark  | ctrl + alt + L |   

<br/>

#### **GOTCHA** tab is broken   

> tab moves focus mode (Ctrl + M)    

#### [top 10 extensions](https://youtu.be/_aWDQVxZP6A)   
- polacode - lets you take and share snapshots of your code   
- Quokka - javascript scratch pad 
> for Quokka to work you have to create a new file (you don't have to save it). Quokka evaluates the entire file and breaks on unfinished js.
- Live Server
- Live Share
- Git Lense
- Javascript ES7 React/Redux/GraphQL/React-Native snippets
- Cobalt2 theme