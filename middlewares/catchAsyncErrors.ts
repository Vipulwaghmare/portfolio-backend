import { NextFunction, Request, Response } from 'express';
import { TRequest } from '../controller/types';

const catchAsyncErrors =
  (func: TRequest) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };

export default catchAsyncErrors;
