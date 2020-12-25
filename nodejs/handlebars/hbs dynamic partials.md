# hbs dynamic partials

#### prep .env file
```
  USE_LOCAL_FILES='true'
```

#### prep config keys to read .env file
```
  const dotenv = require('dotenv');
  dotenv.config();// .env has to be in the site root to work


  module.exports = {
    use_local_files:process.env.USE_LOCAL_FILES
  }
```

#### prep router render variable
```
  const keys = require('../configuration/keys');

  ...

  res.render('alight', {
    title:'push tester',
    name: 'your pusher',
    use_local_files: keys.use_local_files
  })
```

#### register helper functions
```
  hbs.registerHelper('vendor', function(name, use_local_files) {
    console.log(chalk.red(`[vendor] use_local_files`),name, typeof name);
    console.log(chalk.red(`[vendor] use_local_files`),use_local_files, typeof use_local_files);
      return (typeof use_local_files == "string" && use_local_files == "true") ? `${name}_local` : name;
  });
```

#### prep template.hbs to use dynamic partial
```
  {{>(vendor 'vendor' use_local_files)}}
  {{>(vendor 'pp_vendor' use_local_files)}}
```
**pass in render variable**

#### modify partials to load local scripts
```
  <script type="text/javascript" crossorigin src="./locals/prop-types@15.7.2/prop-types.js"></script>
  <script type="text/javascript" crossorigin src="./locals/mobx@5.15.0/lib/mobx.umd.js"></script>
  <script type="text/javascript" crossorigin src="./locals/axios@0.19.0/dist/axios.js" ></script>
```
**use ./ to start local paths from the public folder**

#### prepare/save the local files in the desired public folder directory
> i just right click view page source the working links in the browser and copied and pasted its content into my created files.
