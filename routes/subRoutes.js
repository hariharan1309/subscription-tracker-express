import { Router } from "express";
import authHandler from "../middleware/authHandler.js";
import { createSubscription } from "../controllers/subControllers.js";

const subRouter = Router();

subRouter.get("/", (req, res) => {
  res.json({ message: "Get All Subscriptions" });
});
subRouter.get("/upcoming-renewals", (req, res) => {
  res.json({ message: "Get AllUpcoming Renewal Subscriptions" });
});
subRouter.get("/:id", (req, res) => {
  res.json({ message: "Get a Subscription" });
});

subRouter.get("/user/:id", (req, res) => {
  res.json({ message: "Get Individual Subscription" });
});

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
