import mongoose from "mongoose";
import { userModel } from "../db/models/user";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  //   makng the query in session for Automicity -> work fully or don't work. update or don't update ie not half working result
  try {
    // getting the user data from req.body
    const { name, email, password } = req.body;
    // checking for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      let error = new Error("User Already Exists");
      error.stausCode = 409;
      next(error);
    }
  } catch (error) {
    console.log(error);
    session.abortTransaction(); // Stop the Process
    session.endSession(); // Stop the Session
    next(error);
  }
};
export const login = async (req, res, next) => {};
export const logout = async (req, res, next) => {};
