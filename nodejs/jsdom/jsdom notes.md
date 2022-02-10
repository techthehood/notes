
[jsdom docs](https://github.com/jsdom/jsdom)   
[jsdom NPM](https://www.npmjs.com/package/jsdom)   

#### installation

```
  npm i jsdom
```

*get_jsdom_data.js*

#### the setup

```
  const request = require("request");
  const jsdom = require('jsdom');
  const display_console = false;


  await request(url, async (error, response, html) => {

    const dom = await new JSDOM(html);

  ...

```


```
  let meta_els = dom.window.document.querySelectorAll(`
    meta[property^='og:'],
    meta[property^='twitter:'],
    meta[name^='twitter:'],
    meta[itemprop='title'],
    meta[itemprop='description'],
    meta[itemprop='image']`
  );
  if (display_console || true) console.log("[meta_els] meta_els ", meta_els);// NodeList {}


  meta_els = Array.from(meta_els);

  if (display_console || true) console.log("[meta_els] meta_els ", meta_els);
  // returns [
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {},
    HTMLMetaElement {}, HTMLMetaElement {}
  ]

```

#### finally some traction

```
  meta_els = Array.from(meta_els);

  if (display_console || true) console.log("[meta_els] attributes ", JSON.stringify(meta_els[0]?.attributes));
  //returns {"0":{},"1":{}}
  if (display_console || true) console.log("[meta_els] get atttribute names ", meta_els[0]?.getAttributeNames());
  //returns ['property', 'content' ]


  meta_els.forEach((entry) => {
    const attribs = entry?.getAttributeNames();
    console.log("[meta_els] attribs ", attribs);
    attribs.forEach((att) => {
      console.log("[meta_els] attribs ", entry?.getAttribute(att));
    })
  })
```

#### sample attributes from meta_els forEach getAttributeNames & attribs forEach getAttribute

```
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:title
  [meta_els] attribs  @laclippers | Linktree
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:description
  [meta_els] attribs  Linktree. Make your link do more.
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:url
  [meta_els] attribs  https://linktr.ee/laclippers
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:image
  [meta_els] attribs  https://d1fdloi71mui9q.cloudfront.net/naUeO1dkTKz99NVBXe5g_f82ec8fcdc236b6abadf12ced2c1d3f4
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:image:secure_url
  [meta_els] attribs  https://d1fdloi71mui9q.cloudfront.net/naUeO1dkTKz99NVBXe5g_f82ec8fcdc236b6abadf12ced2c1d3f4
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:updated_time
  [meta_els] attribs  1637026729000
  [meta_els] attribs  [ 'name', 'content' ]
  [meta_els] attribs  twitter:title
  [meta_els] attribs  @laclippers | Linktree
  [meta_els] attribs  [ 'name', 'content' ]
  [meta_els] attribs  twitter:description
  [meta_els] attribs  Linktree. Make your link do more.
  [meta_els] attribs  [ 'name', 'content' ]
  [meta_els] attribs  twitter:image
  [meta_els] attribs  https://d1fdloi71mui9q.cloudfront.net/naUeO1dkTKz99NVBXe5g_f82ec8fcdc236b6abadf12ced2c1d3f4
  [meta_els] attribs  [ 'name', 'content' ]
  [meta_els] attribs  twitter:card
  [meta_els] attribs  summary_large_image
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:image:height
  [meta_els] attribs  600
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:image:type
  [meta_els] attribs  image/jpg
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:image:width
  [meta_els] attribs  600
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:locale
  [meta_els] attribs  en_US
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:site_name
  [meta_els] attribs  Linktree
  [meta_els] attribs  [ 'property', 'content' ]
  [meta_els] attribs  og:type
  [meta_els] attribs  profile
  [meta_els] attribs  [ 'name', 'content' ]
  [meta_els] attribs  twitter:card
  [meta_els] attribs  summary_large_image
  [meta_els] attribs  [ 'name', 'content' ]
  [meta_els] attribs  twitter:domain
  [meta_els] attribs  Linktree
```

> so the get_jsdom_meta.js script is basically the same as the get_parsed_meta.js script with a few exceptions
> there is no attribs property 

```
  let m_prop = mdata.attribs["property"];
```
**fails**
> i tried using getAttribute with cheerio and it failed.  the two don't share properties

> for the most part the change was to write out the attribute getter instead of using abbreviations.
> and i tested for property and name which were the 2 promenent attributes containing the og:* and twitter:* strings

```
  let m_prop = mdata.getAttribute("property") || mdata.getAttribute("name");

```
**works**