
i can have 2 values, both strings.  copied from the db.
checking the string and the items will be the same when compared with ==
i can send one and the value not be delivered.
i can send the other and it shows up.
```
    let data_filter = {
      email:"core_data",
      image:"img_url",/*previously url_data*/
      image2:"url_data"
    }

  if(display_console || true) console.log(chalk.cyan("[item reducer] data_filter[data_type]"),data_filter[data_type]);
  let str_1 = item[`${data_filter[data_type]}`];
  if(display_console || true) console.log(chalk.yellow("[item reducer] image1"),);
  let str_2 = item[`${data_filter[`${data_type}2`]}`];
  if(display_console || true) console.log(chalk.red("[item reducer] image2"),str_2);
  if(display_console || true) console.log(chalk.red("[item reducer] same str_1 str_2"),str_1 == str_2);

  // value = item[`${data_filter[data_type]}`];
  value = item[`${data_filter[`${data_type}`]}`];
```
**i even removed the comment from image:"img_url",/*previously url_data*/**

server output
```
  [item reducer] item { _id: 5e2d86bfce73a50888495bf0,
  category: 'profile image',
  title_data: 'google login picture',
  core_data: '',
  desc_data: '',
  url_data: 'https://lh5.googleusercontent.com/-hAYUj7Y2LZs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcnBQE6MaabjBtcXxx1VTncvxoKJA/photo.jpg',
  img_url: 'https://lh5.googleusercontent.com/-hAYUj7Y2LZs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcnBQE6MaabjBtcXxx1VTncvxoKJA/photo.jpg',
  other_data: '',
  note_data: '',
  tag_data: '',
  meta_data: '',
  task_data: '',
  published: false,
  extra: '',
  notification: '',
  admin: true,
  root: false,
  container: false,
  order: 0,
  filter: 'alpha',
  user_id: 5da54e08c72fdb4a0c765b0f,
  type: 'info',
  data_type: 'image',
  ancestor: 5e2d86bfce73a50888495bec,
  alias: '5da54e08c72fdb4a0c765b0f/google-login-picture-50',
  created: 2020-01-26T12:31:59.680Z,
  modified: 2020-02-17T21:10:26.026Z,
  __v: 0,
  path: 'google-login-picture-50',
  priority: 0,
  text_only: false,
  review: '0',
  icon: '' }
[item reducer] data_filter[data_type] img_url
[item reducer] image1
[item reducer] image2 https://lh5.googleusercontent.com/-hAYUj7Y2LZs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcnBQE6MaabjBtcXxx1VTncvxoKJA/photo.jpg
[item reducer] diff str_1 str_2 true
[item reducer] item value https://lh5.googleusercontent.com/-hAYUj7Y2LZs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcnBQE6MaabjBtcXxx1VTncvxoKJA/photo.jpg
[item reducer] result { id: 5e2d86bfce73a50888495bf0,
  _id: 5e2d86bfce73a50888495bf0,
  data_type: 'image',
  value: 'https://lh5.googleusercontent.com/-hAYUj7Y2LZs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcnBQE6MaabjBtcXxx1VTncvxoKJA/photo.jpg',
  published: false,
  extra: '' }
```
