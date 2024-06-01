//comment.js
import mongoose from "mongoose";

/*
When a comment is created all fields will be required
*/
const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true
    }
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment;