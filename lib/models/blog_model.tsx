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
  blog: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Blog =
  mongoose.models.blogs_collection ||
  mongoose.model("blogs_collection", blogSchema);
export default Blog;
