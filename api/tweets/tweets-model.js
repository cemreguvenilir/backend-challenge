const db = require("../../data/db-config");

function getAllTweets() {
  return db("tweets");
}

function getTweetsById(user_id) {
  return db("tweets").where("user_id", user_id);
}

async function createTweet(tweet) {
  const [insertedId] = await db("tweets").insert(tweet);
  const inserted = await db("tweets").where("tweet_id", insertedId).first();
  return inserted;
}

async function deleteTweet(tweet_id) {
  const deletedTw = await db("tweets").where("tweet_id", tweet_id).del();
  return deletedTw;
}

module.exports = { getAllTweets, getTweetsById, createTweet, deleteTweet };
