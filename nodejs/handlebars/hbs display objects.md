# hbs display objects (double quote in a double quote)

```
  const viewItemDetails = async function(req, res)
  {

    console.log(chalk.red("[req params]"),req.params)
    console.log(chalk.green("[params] val1"),req.params.val1);
    console.log(chalk.green("[params] val2"),req.params.val2);
    console.log(chalk.green("[params] val3"),req.params.val3);

    if(!req.params.val1 && !req.params.val2 && !req.params.val3){
      // http://localhost:3000/view/
      // view will still try to run the details view without any directing data - this prevents interval
      // it also prevents view from showing the consoles js.map and css.map data
      res.render('404', {
        title:'404',
        errorMessage:'article not found'
      });
      return;
    }

    console.log(`[index] running!`);

    let data = await Item.findOne({ _id: "5dd5843d19bfc11bec9c96bb"}).lean();

    console.log(chalk.yellow("[data]"),data);

    let replace_string = async (tObj) => {
      for(prop in tObj){
        let isValid = mongoose.Types.ObjectId.isValid;
        console.log("[prop]",tObj[prop], typeof tObj[prop]);
        tObj[prop] = (isValid(tObj[prop])) ? tObj[prop] : (typeof tObj[prop] == "object") ? await replace_string(tObj[prop]) :
        (typeof tObj[prop] == "string") ? tObj[prop].replace(/"/g,'\"') : tObj[prop];// (isValid(tObj[prop])) ? tObj[prop] :
      }
      return tObj;
    }

    // data = data.title_data.replace('"','');
    // data = await replace_string(data);// i even tried to change the var to mod_data just in case direct changes to data were restricted

    let data_str = JSON.stringify(data)
    data_str = JSON.stringify(data_str)

    console.log(chalk.blue("[data]"),data);// my changes aren't showing up here
    console.log(chalk.cyan("[data_str]"),data_str);// once stringified my escaped quotes show up

    res.render('details', {
      title:'details title',
      name: 'someone\'s name',
      data/*,
      data_str*/
    });
  }
```

> this replace string fn was my first attempt to escape the quotes in a quote
> i even tried to use removeSomething
> eventually i learned that all i had to do was stringify the data twice. the second stringify would replace all the
> nested double quotes with escaped double quotes.  Ultimately I decided to do the escaping on the client side that way i could limit how much data was being sent down.
