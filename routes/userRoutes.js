import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "Get All Users" });
});

userRouter.post("/", (req, res) => {
  res.json({ message: "POST New User" });
});

userRouter.put("/:id", (req, res) => {
  res.json({ message: "Update User" });
});

userRouter.delete("/:id", (req, res) => {
  res.json({ message: "Delete User" });
});

export default userRouter;
