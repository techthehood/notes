

#### Handlebars component process
register the partial

index.js (server)
```
    const my_PartialsPath = path.join(__dirname,"../public/quick-link/views");

    console.log("[my_PartialsPath]",my_PartialsPath);

    hbs.registerPartials(my_PartialsPath);

```

add a script to the head (defer)
main.hbs
```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    {{>partial_head}}
  </head>
  <body>

  </body>
</html>

```

partial_head.hbs
```
  <script type="text/javascript" src="./my_partial/js/app.js" defer ></script>
  <link rel="stylesheet" href="./quick-panel/css/style.css">
  <!-- <link rel="stylesheet" href="./css/responsive.css"> -->
  <link rel="stylesheet" href="./my_partial/css/my_partial_module.css">
```

add the partial to its parent element
main.hbs
```
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
      {{>partial_head}}
    </head>
    <body>
      <div id="element_parent">
        {{>partial_content}}
      </div>
    </body>
  </html>
```
partial_content.hbs
```
  <div class="wrapper">
      <!-- Sidebar -->
      <nav id="sidebar" class="qp_panel dark_bg">

          <div id="qp_close_cont" class="qp_close_cont">
              <a id="qp_panel_cls_btn" class="qp_panel_cls_btn dismiss close_btn d3-btn" >Close panel</a>
          </div>
      </nav>

  </div>

```
[css files not found using express-handlebars](https://stackoverflow.com/questions/41582026/css-files-not-found-using-express-handlebars)   
> i need to write up on how to add scripts
