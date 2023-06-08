const favModel = require("./favorites-model");

const isFavorited = async (req, res, next) => {
  try {
    const isExist = await favModel.getByFavId(req.params.id);
    if (isExist) {
      res.status(422).json({ message: "daha önce favlanmış" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  isFavorited,
};
