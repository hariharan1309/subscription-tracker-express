import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.json({ message: "Sign-Up" });
});
authRouter.post("/login", (req, res) => {
  res.json({ message: "Sign-In" });
});

export default authRouter;
