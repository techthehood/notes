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
