import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const createToken = function (value) {
  return jwt.sign(value, JWT_SECRET);
};

export const verifyToken = function (token) {
  return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = function (token) {
  return jwt.decode(token);
};

export const parseToken = function (token) {
  return token.includes("Bearer") ? token.split(" ")[1] : token;
};
