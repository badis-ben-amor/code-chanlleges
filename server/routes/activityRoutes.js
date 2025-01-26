const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { fechActivity } = require("../controllers/activityController");

const router = express.Router();

router.get("/", authMiddleware, fechActivity);

module.exports = router;
