// FAIL: i need to require the full version of handlebars 
// FAIL: needs an html-loader

[handlebars-loader | GitHub](https://github.com/pcardune/handlebars-loader/blob/144127f8cd246742273611680623749d8a0fb94a/examples/basic/app.js)   
[handlebars-loader | npm](https://www.npmjs.com/package/handlebars-loader)   

```
  $ npm i handlebars-loader
```

_webpack.config.js_   

```
  {
    ...
    module: {
      rules: [
        ...
        { test: /\.handlebars$/, loader: "handlebars-loader" }
      ]
    }
  }
```
_component.js_   

```
  var template = require("./file.handlebars");
```

#### sample   

```
  import React from "react";
  import ReactDOM from "react-dom";
  // import Handlebars from "handlebars";

  import "./Hero.scss";

  // const htmlContent = require("./Hero.html");// fails
  // const template = Handlebars.compile(htmlContent);// fails

  import htmlContent from './Hero.handlebars';// works as template fn

  const Hero = (props) => {

    const {
      data
    } = props;

    return (
      <div className="App">
        <div dangerouslySetInnerHTML={{ __html: htmlContent(data) }} />
        {/* <div dangerouslySetInnerHTML={{ __html: template(data) }} /> */}
      </div>
    );
  }

  export default Hero
```

[using an array in handlebars-loader](https://stackoverflow.com/questions/8044219/how-do-i-access-an-access-array-item-by-index-in-handlebars)   

  > The following, with an additional dot before the index, works just as expected. Here, the square brackets are optional when the index is followed by another property:

```
  {{people.[1].name}}
  {{people.1.name}}

  // i used:

  menu.[0]
```

#### [mapping and looping using each](https://handlebarsjs.com/guide/builtin-helpers.html#each)   
[How To: Handlebars - Iterate over Arrays with the Each Helper](http://jsdev.wikidot.com/howto:11)   


```
  <ul class="upper-social-icons">
    {{#each upper_icons}}
      <li><a href="{{href}}" class="{{link}}" target="_blank"><i class="{{font_icon}}"></i></a></li>
    {{/each}}
  </ul>
```

> GOTCHA: i had an ISSUE with trying to add a helper function to process the @index
> it failed. I set the helper in the server script but because this is working on the client side it think
> whever helpers i add to the server fails client side detection

#### accessing parent scoped variables
[Access a variable outside the scope of a Handlebars.js each loop](https://stackoverflow.com/questions/13645084/access-a-variable-outside-the-scope-of-a-handlebars-js-each-loop)   

#### using multiple templates
> see jng main Events component

**App.js**
```
  <MegaOne component="Events"  {...{ data: main_data.events }} >
    <Exporter {...{ home: `.custom_head.summit`, delay: 3 }}>
      <div className="summit head">
        Comming Soon
      </div>
    </Exporter>
    <Exporter {...{ home: `.custom_cont.summit`, delay: 3 }}>
      <div dangerouslySetInnerHTML={{ __html: event_custom }} />
    </Exporter>
  </MegaOne>
```

**jng/js/Main/...Events.js**   
```
  let has_slider = data.img_slider;

  ...

  const h_cont = has_slider ? htmlContent(data) : staticContent(data);

  return (
    <div className="Events" ref={ref}>
      <div dangerouslySetInnerHTML={{ __html: h_cont }} />
      {children}
    </div>
  );
```

**jng/js/Main/..../Head.js**
```
  let h_cont; 
  
  switch (mode) {
    case 'BigHead':
        h_cont = htmlContent2(data);
      break;
  
      default:
        h_cont = htmlContent(data);
      break;
  }

  return (
    <div className={`${mode}`}>
      <div dangerouslySetInnerHTML={{ __html: h_cont}} />
      {/* <div dangerouslySetInnerHTML={{ __html: template(data) }} /> */}
    </div>
  );
```

#### [skipping dot notation](https://handlebarsjs.com/guide/builtin-helpers.html#with)   

**jng/.../Blog.hbs**
```
{{#with main}}
  <span class="sub-title">{{sub}}</span>
  <h2 class="title mb-0">{{title1}}
  <span class="alt-color js-rotating">
    {{title_bold1}}
    {{title_bold2}}</span>
  </span>{{title3}}</h2>
{{/with}}
```
