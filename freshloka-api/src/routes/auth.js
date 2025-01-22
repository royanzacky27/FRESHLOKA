require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const TokenBlacklist = require("../models/token");
const {
  authenticateToken,
  checkTokenBlacklist,
} = require("../config/middlewares");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword, ...data } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      email,
      password,
      ...data,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", data: { token } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post(
  "/logout",
  authenticateToken,
  checkTokenBlacklist,
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ message: "No token provided" });
      }

      // Decode token untuk mendapatkan waktu kedaluwarsa
      const decoded = jwt.decode(token);
      if (!decoded) {
        return res.status(400).json({ message: "Invalid token" });
      }

      // Simpan token ke blacklist
      const blacklistEntry = new TokenBlacklist({ token });
      await blacklistEntry.save();

      return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }
);

router.get("/me", authenticateToken, checkTokenBlacklist, (req, res) => {
  try {
    return res.json({
      message: "Successfully retrieved user data!",
      data: {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        isAdmin: req.user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
