import mongoose from "mongoose";
import commentModel from "../models/comment.js";
import dotenv from "dotenv"

async function addComment(comment){
    const commentToAdd = new commentModel(comment);
    return commentToAdd.save();
}


/*NOTE THAT FOR ALL THESE TODO IGNORE THE AUTHENTICATION PART
BECAUSE THAT IS TAKEN CARE ELSE WHERE AND FOR AN QUERY JUST RETRUN
THE WHOLE OBJECT FOR NOW. DONT WORRY ABOUT LEAVING ANYTHONG OUT
FOR NOW*/



/*TODO Make a fetch request for to fetch a comment by their id and
returns {userId: ..., userName: ...., content: ....}*/


async function getCommentById(commentId) {
    try {
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }

        const user = await userModel.findOne({ username: comment.username });

        return {
            userId: user._id,
            userName: comment.username,
            content: comment.content
        };
    } catch (error) {
        console.error("Error fetching comment by ID:", error);
        throw error;
    }
}

/*async function createComment(req, commentData) {

        const user = req.user; // User should be attached by the middleware


        if (!commentData.content) {
            throw new Error("Content is required");
        }

        const newComment = new commentModel({
            username: user.username,
            content: commentData.content
        });


        const savedComment = await newComment.save();


        user.commentIds.push(savedComment._id);
        await user.save();

        return savedComment;

}*/

/*TODO Make a post to create a comment. Required fields are userName
and content.


export {
    addComment,
    getCommentById,
    createComment
}