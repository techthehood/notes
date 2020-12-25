# bash's job control notes

#### [bash's job control](https://www.digitalocean.com/community/tutorials/how-to-use-bash-s-job-control-to-manage-foreground-and-background-processes)   

using the '&' after a command runs the command in the background
```
 $ alias xdocs='ldocs & wdocs &'
```
**creating an alias to run these 2 commands in the background**
> i don't think they both go into the bg, only the first one

#### to see a list of jobs running in the background
```
  $ jobs
```
