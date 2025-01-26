const User = require("../models/User");

const addNotification = async (userId, type, message) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { notifications: { type, message, read: false } },
    });
  } catch (error) {
    console.error("Error adding notification", error.message);
  }
};

const getNotifications = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  try {
    const user = await User.findById(userId).select("notifications");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ notifications: user.notifications });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;
  const { userId } = res.user;

  if (!notificationId || !userId)
    return res
      .status(400)
      .json({ message: "User and notification ID is required" });

  try {
    const user = await user.findOneAndUpdate(
      {
        _id: userId,
        "notifications._id": notificationId,
      },
      { $set: { "notifications.$.read": true } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Notification mark as read successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating notification as read",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

// Optional: Function to send a bulk notification to all users (e.g., for announcements)
const sendBulkNotification = async (type, message) => {
  try {
    const users = await User.find({});
    users.forEach(async (user) => {
      await addNotification(user._id, type, message);
    });
  } catch (error) {
    console.error("Error sending bulk notification", error.message);
  }
};

module.exports = { addNotification, getNotifications, markNotificationAsRead };
