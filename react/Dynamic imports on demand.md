# React Dynamic imports on demand


#### [Loading React Components Dynamically on Demand](https://sung.codes/blog/2017/12/03/loading-react-components-dynamically-demand/)   
> i like this articles idea

[Code splitting with webpack dynamic import in React](https://blog.pusher.com/code-splitting-webpack-dynamic-import-react/)   
**ctrl - f search for spinner**

```
  import Loadable from 'react-loadable';
    import Spinner from 'react-spinkit';

    const Loading = () => <Spinner name="double-bounce" />;

    const Home = Loadable({
      loader: () => import('./Home'),
      loading: Loading
    });

    const About = Loadable({
      loader: () => import('./About'),
      loading: Loading
    });
```
[react-loadable](https://github.com/jamiebuilds/react-loadable)   
[npm react-loadable](https://www.npmjs.com/package/react-loadable)   


Spinners
[react-spinners docs](https://github.com/davidhu2000/react-spinners)   
[react-spinkit docs](https://github.com/KyleAMathews/react-spinkit)   

[the king of spinners: spin.js](https://www.npmtrends.com/spin.js)    
[spin.js docs](https://spin.js.org/)    

#### Sample data coming from the server
```
  return res.render('details', {
    title:'details title',
    name: 'someone\'s name',
    data,
    preset/*,
    data_str*/
  });

```

data processed in hbs (handlebars)
> trying to manage the data directly from the server causes an error

Uncaught SyntaxError: Unexpected identifier

i had to use a helper function
```
  hbs.registerHelper('json', function(context) {
      let data_str = JSON.stringify(context);
      return JSON.stringify(data_str);
  });
```
> my result is a json string

add tool.template = 'DefaultProfile' and tool.name = 'profile' to the preset data

```
  Item..findOneAndUpdate({_id:ObjectId('5e06532a920b8127bc4cab55')},{$set:{'tool.template':'DefaultProfile'}})
```
### using react lazy

####

templates/profile/BasicProfile.js
```
  const basicProfile = props => {
    // props.children;
    return <h1>I am a basic template</h1>;
  }

  export default basicProfile;
```

#### Use a single file to trigger the lazy load.
**Can i use webpackChunkName?**   
> a single file used to fun the functions that will load the scripts and create the components on demand

templates/profile/index.js
```
  import { lazy } from "react";

  console.log("[loading lazy]");

  const BasicProfile = lazy(() => import(/* webpackChunkName: "Basic" */ `./BasicProfile`));

  const SomeProfile = lazy(() => import(/* webpackChunkName: "Some" */ `./SomeProfile`));

  const AnotherProfile = lazy(() => import(/* webpackChunkName: "Another" */ `./AnotherProfile`));

  // const DefaultProfile = lazy(() => import(/* webpackChunkName: "Default" */ `./DefaultProfile`));// Default fails


  export default {/*DefaultProfile,*/ BasicProfile, SomeProfile, AnotherProfile} ;
```
**webpackChunkName works but doens't seem to work at all on components named using \Default*\ or chunks named 'Default'**   
> i could have used multiple individual files for this but one file is more efficient and separate files don't add
> any benefit since the script still isn't loaded until needed while still using one file to distribute from.

#### Sample calling the lazy loaded component dynamically from the server data

app.js
```
    import React, { Suspense } from "react";
    import Templates from '../../../../../templates/profile/index';

    export const react_simple_details = function(e,vID,mDH,pfx,sObj)
    {

      ...

      let ProfileComponent = Templates[PRESET_DATA.preset.tool.template];//

      let test_view = (
        <ErrorBoundary>
          <Suspense fallback={<div className="loader">Loading...</div>} >
            <ProfileComponent />
          </ Suspense>
        </ErrorBoundary>
      );

      ...

      react_modal = (
        <Modal data={modal_data}>
          <Snapper data={ Snap_data }>
            {profile_view}
            {details_view}
            {test_view}
          </Snapper>
        </Modal>
      )

      ReactDOM.render(
        react_modal,
        modal_home
      );

      ...

```
#### GOTCHA: **This method originally failed without the use of React.Suspense '<Suspense></Suspense>'**
>When using devtools the hover feature for previewing a variables contents didn't work on any of the imported components like it did for some of the required modules so i was completely in the dark.  Adding Suspense finally did the trick.

#### save webpackChunkName to folders
```
  const BasicProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Basic" */ `./BasicProfile`));

  const SomeProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Some" */ `./SomeProfile`));

  const AnotherProfile = lazy(() => import(/* webpackChunkName: "templates/profile/Another" */ `./AnotherProfile`));
```
**create directories by adding them 'without leading slashes'**
[Specify output directory with dynamic import](https://github.com/webpack/webpack/issues/5401)   
