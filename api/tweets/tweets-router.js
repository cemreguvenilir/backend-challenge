const router = require("express").Router();
const tweetsModel = require("./tweets-model");
const authMw = require("../auth/auth-middleware");
const mw = require("./tweets-middleware");

router.get("/", authMw.restricted, async (req, res, next) => {
  try {
    const tweets = await tweetsModel.getAllTweets();
    res.json(tweets);
  } catch (error) {
    next(error);
  }
});
router.get("/:user_id", authMw.restricted, async (req, res, next) => {
  try {
    const tweet = await tweetsModel.getTweetsById(req.params.user_id);
    if (tweet) {
      res.json(tweet);
    } else {
      res.status(404).json({ message: "post bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  authMw.restricted,
  mw.checkTweetPayload,
  async (req, res, next) => {
    try {
      let post = {
        user_id: req.decodedToken.subject,
        img_url: req.body.img_url,
        text: req.body.text,
      };
      const insertedPost = await tweetsModel.createTweet(post);
      res.status(201).json(insertedPost);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:user_id", authMw.restricted, async (req, res, next) => {
  try {
    const deletedTweet = await tweetsModel.deleteTweet(req.params.user_id);
    res.status(200).json(deletedTweet);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
