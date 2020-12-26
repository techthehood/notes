# Storybook

### Publish

### Articles

[Document for stakeholders](https://www.learnstorybook.com/design-systems-for-developers/react/en/document/)   

[Publish Storybook - publish online](https://storybook.js.org/docs/react/workflows/publish-storybook#publish-storybook-online)   

[storybookjs/storybook-deployer](https://github.com/storybookjs/storybook-deployer)   

```
  npm i @storybook/storybook-deployer --save-dev
```

[github pages](https://pages.github.com/)   

[Deploy Storybook to GitHub Pages](https://dev.to/kouts/deploy-storybook-to-github-pages-3bij)   

> nope they ran me through a loop with adding github actions - i need a vanilla deployment and update
they almost seemed like the vanilla node way to do this.

_? what is netlify?_

[How to deploy Storybook to GitHub Pages](https://arminydy.medium.com/how-to-deploy-storybook-to-github-pages-4894097d49ab)   
*-deplay using gh-pages-*

> i think this is the one
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

[get the remote branches](https://stackoverflow.com/questions/9537392/git-fetch-remote-branch)   

to get a remote branch you have to create a local copy of the branch you want from the remote, then use it to track the remote branch

```
  git checkout --track origin/gh-pages
```

> this creates tracks and checks out the gh-pages remote branch

[get all the remote branches](https://stackoverflow.com/questions/10312521/how-to-fetch-all-git-branches)   

> still a variation of the manual method above - just using a shell script to automate the process (uses a loop)

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
  - ~~how does the template interact with the .html or readme file?~~

  _there is no .html file. and all the pages are forced to have a template_

> i can't find anything that tells me how to properly add a storybook build to gh-pages so i will use the gh-pages cli method and reverse engineer it to see if i can at least describe how to do it manually   

<br/>

<hr/>

### [gh-pages cli method](https://arminydy.medium.com/how-to-deploy-storybook-to-github-pages-4894097d49ab)   

#### install gh-pages

```
  npm install gh-pages --save-dev
```
