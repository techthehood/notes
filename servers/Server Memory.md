# server Memory

[How to Track Performance with Droplet Graphs](https://www.digitalocean.com/docs/droplets/how-to/graphs/)   

Research
[How to monitor your system performance on (Ubuntu) Linux](https://www.howtoforge.com/tutorial/ubuntu-performance-monitoring/)   
[How to install stacer system monitor on ubuntu 18.04](https://www.howtoforge.com/tutorial/how-to-install-stacer-system-monitoring-on-ubuntu-1804-lts/)   
[How to install netdata monitoring tool on ubuntu 18.04](https://www.howtoforge.com/tutorial/how-to-install-netdata-monitoring-tool-on-ubuntu/)  
[3 of the Best System Monitor Tools for Ubuntu](https://www.maketecheasier.com/best-system-monitor-tools-ubuntu/)    
[What are the best system monitors for Linux?](https://www.slant.co/topics/4741/~system-monitors-for-linux)   



[pm2 Process management](https://pm2.io/doc/en/runtime/guide/process-management/)   
```
  $ pm2 monit
```

[How to inspect the memory usage of a process in Node.Js](https://www.valentinog.com/blog/memory-usage-node-js/)   

#### Heap used
```
  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
```
#### other properties
```
  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
```
large test
```
  let arr = Array(1e6).fill("some string");
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${used} MB`);
```
> Array(1e6) creates an empty array with a length property of 1 million. Then the fill() method fills every position of the array with a string. At this point we have an array with 1 million of elements into it.

larger test
```
  let arr = Array(1e8).fill("some string")
```
> Array(1e8) creates an empty array with a length property of 100 millions.

[memwatch-next](https://www.npmjs.com/package/memwatch-next)
> Memwatch isn’t useful enough, at least to me it isn’t. I’ve also noticed around stackoverflow and github that this project is pretty much dead and it hasn’t had an update in over 2 years.
Heapdump is helpful but it does require a bit of tinkering (like naming anonymous functions for easier heap browsing).

[How v8 garbage collection works](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)   

[NODEJS – MEMORY LEAK HUNT WITH MEMWATCH AND HEAPDUMP](https://kontra.agency/nodejs-memory-leak-hunt-memwatch-heapdump/)   
[node-heapdump](https://www.npmjs.com/package/heapdump)   
[Finding And Fixing Node.js Memory Leaks: A Practical Guide](https://marmelab.com/blog/2018/04/03/how-to-track-and-fix-memory-leak-with-nodejs.html)   


[The Power-User’s Guide to htop](https://www.maketecheasier.com/power-user-guide-htop/)   
**a clean ez to understand guide**   
>F3 Search lets you search processes while F4 Filter allows you to filter processes by keywords

[htop ctrls list](https://devanswers.co/ubuntu-system-monitoring-with-htop/)   

[14. Kill Multiple Processes using Tag](https://www.thegeekstuff.com/2011/09/linux-htop-examples)      
[htop explained (TMI guide - not helpful for beginners)](https://peteris.rocks/blog/htop/)      
**still may be worth a hard look**
[]()   
[]()   
