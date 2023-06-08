const router = require("express").Router();
const authMw = require("../auth/auth-middleware");
const favMw = require("./favorites-middleware");
const favModel = require("./favorites-model");

router.get("/:tweet_id", authMw.restricted, async (req, res, next) => {
  const tweet_id = req.params.tweet_id;
  try {
    const fav = await favModel.getFavsByTweet(tweet_id);
    res.json(fav);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:tweet_id",
  authMw.restricted,
  favMw.isFavorited,
  async (req, res, next) => {
    const fav = {
      user_id: req.decodedToken.user_id,
      tweet_id: req.body.tweet_id || null,
    };
    try {
      const newFav = await favModel.createFav(fav);
      res.status(201).json(newFav);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:tweet_id", authMw.restricted, async (req, res, next) => {
  try {
    const tweet_id = req.params.tweet_id;
    const removedFav = await favModel.removeFav(tweet_id);
    if (removedFav) {
      res.status(200).json({ message: "Favorilerden kaldırıldı" });
    } else {
      res.status(404).json({ message: "Beğeni bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
