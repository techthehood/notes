# React Portal

### Articles
[Portals](https://reactjs.org/docs/portals.html)   
```
ReactDOM.createPortal(child, container)
```
>The first argument (child) is any renderable React child, such as an element, string, or fragment.
The second argument (container) is a DOM element.

[How to use ReactDOM.createPortal() in React 16?](https://stackoverflow.com/questions/46393642/how-to-use-reactdom-createportal-in-react-16/46435051#46435051)   
[React Portals: What are they and why should we use them?](https://levelup.gitconnected.com/react-portals-what-are-they-and-why-should-we-use-them-7c082a62e8fa)   


#### What is the different between ReactDOM.render and ReactDOM.createPortal?

Even though the component rendered through the portal is rendered somewhere else (Outside the current container root), it remains present as the child of the same parent component. (Who invoked the ReactDOM.createPortal) So any events on the child are propagated to the parent. (Ofc, This doesn't work if you manually stop the propagation of the event.)

Same context is accessible inside the component rendered through a portal. But not in the case when we do ReactDOM.render directly.

#### my sample

MainCore
```
  let snap_data = {
    name:"snap_core",
    icons:[],/*"clock","bookmark","books"*/
    labels:[],/*"clock","bookmarks","library"*/
    extras:{},
    add_options: true,
    // iUN,/*doesn't need to add one */
    section_callback: update_section,
    align:"export",// "bottom"
    export:"arc_footer",
    mode:"scroll",
    start_ndx: 1,
    // device_type,/*also not needed*/
    ctrl:{
      justify:"center",
      style:{
        width:"1.75rem",
        margin:"5px"
      }
    }
  };
```
**Notice export:"target-element-name" and align:"export"**

snapper.js
```
  import Exporter from '../Exporter';

  ...

  // inside Snapper component

  let ctrl_align = (this.exists(s.ctrl) && this.exists(s.ctrl.align) ) ? s.ctrl.align : (this.exists(s.align)) ? s.align : "top",/* bottom, low, lower, down - anything else will be top */
  export_class = (this.exists(s.ctrl) && this.exists(s.ctrl.export) ) ? s.ctrl.export : (this.exists(s.export)) ? s.export : "",

  ...

  switch (ctrl_align) {
            case "bottom":
            case "low":
            case "lower":
            case "down":
            case "under":
              bottom_ctrls = snap_ctrls;
              top_ctrls = null;
              break;
            case "export":
              top_ctrls = (
                <Exporter home={export_class}>
                  {snap_ctrls}
                </Exporter>
              );
              break;
            default:
              // otherwise default to top controls
              top_ctrls = snap_ctrls;
              bottom_ctrls = null;
          }

```

#### Portal Exporter component
```
  const Exporter = (props) => {
    let export_class = props.home;
    let export_str = (export_class.includes(".")) ? export_class : `.${export_class}`;
    let export_home = document.querySelector(export_str);

    return ReactDOM.createPortal(
      <>
        {props.children}
      </>
      ,export_home);
  }

  export default Exporter;
```
**GOTCHA**:
>there was an error when i tried to create portal in the switch block.
the component wasn't mounted yet and neither was handlebars template.  
Using a component and returning the ReactDOM.createPortal helped delay the render**   

[React Uncaught Error: Target container is not a DOM element](https://stackoverflow.com/questions/50833694/react-uncaught-error-target-container-is-not-a-dom-element)   
> "The way you have it, it runs before you even have DOM."
