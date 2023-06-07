const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");

const userModel = require("./api/users/users-model");

afterAll(async () => {
  await db.destroy();
});
beforeEach(async () => {
  await db.migrate.rollback(); // yapılan değişiklikleri geri alır.
  await db.migrate.latest(); // yapılan değişiklikleri günceller.
  await db.seed.run(); //veritabanını doldurur.
});

describe("Users test", () => {
  test("[1] get all users", async () => {
    let users = await userModel.getAllUsers();
    expect(users).toHaveLength(2);
  });

  test("[2] delete user", async () => {
    await userModel.deleteUser(3);
    let user = await userModel.getUserById(3);
    expect(user).toBe(undefined);
  });

  test("[3]Post/register ile kayıt olunuyor mu?", async () => {
    const userData = {
      username: "testkayit",
      email: "testkayit@gmail.com",
      password: "123456",
    };
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    expect(actual.status).toBe(201);
    expect(actual.body).toHaveProperty("email", "testkayit@gmail.com");
  });

  test("[4] Post/register bilgileri eksik girince mesaj dönüyor mu?", async () => {
    const userData = {
      email: "test@test.com",
      password: "1234",
    };
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    expect(actual.status).toBe(400);
    expect(actual.body).toHaveProperty("message", "Eksik alan var");
  });

  test("[5] Get/tweets ile tivitler geliyor mu ?", async () => {
    let loginPayload = {
      username: "testkayit",
      email: "testkayit@gmail.com",
      password: "123456",
    };
    let actual = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    expect(actual.status).toBe(200);
    const response = await request(server)
      .get("/api/tweets")
      .set("authorization", actual.body.token);

    expect(response.status).toBe(200);
  });
});
