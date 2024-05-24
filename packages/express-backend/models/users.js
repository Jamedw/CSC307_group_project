// users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
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
    default: [],
    required: true
  },
  postIds: {
    type: Array,
    default: [],
    required: true
  },
  communitiyIds: {
    type: Array,
    default: [],
    required: true
  },
});

const User = mongoose.model("User", UserSchema);

export default User;