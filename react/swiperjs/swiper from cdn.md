# swiper from CDN

#### CDN links

swiper.hbs
```
  <link
    rel="stylesheet"
    href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
  />

  <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
```

#### add to views/jng.hbs

```
<!DOCTYPE html>
  <html lang="en">

  <head>
    ...

    {{>"swiper"}}

    ...
  </head>
  ...
```

#### add swiper html elements

```
  <!-- Slider main container -->
  <div class="swiper">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      ...
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
  </div>
```
#### add swiper height for cdn version
GOTCHA: swipers container had a height of 100vh - you have to add height to the .swiper element or else

```
  .my_swiper{
    width: 100%;
    &.cdn{height: 100%;}
  }
```
#### initialize swiper

```
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
```
GOTCHA: pagination is still _*not_* clickable by default = must add **clickable: true**

#### using with react
**Banner.js**
```

  let inner = use_data.map((obj, ndx) => { 
    // NOW: i need a component selector here and use the template prop
    if (use_data.length > 1){
      // use a slider
      return (
        <div className="swiper-slide" key={`ss-${ndx}`}>
          <Hero {...{ data: obj }} />
          {svg}
        </div>
      )
    }else{
      return <Hero {...{data: obj}}/>
    }
  });

  let content_wrapper = use_data.length > 1 ? (
    <div className="swiper my_swiper cdn">
      <div className="swiper-wrapper">
        {inner}
      </div>
      {/* <!-- If we need pagination --> */}
      <div class="swiper-pagination"></div>

      {/* <!-- If we need navigation buttons --> */}
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  ) : (
    <>
      {inner}
    </>
  );
```
> the positives with using the cdn and html versions with react is that you get the most current version of swiper without any deprecation issues - i switched to this because version 7+ required ESM packages (ES modules)

Swiper NPM package is now a pure ESM package. Which means it doesn't have CommonJS modules anymore (the ones with require() and module.exports syntax) and contains only native ES modules. If your bundler/tooling/environment doesn't support Node ES module, you should update it or stay on Swiper 6.

You can check this guide about using pure ESM packages.

#### initialize in react

**Banner.js**
```
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {

    let swiper_data = {
      // Optional parameters
      // direction: 'vertical',
      loop: true,
      slidesPerView: 1,
      speed: 800,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: (swiper) => {
          console.log(`[Banner] swiper `, swiper);
          console.log('slide realIndex', swiper.realIndex);
          setActiveIndex(swiper.realIndex);
          swiper_ref.current = swiper;
        },
      },

      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    }// swiper_data

    if (/*auto*/false) {
      swiper_data.autoplay = {
        delay: 10000,
        disableOnInteraction: false,
      }
    }

    const swiper = new Swiper('.my_swiper', swiper_data);

    swiper.on('slideChange', () => {
      // debugger;
        if(swiper_ref.current){
          console.log('slide activeIndex', swiper_ref.current.activeIndex);
          console.log('slide realIndex', swiper_ref.current.realIndex);
          console.log('slide previousIndex', swiper_ref.current.previousIndex);
          setActiveIndex(swiper_ref.current.realIndex);
        }
    });
  
    return () => {
      
    }
  }, [])
```