import mongoose from "mongoose";
import commentModel from "../models/comment.js";
import dotenv from "dotenv"

async function addComment(comment){
    const commentToAdd = new commentModel(comment);
    return commentToAdd.save();
}

async function findCommentById(id){
    return commentModel.findById(id);
}

/*NOTE THAT FOR ALL THESE TODO IGNORE THE AUTHENTICATION PART
BECAUSE THAT IS TAKEN CARE ELSE WHERE AND FOR AN QUERY JUST RETRUN
THE WHOLE OBJECT FOR NOW. DONT WORRY ABOUT LEAVING ANYTHONG OUT
FOR NOW*/



/*TODO Make a fetch request for to fetch a comment by their id and
returns {userId: ..., userName: ...., content: ....}*/



export {
    addComment
}