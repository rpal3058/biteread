import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const User =
  mongoose.models.users_collection ||
  mongoose.model("users_collection", userSchema);
export default User;
