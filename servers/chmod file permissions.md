# chmod file permissions

- [x] i want to learn how to see what groups are available
- [x] what are the current users groups
- [x] what are a given users groups
- [ ] how to create new groups

### [Modify File Permissions with chmod](https://www.linode.com/docs/tools-reference/tools/modify-file-permissions-with-chmod/)   
>great starting guide
**Number system - guide teaches octal notation 755 also (-rwxr-xr-x) or (111 101 101) in base-8 binary**

[what is a symbolic link?](https://www.computerhope.com/jargon/s/symblink.htm)   
>If you are a new computer user, you can think of a symbolic link as a shortcut to a file or directory (folder). Unlike a traditional shortcut in Windows, symbolic links may be used in the command line, or in a script or another program.

[Linux Users and Groups](https://www.linode.com/docs/tools-reference/linux-users-and-groups/)   
>has a section Working with Groups

see available groups
```
  $ nano /etc/group
```

[whats the difference between useradd and adduser?](https://askubuntu.com/questions/345974/what-is-the-difference-between-adduser-and-useradd)   

To create a new standard user, use the useradd command. The syntax is as follows:
```
$ useradd <name>
```

>There is another way of creating user accounts that might be easier for first-time administrators. but you have to first install it (actually was ready on digitalOcean droplet)
```
  $ apt-get install adduser
```

Then
```
  $ adduser <name>
```

To remove a user account, enter the following command:
```
  $ userdel <name>
```

To remove the user, their home folder, and their files, use this command:
```
  $ userdel -r <name>
```

change modify directory permissions
```
$ sudo chown -R www-data:www-data /var/www/html/
```

[Linux: Add User to Group (Primary/Secondary/New/Existing)](https://www.hostingadvice.com/how-to/linux-add-user-to-group/)   
>good hint

#### change my primary group / and back
**i want to stop making everything in the root group and have to change it to www-data**
```
  $ sudo usermod -g www-data <user>
  $ sudo usermod -g <user> <user>
```

[Users and Groups Administration in Linux (2006)](http://www.debianadmin.com/users-and-groups-administration-in-linux.html)   
>oldie but goodie - deals with creating and deleting groups

#### add myself to www-data group
If you just want to add a user to a group use the following command:
```
  $ sudo adduser username grouptoadd
```
**from Linux: Add User to Group...**

####  Get User ID and Groups Information: id and groups
To show all the user information and group memberships, we can use the id command:

```
$ id foobar
```
>// uid=1001(foobar) gid=1001(foobar) groups=1001(foobar)

We could also get all the users’ groups with the groups command:
```
  $ groups foobar
```
>// foobar : foobar


#### [adduser vs gpasswd](https://unix.stackexchange.com/questions/198536/difference-between-adding-sudo-user-with-adduser-or-gpasswd)   
**adduser wins**

[remove user from group](https://unix.stackexchange.com/questions/29570/how-do-i-remove-a-user-from-a-group)
You can use gpasswd:
```
  $ gpasswd -d user group
```
**i think deluser is better (if adduser is better)**
then the new group config will be assigned at the next login, at least on Debian. If the user is logged in, the effects of the command aren't seen immediately.

also you can use
```
  $ deluser user group
```

[How do I change permissions for a folder and all of its subfolders and files in one step in Linux?](https://stackoverflow.com/questions/3740152/how-do-i-change-permissions-for-a-folder-and-all-of-its-subfolders-and-files-in)   
```
  $ chmod -R g+wX
```
The X (that is capital X, not small x!) is ignored for files (unless they are executable for someone already) but is used for directories.


#### to fix my joomla permission sftp issue i needed to change the parent (html) dir Permissions
1. make sure i was in the www-data group
```
  $ sudo adduser username grouptoadd
```
>On Debian, the adduser package contains a deluser program which removes a user from a group if you pass both as arguments:  

2. make sure the ower of the site root folder was the www-data group
```
$ sudo chown -R www-data:www-data /var/www/html/
```
3. make sure the group had rwx permission (7)
```
  $ sudo chmod 775 html/
```
**numbers see - Modify File Permissions with chmod (above)**
or

also change subdir Permissions
```
  $ sudo chmod -R g+wX html/
```

#### Tripple threat
[add me to group, change file ownership to that group, make sure group can edit files](https://www.digitalocean.com/community/questions/how-i-edit-index-html-my-droplet-is-ubuntu-lamp-on-14-04)   
```
sudo usermod -a -G www-data foo
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R g+rw /var/www/html/
```

[Upload of file .. was successful, but error occurred while setting the permissions and/or timestamp. If the problem persists, turn off setting permissions or preserving timestamp. Alternatively you can turn on ‘Ignore permission errors’ option.](https://winscp.net/eng/docs/message_preserve_time_perm)   
> The issue seems to be with 'keep remote directory up to date' mode. Synchronize seems to update the timestamp correctly
**it looks like ill have to have this error continue to pop up**

[Quick share links](https://www.digitalocean.com/docs/spaces/how-to/file-permissions/)   
