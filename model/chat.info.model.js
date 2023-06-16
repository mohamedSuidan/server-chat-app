const mongoose = require("mongoose");
const chatInfoSchema = mongoose.Schema({
  user_id_1: String,
  user_id_2: String,
});
const chatInfo = mongoose.model("chat-info", chatInfoSchema);
module.exports = chatInfo;
