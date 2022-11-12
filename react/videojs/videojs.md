
[video.js | npm](https://www.npmjs.com/package/video.js)   
[getting started | DOCS](https://videojs.com/getting-started/)   
[video.js themes | GitHub](https://github.com/videojs/themes)   

```
  <video 
    id={`my-player_${iUN}_${ndx}`}
    className={`slide_video video-js vjs-theme-forest`} /*ref={ref}*/ 
    controls
    // width="640px" 
    // height="264px" 
    width="700px"
    height="400px"
    data-ndx={ndx}
    preload="auto"
    poster={entry.poster}
    data-setup='{}'
  >
    <source src={entry.src} type='video/mp4'/>
    {"Your browser does not support the video tag."}
  </video>
```
> data-setup attribute is required for the video.js video element to auto configure otherwise you have to call a initialization function - see docs 

#### Required class
```
<video 
  className={`video-js ...other classes`}
  // or
  class="video-js ...other classes"
```
IMPORTANT GOTCHA 
> video-js class is required for the controls to find their wait to the appropriate position