module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected for notifications: " + socket.id);

    socket.on("newNotification", (notification) => {
      console.log("New notification: " + notification);
      io.emit("newNotification", notification); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from notifications: " + socket.id);
    });
  });
};
