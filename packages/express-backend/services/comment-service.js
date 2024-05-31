import mongoose from "mongoose";
import commentModel from "../models/comment.js";
import dotenv from "dotenv"

async function addComment(comment){
    const commentToAdd = new commentModel(comment);
    return commentToAdd.save();
}

/*TODO Make a fetch request for to fetch a comment by their id and
returns {userId: ..., userName: ...., content: ....}*/

/*TODO Make a post to create a comment. Required fields are userName
and content.

AUTHENICATION NEEDED FOR THIS 
use tokens*/

export {
    addComment
}