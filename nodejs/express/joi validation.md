joi server side validation

#### example
src/helpers/routeHelpers.js
```
  const Joi = require('joi');

  module.exports = {
    validateBody: (schema) => {
      return (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        if(result.error){
          return res.status(400).json(result.error);
        }//if
         // req.value.body instead of req.body
         if(!req.value){req.value = {}; }
         req.value['body'] = result.value;
         next();
      }
    },
    schemas:{
      authSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
    }
  }
```
**do i need joi validation and mongodb schema or is one enough?**

[here is a nice sample of joi validation with mongoose](https://gist.github.com/stongo/6359042)   
