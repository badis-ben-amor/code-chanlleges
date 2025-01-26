const express = require("express");
const {
  getAllChallengesAdmin,
  getOneChallengAdmin,
  createChallengeAdmin,
  updateChallengeAdmin,
  deleteChallangeAdmin,
} = require("../../controllers/admin/adminChallengeController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllChallengesAdmin);
router.get(
  "/:challengeId",
  authMiddleware,
  adminMiddleware,
  getOneChallengAdmin
);
router.post("/", authMiddleware, adminMiddleware, createChallengeAdmin);
router.put(
  "/:challengeId",
  authMiddleware,
  adminMiddleware,
  updateChallengeAdmin
);
router.delete(
  "/:challengeId",
  authMiddleware,
  adminMiddleware,
  deleteChallangeAdmin
);

module.exports = router;
