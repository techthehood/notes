# create-project

## [How to build a CLI with node.js (tutorial)](https://www.youtube.com/watch?v=s2h28p4s-Xs&feature=youtu.be)   

*__Awesome Tutorial__*

- a small adjustment on **import.meta.url**

## usage   

- create and navigate into the target directory

```
  mkdir my-dir-name && cd my-dir-name
```

- run the project creator

```
  npx @techthehood/create-project
```
follow the prompts if any or add flags

```
  --yes or -y [to skip prompts]
  --git or -g [initilizes git in your project]
  --install or -i [auto install node packages]

  if you know the available templates you can also add a string with the templates name - otherwise it will prompt and ask you which template you want to use
```

```
  npx @techthehood/create-project --yes

  or

  npx @techthehood/create-project -g -i basic
```


thats it.
<br/>
<hr/>
<br/>
## other notes   

#### package.json hightlights   

```
  {  
    ...

    "bin": {
      "@scopedPkgName/create-project": "bin/create-project",
      "create-project": "bin/create-project"
    },
    "publishConfig": {
      "access": "public"
    },
    "keywords": [
      "cli",
      "create-project"
    ],
    "repository":{
      "type": "git",
      "url":"https://github.com/scopedPkgName/create-project.git"
    },
    "bugs":{
      "url":"https://github.com/scopedPkgName/create-project/issues"
    },
    "homepage":"https://github.com/scopedPkgName/create-project",
    ...
  }
```

#### What is esm?   
- esm allows us to us es modules without needing to transpile to different node js
versions that may not have that support

[esm on npm](https://www.npmjs.com/package/esm)   

> The brilliantly simple, babel-less, bundle-less ECMAScript module loader.

```
  npm i esm
```   
<br/>
### using comments in create-project script   

**GOTCHA:** this also is running node so it takes regular node comments

```
  npm i arg inquirer
```

```
  // using template: args instead of template: args._[0]
  $ create-project cli --git

  // returns
  {
    skipPrompts: false,
    git: true,
    template: { _: [ 'cli' ], '--git': true },
    runInstall: false
  }

```
> according to what printed on the console log, the value looks like all the other arguments that aren't the specifically named ones in the arg() setup were added to an array object named "\_" i.e. _:[...theRest]

#### what is ncp?   

[ncp - Asynchronous recursive file & directory copying](https://www.npmjs.com/package/ncp)      

> install ncp to copy some template files over

```
  npm i ncp chalk
```

#### [using %s](https://stackoverflow.com/questions/6999572/what-does-s-mean-inside-a-string-literal#:~:text=%25s%20is%20a%20C%20format%20specifier%20for%20a%20string.&text=the%20%25s%20is%20a%20'format,contents%20of%20the%20command%20variable.)      

```
  console.log("%s Project ready", chalk.green.bold('DONE'));
  console.log('%s Project ready', chalk.green.bold('DONE'));
```
both do the same thing. it somehow puts the txt at the end.   

>%s is a C format specifier for a string. ... the %s is a 'format character', indicating "insert a string here". The extra parameters after the string in your two function calls are the values to fill into the format character placeholders: In the first example, %s will be replaced with the contents of the command variable.

#### **GOTCHA**: getting the path right

```
  const currentFileUrl  = import.meta.url;// idk what this is
  // returns - C:\C:\Users\...\templateName

  console.log('[currentFileUrl]',currentFileUrl);
  console.log('[newPathName]',new URL(currentFileUrl));
  console.log('[dirname]',__dirname);
  console.log('[path dirname]',path.dirname(fileURLToPath(currentFileUrl)));

  const templateDir = path.resolve(
    // new URL(currentFileUrl).pathname,
    // __dirname,
    path.dirname(fileURLToPath(currentFileUrl)),
    '../templates',
    options.template.toLowerCase()
  );

  console.log("[templateDir]",templateDir);

  options.templateDirectory = templateDir;

```
> notice under currentFileUrl the C:\C:\ at the beginning. i had to use __dirname to fix it. not i need to research why the author used something else in the first place.

#### a working compromise

>this also works and may fix possible limitations with linux on the server where **\__dirname** may not work - i need to test on the server. if **\__dirname** works on the server then nothing else is needed.

```
  import { fileURLToPath } from 'url';

  console.log('[path dirname]',path.dirname(fileURLToPath(currentFileUrl)));
```

Note: if you run it again after the files are created it looks like it does it again but it does nothing.

#### finishing up initializing git and installing the pkgs   

```
  npm i execa pkg-install listr
```

#### initialize git install pkgs and run tasks   

import the pkgs   

_main.js_

```
  import execa from 'execa';
  import Listr from 'listr';
  import {projectInstall} from 'pkg-install';
```

init git - uses **execa**

```
  async function initGit(options) {
    try {

      const result = await execa("git",["init"], {
        cwd: options.targetDirectory
      });

      if(result.failed) {
        return Promise.reject(new Error("Failed to initialize Git"));
      }// if

      return;
    } catch (e) {
      console.log(`%s[initGit] an error occured`,chalk.red.bold("Error"));
    }
  }// initGit
```
Listr is responsible for running tasks one of which installs the npm pkgs

```
  projectInstall({
    cwd: options.targetDirectory
  })
```

```
  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Initialize git",
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: "Install dependencies",
      task: () => projectInstall({
        cwd: options.targetDirectory
      }),
      skip: () => !options.runInstall ? "Pass --install to automatically install dependencies" : undefined
    }
  ]);

  await tasks.run();
```
> notice "enabled" and "skip" both are conditions that will stop the execution of the associated task

#### all pkgs
```
  npm i esm arg inquirer ncp chalk execa pkg-install listr
```
