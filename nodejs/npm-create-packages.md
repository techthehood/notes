# create your own npm package

## articles
[how to build a cli with node.js (NOTE: USE THIS ONE)](https://youtu.be/s2h28p4s-Xs)   
[accompanying article](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js)    
> @ 3min the author uses npm link to create a symlink to the pkg so he can test it out by running create-project 
> package.json keyword was given "cli" and "create-project" @ 2:55   

[Build A Command Line Interface With Node.js & MongoDB (traversy)](https://youtu.be/v2GKt39-LPA)   
> builds a customer info database   


[How to Build and Publish NPM packages with Webpack (NOTE: starred on medium)](https://itnext.io/how-to-build-and-publish-npm-packages-with-webpack-dea19bb14627)   

[Creating and publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)   

[npm Unpublish Policy](https://docs.npmjs.com/policies/unpublish)   
> For newly created packages, as long as no other packages in the npm Public Registry depend on your package, you can unpublish anytime within the first 72 hours after publishing.


#### **creation process**

login to npm   

```
  npm add user
```

_index.js_ - sample file tutorial

```
  function shadowizard(options){
    let images - document.querySelectorAll('.shadowizard');

    id(options.shadow_type === "hard"){
      options.shadow_type = '0px'
    }else{
      options.shadow_type = '15px'
    }

    images.forEach((image)=>{
      image.style.boxShadow = `10px 10px ${options.shadow_type} 1px rgba(0,0,0,0.12)`;

      if(options.padding){
        image.style.padding = '1em';
      }
    });

  }

  module.exports.shadowizard = shadowizard;
```

create a github repo

before you can publish to npm you have to have a package.json file

then run
```
  npm publish
```
>  NOTE: also run publish when updating a modified pkg after advancing the version number
> GOTCHA: pkg update will fail if you use an already used version nbr

[Introduction to NPM Scripts](https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633/)   
- touches on bash and shell commands
- recommends ShellJS for cross platform execution of bash scripts

#### how do you run a local (development) version of the new pkg?   

> the answer in the main video is to use npm link to create a symlink to the pkg

[how to use npm link](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557)   

[npm linking and unlinking](https://dev.to/erinbush/npm-linking-and-unlinking-2h1g)   

[The magic behind npm link](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af#:~:text=You%20can%20%C3%A2%C2%80%C2%9Cundo%C3%A2%C2%80%C2%9D%20the%20effects,to%20remove%20the%20global%20symlink.)    
> you can see the symlink that was created by running:   

```
  npm -al $(npm root -g)
```


> you can find the path to the global node_modules directory by running

```
  npm root -g
```

> to unlink  in your current project run:

```
 npm unlink --no-save modulename
```

> to unlink the module from the global symlink run:

```
  cd path-to-module
  npm unlink
```