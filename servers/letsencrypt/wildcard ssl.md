# letsencrypt wildcard ssl 

LATER: set this up later - i can use my regular one for now

[How To Create Let's Encrypt Wildcard Certificates with Certbot](https://www.digitalocean.com/community/tutorials/how-to-create-let-s-encrypt-wildcard-certificates-with-certbot)   

[Is It Possible to Secure my Domain and Subdomain with a single SSL certificate?](https://cheapsslsecurity.com/blog/ssl-certificates-for-subdomains/)   

> Yes, now you don’t have to buy separate SSL certificates for all your subdomains and go through the verification process, CSR generation, installation and renewal for each of them separately. Thanks to the wildcard SSL certificate.

[Does Let’s Encrypt issue wildcard certificates?](https://letsencrypt.org/docs/faq/)   
> Yes. Wildcard issuance must be done via ACMEv2 using the DNS-01 challenge. See this post for more technical information.
- [ACME v2 Production Environment & Wildcards](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)   
- [list of ACME v2 compatible clients](https://letsencrypt.org/docs/client-options/#acme-v2-compatible-clients)   
  > certbot is on the list
- [certbot](https://certbot.eff.org/)   
- [certbot instructions](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)   
  
[what ubuntu version am i running](https://www.ionos.com/digitalguide/server/know-how/check-ubuntu-version/)   

```
  lsb_release -a
```
> works

```
  currently running:
  Ubuntu 18.04.2 LTS
```
