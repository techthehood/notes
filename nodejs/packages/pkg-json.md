# package.json sample
<br/>    

```
  {
    "name": "@scopedPkgName/create-project",
    "version": "1.0.0",
    "description": "A CLI to bootstrap my projects",
    "main": "src/index.js",
    "bin": {
      "@scopedPkgName/create-project": "bin/create-project",
      "create-project": "bin/create-project"
    },
    "publishConfig": {
      "access": "public"
    },
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [
      "cli",
      "create-project"
    ],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "arg": "^5.0.0",
      "chalk": "^4.1.0",
      "esm": "^3.2.25",
      "execa": "^5.0.0",
      "inquirer": "^7.3.3",
      "listr": "^0.14.3",
      "ncp": "^2.0.0",
      "pkg-install": "^1.0.0"
    }
  }

```
