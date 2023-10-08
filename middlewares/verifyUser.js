import { verifyAccessToken } from "../utils/jwtUtils.js";

const verifyUser = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyAccessToken(token);
    req.userEmail = decoded.email;
    next();
  } catch (e) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default verifyUser;
