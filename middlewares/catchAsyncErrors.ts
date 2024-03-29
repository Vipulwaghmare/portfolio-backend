import { NextFunction, Request, Response } from "express";
import { TRequest } from "../controller/types";
import { ZodError } from "zod";
import APIError from "./ErrorHandler";

const catchAsyncErrors = (func: TRequest) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

export default catchAsyncErrors;
