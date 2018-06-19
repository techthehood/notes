

template in a template

this works without expressions

nav.html
```
<div class="" style="border:5px solid red">
  <h1 >nav html</h1> {{take1.getAttribute(section)}}
  <div class="blog-module" data-motiv="test"
  data-marquee="blog_module" data-mode="admin" data-home="../core/"
   ></div>
</div>
```

test.html
```
<div class="" style="border:5px solid blue;">

</div>

```

but as soon as i try to put an expression it breaks

nav.html
```
<div class="" style="border:5px solid red">
  <h1 >nav html</h1> {{take1.getAttribute(section)}}
  <div class="blog-module" data-motiv="test"
  data-marquee="{{take1.marquee}}" data-mode="admin" data-home="../core/"
   ></div>
</div>
```