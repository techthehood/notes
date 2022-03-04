# Update/Uninstall MongoDB

## Ubuntu update

> i think some versions are less cumbersome to uninstall and reinstall than to update


[Update MongoDB from 3.6.3 to 4.4 on Ubuntu 18.04 fails](https://www.digitalocean.com/community/questions/update-mongodb-from-3-6-3-to-4-4-on-ubuntu-18-04-fails)   

>Important

> The mongodb package provided by Ubuntu is not maintained by MongoDB Inc. 
> and conflicts with the official mongodb-org package. If you have already installed
> the mongodb package on your Ubuntu system, you must first uninstall the mongodb 
> package before proceeding with these instructions.


#### updating to 4.0 (4.0.27)

[Upgrade a Standalone to 4.0](https://docs.mongodb.com/manual/release-notes/4.0-upgrade-standalone/)
[Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/v4.0/tutorial/install-mongodb-on-ubuntu/)   
> make sure you are using MONGODB MANUAL
*Version 4.0*

> Run step 1-3
> Then Run step 4:
use section (tab) **Install a specific release of MongoDB.**
> then follow the instructions

once i hit the errors

```
Errors were encountered while processing:
 /var/cache/apt/archives/mongodb-org-server_4.0.27_amd64.deb
 /var/cache/apt/archives/mongodb-org-mongos_4.0.27_amd64.deb
 /var/cache/apt/archives/mongodb-org-tools_4.0.27_amd64.deb
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

[can't install Mongodb properly from terminal ubuntu 18.04 LTS](https://stackoverflow.com/questions/59215476/cant-install-mongodb-properly-from-terminal-ubuntu-18-04-lts)   

Command to Run 
```
  sudo dpkg -i --force-all /var/cache/apt/archives/mongodb-org-mongos_4.2.1_amd64.deb
```
> make sure the numbers match and change the mongod-org-xxxxx to match each error

...mongodb-org-mongos_4.0.27_amd64.deb
...mongodb-org-server_4.0.27_amd64.deb
etc.

> Then run step 4 again

> finally start and stop mongodb server

```
  sudo systemctl stop mongodb
  sudo systemctl start mongodb

  //check status
  sudo systemctl status mongod

  //or (appears to do the same thing)

  sudo service mongodb status

```

run the shell and check the version
```
  mongo
  db.version()
```

NOTE: another GOTCHA: (kind of)

- Skipping acquire of configured file 'multiverse/binary-arm64/Packages' as repository 'https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 InRelease' doesn't support architecture 'arm64

[Repositories for Ubuntu 18.04 Bionic do not ship ARM64 version](https://jira.mongodb.org/browse/SERVER-37692)   
> idk where this happened but it did, somewhere down the rabbit hole. 
> i still worked to fix the issue above and didn't have to worry about this. 
> but there is a note that seems relevant for the next upgrade
> 4.1 and 4.2 don't have this ARM64 issue - not sure about 4.4

and another GOTCHA:
- Unit mongodb.service is masked

[Unit mongodb.service is masked when starting mongodb](https://askubuntu.com/questions/919108/error-unit-mongodb-service-is-masked-when-starting-mongodb)   

so unmask it
```
  sudo systemctl unmask mongodb
```
> also something that occured somewhere down the rabbit hole
> seems like masked was a good thing though so im going to learn how to re-mask it

#### updating to 4.2
NOTE:
The following packages were automatically installed and are no longer required:
  libboost-filesystem1.65.1 libboost-iostreams1.65.1
  libboost-program-options1.65.1 libboost-system1.65.1
  libgoogle-perftools4 libpcrecpp0v5 libsnappy1v5 libstemmer0d
  libtcmalloc-minimal4 libyaml-cpp0.5v5 mongo-tools mongodb-server-core
  python3-pyparsing
Use 'sudo apt autoremove' to remove them.
> i can try to autoremove them later (no hurry)

NOTE: so far its almost the same process as above (without the mongodb-org-mongos_4.0.27_amd64.deb errors)

trying to run mongo
GOTCHA:
Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:353:17
@(connect):2:6
2022-03-02T21:18:51.629+0000 F  -        [main] exception: connect failed 2022-03-02T21:18:51.629+0000 E  -        [main] exiting with code 1

note after 
```
  sudo apt-get update
```
Skipping acquire of configured file 'multiverse/binary-arm64/Packages' as repository 'https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 InRelease' doesn't support architecture 'arm64'

#### GOTCHA: at this point i followed the uninstall instructino then re-followed the install instructions

You can optionally ensure that MongoDB will start following a system reboot by issuing the following command:

```
  sudo systemctl enable mongod
```
Created symlink /etc/systemd/system/multi-user.target.wants/mongod.service → /lib/systemd/system/mongod.service.

after hours of circle i tried to reboot the system

[](https://vitux.com/3-ways-to-reboot-ubuntu-through-the-command-line/)   

```
 sudo reboot
```
> it did shutdown but then it took forever to respond as if it wasn't going to start back up so i went to the host
> and turned off then turned on the droplet. upon returning i ran

```
  sudo systemctl status mongodb
```
> it showed active and the shell command 'mongo' also worked
> i checked the db.version() and it was 4.2 (4.2.18)

GOTCHA: now the db works but its empty, lets see if it will work with the old data

> ULTIMATELY THE BEST WAY TO DEAL WITH THE UPGRADES IS TO UNINSTALL AND REINSTALL

## Windows Update

