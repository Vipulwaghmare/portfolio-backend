import jwt from "jsonwebtoken";

export const verifyJwt = (token, secret) => {
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

export const verifyAccessToken = (token) =>
  verifyJwt(token, process.env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token) =>
  verifyJwt(token, process.env.REFRESH_TOKEN_SECRET);
