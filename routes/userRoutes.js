import { Router } from "express";
import { getUser, getUsers } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

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
