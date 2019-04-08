
adding ssh to another machine

i ultimately need to add to my root user's authorized_keys but to do that i need that root users private key. i think the private key is routed to a specific location on a specific machine but maybe not. maybe it can be shared. if it can be shared all i have to do is copy and paste the key.  but if the server doesn't know where to find that key it doesn't help me. so i can set up another account the same way i did the first one or i can add to the authorized_keys file if i could login using a password but i disabled the password and i would need to gain access to reverse that config.  

[to gain access through a password](https://medium.com/@hidace/how-to-ssh-into-a-digitalocean-server-after-getting-permission-denied-publickey-error-77b687c2880d)

use digital oceans console to go to 

```
	etc/ssh/sshd_config 
```

use vi to edit the file
```
	vi sshd_config
```

press i for insert mode and use the down arrow to get to the correct line
(near line 50 something)

change the no to a yes.

[restart the ssh service](https://www.digitalocean.com/community/questions/sshd-restart-during-inital-server-setup-on-cnetos7)
```
	service sshd restart
```

check its status (optional)
```
	service sshd status
```

[change to a new password](https://www.digitalocean.com/docs/droplets/how-to/connect-with-console/)

get a new password sent to your gmail if you don't remember the old one

use their console to login using the new password (tedious numeric nightmare)
then reset the password to one more userable

go to your terminal of choice and type in root@domain/ip and when prompted use your newly added password






