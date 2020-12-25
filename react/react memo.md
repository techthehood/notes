# React Memo

ReactListItems.js
```
  ListItem = React.memo( ({index}) =>
  {
    // // console.warn(`updating [ListItem index]`,index);
    // i need all these things but in its own separate component, ready to create a single item
    // it needs to be replaced with something that recieves only the index i want to display
    // let target_data = category_array[tVar.x];
    // console.warn("[listItem] rerendering", index);

    // variables and such...

    return (
      (index == ndx_calc && this.has_more.current) ?
        // <div className="list_item_observer"  data-ndx={index} ></div>
        <div className={`list_item_wrapper ${s.app_state.text_view}`} ref={this.observerCallback}
          key={`${tVar.view_prefix}${ancestor}_${tVar.myIn_id}`} data-ndx={index}
          data-list_wrap={tVar.myIn_id} style={{border:"1px solid #6dec8b"}} >
          {react_list}
        </div>
       :
        <div className={`list_item_wrapper ${s.app_state.text_view}`} key={`${tVar.view_prefix}${ancestor}_${tVar.myIn_id}`}
          data-ndx={index} data-list_wrap={tVar.myIn_id}>
          {react_list}
        </div>
    );

      // return result;

  });


  let ul_obj = (ListItem != null) ?
  (
    <Ul_list tVar={s} >
      {(exists(this.init.current)) ?
      <VirtualScroll
        name={"core_vscroller"}
        prefix={this.state.view_prefix}
        itemCount={order_ary.length}
        height={height}
        childHeight={vScroll_child_height}
        Item={ListItem}
        renderAhead={this.state.renderAhead}
        padding={0}
        hide_scroll={true}
        observer={this.observerCallback}
        loading={this.loading}
        has_more={this.has_more.current}
        position={this.position.current}
        save_position={this.save_position}
        iUN={this.state.iUN}
        refresh={{callback: this.refresh_binder, timer: 2000}}
      /> : null }
    </Ul_list>
  )
  : null;

return(
  <Fragment>
    <Filter state={this.state} prefix={this.state.view_prefix} />
    {ul_obj}
  </Fragment>
);
```
**memo changes when prop 'index' changes**
**ListItem is eventually passed as Item={ListItem}**
> i believe a capital letter is eventually needed now or later for this to be used as a component   


VirtualScroll
```
  const VirtualScroll = React.memo(({
  // const VirtualScroll = ({
    iUN:props_iUN,
    name,
    prefix = "",
    Item,/*this is the mapping template for the list items*/
    itemCount,

    // more variables and such...

    const visibleChildren = React.useMemo(
      () =>
        new Array(visibleNodeCount)
          .fill(null)
          .map((_, index) => {
            // do something
            let tru_ndx = index + startNode;
            // // console.warn("[map] index",index);
            // // console.warn("[map] tru index",tru_ndx);

            // if(restock && tru_ndx > itemCount - renderAhead && tru_ndx > last_request_section.current){
            //   // run this request once per section
            //   last_request_section.current = itemCount;
            //   // console.warn(`[rendered at] itemCount ${itemCount} - renderAhead ${renderAhead}`, itemCount - renderAhead);
            //   // console.warn("running mock request callout");
            //   // console.warn("[visibleChildren] itemCount",itemCount);
            //   restock();
            // }
            return(
              <Item key={tru_ndx} index={tru_ndx} />
            );
        }),
      [startNode, visibleNodeCount, Item]
    );
```
**my memo is passed into another memo to be used as a component and passed prop 'index'**
