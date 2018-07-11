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