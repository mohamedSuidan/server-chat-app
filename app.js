const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const server = http.createServer(app);
const chat = require("./routes/chat");
const auth = require("./routes/auth");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let onlineUsers = [];

io.on("connection", (socket) => {
  // add the user to the list of online users
  socket.on("addUser", (user) => {
    onlineUsers.push({
      id: socket.id,
      name: user.name,
      user_id: user.user_id,
    });
    io.emit("updateUsers", onlineUsers);
  });
  socket.on("join_room", (chatId) => {
    socket.join(chatId);
    console.log(`user: ${socket.id} joined to: ${chatId}`);
  });
  socket.on("send_msg", (data) => {
    socket.to(data.chatId).emit("receved", data);
    // console.log(data);
  });
  // remove the user from the list of online users
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    io.emit("updateUsers", onlineUsers);
  });
});

let connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://msuidan149:wbhKqOg8Un8t2uHt@todo_app.modnsdi.mongodb.net/chat-app?retryWrites=true&w=majority"
    );
    server.listen(process.env.PORT || 4000, () => console.log("server listen"));
  } catch (err) {
    console.log(err);
  }
};
connect();
app.use(auth);
app.use(chat);
