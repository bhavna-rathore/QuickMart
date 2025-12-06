// backend/src/utils/jwtUtils.js
import jwt from "jsonwebtoken";

const SECRET = "dummy_secret"; // replace later with env var

export const signToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
