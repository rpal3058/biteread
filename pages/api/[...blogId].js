import dbConnect from "../../lib/db";
import Blog from "../../lib/models/blog_model";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  await dbConnect();
  const data = req.query;
  const blogId = data.blogId[1];
  console.log(blogId);

  try {
    const blog = await Blog.findOne({ blogId: blogId });
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving blog data");
  }
}
