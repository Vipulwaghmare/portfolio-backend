import logger from "../config/logger/index.js";

const Handler = (err, req, res) => {
  logger.error(err.message);
  logger.error(err.stack);
  const response = {
    message: err.message,
    errors: err.errors,
  };
  res.status(err.status).json(response);
  res.end();
};

class APIError extends Error {
  /*
    * Creates an API Error
    @param {String} message = Error Message
    @param {Array} errors = Array of validation fields errors
    @param {Number} status = HTTP status code
  */
  constructor({ message, stack, errors, status, isPublic = false }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}

export const convertError = (err, req, res, next) => {
  let convertedError = err;
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status || 500,
    });
  }
  return Handler(convertedError, req, res, next);
};

export const notFound = (req, res, next) => {
  const err = new APIError({
    message: "API not found",
    status: 404,
  });
  return Handler(err, req, res, next);
};

export default APIError;
