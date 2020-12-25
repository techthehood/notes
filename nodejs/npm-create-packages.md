create your own npm package

login to npm
```
  npm add user
```

index.js - sample file tutorial
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

[Introduction to NPM Scripts](https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633/)   
- touches on bash and shell commands
- recommends ShellJS for cross platform execution of bash scripts
