module.exports = (socket, io) => {
  const onlineUsers = [];
  const checkOnline = (data) => {
    if (!onlineUsers.some((ele) => ele.user_id === data.user_id)) {
      onlineUsers.push({
        user_id: data.user_id,
        socket_id: socket.id,
      });
    }
    socket.emit("users", onlineUsers);
  };
};
