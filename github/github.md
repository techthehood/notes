# GITHUB

## creating a git repo
1. got to gitbut and choose create new repository
2. give it a name and don't do anything else (if you are turing a folder on your computer with content in it into a repo)
3. push the create btn
4. cd navigate to the folder you want to repo (on the command line tool)
5. copy the code in the next screen to your command line

```
echo "# notes" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/inspectaTech/notes.git
git push -u origin master

```

thats it.

### [deleting files](https://discoposse.com/2016/11/08/git-remove-multiple-deleted-files/)

##### the issue
```
d3pot (master *) notes $ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    New Text Document.txt
        deleted:    boilerplate css media queries.md
        deleted:    boilerplate_cdn_protection.md
        deleted:    boilerplate_google_icons.md
        deleted:    boilerplate_js_hold_fn.md
        deleted:    boilerplate_view_html_php.md
        deleted:    bookmark constructor.md
        deleted:    bp_BTK_tags.md
        deleted:    bp_angular_controller_sample.md

```

##### the cure
```
git ls-files --deleted -z | xargs -0 git rm
```

##### [basic branching](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
```
git checkout -b [new branch name]
```

##### [push branch to remote](https://stackoverflow.com/questions/2765421/how-do-i-push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too)
```
git push -u origin [branch-name]
```

##### [untrack all files - updates .gitignore](http://www.codeblocq.com/2016/01/Untrack-files-already-added-to-git-repository-based-on-gitignore/)
**step 1 commit changes**
```
git rm -r --cached .
```
**don't forget the ending period**

#### [untrack a single file](http://queirozf.com/entries/untrack-files-in-git)    
```
 git rm --cached [your_filename]
```

##### is this a new way to add all?
```
 git add .
 git add *
```

##### [make git show all the files that are being tracked](https://stackoverflow.com/questions/15606955/how-can-i-make-git-show-a-list-of-the-files-that-are-being-tracked)
```
git ls-tree -r master --name-only
```

##### [gitignore patterns](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)

##### [unstage files](https://stackoverflow.com/questions/19730565/how-to-remove-files-from-git-staging-area)
```
git reset
git reset HEAD -- .
```
>git reset HEAD -- . is different in that it only resets files in the current directory and below while git reset resets all the files in the project.

### [github dark themes](https://github.com/StylishThemes/GitHub-Dark)   
[stylus](https://add0n.com/stylus.html)   

[good article on stashing](https://dev.to/srebalaji/useful-tricks-you-might-not-know-about-git-stash-117e)   
[show changes of file in stash](https://stackoverflow.com/questions/7677736/git-diff-against-a-stash)   
**this failed**
```
git diff --name-only stash@{0} app.d3po_ITK.js
```

**[this only showed name](https://stackoverflow.com/questions/10725729/see-whats-in-a-stash-without-applying-it)**
```
git diff --name-only stash@{0} src/app.d3po_ITK.js
```
>returns:  src/app.d3po_ITK.js
>git stash show -p stash@{0} --name-only shows just the names of the files (not the contents) in your first stash. – bergie3000 Jun 10 '15 at 17:57

**this worked**
```
git diff stash@{0} src/app.d3po_ITK.js
```

##### GOTCHA: [Why does git status show branch is up-to-date when changes exist upstream?](https://stackoverflow.com/questions/27828404/why-does-git-status-show-branch-is-up-to-date-when-changes-exist-upstream)   
>What the status is telling you is that you're behind the ref called origin/master which is a local ref in your local repo.

>Until you do the fetch step (either on its own or via git pull) your local repo has no way to know that there are additional commits upstream, and git status only looks at your local origin/master ref.

##### [check if pull needed](https://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git)   
```
  git remote -v update
  git status -uno
```

##### [regular merge branch into master](https://stackoverflow.com/questions/5601931/what-is-the-best-and-safest-way-to-merge-a-git-branch-into-master)    
```
  git checkout master
  git pull origin master
  git merge test
  git push origin master
```

##### [git merge force branch to master](https://stackoverflow.com/questions/2862590/how-to-replace-master-branch-in-git-entirely-from-another-branch)   
```
git checkout [branchName]
git merge -s ours master
git checkout master
git merge [branchName]
```
>The result should be your master is now essentially seotweaks.
(-s ours is short for --strategy=ours)

>This resolves any number of heads, but the resulting tree of the merge is always that of the current branch head, effectively ignoring all changes from all other branches. It is meant to be used to supersede old development history of side branches. Note that this is different from the -Xours option to the recursive merge strategy.

#### i want to see diff in modified files
```

```

#### [Undo a git add - remove files staged for a git commit](http://data.agaric.com/undo-git-add-remove-files-staged-git-commit)   

unstage a single file
```
  git reset [filename.txt]
```

unstage them all
```
  git reset
```

[decent git diff article](https://www.atlassian.com/git/tutorials/saving-changes/git-diff)      
#### git diff modified files
```
  git diff path/to/files.ext

  same as

  git diff HEAD ./path/to/file.ext
```
**i wonder if this still works the same if this file is staged? A: nope it appears to do nothing**

#### compare staged Changes (staged diff)
```
  git diff --cached ./path/to/file
```
**if no staged files it appears to do nothing**

#### a good way for me to write an accurate commit message
>a good way for me to write an accurate commit message is to use git diff filename to see modifications in the modified files, make note of the changes and use them in the commit message
