# tar GZip notes

[Tar Vs Zip Vs Gz : Difference And Efficiency](https://itsfoss.com/tar-vs-zip-vs-gz/)   
[What is the difference between tar and zip?](https://stackoverflow.com/questions/10540935/what-is-the-difference-between-tar-and-zip)   
[On Linux/Unix, does .tar.gz versus .zip matter?](https://superuser.com/questions/146754/on-linux-unix-does-tar-gz-versus-zip-matter)   

[How to Compress and Extract Files Using the tar Command on Linux](https://www.howtogeek.com/248780/how-to-compress-and-extract-files-using-the-tar-command-on-linux/)   
>great article


Can i tell it where to save the .tar.gz archive if i add a target directory b4 its name?
```
  $ tar -czvf /temp/pristine_test_archive_1.0.0.tar.gz /var/www/example.com/tar_test/
```
**yep i can tell it where to go**

Archive and compress the new joomla installation
```
  $ tar -czvf pristine_Joomla_archive_3.9.1.tar.gz /var/www/example.com/html/
```

Archive and compress the live site
```
  tar -czvf example_live.tar.gz html/
```
**this stored it in whatever folder i was in, which in this case was the actual live site**

unzip the installation into the target folder
```
  sudo tar zxvf example_live.tar.gz  -C html/beta/
```
> i expect this to include the var/www/example../html/ folders which i don't want it to do

remove folders and subfolders
```
  $ sudo rm -r [mydir]
```
[tar gz files only (no directory)](https://stackoverflow.com/questions/939982/how-do-i-tar-a-directory-of-files-and-folders-without-including-the-directory-it)   
>i like the off brand answer - lets try it
```
  tar -czvf my_directory.tar.gz -C my_directory .
```

>so here is my attempt
```
  sudo tar -czvf example_live.tar.gz -C html .
```
**so far so good**

## Simple Answer
zip - copy of live site
```
  sudo tar -czvf example_live.tar.gz -C html .
```
unzip - paste into test site
```
  sudo tar zxvf example_live.tar.gz  -C html/beta/
```
