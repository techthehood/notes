# axios notes

#### canceling an axios request
[axios docs](https://github.com/axios/axios)

[Cant cancel Axios post request via CancelToken](https://stackoverflow.com/questions/44852054/cant-cancel-axios-post-request-via-canceltoken)   
**using axios cancel in a post request**
```
   const CancelToken = axios.CancelToken;
   let source = CancelToken.source();

   source && source.cancel('Operation canceled due to new request.');

   // save the new request for cancellation
   source = axios.CancelToken.source();

   axios.post(url, postData, {
       cancelToken: source.token
   })
   .then((response)=>{
       return response && response.data.payload);
   })
   .catch((error)=>{
       return error;
   });
```
> I actually successfully tried a variation of this flawed and redundant example

#### my example
```
  let cancel_obj = http_obj.obj || {};
  cancel_obj.cancelToken = axios.CancelToken.source();

  // this was probably an example - don't run this in this part of the code or it will throw the cancel()
  // cancel_obj.cancelToken && cancel_obj.cancelToken.cancel('Operation canceled due to new request.');


  try {

    const response = await axios.post(`${location.origin}/api/alight/${path}/${urlMod}`, uploadData,
      {
        cancelToken: cancel_obj.cancelToken.token
      }
    );


  } catch (e) {

    // catch axios cancel error
    if (axios.isCancel(e)) {
      console.warn('Request canceled', e.message);
    } else {
      // handle all other errors
      console.error(`[http.js] fido req error occured`,e);
    }

  }
```
to access it in a useEffect i had to pass down an empty object that i referenced in the useEffect

```
  useEffect(() => {
    let cancel_obj = {};

    get_data(value_filter_options, state.app_state, cancel_obj)
    .then((result_obj) => {
      console.warn(`[Filter] results for ${value}`,result_obj);
      // return;
      return update_binder({result_obj, ancestor, state});
    });

    return () => {
      cancel_obj.cancelToken.cancel('Operation canceled due to new request.');
      console.warn(`cancelToken for ${value}`,cancel_obj.cancelToken);
    }

  },[value]);
```
**axios will later populate my empty object reference with the cancelToken data and
i can later call cancel with it in the hook it originated in**
