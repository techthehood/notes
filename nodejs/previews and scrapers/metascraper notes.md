# metascraper notes

## Articles
[]()   
[Example of the various YouTube url formats](https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486)   
[metascraper | npm](https://www.npmjs.com/package/metascraper)   
[metascraper GitHub](https://github.com/microlinkhq/metascraper)   
[]()   
[]()   
[]()   


```
  npm i metascraper
```

#### GOTCHA: failed with node 8.?.?

> i kept getting a warning about a try/catch statement in metascrapers code. come to find out catch {} without 
> a parameter catch(error){} is valid code in versions of node beyond the version i was using.

so i tried to upgrade my node version using nvm

```
  nvm install 14.?.?
  nvm use 14
```

> but the error persisted.  come to find out, even though i programmed nvm to use a certain node version my server 
> running on pm2 was set to use node v 8.?.? when i first started the server and gave it a permanent reference name

*get_site_data.js*
```
  console.log(process.versions);
```
> adding this console log to my script showed me exactly what node version (or npm version) was being used on the system

To fix this issue i had to shut down (i actually deleted) my pm2 server [servername]  then create/start a new one

```
  pm2 delete [servername]
  pm2 start ./path_to_server --name "[servername]"
```
> then when i ran the console i had the correct npm version

##### Sample scraper on server

*controllers/lib/getData/get_site_data.js*

```
  const get_site_data = async (obj, callback) => {

    let url = obj.url;

    let meta_data = "";

    if(display_console || false) console.log("get_site_data url = ",url)

    let has_error = false;
    let error_msg = "";


    try{
    
      await request({
        url,
        agentOptions: {
          rejectUnauthorized: false
        }
      }, async (error, response, html) => {

            if(error){
              console.log(chalk.red("[request] response error"),error);
              return callback(error,null);
            }

          const metadata = await metascraper({ html, url })
          .catch((error) => {
            console.log(`[metascraper] error`, error)
          })
          
          if(display_console || true) console.log(`[metascraper] metadata`,metadata)

          if(metadata.description == null && metadata.image == null){
            // if both the image and description are null then who cares about the title - its empty
            return callback("no meta data available", null);
          }else{
            let meta_str = JSON.stringify(metadata);
            return callback(null, meta_str);
          }
      });// request

    }catch(err){
      console.log(chalk.red("[browser] error"),err);
      return callback(err,null);
    }

  } //get_site_data
```

> returns a simple json 
```
  {
    title: "title string",
    description: "description string",
    image: "https://img-url.jpg",
    logo: null,// usually null
  }
```
> NOTE: a json always comes back even if there is an error message the title will contain the message and all the other props will be null