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
