import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";

type TApiError = {
  message: string;
  status: number;
  stack?: string;
  errors?: string[];
}

const Handler = (err: TApiError, req: Request, res: Response) => {
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
  message: TApiError["message"];
  errors: TApiError["errors"];
  status: TApiError["status"];
  stack: TApiError["stack"];

  constructor({ message, stack, errors, status }: TApiError) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}

export const convertError = (err: any, req: Request, res: Response, next: NextFunction) => {
  let convertedError = err;
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status || 500,
    });
  }
  return Handler(convertedError, req, res);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({
    message: "API not found",
    status: 404,
  });
  return Handler(err, req, res);
};

export default APIError;
