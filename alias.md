
# alias notes

#### abds 

```
alias abds='ssh d3po@143.198.5.134'
alias abds-c='cd-abds; cd public/abds'
alias abds-s='cd-abds'
alias aland='cd-abds; nodemon src/server.js'
alias cd-abds='cd-node; cd abds'
```

#### alight

```
alias ali='cd-ali; nrd'
alias ali-xdocs='cd-ali; xdocs' // whats xdocs?
alias cd-ali='cd-node; cd landing-pages/public/alight/xfiles/'
alias cd-alight='cd-ali;'
alias cd-land='cd-node; cd landing-pages/'
alias land='cd-land; nodemon src/index.js'
```

#### alight storybook

```
alias astory='cd-ali; cd ../; storybook'
alias astory-s='cd-ali; cd ../; cd storybook-static; npx http-server -o index.html -p 3100'
```

#### Joomla alight

```
alias cd-arc='cd /c/xampp/apps/joomla/htdocs/components/com_arc/xfiles'
```

#### Joomla Picture Show

```
alias cd-ppro='cd /c/xampp/apps/joomla/htdocs/modules/mod_panelprofile/xfiles'
alias cd-psmod='cd /c/xampp/apps/joomla/htdocs/administrator/components/com_psmod/xfiles'
alias cd-psmod-itk='cd /c/xampp/apps/joomla/htdocs/administrator/components/com_psmod/xfiles/core/subs/d3po_ITK'
alias cd-psmod-tools='cd /c/xampp/apps/joomla/htdocs/administrator/components/com_psmod/xfiles/core/subs/tool_templates'
```

#### Joomla BTK

```
alias cd-btk='cd /c/xampp/apps/joomla/htdocs/d3po_BTK'
```

#### other Joomla alias

```
alias cd-core='cd /c/xampp/apps/joomla/htdocs/core'
alias cd-desk='cd /c/Users/d3pot/OneDrive/desktop'
alias cd-desktop='cd /c/Users/d3pot/OneDrive/desktop'
alias cd-htdocs='cd /c/xampp/apps/joomla/htdocs'
alias cd-htdocs-btk='cd /c/xampp/apps/joomla/htdocs/d3po_BTK'
alias cd-htdocs-itk='cd /c/xampp/apps/joomla/htdocs/d3po_ITK'
alias cd-htdocs-tools='cd /c/xampp/apps/joomla/htdocs/tool_templates'
alias cd-icons='cd /c/xampp/apps/joomla/htdocs/icon_collection'
alias cd-itk='cd /c/xampp/apps/joomla/htdocs/d3po_ITK'
alias cd-mpsmod='cd /c/xampp/apps/joomla/htdocs/modules/mod_psmod/xfiles' 
alias cd-mpsmod-itk='cd /c/xampp/apps/joomla/htdocs/modules/mod_psmod/xfiles/core/subs/d3po_ITK'
alias cd-mpsmod-tools='cd /c/xampp/apps/joomla/htdocs/modules/mod_psmod/xfiles/core/subs/tool_templates'
```

#### the JJ Center

```
alias cd-jjc='cd-node; cd the-jj-center/'
alias cland='cd-jjc; nodemon src/server.js'
alias jjc='ssh d3po@134.209.160.136'
```

#### Jobs Not Guns

```
alias cd-jland='cd-node; cd jng-landing/'
alias cd-jng='cd-jland; cd public/jng/'
alias jng='ssh d3po@164.90.133.100'
alias jland='cd-jland; nodemon src/server.js'
```

#### MongoDB

```
alias cd-mongo='cd /c/Users/d3pot/mongodb/bin/'
alias mongodb='cd /c/Program\ Files/MongoDB/Server/4.4/; bin/mongod.exe --dbpath=data'
alias mongodb2='cd ~; mongodb/bin/mongod.exe --dbpath=mongodb-data'
```

#### notes

```
alias cd-node='cd /c/Users/d3pot/version-control/nodejs'
alias cd-notes='cd /c/Users/d3pot/version-control/bash_scripting/notes'
```

#### Storybook

```
alias storybook='npm run storybook'
```

#### sunzao

```
alias sunstory='sunzaostory'
alias sunz='ssh d3po@167.99.57.20'
alias sunzaostory='cd-node; cd sunzao-storybook'
```

#### trigger

```
alias trigger='cd-node; cd trigger'
alias trigger-c='trigger; cd public/oauth_client/src/'
alias trigger-s='trigger; nodemon src/server.js -e .hbs,.js,.scss'
```

#### version-control

```
alias cd-react='cd-vc; cd react'
alias cd-svg='cd /c/Users/d3pot/version-control/bash_scripting/svg2base64'alias cd-tool='cd /c/xampp/apps/joomla/htdocs/tool_templates'
alias cd-uw='cd /c/Users/d3pot/version-control/bash_scripting/joomla_component_maker'
alias cd-vc='cd /c/Users/d3pot/version-control'
alias cd-ws='cd /c/Users/d3pot/version-control/workspace'
```

#### webpack

```
alias nrb='npm run build'
alias nrbs='npm run build-storybook'
alias nrd='npm run dev'
```

#### general alias

```
alias cd-html5='cd /c/Users/d3pot/version-control/html5-canvas'
alias cd-tools='cd-tool'
alias cl='clear
clear'
alias clr='clear; clear'
alias cls='clr;'
alias contact='cd-node; cd contact-form'
alias deploy='npm run deploy'
alias devtools='start winscp.exe; start atom; start chrome; np'
alias docs='npm run docs'
alias dvtls='devtools; postman; robo3t;'



alias ldocs='live-docs'
alias live-docs='npx live-server --open=alight-docs/docs/ --watch=alight-docs/docs/'
alias ll='ls -l'
alias ls='ls -F --color=auto --show-control-chars'



alias node='winpty node.exe'
alias np='start notepad++'
alias postman='update --processStart "Postman.exe"'
alias src='nodemon src/index.js'
alias teststory='cd-node; cd react-storybook-v6'
alias watch-docs='npx nodemon  -e js,css,hbs --exec '\''npm run docs'\'' --watch ./js/lib/dist --watch ../controllers --watch ../routers --watch ./alight-docs/docs.js --watch ./alight-docs/docs.css --watch ../views'
alias wdocs='watch-docs'
alias xdocs='ldocs & wdocs'
```
