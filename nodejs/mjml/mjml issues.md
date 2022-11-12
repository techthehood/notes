# Mjml notes

Wow. Mjml is a beast and its docs are trash.  So apparently mjml doesn't work on the client side. mjml-react is somehow for the server side? when you try to load mjml-react on the client side there is an 'fs' issue which is generated from mjml itself, since mjml is supposed to be for the server.  If you try to load mjml-react on the server the server takes issue with using import statements which is how you load react components. and even if you use esm pkg to get around the import issue, it still somehow has a problem with the '<' bracket used in render(<mjml>... its a disaster. i spent 3 or 4 full days on this. The solution is from 2 pkgs created 3months ago and another created 1 month ago.  mjml-browser which still fails if you try to use mjml-react with it (which depends on 'mjml' which fails on the client side) and @luma-team/mjml-react which lets you skip using 'mjml' and mjml-react altogether so you don't have the 'mjml' dependency bomb.

webpack mjml warning 

```
  Critical dependency: the request of a dependency is an expression
 @ C:/Users/d3pot/version-control/nodejs/jng-landing/node_modules/mjml-core/lib/index.js  @ C:/Users/d3pot/version-control/nodejs/jng-landing/node_modules/mjml/lib/index.js
 @ C:/Users/d3pot/version-control/nodejs/jng-landing/node_modules/mjml-react/dist/es/src/index.js
 @ ./js/components/Register/lib/mail_template.js
 @ ./js/components/Register/lib/RForm.js
 @ ./js/components/Register/Register.js
 @ ./js/App.js
 @ ./js/index.js
```
> if you only get this warning it still doens't allow you to see the page 

```
  fs.readFileSync is not a function
    at eval (node.js?cfcf:20)
```