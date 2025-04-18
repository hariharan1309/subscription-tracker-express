import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI;

export default async function connectDB() {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log(error);
  }
}
