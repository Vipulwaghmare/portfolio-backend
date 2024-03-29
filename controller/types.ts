import { NextFunction, Request, Response } from "express";

// TODO: Fix the response 
export type TRequest = (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;