import dbConnect from "../../lib/db";
import Blog from "../../lib/models/blog_model";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({ req: context.req });
  // console.log(session);
  if (req.method !== "POST") {
    return;
  }
  await dbConnect();
  const data = req.body;
  const { username, blog } = data;
  try {
    const newBlog = new Blog({
      username: username,
      blog: blog,
    });
    await newBlog.save();
    return res.status(201).json({ message: "Blog Added!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
