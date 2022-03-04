db.items.find({_id: ObjectId("6213fc1aa0b4fa577a0e99e6")}).forEach(async function(results){

    let host = await db.items.findOne({_id: results.ancestor});

    if(host){

      //results.markModified("links");

      let new_pair = {
        // "_id":results._id,
        "host_type":host.data_type,
        "link_type":results.data_type,
        "pair_order": results.order || 0,
        "host_id": results.ancestor,
        "owner_id":host.user_id,
        "editor_id": results.user_id,
        "link_id": results._id,
        "created": results.created,
        "modified": results.modified,
        "admin":results.admin || false,
        "pair_priority": results.priority || 0,
        "pair_caption":results.caption || "",
        "attachment":false
      };

      db.pairs.findOneAndUpdate({_id: results._id},{$set:new_pair},{upsert: true});

    }else{
      console.log(`[aggregate] host not found`, results.ancestor);
    }

  });