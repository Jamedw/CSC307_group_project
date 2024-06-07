import mongoose from "mongoose";

/*
When a post is created the title of the post and the content
of the post will be the only required fields
*/

const PostsSchema = new mongoose.Schema({
  upVotes: {
    type: Number,
    required: false,
    default: 0
  },
  downVotes: {
    type: Number,
    required: false,
    default: 0
  },
  postTitle: {
    type: String,
    required: true
  },
  postContent: {
    type: String,
    required: true
  },
  commentIds: {
    type: Array,
    required: false,
    default: []
  }
});

const Posts = mongoose.model("Posts", PostsSchema);

export default Posts;
