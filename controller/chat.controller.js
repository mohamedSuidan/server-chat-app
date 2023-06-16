const chatInfoModel = require("../model/chat.info.model");
const userModel = require("../model/auth.model");
const chatModel = require("../model/chat.model");
exports.createChatInfo = async (req, res, next) => {
  const data1 = await chatInfoModel.findOne({
    user_id_1: req.body.user_id_1,
    user_id_2: req.body.user_id_2,
  });
  if (data1 === null) {
    const data2 = await chatInfoModel.findOne({
      user_id_1: req.body.user_id_2,
      user_id_2: req.body.user_id_1,
    });
    if (data2 === null) {
      const create = new chatInfoModel();
      create.user_id_1 = req.body.user_id_1;
      create.user_id_2 = req.body.user_id_2;
      const chat_id = await create.save();
      const userRecive = await userModel.findById(req.body.user_id_2);

      res.json({
        chat_id: chat_id,
        reciver: userRecive,
      });
    } else {
      const userRecive = await userModel.findById(req.body.user_id_2);
      res.json({
        reciver: userRecive,
        chat_id: data2,
      });
    }
  } else {
    const userRecive = await userModel.findById(req.body.user_id_2);
    res.json({
      chat_id: data1,
      reciver: userRecive,
    });
  }
};
exports.addChat = async (req, res, next) => {
  const newMsg = new chatModel();
  console.log(req.body);
  newMsg.chat_id = req.body.chatId;
  newMsg.user_id_sender = req.body.user_id_sender;
  newMsg.msg = req.body.msg;
  newMsg.user_id_reciver = req.body.user_id_reciver;
  newMsg.time = req.body.time;
  newMsg.name_sender = req.body.name_sender;
  await newMsg.save();
  res.send("msg saved");
};
exports.getChatByChatId = async (req, res, next) => {
  const data = await chatModel.find({ chat_id: req.query.chat_id });
  res.json({
    chat: data,
  });
};
