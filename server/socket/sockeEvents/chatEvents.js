module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected to chat: " + socket.id);

    socket.on("chatMessage", (message) => {
      console.log("Received chat message: " + message);
      io.emit("chatMessage", message); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from chat: " + socket.id);
    });
  });
};
