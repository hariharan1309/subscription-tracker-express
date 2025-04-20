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

export const getSubscription = async (req, res, next) => {
  try {
    const subId = req.params.id;
    const subscription = await Subscription.findById(subId); // as we are already checking the user existence in the middlewaere
    if (!subscription) {
      let error = new Error("Subscription Not Found");
      error.statusCode = 404;
      throw error;
    }
    if (req.user._id.toString() !== subscription.user.toString()) {
      let error = new Error(" You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  // we can add admin level restrcitions for this
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = req.body;
    const subId = req.params.id;
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subId,
      subscription,
      {
        new: true,
      }
    );
    if (!updatedSubscription) {
      let error = new Error("Subscription Not Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: updatedSubscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subId = req.params.id;
    const subscription = await Subscription.findById(subId);
    if (!deleteSubscription) {
      let error = new Error("Subscription Not Found");
      error.statusCode = 404;
      throw error;
    }
    if (req.user._id.toString() !== subscription.user.toString()) {
      let error = new Error(" You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }
    const deletedSubscription = await Subscription.findByIdAndDelete(subId);
    res.status(200).json({ success: true, data: deletedSubscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const upcomingRenewals = async (req, res, next) => {
  try {
    const limit = req.query.limit ?? "month";
    const subscriptions = await Subscription.find();
    const upcomingRenewals = subscriptions.filter((sub) => {
      const nextRenewalDate = new Date(sub.renewalDate);
      const today = new Date(Date.now());
      if (limit === "week") {
        return nextRenewalDate >= today && nextRenewalDate <= today + 7;
      } else if (limit === "today") {
        return nextRenewalDate === today; // expiring today.
      } else {
        return nextRenewalDate >= today && nextRenewalDate <= today + 30; // by default 30 days limit
      }
    });
    res.status(200).json({ success: true, data: upcomingRenewals });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const cancelSubscrition = async (req, res, next) => {
  try {
    const subId = req.params.id; // getting the cancel subscription id
    const subscription = await Subscription.findById(subId);
    if (!subscription) {
      let error = new Error("Subscription Not Found");
      error.statusCode = 404;
      throw error;
    }
    if (req.user._id.toString() !== subscription.user.toString()) {
      let error = new Error(" You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }
    const updateSUbscription = await Subscription.findByIdAndUpdate(
      id,
      {
        status: "cancelled",
      },
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, data: updateSUbscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
