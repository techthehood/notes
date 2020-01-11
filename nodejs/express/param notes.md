# Param examples
// node-course/task-manager/src/routers/task.js
```
  const express = require("express");
  const router = new express.Router();
  const auth = require("../middleware/auth");
  const Task = require("../models/task");

  router.get("/task/:id", auth, async(req, res) => {
     console.log("[task req params]",req.params);

     const _id = req.params.id;
     // https://mongoosejs.com/docs/queries.html
     try {

       // const task = await Task.findById(req.params.id);

       //i need to also add the owner property - findById doesn't work with multiple fields
       console.log(`[test id] id`,req.user.id);
       console.log(`[test id] _id`,req.user._id);

       const task = await Task.findOne({_id, owner:req.user._id});

       if(!task){
         console.log("[task] no task was found with that id");
         res.status(404).send()
       }

       res.send(task);

     } catch (e) {
            console.log("[task id error]",e);
            res.status(500).send();
     }
  })

  router.patch("/task/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = updates.every( entry => allowedUpdates.includes(entry) );
    const _id = req.params.id;

    if (!isValidOperation) {
      return res.status(400).send({error:"invalid updates"});
    }

    try {
      // https://mongoosejs.com/docs/queries.html
      // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
      // const task = await Task.findById(req.params.id);
      const task = await Task.findOne({_id,owner:req.user._id});


      if (!task) {
        return res.status(404).send();
      }

      updates.forEach( entry => task[entry] = req.body[entry] );

      await task.save();

      res.send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.delete('/task/:id', auth, async (req, res) => {

    const _id = req.params.id;
    try {
      console.log("[task delete]",req.params.id);

      // GOTCHA: will fail without await!!
      // https://mongoosejs.com/docs/queries.html
      // const task = await Task.findByIdAndDelete(req.params.id);
      const task = await Task.findOneAndDelete({ _id,owner:req.user._id })

      if (!task) {
        res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(400).send();
    }
  })
```
