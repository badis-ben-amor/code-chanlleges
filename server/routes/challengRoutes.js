const express = require("express");
const {
  getAllChallenges,
  getOneChalleng,
} = require("../controllers/challengeController");

const router = express.Router();

router.get("/", getAllChallenges);
router.get("/:challengeId", getOneChalleng);

module.exports = router;
