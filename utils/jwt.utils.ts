import jwt from "jsonwebtoken";

export const verifyJwt = (token: string, secret: string) => {
  if (secret !== process.env.ACCESS_TOKEN_SECRET && secret !== process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("Invalid secret");
  }
  return new Promise((res, rej) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        rej({
          message: "Invalid token",
        });
      }
      res(decoded);
    });
  });
};

export const verifyAccessToken = (token: string) =>
  verifyJwt(token, process.env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token: string) =>
  verifyJwt(token, process.env.REFRESH_TOKEN_SECRET);
