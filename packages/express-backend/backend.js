import express from "express";
import cors from "cors";
import { registerUser, authenticateUser, loginUser } from "./auth.js"; // Import the functions from auth.js
import { addComment } from "./services/comment-service.js";
import { findUserById } from "./services/user-service.js";
import "./services/connect.js"
import User from "./models/users.js";
import Posts from "./models/posts.js";
import Comment from "./models/comment.js";
import Community from "./models/community.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
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
/* app.post("/user/post", authenticateUser, (req, res) => {
  
}) */


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
/* app.post("/user/comment", authenticateUser, (req, res) => {
  
}) */


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
/* app.post("/user/community", authenticateUser, (req, res) => {
  //
}) */



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


