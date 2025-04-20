import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import authHandler from "../middleware/authHandler.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authHandler, getUser); // adding the middleware for specific request ...

userRouter.put("/:id", authHandler, updateUser);

userRouter.delete("/:id", authHandler, deleteUser);

export default userRouter;
