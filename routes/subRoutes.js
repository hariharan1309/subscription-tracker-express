import { Router } from "express";
import authHandler from "../middleware/authHandler.js";
import {
  createSubscription,
  getSubscription,
  getUserSubscription,
} from "../controllers/subControllers.js";

const subRouter = Router();

subRouter.get("/", (req, res) => {
  res.json({ message: "Get All Subscriptions" });
});
subRouter.get("/upcoming-renewals", (req, res) => {
  res.json({ message: "Get AllUpcoming Renewal Subscriptions" });
});
subRouter.get("/:id", authHandler, getSubscription);

subRouter.get("/user/:id", authHandler, getUserSubscription); // getting user specific user subscription

subRouter.post("/", authHandler, createSubscription);

subRouter.put("/:id", (req, res) => {
  res.json({ message: "Update Subscription" });
});
subRouter.put("/cancel/:id", (req, res) => {
  res.json({ message: "Cancel Individual Subscription" });
});
subRouter.delete("/:id", (req, res) => {
  res.json({ message: "Delete Subscription" });
});

export default subRouter;
