import express from "express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import subRouter from "./routes/subRoutes.js";
import connectDB from "./db/mongodb.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorhandler.js";

const app = express();

const PORT = process.env.PORT || "8080";

// auth
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subRouter);

// middleware
// inbuilt middlewares
app.use(express.json()); // for handeling better JSON data input
app.use(express.urlencoded({ extended: false })); // for handling form data input's
app.use(cookieParser);

// custom middlewares
app.use(errorHandler);  

app.listen(PORT, async () => {
  console.log(`The PORT is running in ${PORT}`);
  await connectDB();
});

export default app;
