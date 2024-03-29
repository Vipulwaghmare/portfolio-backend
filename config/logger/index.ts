import devLogger from "./devLogger";
import prodLogger from "./prodLogger";

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
