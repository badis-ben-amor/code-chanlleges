const chatEvents = require("./sockeEvents/chatEvents");
const notificationEvents = require("./sockeEvents/notificationEvents");
const userEvents = require("./sockeEvents/userEvents");

module.exports = (io) => {
  io.on("cnnection", (socket) => {
    console.log("New user connected:" + socket.id);

    chatEvents(io);
    userEvents(io);
    notificationEvents(io);

    socket.io("disconnect", () => {
      console.log("User disconnected:" + socket.id);
    });
  });
};

// other methode

// module.exports = (io) => {
//   chatEvents(io);
//   userEvents(io);
//   notificationEvents(io);
// };
