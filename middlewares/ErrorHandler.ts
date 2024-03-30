import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { ZodError } from "zod";

type TApiError = {
  message: string;
  status: number;
  stack?: string;
  errors?: string[];
}

export const errorHandler = (err: TApiError, req: Request, res: Response) => {
  logger.error(err.message);
  logger.error(err.stack);
  const response = {
    message: err.message,
    errors: err.errors,
  };
  return res.status(err.status).send(response);
};

class APIError extends Error {
  message: TApiError["message"];
  status: TApiError["status"];

  constructor({ message, status }: TApiError) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

export const convertError = (err: any, req: Request, res: Response, next: NextFunction) => {
  let convertedError = err;
  console.log('aaa', err instanceof ZodError, err instanceof APIError)
  if (err instanceof ZodError) {
    convertedError = new APIError({
      message: 'Invalid request body', // TODO: Change
      status: 500,
    });
  }
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status || 500,
    });
  }
  return errorHandler(convertedError, req, res);
};

export const notFound = (req: Request, res: Response) => {
  const err = new APIError({
    message: "API not found",
    status: 404,
  });
  return errorHandler(err, req, res);
};

export default APIError;
