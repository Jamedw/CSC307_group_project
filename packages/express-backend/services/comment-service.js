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


export {
    addComment,
    findCommentById
}