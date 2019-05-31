# [Puppeteer](https://github.com/GoogleChrome/puppeteer)   
*_docs main_*
[npm puppeteer](https://www.npmjs.com/package/puppeteer)   
[puppeteer github](https://github.com/GoogleChrome/puppeteer)   


[The 10 Best Data Scraping Tools and Web Scraping Tools](https://www.scraperapi.com/blog/the-10-best-web-scraping-tools)      
[Best Open Source Web Scraping Frameworks and Tools](https://www.scrapehero.com/open-source-web-scraping-frameworks-and-tools/)   
[5 Best JavaScript Web Scraping Libraries and Tools](https://www.codementor.io/hirenpatel545/5-best-javascript-web-scraping-libraries-and-tools-sicow2rx9)   
[Web scraping for web developers: a concise summary](https://medium.freecodecamp.org/web-scraping-for-web-developers-a-concise-summary-3af3d0ca4069)   
[Web Scraping with Puppeteer…](https://blog.bitsrc.io/web-scraping-with-puppeteer-e73e5fee7474)   
[How to scrap that web page with Node.js and puppeteer](https://dev.to/napolux/how-to-scrap-that-web-page-with-nodejs-and-puppeteer-811)   
[Web Scraping with Puppeteer and NodeJS](https://www.scrapehero.com/how-to-build-a-web-scraper-using-puppeteer-and-node-js/)   


[cheerio vs puppeteer](https://www.npmtrends.com/cheerio-vs-puppeteer)   
#### [Why not cheerio](https://github.com/cheeriojs/cheerio)   
>Cheerio is not a web browser
Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript. If your use case requires any of this functionality, you should consider projects like PhantomJS or JSDom.

**youtube src comes in as js and has to be parsed into html to get rich preview data**


## jsdom
[jsdom vs puppeteer](https://www.npmtrends.com/jsdom-vs-puppeteer)   
[An Overview of JavaScript Testing in 2019](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a)   
**List of General Prominent Testing Tools including jsdom**
[jsdom github docs](https://github.com/jsdom/jsdom)   
[Simple Site Scraping With NodeJS And JSDom](https://reustle.org/simple-site-scraping-with-nodejs-and-jsdom)   
**the issue with jsdom is the webpage's api calls to its resouces and jsdom can't tell when these things have been retrieved there is a hack fix but its still a hack**

## Puppeteer
[puppeteer intro article](https://developers.google.com/web/tools/puppeteer/)   
[puppeteer api reference](https://pptr.dev/#?product=Puppeteer&version=v1.15.0&show=outline)   
[Google Puppeteer tutorial : 12 examples to play with](https://www.aymen-loukil.com/en/blog-en/google-puppeteer-tutorial-with-examples/)   
[An Introduction to Web Scraping with Puppeteer](https://medium.com/swlh/an-introduction-to-web-scraping-with-puppeteer-3d35a51fdca0)   

Q: can i get around downloading chromium every time i want an app to use puppeteer?
A: i can use puppeteer-core and point to a separate browser


catching errors
>The page.goto will throw an error if:
>
> there's an SSL error (e.g. in case of self-signed certificates).
> target URL is invalid.
> the timeout is exceeded during navigation.
> the main resource failed to load.
> NOTE page.goto either throw or return a main resource response. The only exceptions are navigation to  about:blank or navigation to the same URL with a different hash, which would succeed and return null.

an error handling example
```
  try {
    await page.waitForSelector('.foo');
  } catch (e) {
    if (e instanceof puppeteer.errors.TimeoutError) {
      // Do something if this is a timeout.
    }
  }
```

### i decided to start with this article
[The true power of Headless Chrome with Puppeteer](https://medium.com/@rjstech/the-true-power-of-headless-chrome-with-puppeteer-48c0f99a5a8d)   


#### GOTCHA: error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory
[How to fix puppetteer error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory](https://techoverflow.net/2018/06/05/how-to-fix-puppetteer-error-while-loading-shared-libraries-libx11-xcb-so-1-cannot-open-shared-object-file-no-such-file-or-directory/)   

**i used the ubuntu one below**
[Chrome Headless doesn't launch on Debian #290](https://github.com/Googlechrome/puppeteer/issues/290)   
> On Ubuntu 18.04 we had to install these:

```
sudo apt-get install -y libx11-xcb1 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0 libnss3 libxss1
```

> Strangely enough, on CentOS 7.4.1708 we just had to install:
```
# yum provides '*/libXss.so.1'
sudo yum install libXScrnSaver
```

#### GOTCHA: could not read page.evaluate errors
[Console.log() from page.evaluate() not working ](https://github.com/GoogleChrome/puppeteer/issues/1944)   

suggested using console.log(msg) to see whats available
```
      page.on('console', msg => {
        console.log("on msg test = ",msg);
        console.log("on args test = ",msg.args());
        msg.args().forEach(arg => {
          console.log(arg);
          })
      });
```
**both return values**

[simply put this one works](https://github.com/GoogleChrome/puppeteer/issues/2756)   
*_GOTCHA:  needs to be placed b4 you need it (before page.evaluate)_*

```
      page.on('console', msg => {
        console.log("msg txt = ",msg.text());
      });

      page.evaluate = () => { ...

```

```
      page.on('console', msg => {
        // console.log("on msg test = ",msg);
        // console.log("on args test = ",msg.args());
        // for (let i = 0; i < msg.args.length; ++i)
        // //   console.log(`${i}: ${msg.args[i]}`);
        // msg.args().forEach(async (arg,ndx) => {
        //   console.log(`msg ${ndx}`,await arg.jsonValue());
        // });

        console.log("msg txt = ",msg.text());
      });

```
[some other hint (about nothing)](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-consolemessagetext)   
> i could only find fragments on this subject - no real tutorials

## Waits
[examples from this page](https://dev.to/napolux/how-to-scrap-that-web-page-with-nodejs-and-puppeteer-811)   
```
    await page.goto(URL, {waitUntil: 'networkidle0'});
    await page.waitForSelector('body.blog');
```
[explain networkidle0](https://stackoverflow.com/questions/46160929/puppeteer-wait-for-all-images-to-load-then-take-screenshot/46217285)   
>networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms
>
>networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.


[load vs networkidle - forum](https://github.com/GoogleChrome/puppeteer/issues/1666)   

>The "load", "networkidle0" and "networkidle2" arguments tell puppeteer when to consider navigation
successful. In this regards, "load" and "networkidle" arguments are orthogonal:
>
>load argument corresponds to the load event in the page. In certain cases, it might not happen at all
networkidle0 argument considers navigation successful when page has no network activity for half a second. This might never happen if the page is constantly loading multiple resources.
networkidle2 argument considers navigation successful when page has no more then 2 network requests for half a second. This is useful if page runs a long polling in the background.
Different arguments work for different pages. When neither of them work, a good solution would be to navigate with domcontentloaded argument and then simply wait for the needed element to appear on page:

```
  await page.goto('http://example.com', {waitUntil: 'domcontentloaded'});
  await page.waitForSelector('h1');
```
[lead on page.ensureNavigation](https://github.com/GoogleChrome/puppeteer/issues/3083)   
[scraping pages with infinite scroll](https://intoli.com/blog/scrape-infinite-scroll/)   

[more on page.waitfor()](https://github.com/GoogleChrome/puppeteer/issues/91)   

#### GOTCHA: puppeteer memory leak
FATAL ERROR: Committing semi space failed. Allocation failed - process out of memory
[Memory leak when scraping a lot of websites](https://github.com/GoogleChrome/puppeteer/issues/1340)   
>You're launching a new browser instance on every call to findEmail. That'll be a lot of overhead and memory consumption. Instead, launch Chrome once and create/close a page per URL.

i closed the browser before each error callback return. i wasn't closing this so the next run was opening a new browser with the old one still open
```
    if(has_error == true){
      console.log(error_msg);
      await browser.close();
      return callback(error_msg,null);
    }

```

[i need to change the default timeout of 30s](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#framewaitforfunctionpagefunction-options-args)   
#### goto waitUntil
```
page.goto(url[, options])
url <string> URL to navigate page to. The url should include scheme, e.g. https://.
options <Object> Navigation parameters which might have the following properties:

timeout <number> Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout. The default value can be changed by using the page.setDefaultNavigationTimeout(timeout) or page.setDefaultTimeout(timeout) methods.

waitUntil <string|Array<string>> When to consider navigation succeeded, defaults to load. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:

load - consider navigation to be finished when the load event is fired.

domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.

networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.

networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.

referer <string> Referer header value. If provided it will take preference over the referer header value set by page.setExtraHTTPHeaders().
returns: <Promise<?Response>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.


The page.goto will throw an error if:

there's an SSL error (e.g. in case of self-signed certificates).
target URL is invalid.
the timeout is exceeded during navigation.
the main resource failed to load.

```

```
  await page.goto(url, {waitUntil: 'domcontentloaded', timeout:10000});

  or

  page.setDefaultTimeout(10000);
```


#### it still taking too long, how about a more dynamic selector
regular selector
```
let meta_els = head.querySelectorAll("meta");
```
#### css guide research
```
  [foo^="bar"]  Selects ay element with an attribute foo whose value begins with "bar"
  [foo$="bar"]  Selects ay element with an attribute foo whose value ends with "bar"
  [foo*="bar"]  Selects ay element with an attribute foo whose value contains the substring "bar"
```


power selector
```
        let meta_els = head.querySelectorAll(`
          meta[property^='og:'],
          meta[property^='twitter:'],
          meta[itemprop='title'],
          meta[itemprop='description'],
          meta[itemprop='image']`
        );//

```

> i like the new one although it negates my entire process since it comes in narrowed down

>here is the real delay culpret. i had it waiting until 10s - (crazy) -
*_GOTCHA: waitFor happens after page returns from page.goto - use waitUntil to wait during request_*
```
      // await page.waitForSelector('meta');
      console.log("[time stamp] ",Date());
      await page.waitFor(10000)
      .catch(err => {
        has_error = true;
        error_msg = `page waitfor error ${err}`;
      });

      if(has_error == true){
        console.log(error_msg);
        await browser.close();
        return callback(error_msg,null);
      }

      console.log("[time stamp] ",Date());
```

[Tips and Tricks for Web Scraping with Puppeteer](https://hackernoon.com/tips-and-tricks-for-web-scraping-with-puppeteer-ed391a63d952)   
[Using Mocha with Puppeteer](https://checklyhq.com/docs/browser-checks/using-mocha/)   
[Web Scraping with a Headless Browser: A Puppeteer Tutorial](https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial)   
[npm cheerio](https://www.npmjs.com/package/cheerio)   
