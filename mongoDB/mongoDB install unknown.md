

> Im not sure what this installation is for.
> maybe this was an old installation process before i knew how to find the one i use now (the real one)

**setup mongoDB**

## [finding server version (ssh)](https://stackoverflow.com/questions/2311586/what-is-a-quick-ssh-command-to-know-the-system-info-configuration)

```
	uname
	uname -a
```

## 1. download into the shell
Download the binary files for the desired release of MongoDB.
Download the binaries from the MongoDB Download Center.

For example, to download the latest release through the shell, issue the following:

```

	curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.3.tgz

```

## 2. Extract the files from the downloaded archive.
For example, from a system shell, you can extract through the tar command:

```

	tar -zxvf mongodb-linux-x86_64-3.6.3.tgz

```

## 3. Copy the extracted archive to the target directory.
Copy the extracted folder to the location from which MongoDB will run.

```

	mkdir -p mongodb
	cp -R -n mongodb-linux-x86_64-3.6.3/ mongodb

```

## 4. Ensure the location of the binaries is in the PATH variable.
The MongoDB binaries are in the bin/ directory of the archive. To ensure that the binaries are in your PATH, you can modify your PATH.

For example, you can add the following line to your shell�s rc file (e.g. ~/.bashrc):
```

	export PATH=<mongodb-install-directory>/bin:$PATH

	//my solution in vi .bashrc
	export PATH=mongodb/bin:$PATH

```
Replace <mongodb-install-directory> with the path to the extracted MongoDB archive.

# Run MongoDB Community Edition

## 1. Create the data directory.
Before you start MongoDB for the first time, create the directory to which the mongod process will write data. By default, the mongod process uses the /data/db directory. If you create a directory other than this one, you must specify that directory in the dbpath option when starting the mongod process later in this procedure.

The following example command creates the default /data/db directory:

```

	mkdir -p /data/db

```

## 2. Set permissions for the data directory.
Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the directory.

```

	chmod 755 data

```




