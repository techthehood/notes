# Storybook

### Publish

<hr/>

### Articles

> NOTE: you don't have to cut github pages on before deploying (or after - it seems to auto initiate)

[Document for stakeholders](https://www.learnstorybook.com/design-systems-for-developers/react/en/document/)   

[Publish Storybook - publish online](https://storybook.js.org/docs/react/workflows/publish-storybook#publish-storybook-online)   

[storybookjs/storybook-deployer](https://github.com/storybookjs/storybook-deployer)   

[github pages](https://pages.github.com/)   

[Deploy Storybook to GitHub Pages](https://dev.to/kouts/deploy-storybook-to-github-pages-3bij)   

[CLI options](https://storybook.js.org/docs/react/api/cli-options)   

> nope they ran me through a loop with adding github actions - i need a vanilla deployment and update
they almost seemed like the vanilla node way to do this.

_? what is netlify?_

[How to deploy Storybook to GitHub Pages](https://arminydy.medium.com/how-to-deploy-storybook-to-github-pages-4894097d49ab)   

*-deploy using gh-pages-*

> i think **this is the one**   
> still a bit of magic, seemingly less magic, but magic all the same.   
> i may eventually use this once i can ( do it the long way / understand it the long way )
> it looks like this one doens't need its own repo. i can have a storybook separate from a repo and push to a "pages" branch

[gh-pages cli package | npmjs.com](https://www.npmjs.com/package/gh-pages)   

## Github pages

#### github pages test 1

Here i want an introduction to pages. w/o a template

i want to:

- make a new repo   
- turn on github pages   
- explore the default repository   
  - did it create a separate branch for gh pages?   
    _yes it auto created **"gh-pages"** branch_   
  - is it running off a readme or did it create a separate index.html?   
    _its running off a readme **"index.md"**_   
  - ~~what happens if i change the index.html file directly?~~   
  _there is no .html file._    

#### examining the new gh-pages branch   

In the traditional way of using a repo and its branches i wanted to check the gh-pages branch in my new local repository.  but because the new branch is created after you clone the repo locally and then because github pages not only creates the new repo automatically but also forces you to do a 1st commit also remotely there were some challenges getting the local repo to match the new remote gh-pages branch.

[get the remote branches](https://stackoverflow.com/questions/9537392/git-fetch-remote-branch)   

to get a remote branch you have to create a local copy of the branch you want from the remote, then use it to track the remote branch

> do use this method   

```
  git checkout --track origin/gh-pages
```


> this creates tracks and checks out the gh-pages remote branch

[get all the remote branches](https://stackoverflow.com/questions/10312521/how-to-fetch-all-git-branches)   

> still a variation of the manual method above - just using a shell script to automate the process (uses a loop)   
> **note:** this method is not as straight forward as the create/checkout/track/fetch all at once method above

[get all the new remote files](https://stackoverflow.com/questions/37433814/git-fetch-not-working-for-fetch-new-files)   

**GOTCHA: fatal: refusing to merge unrelated histories**   

[Git refusing to merge unrelated histories on rebase](https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories-on-rebase)   

i ran this from the gh-pages branch   

```
  // not needed:

   git pull origin gh-pages --allow-unrelated-histories
```

> i won't need this step if i manually create and track the remote branch in the step above

#### github pages test 2

another intro with a template   

- make a new repo   
- turn on pages   
  - ~~how does the theme template interact with the .html or readme file?~~   

  _there is no default .html file, and all the pages are forced to have a theme template_   
  _**also note:** the theme has no effect on your storybook upload_   

> i can't find anything that tells me how to properly add a storybook build to gh-pages so i will use the gh-pages cli method and reverse engineer it to see if i can at least describe how to do it manually   

<br/>

<hr/>

### [gh-pages cli method](https://arminydy.medium.com/how-to-deploy-storybook-to-github-pages-4894097d49ab)   

#### install gh-pages   

```
  npm install gh-pages --save-dev

  or

  npm i gh-pages -D
```

#### open the package.json file and add the following code at the beginning of the file    

```
  "homepage": "http://YOUR_GITHUB_USERNAME.github.io/REPO_NAME"
```

idk what would happen if you didn't add this homepage property to package.json   

next add the following code to you package.json scripts tag   

```
  "scripts": {
    "predeploy": "npm run build-storybook",
    "deploy-storybook": "gh-pages -d storybook-static",
    "build-storybook": "build-storybook"
  },
```

_build-storybook should actually already be there_

in the interest of safety i ran the deploy-storybook and predeploy scripts indepedently of each other, ideally they should be a single script that waits for the first command to finish before running the 2nd command

> afterward it took github a little time before it registered the changes but sure enough, gh-pages now shows my storybook

#### storybook build test   

- what directory does sb build to by default running:

```
  npm run build-storybook
```

without any flags

_storybook publishes to **"storybook-static"** by default_   

#### build to an alternative location   

use the -o flag followed by the new binder path

```
    "scripts": {
      "predeploy": "npm run build-storybook",
      "deploy-storybook": "gh-pages -d storybook-static",
      "build-storybook": "build-storybook -o dist"
    },
```

_i just used **-o dist** (not ./dist or /dist)_

#### Some other questions?   

- how can i make the 2 scripts one by running npm run deploy?   
  _use the npm **pre[scriptName]** script hook_   
  [Using npm pre- and post- hooks](https://medium.com/yld-blog/using-npm-pre-and-post-hooks-d89dcf2d86cf)   

- if i publish from some other location (not the local repo connected to the remote) how will gh-pages know the remotes location?   

  _**GOTCHA**: Failed to get remote.origin.url (task must either be run in a git repository with a configured origin remote or must be configured with the "repo" option)._   

  > add the **--repo** flag with the repository's url

#### using the pre hook and --repo flag from an alternate location:   

_package.json_

```
  "predeploy": "npm run build-storybook",
  "deploy": "gh-pages -d storybook-static --repo https://github.com/YOUR_GITHUB_USERNAME/REPO_NAME",
```

#### [publish in docs mode](https://storybook.js.org/docs/react/writing-docs/build-documentation#publish-storybooks-documentation)   

```
  {
  "scripts": {
    "build-storybook-docs": "build-storybook --docs",
  }
}
```

> the $ isn't part of the code - its used to indicate that the following code should be run at the command line prompt

#### create a cli alias   

- navigate to your users root dir   

```
  $ cd ~
```

- edit your .bash_profile file   

```
  $ nano .bash_profile
```

- add your alias for your new storybook deploy script   

```
  $ alias deploy="npm run deploy"
```

- restart your .bash_Profile file   

```
  $ source .bash_profile

  // or

  $ . .bash_profile
```

#### after all these things everytime i want to deploy to gh-pages   

- just enter the dir and type my alias "deploy"   

```
  $ cd path/to/your/storybook/directory
  $ deploy
```

#### my latest sample

> i only needed a separate repo to publish my docs because the original repo is private.
> so i needed a repo that was for gh-pages only

in my stories folder i did:

```
  npm init -y  
  npm i gh-pages -D
```

> then added this script to package.json

```
  "scripts": {
    "deploy": "gh-pages -d ../storybook-static"
  },
```

> i made sure the static folder which was deployed to github was using the correct path from the .json file