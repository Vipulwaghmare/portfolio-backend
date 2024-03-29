import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { verifyAccessToken } from "../utils/jwt.utils.js";

// TODO: Add API ERROR
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "You are not authorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = await verifyAccessToken(token);
      req.body.userId = decoded.id;
      next();
    } catch (e) {
      return res.status(403).json({ error: "Invalid token" });
    }
  } catch (e) {
    logger.error(e);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default verifyUser;
