# Memory usage

[nodejs built in v8 docs](https://nodejs.org/api/v8.html)   
[How to inspect the memory usage of a process in Node.Js](https://www.valentinog.com/blog/memory-usage-node-js/)  
> suggest using [memwatch-next](https://www.npmjs.com/package/memwatch-next)  

 utils/process_memory.js
```
  // const process_memory = require('./utils/process_memory.js');

  const process_memory = () => {

    const used = process.memoryUsage();
    for (let key in used) {
      console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }//for

  }// process_memory

  module.exports = process_memory;

  // logs example:

  // rss 57.45 MB
  // heapTotal 38.84 MB
  // heapUsed 24.42 MB
  // external 17.46 MB
```

[A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)   
[Node.js memory limitations](https://medium.com/@ashleydavis75/node-js-memory-limitations-30d3fe2664c0)   
[Hunting a Ghost - Finding a Memory Leak in Node.js](https://blog.risingstack.com/finding-a-memory-leak-in-node-js/)   

### videos

[Walmart Node.js Memory Leak Part I](https://www.joyent.com/blog/walmart-node-js-memory-leak-part-1)   
[Walmart Node.js Memory Leak Part II](https://www.joyent.com/blog/walmart-node-js-memory-leak-part-2)   

[Case Study: Finding a Node.js Memory Leak in Ghost](https://blog.risingstack.com/case-study-node-js-memory-leak-in-ghost/)   
> Article now seems to be a commercial for pm2 plus   

[Understanding Garbage Collection and Hunting Memory Leaks in Node.js](https://blog.codeship.com/understanding-garbage-collection-in-node-js/)   
> this url timed out - may be a good candidate to monitor the leak

[try puppeteer cluser (hint)](https://stackoverflow.com/questions/51971760/managing-puppeteer-for-memory-and-performance)   
[puppeteer cluster](https://www.npmjs.com/package/puppeteer-cluster)   

[How to solve process out of memory in Node.js](https://medium.com/@vuongtran/how-to-solve-process-out-of-memory-in-node-js-5f0de8f8464c)   

[Node.js — Increase the Memory Limit for Your Process](https://futurestud.io/tutorials/node-js-increase-the-memory-limit-for-your-process)   
#### using nodejs v8
[Node.js V8](https://www.javatpoint.com/nodejs-v8)   
