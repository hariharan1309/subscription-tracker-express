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

