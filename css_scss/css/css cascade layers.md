# CSS cascade layers notes

## Articles
[Cascade layers are coming to your browser](https://developer.chrome.com/blog/cascade-layers/)   
> this seems like a well written article but i think it fails to recognize the normal cascade specificity of css elements (selectors written after other selectors gain specificity compared to similarly specific selectors)

[BEM Visually Explained](https://keepinguptodate.com/pages/2020/05/bem-visually-explained/)   

**intro.scss**
> layers are order from lowest priority to highest priority
```
@layer reset, base, alight;

@layer reset{

}
```

> loads in the header of alight.hbs file
```
  this way i guarantee its the first layer mentioned and therefore dominates all other mentions and controls the layer order
```

IMPORTANT GOTCHA ISSUE: !important tag works in the opposite direction of the normal priority function of layers.

!important priority is lowest in the highest layer and highest in the lowest layer.
