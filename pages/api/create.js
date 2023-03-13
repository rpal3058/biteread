import dbConnect from "../../lib/db";
import Blog from "../../lib/models/blog_model";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  await dbConnect();
  const data = req.body;
  const { blogId, username, blog } = data;
  try {
    const newBlog = new Blog({
      blogId: blogId,
      username: username,
      blog: blog,
    });
    await newBlog.save();
    return res.status(201).json({ message: "Blog Added!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
