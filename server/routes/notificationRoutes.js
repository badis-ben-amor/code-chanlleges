const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  getNotifications,
  markNotificationAsRead,
} = require("../controllers/notoficationController");

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.put("/:notificationId", authMiddleware, markNotificationAsRead);

module.exports = router;
