


[refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)   
> their example not mine
```
  class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

#### accessing refs
> When a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of the ref.
```

const node = this.myRef.current;
```

use refs in a functional component
```
  // FormStore.snapper = React.createRef();
  FormStore.snapper = useRef();
```

updating the ref
```
  let switch_to_form = useRef(false);


useEffect(() => {
    if(switch_to_form.current == true){
      // FormStore.snapper.current.show_section('','',{ iUN: FormStore.snapper.iUN, index:1, mode:"scroll"});
      FormStore.snapper.current.setState({force_scroll: true, force_section: 1});
      switch_to_form.current= false;
    }//if
  })
```
**dont forget to use the current property**
**works well for accessing getter and setter fns of the component**

### updating a class based component externally
```
  componentDidUpdate = () => {
    if(this.state.force_scroll == true){
      let mode = this.props.data.mode || "scroll";
      this.show_section('','',{iUN: this.state.iUN, index: this.state.force_section, mode});
      this.setState({force_scroll: false});
    }
  }/*componentDidUpdate*/
```
**i think if this would have been useEffect i would have forced an update by having it watch changes in a watch variable and incrementing the variable whenever i wanted it to change/update**

#### GOTCHA: useState

if you use react events and addEventListener using useEffect the addEventListener funtions retained the inital state of state variables not the setState updates.
```
  // document.querySelector(".rating_cont").addEventListener("mouseleave",function(e){true_rating(e)});

  <div data-rate={`${curr_rate}`}
    key={`stack_rate_${iUN}_${curr_rate}`}
    className={`rate_btn icon-star-${star_str} d3-disc d3-ico d3-dot d3-hov-gold`}
    onClick={function (e) { update_rating(e);}}
    onMouseEnter={function (e) {rating_preview(e)}}
    ref={rate_btn}
    ></div>
```

#### using a callback with ref attribute
```
  const user_sections = useRef({});

  ...

  <Arc mode="recent" key={`arc_recent_${iUN}`}
    ref={element => {
      return user_sections.current[recent_id] = element;// recent_index
    }}
    render="delay" path='api/alight/arc' task='getRecent' store={state}
  />
```
