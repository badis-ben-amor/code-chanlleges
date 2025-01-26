const express = require("express");
const {
  submitSolution,
  getSubmissionsByChallenge,
} = require("../controllers/submissionController");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/", authMiddleware, submitSolution);
router.get("/:challengeId", getSubmissionsByChallenge);

module.exports = router;
