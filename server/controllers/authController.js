const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "100d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.REFRESH_SECRET,
    {
      expiresIn: "110d",
    }
  );
};

const register = async (req, res) => {
  const { name, email, password } = req.body.credential;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email and password is required" });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Register successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Network error",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and passwor is required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).jsons({
      message: "Network error",
      ...(process.env.NODE_ENV === "production" && { error: error.message }),
    });
  }
};

const refresh = async (req, res) => {
  // const { refreshToken } = req.cookies;
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user);

    res.status(200).json({ message: "Access token updated", newAccessToken });
  } catch (error) {
    res.status(500).json({
      message: "Invalid or expired refresh token",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

module.exports = { register, login, refresh, logout };
