// users.js
import mongoose from "mongoose";

/*
When a user is created we need their username (username), their 
hashed password (password), and all their associated 
comment/post/community ids will be an empty array
*/
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  commentIds: {
    type: Array,
    required: false,
    default: []
  },
  postIds: {
    type: Array,
    required: false,
    default: []
  },
  communityIds: {
    type: Array,
    required: false,
    default: []
  },
  likedPostIds: {
    type: Array,
    required: false,
    default: []
  },
  dislikedPostIds: {
    type: Array,
    required: false,
    default: []
  }},

);

const User = mongoose.model("User", UserSchema);

export default User;