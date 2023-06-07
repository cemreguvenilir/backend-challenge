const db = require("../../data/db-config");

function getAllUsers() {
  return db("users");
}

function getUserById(user_id) {
  return db("users").where("user_id", user_id).first();
}
function getUserByEmail(email) {
  return db("users").select().where("email", email);
}

async function createUser({ username, email, password }) {
  let created_user_id;
  await db.transaction(async (trx) => {
    const [user_id] = await trx("users").insert({
      username,
      email,
      password,
    });
    created_user_id = user_id;
  });
  return getUserById(created_user_id);
}

async function deleteUser(user_id) {
  const deletedUser = await db("users").where("user_id", user_id).del();
  return deletedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  createUser,
};
