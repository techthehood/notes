#GITHUB

##creating a git repo
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

# [deleting files](https://discoposse.com/2016/11/08/git-remove-multiple-deleted-files/)

## //the issue
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

## //the cure
```
git ls-files --deleted -z | xargs -0 git rm
```

### [basic branching](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
```
git checkout -b [new branch name]
```

### [push branch to remote](https://stackoverflow.com/questions/2765421/how-do-i-push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too)
```
git push -u origin [branch-name]
```

### [untrack all files - updates .gitignore](http://www.codeblocq.com/2016/01/Untrack-files-already-added-to-git-repository-based-on-gitignore/)
**step 1 commit changes**
```
git rm -r --cached .
```
**don't forget the ending period**

### is this a new way to add all?
```
 git add .
 git add *
```

### [make git show all the files that are being tracked](https://stackoverflow.com/questions/15606955/how-can-i-make-git-show-a-list-of-the-files-that-are-being-tracked)
```
git ls-tree -r master --name-only
```

### [gitignore patterns](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)

### [unstage files](https://stackoverflow.com/questions/19730565/how-to-remove-files-from-git-staging-area)
```
git reset
git reset HEAD -- .
```
>git reset HEAD -- . is different in that it only resets files in the current directory and below while git reset resets all the files in the project.

## [github dark themes](https://github.com/StylishThemes/GitHub-Dark)
[stylus](https://add0n.com/stylus.html)
