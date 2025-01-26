const User = require("../models/User");

// fetch user activity
const fechActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { type, details } = req.body;
    const user = await User.findById(userId).select("activityLog");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.activityLog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error feching activity log", error: error.message });
  }
};

module.exports = { fechActivity };
