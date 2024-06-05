/*
copy past these into the frontend. don't call them from here.
They are just here to prevent merge conflicts in frontend development 
folder*/


let API_PREFIX = 'http://localhost:3000';


//require a userid
//will return a 
function fetchUserById(id){
  return fetch(`${API_PREFIX}/user/${id}`);
}


//not needed?
function fetchPostById(id){
  return fetch(`${API_PREFIX}/post/${id}`);
}


//not needed?
function fetchCommunityById(id){
  return fetch(`${API_PREFIX}/community/${id}`);
}



//not needed?
function fetchCommentById(id){
  return fetch(`${API_PREFIX}/comment/${id}`);
}



function addAuthHeader(otherHeaders = {}) {
  if (token === INVALID_TOKEN) {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`
    };
  }
}

//needs a userId, postId, username, content
function postComment(package){
  const promise = fetch(`${API_PREFIX}/user/comment`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(package)
  });

  return promise;
}

//needs a userId, communityid, postTitle, postContent
function postPost(package){
  const promise = fetch(`${API_PREFIX}/user/post`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(package)
  });

  return promise;
}

//userId and name
//returns 
function postCommunity(package){
  const promise = fetch(`${API_PREFIX}/user/community`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(package)
  });

  return promise;
}

//fields needed: userId and communityId
//returns:
//{update: true}
function followCommunity(package){
  const promise = fetch(`${API_PREFIX}/community/follow`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(package)
  });

  return promise;
}


//fields needed: userId and communityId
//returns: {update: true} 
function unfollowCommunity(package){
  const promise = fetch(`${API_PREFIX}/community/unfollow`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(package)
  });

  return promise;
}


/* app.post("/user/community", authenticateUser, async (req, res) => {
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
  }) */