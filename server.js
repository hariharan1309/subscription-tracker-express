import express from "express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import subRouter from "./routes/subRoutes.js";
import connectDB from "./db/mongodb.js";

const app = express();

const PORT = process.env.PORT || "8080";

// auth
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subRouter);

app.listen(PORT, async () => {
  console.log(`The PORT is running in ${PORT}`);
  await connectDB();
});

export default app;
