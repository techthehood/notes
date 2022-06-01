# swiper.js notes

GOTCHA: trying to use swiper from CDN failed. - not react or webpack friendly

GOTCHA: installing swiper with NPM (for use with react) also failed because the latest swiper requires ESM modules.
i had to downgrade to swiper@6.8.4

#### use with a react component

```
  // Import Swiper React components
  import { Swiper, SwiperSlide } from 'swiper/react';
  import SwiperCore, { Navigation, EffectFade, Pagination, Autoplay } from 'swiper';

  SwiperCore.use([EffectFade, Pagination, Autoplay]);// works

  // inside react component
  ...

  let inner = use_data.map((obj, ndx) => { 
    // NOW: i need a component selector here and use the template prop
    if (use_data.length > 1){
      // use a slider
      return (
        <SwiperSlide key={`ss-${ndx}`}>
          <Hero {...{ data: obj }} />
          {svg}
        </SwiperSlide>
      )
    }else{
      return <Hero {...{data: obj}}/>
    }
  });

  let swiper_data = {
    className:"my_swiper",
    // modules: [Navigation, EffectFade, Autoplay],
    navigation: true,
    slidesPerView: 1,
    speed: 800,
    loop: true,
    // autoplay: {
    //   delay: 10000,
    //   disableOnInteraction: false,
    // },
    pagination: {clickable: true},
    // delay: 300,
    // effect: "fade",
  }

  let content_wrapper = use_data.length > 1 ? (
    <Swiper {...swiper_data}>
      {inner}
    </Swiper>
  )

  ...

```
> GOTCHA: there was an issue with autoplay - i guess using it with modules property fails in the older version.
> to fix this i had to use SwiperCore.use([...])

#### GOTCHA: i was having an issue with using out of bounds (absolute positioned) images   

> swiper initially prevented images that went beyond the boundaries of the carousel from showing.  
> To get the images to show i had to use css: overflow: visible on swiper-container

.js
```
  let swiper_data = {
    className:"my_swiper",
    ...
    
  <Swiper {...swiper_data}>
    {inner}
  </Swiper>
```

.css
```
  .my_swiper, .swiper-container{
    width: 100%;
    height: 100vh;
    overflow: visible;
    ...
```
NOTE: swiper allowed me to add custom classNames to .swiper-container

ISSUE: once overflow is set to visible on swiper all the other slides become visible and it creates
an x-axis scroll crisis on the page. a user can swipe left and their actual page moves to an empty area
which also includes all the other slides in a row extending to the side.

*fix*
```
  .root{overflow: visible;}
```
> hack for swiper.js overflow issues (with my custom images)   

#### fixing the height carousel height issue (maintaining landscape look)
swiper height forms to its container so this issue really isn't a swiper.js issue.  but some designs will appear broken if the aspect ratio of the containing elements goes a landscape 4:3. To prevent this i used css clamp to constrain the height dimension.

ISSUE: i had both an issue with the height being too small and too large which broke the design.
my first remedies were to use min-height and max-height but somehow probably because it didnt actually set height 
(LATER explore this later by trhing min/max with height to pinpoint the problem).

```
  .banner-row{
    ...
    height: clamp(550px, 100vh, 800px) $mp;
    ...
  }
```

how can i reference the swiper within the component

> swiper has a onSwiper prop that fires once on init (like useEffect([])) 
> it takes a callback function that recieves the swiper instance as a prop
```
  const [activeIndex, setActiveIndex] = useState();

  <Swiper {...swiper_data}
      onSwiper={(swiper) => {
        console.log(`[Banner] swiper `,swiper);
        console.log('slide realIndex', swiper.realIndex);
        setActiveIndex(swiper.realIndex);
        swiper_ref.current = swiper;
      }}
    >
      {inner}
    </Swiper>
```
> i can use the callback prop to connect the swiper instance to a useRef.current variable
> i can use swiper instance .realIndex to help set the state.activeIndex value

how can i detect which slide is active and pass that to a function so i can show corresponding info externally?

> swiper has an onSlideChange property that fires with each swipe
```

  <Swiper {...swiper_data}
      ...
      onSlideChange={() => {
        debugger;
        if(swiper_ref.current){
          console.log('slide activeIndex', swiper_ref.current.activeIndex);
          console.log('slide realIndex', swiper_ref.current.realIndex);
          console.log('slide previousIndex', swiper_ref.current.previousIndex);
        }
      }}
    >
      {inner}
    </Swiper>
```
> GOTCHA: swiper_ref.current.?? throws an error during load - it needs an if statement to check for existing values before trying to use the referenced swiper instance.   
> GOTCHA:  in loop mode the first slide uses both zero index and list.length (last slide index) due to duplication and wrap around - activeIndex is inaccurate in this instance because it uses both values. try realIndex