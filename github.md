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



