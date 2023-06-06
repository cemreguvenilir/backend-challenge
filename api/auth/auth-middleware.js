const { JWT_SECRET } = require("../secrets");
const userModel = require("../users/users-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const restricted = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Token gereklidir" });
    } else {
      jwt.verify(authHeader, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Token geçersizdir" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkPayload = (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Eksik alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isUserExist = async (req, res, next) => {
  try {
    let isExist = await userModel.getUserByEmail(req.body.email);
    if (isExist && isExist.length > 0) {
      let currentUser = isExist[0];
      let isPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        currentUser.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({ message: "Email veya parola yanlış" });
      } else {
        req.currentUser = currentUser;
        next();
      }
    } else {
      res.status(401).json({ message: "Geçersiz kriter" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  restricted,
  checkPayload,
  isUserExist,
};
