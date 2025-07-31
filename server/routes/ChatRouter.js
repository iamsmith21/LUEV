const express = require("express");
const ChatController = require("../controller/ChatController");
const ChatRouter = express.Router();

ChatRouter.post("/chat", ChatController.chat);

module.exports = ChatRouter;