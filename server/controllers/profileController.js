const User = require("../models/User");
const bcrypt = require("bcrypt");

// fetch user frofile
const fetchUserProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  const userId = req.user;
  const { name, email, password } = req.body;
  try {
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt;
      updates.password = bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }.select("-password")
    );

    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchUserProfile, updateUserProfile };
