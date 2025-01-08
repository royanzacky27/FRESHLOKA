// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login pengguna
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Logika untuk memverifikasi pengguna
  // Misalnya, mencari pengguna di database dan memeriksa password
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Email atau password salah" });
  }
  res.json({ message: "Login berhasil", user });
});

module.exports = router;
