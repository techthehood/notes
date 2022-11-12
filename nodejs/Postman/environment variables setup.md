# postman environment variable setup for google auth (the complete notes)    

1. setup environment variables
> NOTE: you will need to setup 2 with local and live urls if you want to test on both a local and live server


# setup environment variables
  - choose the environments btn on the left control menubar
  - choose the plus at the left top of the menu 
  (hovering says create environment)
  - add the following variables

url: localhost:3000 or example.com 
> (local and live site - no http/https:// neccessary)

access_token: will be set programatically
authToken: will be set programatically

~~xUser: this seems to be the environment name (DEPRECATED)~~


AUTH_CLIENT_ID: get from cloud dev console - OAuth 2.0 Client IDs

AUTH_CLIENT_SECRET: also found in the same place

AUTH_CALLBACK_URL: http://localhost:3000/auth/google/redirect (my own custom route)
> this is set in the same place but i don't think i use it.  When i did use it i think the url contained a temporary token to use on the server to further varify and access full user data?

AUTH_URI: https://accounts.google.com/o/oauth2/v2/auth
AUTH_ACCESS_TOKEN_URI: https://oauth2.googleapis.com/token
AUTH_SCOPE: https://www.googleapis.com/auth/userinfo.profile 
> ("profile" may also work)


[google cloud dev console](https://console.cloud.google.com/apis/credentials?project=example-push)   

OAuth 2.0 Client IDs: example-app-OAuth



## IMPORTANT: more documentation

[pre and post scripts in postman](https://learning.postman.com/docs/writing-scripts/intro-to-scripts/)   



[postman API Key](https://learning.postman.com/docs/sending-requests/authorization/#api-key)   

GOTCHA: [Postman OAuth 2.0 "request url is empty" error even though successful authentication](https://stackoverflow.com/questions/68037910/postman-oauth-2-0-request-url-is-empty-error-even-though-successful-authentica)   
> this occured because i didn't have a token_URL (token_uri)

## WHY DO I HAVE TO HUNT FOR THESE?

GOTCHA: [AUTH_URL && AUTH_ACCESS_TOKEN_URL](https://stackoverflow.com/questions/32076503/using-postman-to-access-oauth-2-0-google-apis)   
> why is something so simple so cryptic?  Why do i have to scour the web for hours to find official documentation?
> why should i need to use stackoverflow hearsay trial and error to get to the solution?

DOCS: the official docs can be found in:
[google developer console](console.developers.google.com)   
select project
choose APIs & Services > Credentials
OAuth 2.0 Client IDs 
select edit for target Client ID
choose DOWNLOAD JSON from the top menu to see the auth URLs

```
  {
    "web":{
      "client_id":"xxx-xxxxx-xxxxxx-xxxx",
      "project_id":"project-name",
      "auth_uri":"https://accounts.google.com/o/oauth2/auth",
      "token_uri":"https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
      "client_secret":"xxx-xxxxx",
      "redirect_uris":[`${location.origin}/redirect"],
      "javascript_origins":["http://localhost:5000","https://example.com","https://www.example.com"]
    }
  }
```

GOTCHA: [AUTH_SCOPE](https://stackoverflow.com/questions/7130648/get-user-info-via-google-api)   
> where is the offical docs for the proper scope?

[OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes)    
> there is documentation for a long list of scopes but no real way of knowing which one you need

[Scopes for Google OAUTH2 API, v2](https://developers.google.com/identity/protocols/oauth2/scopes#oauth2)   
> almost impossible to find without scrolling through an extensive list but here is where its found

scroll down to **Google OAuth2 API, v2**
```
  https://www.googleapis.com/auth/userinfo.profile
```

All the URIs/URLs

```
  AUTH_URI: https://accounts.google.com/o/oauth2/auth
  AUTH_ACCESS_TOKEN_URI: https://accounts.google.com/o/oauth2/token
  AUTH_SCOPE: https://www.googleapis.com/auth/userinfo.profile

  // also try
  AUTH_SCOPE: profile
```

[OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)   

[How to set up Oauth2 in PostMan. (video)](https://www.youtube.com/watch?v=jjCauMywU2Q)   
> in this video the person just used "profile" as the scope
> i tried it and it seemed to work (it still referred to the userinfo.profile url so im not sure it was not used)