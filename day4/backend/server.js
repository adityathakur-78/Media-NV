import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todo", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected to ${process.env.PORT}`);
});
