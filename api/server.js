const express = require("express"); // express paketini import eder
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const tweetsRouter = require("./tweets/tweets-router");

const server = express(); // server'ı oluşturur

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/tweets", tweetsRouter);

module.exports = server;
