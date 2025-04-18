import User from "../db/models/user";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
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
