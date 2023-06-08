const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const tweetsRouter = require("./tweets/tweets-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/tweets", tweetsRouter);

server.get("/", (req, res) => {
  res.json({ message: "express is working" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error!...",
  });
});

module.exports = server;
