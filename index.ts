import express from "express";
import { createServer } from "http";
import dotEnv from "dotenv";
dotEnv.config();
import { Server } from "socket.io";
import requestIp from "request-ip";
import cors from "cors";
import cookieParser from "cookie-parser";
import YAML from "yamljs";
import mongoose from "mongoose";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import connectToDatabase from "./config/database";
import authRouter from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import todoRouter from "./routes/todo.routes";
import { notFound, convertError } from "./middlewares/ErrorHandler";
import userRouter from "./routes/user.routes";
import rateLimiter from "./middlewares/rateLimiter";
import initializeSocketIO from "./services/socket/index";
import chatRouter from "./routes/chat.routes";
const swaggerDocument = YAML.load("./swagger/main.yaml");
const app = express();
const httpServer = createServer(app);
// Socket IO
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "*", // 'http://localhost:3000/'
    credentials: true,
  },
});
app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

connectToDatabase();
initializeSocketIO(io);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestIp.mw());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(rateLimiter);

// Routes
app.get("/", (_, res) => res.send("Welcome to API"));
app.use("/api/v1", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/chat", chatRouter);

// Error Handling
app.use(notFound);
app.use(convertError);

const PORT = process.env.PORT;

mongoose.connection.once("open", () => {
  httpServer.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
});
