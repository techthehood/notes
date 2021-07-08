# git tag notes

### tag workflow
```
  git tag -a v1.4.0 -m "some tag text"
  git push origin v1.4.0
```

[2.6 Git Basics - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)   
> this is the article i use to write my tags

[Introduction to Semantic Versioning](https://www.geeksforgeeks.org/introduction-semantic-versioning/)   
[Semantic Versioning: Why You Should Be Using it](https://www.sitepoint.com/semantic-versioning-why-you-should-using/)   
**It Starts at 0.1.0 not 0.0.1**


#### creating an annotated tag
```
  git tag -a v1.4 -m "my version 1.4"
```

#### Listing your tags
```
  git tag
```

#### lightweight tags
>To create a lightweight tag, don’t supply any of the -a, -s, or -m options, just provide a tag name:



#### tagging a particular commit
```
  git tag -a v1.2 9fceb02
```
>To tag that commit, you specify the commit checksum (or part of it) at the end of the command


#### Sharing  - (release versioning)
```
  git push origin <tagname>

  example

  git push origin v1.5
```

#### Sharing multiple tags
```
  git push origin --tags
```
> If you have a lot of tags that you want to push up at once, you can also use the --tags option to the git push command. This will transfer all of your tags to the remote server that are not already there.

#### deleting tags
```
  git push origin --delete <tagname>
```

#### delete local tags
```
  git tag -d v1.4-lw
```
**works if you haven't pushed the tag to remote, otherwise you will need to do the one above**

#### tag worksheets   

```
  git tag -a v1.12.0 -m "major changes - pins and site features sections"
  git push origin v1.12.0
```


tag archive

```
  git tag -a v1.13.0 -m "Events, Clip zoom, title match nav"
  git push origin v1.13.0

  // use to delete the tag misnaming
  git tag -d v1.14.0
```