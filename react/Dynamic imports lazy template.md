# React Dynamic imports lazy load templates

#### 1. setup basic components
```
  const basicProfile = props => {
    // props.children;
    return <h1>I am a basic template</h1>;
  }

  export default basicProfile;

```

#### 2. setup a template hub
```
  import { lazy } from "react";

  console.log("[profile] loading lazy");

  const BasicProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Basic" */ `./BasicProfile/BasicProfile`));

  const SomeProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Some" */ `./SomeProfile`));


  export default { BasicProfile, SomeProfile } ;

  // ATTN: the names i.e. "templates/profile/Basic" are correct. it allows my to create separate files
  // in the templates/profile folder - i want each of these templates to only load if the user interacts with
  // them otherwise they will never be loaded.
```

#### 3. import template hub and add a variable to the hub object to call a template component dynamically
#### **3b remember to import Suspense from react**
```
  import React, { Suspense, useEffect, useState } from "react";
  import Templates from '../../../../../templates/profile/index';

  export const react_simple_details = function(e,vID,mDH,pfx,sObj)
  {

    ...

    let ProfileComponent = Templates[PRESET_DATA.preset.tool.template];//

    ...
```

#### 4. use suspense to wrap the template and activate reacts lazy template processing
```

  <Suspense fallback={<div className="loader"></div>} >
    <ProfileComponent />
  </ Suspense>
```


a quick react lazy on demand (same file)
```
  import { Suspense, lazy } from 'react';

  const xyz = () => {

    ...


    const Paper = lazy(() => import(/* webpackChunkName: "paper" */ '../elements/Paper/Paper'));// importing a react component needs lazy
    console.log(Paper);
    react_modal = (
      <Suspense fallback={<div className="loader"></div>}>
        <Paper data={{item: data_obj}} />
      </Suspense>
    );

    ...

  }// xyz
```


#### i also called it directly

LazySelectOptions.js
```
  import { lazy } from "react";

  console.log("[SelectOptions] loading lazy");

  const SelectOptions = lazy(() => import(/* webpackChunkName: "section" */ `./SelectOptions`));

  export default SelectOptions ;
```
MainCore.js
```
  import SelectOptions from '../elements/SelectOptions/LazySelectOptions';
  ...

  let section_option_el = (
    <MainProvider store={state}>
      <Suspense fallback={<div className="loader"></div>} >
        <SelectOptions />
      </Suspense>
    </MainProvider>
    );
```
