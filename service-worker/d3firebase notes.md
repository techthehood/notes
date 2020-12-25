
#### GOTCHA: Access to script at 'https://www.gstatic.com/firebasejs/3.6.0/firebase.js' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

[fix - don't use crossorigin on it at all](https://stackoverflow.com/questions/41069330/with-script-crossorigin-anonymous-why-is-a-script-blocked-by-cors-policy)   
> What is interesting though, is that CORS behavior is totally disabled if you skip crossorigin attribute. For example:
