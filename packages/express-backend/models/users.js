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

const User = mongoose.model("User", UserSchema);

export default User;