/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("tweets").truncate();
  await knex("users").truncate();

  const defaultUsers = [
    {
      username: "cemreguvenilir",
      email: "guvenilircemre@gmail.com",
      password: "1234",
    },
    {
      username: "melihseker",
      email: "melihseker@gmail.com",
      password: "1234",
    },
  ];
  await knex("users").insert(defaultUsers);

  const defaultTweets = [
    {
      img_url:
        "https://www.clipartmax.com/png/middle/58-589213_user-profile-avatar-scalable-vector-graphics-icon-profile-girl-avatar.png",
      username: "cemreguvenilir",
      content: "Hello world!",
      user_id: "1",
    },
    {
      img_url:
        "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png",
      username: "melihseker",
      content: "I said good day!",
      user_id: "2",
    },
  ];
  await knex("tweets").insert(defaultTweets);
};
