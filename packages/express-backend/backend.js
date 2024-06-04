import express from "express";
import cors from "cors";
import { registerUser, authenticateUser, loginUser } from "./auth.js"; // Import the functions from auth.js
import { addComment } from "./services/comment-service.js";
import { findUserById } from "./services/user-service.js";
import { findPostByTitle, findPostById, addPost } from "./services/posts-service.js";
import { findCommunityById, findCommunityByName,
addCommunity } from "./services/community-service.js";
import "./services/connect.js"
import User from "./models/users.js";
import Posts from "./models/posts.js";
import Comment from "./models/comment.js";
import Community from "./models/community.js";
import { Db, ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://0.0.0.0${port}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});

// Endpoint to verify login
app.post("/Login", loginUser);

// Endpoint to handle signup
app.post("/Signup", registerUser);


/*Not sure if this will actually be used. This is only
really here to reference for authentication*/
app.post("/comment", authenticateUser, (req, res) => {
  const commentAdd = req.body;
  addComment(commentAdd).then((result) =>
    res.status(201).send(result)
  );
});

app.get("/user/:id", authenticateUser, async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = await findUserById(id);
  console.log("endpoint called");
  if (result === undefined) {
    console.log("got here");
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.get("/post/:name", async (req, res) => {
  let name = req.params["name"];
  name = decodeURI("name");
  console.log(name);
  const result = await findPostByTitle(name);
  if (!(result.length)){
    res.status(404).send("no post with that title found");
  } else {
    res.status(201).send(result);
  }
})


//for when a user creates a post
/* expected data;
userId: id of user that created the post
communityId: community the post is a part of
postTitle: title of the created post
postContent: the content of the created post
*/
/*
if the user postTitle exists within the community pstTtlArr
then the post will not be created and the appropriate http error
code will be sent. Otherwise, the post is created and we add the 
new created postId to the community's postIds array and to the users
postIds array. Furthermore, we will add the postTitle to the community's
pstTtlArr.
*/
app.post("/user/post", authenticateUser, async (req, res) => {
  const {userId, communityId, postTitle, postContent} = req.body;
  if (!userId || !communityId || !postTitle || !postContent){
    res.status(400).send("Bad Request: Missing data fields");
  } else{
    const userRes = findUserById(userId);
    const communityRes = findCommunityById(communityId);
    if(!userRes || !communityRes){
      res.status(404).send("Couldn't find a community/user with given ids")
    }else{
      const createdPost = await addPost({postTitle: postTitle, postContent, postContent});
      await User.findByIdAndUpdate(userId,
        {'$push': {postIds : createdPost._id}},
        { new: true,
          upsert: true});
      await Community.findByIdAndUpdate(communityId,
        {'$push': {postIds : createdPost._id}},
        { new: true,
          upsert: true});
      res.status(201).send(createdPost);
    }
  }
})


//for when a user creates a comment
/*expected data;
userId: id of user who created the post
postId: post the comment is a part of
username: username of user who created the post
content: the comment of the user
*/
/*
the comment will be created and the comment id will be added to the post's
commentIds array and to the user's commentIds array
*/
app.post("/user/comment", authenticateUser, async (req, res) => {
  const {userId, postId, username, content} = req.body;
  if(!userId || !postId || !username || !content){
    res.status(400).send("Bad request: Invalid input data");
  }
  else{
    const userRes = findUserById(userId);
    const postRes = findPostById(postId);
    if(!userRes || ! postRes){
      res.status(400).send("Bad request: Invalid postId or userID");
    } else{
      const createdComment = addComment({username: username, content: content});
      await Posts.findByIdAndUpdate(userId,
        {'$push': {commentIds : createdComm._id}},
        { new: true,
          upsert: true});
      await User.findByIdAndUpdate(userId,
        {'$push': {commentIds : createdComm._id}},
        { new: true,
          upsert: true});
      res.status(201).send("finish later");
    }
  }
})


//for when a usser creates a community
/*expected data;
userId: id of user who created the community
name: name of the created community
*/
/*
If the community name exists no community will be created 
and it will send the appropriate http code. Otherwise, 
the community will be created and the community id will be added
to the user's communityIds.
*/
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
        { new: true,
          upsert: true});
      //console.log(result);
      console.log("after update");
      res.status(201).send(createdComm);
    }
  }
})



//for when a user likes a post
/*expected data
userId: the id of the user
postId: the post of the id 
*/
/* 
app.post("/post/like", authenticateUser, (req, res) => {

}
*/

//for when a user dislikes a post
/*  EXPECTED DATA
userId: the id of the user
postId: the post of the id 
*/
/*  HOW IT WORKS
if the user wants to dislike a post we will check if they are in the dislkUser
array. If they are we don't add to the downVotes and send the appropriate error
code, else we will add their id tothe dislkUserIds and update teh downVote counter.
Note that we should also update the upVote count if they have upVoted the post
*/
/*  RETURN OBJECT?
{dwnVtAdd : boolean, upVtChng : boolean} 
dwnVtAdd=true will signifies that we added to the array (Note will still
  have to sen and error code).
upVtChng=true signifies that the user had previously upVoted the post
and that 
*/
/*
app.post("/post/dislike", authenticateUser, (req, res) => {

}
*/


