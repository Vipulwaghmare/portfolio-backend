import logger from "./logger";
import mongoose from "mongoose";

function connectToDatabase() {
  mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => logger.info("DB Connected Successfully"))
    .catch((error) => {
      logger.error("DB Connection Failed : " + error);
    });
}

export default connectToDatabase;
