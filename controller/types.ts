import { Request, Response } from "express";

// TODO: Fix the response 
export type TRequest = (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;