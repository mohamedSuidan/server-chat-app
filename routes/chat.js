const route = require("express").Router();
const bodyParser = require("body-parser");
const chatController = require("../controller/chat.controller");
const gurd = require("../routes/gurds/gurds");
route.post(
  "/add-chat-info",
  gurd.gurd,
  bodyParser.json(),
  chatController.createChatInfo
);
route.post("/chat", gurd.gurd, bodyParser.json(), chatController.addChat);
route.get("/chat", gurd.gurd, chatController.getChatByChatId);
module.exports = route;
