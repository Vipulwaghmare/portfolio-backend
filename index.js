import express from "express";
import dotEnv from "dotenv";
dotEnv.config();
import mongoose from "mongoose";
import connectToDatabase from "./config/database.js";

const app = express();
connectToDatabase();

const PORT = process.env.PORT;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
});
