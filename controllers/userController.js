import mongoose from "mongoose";
import User from "../db/models/user.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      let error = new Error("User Not Found");
      error.statusCode = 404;
      throw error; // the error handler middleware will handle this error
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = req.body;
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      user,
      {
        new: true, // instead of returning the prev non updated state it returns the data after Update.
        // runValidators: true,
      },
      { session: true } // session based transaction
    );
    if (!updatedUser) {
      let error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }
    session.commitTransaction();
  } catch (error) {
    console.log(error);
    session.abortTransaction();
    session.endSession();
    next(error);
  }
};
