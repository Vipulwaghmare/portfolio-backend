import logger from "./logger/index.js";
import mongoose from "mongoose";

function connectToDatabase() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => logger.info("DB Connected Successfully"))
    .catch((error) => {
      logger.error("DB Connection Failed : " + error);
    });
}

export default connectToDatabase;
