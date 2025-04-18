import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is Required..."],
      trim: true,
      minLength: 4,
      maxLength: 32,
    },
    email: {
      type: String,
      required: [true, "User Email is Required..."],
      trim: true,
      unique: true,
      minLength: 8,
      maxLength: 32,
      // match: [`/\S+\@\S+.\S+`, "Please enter a valid email address."],
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address."], // Fixed regex
    },
    password: {
      type: String,
      required: [true, "User Password is Required..."],
      minLength: 8,
      maxLength: 32,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
