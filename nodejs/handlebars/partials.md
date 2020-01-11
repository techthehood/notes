
#### registerPartials
index.js (express)
```
  hbs.registerPartials(partialsPath);
  // hbs.registerPartial(partialsPath);
```
> does not work without the s in partials

index.hbs
```
  {{>header}}
```
> doesn't work witout the '>'

#### how do i get the partial to reference and run js and css?
with webpack i can refer to the js file using a script tag and i can import/require js & css

i can try adding the path to the partial using an array then using both a appname-header & appname-body .hbs file to
access the partials in the given dir
**the array doesn't work but adding a path the the folder containing the partial i want to use does**
index.js
```
  // set up the partials path
  const partialsPath = path.join(__dirname,"../templates/partials");
  const qlPartialsPath = path.join(__dirname,"../public/quick-link/views");

  console.log("[partialsPath]",partialsPath);
  console.log("[qlPartialsPath]",qlPartialsPath);

  //hbs.registerPartials([partialsPath,qlPartialsPath]);//fails

  hbs.registerPartials(partialsPath);//works
  hbs.registerPartials(qlPartialsPath);//works
```

#### GOTCHA: partials don't like dash separated names
```
  {{>ql-header}}// failed
  {{>ql_header}}// worked
```
**same filenames**
