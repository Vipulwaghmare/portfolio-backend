import devLogger from "./devLogger.js";
import prodLogger from "./prodLogger.js";

// How to use
// logger.info("logger")
// logger.error("ERROR")
// logger.warn("ERROR")
// logger.debug("ERROR")

let logger = devLogger();

if (process.env.NODE_ENV === "production") {
  logger = prodLogger();
}

export default logger;
