# creating submodules

## final process

### creating
1. cd into the future submodules parent repo

2. add the submodule (get the github clone url). be sure the specify the branchName if it isn't the master branch. add the targetfolder path/name if you want to use a different foldername than the repo
```
  git submodule add -b [branchName] [repo_url] [destination]
```

**thats it**


3. if your new submodule has submodules they have to be initialized so they arent empty
from the parent dir run
```
  git submodule init
  git submodule update
```


## research notes

[git submodule docs](https://git-scm.com/book/en/v2/Git-Tools-Submodules)   

[hint for already existing folders nested git repos](https://stackoverflow.com/questions/12514197/convert-a-git-folder-to-a-submodule-retrospectively)   
[hint adding submodules](https://chrisjean.com/git-submodules-adding-using-removing-and-updating/)   
>this hit actually starts with creating a git repo out of an already existing folder and then removing it and creating a submodule in its place
```
  git init
  git remote add origin repourl
  git add .
  git commit -am'first commit in submodule'
  git push -u origin master
  cd ..
  rm -rf folder which will be a submodule
  git commit -am'deleting folder'
  git submodule add repourl folder wich will be a submodule
  git commit -am'adding submodule'
```
>i found it useful because technically the first section was already done i just had to make sure the remote commit was current and delete or move the folder out of the parent directory.  Then i used the submodule add command to create a new directory and configure it to become the submodules

### create submodule directory

```
  git submodule add [copied-remote-url] [folder-name-to create-dynamically]
```
> this command only brought down the master branch not the branch i want which is the webpack branch
trying to use update and init here doesn't do anything different
### submodules track only one branch at a time and only track a specific commit
[it seems only one branch in a submodule can be tracked](https://community.atlassian.com/t5/Sourcetree-questions/Submodule-branch-is-lost/qaq-p/324134)   
>Yeah, the reason for this is that every commit point in your parent repo is actually tracking a specific commit on each submodule, it's not tracking a branch. This is important because if for example something breaking changes in the submodule branch, you don't want to get that when you check out your parent until you've altered your own code to match. So at any point in time every submodule record registered on your parent repo is pointing at a specific commit.

> i physically removed the folder to try again.
### get rid of deleted from status
```
  git add -u
```

[specifying a branch](https://subfictional.com/fun-with-git-submodules/)   
### attempting to specify a branch
```
  git submodule add -b [branchName] [repo_url] [destination]

```

**GOTCHA**
```
A git directory for '[destination]' is found locally with remote(s):
  origin       [repo_url]
If you want to reuse this local git directory instead of cloning again from
  [repo_url]
use the '--force' option. If the local git directory is not the correct repo
or you are unsure what this means choose another name with the '--name' option.
```

> then i tried to deinitialize ju
## [deinitialize submodules](https://subfictional.com/fun-with-git-submodules/)
```
  git submodule deinit --all
```
**i don't think i needed this**

>This command removes the submodule’s confg entries in .git/config and .gitmodules and it removes files from the submodule’s working directory. This command will delete untracked files, even when they are listed in .gitignore.

**no change in the error**

>then i try to remove the submodule configuration manually
```
  cd .git
  nano config
```  

> still no change in the error  

### reloading submodule
**GOTCHA - issue residue of old submodule remains**
[stack hint](https://stackoverflow.com/questions/20929336/git-submodule-add-a-git-directory-is-found-locally-issue)   
[the search hint user references this article](https://www.atlassian.com/blog/git/git-submodules-workflows-tips)   

### completely remove submodule
```
  git rm --cached path_to_submodule
  rm -rf path_to_submodule

  Delete the relevant lines from the .gitmodules file. e.g. delete these:
  [submodule "path_to_submodule"]
      path = path_to_submodule
cd
  Delete the relevant section from .git/config. e.g. delete these:

  [submodule "path_to_submodule"]
      url = https://github.com/path_to_submodule

  rm -rf .git/modules/path_to_submodule

  Then, you can finally:

  git submodule add https://github.com/path_to_submodule
```

##### simpler remove Submodules
```
  1. git rm --cached path_to_submodule
  2. rm -rf path_to_submodule
  3. Delete lines from the .gitmodules file
  4. Delete section from .git/config
  5. rm -rf .git/modules/path_to_submodule

  6. git submodule add [-b] [branchName] https://github.com/path_to_submodule [destination]

  7a-1. git submodule init
  7a-2. git submodule update

  7b . or all at once
  git submodule update --init --remote -f --recursive


```
**success!  rm -rf .git/modules/path_to_submodule was the key**
**and i now have the webpack branch**

### Cloning a Project with Submodules
>Here we’ll clone a project with a submodule in it. When you clone such a project, by default you get the directories that contain submodules, but none of the files within them yet:

```
$ git clone https://github.com/chaconinc/MainProject

```
The DbConnector directory is there, but empty. You must run two commands: git submodule init to initialize your local configuration file, and git submodule update to fetch all the data from that project and check out the appropriate commit listed in your superproject:

**can be done from the submodules parent dir (works in updating all available submodules)**
```
$ git submodule init
$ git submodule update
```

### my test
>i tested creating a repo containing a submodule
```
  git clone repo -b [branchname] [repo_url.git]
```
>when i did it created an empty submodule repo. to fix it i had cd into it then init and update it
```
cd target_dir_path [i don't have to cd into the submodule folder to init and update]
git submodule init
git submodule update
```

### updating submodules
[hint i used](http://www.vogella.com/tutorials/GitSubmodules/article.html)
```
  cd [submodule directory]
  git checkout [branchName (unneccessary)]
  git pull

  cd ..
  git add .
  git commit
```
>there is no magic pill for this. you have to do a regular get pull to update the submodule

[seems like a shortcut](https://stackoverflow.com/questions/52319589/submodule-update-fails-with-latest-update)   
[heres an explaination](https://dev.to/dwd/git-submodules-revisited-1p54)   
```
  git submodule update --init --remote -f --recursive
```
>--remote is the magic - that performs a git pull along the remote tracking branch. It's this that we want.

### i want to force an overwrite to include the new submodules
GOTCHA: git pull -f
error: The following untracked working tree files would be overwritten by merge:
[error hint](https://stackoverflow.com/questions/17404316/the-following-untracked-working-tree-files-would-be-overwritten-by-merge-but-i/35067275)   
[Git Tools - Stashing](https://git-scm.com/book/en/v1/Git-Tools-Stashing)
[git stash docs](https://git-scm.com/docs/git-stash)   
[good article on stashing](https://dev.to/srebalaji/useful-tricks-you-might-not-know-about-git-stash-117e)   
```
  git add *
  git stash
  git pull
```

to add back the thing that was in the way and clear the last stash
```
  git stash pop
```


**it worked but there were some warnings i don't understand (but can research later)**
```
git add *
git pullwarning: adding embedded git repository: subs/tool_templates
hint: You've added another git repository inside your current repository.
hint: Clones of the outer repository will not contain the contents of
hint: the embedded repository and will not know how to obtain it.
hint: If you meant to add a submodule, use:
hint:
hint:   git submodule add <url> subs/tool_templates
hint:
hint: If you added this path by mistake, you can remove it from the
hint: index with:
hint:
hint:   git rm --cached subs/tool_templates
hint:
hint: See "git help submodule" for more information.

```

### update nested submodules
```
git submodule update --recursive
```
>Note: The --recursive flag tells git to recurse into submodule directories and run update on any submodules those submodules include. It’s not needed for this example, but I’ve included it here anyway since it’s common for projects to have nested submodules.

### view all submodule branches
