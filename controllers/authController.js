import mongoose from "mongoose";
import User from "../db/models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  //   makng the query in session for Automicity -> work fully or don't work. update or don't update ie not half working result
  session.startTransaction();
  try {
    // getting the user data from req.body
    console.log("Started");
    const { name, email, password } = req.body;
    // checking for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      let error = new Error("User Already Exists");
      error.statusCode = 409;
      throw error;
    }
    // creating a new user
    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Creation");
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      {
        session, // adding session for atomicity ie if one thing fails then whole transaction fails
      }
    ); // creating a new user
    const user = newUsers[0];
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log("Started TransactionF");
    session.commitTransaction(); // commit the transaction
    session.endSession(); // end the session
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    session.abortTransaction(); // Stop the Process
    session.endSession(); // Stop the Session
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      let error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // compaing the hashed password
    if (!isPasswordValid) {
      let error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }
    //  if Success
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    }); // generating similar with respective userId in the data.
    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
    // session.abortTransaction(); // Stop the Process
    // session.endSession(); // Stop the Session
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
