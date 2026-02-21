const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

exports.generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};