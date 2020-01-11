# postgres tutorial

## recipebook
[Recipe app using node.js and postgreSQL (video)](https://www.youtube.com/watch?v=AFiqctkoVJ4)   

### dependencies
- [postgreSQL (postgres)](https://www.postgresql.org/)   
- [dustjs](https://www.dustjs.com/)   


#### Starting postgres server (windows)
[postgres is started automatically with pgadmin install](https://stackoverflow.com/questions/36629963/how-to-start-postgresql-on-windows/41022830)   
[postgres can be checked using services.msc](https://tableplus.io/blog/2018/10/how-to-start-stop-restart-postgresql-server.html)   
- windows key + ref
- type services.msc
- look for postgresql-x64-11
- use ctrls to start and stop postgres

[postgres can be accesed using the sql shell](https://www.datacamp.com/community/tutorials/installing-postgresql-windows-macosx)   
- press window key
- type psql (windows 10 auto searches even though start menu is showing)
- choose SQL shell program
- type enter 4x once shell is running
- insert password
when you see a postgres=# command prompt you are up and running

### postgres port 5432

local pgadmin browser address
```
  http://127.0.0.1:56831/browser/
```

creating tables and columns
recipebookdb
Schema
tables > create Table
[new Table]
columns > create column

sample of postgres create sql
```
  CREATE DATABASE recipebookdb
    WITH
    OWNER = "test-cook"
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
```
> this is how different or similar it looks to mySQL

**GOTCHA - i had to use the constraints menu to add primary key constraint - there was no read only checkbox to click**

column types

title | type
--- | ---
id | serial
name | character
ingredients | text
description | text


added these package.json dependencies
```
    "dependencies": {
      "body-parser": "*",
      "consolidate": "*",
      "dust": "*",
      "dustjs-helpers": "*",
      "dustjs-linkedin": "*",
      "express": "*",
      "pg": "*"
    }
```

> im using dustjs - similar to handlebars and ejs
research the syntax

[get bootstrap.org](https://getbootstrap.com/docs/4.3/getting-started/download/)   
bootstrap cdns
```
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```

#### GOTCHA - the above cdns didn't work with w3schools boilerplates - i used w3schools bootstrap recommendations
[Bootstrap 4 on w3schools.com](https://www.w3schools.com/bootstrap4/default.asp)   

[jQuery cdn](https://jquery.com/download/)   
> google search: jquery download

[to get the cdn the site refers you to another link](https://code.jquery.com/)   

```
  <script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
```

**GOTCHA: my result.rows === [] - i didn't hit the save icon in pgadmin when i entered the data**

initially using the db data in dustjs
```
  {<body}
    {#recipes}
      {name}
    {/recipes}
  {/body}
```

bootstrap modal and form
```
    <div class="modal fade" id="formModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form class="" action="add" method="post">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Add Recipe</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <div class="form-group">
                <label>Recipe Name</label>
                <input type="text" class="form-control" name="name" value="">
              </div>
              <div class="form-group">
                <label>Ingredients</label>
                <textarea name="ingredients" class="form-control" ></textarea>
              </div>
              <div class="form-group">
                <label>Directions</label>
                <textarea name="directions" class="form-control" ></textarea>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
              <input type="submit" class="btn btn-primary" name="" value="save">
            </div>
          </form>

        </div>
      </div>
    </div>
```
> i made a form with 'name' elements and once the form was submitted it automatically packages a json ready object to the correct url

postgres prepared statements
