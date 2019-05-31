# letsencrypt notes

[When to use Let's Encrypt's webroot and standalone authorization](https://advancedweb.hu/2018/06/05/letsencrypt_webroot_vs_standalone/)   

so to fix the wrong root showing issue & the certificate mismatch i expanded the existing certificate to include the subdomain by creating a new request with all included
```
   sudo certbot --nginx -d example.com -d www.example.com -d beta.example.com


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  You have an existing certificate that contains a portion of the domains you
  requested (ref: /etc/letsencrypt/renewal/sunzao.us.conf)

  It contains these names: sunzao.us, www.sunzao.us

  You requested these names for the new certificate: beta.sunzao.us, sunzao.us,
  www.sunzao.us.

  Do you want to expand and replace this existing certificate with the new
  certificate?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  (E)xpand/(C)ancel: E

```

#### GOTCH: certificate is valid - still showing Not Secure
[Why does Chrome say “Your connection to this site is not secure” even if the certificate is valid?](https://superuser.com/questions/1367770/why-does-chrome-say-your-connection-to-this-site-is-not-secure-even-if-the-cer)   
> try incongeto
> hint: check the site using incognito window. (if you don't want to close tabs and restart chrome)   

**worked**

sudo certbot --nginx -d sunzao.us -d www.sunzao.us -d beta.sunzao.us
