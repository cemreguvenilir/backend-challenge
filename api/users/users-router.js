const router = require("express").Router();
const userModel = require("./users-model");
const mw = require("../auth/auth-middleware");

router.get("/", async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.get("/:user_id", async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.user_id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:user_id", mw.restricted, async (req, res, next) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.user_id);
    if (deletedUser) {
      res.status(200).json({ message: "Başarıyla silindi" });
    } else {
      res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
