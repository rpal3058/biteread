import dbConnect from "../../lib/db";
import Blog from "../../lib/models/blog_model";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  await dbConnect();
  const data = req.body;
  const { blogId, username, header, blogLeft, blogRight } = data;
  console.log(blogLeft);
  console.log(blogRight);
  try {
    const newBlog = new Blog({
      blogId: blogId,
      username: username,
      header: header,
      blogLeft: blogLeft,
      blogRight: blogRight,
    });
    await newBlog.save();
    return res.status(201).json({ message: "Blog Added!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
