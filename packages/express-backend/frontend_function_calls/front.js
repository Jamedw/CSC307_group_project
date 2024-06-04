app.post("/user/community", authenticateUser, async (req, res) => {
    const {userId, name} = req.body;
    if(!userId || !name){
      res.status(404).send("Bad request: Invalid input data");
    }else{
      const resComm = await findCommunityByName(name);
      if (resComm.length !== 0){
        res.status(409).send("Community taken already");
      } else{
        const createdComm = await addCommunity({name: name});
        console.log(createdComm);
        console.log(userId);
        console.log("before update");
        const result = User.updateOne(
          { _id: userId},
          { $push: { communityIds : "createdComm._id" }});
        console.log(result);
        console.log("after update");
        res.status(201).send(createdComm);
      }
    }
  })



  app.post("/user/community", authenticateUser, async (req, res) => {
    const {userId, name} = req.body;
    if(!userId || !name){
      res.status(404).send("Bad request: Invalid input data");
    }else{
      const resComm = await findCommunityByName(name);
      console.log("after comm lookup")
      if (resComm.length !== 0 || !(await findUserById(userId))){
        res.status(409).send("Community taken already");
      } else{
        const createdComm = await addCommunity({name: name});
        console.log(createdComm);
        console.log(userId);
        console.log("before update");
        console.log(createdComm._id);
        const result = await User.findByIdAndUpdate(userId,
          {'$push': {communityIds : createdComm._id}},
          { new: true});
        //console.log(result);
        console.log("after update");
        res.status(201).send(createdComm);
      }
    }
  })