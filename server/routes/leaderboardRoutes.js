const express = require("express");
const { getLeaderboard } = require("../controllers/leaderboardController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getLeaderboard);

module.exports = router;
