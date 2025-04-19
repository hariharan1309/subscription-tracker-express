import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import authHandler from "../middleware/authHandler.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authHandler, getUser); // adding the middleware for specific request ...

userRouter.post("/", (req, res) => {
  res.json({ message: "POST New User" });
});

userRouter.put("/:id", authHandler, updateUser);

userRouter.delete("/:id", (req, res) => {
  res.json({ message: "Delete User" });
});

export default userRouter;
