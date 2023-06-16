const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
  chat_id: String,
  user_id_sender: String,
  msg: String,
  user_id_reciver: String,
  time: String,
  name_sender: String,
});
const chatModel = mongoose.model("chat", chatSchema);
module.exports = chatModel;
