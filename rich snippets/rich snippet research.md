# Rich Snippet research

### Tracking down youtube rich snippets
[Social Discovery](https://developers.google.com/web/fundamentals/discovery/social-discovery/)   
[Import JSON-LD Meta Information from the YouTube API for embedded Videos](https://www.youtube.com/watch?v=TnCINj0Miy0)   
[YouTube API Project With Authentication](https://www.youtube.com/watch?v=r-yxNNO1EI8)   
[Obtaining a developer key for the YouTube Data API v3 and the Analytics API](https://www.youtube.com/watch?v=Im69kzhpR3I)   
[Youtube API home](https://developers.google.com/youtube/v3/)   

#### getting an api key
[YouTube Data API Overview](https://developers.google.com/youtube/v3/getting-started#partial)   
[Youtube API implementation guide](https://developers.google.com/youtube/v3/guides/implementation)    
[Obtaining authorization credentials](https://developers.google.com/youtube/registering_an_application)   

[start at the console](https://console.developers.google.com/)   
> click api library or enable APIs and services link
> click youtube data API v3
> click enable
> click create credentials



from example 2  
>Example 2 returns a video resource that includes two parts as well as kind and etag properties.   

```
  URL: https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY&part=snippet,statistics

  Description: This example modifies the part parameter value so that the
               contentDetails and status properties are not included
               in the response.

  API response:

  {
   "kind": "youtube#videoListResponse",
   "etag": "\"UCBpFjp2h75_b92t44sqraUcyu0/sDAlsG9NGKfr6v5AlPZKSEZdtqA\"",
   "videos": [
    {
     "id": "7lCDEYXw3mM",
     "kind": "youtube#video",
     "etag": "\"UCBpFjp2h75_b92t44sqraUcyu0/iYynQR8AtacsFUwWmrVaw4Smb_Q\"",
     "snippet": {
      "publishedAt": "2012-06-20T22:45:24.000Z",
      "channelId": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      "title": "Google I/O 101: Q&A On Using Google APIs",
      "description": "Antonio Fuentes speaks to us and takes questions on working with Google APIs and OAuth 2.0.",
      "thumbnails": {
       "default": {
        "url": "https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg"
       },
       "medium": {
        "url": "https://i.ytimg.com/vi/7lCDEYXw3mM/mqdefault.jpg"
       },
       "high": {
        "url": "https://i.ytimg.com/vi/7lCDEYXw3mM/hqdefault.jpg"
       }
      },
      "categoryId": "28"
     },
     "statistics": {
      "viewCount": "3057",
      "likeCount": "25",
      "dislikeCount": "0",
      "favoriteCount": "17",
      "commentCount": "12"
     }
    }
   ]
  }
```

[youtube api - quota usage](https://developers.google.com/youtube/v3/getting-started#quota)   
[Sample API Requests](https://developers.google.com/youtube/v3/sample_requests)   
[Add structured data to your web pages](https://codelabs.developers.google.com/codelabs/structured-data/index.html#2)   
[Rich result status reports](https://support.google.com/webmasters/answer/7552505#supported-result-types)   
[Build, Test, and Release Your Structured Data](https://developers.google.com/search/docs/guides/prototype)   
[Structured data testing tool](https://search.google.com/structured-data/testing-tool#)   
[Structured data test sample](https://search.google.com/structured-data/testing-tool#url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DpVbwZg8rM2c)   
[Structured data video - docs article](https://developers.google.com/search/docs/data-types/video?visit_id=1557313789418-2252456599416546558&hl=de&rd=1)   
[Getting started with schema.org using Microdata - Docs](https://schema.org/docs/gs.html)    
[schema.org faq](https://schema.org/docs/faq.html)   
[schema.org person samples](https://schema.org/Person)   
[Video Rich Snippet Generator for schema.org Markup](https://app.sistrix.com/en/video-snippet-generator)   


### [Google rich snippets guide](https://mangools.com/blog/google-rich-snippets-guide/)

[nodejs get url parts](https://www.w3schools.com/nodejs/nodejs_url.asp)   
