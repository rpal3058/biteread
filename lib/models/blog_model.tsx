import mongoose from "mongoose";
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  header: {
    type: String,
    required: true,
    unique: true,
  },
  blogLeft: {
    type: String,
    required: true,
    unique: false,
  },
  blogRight: {
    type: String,
    required: false,
    unique: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Blog =
  mongoose.models.blogs_collection ||
  mongoose.model("blogs_collection", blogSchema);
export default Blog;
