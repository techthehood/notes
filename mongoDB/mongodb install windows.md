#### [install MongoDB on Windows](https://www.mongodb.com/download-center/community)   
>search: download mongodb   

1. download mongodb from the sites
2. extract from the zip folder
3. archive away from downloads folder (C:\Users\username\version-control\nodejs\mongodb)  
4. rename the folder from initial-zip-name to mongodb    
5. move to user/myName folder
6. create a data folder mongodb-data

### start mongodb server (windows)
 from username dir
```
  cd ~; mongodb/bin/mongod.exe --dbpath=mongodb-data
```
>--dbpath=mongodb-data passes the path to the db-data file   
> i made an alias on window: mongodb - it navigates then runs just like the code sample

**GOTCHA: to keep it running you have to open a different terminal window to write more scripts
the mongodb terminal must remain running**

>how did mongodb get to cd ~? does it install there with an installer? there are no notes above to move it there.
> A: (see step 5)

#### [Install MongoDB Community Edition on Windows](https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-windows/)
[MongoDB download center](https://www.mongodb.com/try/download/community)   

- In the Version dropdown, select the version of MongoDB to download.
- In the Platform dropdown, select Windows.
- In the Package dropdown, select msi.
- Click Download.
- Run the install wizard

NOTE: Do not activate MongoDB as service - this runs MongoDB in the background at startup
GOTCHA: MongoDB shows some challenges overwriting files - run terminal as administrator

[mongo is not recognized](https://www.mongodb.com/community/forums/t/bash-mongo-command-not-found/87608/4)   

- search/goto environment variables > edit Path > click browse > navigate to bin folder in MongoDB installation

Path example
```
 C:\Program Files\MongoDB\Server\4.4\bin
```

#### [GOTCHA: mongorestore is not recognized](https://stackoverflow.com/questions/63989951/command-prompt-are-showing-mongorestore-is-not-recognized-as-an-internal-or-ex)   

> You need to install separately. Please take reference of below link

[https://www.mongodb.com/try/download/database-tools](https://www.mongodb.com/try/download/database-tools)   

> GOTCHA: we need to download separately from the given link . But that is not enough to run the mongorestore  command .
> Additionally we should set the path of the Mongo db tools in to our environment variable. After I have done that the command has recognized from my end .

*installer automatically adds it in the same folder as MongoDB .msi install (if you used the installer)*

- see environment variables above

Path example
```
 C:\Program Files\MongoDB\Tools\100\bin
```