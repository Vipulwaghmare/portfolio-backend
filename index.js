import express from "express";
import dotEnv from "dotenv";
dotEnv.config();
import cors from "cors";
import YAML from "yamljs";
import mongoose from "mongoose";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import connectToDatabase from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import { notFound, convertError } from "./middlewares/ErrorHandler.js";
const swaggerDocument = YAML.load("./swagger/main.yaml");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
