# ngrok notes

#### GOTCHA: installation
- download the zip file for windows
- extract the zip file
- move the ngrok.exe from wherever to the user folder
- cd into the same folder as the ngrok.exe file

if you run ngrok in its .exe provided terminal use

```
  ngrok authtoken <provided auth token>
```

if you run ngrok in a bash terminal (cmder) use:

```
  ./ngrok authtoken <provided auth token>
```
#### to spin up an ngrok tunnel

```
  <ngrok || ./ngrok> http <server PORT number>
```

- ngrok will do some stuff and output 2 urls one secure and the other unsecure.
- you can share either url with whoever needs to review your project from the web