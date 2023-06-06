const express = require("express"); // express paketini import eder

const server = express(); // server'ı oluşturur

server.use(express.json());

module.exports = server;
