import EncryptPassword from "../../../lib/encrypt";
import dbConnect from "../../../lib/db";
import User from "../../../lib/models/user_model";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return;
  }
  await dbConnect();
  const data = req.body;
  const { email, password } = data;
  if (!email || !email.includes("@") || !password) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const existingUser = await User.findOne({
    email: email,
  });

  if (existingUser) {
    return res
      .status(404)
      .json({ message: "User aleady present. Try to login" });
  } else {
    try {
      const hashedPassword = await EncryptPassword(password);
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).json({ message: "Created user!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
