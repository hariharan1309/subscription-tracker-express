import Subscription from "../db/models/subscription.js";
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body, // utilizing the whole req body
      user: req.user._id, // we will get the user automatically by auth middleware user response
    });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // because the _id gives it as ObjectId so we need to convert it to string
    if (req.user._id.toString() !== req.params.id) {
      let error = new Error(" You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }
    const userSubscription = await Subscription.find({ user: userId });
    if (!userSubscription) {
      let error = new Error("Subscription Not Found"); // as we are already checking the user existence in the middlewaere
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: userSubscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
