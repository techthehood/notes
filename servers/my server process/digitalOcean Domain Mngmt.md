# Domain Management

#### GOTCHA: use Create dropdown menu to get to domains

### Configure Domain Name
- Create a Cloudflare account
- add a target domain name

#### DNS menu
- goto DNS menu item and add the D.O. ip_address to the first "A" record
- add example.com to the CNAME after www

#### Domain Name Garage
- add Cloudflare Nameservers to your domain hosting service custom DNS

#### D.O. Create Record
- add A record using "@" symbol and ip address create a new record
- add a record using "www" and also adding the ip address


- comment out the location server block in sites-available/example.com to connect to static page
- GOTCHA: you have to also turn off cloudflares SSL encryption mode

GOTCHA: [How to Fix Cloudflare Error 521: Web Server is Down](https://webpop.io/cloudflare/error-521/)   

```
  curl http://ip_address
```
> In my case the static page was returned.  ultimately cloudflare was forcing 443 https when no ssl certificate or 443 
> route was created yet.  to fix this i had to turn cloudflare SSL off and downgrade the protocol to http:

- once i got past the server down error and got a white page for both domains i started the SSL process with letsencrypt