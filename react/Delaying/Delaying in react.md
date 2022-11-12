
I used the delay in **RegisterMe** to add events to elements that depended on the delayed load of a .hbs template

**Hero.hbs**
```
  <div class="register-now-section"> <a href="#" class="register-now-btn register-btn">{{button}}<i
    class="fa fa-long-arrow-right" aria-hidden="true"></i></a> 
  </div>
```

> RegisterMe is a component that delays addEventListener click until that page elements are loaded. 
> once the elemnent is clicked it dynamically loads a react component 

Exporter.js also has a delay feature similar to RegisterMe