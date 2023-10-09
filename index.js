import express from "express";
import dotEnv from "dotenv";
dotEnv.config();
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import connectToDatabase from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import { notFound, convertError } from "./middlewares/ErrorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

connectToDatabase();

app.use("/api/v1", authRouter);

app.use(convertError);
app.use(notFound);

const PORT = process.env.PORT;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
});
