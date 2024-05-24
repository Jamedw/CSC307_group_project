//community.js
import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  memberCount: {
    type: Number,
    required: true
  },
  memberIds: {
    type: Array,
    required: true
  },
  postIds: {
    type: Array,
    default: []
  },
});

const Community = mongoose.model("Community", CommunitySchema);

export default Community;