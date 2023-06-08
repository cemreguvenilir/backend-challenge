/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("favorites").truncate();
  await knex("tweets").truncate();
  await knex("users").truncate();

  const defaultUsers = [
    {
      username: "cemreguvenilir",
      email: "guvenilircemre@gmail.com",
      password: "$2a$10$ewVmB1CDxbInE7v3wmXdzutCA0SudrK5hwzKwD4F60LHH8mhcswUC", //1234
    },
    {
      username: "melihseker",
      email: "melihseker@gmail.com",
      password: "$2a$10$ewVmB1CDxbInE7v3wmXdzutCA0SudrK5hwzKwD4F60LHH8mhcswUC", //1234
    },
  ];
  await knex("users").insert(defaultUsers);

  const defaultTweets = [
    {
      img_url:
        "https://www.clipartmax.com/png/middle/58-589213_user-profile-avatar-scalable-vector-graphics-icon-profile-girl-avatar.png",

      text: "Hello world!",
      user_id: "1",
    },
    {
      img_url:
        "https://www.clipartmax.com/png/middle/58-589213_user-profile-avatar-scalable-vector-graphics-icon-profile-girl-avatar.png",

      text: "I love summer!",
      user_id: "1",
    },
    {
      img_url:
        "https://www.clipartmax.com/png/middle/58-589213_user-profile-avatar-scalable-vector-graphics-icon-profile-girl-avatar.png",

      text: "I have to go on vacation!",
      user_id: "2",
    },

    {
      img_url:
        "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png",

      text: "I said good day!",
      user_id: "2",
    },
  ];
  await knex("tweets").insert(defaultTweets);

  await knex("favorites").insert([
    { user_id: 1, tweet_id: 3 },
    { user_id: 1, tweet_id: 4 },
    { user_id: 2, tweet_id: 1 },
    { user_id: 2, tweet_id: 2 },
  ]);
};
