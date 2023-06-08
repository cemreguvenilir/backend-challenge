const db = require("../../data/db-config");

async function getByFavId(favorites_id) {
  const fav = await db("favorites").where("favorites_id", favorites_id).first();
  return fav;
}

async function getFavsbyUserId(user_id) {
  const favs = await db("favorites as f")
    .join("tweets as t", "f.tweet_id", "=", "t.tweet_id")
    .where("f.user_id", user_id)
    .select("t.*");
  return favs;
}

async function getFavsByTweet(tweet_id) {
  const favs = await db("favorites as f")
    .join("tweets as t", "f.tweet_id", "=", "t.tweet_id")
    .where("f.tweet_id", tweet_id)
    .select("t.*");

  return favs;
}
async function createFav(fav) {
  const [insertedId] = await db("favorites").insert(fav);
  const inserted = await db("favorites")
    .where("favorites_id", insertedId)
    .first();
  return inserted;
}
async function removeFav(favorites_id) {
  const removed = await db("favorites")
    .where("favorites_id", favorites_id)
    .del();
  return removed;
}
module.exports = {
  getByFavId,
  getFavsByTweet,
  getFavsbyUserId,
  createFav,
  removeFav,
};
