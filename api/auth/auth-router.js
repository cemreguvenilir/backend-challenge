const router = require("express").Router();
const { JWT_SECRET } = require("../secrets"); // bu secret'ı kullanın!
const userModel = require("../users/users-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const mw = require("./auth-middleware");

router.post("/register", mw.checkPayload, async (req, res, next) => {
  try {
    let hashedPassword = bcryptjs.hashSync(req.body.password);
    let userPostModel = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const registeredUser = await userModel.createUser(userPostModel);
    res.status(201).json(registeredUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", mw.checkPayload, mw.isUserExist, (req, res, next) => {
  try {
    let payload = {
      subject: req.currentUser.user_id,
      username: req.currentUser.username,
      email: req.currentUser.email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      message: `${req.currentUser.username} geri geldi!`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
