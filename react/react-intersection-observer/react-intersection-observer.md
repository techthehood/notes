# react-intersection-observer notes

[react-intersection-observer | NPM](https://www.npmjs.com/package/react-intersection-observer)   

**WWA.js**
```
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: .5,
    triggerOnce: true,
    onChange: (inView, entry) => console.log('Inview:', inView),
  });

  let services_wrapper = (
    <Exporter {...{ home: ".service-details-inner", delay: 1 }}>
      {services_details}
    </Exporter>
  );

  return (
    <div className="About WWA WhoWeAre" ref={ref}>
      <div dangerouslySetInnerHTML={{ __html: h_cont }} />
      {inView ? services_wrapper : null}
      {inView ? content_wrapper : null}
    </div>
  );
```
SUCCESS works - even after wrapping the childnodes in an Exporter component which delays injection into the dom.
NOTE: the threshold = .5 also helped because the top of the wrapper element may already be partially on screen and i need it to wait until its at least half way on screen.

**this attempt failed**   

```
  return (
    <div className="About WWA WhoWeAre">
      <div dangerouslySetInnerHTML={{ __html: h_cont }} />
      <InView triggerOnce={true} threshold={.5}
        onChange={(inView, entry) => console.log('Inview:', inView)}
      >
        {({ inView, ref, entry }) => (
          <>
            {inView ? services_wrapper : null}
            {inView ? content_wrapper : null}
          </>
        )}
      </InView >
    </div>
  );
```
GOTCHA: FAIL
> putting the child elements in a function did nothing. not putting them in a function constitued adding them as plain children and just as in the docs:

Plain children are always rendered. Use onChange to monitor state.

