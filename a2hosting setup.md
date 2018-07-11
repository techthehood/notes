
# a2 hosting setup - swift account

## canceling subsciption - within 25 days of expiration

## [changing cpanel password](https://www.a2hosting.com/kb/a2-hosting-customer-portal/viewing-and-changing-login-settings-for-shared-hosting-accounts)

** GOTCHA: **
** site email-login/password and cpanel username/password is not the same **

to change it:

[go to customer portal (like the a2 account dashboard)](https://my.a2hosting.com/clientarea.php)

choose services tab > MyServices

login again

choose "Manage" btn on desired hosting pkg

in the actions menu choose change password


## [SSH setup](https://www.a2hosting.com/kb/getting-started-guide/accessing-your-account/using-ssh-secure-shell)

dependencies: 
[putty && puttygen](https://www.chiark.greenend.org.uk/~sgtatham/putty/)
** putty && puttygen can be found in the same download location **

[winSCP](https://winscp.net/eng/index.php)


** GOTCHA: need to know cpanel username/password (not email-login/password) **
#### follow the steps - no adjustments

** don't worry about saving just yet.  you can do that with the SSH keys **

** note different hosting plans prefer different special ports (variations of port 22) **

## [Setup SSH Keys](https://www.a2hosting.com/kb/getting-started-guide/accessing-your-account/using-ssh-keys)
** GOTCHA: you need to have the SSH process completed - ensuring you know the 
username/password and there aren't any issues **

#### follow the steps - no adjustments
** double click the saved session to access (instead of using the load btn) **
** type 'exit' in the cmd to exit putty **
[use ls -a to view hidden .ssh folder](https://www.siteground.com/tutorials/ssh/listing/)

## winSCP setup
in the login window select 'New Site'
set File protocol to SCP
Host name: set to your url or ip address
port: '22' or may be specialized to host preferences 
username/password: cpanel not email-login

** GOTCHA **
choose advanced btn
find authentication under the SSH section of the menu
navigate the input to the location of your ssh private-key file .ppk

you will have to enter your passphrase if you set one up


