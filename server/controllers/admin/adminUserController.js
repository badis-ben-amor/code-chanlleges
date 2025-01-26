const mongoose = require("mongoose");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const createUserAdmin = async (req, res) => {
  const { name, email, password, role = "user" } = req.body.userData;
  try {
    if (!["user", "admin"].includes(role))
      return res.status(400).json({ message: "Invalid role" });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    const hachedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hachedPassword, role });
    await newUser.save();
    res.status(200).json({
      message: "User created successfuly",
      user: { name, email, role },
    });
  } catch (error) {
    res.status(500).json({ message: "Network error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    if (!users || users.length === 0)
      return res.status(404).json({ message: "Users not found" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOneUserAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId " });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Network error", error: error.message });
  }
};

const updateOneUserAdmin = async (req, res) => {
  const { userId } = req.params;
  const { name, email, role } = req.body.userData;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });
    if (!["user", "admin"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        role,
      },
      { new: true }
    ).select("-password");
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Network error", error: error.message });
  }
};

const deleteUserAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Network error", error: error.message });
  }
};

module.exports = {
  createUserAdmin,
  getAllUsers,
  getOneUserAdmin,
  updateOneUserAdmin,
  deleteUserAdmin,
};
