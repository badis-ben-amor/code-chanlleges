const express = require("express");
const {
  getAllUsers,
  getOneUserAdmin,
  updateOneUserAdmin,
  deleteUserAdmin,
  createUserAdmin,
} = require("../../controllers/admin/adminUserController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createUserAdmin);
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:userId", authMiddleware, adminMiddleware, getOneUserAdmin);
router.put("/:userId", authMiddleware, adminMiddleware, updateOneUserAdmin);
router.delete("/:userId", authMiddleware, adminMiddleware, deleteUserAdmin);

module.exports = router;
