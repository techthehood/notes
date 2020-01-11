# Youtube API notes

GOTCHA: my youtube resources were being pirated
[youtube api console](https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials)
[My quotas were being maxed out for the last 4 days](https://console.developers.google.com/apis/api/youtube.googleapis.com/quotas)   

[How to Find Your External IP Address](https://smallbusiness.chron.com/external-ip-address-54769.html)   
[show external ip address](https://whatismyipaddress.com/)   

[Using API Keys](https://cloud.google.com/docs/authentication/api-keys?hl=en&visit_id=637134522836490645-1717797727&rd=1)   
[Authentication overview](https://cloud.google.com/docs/authentication/)   

my first solution was to regenerate the api key

then i put the key in the .env file and referenced it from the configuration/keys.js file using the dotenv npm pkg

.env.example
```
  # .env.example
  JWT_SECRET=''
  GOOGLE_CLIENT_ID=''
  GOOGLE_CLIENT_SECRET=''
  FACEBOOK_CLIENT_ID=
  FACEBOOK_CLIENT_SECRET=''
  MONGODB_LOCAL_TASK_URI=''
  MONGODB_LIVE_TASK_URI=''
  MONGODB_LOCAL_DB=''
  MONGODB_LIVE_DB=''
  SESSION_COOKIE_KEY=''
  YOUTUBE_API_KEY=''
```

/configuration/keys.js
```
  const dotenv = require('dotenv');
  dotenv.config();// .env has to be in the site root to work


  module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    oauth: {
      google:{
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
      },
      facebook:{
        clientID:process.env.FACEBOOK_CLIENT_ID,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET
      },
    },
    mongodb:{
      dbURI: process.env.MONGODB_LOCAL_TASK_URI,
      liveURI:process.env.MONGODB_LIVE_TASK_URI,
      db:process.env.MONGODB_LOCAL_DB,
      liveDB:process.env.MONGODB_LIVE_DB
    },
    session:{
      cookieKey:process.env.SESSION_COOKIE_KEY
    },
    youtube:{
      APIKey:process.env.YOUTUBE_API_KEY
    }
  }
```

get_youtube_data.js
```
    const keys = require('../configuration/keys');

    const get_youtube_data = async (obj, callback) => {

      let meta_data = {};
      // let url = obj.url;
      console.log("[youtube url] = ",obj.url);
      console.log("[new preview]");
      console.log(chalk.blue("[new dotenv key is]"),keys);
      console.log(chalk.blue("[new youtube api key is]"),keys.youtube.APIKey);
      ...

```

next was to manage the HTTP referrers
```
  "message": "The request did not specify any referer. Please ensure that the client is sending referer or use the API Console to remove the referer restrictions."
```
**no referrer is given. i think thats because the request is called from the server, not the browser**

I limited the Application restrictions to 2 ip addresses
the first one was my server ip
```
  hostname -I
```
the second was my localhost ip (i needed the external ip (the one from wifi the router))
