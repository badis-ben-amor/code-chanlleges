const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoConnection = require("./config/db");
// middlewares
const cors = require("cors");
const cookieParser = require("cookie-parser");
// socket.io
const { Server } = require("socket.io");
const http = require("http");
const socketEvents = require("./socket");
// public routes
const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengRoutes");
// user routes
const submissionRoutes = require("./routes/submissionRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const activityRoutes = require("./routes/activityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
// admin routes
const adminChallengeRoutes = require("./routes/admin/adminChallengeRoutes");
const adminUserRoute = require("./routes/admin/adminUserRoute");

mongoConnection();
const server = http.createServer(app);
// set up socket.io instance with server
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   },
// });
// attach io instance to the request object
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });
//set up socket events
// socketEvents(io);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// public routes
app.use("/auth", authRoutes);
app.use("/challenge", challengeRoutes);
// user routes
app.use("/submission", submissionRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/profile", profileRoutes);
app.use("/activity", activityRoutes);
app.use("/notifications", notificationRoutes);
// admin routes
app.use("/admin/challenge", adminChallengeRoutes);
app.use("/admin/user", adminUserRoute);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server rannig on port ${PORT}`);
});
