import { randomBytes } from "node:crypto";

export const genRandomString = () => randomBytes(32).toString("hex");
