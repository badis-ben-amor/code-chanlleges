const User = require("../models/User");

const updateLeaderboard = async (userId, points) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $inc: { points, completedChallenges: 1 },
    });
  } catch (error) {
    throw new Error("Error updating leaderboard in user model", error.message);
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ points: -1 })
      .select("name points")
      .limit(10);

    res.status(200).json({ leaderboard: users });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leaderboard ",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = { updateLeaderboard, getLeaderboard };
