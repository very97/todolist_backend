const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization; // Bearer tokenString
    if (!tokenString) {
      throw new Error("invalid token!");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("invalid token!");
      }
      //req.userId = payload._id;
      //res.status(200);

      req.userId = payload._id;
      //미들웨어로 넘긴다. user.api의 함수 호출시 1개가 아닌 여러개 가능한데, 호출되는 순서로 넘겨짐
      next();
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
module.exports = authController;

// 미들웨어
