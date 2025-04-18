import { Router } from "express";

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

subRouter.post("/", (req, res) => {
  res.json({ message: "POST New Subscription" });
});

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
