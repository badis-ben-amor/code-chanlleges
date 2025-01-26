module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected to login: " + socket.id);

    socket.on("userLogin", (user) => {
      console.log("User logged in: " + user.username);
      io.emit("userLogin", user); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from login: " + socket.id);
    });
  });
};
