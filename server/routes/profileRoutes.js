const express = require("express");
const {
  fetchUserProfile,
  updateUserProfile,
} = require("../controllers/profileController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, fetchUserProfile);
router.put("/", authMiddleware, updateUserProfile);

module.exports = router;
