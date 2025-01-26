const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  points: { type: Number, default: 0 },
  completedChallenges: { type: Number, default: 0 },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
