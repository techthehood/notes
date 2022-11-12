# DeferMe Notes

Hows this work?

DeferMe works as a lazy loaded component using react Suspense

App.js
```
  return (
    <>
      <MainProvider>
        ...
        <MegaOne component="FixedNav"  {...{ data: main_data.fixed_nav }} />
        ...
        <MegaOne component="DelayDefer" />
        ...
      </MainProvider>
    </>
  )
```

**template_selector.js**   

```
  const FixedNav = lazy(() => import(/* webpackChunkName: "templates/MegaOne" */ `./DigitalAgency/FixedNav`));

  const DelayDefer = lazy(() => import(/* webpackChunkName: "templates/MegaOne" */ `./DigitalAgency/DeferMe/DelayDefer`));

  export default { 
    ... 
    DelayDefer,
    ...
  };
```

**MegaOne.js**

```
  import {Suspense} from 'react';
  import template_selector from './components/template_selector';

  ...


  let Comp = template_selector[component];

  return (
    <Suspense fallback={<div className="loader_modal w3-modal active"><div className="loader">Loading...</div></div>} >
      <Comp {...rest} />
    </Suspense>
  );
```
> the template is retrieved by passing the Component name to the custom template_selector object
> the lazy loaded component is them added to the Suspense method to download the script and render

#### further delays
> i can use DelayDefer component to delay the loading of its scripts and links even longer