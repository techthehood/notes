angularjs merge

[offical docs](https://docs.angularjs.org/api/ng/function/angular.merge)
[lodash docs](https://lodash.com/docs/4.17.5#merge)
[merge article](http://davidcai.github.io/blog/posts/copy-vs-extend-vs-merge/)
[another ok article](https://medium.com/smelly-code/angular-extend-copy-merge-c7687c6c8d3f)

my samples
```
	this.process_bookmark = function(eID)
    {
        //get the bookmark object
        let book_obj = boss.service.bookmark_reference[eID];
        let book_details = JSON.parse(book_obj.details);
        //merge with tool json data (update)
        let toolData;
        boss.service.toolData.forEach(function(entry){
          if(entry.file_name == book_obj.tool){
            toolData = entry.details;
          }
        });

        book_details = lodash.merge(toolData,book_details);//lodash.js

        //replace current details with bookmark details
        //boss.service.tool.details = JSON.parse(JSON.stringify(book_details));
        boss.service.tool.details = lodash.merge(boss.service.tool.details,book_details);
        let mesee = "merged";



        //merge with current tool

    }//process_bookmark
```

note: while testing i originally had it backwards

i.e. i had the src as the first parameter and the destination as the 2nd
but in order for it to work use:
```
.merge(dst,src)
 
 which is to say 
 let merge_me = lodash.merge(item-you-want-to-change, data-you-want-to-use/or-want-to-change-to);