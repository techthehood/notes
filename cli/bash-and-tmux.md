# Bash with Tmux

[How to run Tmux in GIT Bash on Windows (article)](https://blog.pjsen.eu/?p=440)   

[Bash & Tmux the video](https://www.youtube.com/watch?v=9WpU6vuus2g)   
> just a lead just in case

[install msys2 package](https://www.msys2.org/)   

**google search:** "how do i use SHA256 checksum:"
my result: [Apache OpenOffice - How to verify the integrity of the downloaded file?](https://www.openoffice.org/download/checksums.html#:~:text=OnlineMD5-,The%20service%20is%20easy%20to%20use.,Compare%5D%20to%20start%20the%20verification.)   
linked to the page i used:
[Generate and verify the MD5/SHA1 checksum of a file without uploading it.](http://onlinemd5.com/)   

[Download MSYS2](https://www.msys2.org/)   
#### validate it for authenticity
- [open checker](http://onlinemd5.com/)
- drag downloaded file into window
- choose Checksum type:MD5 SHA1 **SHA-256**
- add SHA256 checksum into input and select "compare" btn

Do the recommended updates
```
  pacman -Syu

  // then close the msys2 terminal and reopen it and run

  pacman -Su
```


**then continue:**
- Install before-mentioned msys2 package and run bash shell
- Install tmux using the following command: pacman -S tmux
- Go to msys2 directory, in my case it is C:\msys64\usr\bin
- Copy tmux.exe and msys-event-2-1-4.dll to your Git for Windows directory, mine is C:\Program Files\Git\usr\bin.
  Please note, that in future, you can  see this file with the version number higher than 2-1-4

**failed experiment**
