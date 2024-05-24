//post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  upVotes: {
    type: Number,
    required: true,
    default: 0
  },
  downVotes: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  commentIds: {
    type: Array,
    default: []
  },
  postIds: {
    type: Array,
    default: []
  },
  communitiyIds: {
    type: Array,
    default: []
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;