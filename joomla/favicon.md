# favicon notes

logo blue color: #003266
logo teal color: #408080

**favicon update**
- [x] create a favicon notes md file
- [ ] pin inkscape to the start menu
- [ ] import jakeel mini logo into inscape
   - create an svg?
     - [ ] y
     - [ ] n
- [ ] create jakeel favicon of appropriate size
    - [ ] research favicon size
- [ ] add favicon to template
- [ ] research ios version of favicon
- [ ] add ios version to template


##### [How to add a favicon to your website](https://www.youtube.com/watch?v=eDrToBd_f2U)   
*_looks like a good video_*   
[favion generator](http://realfavicongenerator.net/)

*i moved my favicons from the template root to the site root/images/favicons*
```
  <jdoc:include type="head" />
  <link rel="apple-touch-icon" sizes="180x180" href="./images/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="./images/favicons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="./images/favicons/favicon-16x16.png">
  <link rel="manifest" href="./images/favicons/site.webmanifest">
  <link rel="mask-icon" href="./images/favicons/safari-pinned-tab.svg" color="#1a3867">
  <meta name="msapplication-TileColor" content="#2b5797">
  <meta name="theme-color" content="#ffffff">

```

*i hoped the ./ would force the url to use a relative path starting from the root*
