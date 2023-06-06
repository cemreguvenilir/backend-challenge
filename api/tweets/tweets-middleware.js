const checkTweetPayload = (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || text.length <= 0 || text.length > 280) {
      res
        .status(400)
        .json({ message: "Tweet length should be between 1-280 characters" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkTweetPayload };
