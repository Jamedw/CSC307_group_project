import mongoose from "mongoose";
import commentModel from "../models/comment.js";
import dotenv from "dotenv"

async function addComment(comment){
    const commentToAdd = new commentModel(comment);
    return commentToAdd.save();
}

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

async function createComment(req, commentData) {

    try {
        const user = req.user; // User should be attached by the middleware

        // Ensure required fields are present
        if (!commentData.content) {
            throw new Error("Content is required");
        }

        // Create the new comment
        const newComment = new commentModel({
            username: user.username,
            content: commentData.content
        });

        // Save the comment
        const savedComment = await newComment.save();

        // Update user's commentIds
        user.commentIds.push(savedComment._id);
        await user.save();

        return savedComment;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
}

/*TODO Make a post to create a comment. Required fields are userName
and content.

AUTHENICATION NEEDED FOR THIS 
use tokens*/

export {
    addComment,
    getCommentById,
    createComment
}