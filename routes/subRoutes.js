import { Router } from "express";
import authHandler from "../middleware/authHandler.js";
import {
  cancelSubscrition,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscription,
  getUserSubscription,
  upcomingRenewals,
  updateSubscription,
} from "../controllers/subControllers.js";

const subRouter = Router();

subRouter.get("/", authHandler, getAllSubscriptions);
subRouter.get("/upcoming-renewals", authHandler, upcomingRenewals); // admin level functions
subRouter.get("/:id", authHandler, getSubscription);

subRouter.get("/user/:id", authHandler, getUserSubscription); // getting user specific user subscription

subRouter.post("/", authHandler, createSubscription);

subRouter.put("/:id", authHandler, updateSubscription);
subRouter.put("/cancel/:id", authHandler, cancelSubscrition);
subRouter.delete("/:id", authHandler, deleteSubscription);

export default subRouter;
