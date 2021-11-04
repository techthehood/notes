# sms-test notes

[nodemailer docs](https://nodemailer.com/about/)   
[yahoo official stmp settings (article)](https://help.yahoo.com/kb/pop-access-settings-instructions-yahoo-mail-sln4724.html)   
>Email address - Your full email address (name@domain.com.)
>Password - Generate App Password
[Generate and manage third-party app passwords (yahoo)](https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html)   

  - Sign in to your Yahoo Account Security page.
  - Click Generate app password or Generate and manage app passwords.
  - Enter your app's name in the text field.
  - Click Generate password.
  - Follow the instructions below the app password.
  - Click Done.

[Access your Yahoo.com (Yahoo! Mail) Account from an Email Program using IMAP](https://getmailspring.com/setup/access-yahoo-com-via-imap-smtp)    
> unofficial article
[List Of Email-To-SMS Addresses](https://avtech.com/articles/138/list-of-email-to-sms-addresses/)   

#### GOTCHA:[Missing credentials for “PLAIN” nodemailer](https://stackoverflow.com/questions/48854066/missing-credentials-for-plain-nodemailer)   

```
you have:

auth: {
    user: 'user@gmail.com',
    password: 'password'
}

But you should write this:

auth: {
    user: 'user@gmail.com',
    pass: 'password'
}

```
> Just rename password to pass.

#### GOTCHA:: needs the full email address as the user not the username   

#### GOTCHA: using the regular password results in:   

```
  Error: Invalid login: 535 5.7.0 (#AUTH005) Too many bad auth attempts.
```
> with the username and the full email

#### summary
- needs full email address
- needs secure
- needs App password (label "pass" not "password")
- needs port 465

- does not need service
- to: is ok (extra props are ok)

- needs full email in sendMail from object property


[How to Use the Gmail SMTP Server to Send Emails for Free](https://kinsta.com/blog/gmail-smtp-server/)   
> setting up app credentials for gmail (limit 500 )   


[Email Sending Limit and Send Rate – Gmail, Outlook, Yahoo! Mail, AOL Mail](https://www.yetesoft.com/email-sending-limit/)   
> best breakdown (idk if its up-to-date)

[EMAIL ATTACHMENT AND SENDING LIMITS FOR GOOGLE, YAHOO, AOL AND A LOT MORE PROVIDERS](https://drdianehamilton.com/email-attachment-and-sending-limits-for-google-yahoo-aol-and-a-lot-more-providers/)   

[yahoo smtp sending limits (yahoo small business)](https://help.smallbusiness.yahoo.net/s/article/SLN17518)   
[yahoo obscure sending limit info](https://help.yahoo.com/kb/SLN3353.html)   
> a need to know basis and you don't need to know

[How to Send e-mail using Node.js](https://codeforgeek.com/send-e-mail-node-js/)   


GOTCHA:  [550 error when sending email through nodemailer](https://stackoverflow.com/questions/61086675/550-error-when-sending-email-through-nodemailer)   
