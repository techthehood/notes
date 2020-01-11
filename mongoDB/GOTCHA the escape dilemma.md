GOTCHA: the escape dilemma

> i also tried to escape strings using a function on the server but it did nothing. idk what the issue was. but passing it through stringify twice did the trick   


#### Single Stringify on the Server
viewItemDetails.js (server)
```
    let data_str = JSON.stringify(data)
```
[Handlebars.js parse object instead of \[Object object\]](https://stackoverflow.com/questions/10232574/handlebars-js-parse-object-instead-of-object-object)   
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


details.hbs (client)
```
  window['IMG_URL'] = `${location.origin}/core/alight/xfiles/images/`;
  window['ITEM_DATA'] = htmlDecode('{{data_str}}');
  console.log("[item data 1] htmlDecode",ITEM_DATA);

  window['ITEM_DATA'] = '{{{json data_str}}}';

  console.log("[item data 2] data_str passed through helper",ITEM_DATA);

  window['ITEM_DATA'] = '{{{json data}}}';

  console.log("[item data 3] data passed through helper",ITEM_DATA);

  window['ITEM_DATA'] = '{{data_str}}';
  console.log("[item data 4] original",ITEM_DATA);

  window['ITEM_DATA'] = '{{{data_str}}}';
  console.log("[item data 5] tripple bracket",ITEM_DATA);

  window['ITEM_DATA'] = '{{{data}}}';
  console.log("[item data 6] tripple bracket data",ITEM_DATA);
```

Single console outputs
```
[item data 1] htmlDecode {"_id":"5dd5843d19bfc11bec9c96bb","category":"a alright what about another really long title? One that takes up the entire maximum count so that t","title_data":"We asked web developers we admire: "What about building websites has you interested this y","core_data":"","desc_data":"","url_data":"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/","other_data":"","note_data":"","tag_data":"","meta_data":"{"title":"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y","description":"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea","image":"https://css-tricks.com/wp-content/uploads/2019/11/series.png"}","task_data":"","picture":"link","published":true,"extra":"","notification":"","admin":false,"root":false,"container":false,"order":0,"filter":"alpha","modified":"2019-11-20T18:21:49.420Z","ancestor":"5dcc63e58c6b9d3a5c539781","data_type":"link","user_id":"5da54e08c72fdb4a0c765b0f","type":"media","created":"2019-11-20T18:21:49.460Z","__v":0}


[item data 2] data_str passed through helper "{"_id":"5dd5843d19bfc11bec9c96bb","category":"a alright what about another really long title? One that takes up the entire maximum count so that t","title_data":"We asked web developers we admire: \"What about building websites has you interested this y","core_data":"","desc_data":"","url_data":"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/","other_data":"","note_data":"","tag_data":"","meta_data":"{\"title\":\"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y\",\"description\":\"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea\",\"image\":\"https://css-tricks.com/wp-content/uploads/2019/11/series.png\"}","task_data":"","picture":"link","published":true,"extra":"","notification":"","admin":false,"root":false,"container":false,"order":0,"filter":"alpha","modified":"2019-11-20T18:21:49.420Z","ancestor":"5dcc63e58c6b9d3a5c539781","data_type":"link","user_id":"5da54e08c72fdb4a0c765b0f","type":"media","created":"2019-11-20T18:21:49.460Z","__v":0}"


[item data 3] data passed through helper {"_id":"5dd5843d19bfc11bec9c96bb","category":"a alright what about another really long title? One that takes up the entire maximum count so that t","title_data":"We asked web developers we admire: "What about building websites has you interested this y","core_data":"","desc_data":"","url_data":"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/","other_data":"","note_data":"","tag_data":"","meta_data":"{"title":"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y","description":"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea","image":"https://css-tricks.com/wp-content/uploads/2019/11/series.png"}","task_data":"","picture":"link","published":true,"extra":"","notification":"","admin":false,"root":false,"container":false,"order":0,"filter":"alpha","modified":"2019-11-20T18:21:49.420Z","ancestor":"5dcc63e58c6b9d3a5c539781","data_type":"link","user_id":"5da54e08c72fdb4a0c765b0f","type":"media","created":"2019-11-20T18:21:49.460Z","__v":0}


[item data 4] original {&quot;_id&quot;:&quot;5dd5843d19bfc11bec9c96bb&quot;,&quot;category&quot;:&quot;a alright what about another really long title? One that takes up the entire maximum count so that t&quot;,&quot;title_data&quot;:&quot;We asked web developers we admire: &quot;What about building websites has you interested this y&quot;,&quot;core_data&quot;:&quot;&quot;,&quot;desc_data&quot;:&quot;&quot;,&quot;url_data&quot;:&quot;https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/&quot;,&quot;other_data&quot;:&quot;&quot;,&quot;note_data&quot;:&quot;&quot;,&quot;tag_data&quot;:&quot;&quot;,&quot;meta_data&quot;:&quot;{&quot;title&quot;:&quot;We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y&quot;,&quot;description&quot;:&quot;For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea&quot;,&quot;image&quot;:&quot;https://css-tricks.com/wp-content/uploads/2019/11/series.png&quot;}&quot;,&quot;task_data&quot;:&quot;&quot;,&quot;picture&quot;:&quot;link&quot;,&quot;published&quot;:true,&quot;extra&quot;:&quot;&quot;,&quot;notification&quot;:&quot;&quot;,&quot;admin&quot;:false,&quot;root&quot;:false,&quot;container&quot;:false,&quot;order&quot;:0,&quot;filter&quot;:&quot;alpha&quot;,&quot;modified&quot;:&quot;2019-11-20T18:21:49.420Z&quot;,&quot;ancestor&quot;:&quot;5dcc63e58c6b9d3a5c539781&quot;,&quot;data_type&quot;:&quot;link&quot;,&quot;user_id&quot;:&quot;5da54e08c72fdb4a0c765b0f&quot;,&quot;type&quot;:&quot;media&quot;,&quot;created&quot;:&quot;2019-11-20T18:21:49.460Z&quot;,&quot;__v&quot;:0}


[item data 5] tripple bracket {"_id":"5dd5843d19bfc11bec9c96bb","category":"a alright what about another really long title? One that takes up the entire maximum count so that t","title_data":"We asked web developers we admire: "What about building websites has you interested this y","core_data":"","desc_data":"","url_data":"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/","other_data":"","note_data":"","tag_data":"","meta_data":"{"title":"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y","description":"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea","image":"https://css-tricks.com/wp-content/uploads/2019/11/series.png"}","task_data":"","picture":"link","published":true,"extra":"","notification":"","admin":false,"root":false,"container":false,"order":0,"filter":"alpha","modified":"2019-11-20T18:21:49.420Z","ancestor":"5dcc63e58c6b9d3a5c539781","data_type":"link","user_id":"5da54e08c72fdb4a0c765b0f","type":"media","created":"2019-11-20T18:21:49.460Z","__v":0}


[item data 6] tripple bracket data [object Object]
```

#### Double Stringify on the server

viewItemDetails.js (server)
```
let data_str = JSON.stringify(data)
data_str = JSON.stringify(data_str)
```

Double console outputs
```
[item data 1] htmlDecode "{"_id":"5dd5843d19bfc11bec9c96bb","category":"a alright what about another really long title? One that takes up the entire maximum count so that t","title_data":"We asked web developers we admire: \"What about building websites has you interested this y","core_data":"","desc_data":"","url_data":"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/","other_data":"","note_data":"","tag_data":"","meta_data":"{\"title\":\"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y\",\"description\":\"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea\",\"image\":\"https://css-tricks.com/wp-content/uploads/2019/11/series.png\"}","task_data":"","picture":"link","published":true,"extra":"","notification":"","admin":false,"root":false,"container":false,"order":0,"filter":"alpha","modified":"2019-11-20T18:21:49.420Z","ancestor":"5dcc63e58c6b9d3a5c539781","data_type":"link","user_id":"5da54e08c72fdb4a0c765b0f","type":"media","created":"2019-11-20T18:21:49.460Z","__v":0}"


[item data 2] data_str passed through helper ""{\"_id\":\"5dd5843d19bfc11bec9c96bb\",\"category\":\"a alright what about another really long title? One that takes up the entire maximum count so that t\",\"title_data\":\"We asked web developers we admire: \\\"What about building websites has you interested this y\",\"core_data\":\"\",\"desc_data\":\"\",\"url_data\":\"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/\",\"other_data\":\"\",\"note_data\":\"\",\"tag_data\":\"\",\"meta_data\":\"{\\\"title\\\":\\\"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y\\\",\\\"description\\\":\\\"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea\\\",\\\"image\\\":\\\"https://css-tricks.com/wp-content/uploads/2019/11/series.png\\\"}\",\"task_data\":\"\",\"picture\":\"link\",\"published\":true,\"extra\":\"\",\"notification\":\"\",\"admin\":false,\"root\":false,\"container\":false,\"order\":0,\"filter\":\"alpha\",\"modified\":\"2019-11-20T18:21:49.420Z\",\"ancestor\":\"5dcc63e58c6b9d3a5c539781\",\"data_type\":\"link\",\"user_id\":\"5da54e08c72fdb4a0c765b0f\",\"type\":\"media\",\"created\":\"2019-11-20T18:21:49.460Z\",\"__v\":0}""


[item data 3] data passed through helper {"_id":"5dd5843d19bfc11bec9c96bb","category":"a alright what about another really long title? One that takes up the entire maximum count so that t","title_data":"We asked web developers we admire: "What about building websites has you interested this y","core_data":"","desc_data":"","url_data":"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/","other_data":"","note_data":"","tag_data":"","meta_data":"{"title":"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y","description":"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea","image":"https://css-tricks.com/wp-content/uploads/2019/11/series.png"}","task_data":"","picture":"link","published":true,"extra":"","notification":"","admin":false,"root":false,"container":false,"order":0,"filter":"alpha","modified":"2019-11-20T18:21:49.420Z","ancestor":"5dcc63e58c6b9d3a5c539781","data_type":"link","user_id":"5da54e08c72fdb4a0c765b0f","type":"media","created":"2019-11-20T18:21:49.460Z","__v":0}


[item data 4] original &quot;{&quot;_id&quot;:&quot;5dd5843d19bfc11bec9c96bb&quot;,&quot;category&quot;:&quot;a alright what about another really long title? One that takes up the entire maximum count so that t&quot;,&quot;title_data&quot;:&quot;We asked web developers we admire: \&quot;What about building websites has you interested this y&quot;,&quot;core_data&quot;:&quot;&quot;,&quot;desc_data&quot;:&quot;&quot;,&quot;url_data&quot;:&quot;https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/&quot;,&quot;other_data&quot;:&quot;&quot;,&quot;note_data&quot;:&quot;&quot;,&quot;tag_data&quot;:&quot;&quot;,&quot;meta_data&quot;:&quot;{\&quot;title\&quot;:\&quot;We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y\&quot;,\&quot;description\&quot;:\&quot;For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea\&quot;,\&quot;image\&quot;:\&quot;https://css-tricks.com/wp-content/uploads/2019/11/series.png\&quot;}&quot;,&quot;task_data&quot;:&quot;&quot;,&quot;picture&quot;:&quot;link&quot;,&quot;published&quot;:true,&quot;extra&quot;:&quot;&quot;,&quot;notification&quot;:&quot;&quot;,&quot;admin&quot;:false,&quot;root&quot;:false,&quot;container&quot;:false,&quot;order&quot;:0,&quot;filter&quot;:&quot;alpha&quot;,&quot;modified&quot;:&quot;2019-11-20T18:21:49.420Z&quot;,&quot;ancestor&quot;:&quot;5dcc63e58c6b9d3a5c539781&quot;,&quot;data_type&quot;:&quot;link&quot;,&quot;user_id&quot;:&quot;5da54e08c72fdb4a0c765b0f&quot;,&quot;type&quot;:&quot;media&quot;,&quot;created&quot;:&quot;2019-11-20T18:21:49.460Z&quot;,&quot;__v&quot;:0}&quot;


[item data 5] tripple bracket "{"_id":"5dd5843d19bfc11bec9c96bb","category":"a alright what about another really long title? One that takes up the entire maximum count so that t","title_data":"We asked web developers we admire: \"What about building websites has you interested this y","core_data":"","desc_data":"","url_data":"https://css-tricks.com/we-asked-web-developers-we-admire-what-about-building-websites-has-you-interested-this-year/","other_data":"","note_data":"","tag_data":"","meta_data":"{\"title\":\"We%20asked%20web%20developers%20we%20admire%3A%20%22What%20about%20building%20websites%20has%20you%20interested%20this%20y\",\"description\":\"For%20the%20first%20time%20ever%20here%20on%20CSS-Tricks%2C%20we%27re%20going%20to%20do%20an%20end-of-year%20series%20of%20posts.%20Like%20an%20Advent%20calendar%20riff%2C%20only%20look%20at%20us%2C%20we%27re%20bea\",\"image\":\"https://css-tricks.com/wp-content/uploads/2019/11/series.png\"}","task_data":"","picture":"link","published":true,"extra":"","notification":"","admin":false,"root":false,"container":false,"order":0,"filter":"alpha","modified":"2019-11-20T18:21:49.420Z","ancestor":"5dcc63e58c6b9d3a5c539781","data_type":"link","user_id":"5da54e08c72fdb4a0c765b0f","type":"media","created":"2019-11-20T18:21:49.460Z","__v":0}"


[item data 6] tripple bracket data [object Object]
```
#### Observations
- hbs adds html formatting to strings unless we use {{{}}} triple brackets
- passing a string with problematic double quotes through JSON.stringify twice escapes the problem quotes
- double stringify on the server along with triple brackets seems to prep the string nicely, double stringify the og data will probably work too
