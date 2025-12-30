import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./router/userRouter.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected to ${process.env.PORT}`);
});
