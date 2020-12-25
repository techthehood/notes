# Multidimensional array notes
```
  what = [];

  what['place']={name:'september'};

  what['place']["name"];// "september"

```

```
  what['place']['name'] = "august";

  what['place']['name']// "august"
```

```
  some = what.forEach((item)=>{
    console.log("[what]",item);})
```
**fails**


```
  var fourth = '';
  for (var arrayIndex in what) {
    fourth += ' ' + what[arrayIndex].name;
  }
```
**this works**
